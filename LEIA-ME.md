# Guia de edição do site da Biblioteca Escolar

Este guia é para quem atualiza o site. **Não é preciso saber programar** — apenas
saber abrir uma página web e copiar/colar com cuidado.

---

## 1. Como funciona (a regra de ouro)

| | O quê | Onde vive |
|---|---|---|
| **Conteúdo** | Notícias, agenda, textos, ligações, imagens | Pasta `content/` do repositório GitHub |
| **Documentos e originais** | PDF oficiais, fotografias originais, consentimentos | **OneDrive da Biblioteca** (privado) |
| **Código** | `motor.js`, `estilos.css`, páginas `.html` | Só a manutenção técnica mexe |

**Para atualizar o site nunca é preciso tocar no código.** Edita-se apenas os
ficheiros da pasta `content/`, diretamente no browser.

**RGPD:** o repositório GitHub é público. Nunca lá colocar listas de alunos,
consentimentos ou qualquer documento com dados pessoais — isso fica no OneDrive.

---

## 2. Editar um conteúdo (o gesto básico)

1. Abrir o repositório no GitHub (ligação na página **Área de Trabalho** do site).
2. Entrar na pasta **`content`** e abrir o ficheiro certo (tabela abaixo).
3. Carregar no **lápis ✏️** (canto superior direito do ficheiro).
4. Alterar o texto, **seguindo exatamente o padrão dos itens existentes**
   (aspas, vírgulas e chavetas no mesmo sítio).
5. Carregar em **Commit changes** (duas vezes, confirmando).
6. Esperar 1 a 2 minutos e recarregar o site. Está publicado.

> **Enganaste-te?** Nada se perde: o GitHub guarda todas as versões e é possível
> voltar atrás (History → ver versão anterior).

---

## 3. Que ficheiro edito?

| Quero mudar… | Ficheiro em `content/` |
|---|---|
| Contactos, horário, equipa, redes, endereços | `info.json` |
| Banners do topo da página inicial | `banners.json` |
| Notícias | `noticias.json` |
| Agenda | `agenda.json` |
| Atalhos do «acesso rápido» | `acessoRapido.json` |
| Números da Biblioteca | `metricas.json` |
| Regras de utilização | `regras.json` |
| Documentos (títulos e links do OneDrive) | `documentos.json` |
| Projetos da escola | `projetosEscola.json` |
| Galeria de fotografias | `galeria.json` |
| Sugestões de leitura (Catálogo) | `destaquesCatalogo.json` |
| Recursos da Biblioteca Digital | `bibliotecaDigital.json` |
| Perguntas frequentes | `faq.json` |
| Guiões e métodos de estudo | `guioes.json` |
| Recursos por disciplina | `disciplinas.json` |
| Desafio do mês | `desafioMes.json` |
| Ligações úteis (Recursos) | `ligacoesUteis.json` |
| Exposições (8 fotos) | `exposicoes.json` |
| Projetos da Biblioteca | `projetos.json` |
| Iniciativas nacionais | `iniciativasNacionais.json` |
| Trabalhos de alunos (4 fotos) | `trabalhosAlunos.json` |
| Ligações da Área de Trabalho | `areaTrabalho.json` |
| Imagem/texto/link de um cartão fixo | `cartoes.json` |

---

## 4. Tarefas do dia a dia (exemplos)

### Acrescentar uma notícia
Em `noticias.json`, copiar um bloco entre `{ … }` (incluindo as chavetas), colá-lo
no início da lista, e alterar:
```json
{
  "titulo": "Encontro com a escritora Ana Maria",
  "data": "14 out 2026",
  "dataOrdenacao": "2026-10-14",
  "categoria": "Leitura",
  "resumo": "A Biblioteca recebeu a autora para uma conversa com o 9.º ano.",
  "imagem": "imagens/noticias/encontro-ana-maria.jpg",
  "emoji": "📖",
  "cor": "#A8D8CC",
  "url": ""
}
```
- `dataOrdenacao` (AAAA-MM-DD) define a ordem; a mais recente aparece primeiro.
- `imagem` vazia (`""`) → aparece um ícone com a cor escolhida. Nada fica partido.
- Atenção à **vírgula** entre blocos: todos têm vírgula no fim, exceto o último.

