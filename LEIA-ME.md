# Guia de edição do site da Biblioteca Escolar

Este guia é para quem atualiza o site. **Não é preciso saber programar** — apenas
saber abrir uma página web e copiar/colar com cuidado.

---

## 1. Como funciona (a regra de ouro)

| | O quê | Onde vive |
|---|---|---|
| **Conteúdo** | Notícias, agenda, textos, ligações, imagens, vídeos | Edita-se no **painel** `/admin` |
| **Documentos e originais** | PDF oficiais, fotografias originais, consentimentos | **OneDrive da Biblioteca** (privado) |
| **Código** | `motor.js`, `estilos.css`, páginas `.html` | Só a manutenção técnica mexe |

**Para atualizar o site nunca é preciso tocar no código nem em ficheiros.**
Faz-se tudo por formulários, no painel de edição:

### 👉 <https://be-esparedes.github.io/be.esp/admin/>

Instalação e entrada no painel: ver [ADMIN.md](ADMIN.md).

**RGPD:** o repositório GitHub é público. Nunca lá colocar listas de alunos,
consentimentos ou qualquer documento com dados pessoais — isso fica no OneDrive.

---

## 2. Editar um conteúdo (o gesto básico)

1. Abrir o **painel**: <https://be-esparedes.github.io/be.esp/admin/>
2. Escolher a secção na barra lateral (ex.: **2 · Notícias, agenda e vídeos**).
3. Escolher o item (ex.: **Notícias**).
4. Preencher o formulário. Para acrescentar, **Add notícia**; para remover, o menu do item.
5. Carregar em **Save**.
6. Esperar 1 a 2 minutos e recarregar o site. Está publicado.

Não há aspas, vírgulas nem chavetas para acertar: o painel trata disso.

> **Enganaste-te?** Nada se perde: o GitHub guarda todas as versões e é possível
> voltar atrás (abrir o ficheiro em `content/` → History → repor versão anterior).

---

## 3. Onde encontro o que quero mudar?

| Quero mudar… | Secção do painel → item |
|---|---|
| Banners do topo da página inicial | 1 · Página inicial → Banners |
| Atalhos do «acesso rápido» | 1 · Página inicial → Acesso rápido |
| Números da Biblioteca | 1 · Página inicial → Números da Biblioteca |
| Notícias | 2 · Notícias… → Notícias |
| Agenda | 2 · Notícias… → Agenda |
| Vídeos | 2 · Notícias… → Vídeos |
| Contactos, horário, equipa, redes, endereços | 3 · A Biblioteca → Informação geral e contactos |
| Regras de utilização | 3 · A Biblioteca → Regras |
| Documentos (títulos e links do OneDrive) | 3 · A Biblioteca → Documentos oficiais |
| Galeria de fotografias | 3 · A Biblioteca → Galeria |
| Perguntas frequentes | 3 · A Biblioteca → Perguntas frequentes |
| Projetos da escola | 3 · A Biblioteca → Projetos da escola |
| Recursos da Biblioteca Digital | 4 · Catálogo e recursos → Biblioteca Digital |
| Sugestões de leitura | 4 · Catálogo e recursos → Sugestões de leitura |
| Guiões e métodos de estudo | 4 · Catálogo e recursos → Guiões |
| Recursos por disciplina | 4 · Catálogo e recursos → Recursos por disciplina |
| Ligações úteis | 4 · Catálogo e recursos → Ligações úteis |
| Desafio do mês | 4 · Catálogo e recursos → Desafio do mês |
| Projetos da Biblioteca | 5 · Atividades → Projetos da Biblioteca |
| Iniciativas nacionais | 5 · Atividades → Iniciativas nacionais |
| Exposições (8 fotos) | 5 · Atividades → Exposições |
| Trabalhos de alunos (4 fotos) | 5 · Atividades → Trabalhos de alunos |
| Ligações da Área de Trabalho | 6 · Área de trabalho → Ligações da equipa |

