# Manual do Site da Biblioteca Escolar

**Escola Secundária de Paredes · versão de 26 de agosto de 2026**

---

## 1. Sobre este manual

Este manual serve para uma pessoa que nunca viu o site por dentro conseguir
tomar conta dele: mudar textos, trocar fotografias, publicar uma notícia,
corrigir uma ligação partida e publicar tudo isso, sem escrever uma linha de
código.

Foi escrito a partir do site tal como ele está hoje, e não a partir dos
manuais anteriores. O site mudou muito durante o desenvolvimento, e há coisas
nos guias antigos que já não são verdade.

**Substituiu quatro guias** que aqui estavam e foram apagados a 26 de agosto
de 2026: `LEIA-ME.md`, `ADMIN.md`, `PUBLICAR.md` e `CICLO-DE-TRABALHO.md`.
Tinham ficado desatualizados ao longo do desenvolvimento. Se um dia precisar
de os ver, estão no histórico guardado fora do repositório, num ficheiro
`historico-anterior-2026-08-26.bundle`.

### Duas maneiras de mexer no site, e a diferença entre elas

Em todo o manual, cada operação está marcada de uma destas duas formas.

> **GESTÃO NORMAL** · faz-se no painel de edição, pelo browser, sem instalar
> nada e sem saber programar. É onde vive quase tudo o que o dia a dia pede.

> **GESTÃO TÉCNICA** · exige mexer em ficheiros do projeto, e por isso exige
> alguém à vontade com código. Está identificada sempre que aparece, e nunca é
> preciso para atualizar conteúdo.

Se algo não estiver neste manual, não presuma que existe: pergunte antes de
inventar um caminho.

---

## 2. Visão geral do site

| | |
|---|---|
| **Endereço público** | `https://be-esparedes.github.io/be.esp/` |
| **Painel de edição** | o mesmo endereço com `/admin/` no fim |
| **Onde vive** | GitHub, repositório `BE-ESParedes/be.esp`, ramo `main` |
| **Como é servido** | GitHub Pages, sem servidor e sem base de dados |
| **Quanto demora a publicar** | entre 1 e 5 minutos depois de gravar |

O site é **estático**. Isso quer dizer que não há programa nenhum a correr num
servidor: os ficheiros estão lá, e o browser de quem visita monta a página. Tem
três consequências práticas que convém perceber já:

1. **Não há palavras-passe de utilizadores nem contas de visitantes.** Quem
   visita, visita. Quem edita, entra no painel com uma chave própria.
2. **Não há nada que possa «ir abaixo»** por excesso de visitas.
3. **Tudo o que está no repositório é público**, mesmo o que nenhuma página
   mostra. Isto tem consequências sérias e está tratado no capítulo 14.

### O que depende de quê

Todas as páginas assentam em dois ficheiros e mais nada. Não há bibliotecas
externas, não há tipos de letra descarregados de fora, não há publicidade nem
rastreio.

```
   uma página (por exemplo, ler.html)
        │
        ├── estilos.css     o aspeto: cores, tamanhos, espaçamentos
        └── motor.js        o que lê o conteúdo e desenha a página
                 │
                 ├── vai buscar os textos a content/*.json
                 ├── monta o cabeçalho e o rodapé, iguais em todas as páginas
                 └── desenha as secções próprias de cada página
```

**O conteúdo nunca está escrito dentro das páginas.** Está todo em ficheiros
separados, na pasta `content/`, e é exatamente esses ficheiros que o painel de
edição escreve. É por isso que se pode mudar o site inteiro sem tocar em código.

---

## 3. Estrutura e organização

### As páginas que existem

O site tem **seis páginas principais**, três secundárias, uma página de erro e
cinco atalhos.

| Página | Para que serve | Para quem |
|---|---|---|
| **Início** (`index.html`) | A porta de entrada. Diz onde se está, o que se pode fazer e o que está a acontecer. | Todos |
| **Encontrar** (`encontrar.html`) | Procurar um livro: o catálogo, a cota, a estante, e sugestões de leitura. | Sobretudo alunos |
| **Aprender** (`aprender.html`) | Fazer um trabalho: percursos, guiões, fontes por disciplina, e o que a Biblioteca oferece aos docentes. | Alunos e docentes |
| **Ler** (`ler.html`) | Ler por gosto: livros em destaque, e o que há em ecrã, áudio e vídeo. | Sobretudo alunos |
| **Participar** (`participar.html`) | O que acontece: agenda, projetos, exposições, trabalhos dos alunos, notícias. | Todos |
| **Conhecer** (`conhecer.html`) | A Biblioteca: o espaço, a equipa, como funciona, os documentos. | Todos, e quem chega de fora |

E ainda:

| Página | Para que serve |
|---|---|
| **Área de trabalho** (`area-trabalho.html`) | Ligações internas da equipa. Não está no menu. |
| **Acessibilidade** (`acessibilidade.html`) | Declaração de acessibilidade. |
| **Privacidade** (`privacidade.html`) | O que o site recolhe, que é quase nada. |
| **404** (`404.html`) | Aparece quando alguém escreve um endereço que não existe. |

**Os cinco atalhos** (`noticias.html`, `atividades.html`, `biblioteca.html`,
`catalogo.html`, `recursos.html`) não são páginas: são endereços antigos que
reencaminham para as páginas novas, para não partir ligações que já andem por aí.

