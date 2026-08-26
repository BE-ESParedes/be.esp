#!/usr/bin/env python3
"""Desfoca rostos antes de uma fotografia ir para o site.

PORQUÊ ISTO EXISTE
O repositório é público. O Manual, no ponto 8.1.2, é claro: fotografias de
menores só com autorização documentada e verificação prévia a cada
publicação. Desfocar não substitui a autorização, mas tira da equação as
pessoas que aparecem de passagem no enquadramento.

O QUE FAZ
Corrige a orientação pelo EXIF, procura rostos de frente e de perfil (nos
dois sentidos, espelhando a imagem), funde as caixas que se sobrepõem, e
desfoca cada uma com um raio proporcional ao tamanho do rosto, para o
resultado não parecer um autocolante colado por cima.

O QUE NÃO FAZ, E É PRECISO DIZER
Não garante que apanha todos. Um rosto muito pequeno, muito inclinado, de
costas três quartos ou tapado por um braço passa-lhe ao lado. Por isso o
programa grava também uma folha de prova, com as caixas marcadas, para se
poder confirmar a olho antes de publicar.

    python3 ferramentas/rostos.py entrada.jpg saida.jpg
    python3 ferramentas/rostos.py --pasta origem/ destino/
"""
import argparse
import os
import sys

import cv2
import numpy as np

CASCATAS = ('haarcascade_frontalface_default.xml',
            'haarcascade_frontalface_alt2.xml',
            'haarcascade_profileface.xml')


def _detetores():
    return [cv2.CascadeClassifier(cv2.data.haarcascades + c) for c in CASCATAS]


def _exif(caminho):
    """Lê já com a orientação certa: o cv2 ignora o EXIF e deita fotos ao lado."""
    from PIL import Image, ImageOps
    im = ImageOps.exif_transpose(Image.open(caminho)).convert('RGB')
    return cv2.cvtColor(np.array(im), cv2.COLOR_RGB2BGR)


def encontrar(img, minimo=0.012, sensivel=False):
    """Caixas dos rostos. `minimo` é a fração do lado menor da imagem.

    Em modo sensível baixa-se o número de vizinhos exigido e o tamanho
    mínimo. Passam mais falsos positivos, mas num plano de sala cheia um
    falso positivo desfoca um bocado de cabelo ou de cadeira, que não faz
    mal nenhum, e um rosto por apanhar faz.
    """
    frontal, alt, perfil = _detetores()
    cinza = cv2.equalizeHist(cv2.cvtColor(img, cv2.COLOR_BGR2GRAY))
    if sensivel:
        minimo, vizinhos, escala = minimo * 0.8, 4, 1.05
    else:
        vizinhos, escala = 6, 1.07
    mn = max(20, int(min(img.shape[:2]) * minimo))
    caixas = []
    for c in (frontal, alt, perfil):
        for (x, y, w, h) in c.detectMultiScale(cinza, escala, vizinhos, minSize=(mn, mn)):
            caixas.append([int(x), int(y), int(w), int(h)])
    # o detetor de perfil só vê um dos lados: espelha para apanhar o outro
    largura = cinza.shape[1]
    for (x, y, w, h) in perfil.detectMultiScale(cv2.flip(cinza, 1), escala, vizinhos,
                                                minSize=(mn, mn)):
        caixas.append([int(largura - x - w), int(y), int(w), int(h)])
    return _fundir(caixas)


def _fundir(caixas):
    """Três detetores veem o mesmo rosto três vezes: fica a maior caixa."""
    fica = []
    for x, y, w, h in sorted(caixas, key=lambda b: -b[2] * b[3]):
        if any(x < ox + ow and ox < x + w and y < oy + oh and oy < y + h
               for ox, oy, ow, oh in fica):
            continue
        fica.append((x, y, w, h))
    return fica


def desfocar(img, caixas, folga=0.22):
    """Desfoque forte e oval, com raio proporcional ao rosto."""
    saida = img.copy()
    alt, larg = img.shape[:2]
    for (x, y, w, h) in caixas:
        fx, fy = int(w * folga), int(h * folga)
        x0, y0 = max(0, x - fx), max(0, y - fy)
        x1, y1 = min(larg, x + w + fx), min(alt, y + h + fy)
        recorte = saida[y0:y1, x0:x1]
        if recorte.size == 0:
            continue
        # o núcleo tem de ser ímpar e cresce com o rosto
        k = max(15, (max(x1 - x0, y1 - y0) // 3) | 1)
        borrado = cv2.GaussianBlur(recorte, (k, k), 0)
        # máscara oval, para a mancha não ter cantos
        mascara = np.zeros(recorte.shape[:2], np.uint8)
        cv2.ellipse(mascara, ((x1 - x0) // 2, (y1 - y0) // 2),
                    ((x1 - x0) // 2, (y1 - y0) // 2), 0, 0, 360, 255, -1)
        mascara = cv2.GaussianBlur(mascara, (31, 31), 0)[:, :, None] / 255.0
        saida[y0:y1, x0:x1] = (borrado * mascara + recorte * (1 - mascara)).astype('uint8')
    return saida


def prova(img, caixas):
    """Folha de prova: a mesma imagem com as caixas marcadas."""
    p = img.copy()
    for (x, y, w, h) in caixas:
        cv2.rectangle(p, (x, y), (x + w, y + h), (0, 210, 255), max(2, w // 24))
    return p


def tratar(origem, destino, prova_em=None, largura=None, sensivel=False):
    img = _exif(origem)
    caixas = encontrar(img, sensivel=sensivel)
    limpo = desfocar(img, caixas)
    if largura and limpo.shape[1] > largura:
        h = round(limpo.shape[0] * largura / limpo.shape[1])
        limpo = cv2.resize(limpo, (largura, h), interpolation=cv2.INTER_AREA)
    cv2.imwrite(destino, limpo, [cv2.IMWRITE_JPEG_QUALITY, 84])
    if prova_em:
        pv = prova(img, caixas)
        if pv.shape[1] > 900:
            pv = cv2.resize(pv, (900, round(pv.shape[0] * 900 / pv.shape[1])))
        cv2.imwrite(prova_em, pv, [cv2.IMWRITE_JPEG_QUALITY, 78])
    return len(caixas)


def main():
    a = argparse.ArgumentParser(description=__doc__)
    a.add_argument('origem')
    a.add_argument('destino')
    a.add_argument('--pasta', action='store_true')
    a.add_argument('--largura', type=int, default=None)
    a.add_argument('--provas', default=None)
    a.add_argument('--sensivel', action='store_true',
                   help='apanha mais, à custa de alguns falsos positivos')
    o = a.parse_args()
    if not o.pasta:
        n = tratar(o.origem, o.destino, largura=o.largura, sensivel=o.sensivel)
        print(f"{o.destino}: {n} rostos desfocados")
        return 0
    os.makedirs(o.destino, exist_ok=True)
    if o.provas:
        os.makedirs(o.provas, exist_ok=True)
    total = 0
    for f in sorted(os.listdir(o.origem)):
        if f.startswith('.') or not f.lower().endswith(('.jpg', '.jpeg', '.png')):
            continue
        base = os.path.splitext(f)[0]
        n = tratar(os.path.join(o.origem, f),
                   os.path.join(o.destino, base + '.jpg'),
                   os.path.join(o.provas, base + '.jpg') if o.provas else None,
                   o.largura, o.sensivel)
        total += n
        print(f"  {f:22} {n} rostos")
    print(f"\n{total} rostos desfocados. Confirme as provas antes de publicar.")
    return 0


if __name__ == '__main__':
    sys.exit(main())