---

## 4. Tarefas do dia a dia (exemplos)

### Acrescentar uma notícia
**2 · Notícias… → Notícias → Add notícia.** Preencher título, data, categoria e resumo.
- A **Data** define a ordem; a mais recente aparece primeiro.
- Sem fotografia, aparece um ícone com o emoji e a cor escolhidos. Nada fica partido.

### Acrescentar um evento à agenda
**2 · Notícias… → Agenda → Add evento:** dia, mês, ano, título e local.

### Ligar um documento do OneDrive
1. No OneDrive: botão direito no PDF → **Partilhar** → «Qualquer pessoa com a
   ligação pode ver» → copiar ligação.
2. **3 · A Biblioteca → Documentos oficiais**, colar no campo **Ligação** do documento certo.

### Publicar uma fotografia
1. Confirmar o **consentimento** na lista do OneDrive e registar a data.
2. Exportar uma versão pequena (**até 300 KB**; original fica no OneDrive).
3. No painel, no campo **Fotografia**, arrastar o ficheiro. O painel carrega-o e
   guarda o caminho sozinho — nunca é preciso escrever `imagens/...`.
4. Preencher a **descrição da imagem**: descreve-a em poucas palavras, para quem não a vê.

### Publicar um vídeo
**2 · Notícias… → Vídeos → Add vídeo.** Colar o endereço do YouTube tal como aparece
na barra do browser. O vídeo passa a aparecer na página de Notícias.

### Rever as iniciativas nacionais (início do ano letivo)
**5 · Atividades → Iniciativas nacionais**: atualizar o **Estado** de cada uma
(*Participamos* · *Já participámos* · *Aberta a inscrições* · *Arquivo*).
As de *Arquivo* aparecem agrupadas no fim, sem destaque.

---

## 5. ⚠️ Checklist antes de publicar

- [ ] Texto revisto (ortografia, tom institucional)
- [ ] **Fotografia com consentimento RGPD registado** no OneDrive
- [ ] Nos trabalhos de alunos: **apenas primeiro nome e inicial**
- [ ] **Descrição da imagem** preenchida (acessibilidade)
- [ ] Ligação testada (abre e mostra o que deve)
- [ ] Categoria correta e data certa
- [ ] Para retirar uma imagem: limpar o campo no painel **e** apagar o ficheiro
      em `imagens/` (no GitHub, ou pelo gestor de ficheiros do painel)

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
depender de uma só pessoa. Cada pessoa entra no painel com o seu próprio acesso
(ver [ADMIN.md](ADMIN.md)).

## 8. Se alguma coisa correr mal

- **O painel não deixa gravar?** O acesso expirou ou a conta não é colaboradora do
  repositório. Ver [ADMIN.md](ADMIN.md), secção 6.
- **O site não atualizou?** Esperar 2 minutos e recarregar com força (Ctrl+Shift+R).
- **Quero voltar atrás numa alteração?** No GitHub, abrir o ficheiro em `content/`
  → **History** → repor a versão anterior. Nada se perde.
- **Abriste os ficheiros da pasta no computador e está vazio?** É normal: o site
  precisa de estar publicado (ou de um servidor local — ver `PUBLICAR.md`).

## 9. Estrutura da pasta (referência)

```
index.html, encontrar.html, aprender.html, ler.html,
participar.html, conhecer.html          → as páginas do menu
catalogo.html, recursos.html, atividades.html,
biblioteca.html, noticias.html          → endereços antigos, só reencaminham
area-trabalho.html                      → página da equipa
acessibilidade.html, privacidade.html, 404.html
estilos.css                             → aspeto (identidade visual)
motor.js                                → desenha as páginas (não editar)
admin/                                  → o painel de edição (não editar)
content/*.json                          → TODO o conteúdo (escrito pelo painel)
imagens/                                → fotografias otimizadas e logótipo
documentos/                             → (opcional) PDF alojados no repositório
```