### Como as páginas se ligam entre si

- O **menu de topo** é igual em todas e leva às seis principais. É montado
  automaticamente, não se edita página a página.
- A **entrada** mostra pedaços das outras: as cinco áreas, os destaques da
  semana, três notícias. Carregar num deles leva à página que os tem por inteiro.
- A **pesquisa**, na lupa do topo, procura em quinze coleções de conteúdo ao
  mesmo tempo e, na última linha, leva sempre ao catálogo.
- O **rodapé** é igual em todas e sai da ficha de informação geral.

---

## 4. Como funciona o site, por dentro

Não é preciso perceber isto para usar o painel. É preciso para perceber porque
é que às vezes as coisas não aparecem.

### O conteúdo vive à parte

Cada bloco do site tem um ficheiro de conteúdo. Quando o painel grava, escreve
nesse ficheiro. Quando alguém abre a página, o `motor.js` vai lê-lo e desenha
o que lá encontrar.

**Se o ficheiro estiver vazio, a secção desaparece sem dar erro.** Isto é de
propósito: mais vale não mostrar nada do que mostrar uma caixa vazia. Mas é
também a razão pela qual convém sempre confirmar no site depois de gravar.

### Rascunho e publicado

Vinte e sete dos 52 formulários têm um campo **Estado**, com duas opções:

- **publicado** — aparece no site;
- **rascunho** — fica gravado mas o site não o mostra.

É a forma de preparar uma notícia com antecedência sem que ela apareça já.

### A ordem das coisas

Muitos formulários têm um campo **Posição**, que é um número. **O número mais
pequeno aparece primeiro.** Convém deixar espaço entre eles (10, 20, 30 e não
1, 2, 3), para poder meter um pelo meio depois sem renumerar tudo.

Onde não há campo Posição, a ordem é a da lista no painel, e muda-se
arrastando.

---

## 5. Acesso ao painel de edição

> **GESTÃO NORMAL**

O painel está em **`https://be-esparedes.github.io/be.esp/admin/`**.

Grava diretamente no GitHub, em nome de quem está a editar. Por isso precisa de
uma chave pessoal, chamada *token*. Cada pessoa cria a sua, uma vez.

### Criar a chave (uma vez por pessoa)

1. Iniciar sessão no GitHub com a conta que tem acesso ao repositório.
2. Abrir `https://github.com/settings/tokens/new`.
3. Em **Note**, escrever algo que identifique: `Painel BE — [nome]`.
4. Em **Expiration**, escolher a validade. Quando expirar, o painel deixa de
   gravar e é preciso repetir estes passos.
5. Em **Select scopes**, marcar **apenas `public_repo`**. Chega, e não convém
   dar mais do que o necessário.
6. Carregar em **Generate token** e **copiar o código**. O GitHub só o mostra
   uma vez. Se o perder, gera-se outro.

### Entrar

1. Abrir `.../admin/`.
2. Carregar em **Sign In Using Access Token** — o botão de baixo.
3. Colar a chave e **Sign In**.

> ⚠️ **O botão azul «Sign In with GitHub» não funciona neste site** e fica
> parado em «Signing in…». Não é avaria: esse botão tenta autenticar por um
> serviço que este site não usa. **Use sempre o botão de baixo.**

A chave fica guardada no browser dessa pessoa. Nas visitas seguintes entra logo.

### A chave é uma chave

Não se partilha, não se cola em mensagens, não se escreve em documentos. Quem a
tiver pode alterar o site. Se se perder ou for parar a sítio errado, revogue-a
em *GitHub → Settings → Developer settings → Tokens* e gere outra.

---

## 6. Conhecer o painel

O painel **segue a estrutura do site**: uma secção por página, pela ordem do
menu, mais duas no fim. São **52 formulários** ao todo, e cada um corresponde a
um ficheiro de conteúdo. Para mudar uma página, abre-se a secção com o nome
dela — não é preciso saber em que género de conteúdo ela cai.

| Secção | O que lá está | Formulários |
|---|---|---|
| **1 · Início** | A primeira página: topo, áreas e destaques do dia | 5 |
| **2 · Encontrar** | Estantes, catálogo e o exemplo da cota | 3 |
| **3 · Aprender** | Disciplinas, guiões, percursos e fontes | 8 |
| **4 · Ler** | O que se dá a ler e a ouvir, em papel e em ecrã | 8 |
| **5 · Participar** | Notícias, agenda, exposições, projetos, trabalhos | 9 |
| **6 · Conhecer** | A Biblioteca, o espaço, a equipa, os documentos | 8 |
| **Em todo o site** | Contactos, cartões fixos e a área da equipa | 3 |
| **Sem efeito no site** | Fichas que gravam e não aparecem. A decidir. | 8 |

### Campos que se repetem por todo o painel

Estes aparecem em dezenas de formulários e querem sempre dizer o mesmo. Ficam
explicados uma vez, para não se repetirem 52 vezes.

