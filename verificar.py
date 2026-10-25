#!/usr/bin/env python3
"""Verificação do site antes de publicar.

Confirma, sem abrir o browser, aquilo que se pode confirmar por leitura:
que os ficheiros existem, que as âncoras existem, que os JSON são válidos,
que todo o código que desenha uma imagem do conteúdo passa o caminho por
caminho() (um caminho com barra fez as fotografias desaparecerem em agosto,
e o Sveltia grava-as sempre com barra) e que cada ficheiro de conteúdo tem
formulário no painel.

    python3 verificar.py

Devolve 1 se encontrar falhas, para poder ser usado antes de publicar.
Os avisos não param nada: assinalam coisas a decidir, não erros.
"""
import glob
import json
import os
import re
import sys

import yaml

RAIZ = os.path.dirname(os.path.abspath(__file__))
falhas, avisos = [], []

paginas = sorted(glob.glob(os.path.join(RAIZ, "*.html")))
bruto = {os.path.basename(p): open(p, encoding="utf-8").read() for p in paginas}
# O que está dentro de <script> é modelo, não marcação: os ${...} das funções
# de desenho seriam lidos como caminhos que não existem.
html = {n: re.sub(r"<script\b[^>]*>.*?</script>", "", t, flags=re.S)
        for n, t in bruto.items()}

ids = {n: set(re.findall(r'\bid="([^"]+)"', t)) for n, t in bruto.items()}


def liga(origem, alvo):
    """Confirma um endereço interno: o ficheiro existe, a âncora existe."""
    if not alvo or alvo.startswith(("http://", "https://", "mailto:", "tel:", "//")):
        return
    # «#digital=ouvir» é a âncora #digital com o separador a abrir: o que
    # tem de existir na página é a parte antes do igual.
    if alvo.startswith("#"):
        anc = alvo[1:].split("=")[0]
        if anc and anc not in ids[origem]:
            falhas.append(f"{origem}: âncora #{anc} não existe")
        return
    fich, _, anc = alvo.partition("#")
    anc = anc.split("=")[0]
    fich = fich.split("?")[0]
    if not os.path.exists(os.path.join(RAIZ, fich)):
        falhas.append(f"{origem}: {fich} não existe")
        return
    if anc and fich in ids and anc not in ids[fich]:
        falhas.append(f"{origem}: {fich}#{anc}, âncora não existe")


for nome, t in html.items():
    for alvo in re.findall(r'href="([^"]*)"', t):
        liga(nome, alvo)

for nome, t in html.items():
    for src in re.findall(r'<img[^>]+src="([^"]+)"', t):
        if src.startswith(("http", "data:")):
            continue
        if not os.path.exists(os.path.join(RAIZ, src.split("?")[0])):
            falhas.append(f"{nome}: imagem {src} não existe")
    for ss in re.findall(r'srcset="([^"]+)"', t):
        for parte in ss.split(","):
            src = parte.strip().split(" ")[0]
            if src and not src.startswith(("http", "data:")) \
               and not os.path.exists(os.path.join(RAIZ, src)):
                falhas.append(f"{nome}: srcset {src} não existe")

# O Sveltia grava as imagens carregadas com barra («/imagens/…») e não aceita
# outra coisa: o public_folder tem de começar por barra. No GitHub Pages o
# site vive em …/be.esp/, e uma barra no início sai da pasta e dá 404 sem
# erro nenhum. Quem trata disso é o caminho() do motor, por isso a regra é
# sobre o código: um src feito de um campo de imagem tem de passar por ele.
# Foi o que faltou ao desenho dos projetos, reposto a 25/10/2026.
codigo = dict(bruto)
codigo["motor.js"] = open(os.path.join(RAIZ, "motor.js"), encoding="utf-8").read()
for nome, t in codigo.items():
    for m in re.finditer(r'src="\$\{esc\(([^)]*\.(?:imagem|foto|capa|fundo)\b[^)]*)\)\}', t):
        n = t.count("\n", 0, m.start()) + 1
        falhas.append(f"{nome}:{n}: imagem do conteúdo sem caminho(), «{m.group(1)}»")

CAMPOS_URL = ("url", "ligacao", "href", "link")
CAMPOS_IMG = ("imagem", "foto", "capa", "fundo")


def anda(v, ficheiro, caminho=""):
    """Percorre um JSON de conteúdo à procura de caminhos e endereços."""
    if isinstance(v, dict):
        for k, x in v.items():
            if not isinstance(x, str):
                anda(x, ficheiro, f"{caminho}.{k}")
                continue
            # a barra no início é a do Sveltia, que o caminho() tira
            if k in CAMPOS_IMG and x and not x.startswith("http") and \
                    not os.path.exists(os.path.join(RAIZ, x.lstrip("/"))):
                falhas.append(f"{ficheiro}{caminho}.{k}: {x} não existe")
            if k in CAMPOS_URL and x.startswith("/"):
                falhas.append(f"{ficheiro}{caminho}.{k}: começa por barra, «{x}»")
            if k in CAMPOS_URL and x and \
                    not x.startswith(("http", "mailto:", "tel:", "#")):
                fich, _, anc = x.partition("#")
                anc = anc.split("=")[0]
                if fich and not os.path.exists(os.path.join(RAIZ, fich)):
                    falhas.append(f"{ficheiro}{caminho}.{k}: {fich} não existe")
                elif anc and fich in ids and anc not in ids[fich]:
                    falhas.append(f"{ficheiro}{caminho}.{k}: {x}, âncora não existe")
    elif isinstance(v, list):
        for n, x in enumerate(v):
            anda(x, ficheiro, f"{caminho}[{n}]")


conteudos = sorted(glob.glob(os.path.join(RAIZ, "content", "*.json")))
for p in conteudos:
    nome = os.path.basename(p)
    try:
        anda(json.load(open(p, encoding="utf-8")), nome)
    except Exception as e:
        falhas.append(f"{nome}: JSON inválido, {e}")

cfg = yaml.safe_load(open(os.path.join(RAIZ, "admin", "config.yml"), encoding="utf-8"))
formularios = {f["file"].split("/")[-1]
               for c in cfg["collections"] for f in c.get("files", [])}
for p in conteudos:
    n = os.path.basename(p)
    if n not in formularios:
        avisos.append(f"content/{n} não tem formulário no painel")
for f in sorted(formularios - {os.path.basename(p) for p in conteudos}):
    avisos.append(f"o painel tem formulário para content/{f}, que não existe")

# O carimbo de versão evita que o browser sirva HTML novo com código antigo.
for nome, t in bruto.items():
    for f in ("estilos.css", "motor.js"):
        if re.search(rf'"{re.escape(f)}"', t):
            falhas.append(f"{nome}: pede {f} sem carimbo de versão")

print(f"{len(paginas)} páginas · {len(conteudos)} ficheiros de conteúdo · "
      f"{len(formularios)} formulários\n")
for a in avisos:
    print("  aviso:", a)
if avisos:
    print()
for f in falhas:
    print("  FALHA:", f)
print("\nTudo verificado. Sem falhas." if not falhas else f"\n{len(falhas)} falhas.")
sys.exit(1 if falhas else 0)
