#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Gera o MANUAL-PAINEL.md a partir do admin/config.yml.

PORQUE É QUE ISTO EXISTE
O anexo do painel descrevia os formulários pelos grupos antigos e ficou a
mentir no dia em que o painel foi reagrupado. Um documento derivado que se
escreve à mão envelhece sem avisar: quem o consultasse ia procurar uma ficha
ao grupo errado, que é exatamente a queixa que deu origem à reorganização.

Passa a sair do próprio `config.yml`. Corre-se depois de mexer no painel,
como o `versionar.py` se corre depois de mexer no CSS.

    python3 gerar_manual_painel.py

ONDE É QUE O «ONDE APARECE» VAI BUSCAR A RESPOSTA
Ao nome do grupo, e nada mais. Desde 29/08/2026 os grupos do painel SÃO as
páginas do site, pelo que a informação já lá está e acompanha sozinha quem
mudar uma ficha de grupo. Quando uma ficha serve duas páginas, o próprio
rótulo di-lo entre parênteses — «Livros da semana (Início e Encontrar)» — e
é daí que se lê a segunda página.
"""
import json
import pathlib
import re
import sys

try:
    import yaml
except ImportError:
    sys.exit('Falta o PyYAML. Instalar com:  python3 -m pip install pyyaml')

AQUI = pathlib.Path(__file__).resolve().parent
CFG = AQUI / 'admin/config.yml'
DESTINO = AQUI / 'MANUAL-PAINEL.md'

# Os nomes que o manual já usava para cada tipo de campo. Mantêm-se por
# fidelidade a quem os conhece: são a linguagem do painel, não termos técnicos.
TIPOS = {
    'string': 'texto curto', 'text': 'texto longo', 'list': 'lista',
    'image': 'imagem', 'select': 'escolha', 'number': 'número',
    'boolean': 'sim/não', 'object': 'grupo', 'datetime': 'data',
}

AVISO_SEM_EFEITO = (
    '> ⚠️ **Este formulário não muda nada no site neste momento.** Ou o motor não\n'
    '> lê o ficheiro, ou não há página com o contentor onde o conteúdo apareceria.\n'
    '> Grava sem dar erro, e não se vê. Está à espera de decisão: ligar ou retirar.\n'
)

PREAMBULO = """# Anexo · Referência do painel de edição

**Os {n} formulários, campo a campo.** Este anexo é para consultar, não para ler
de uma ponta à outra. Cada formulário diz onde é que o seu conteúdo aparece no
site, o que é preciso preencher e o que é opcional.

Os campos que se repetem por todo o painel — Título, Fotografia, Descrição da
imagem, Endereço, Ícone, Posição e Estado — estão explicados uma vez no
**capítulo 6 do manual** e não se repetem aqui. Aqui ficam os campos próprios
de cada formulário, mais os que precisam de explicação.

**O painel segue a estrutura do site:** um grupo por página, pela ordem do menu.
Para mudar uma página, abre-se o grupo com o nome dela.

> Este ficheiro é **gerado** a partir de `admin/config.yml`. Não o edite à mão:
> corra `python3 gerar_manual_painel.py` depois de mexer no painel.

---
"""


def onde_aparece(grupo, rotulo):
    """A página onde o conteúdo aparece, lida do grupo e do rótulo."""
    if grupo.startswith('Sem efeito'):
        return None
    if grupo.startswith('Em todo o site'):
        return 'em todas as páginas'
    pagina = re.sub(r'^\d+ · ', '', grupo).strip()
    entre = re.search(r'\(([^)]*)\)\s*$', rotulo)
    if entre and pagina.lower() in entre.group(1).lower():
        return 'em ' + entre.group(1).strip()
    return 'em ' + pagina


def conta_itens(caminho):
    p = AQUI / caminho
    if not p.exists():
        return None
    try:
        v = json.loads(p.read_text(encoding='utf-8'))
    except json.JSONDecodeError:
        return None
    if isinstance(v, dict):
        chave = p.stem
        if isinstance(v.get(chave), list):
            return len(v[chave])
        return None
    return len(v) if isinstance(v, list) else None


def linhas_campo(c, nivel=0):
    """Um campo e, por baixo, os que vivem dentro dele."""
    r = []
    rec = 'obrigatório' if c.get('required', True) else 'opcional'
    tipo = TIPOS.get(c.get('widget', 'string'), c.get('widget', 'string'))
    cab = f"{'  ' * nivel}- **{c.get('label', c.get('name', '?'))}** — {tipo} · {rec}"
    if 'default' in c:
        cab += f" · por omissão: `{c['default']}`"
    r.append(cab)
    if c.get('hint'):
        r.append(f"{'  ' * nivel}  {c['hint']}")
    # Uma lista declara os campos de duas maneiras: `fields:` quando cada item
    # tem vários campos, e `field:` no singular quando o item é um valor só
    # (os dias do horário, por exemplo). Falhar o singular deixa o campo de
    # fora do manual sem dar erro — foi o que aconteceu à primeira.
    for f in c.get('fields', []):
        r += linhas_campo(f, nivel + 1)
    if isinstance(c.get('field'), dict):
        r += linhas_campo(c['field'], nivel + 1)
    return r


def main():
    cfg = yaml.safe_load(CFG.read_text(encoding='utf-8'))
    total = sum(len(col.get('files', [])) for col in cfg['collections'])
    saida = [PREAMBULO.format(n=total)]

    for col in cfg['collections']:
        grupo = col['label']
        saida.append(f"\n## {grupo}\n")
        if col.get('description'):
            saida.append(f"*{col['description']}*\n")
        for f in col.get('files', []):
            saida.append(f"### {f['label']}\n")
            onde = onde_aparece(grupo, f['label'])
            if onde:
                saida.append(f"**Onde aparece:** {onde}\n")
            else:
                saida.append(AVISO_SEM_EFEITO)
            n = conta_itens(f['file'])
            if n is not None:
                saida.append(f"**Tem hoje:** {n} {'item' if n == 1 else 'itens'}\n")
            saida.append(f"**Ficheiro:** `{f['file']}`\n")
            for c in f.get('fields', []):
                saida += linhas_campo(c)
            saida.append('')

    DESTINO.write_text('\n'.join(saida).rstrip() + '\n', encoding='utf-8')
    print(f'MANUAL-PAINEL.md gerado · {len(cfg["collections"])} grupos · {total} formulários')


if __name__ == '__main__':
    main()