| Campo | O que é | O que escrever |
|---|---|---|
| **Título** / **Nome** | O que se lê a negrito no cartão | Curto. Cabe melhor até 60 caracteres. |
| **Descrição** / **Texto** | A frase por baixo do título | Uma ou duas frases. Não repita o título. |
| **Fotografia** / **Imagem** / **Capa** | A imagem do cartão | Ver capítulo 8. |
| **Descrição da imagem** (`alt`) | O que se vê na fotografia, para quem não a vê | **Preencha sempre.** Ver capítulo 8. |
| **Endereço** / **Ligação** (`url`) | Para onde o cartão leva | Ver capítulo 9. |
| **Ícone** | O desenho pequeno do cartão | Escolhe-se de uma lista fechada. |
| **Posição** | A ordem | Número. Menor aparece primeiro. |
| **Estado** | Se aparece ou não | `publicado` ou `rascunho`. |
| **Texto do botão** (`cta`) | O que o botão diz | Um verbo: «Abrir», «Ver», «Requisitar». |
| **Destacar** | Marca este item para aparecer também noutro sítio | Caixa de sim/não. |

### Onde estão os 52 formulários, campo a campo

Este manual explica as operações do dia a dia. A lista completa dos **52
formulários com todos os seus campos** está no anexo:

**[Anexo · Referência do painel de edição](MANUAL-PAINEL.md)**

Cada formulário aí diz onde é que o seu conteúdo aparece no site, quantos itens
tem hoje, e o que cada campo espera. É para consultar quando precisar, não para
ler de uma ponta à outra.

### Como o painel se comporta

- **Listas**: quase tudo são listas de cartões. Cada linha tem um botão para
  **acrescentar** e outro para **apagar**, e arrastam-se para mudar a ordem.
- **Gravar**: o botão **Publish** no topo. No painel diz «Publish» mesmo estando
  em português; é o botão de gravar.
- **Onde vai parar**: cada gravação escreve o ficheiro correspondente e fica
  registada no histórico do GitHub, com data e autor.

---

## 7. Gestão de cada tipo de conteúdo

Esta é a parte que se consulta no dia a dia. Cada operação está descrita de
princípio a fim.

### 7.1 Publicar uma notícia

> **GESTÃO NORMAL** · aparece na entrada (as três mais recentes) e em Participar
> (todas), e entra na pesquisa.

1. Abrir o painel em `.../admin/` e entrar.
2. Na coluna da esquerda, escolher **5 · Participar**.
3. Abrir **Notícias**.
4. No topo da lista, carregar no botão de **acrescentar**.
5. Preencher:
   - **Título** — curto e concreto. É o que se lê no cartão.
   - **Resumo** — uma ou duas frases. É o que aparece por baixo do título.
   - **Data** — a data que deve aparecer no cartão.
   - **Categoria** — a etiqueta colorida.
   - **Fotografia** e **Descrição da imagem** — ver capítulo 8.
   - **Endereço** — opcional. Sem ele, o cartão leva a Participar.
   - **Estado** — `rascunho` enquanto prepara; `publicado` quando estiver pronta.
6. Reler o texto no próprio painel, com atenção às maiúsculas e à data.
7. Carregar em **Publish**.
8. Esperar **1 a 5 minutos**.
9. Abrir `https://be-esparedes.github.io/be.esp/` e confirmar que a notícia
   aparece no bloco «novidades».
10. Abrir também **Participar** e confirmar que aparece na lista completa.

Se não aparecer, ver o capítulo 13.

### 7.2 Alterar ou corrigir uma notícia já publicada

> **GESTÃO NORMAL**

1. Painel → **5 · Participar** → **Notícias**.
2. Localizar a notícia na lista.
3. Alterar o que for preciso.
4. **Publish**, esperar, confirmar no site.

Para a **tirar do site sem a apagar**, ponha o **Estado** em `rascunho`. Fica
guardada e deixa de aparecer. É quase sempre melhor do que apagar.

### 7.3 Acrescentar um evento à agenda

> **GESTÃO NORMAL** · aparece em Participar, na entrada («A seguir») e em
> Conhecer, e entra na pesquisa.

1. Painel → **5 · Participar** → **Agenda**.
2. Acrescentar uma linha.
3. Preencher o **título**, o **dia**, o **mês** e o **ano**, e o que mais o
   formulário pedir.
4. **Publish**, esperar, confirmar em **Participar**.

> **Atenção à data.** A entrada mostra o que vem a seguir. Um evento com data
> passada deixa de aparecer aí, mesmo estando publicado, e isso é o
> comportamento certo.

### 7.4 Trocar as fotografias que rodam no topo da entrada

> **GESTÃO NORMAL**

1. Painel → **1 · Início** → **Banners do topo**.
2. Escolher a faixa a alterar, ou acrescentar uma nova.
3. Campos próprios deste formulário, além dos comuns:
   - **Etiqueta pequena** — o texto miúdo por cima do título.
   - **Título** — pode usar `<em>palavra</em>` para pôr uma palavra a dourado.
   - **Botões** — cada um com o seu texto e endereço.
   - **Lado da fotografia** — esquerda, direita, ou em branco para alternar.
   - **Ocupar a largura toda** — para logótipos largos.
   - **Mostrar o estado da Biblioteca** — em vez dos botões, mostra se está
     aberta agora. **Use isto num cartaz só.**
   - **A imagem é um logótipo** — assenta a imagem inteira, sem a cortar.
4. **Publish**, esperar, confirmar na entrada.

### 7.5 Mudar os livros em destaque

> **GESTÃO NORMAL**

Há **três sítios diferentes** com livros, e convém não os trocar:

