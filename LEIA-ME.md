# Guia de edição do site da Biblioteca Escolar

Este guia é para quem atualiza o site. **Não é preciso saber programar.**

---

## 1. A regra de ouro

Há duas partes no site:

| | O quê | Quem mexe |
|---|---|---|
| **Conteúdo** | Notícias, agenda, fotografias, textos, ligações | **A equipa da Biblioteca**, pelo painel |
| **Código** | `motor.js`, `estilos.css`, páginas `.html` | Só quem faz manutenção técnica |

**Para atualizar o site nunca é preciso tocar no código.** Tudo se faz no painel.

---

## 2. Como entrar no painel (Área de Trabalho)

1. No site, carrega no botão **🔒 Área de trabalho** (canto superior direito) ou vai a `.../admin/`.
2. Entra com o teu email (tens de ter sido convidado; ver secção 7).
3. Escolhe a secção que queres editar no menu da esquerda.
4. Edita e carrega em **Publish**.
5. O site atualiza-se **sozinho** em cerca de um minuto. Não é preciso republicar nada.

---

## 3. O que podes editar (menu do painel)

| Secção | Serve para |
|---|---|
| **Informação geral** | Contactos, horário, equipa, redes sociais, endereços do catálogo. Usada em todas as páginas. |
| **Destaques (carrossel)** | Os banners rotativos da página inicial. |
| **Notícias** | As notícias (página inicial e separador Notícias). |
| **Agenda** | Próximas atividades. |
| **Acesso rápido** | Os seis atalhos da página inicial. |
| **Números da Biblioteca** | Os quatro números destacados. |
| **Regras de utilização** | Regras mostradas em A Biblioteca. |
| **Documentos** | PDF do Regulamento, PAA, PDC… |
| **Projetos da escola** | Ligações a projetos da ESP. |
| **Galeria** | Fotografias da Biblioteca. |
| **Biblioteca Digital** | Os recursos digitais verificados. |
| **Destaques do catálogo** | Sugestões de leitura. |
| **Perguntas frequentes** | O acordeão do Catálogo. |
| **Guiões e apoio ao estudo** | Guiões da página Recursos. |
| **Recursos por disciplina** | Os recursos de cada disciplina. |
| **Desafio do mês** | O destaque de literacia digital. |
| **Ligações úteis** | Ligações por finalidade (Ler, Investigar…). |
| **Exposições** | Exposições, com 8 fotografias. |
| **Projetos da Biblioteca** | Os projetos próprios. |
| **Iniciativas nacionais** | O diretório de programas nacionais. |
| **Trabalhos de alunos** | Trabalhos, com 4 fotografias. |
| **Área de Trabalho** | As ligações rápidas da equipa. |
| **Cartões fixos** | Acrescentar imagem/texto/link a cartões que não têm secção própria. |

---

## 4. Tarefas do dia a dia

### Acrescentar uma notícia
1. Painel → **Notícias** → **Add Notícia**.
2. Preenche **Título**, **Data** (texto que aparece, ex.: `12 jul 2026`) e **Data de ordenação** (`2026-07-12`, é esta que define a ordem).
3. **Categoria** (ex.: Leitura, Concurso). Cria a categoria que precisares: o filtro é automático.
4. **Resumo** curto.
5. **Imagem**: carrega a foto. Se não puseres, aparece o **ícone** com a cor escolhida.
6. **Publish**.

### Acrescentar um evento à agenda
Painel → **Agenda** → **Add Evento**: dia (`14`), mês (`Abr`), título, local e hora.

### Acrescentar uma exposição (8 imagens)
Painel → **Exposições** → **Add Exposição**: título, período, descrição e até **8 fotografias** (cada uma com texto alternativo).

### Acrescentar um trabalho de alunos (4 fotos)
Painel → **Trabalhos de alunos**: título, **autores só com primeiro nome e inicial** (ex.: `Ana S., Bruno M. (10.º A)`), descrição e até **4 fotografias**.

### Acrescentar uma iniciativa nacional
Painel → **Iniciativas nacionais**: nome, área, descrição, **estado** (participamos / já participámos / aberta a inscrições / **arquivo**) e ligação oficial.
As de estado **arquivo** aparecem agrupadas no fim, sem destaque.

### Pôr uma imagem a ocupar um cartão
Quase todos os cartões têm um campo **Imagem** na sua secção. Para os que não têm (literacia digital, «como requisitar», «quem somos»), usa **Cartões fixos**: escolhe o cartão na lista, carrega a imagem e, se quiseres, muda o texto e o link.

---

## 5. Imagens: regras

- **Pasta certa** (o painel trata disto sozinho): as imagens vão para `imagens/`.
- **Tamanho**: até cerca de **300 KB** por imagem. Fotos muito grandes tornam o site lento.
- **Texto alternativo (alt) é obrigatório**: descreve a imagem em poucas palavras, para quem não a vê. Ex.: «Alunos a ler na Biblioteca».
- Sem imagem, o cartão mostra um ícone. Nada fica partido.

---

## 6. ⚠️ Checklist RGPD antes de publicar fotografias

Antes de carregar qualquer fotografia com pessoas:

- [ ] **Consentimento confirmado** na lista mantida pela equipa (OneDrive da Biblioteca), com data registada.
- [ ] Nos trabalhos de alunos, **apenas primeiro nome e inicial**. Nunca o nome completo de menores.
- [ ] Texto alternativo preenchido.
- [ ] Se alguém pedir a remoção: apagar no painel **e** remover o ficheiro da pasta de imagens.

---

## 7. Rotina editorial

| O quê | Quando |
|---|---|
| Notícias | Uma vez por semana |
| Agenda | No início de cada mês |
| Informação estática (horário, regras, documentos) | No início de cada período |
| Rever ligações (Biblioteca Digital e Ligações Úteis) | Uma vez por período |
| Iniciativas nacionais | No início do ano letivo |

**Regra editorial:** o que **vai acontecer** vive em *Atividades*; o que **já aconteceu** vive em *Notícias*.

---

## 8. Dar acesso a mais pessoas

No Netlify: **Identity → Invite users** e escrever o email. A pessoa recebe um convite, define a palavra-passe e passa a poder editar. Convém haver sempre **dois responsáveis**, para o site não depender de uma só pessoa.

---

## 9. Se alguma coisa correr mal

- **Enganaste-te?** Todas as alterações ficam registadas no GitHub. É possível voltar atrás.
- **O site não atualizou?** Espera 2 minutos e recarrega a página. Se persistir, ver o painel do Netlify (separador *Deploys*).
- **Abriste os ficheiros da pasta e não funciona?** É normal: o site precisa de estar publicado (ou de um servidor local). Ver `PUBLICAR.md`.

---

## 10. Estrutura da pasta (referência técnica)

```
index.html, biblioteca.html, catalogo.html, recursos.html,
atividades.html, noticias.html          → as páginas do menu
area-trabalho.html                      → página da equipa
acessibilidade.html, privacidade.html, 404.html
estilos.css                             → aspeto (identidade visual)
motor.js                                → desenha as páginas (não editar)
content/*.json                          → TODO o conteúdo (editado pelo painel)
admin/                                  → o painel de edição
imagens/                                → fotografias e logótipo
documentos/                             → PDF dos documentos
```