### Acrescentar um evento à agenda
Em `agenda.json`: `dia` (`"14"`), `mes` (`"Abr"`), `titulo`, `local`.

### Ligar um documento do OneDrive
1. No OneDrive: botão direito no PDF → **Partilhar** → «Qualquer pessoa com a
   ligação pode ver» → copiar ligação.
2. Em `documentos.json`, colar no campo `"url"` do documento certo.

### Publicar uma fotografia
1. Confirmar o **consentimento** na lista do OneDrive e registar a data.
2. Exportar uma versão pequena (**até 300 KB**; original fica no OneDrive).
3. No GitHub: pasta `imagens/` → **Add file → Upload files** → arrastar → Commit.
4. No ficheiro JSON certo, referenciar como `"imagens/nome-da-foto.jpg"` e
   preencher o **texto alternativo** (`alt`): descreve a imagem em poucas palavras.

### Rever as iniciativas nacionais (início do ano letivo)
Em `iniciativasNacionais.json`, atualizar o `estado` de cada uma:
`participamos` · `já participámos` · `aberta a inscrições` · `arquivo`
(as de `arquivo` aparecem agrupadas no fim, sem destaque).

---

## 5. ⚠️ Checklist antes de publicar

- [ ] Texto revisto (ortografia, tom institucional)
- [ ] **Fotografia com consentimento RGPD registado** no OneDrive
- [ ] Nos trabalhos de alunos: **apenas primeiro nome e inicial**
- [ ] Texto alternativo (`alt`) preenchido
- [ ] Ligação testada (abre e mostra o que deve)
- [ ] Categoria correta e data certa
- [ ] Para retirar uma imagem: apagar a referência no JSON **e** o ficheiro em `imagens/`

---

## 6. Rotina editorial

| O quê | Quando |
|---|---|
| Notícias | Uma vez por semana |
| Agenda | No início de cada mês |
| Informação estática (horário, regras, documentos) | No início de cada período |
| Rever ligações (Biblioteca Digital e Ligações Úteis) | Uma vez por período |
| Iniciativas nacionais | No início do ano letivo |

**Regra editorial:** o que **vai acontecer** vive em *Atividades*; o que
**já aconteceu** vive em *Notícias*.

---

## 7. Dar acesso a mais pessoas

No repositório: **Settings → Collaborators → Add people** e escrever o utilizador
GitHub da pessoa. Convém haver sempre **dois responsáveis**, para o site não
depender de uma só pessoa.

## 8. Se alguma coisa correr mal

- **O site ficou estranho depois de editar?** Quase de certeza foi uma vírgula ou
  aspa a mais/menos no JSON. Abrir o ficheiro → **History** → repor a versão anterior.
- **O site não atualizou?** Esperar 2 minutos e recarregar com força (Ctrl+Shift+R).
- **Abriste os ficheiros da pasta no computador e está vazio?** É normal: o site
  precisa de estar publicado (ou de um servidor local — ver `PUBLICAR.md`).

## 9. Estrutura da pasta (referência)

```
index.html, biblioteca.html, catalogo.html, recursos.html,
atividades.html, noticias.html          → as páginas do menu
area-trabalho.html                      → página da equipa
acessibilidade.html, privacidade.html, 404.html
estilos.css                             → aspeto (identidade visual)
motor.js                                → desenha as páginas (não editar)
content/*.json                          → TODO o conteúdo (o que se edita)
imagens/                                → fotografias otimizadas e logótipo
documentos/                             → (opcional) PDF alojados no repositório
```