| Formulário | Onde aparece |
|---|---|
| **Livros da semana** (secção 1) | Na entrada, no bloco «destaques da semana», e em Encontrar |
| **Livros em destaque** (secção 4) | Em Ler, nos marcadores grandes, e em Encontrar |
| **Sugestões de leitura** (secção 4) | Em Ler |

Em qualquer deles:

1. Painel → a secção da página onde o livro aparece → o formulário certo.
2. Acrescentar ou alterar um livro.
3. Preencher **Título**, **Autor**, a **Capa** e a sua descrição, e a frase do
   **porquê** — a razão pela qual a Biblioteca o recomenda. É essa frase que
   distingue uma sugestão de uma lista.
4. **Publish**, esperar, confirmar.

> **Onde é que a frase do porquê se lê.** Desde 31 de agosto de 2026 os cartões
> dos **destaques da semana** mostram só a etiqueta do formato sobre a capa e,
> por baixo, o para quem, o título e o autor. São oito cartões seguidos: com a
> frase de cada um, a página passava a ser uma parede de texto por baixo das
> capas, e eram as capas que se queriam ver. A frase continua a aparecer nos
> **Livros em destaque** e nas **Sugestões de leitura**, na página Ler, onde há
> um cartão de cada vez e espaço para a ler. Escreva-a na mesma: fica guardada,
> e é o que distingue a Biblioteca de uma lista.

> Um livro sem capa **não desaparece**: aparece com o título escrito na lombada,
> à espera da capa. Pode publicar primeiro e pôr a capa depois.

### 7.6 Acrescentar uma fonte a «Aprender por disciplina»

> **GESTÃO NORMAL**

1. Painel → **3 · Aprender** → **Aprender por disciplina**.
2. Escolher a disciplina na lista.
3. Dentro dela há duas listas, e **é preciso mexer nas duas**:
   - **Áreas** → **itens**: a ligação, agrupada por tema. É o que se vê nos
     separadores.
   - **Recursos**: o cartão com logótipo. É o que se vê nas faixas que deslizam.
4. Acrescentar nas duas, com o mesmo título e o mesmo endereço.
5. **Publish**, esperar, confirmar em **Aprender**, no separador da disciplina.

### 7.7 Alterar o horário, os contactos ou os endereços dos formulários

> **GESTÃO NORMAL** · é o formulário que mais coisas mexe no site.

1. Painel → **Em todo o site** → **Informação geral e contactos**.
2. Aqui vivem, entre outras coisas:
   - o **horário** e o **atendimento**, que aparecem no rodapé, em Conhecer e
     no relógio da entrada;
   - o **e-mail** e a **localização**;
   - o endereço do **catálogo**;
   - os **cinco endereços de formulários** do Microsoft Forms;
   - a **cota de exemplo** que o infográfico de Encontrar usa.
3. **Publish**, esperar, confirmar em Conhecer e no rodapé de qualquer página.

> **O horário escreve-se como `8h00` ou `08:00`.** As duas formas funcionam.
> Uma terceira não: se escrever `8:00h` o relógio da entrada deixa de saber
> calcular e passa a dizer sempre «Fechada».

### 7.8 Editar a equipa, as zonas do espaço ou as perguntas frequentes

> **GESTÃO NORMAL**

1. Painel → **6 · Conhecer** → o formulário respetivo.
2. Acrescentar, alterar ou apagar linhas.
3. **Publish**, esperar, confirmar em **Conhecer**.

> Na **equipa**, escreva o nome e a função. Não ponha contactos pessoais nem
> fotografias de pessoas sem autorização.

### 7.9 Publicar trabalhos de alunos

> **GESTÃO NORMAL**, mas com uma regra que não é negociável.

1. Painel → **5 · Participar** → **Trabalhos dos alunos**.
2. Acrescentar o trabalho, com título, o que é, e a imagem.
3. **Publish**, esperar, confirmar em **Participar**.

> ⚠️ **Só o primeiro nome e a inicial do apelido.** Nunca o nome completo,
> nunca a turma junto ao nome, nunca contactos. E a imagem do trabalho só entra
> com autorização registada. Ver o capítulo 14.

---

## 8. Gestão de imagens

> **GESTÃO NORMAL** para carregar e trocar. A preparação da imagem faz-se antes,
> fora do painel.

### Onde ficam

Todas as imagens vivem na pasta `imagens/`, organizada por assunto:

| Pasta | O que lá está |
|---|---|
| `imagens/capas/` | Capas de livros |
| `imagens/logos/` | Logótipos de sítios e instituições |
| `imagens/noticias/` | Fotografias das notícias |
| `imagens/banners/` | As faixas grandes da entrada |
| `imagens/biblioteca/` | O espaço e as seis frentes de trabalho |
| `imagens/galeria/`, `imagens/exposicoes/`, `imagens/atividades/` | Fotografias de atividades |

Quando carrega uma imagem pelo painel, ela vai para `imagens/` e o painel
escreve o caminho sozinho. **Não é preciso saber o caminho.**

### Antes de carregar: preparar a imagem

Esta parte é a que mais diferença faz, e é a que o painel não faz por si.

| | |
|---|---|
| **Formatos** | JPG para fotografias, PNG para logótipos com fundo transparente, SVG para logótipos vetoriais |
| **Largura** | Depende de onde a imagem vai. Ver a tabela abaixo. |
| **Peso** | **Até 300 KB.** Acima disso, a página passa a demorar |
| **Nome** | Minúsculas, sem espaços nem acentos: `semana-da-leitura.jpg` e não `Semana da Leitura (1).JPG` |

