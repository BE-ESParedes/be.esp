"""Desfoca os rostos das cinco fotografias das notícias.

O detetor corre sobre os originais da máquina, onde acerta bem, e só depois
se reduz para 1200 px. Por cada fotografia: um limite de tamanho, para
deitar fora a caixa gigante que ele às vezes põe numa estante, e uma lista
de caixas medidas à mão, para os rostos que lhe escapam.

Caixas à mão em percentagem do lado: (x, y, largura, altura).
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

import cv2
import numpy as np
import rostos
from PIL import Image, ImageOps

# Pasta de trabalho: espera `big/` com os originais e escreve
# `final2/` e `prova2/`. Passe-a em argv[1].
T = sys.argv[1] if len(sys.argv) > 1 else '.'

MAO = {
    'IMG_4932.JPG': [
        (66.3, 22.0, 5.5, 8.5),   # de pé, óculos
        (62.4, 38.5, 3.5, 7.5),   # de perfil, à mesa
        (65.8, 38.0, 3.5, 7.0),
        (70.7, 41.0, 5.0, 11.0),  # camisola cinzenta
        (54.5, 33.0, 4.0, 10.0),  # à esquerda deste grupo
    ],
    'transferir.jpeg': [
        (39.8, 15.0, 3.0, 5.8),   # ao fundo, ao centro
        (52.6, 21.0, 3.0, 6.0),   # ao fundo, de óculos
        (10.4, 40.5, 3.2, 7.0),   # fila da frente, à esquerda
        (44.8, 44.0, 3.5, 7.5),   # fila da frente, de óculos
        (85.4, 39.5, 3.8, 8.0),   # fila da frente, à direita
    ],
    'IMG_5003.JPG': [
        (89.5, 56.5, 4.5, 10.0),  # de perfil, à direita
    ],
    'IMG_4936.JPG': [
        (95.0, 11.5, 5.5, 13.0),  # à direita, na beira
        (72.0, 10.5, 8.5, 12.5),  # de cabeça baixa
        (2.5, 3.5, 5.5, 9.5),     # canto superior esquerdo
        (60.0, 0.0, 6.0, 5.0),    # cortado em cima
    ],
    'PHOTO-2026-03-24-13-52-28_1.jpg': [
        (76.6, 38.0, 5.5, 11.0),  # sentada à direita
        (0.0, 50.5, 5.5, 12.5),   # de perfil, na beira esquerda
        (27.8, 65.0, 6.0, 12.0),  # na assistência
        (75.3, 54.0, 6.0, 11.0),  # na assistência, à direita
    ],
}
MAXIMO = {'IMG_4932.JPG': 8, 'PHOTO-2026-03-24-13-52-28_1.jpg': 12}
AMPLIAR = {'transferir.jpeg': 3, 'PHOTO-2026-03-24-13-52-28_1.jpg': 2}


def trata(nome, largura=1200):
    im = ImageOps.exif_transpose(Image.open(f'{T}/big/{nome}')).convert('RGB')
    bgr = cv2.cvtColor(np.array(im), cv2.COLOR_RGB2BGR)
    h, w = bgr.shape[:2]

    # As cascatas do OpenCV param de ver rostos abaixo de uns 40 px. Nas
    # fotografias pequenas, com muita gente ao fundo, ampliar antes de
    # procurar muda tudo: na do Primavera a Ler passa de 49 para 95 caixas.
    f = AMPLIAR.get(nome, 1)
    if f > 1:
        g = cv2.resize(bgr, (w * f, h * f), interpolation=cv2.INTER_LANCZOS4)
        caixas = [(x // f, y // f, cw // f, ch // f)
                  for x, y, cw, ch in rostos.encontrar(g, sensivel=True)]
    else:
        caixas = rostos.encontrar(bgr, sensivel=True)
    lim = MAXIMO.get(nome)
    if lim:
        antes = len(caixas)
        caixas = [c for c in caixas if c[2] / w * 100 <= lim]
        if antes != len(caixas):
            print(f'      {antes - len(caixas)} caixa(s) grande(s) de fora')

    for a, b, c, d in MAO.get(nome, []):
        caixas.append((int(a / 100 * w), int(b / 100 * h),
                       int(c / 100 * w), int(d / 100 * h)))

    caixas = rostos._fundir(caixas)
    tratada = rostos.desfocar(bgr, caixas, folga=0.20)
    prova = rostos.prova(tratada, caixas)

    def guardar(img, caminho, lg):
        hh, ww = img.shape[:2]
        p = Image.fromarray(cv2.cvtColor(img, cv2.COLOR_BGR2RGB))
        if lg and ww > lg:
            p = p.resize((lg, round(hh * lg / ww)), Image.LANCZOS)
        p.save(caminho, quality=82, optimize=True, progressive=True)

    guardar(tratada, f'{T}/final2/{nome}', largura)
    guardar(prova, f'{T}/prova2/{nome}', 1400)
    print(f'  {nome:34} {len(caixas)} caixas')


if __name__ == '__main__':
    os.makedirs(f'{T}/final2', exist_ok=True)
    os.makedirs(f'{T}/prova2', exist_ok=True)
    for n in ('IMG_4932.JPG', 'IMG_4936.JPG', 'IMG_5003.JPG',
              'transferir.jpeg', 'PHOTO-2026-03-24-13-52-28_1.jpg'):
        trata(n)
