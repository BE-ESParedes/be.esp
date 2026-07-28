#!/bin/bash
# ─────────────────────────────────────────────────────────────
#  Site da Biblioteca Escolar da ESP — pré-visualização local
#
#  Duplo clique neste ficheiro para ver o site no navegador.
#  Abrir o index.html diretamente NÃO funciona: o navegador
#  bloqueia a leitura dos ficheiros de conteúdo por segurança.
#  Publicado no GitHub Pages o site funciona normalmente.
#
#  Para parar: feche esta janela ou carregue em Ctrl+C.
# ─────────────────────────────────────────────────────────────
cd "$(dirname "$0")"
PORTA=8100
while lsof -i :$PORTA >/dev/null 2>&1; do PORTA=$((PORTA+1)); done

echo ""
echo "  Biblioteca Escolar da ESP"
echo "  Site a correr em http://localhost:$PORTA"
echo ""
echo "  Painel de edição: http://localhost:$PORTA/admin/"
echo ""
echo "  Para parar: feche esta janela ou Ctrl+C"
echo ""

( sleep 1; open "http://localhost:$PORTA/index.html" ) &
python3 -m http.server $PORTA