### A que largura exportar

Medido no site publicado, num ecrã de 1440 px. A recomendação dá o dobro do
que se vê, para os ecrãs de alta densidade não mostrarem a imagem desfocada.

| A imagem é… | O site mostra-a a | Exportar a |
|---|---|---|
| A **abertura** de uma página | 1425 px de largura | **2000 px** |
| Uma fotografia de **exposição** | 1090 px | **1400 px** |
| Uma fotografia da **galeria** | 720 px | **1400 px** |
| Uma **faixa** do «Em cartaz» | 619 px | **1400 px** |
| A fotografia de uma **notícia** | 367 px | **1200 px** |
| Um **logótipo** de um sítio | 277 px | **900 px** |
| Uma **capa** de livro | 277 px | **700 px** |
| Um **projeto** ou o **arquivo** | 213 px | **800 px** |

**Não é preciso acertar na altura.** Nas fotografias, o site corta o que sobra,
sempre pelo centro. O que conta é a largura e o peso.

**As capas de livro são a exceção, e desde 29 de agosto de 2026 não se cortam.**
Aparecem inteiras dentro de uma moldura, seja qual for a proporção: uma capa
mais quadrada e outra mais alta ficam ambas certas, e nenhuma perde o título.
Antes disto via-se cerca de 40% da capa, cortada ao meio — por isso não valia
a pena procurar a melhor imagem. Agora vale: escolha a mais nítida que
encontrar.

O mesmo resumo está em `imagens/LEIA-ME.txt`, ao lado das próprias pastas.

> **Porque é que o peso importa.** As fotografias que saem de uma máquina têm
> 5 000 px de largura e 7 MB. O site mostra-as a 370 px. Uma fotografia dessas
> demora catorze vezes mais a chegar do que precisa, e numa rede de escola isso
> nota-se. Reduza-a antes de a carregar.

**Como reduzir, no Mac, sem instalar nada:** abrir a imagem na Pré-visualização
→ *Ferramentas* → *Ajustar tamanho* → pôr a largura da tabela acima →
*Ficheiro* →
*Exportar* → JPEG, qualidade a meio → gravar.

### Trocar uma imagem

1. Painel → o formulário onde a imagem está.
2. Carregar no campo da imagem.
3. **Upload** e escolher a nova, ou escolher uma que já esteja na biblioteca de
   imagens do painel.
4. Atualizar também a **Descrição da imagem**, se o que se vê mudou.
5. **Publish**, esperar, confirmar no site.

> A imagem antiga **não desaparece** da pasta: fica lá, sem ninguém a usar.
> Apagá-la é **gestão técnica** e não é urgente.

### A descrição da imagem, e porque não se salta

O campo **Descrição da imagem** (por vezes chamado *texto alternativo*) é o que
um leitor de ecrã lê a quem não vê a fotografia. É também o que aparece se a
imagem não carregar.

- Descreva **o que se vê**, em poucas palavras: «Alunos a trabalhar numa mesa da
  Biblioteca, com as estantes em fundo».
- Não comece por «Imagem de» nem «Fotografia de».
- Se a imagem for puramente decorativa e o texto ao lado já disser tudo, pode
  deixar em branco — mas na dúvida, escreva.

### Fotografias com pessoas

Está tratado no capítulo 14. **Leia-o antes de carregar a primeira fotografia
com alunos.**

---

## 9. Gestão de ligações e documentos

### Ligações

> **GESTÃO NORMAL**

Nos campos **Endereço** ou **Ligação**:

- **Para fora do site**: o endereço completo, começado por `https://`.
  Exemplo: `https://www.rbe.mec.pt/np4/4948.html`
- **Para outra página deste site**: só o nome do ficheiro.
  Exemplo: `aprender.html`
- **Para um sítio dentro de uma página**: o nome do ficheiro, cardinal, e o
  nome da secção. Exemplo: `participar.html#exposicoes`

> ⚠️ **Nunca comece um endereço interno com uma barra.** `/aprender.html`
> parece igual a `aprender.html` mas não é, e parte a ligação assim que o site
> deixar de estar na raiz do domínio. Foi este erro que fez as fotografias todas
> desaparecerem em agosto.

**Antes de gravar uma ligação, abra-a.** Copie-a para uma janela nova e veja se
chega ao sítio certo. Um endereço que já não existe não dá erro nenhum no
painel: só dá uma página de erro a quem carregar nele.

### Documentos oficiais

> **GESTÃO NORMAL**

Os documentos da Biblioteca — regulamento, manual de procedimentos, plano anual
— **não estão publicados por opção**. O que o site mostra é o título, um resumo
e um botão.

1. Painel → **6 · Conhecer** → **Documentos oficiais**.
2. Cada documento tem um **Título** e um **Endereço**.
3. Se o **Endereço** estiver **em branco**, o botão passa a «Pedir à equipa» e
   abre uma mensagem de correio já preenchida. É assim que está hoje, e é uma
   escolha, não uma falha.
4. Se quiser publicar um documento, ponha nesse campo um **link de partilha do
   OneDrive** e o botão passa a «Abrir PDF».

> Não carregue PDF oficiais para o repositório. Ver o capítulo 14.

---

