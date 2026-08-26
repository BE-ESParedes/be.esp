#!/usr/bin/env python3
"""Carimba estilos.css e motor.js com a impressão digital do seu conteúdo.

PORQUÊ ISTO EXISTE
O GitHub Pages envia `cache-control: max-age=600` para todos os ficheiros.
Durante os dez minutos a seguir a uma publicação, o browser pode servir o
HTML novo com o motor.js antigo — e nada avisa. O resultado é uma página
que parece atualizada mas em que metade das coisas não funciona: menus que
não abrem, secções que não desenham.

A cura é pedir o código por um endereço diferente sempre que ele muda:

    <link rel="stylesheet" href="estilos.css?v=a1b2c3d4">
    <script src="motor.js?v=e5f6a7b8"></script>

O carimbo é o hash do próprio ficheiro. Se o conteúdo não mudar, o endereço
não muda e o cache continua a servir — que é o que se quer.

QUANDO CORRER
Sempre que se altera estilos.css ou motor.js, ANTES de publicar:

    python3 versionar.py

Não é preciso para alterações de conteúdo: os JSON de content/ já são
pedidos com `cache: 'no-store'`.
"""
import hashlib, glob, os, re, sys

RAIZ = os.path.dirname(os.path.abspath(__file__))
FICHEIROS = ["estilos.css", "motor.js"]


def carimbo(nome):
    with open(os.path.join(RAIZ, nome), "rb") as f:
        return hashlib.sha256(f.read()).hexdigest()[:8]


def main():
    carimbos = {n: carimbo(n) for n in FICHEIROS}
    for n, c in carimbos.items():
        print(f"  {n:14} {c}")

    tocados = 0
    for p in sorted(glob.glob(os.path.join(RAIZ, "*.html"))):
        t = original = open(p, encoding="utf-8").read()
        for nome, c in carimbos.items():
            # apanha com carimbo antigo ou sem carimbo nenhum
            t = re.sub(rf'(href|src)="{re.escape(nome)}(\?v=[0-9a-f]+)?"',
                       rf'\1="{nome}?v={c}"', t)
        if t != original:
            open(p, "w", encoding="utf-8").write(t)
            tocados += 1

    print(f"\n{tocados} páginas carimbadas")

    # verificação: nenhuma página pode ficar a pedir o código sem carimbo
    faltam = []
    for p in glob.glob(os.path.join(RAIZ, "*.html")):
        t = open(p, encoding="utf-8").read()
        for nome in FICHEIROS:
            if re.search(rf'(href|src)="{re.escape(nome)}"', t):
                faltam.append((os.path.basename(p), nome))
    if faltam:
        print("SEM CARIMBO:", faltam)
        return 1
    print("Todas as páginas pedem o código com carimbo.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
