# Painel de edição (`/admin`) — instalação e utilização

O painel serve para **atualizar o site sem tocar em código nem em ficheiros JSON**.
A equipa vê formulários («Título», «Data», «Fotografia») e carrega imagens por arrastar.
O painel escreve os ficheiros e publica sozinho.

- **Endereço:** `https://be-esparedes.github.io/be.esp/admin/`
- **Motor:** [Sveltia CMS](https://sveltiacms.app) — carregado a partir da Internet, não há nada a instalar no servidor.
- **Formulários:** definidos em [`admin/config.yml`](admin/config.yml). Só a manutenção técnica mexe aí.

---

## 1. O que já está feito

| Ficheiro | Papel |
|---|---|
| `admin/index.html` | A página do painel |
| `admin/config.yml` | Os formulários dos **45 ficheiros** de `content/` |
| `robots.txt` | Já impede que o painel apareça no Google |

Nada mais é preciso criar. Basta publicar o site como habitualmente.

---

## 2. Entrar no painel (não é preciso instalar nada)

O painel precisa de saber quem está a editar, para gravar no GitHub em nome dessa pessoa.

> ### ⚠️ Usar o botão de baixo, **Sign In Using Access Token**
>
> O botão azul **Sign In with GitHub** **não funciona** neste site e fica parado
> em «Signing in…». Não é avaria: sem um autenticador instalado, esse botão tenta
> autenticar pela Netlify, serviço que este site não usa (está em GitHub Pages).
> Para o ativar, ver «Entrada mais cómoda» abaixo.

### Passo A — criar o token (uma vez por pessoa)

1. Abrir <https://github.com/settings/tokens/new> (com sessão iniciada no GitHub).
2. **Note:** escrever `Painel BE`.
3. **Expiration:** escolher a validade (ex.: 90 dias ou *No expiration*).
   Quando expirar, o painel deixa de gravar e é preciso gerar outro.
4. **Select scopes:** marcar **`public_repo`**.
   Chega, porque o repositório é público. Não marcar mais nada.
5. **Generate token** e **copiar** o código que aparece (começa por `ghp_`).
   O GitHub só o mostra **uma vez**.

### Passo B — entrar no painel

1. Abrir `.../admin/`.
2. Carregar em **Sign In Using Access Token** (o botão de baixo).
3. Colar o token e **Sign In**.

O token fica guardado no browser dessa pessoa — nas visitas seguintes entra logo,
sem repetir nada disto.

> **Importante:** o token é uma chave de acesso. Não se partilha, não se cola em
> mensagens nem em documentos. Se se perder ou for para fora, revogá-lo no GitHub
> (*Settings → Developer settings → Tokens*) e gerar outro.

### Entrada mais cómoda (opcional, mais tarde)

Se um dia se quiser o botão **Sign in with GitHub** (entrar só com a conta, sem token),
é preciso instalar o [Sveltia CMS Authenticator](https://github.com/sveltia/sveltia-cms-auth)
em Cloudflare Workers (gratuito) e acrescentar o endereço resultante ao `admin/config.yml`:

```yaml
backend:
  name: github
  repo: BE-ESParedes/be.esp
  branch: main
  base_url: https://o-meu-autenticador.workers.dev
```

Só depois disso é que o botão azul passa a funcionar. Não é necessário para
arrancar: a entrada por token funciona desde o primeiro dia.

### Quem pode editar

Só quem tiver acesso de escrita ao repositório. Para acrescentar alguém:
**Settings → Collaborators → Add people**. Deve haver sempre **dois responsáveis**.

---

## 3. Como se usa (o dia a dia)

1. Abrir `.../admin/`.
2. Escolher a secção na barra lateral (ex.: **4 · Comunicação**).
3. Escolher o item (ex.: **Notícias**).
4. Preencher o formulário. Para acrescentar, **Add notícia**; para remover, o menu do item.
5. Carregar em **Save** (ou *Publish*).
6. Esperar 1 a 2 minutos e recarregar o site. Está publicado.

### Imagens

Campo **Fotografia** → arrastar o ficheiro ou escolher no computador.
O painel carrega a imagem sozinho e guarda o caminho — **nunca é preciso escrever
`imagens/...` à mão**. Cada secção já envia para a sua pasta:

| Secção | Vai para |
|---|---|
| Banners | `imagens/banners/` |
| Notícias | `imagens/noticias/` |
| Galeria | `imagens/galeria/` |
| Livros digitais | `imagens/digitais/` |
| Audiolivros | `imagens/audio/` |
| Podcasts | `imagens/podcasts/` |
| Exposições | `imagens/exposicoes/` |
| Trabalhos de alunos | `imagens/trabalhos/` |

Exportar as fotografias **até 300 KB**. O original fica no OneDrive.

### Vídeos

Secção **Vídeos**: colar o endereço do YouTube tal como aparece na barra do browser.
Aceita `youtube.com/watch?v=…`, `youtu.be/…`, `/shorts/…` e `/live/…`.
O vídeo aparece em **Ler → Vídeos**; enquanto não houver vídeos, a secção mostra um aviso discreto.

Os vídeos ficam alojados no YouTube (não pesam no site) e são embutidos em modo
sem cookies (`youtube-nocookie.com`), que só regista o utilizador se ele carregar em «reproduzir».

---

## 4. Estrutura do painel

O painel está organizado **pelo tipo de trabalho**, e não pelas páginas do
site. O site público responde a «o que queres fazer?»; quem edita pergunta
«o que preciso de atualizar?» — e nem sempre é a mesma arrumação.

| Secção | Contém |
|---|---|
| 1 · Página inicial | Banners do topo, Atalhos, Destaques |
| 2 · Conteúdos para ler e usar | **Escolhas da Biblioteca**, **O que estamos a descobrir**, **A Biblioteca explica**, Livros, Livros digitais, Audiolivros, Podcasts, Vídeos, Leitura acessível, Biblioteca digital, Disciplinas, Ligações úteis, Ferramentas, Guiões, Percursos, Literacia digital, Trabalhar com a Biblioteca |
| 3 · Programação | Agenda, Calendário do ano, Rotina semanal, Temas, Projetos, Iniciativas nacionais, Concursos, Exposições, Trabalhos dos alunos, Arquivo |
| 4 · Comunicação | Notícias |
| 5 · A Biblioteca | Informação e contactos, O que fazemos, Zonas, Galeria, Como funciona, FAQ, Equipa, Documentos, Projetos da escola |
| 6 · Configuração | Catálogo (modos de procura, tutorial, campos), Estantes, Área de trabalho, Cartões |

### Onde encontro o que costumava editar?

| Antes | Agora |
|---|---|
| 2 · Notícias, agenda e vídeos | Notícias → **4 · Comunicação**; Agenda → **3 · Programação**; Vídeos → **2 · Conteúdos** |
| 3 · A Biblioteca | **5 · A Biblioteca** (mesmos formulários) |
| 4 · Catálogo e recursos | Sugestões, digital e recursos → **2 · Conteúdos**; catálogo → **6 · Configuração** |
| 5 · Atividades e projetos | **3 · Programação** |
| 6 · Área de trabalho | **6 · Configuração** |

Nenhum formulário desapareceu e nenhum campo mudou: só se agruparam de
outra maneira.

### Destaques — como se escolhe o que aparece na montra

**Não há um formulário de «destaques».** Isso seria ter o mesmo livro escrito em
dois sítios, e um deles ficaria desatualizado mais cedo ou mais tarde.

Em vez disso, cada ficha — de um livro digital, audiolivro, podcast, vídeo ou
recurso acessível — tem duas caixas no fim do formulário:

| Caixa | O que faz |
|---|---|
| **Destacar em «O que a Biblioteca está a destacar»** | Põe a ficha na montra da página **Ler** |
| **Destacar também na página inicial** | Põe-na também no **Início** (mostra no máximo 4) |

Marcar uma caixa **não copia nada**: a ficha continua a viver só no seu sítio e
passa a aparecer também na montra. Desmarcar retira-a da montra sem mexer na ficha.

> Poucos e escolhidos. Oito na página Ler e quatro no Início é uma boa medida;
> vinte destaques deixam de ser destaques.

### As três montras — e porque não se copia nada para elas

Há três sítios onde a Biblioteca mostra escolhas. **Nenhum deles guarda livros.**
Todos apontam para fichas que já existem, para não haver a mesma obra escrita em
dois sítios (e um deles desatualizado).

| Formulário | O que é | Como se enche |
|---|---|---|
| *(marcas na própria ficha)* | **O que a Biblioteca está a destacar** e o **Início** | Caixas no fim de cada ficha |
| **O que estamos a descobrir** | Quatro escolhas da semana, uma por formato | Escolhe-se a coleção e escreve-se o título |
| **Escolhas da Biblioteca** | Três montras por público | Escolhe-se a coleção e escreve-se o título |

> ⚠️ Nas duas últimas, o **título tem de estar escrito tal e qual como está na
> ficha**. Se não bater certo, a escolha simplesmente não aparece — não dá erro.
> A maneira segura é copiar o título do próprio formulário da ficha.

Se apagares a ficha, a escolha desaparece com ela. Se a editares, muda nos dois sítios.

### Posição e estado

Dois campos novos no fim de quase todos os formulários:

- **Posição** — um número. Menor aparece primeiro; em branco vai para o fim.
- **Estado** — *publicado* ou *rascunho*. Em **rascunho** a ficha fica escrita mas
  **não aparece no site**. Serve para preparar conteúdo com calma, ou para retirar
  alguma coisa sem a apagar.

### O motivo do destaque

Quando marcas uma ficha como destaque, preenche também **«Motivo do destaque»** —
duas a quatro palavras que aparecem no cartão. Não é decoração: é a razão pela
qual a Biblioteca o escolheu.

> *Ligação ao currículo* · *Excelente para começar* · *Clássico fundamental* ·
> *Recurso pouco conhecido* · *Descoberta da Biblioteca* · *Cabe numa viagem*

Um destaque sem motivo é só um item posto à frente dos outros.

### A frase editorial

O campo **«Porque é que a Biblioteca recomenda isto?»** é o que distingue uma
biblioteca de uma lista de links. Uma ou duas frases, escritas por nós, para
alunos — **não copiadas** da página de origem.

> *O Mandarim* — Eça de Queirós
> «Tocas uma campainha e um velho morre do outro lado do mundo; em troca ficas
> rico. Eça transforma esse pacto num teste divertido e incómodo à tua consciência.»

Não confundir com a **descrição da imagem**, que é outra coisa: descreve o que
se vê na capa, para quem não a vê.

### Formulários novos (agosto de 2026)

Já com curadoria feita a 21/08/2026:

- **Livros digitais** — 15 obras completas do Projecto Adamastor
- **Audiolivros** — 12, da Imprensa Nacional e de domínio público
- **Podcasts** — 4, da RTP Antena 1 e 2
- **Leitura acessível** — 4 serviços institucionais

Ainda vazios, à espera de curadoria:

- **Vídeos** — basta colar endereços do YouTube
- **Ferramentas** — cada uma explicada: o que é, para que serve, quando usar
- **Estantes** — as classes da CDU, com a cor e onde ficam

> Nos endereços (URL) escreve-se sempre o endereço real e verificado.
> Uma ligação inventada é pior do que uma ficha por preencher.

---

## 5. RGPD — o que continua a valer

O repositório é **público**. O painel não muda isso.

- Fotografias só com **consentimento registado** no OneDrive.
- Trabalhos de alunos: **apenas primeiro nome e inicial**.
- Nunca colocar listas de alunos, consentimentos ou documentos com dados pessoais.
  Esses vivem no OneDrive e ligam-se ao site por *link de partilha*.
- Preencher sempre a **descrição da imagem** (acessibilidade).

---

## 6. Se alguma coisa correr mal

| Sintoma | O que fazer |
|---|---|
| **Fica parado em «Signing in…»** | Foi usado o botão azul **Sign In with GitHub**, que não funciona aqui. Recarregar a página e usar **Sign In Using Access Token**. |
| O painel fica na mensagem «A carregar…» | Confirmar que se abriu por `https://` (ou `localhost`). Em `file://` não funciona. |
| «Bad credentials» ao entrar | O token foi mal copiado (falta um pedaço) ou expirou. Gerar outro. |
| «Not Found» ou não deixa gravar | Falta o *scope* `public_repo` no token, ou a conta não é colaboradora do repositório. |
| Gravei e o site não mudou | Esperar 2 minutos e recarregar com força (Ctrl+Shift+R / Cmd+Shift+R). |
| Enganei-me e quero voltar atrás | No GitHub, abrir o ficheiro em `content/` → **History** → repor a versão anterior. Nada se perde. |

---

## 7. Ver o painel antes de publicar

O painel exige `https://` ou `localhost` (em `file://` não funciona). Na pasta do site:

```bash
python3 -m http.server 8000
```

e abrir <http://localhost:8000/admin/>.

Aí o painel oferece também **Work with Local Repository**: escolhe-se a pasta do site
no computador e edita-se **sem sequer entrar no GitHub**, para experimentar à vontade.
As alterações ficam só na pasta local até serem enviadas para o GitHub.

---

## 8. Manutenção técnica

- **Acrescentar um campo a um formulário:** editar `admin/config.yml`.
- **Acrescentar um ficheiro de conteúdo novo:** criar `content/<nome>.json`,
  acrescentar `<nome>` à lista `FICHEIROS` do `motor.js` **e** um bloco em `admin/config.yml`.
- **Nota:** o nome do campo de topo em `config.yml` tem de ser igual à chave de topo
  do JSON (ex.: `content/noticias.json` começa por `{"noticias": …}` e o campo chama-se `noticias`).