## 10. Publicação do site

> **GESTÃO NORMAL**, quando se edita pelo painel.

### Pelo painel, que é o caminho normal

**Não há passo de publicação separado.** Carregar em **Publish** no painel faz
tudo: grava o ficheiro no GitHub e o GitHub Pages reconstrói o site sozinho.

```
   Publish no painel
        ↓
   o ficheiro é gravado no GitHub          (imediato)
        ↓
   o GitHub Pages reconstrói o site        (1 a 5 minutos)
        ↓
   o site público está atualizado
```

**Quanto demora:** normalmente menos de dois minutos. Quando o GitHub está com
problemas pode demorar bastante mais, e não há nada a fazer senão esperar; o
estado dos serviços vê-se em `https://www.githubstatus.com`.

### Como confirmar que o que está no ar é o que gravou

1. Esperar dois minutos.
2. Abrir a página pública onde a alteração devia aparecer.
3. **Se não vir a alteração, force o browser a ir buscar tudo de novo:**
   `Cmd + Shift + R` no Mac, `Ctrl + F5` no Windows.
4. Se ainda assim não aparecer, ver o capítulo 13.

### Pelo computador, quando alguém mexe no código

> **GESTÃO TÉCNICA**

Quem trabalha com os ficheiros no computador tem de saber duas coisas:

1. **Trazer sempre o que está no GitHub antes de começar** (`git pull`). O
   painel grava diretamente no GitHub, e por isso a cópia do computador fica
   desatualizada sem aviso. Editar sem trazer primeiro é a única forma segura de
   perder trabalho.
2. **Depois de mexer em `estilos.css` ou em `motor.js`, correr `versionar.py`.**
   Esse script põe um carimbo no endereço desses ficheiros para o browser não
   servir a versão antiga. Sem isso, as alterações não aparecem a quem já
   visitou o site.

O ciclo completo, na pasta `site/`:

```bash
git pull
# … alterações …
python3 versionar.py     # carimba o CSS e o JavaScript
python3 verificar.py     # confere ligações, imagens e conteúdo
git add -A
git commit -m "o que mudou e porquê"
git push
```

---

## 11. Verificação depois de publicar

Duas ferramentas, e os olhos.

### `verificar.py` — a conferência automática

> **GESTÃO TÉCNICA**, mas vale a pena saber que existe.

Corre-se na pasta `site/` com `python3 verificar.py`. Confere, sem abrir o
browser:

- que as páginas e as âncoras a que as ligações apontam existem mesmo;
- que todas as imagens referidas estão lá;
- que nenhum caminho de imagem começa por barra;
- que os ficheiros de conteúdo são válidos;
- que cada ficheiro de conteúdo tem formulário no painel.

Devolve **«Tudo verificado. Sem falhas.»** ou a lista do que está partido.

### A conferência à mão, depois de cada publicação

1. Abrir a página onde a alteração devia aparecer.
2. Confirmar que aparece, e que está escrita como deve.
3. Carregar nos botões e ligações que acrescentou.
4. Ver a mesma página **no telemóvel**. É onde a maioria dos alunos entra.

---

## 12. Manutenção

### Todas as semanas

- Publicar o que houver para publicar: uma notícia, um evento.
- Passar os olhos pela entrada, para ver se o que lá está ainda faz sentido.

### Todos os períodos

- **Rever o horário** em *Informação geral*, sobretudo depois das interrupções.
- **Rever a agenda**: tirar o que já passou e não interessa guardar.
- **Trocar os destaques**: os livros da semana e os livros em destaque.
- **Abrir as ligações externas** dos formulários de *Ligações úteis* e *Aprender
  por disciplina*. Sítios institucionais mudam de endereço sem avisar.

### Uma vez por ano

- **Arquivar o ano letivo** que acabou, em *Arquivo por ano letivo*.
- **Rever a equipa**.
- **Rever os documentos oficiais** e as datas que aparecem em Conhecer.
- **Rever as fotografias publicadas** contra os consentimentos. Um aluno que
  saiu da escola pode ter deixado de ter autorização válida.

### Cópias de segurança

O GitHub guarda **todas as versões** de todos os ficheiros, com data e autor.
Nada do que grave se perde: pode sempre ver como estava antes e voltar atrás.

Isso não substitui uma cópia da pasta inteira antes de uma alteração grande.
Fazer uma cópia da pasta `site/` para outro sítio, antes de mexer em estrutura,
leva um minuto.

### Antes de uma alteração estrutural

> **GESTÃO TÉCNICA**

Alterar a estrutura de uma página, acrescentar uma secção nova ou mexer no
`motor.js` não se faz pelo painel. Antes de o fazer:

1. Cópia da pasta.
2. `git pull`.
3. A alteração.
4. `versionar.py` e `verificar.py`.
5. Ver as páginas afetadas no computador, e no tamanho de telemóvel.
6. Só então publicar.

---

## 13. Se alguma coisa correr mal

### Gravei no painel e o site não mudou

**Causa mais provável:** ainda não passou tempo suficiente, ou o browser está a
mostrar a versão que já tinha.

1. Esperar dois minutos.
2. Forçar o recarregamento: `Cmd + Shift + R` ou `Ctrl + F5`.
3. Se continuar igual, abrir a página numa janela privada.
4. Se aí aparecer, era o browser. Se não aparecer, continue para baixo.

### Continua sem mudar, mesmo em janela privada

**Causa provável:** o GitHub Pages não chegou a reconstruir o site.

1. Ver `https://www.githubstatus.com`. Se o **Actions** ou o **Pages**
   estiverem com problemas, é isso, e passa sozinho.
2. Se estiver tudo verde, ver no repositório, no separador **Actions**, se a
   última publicação falhou.

### Uma secção inteira desapareceu do site

**Causa mais provável:** o conteúdo dessa secção ficou vazio.

O site esconde secções vazias de propósito. Se apagou o último item de uma lista,
a secção deixa de aparecer.

1. Painel → o formulário dessa secção.
2. Confirmar se a lista tem itens e se algum está `publicado`.
3. Se estiverem todos em `rascunho`, é isso.

### Uma fotografia não aparece

| Sintoma | Causa provável | Solução |
|---|---|---|
| Espaço em branco no lugar da foto | O caminho está errado | Voltar ao painel e carregar a imagem outra vez pelo campo próprio |
| A foto aparece no computador e não no site | O caminho começa por barra | Corrigir no painel; nunca começar por `/` |
| A foto demora muito a aparecer | Ficheiro pesado de mais | Reduzir para a largura da tabela do capítulo 8 e menos de 300 KB, e voltar a carregar |

### O relógio da entrada diz sempre «Fechada»

**Causa:** o horário está escrito num formato que o site não sabe ler.

1. Painel → **Em todo o site** → **Informação geral e contactos**.
2. Confirmar que o horário está como `8h00` ou `08:00`.

### O painel não deixa entrar

| Sintoma | Causa | Solução |
|---|---|---|
| Fica parado em «Signing in…» | Carregou no botão azul | Usar **Sign In Using Access Token**, o de baixo |
| Diz que a chave não serve | A chave expirou | Criar outra, capítulo 5 |
| Entra mas não grava | A chave não tem `public_repo` | Criar outra com essa permissão marcada |

### Publiquei uma coisa errada e quero voltar atrás

> **GESTÃO NORMAL** para o caso simples.

Se acabou de gravar e sabe o que estava lá antes: volte ao painel, reponha o
valor antigo e grave outra vez.

> **GESTÃO TÉCNICA** para o resto.

O GitHub guarda todas as versões. Quem souber mexer no repositório consegue ver
exatamente como o ficheiro estava em qualquer momento e repô-lo. Nada se perde.

### Uma ligação leva a uma página de erro

1. Painel → o formulário onde a ligação está.
2. Abrir o endereço numa janela nova e ver onde vai dar.
3. Corrigir, ou apagar a ligação se o sítio deixou de existir.

---

## 14. Segurança e cuidados

Este capítulo é o mais importante do manual.

### O repositório é público

Tudo o que estiver no repositório pode ser visto por qualquer pessoa, **mesmo
que nenhuma página do site o mostre**. Um ficheiro que ninguém liga continua a
ser um ficheiro público.

### O que nunca entra no repositório

| Nunca | Porquê |
|---|---|
| **Listas de alunos**, com nome, turma ou número | Dados pessoais de menores |
| **Consentimentos** e autorizações | Contêm dados pessoais |
| **Documentos com dados pessoais** | Idem |
| **Fotografias sem autorização registada** | Ver abaixo |
| **A chave de acesso ao painel** | É a chave de casa |

O sítio destas coisas é o **OneDrive institucional**, que é privado.

### Fotografias de menores

O ponto **8.1.2 do Manual de Procedimentos da Biblioteca** exige, para
fotografias de menores, **autorização documentada e verificação prévia a cada
publicação**.

Na prática, e por ordem:

1. Confirmar que existe autorização registada para **aquelas pessoas**.
2. Desfocar os rostos, ou escolher uma fotografia onde não se reconheçam.
3. Só então carregar a fotografia pelo painel.

> **A desfocagem automática não é garantia.** Existe uma ferramenta no projeto
> que desfoca rostos, mas rostos pequenos, de perfil ou muito inclinados
> escapam-lhe. **Confira a fotografia com os seus olhos antes de a publicar**,
> e não publique nenhuma de que não tenha a certeza.

### Trabalhos de alunos

**Só primeiro nome e inicial do apelido.** Nunca o nome completo. Nunca a turma
ao lado do nome. Nunca contactos.

### Ficheiros que não se tocam sem saber o que se está a fazer

> **GESTÃO TÉCNICA**

| Ficheiro | O que é | O que acontece se se mexer |
|---|---|---|
| `motor.js` | O que desenha todas as páginas | O site inteiro deixa de funcionar |
| `estilos.css` | O aspeto de todas as páginas | O site fica desalinhado em todo o lado |
| `admin/config.yml` | A configuração do painel | O painel deixa de gravar |
| `.nojekyll` | Diz ao GitHub para não processar o site | As páginas deixam de aparecer |
| `*.html` | As páginas | A página em causa parte-se |

**No `admin/config.yml` há uma linha que aponta para o repositório**
(`BE-ESParedes/be.esp`). Se o repositório mudar de nome, essa linha tem de ser
corrigida ou **o painel deixa de gravar**.

### Antes de apagar seja o que for

1. Confirmar que mais ninguém usa aquilo.
2. Preferir pôr em `rascunho` a apagar.
3. Se for mesmo para apagar, saber que o GitHub guarda o histórico e permite
   repor.

---

## 15. Perguntas frequentes

**Posso editar o site do telemóvel?**
Pode, o painel abre no telemóvel. Mas escrever textos longos e carregar imagens
é bastante mais fácil no computador.

**Duas pessoas podem editar ao mesmo tempo?**
Podem, desde que em formulários diferentes. No mesmo formulário ao mesmo tempo,
a última a gravar apaga o trabalho da primeira.

**Preciso de saber programar?**
Não, para nada do que está nos capítulos 5 a 12.

**Onde é que os textos ficam guardados?**
Em ficheiros na pasta `content/`, um por bloco do site. O painel escreve-os.

**Posso acrescentar uma página nova pelo painel?**
Não. Acrescentar páginas é **gestão técnica**.

**Porque é que alguns formulários do painel não mudam nada no site?**
Porque há oito que editam conteúdo que o site não mostra. Estão todos juntos na
última secção do painel, **Sem efeito no site**, para não se editarem por
engano. Ver a nota abaixo.

**O site recolhe dados de quem o visita?**
Não. Não há rastreio, não há publicidade, não há cookies de terceiros.

### Nota: a secção «Sem efeito no site»

Oito formulários gravam sem dar erro e **nenhuma página mostra o que eles
guardam**. Ficaram de versões anteriores do site, e o conteúdo foi mantido de
propósito, caso volte a ser preciso. A 29 de agosto de 2026 passaram todos para
uma secção própria, no fim do painel: antes estavam misturados com os que
funcionam, e não havia como distingui-los sem os experimentar.

| Formulário | Porque não aparece |
|---|---|
| Quero… (cartões de missão) | o motor não carrega o ficheiro |
| Ferramentas | o motor não carrega o ficheiro |
| Calendário do ano letivo | o motor não carrega o ficheiro |
| Temas do calendário | o motor não carrega o ficheiro |
| Concursos | o motor não carrega o ficheiro |
| Catálogo · Cinco passos do tutorial | o motor não carrega o ficheiro |
| Catálogo · Campos de pesquisa | o motor não carrega o ficheiro |
| Vídeos | o motor lê-o, mas **nenhuma página tem o contentor** onde apareceria |

**Editá-los não estraga nada, mas também não muda nada no site.** Ligar algum
deles ao site é **gestão técnica**.

**Um formulário foi retirado do painel a 29/08/2026:** «Escolhas da Biblioteca».
O bloco das três montras por público saiu da página Ler a 25/08, por dizer pela
terceira vez, na mesma página, «vejam isto» — e a chamada que as desenhava saiu
com ele. O formulário ficou para trás e editava conteúdo invisível. O ficheiro
`content/escolhas.json` **continua guardado**, com as três montras escritas, para
o caso de um dia se querer o bloco de volta.

E há dois ficheiros **vazios à espera de conteúdo**, ambos em *5 · Participar*:
*Palavras em Ação · apresentação* e *Exposições · fotografias*. Assim que lhes
acrescentar itens pelo painel, as secções aparecem sozinhas.

---

## 16. Glossário

| Termo | O que quer dizer |
|---|---|
| **Painel** | A página em `/admin/` onde se edita o site por formulários |
| **Publicar / Publish** | Gravar. Faz tudo: grava e põe no ar |
| **Token** | A chave pessoal que dá acesso ao painel |
| **Repositório** | A pasta do site no GitHub, com todo o histórico |
| **GitHub Pages** | O serviço que mostra os ficheiros do repositório como um site |
| **JSON** | O formato dos ficheiros de conteúdo. Não é preciso mexer-lhes à mão |
| **Rascunho** | Gravado mas não visível no site |
| **Texto alternativo / alt** | A descrição da imagem, para quem não a vê |
| **Cache** | A cópia que o browser guarda. É o que faz uma alteração parecer não ter acontecido |
| **Cota** | O código que diz onde o livro está na estante, como `821-3 SAR/ENS` |
| **CDU** | A Classificação Decimal Universal, que dá as nove classes e as cores da sinalética |
| **Âncora** | Um sítio dentro de uma página, indicado por `#` no endereço |
| **Commit** | Uma gravação registada no histórico, com data e autor |

---

## 17. Lista de verificação antes de publicar

Para imprimir e ter ao lado.

**Antes de carregar em Publish**

- [ ] O texto está relido, sem gralhas
- [ ] As datas estão certas
- [ ] A imagem tem menos de 300 KB e a largura da tabela do capítulo 8
- [ ] A **descrição da imagem** está preenchida
- [ ] Se há pessoas na fotografia, **a autorização está confirmada** e os rostos
      estão tratados
- [ ] As ligações foram abertas e chegam ao sítio certo
- [ ] Nenhum endereço interno começa por `/`
- [ ] O **Estado** está em `publicado`
- [ ] A **Posição** põe o item onde ele deve ficar

**Depois de carregar em Publish**

- [ ] Esperei dois minutos
- [ ] Abri a página pública e forcei o recarregamento
- [ ] A alteração aparece, e está como devia
- [ ] Carreguei nos botões e ligações novos
- [ ] Vi a página no telemóvel

---

*Manual do Site da Biblioteca Escolar da Escola Secundária de Paredes.
Escrito a partir do estado do projeto a 26 de agosto de 2026. Se o site mudar,
este manual precisa de mudar com ele.*
