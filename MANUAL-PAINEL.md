# Anexo · Referência do painel de edição

**Os 52 formulários, campo a campo.** Este anexo é para consultar, não para ler
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


## 1 · Início

*A primeira página: as imagens do topo, as cinco áreas e o que está em destaque hoje.*

### Banners do topo

**Onde aparece:** em Início

**Tem hoje:** 4 itens

**Ficheiro:** `content/banners.json`

- **Banners** — lista · obrigatório
  - **Imagem de fundo** — imagem · opcional
    Larga e horizontal. Exportar até 300 KB.
  - **Descrição da imagem (acessibilidade)** — texto curto · opcional
    Descreve a imagem em poucas palavras, para quem não a vê.
  - **Etiqueta pequena** — texto curto · opcional
  - **Título** — texto curto · obrigatório
    Pode usar <em>palavra</em> para destacar uma palavra a dourado.
  - **Texto** — texto longo · opcional
  - **Botões** — lista · opcional
    - **Texto do botão** — texto curto · obrigatório
    - **Ligação** — texto curto · opcional
  - **Ocupar a largura toda** — sim/não · opcional · por omissão: `False`
    A imagem passa a fundo de largura inteira e o texto assenta por cima, à esquerda. Serve para logótipos largos.
  - **Lado da fotografia** — escolha · opcional
    Em branco alterna sozinho, um para cada lado.
  - **Mostrar o estado da Biblioteca** — sim/não · opcional · por omissão: `False`
    Em vez dos botões, mostra se está aberta ou fechada agora e as regras da sala. Use num cartaz só.
  - **A imagem é um logótipo** — sim/não · opcional · por omissão: `False`
    Assenta a imagem inteira no fundo da página, sem a cortar numa caixa.
  - **Imagem esbatida ao fundo** — sim/não · opcional · por omissão: `False`
  - **Posição** — número · opcional
    Número. Menor aparece primeiro.
  - **Estado** — escolha · opcional · por omissão: `publicado`

### As cinco áreas

**Onde aparece:** em Início

**Tem hoje:** 5 itens

**Ficheiro:** `content/areas.json`

- **Áreas** — lista · obrigatório
  - **Nome** — texto curto · obrigatório
  - **Frase** — texto longo · opcional
    Uma linha. Aparece quando a faixa abre.
  - **Página** — texto curto · obrigatório
    Ex.: ler.html
  - **Texto do botão** — texto curto · opcional
  - **Logótipo da plataforma** — imagem · opcional
    Fotografia da Biblioteca. Exportar até 300 KB.
  - **Descrição da imagem (acessibilidade)** — texto curto · opcional
  - **Posição** — número · opcional
  - **Estado** — escolha · opcional · por omissão: `publicado`

### Livros da semana (Início e Encontrar)

**Onde aparece:** em Início e Encontrar

**Tem hoje:** 5 itens

**Ficheiro:** `content/livrosSemana.json`

- **Livros** — lista · obrigatório
  - **Título** — texto curto · obrigatório
  - **Autor** — texto curto · opcional
  - **Capa** — imagem · opcional
    Exportar até 300 KB. Sem capa, o cartão mostra um marcador discreto.
  - **Descrição da imagem (acessibilidade)** — texto curto · opcional
  - **Para quem** — texto curto · opcional
    Ex.: 3.º ciclo; Secundário; Adultos e professores.
  - **Género** — texto curto · opcional
  - **Porque recomendamos (não aparece neste cartão)** — texto longo · opcional
    O cartão dos destaques da semana mostra só o para quem, o título e o autor, para as capas ficarem à frente. Esta frase fica guardada e não se perde: serve se um dia o livro passar para «Livros em destaque», na página Ler, onde a razão aparece.
  - **Endereço (opcional)** — texto curto · opcional
  - **Posição** — número · opcional
  - **Estado** — escolha · opcional · por omissão: `publicado`

### Rotina semanal, o painel «hoje» (Início e Participar)

**Onde aparece:** em Início e Participar

**Tem hoje:** 5 itens

**Ficheiro:** `content/rotina.json`

- **Linhas do horário** — lista · obrigatório
  - **Título** — texto curto · obrigatório
  - **Começa às** — texto curto · obrigatório
    Formato 24 horas: 08:30
  - **Termina às** — texto curto · obrigatório
    Formato 24 horas: 16:00
  - **Dias (1=segunda … 5=sexta)** — lista · obrigatório
    - **Dia** — número · obrigatório
  - **Onde** — texto curto · opcional
  - **Tipo** — texto curto · opcional
  - **Nota** — texto curto · opcional
  - **Frequência (ex.: mensal)** — texto curto · opcional
  - **Logótipo da plataforma** — imagem · opcional
    Exportar até 300 KB. O painel escreve o caminho sozinho.
  - **Descrição da imagem (acessibilidade)** — texto curto · opcional
    O que se vê na imagem, para quem não a vê.

### Regras de utilização do espaço

**Onde aparece:** em Início

**Tem hoje:** 6 itens

**Ficheiro:** `content/regrasSala.json`

- **Regras** — lista · obrigatório
  - **Regra** — texto curto · obrigatório
    Uma frase curta, na segunda pessoa ou no infinitivo.
  - **Posição** — número · opcional
    Número. Menor aparece primeiro.
  - **Estado** — escolha · opcional · por omissão: `publicado`


## 2 · Encontrar

*Como se encontra um livro: as estantes, o catálogo e o exemplo da cota.*

### Estantes

**Onde aparece:** em Encontrar

**Tem hoje:** 9 itens

**Ficheiro:** `content/estantes.json`

- **Estantes** — lista · obrigatório
  - **Classe (CDU)** — texto curto · obrigatório
  - **Designação** — texto curto · obrigatório
  - **Cor da classe** — texto curto · opcional
    Código como #388E3C, igual ao da sinalética.
  - **Onde fica na Biblioteca** — texto curto · opcional
  - **Nome da cor** — texto curto · opcional
    Como se diz na sinalética: castanho, lilás, vermelho, amarelo, verde, azul, rosa, amarelo acastanhado, roxo.
  - **O que lá está** — texto curto · opcional
    As matérias mais representadas, separadas por · — ajuda quem não sabe o que é «Classe 3».
  - **Descrição por extenso** — texto longo · opcional
    A frase que aparece em letra pequena quando o bloco da coleção abre, em Encontrar.
  - **Exemplares** — número · opcional
    Desenha a largura do bloco na estante da página inicial.
  - **Notações principais** — texto curto · opcional
  - **Posição** — número · opcional
  - **Estado** — escolha · opcional · por omissão: `publicado`
  - **Logótipo da plataforma** — imagem · opcional
    Exportar até 300 KB. O painel escreve o caminho sozinho.
  - **Descrição da imagem (acessibilidade)** — texto curto · opcional
    O que se vê na imagem, para quem não a vê.

### Biblioteca Digital

**Onde aparece:** em Encontrar

**Tem hoje:** 9 itens

**Ficheiro:** `content/bibliotecaDigital.json`

- **Recursos** — lista · obrigatório
  - **Nome** — texto curto · obrigatório
  - **Descrição breve** — texto longo · obrigatório
  - **Tipo** — escolha · obrigatório
  - **Tipo de acesso** — escolha · obrigatório
  - **Ligação** — texto curto · obrigatório
  - **Verificado pela Biblioteca** — sim/não · obrigatório · por omissão: `True`
  - **Imagem** — imagem · opcional
    Opcional. Exportar até 300 KB.
  - **Ícone** — escolha · opcional
  - **Destacar em «O que a Biblioteca está a destacar»** — sim/não · opcional · por omissão: `False`
    Aparece na montra da página Ler. Poucos e escolhidos.
  - **Posição** — número · opcional
    Número. Menor aparece primeiro; em branco vai para o fim.
  - **Estado** — escolha · opcional · por omissão: `publicado`
    Em rascunho fica escrito mas não aparece no site.

### A prateleira do exemplo

**Onde aparece:** em Encontrar

**Ficheiro:** `content/prateleiraExemplo.json`

- **Prateleira** — grupo · obrigatório
  - **Notação da classe** — texto curto · opcional
    Ex.: 821-3. Serve só de nota; a cor vem das Estantes.
  - **Lombadas** — lista · obrigatório
    - **Cota** — texto curto · obrigatório
      Como está na etiqueta. Ex.: 821-3 SAR/ENS
    - **Título** — texto curto · opcional
      Aparece ao passar o rato na lombada.
    - **É esta que se procura** — sim/não · opcional · por omissão: `False`


## 3 · Aprender

*Apoio ao estudo e à pesquisa: disciplinas, guiões, percursos e fontes.*

### Acesso rápido (aparece em Aprender)

**Onde aparece:** em aparece em Aprender

**Tem hoje:** 6 itens

**Ficheiro:** `content/acessoRapido.json`

- **Atalhos** — lista · obrigatório
  - **Título** — texto curto · obrigatório
  - **Subtítulo** — texto curto · opcional
  - **Texto do botão** — texto curto · opcional
    Ex.: Pesquisar, Abrir, Consultar.
  - **Ícone** — escolha · opcional
  - **Cor do cartão** — escolha · opcional
  - **Imagem de fundo (opcional)** — imagem · opcional
    Opcional. Exportar até 300 KB.
  - **Descrição da imagem** — texto curto · opcional
  - **Ligação** — texto curto · opcional

### Aprender por disciplina

**Onde aparece:** em Aprender

**Tem hoje:** 9 itens

**Ficheiro:** `content/disciplinas.json`

- **Disciplinas** — lista · obrigatório
  - **Disciplina** — texto curto · obrigatório
  - **Ícone** — escolha · opcional
  - **Áreas** — lista · opcional
    Os agrupamentos que aparecem dentro da disciplina. Ex.: Leituras, Fontes, Dados e estatística.
    - **Nome da área** — texto curto · obrigatório
    - **Recursos desta área** — lista · opcional
      - **Título** — texto curto · obrigatório
      - **Endereço** — texto curto · opcional
  - **Recursos (lista completa, com imagem)** — lista · opcional
    A mesma lista, em plano, com a imagem de cada recurso. O título e a área têm de coincidir com os de cima.
    - **Título** — texto curto · obrigatório
    - **Área a que pertence** — texto curto · opcional
    - **Endereço** — texto curto · opcional
    - **Logótipo ou imagem** — imagem · opcional
      Exportar até 300 KB.
    - **Descrição da imagem (acessibilidade)** — texto curto · opcional
  - **Logótipo da plataforma** — imagem · opcional
  - **Descrição da imagem (acessibilidade)** — texto curto · opcional
  - **Posição** — número · opcional
  - **Estado** — escolha · opcional · por omissão: `publicado`

### Guiões e métodos de estudo

**Onde aparece:** em Aprender

**Tem hoje:** 8 itens

**Ficheiro:** `content/guioes.json`

- **Guiões** — lista · obrigatório
  - **Título** — texto curto · obrigatório
  - **Descrição** — texto longo · opcional
  - **Ligação (PDF do OneDrive)** — texto curto · opcional
  - **Fonte** — texto curto · opcional
    Quem publica. Ex.: Rede de Bibliotecas Escolares.
  - **Etiqueta** — texto curto · opcional
    Ex.: Referencial oficial, Guião, Recursos selecionados.
  - **Ícone** — escolha · opcional
  - **Logótipo da plataforma** — imagem · opcional
    Exportar até 300 KB. O painel escreve o caminho sozinho.
  - **Descrição da imagem (acessibilidade)** — texto curto · opcional
    O que se vê na imagem, para quem não a vê.

### Percursos «hoje quero…»

**Onde aparece:** em Aprender

**Tem hoje:** 6 itens

**Ficheiro:** `content/percursos.json`

- **Percursos** — lista · obrigatório
  - **Identificador** — texto curto · obrigatório
    Sem espaços nem acentos: trabalho, teste, citar.
  - **Quero…** — texto curto · obrigatório
  - **Resumo** — texto longo · obrigatório
  - **Ícone** — texto curto · opcional
  - **Duração** — texto curto · opcional
  - **Ainda em preparação** — sim/não · opcional · por omissão: `False`
  - **Nota (só se estiver em preparação)** — texto curto · opcional
  - **Atalho no fim do percurso** — texto curto · opcional
    Endereço para onde o botão de fecho leva.
  - **Texto do atalho** — texto curto · opcional
  - **Passos** — lista · opcional
    - **Número** — texto curto · obrigatório
    - **Título** — texto curto · obrigatório
    - **Texto** — texto longo · obrigatório
      Aceita <em>itálico</em> e <br> para mudar de linha.
    - **Recursos deste passo** — lista · opcional
      - **Nome** — texto curto · obrigatório
      - **Ligação** — texto curto · opcional
  - **Posição** — número · opcional
    Número. Menor aparece primeiro; em branco vai para o fim.
  - **Estado** — escolha · opcional · por omissão: `publicado`
    Em rascunho fica escrito mas não aparece no site.
  - **Logótipo da plataforma** — imagem · opcional
    Exportar até 300 KB. O painel escreve o caminho sozinho.
  - **Descrição da imagem (acessibilidade)** — texto curto · opcional
    O que se vê na imagem, para quem não a vê.

### Literacia digital

**Onde aparece:** em Aprender

**Tem hoje:** 6 itens

**Ficheiro:** `content/literaciaPercurso.json`

- **Etapas** — lista · obrigatório
  - **Número** — texto curto · obrigatório
  - **Título** — texto curto · obrigatório
  - **Texto** — texto longo · obrigatório
  - **Ícone** — texto curto · opcional
  - **Logótipo da plataforma** — imagem · opcional
    Exportar até 300 KB. O painel escreve o caminho sozinho.
  - **Descrição da imagem (acessibilidade)** — texto curto · opcional
    O que se vê na imagem, para quem não a vê.

### Trabalhar com a Biblioteca (docentes)

**Onde aparece:** em Aprender

**Tem hoje:** 6 itens

**Ficheiro:** `content/docentes.json`

- **Pedidos** — lista · obrigatório
  - **Título** — texto curto · obrigatório
  - **O que é** — texto longo · opcional
  - **O que é preciso** — texto longo · opcional
    Formulário, antecedência, limites. É o que evita um pedido mal feito.
  - **Procedimento do Manual** — texto curto · opcional
    Ex.: POP-ART-01 · F07. Aparece em letra pequena no cartão.
  - **Ícone** — escolha · opcional
  - **Texto do botão** — texto curto · opcional
    Ex.: Propor uma sessão
  - **Que formulário usa** — escolha · opcional
    O endereço vem de «Informação geral». Deixe vazio se usar a Ligação direta abaixo.
  - **Ligação direta** — texto curto · opcional
    Só se o destino não for um formulário. Ex.: #guioes
  - **Assunto do correio** — texto curto · opcional
    Preenche o assunto quando não houver formulário.
  - **Logótipo da plataforma** — imagem · opcional
    Exportar até 300 KB.
  - **Descrição da imagem (acessibilidade)** — texto curto · opcional
  - **Posição** — número · opcional
  - **Estado** — escolha · opcional · por omissão: `publicado`

### Ligações úteis

**Onde aparece:** em Aprender

**Tem hoje:** 20 itens

**Ficheiro:** `content/ligacoesUteis.json`

- **Ligações** — lista · obrigatório
  - **Grupo** — escolha · obrigatório
  - **Nome** — texto curto · obrigatório
  - **Ligação** — texto curto · opcional
  - **Para que serve** — texto longo · opcional
    Uma frase, que aparece por baixo do nome.
  - **Tipo de acesso** — escolha · obrigatório
  - **Logótipo da plataforma** — imagem · opcional
    Exportar até 300 KB. O painel escreve o caminho sozinho.
  - **Descrição da imagem (acessibilidade)** — texto curto · opcional
    O que se vê na imagem, para quem não a vê.

### A Biblioteca explica

**Onde aparece:** em Aprender

**Tem hoje:** 6 itens

**Ficheiro:** `content/explica.json`

- **Explicações** — lista · obrigatório
  - **A pergunta** — texto curto · obrigatório
    Escrever como a pergunta chega ao balcão. Ex.: Posso usar qualquer imagem que encontre?
  - **Categoria** — texto curto · opcional
    Ex.: Pesquisa · Escrita · Direitos · Biblioteca.
  - **Ícone** — texto curto · opcional
    escudo · ficheiro · cadeado · cerebro · balao · local · info
  - **Resposta em uma linha** — texto longo · opcional
    O essencial, para quem não abre a explicação.
  - **A explicação** — texto longo · opcional
    Parágrafos separados por linha em branco. **entre asteriscos** fica a negrito.
  - **Onde saber mais** — lista · obrigatório
    - **Nome** — texto curto · obrigatório
    - **Endereço** — texto curto · obrigatório
      Endereço real e verificado, ou uma âncora do site.
  - **Destacar** — sim/não · opcional · por omissão: `False`
  - **Posição** — número · opcional
    Número. Menor aparece primeiro; em branco vai para o fim.
  - **Estado** — escolha · opcional · por omissão: `publicado`
    Em rascunho fica escrito mas não aparece no site.
  - **Logótipo da plataforma** — imagem · opcional
    Exportar até 300 KB. O painel escreve o caminho sozinho.
  - **Descrição da imagem (acessibilidade)** — texto curto · opcional
    O que se vê na imagem, para quem não a vê.


## 4 · Ler

*O que a Biblioteca dá a ler e a ouvir, em papel e em ecrã.*

### O que estamos a descobrir

**Onde aparece:** em Ler

**Ficheiro:** `content/semana.json`

- **A descoberta da semana** — grupo · obrigatório
  - **Período** — texto curto · opcional
    Ex.: Setembro de 2026. Só para a equipa se orientar.
  - **Frase de abertura** — texto longo · opcional
  - **Estado** — escolha · opcional · por omissão: `publicado`
    Em rascunho, a secção desaparece do site.
  - **Escolhas** — lista · obrigatório
    - **Rótulo** — texto curto · obrigatório
      Ex.: Audiolivro da semana.
    - **Ícone** — texto curto · opcional
    - **Onde vive a ficha** — escolha · obrigatório
    - **Título da ficha** — texto curto · obrigatório
      Escrito tal e qual como está na ficha.
    - **Porque é esta a escolha (não aparece neste cartão)** — texto longo · opcional
      Desde 31/08/2026 o cartão mostra só a etiqueta do formato, o título e o autor. Esta frase fica guardada, e é ela que aparece na ficha da própria obra, na página Ler.

### Sugestões de leitura

**Onde aparece:** em Ler

**Tem hoje:** 3 itens

**Ficheiro:** `content/sugestoesLeitura.json`

- **Faixas** — lista · obrigatório
  - **Nome da faixa** — texto curto · obrigatório
  - **Subtítulo** — texto curto · opcional
  - **Livros** — lista · obrigatório
    - **Título** — texto curto · opcional
    - **Autor** — texto curto · opcional
    - **Capa** — imagem · opcional
      Vertical, 2:3. Até 120 KB.
    - **Descrição da capa** — texto curto · opcional
    - **Ligação** — texto curto · opcional
  - **Posição** — número · opcional
    Número. Menor aparece primeiro; em branco vai para o fim.
  - **Estado** — escolha · opcional · por omissão: `publicado`
    Em rascunho fica escrito mas não aparece no site.

### Livros em destaque (Ler e Encontrar)

**Onde aparece:** em Ler e Encontrar

**Tem hoje:** 4 itens

**Ficheiro:** `content/destaquesLer.json`

- **Livros** — lista · obrigatório
  - **Título** — texto curto · obrigatório
  - **Autor** — texto curto · opcional
  - **Cota** — texto curto · opcional
    Como está na etiqueta da lombada. Ex.: 821-3 FER/APA
  - **Capa** — imagem · opcional
    Exportar até 300 KB. Sem capa, o cartão mostra um marcador discreto.
  - **Descrição da imagem (acessibilidade)** — texto curto · opcional
  - **Para quem** — texto curto · opcional
    Ex.: 3.º ciclo; Secundário; Adultos e professores.
  - **A razão em duas palavras** — texto curto · opcional
    Ex.: Do programa; Para começar. Nunca só popularidade.
  - **Porque é que a Biblioteca recomenda isto?** — texto longo · opcional
    Uma ou duas frases nossas, para alunos.
  - **Posição** — número · opcional
  - **Estado** — escolha · opcional · por omissão: `publicado`

### Plataformas de leitura (Ler e Aprender)

**Onde aparece:** em Ler e Aprender

**Tem hoje:** 13 itens

**Ficheiro:** `content/plataformas.json`

- **Plataformas** — lista · obrigatório
  - **Nome** — texto curto · obrigatório
  - **Separador** — escolha · obrigatório
  - **Descrição** — texto longo · opcional
    Uma ou duas frases. O que lá está e para que serve.
  - **Condições de acesso** — texto curto · opcional
    Separe por · . O PRIMEIRO pedaço vira a etiqueta do cartão, porque é o que decide se a pessoa pode usar aquilo; o resto fica em letra pequena. Ex.: Acesso livre · Sem registo · ePub, Kindle, HTML
  - **Endereço** — texto curto · obrigatório
    Confirme que abre antes de gravar. Um endereço morto é pior do que nenhum.
  - **Logótipo da plataforma** — imagem · opcional
    O logótipo da plataforma, mostrado inteiro sobre branco — já não é fundo do cartão, por isso pode ser largo ou quadrado. Exportar até 300 KB.
  - **Descrição da imagem (acessibilidade)** — texto curto · opcional
  - **Posição** — número · opcional
  - **Estado** — escolha · opcional · por omissão: `publicado`

### Livros digitais

**Onde aparece:** em Ler

**Tem hoje:** 15 itens

**Ficheiro:** `content/livrosDigitais.json`

- **Livros digitais** — lista · obrigatório
  - **Título** — texto curto · obrigatório
  - **Autor** — texto curto · opcional
  - **Capa** — imagem · opcional
    Exportar até 300 KB. O painel escreve o caminho sozinho.
  - **Descrição da imagem (acessibilidade)** — texto curto · opcional
    O que se vê na imagem, para quem não a vê. Não é a recomendação.
  - **Porque é que a Biblioteca recomenda isto?** — texto longo · opcional
    Uma ou duas frases nossas, para alunos. Não copiar do site de origem.
  - **Para quem** — texto curto · opcional
    Ex.: 10.º ao 12.º ano; todos os anos.
  - **Género ou tema** — texto curto · opcional
  - **Fonte ou plataforma** — texto curto · opcional
    Quem disponibiliza. Ex.: Imprensa Nacional, RTP Antena 2.
  - **Endereço (URL)** — texto curto · opcional
    O endereço real e verificado. Uma ligação inventada é pior do que uma ficha por preencher.
  - **Texto do botão** — texto curto · opcional
    Ex.: Ler online, Ouvir. Por omissão: Abrir.
  - **Destacar em «O que a Biblioteca está a destacar»** — sim/não · opcional · por omissão: `False`
    Aparece na montra da página Ler. Poucos e escolhidos.
  - **Direitos ou licença** — texto curto · opcional
  - **Motivo do destaque (2 a 4 palavras)** — texto curto · opcional
    Ex.: Ligação ao currículo; Excelente para começar; Recurso pouco conhecido. Aparece no cartão.
  - **Relaciona-se com** — texto curto · opcional
    Disciplinas ou temas, separados por vírgula. Ex.: Português, História.
  - **Posição** — número · opcional
    Número. Menor aparece primeiro; em branco vai para o fim.
  - **Estado** — escolha · opcional · por omissão: `publicado`
    Em rascunho fica escrito mas não aparece no site.

### Audiolivros

**Onde aparece:** em Ler

**Tem hoje:** 12 itens

**Ficheiro:** `content/audiolivros.json`

- **Audiolivros** — lista · obrigatório
  - **Título** — texto curto · obrigatório
  - **Autor** — texto curto · opcional
  - **Capa** — imagem · opcional
    Exportar até 300 KB. O painel escreve o caminho sozinho.
  - **Descrição da imagem (acessibilidade)** — texto curto · opcional
    O que se vê na imagem, para quem não a vê. Não é a recomendação.
  - **Porque é que a Biblioteca recomenda isto?** — texto longo · opcional
    Uma ou duas frases nossas, para alunos. Não copiar do site de origem.
  - **Para quem** — texto curto · opcional
    Ex.: 10.º ao 12.º ano; todos os anos.
  - **Género ou tema** — texto curto · opcional
  - **Lido por** — texto curto · opcional
  - **Duração** — texto curto · opcional
    Ex.: 4 h 24 min; 33 min.
  - **Fonte ou plataforma** — texto curto · opcional
    Quem disponibiliza. Ex.: Imprensa Nacional, RTP Antena 2.
  - **Endereço (URL)** — texto curto · opcional
    O endereço real e verificado. Uma ligação inventada é pior do que uma ficha por preencher.
  - **Texto do botão** — texto curto · opcional
    Ex.: Ler online, Ouvir. Por omissão: Abrir.
  - **Destacar em «O que a Biblioteca está a destacar»** — sim/não · opcional · por omissão: `False`
    Aparece na montra da página Ler. Poucos e escolhidos.
  - **Direitos ou licença** — texto curto · opcional
  - **Motivo do destaque (2 a 4 palavras)** — texto curto · opcional
    Ex.: Ligação ao currículo; Excelente para começar; Recurso pouco conhecido. Aparece no cartão.
  - **Relaciona-se com** — texto curto · opcional
    Disciplinas ou temas, separados por vírgula. Ex.: Português, História.
  - **Posição** — número · opcional
    Número. Menor aparece primeiro; em branco vai para o fim.
  - **Estado** — escolha · opcional · por omissão: `publicado`
    Em rascunho fica escrito mas não aparece no site.

### Podcasts

**Onde aparece:** em Ler

**Tem hoje:** 4 itens

**Ficheiro:** `content/podcasts.json`

- **Podcasts** — lista · obrigatório
  - **Título** — texto curto · obrigatório
  - **Autor ou emissora** — texto curto · opcional
  - **Imagem** — imagem · opcional
    Exportar até 300 KB. O painel escreve o caminho sozinho.
  - **Descrição da imagem (acessibilidade)** — texto curto · opcional
    O que se vê na imagem, para quem não a vê. Não é a recomendação.
  - **Porque é que a Biblioteca recomenda isto?** — texto longo · opcional
    Uma ou duas frases nossas, para alunos. Não copiar do site de origem.
  - **Para quem** — texto curto · opcional
    Ex.: 10.º ao 12.º ano; todos os anos.
  - **Género ou tema** — texto curto · opcional
  - **Duração ou periodicidade** — texto curto · opcional
  - **Fonte ou plataforma** — texto curto · opcional
    Quem disponibiliza. Ex.: Imprensa Nacional, RTP Antena 2.
  - **Endereço (URL)** — texto curto · opcional
    O endereço real e verificado. Uma ligação inventada é pior do que uma ficha por preencher.
  - **Texto do botão** — texto curto · opcional
    Ex.: Ler online, Ouvir. Por omissão: Abrir.
  - **Destacar em «O que a Biblioteca está a destacar»** — sim/não · opcional · por omissão: `False`
    Aparece na montra da página Ler. Poucos e escolhidos.
  - **Direitos ou licença** — texto curto · opcional
  - **Motivo do destaque (2 a 4 palavras)** — texto curto · opcional
    Ex.: Ligação ao currículo; Excelente para começar; Recurso pouco conhecido. Aparece no cartão.
  - **Relaciona-se com** — texto curto · opcional
    Disciplinas ou temas, separados por vírgula. Ex.: Português, História.
  - **Posição** — número · opcional
    Número. Menor aparece primeiro; em branco vai para o fim.
  - **Estado** — escolha · opcional · por omissão: `publicado`
    Em rascunho fica escrito mas não aparece no site.

### Leitura acessível

**Onde aparece:** em Ler

**Tem hoje:** 4 itens

**Ficheiro:** `content/leituraAcessivel.json`

- **Leitura acessível** — lista · obrigatório
  - **Título** — texto curto · obrigatório
  - **Autor ou entidade** — texto curto · opcional
  - **Imagem** — imagem · opcional
    Exportar até 300 KB. O painel escreve o caminho sozinho.
  - **Descrição da imagem (acessibilidade)** — texto curto · opcional
    O que se vê na imagem, para quem não a vê. Não é a recomendação.
  - **Porque é que a Biblioteca recomenda isto?** — texto longo · opcional
    Uma ou duas frases nossas, para alunos. Não copiar do site de origem.
  - **Para quem** — texto curto · opcional
    Ex.: 10.º ao 12.º ano; todos os anos.
  - **Género ou tema** — texto curto · opcional
  - **Fonte ou plataforma** — texto curto · opcional
    Quem disponibiliza. Ex.: Imprensa Nacional, RTP Antena 2.
  - **Endereço (URL)** — texto curto · opcional
    O endereço real e verificado. Uma ligação inventada é pior do que uma ficha por preencher.
  - **Texto do botão** — texto curto · opcional
    Ex.: Ler online, Ouvir. Por omissão: Abrir.
  - **Destacar em «O que a Biblioteca está a destacar»** — sim/não · opcional · por omissão: `False`
    Aparece na montra da página Ler. Poucos e escolhidos.
  - **Direitos ou licença** — texto curto · opcional
  - **Motivo do destaque (2 a 4 palavras)** — texto curto · opcional
    Ex.: Ligação ao currículo; Excelente para começar; Recurso pouco conhecido. Aparece no cartão.
  - **Relaciona-se com** — texto curto · opcional
    Disciplinas ou temas, separados por vírgula. Ex.: Português, História.
  - **Posição** — número · opcional
    Número. Menor aparece primeiro; em branco vai para o fim.
  - **Estado** — escolha · opcional · por omissão: `publicado`
    Em rascunho fica escrito mas não aparece no site.


## 5 · Participar

*O que está a acontecer: notícias, agenda, exposições, projetos e trabalhos dos alunos.*

### Notícias

**Onde aparece:** em Participar

**Tem hoje:** 7 itens

**Ficheiro:** `content/noticias.json`

- **Notícias** — lista · obrigatório
  - **Título** — texto curto · obrigatório
  - **Data** — data · obrigatório
    Define a ordem. A mais recente aparece primeiro.
  - **Data como aparece no site** — texto curto · obrigatório
    Ex.: 14 out 2026
  - **Categoria** — escolha · obrigatório
  - **Resumo** — texto longo · obrigatório
  - **Fotografia** — imagem · opcional
    Só com consentimento RGPD registado. Exportar até 300 KB.
  - **Descrição da imagem (acessibilidade)** — texto curto · opcional
    O que se vê na imagem, para quem não a vê.
  - **Emoji (se não houver fotografia)** — texto curto · opcional · por omissão: `📖`
  - **Cor (se não houver fotografia)** — escolha · opcional
  - **Ligação (opcional)** — texto curto · opcional
  - **É um exemplo por substituir** — sim/não · opcional · por omissão: `False`

### Agenda (Participar e Conhecer)

**Onde aparece:** em Participar e Conhecer

**Tem hoje:** 4 itens

**Ficheiro:** `content/agenda.json`

- **Eventos** — lista · obrigatório
  - **Dia** — texto curto · obrigatório
    Ex.: 14
  - **Mês** — escolha · obrigatório
  - **Ano** — texto curto · obrigatório
    Ex.: 2026
  - **Título** — texto curto · obrigatório
  - **Local e hora** — texto curto · opcional
    Ex.: Biblioteca · 14h30
  - **Ligação (opcional)** — texto curto · opcional
  - **Logótipo da plataforma** — imagem · opcional
    Exportar até 300 KB. O painel escreve o caminho sozinho.
  - **Descrição da imagem (acessibilidade)** — texto curto · opcional
    O que se vê na imagem, para quem não a vê.

### Exposições

**Onde aparece:** em Participar

**Tem hoje:** 2 itens

**Ficheiro:** `content/exposicoes.json`

- **Exposições** — lista · obrigatório
  - **Título** — texto curto · obrigatório
  - **Período** — texto curto · obrigatório
    Ex.: Março de 2026
  - **Descrição** — texto longo · obrigatório
  - **Fotografias** — lista · opcional
    - **Fotografia** — imagem · opcional
    - **Descrição da imagem** — texto curto · opcional
  - **Logótipo da plataforma** — imagem · opcional
    Exportar até 300 KB. O painel escreve o caminho sozinho.

### Exposições · fotografias

**Onde aparece:** em Participar

**Tem hoje:** 12 itens

**Ficheiro:** `content/exposicaoFotos.json`

- **Fotografias** — lista · obrigatório
  - **Fotografia** — imagem · obrigatório
    Exportar até 400 KB. O painel escreve o caminho sozinho.
  - **Legenda** — texto curto · opcional
    A frase que aparece por baixo da imagem.
  - **Descrição da imagem (acessibilidade)** — texto curto · opcional
    O que se vê na imagem, para quem não a vê.
  - **Posição** — número · opcional
    Número. Menor aparece primeiro.
  - **Estado** — escolha · opcional · por omissão: `publicado`

### Trabalhos dos alunos

**Onde aparece:** em Participar

**Tem hoje:** 4 itens

**Ficheiro:** `content/galeriaAlunos.json`

- **Faixas** — lista · obrigatório
  - **Nome da faixa** — texto curto · obrigatório
  - **Ícone** — texto curto · opcional
  - **Subtítulo** — texto curto · opcional
  - **Texto quando a faixa está vazia** — texto longo · opcional
    Aparece no lugar dos trabalhos enquanto não houver nenhum publicado.
  - **Trabalhos** — lista · obrigatório
    - **Título** — texto curto · opcional
    - **Turma** — texto curto · opcional
    - **Quem fez** — texto curto · opcional
      Primeiro nome e inicial do apelido, nunca o nome completo (RGPD).
    - **Nasceu em que atividade** — texto curto · opcional
      Ex.: Semana da Leitura; Clube de Leitura.
    - **O que é este trabalho?** — texto longo · opcional
      Uma ou duas frases sobre o trabalho. É o que o valoriza.
    - **Destacar este trabalho** — sim/não · opcional · por omissão: `False`
    - **Ano letivo** — texto curto · opcional
    - **Miniatura** — imagem · opcional
    - **Descrição da imagem** — texto curto · opcional
    - **Ligação** — texto curto · opcional
    - **É o cartão-modelo** — sim/não · opcional · por omissão: `False`
      Deixe ligado só no exemplo. Desligue quando puser um trabalho a sério.
  - **Posição** — número · opcional
    Número. Menor aparece primeiro; em branco vai para o fim.
  - **Estado** — escolha · opcional · por omissão: `publicado`
    Em rascunho fica escrito mas não aparece no site.

### Projetos da Biblioteca (Participar e Início)

**Onde aparece:** em Participar e Início

**Tem hoje:** 9 itens

**Ficheiro:** `content/projetos.json`

- **Projetos** — lista · obrigatório
  - **Nome** — texto curto · obrigatório
  - **Descrição** — texto longo · obrigatório
  - **Estado** — escolha · obrigatório
  - **Imagem** — imagem · opcional
    Opcional. Exportar até 300 KB.
  - **Descrição da imagem (acessibilidade)** — texto curto · opcional
    O que se vê na imagem, para quem não a vê.
  - **Ícone** — escolha · opcional

### Iniciativas nacionais (Participar e Início)

**Onde aparece:** em Participar e Início

**Tem hoje:** 27 itens

**Ficheiro:** `content/iniciativasNacionais.json`

- **Iniciativas** — lista · obrigatório
  - **Nome** — texto curto · obrigatório
  - **Área** — escolha · obrigatório
  - **Descrição** — texto longo · obrigatório
  - **Estado** — escolha · obrigatório
  - **Ligação oficial** — texto curto · opcional
  - **Imagem** — imagem · opcional
    Opcional. Exportar até 300 KB.
  - **Ícone** — escolha · opcional

### Palavras em Ação · apresentação

**Onde aparece:** em Participar

**Tem hoje:** 0 itens

**Ficheiro:** `content/apresentacaoProjeto.json`

- **Diapositivos** — lista · obrigatório
  - **Diapositivo** — imagem · obrigatório
    Exportar até 400 KB. O painel escreve o caminho sozinho.
  - **Legenda** — texto curto · opcional
    A frase que aparece por baixo da imagem.
  - **Descrição da imagem (acessibilidade)** — texto curto · opcional
    O que se vê na imagem, para quem não a vê.
  - **Posição** — número · opcional
    Número. Menor aparece primeiro.
  - **Estado** — escolha · opcional · por omissão: `publicado`

### Arquivo por ano letivo

**Onde aparece:** em Participar

**Tem hoje:** 2 itens

**Ficheiro:** `content/arquivoAnos.json`

- **Anos letivos** — lista · obrigatório
  - **Ano letivo** — texto curto · obrigatório
  - **Estado** — texto curto · obrigatório
  - **Resumo do ano** — texto longo · obrigatório
  - **Destaques** — lista · opcional
    - **Nome** — texto curto · obrigatório
    - **Quando** — texto curto · obrigatório
    - **Descrição** — texto longo · obrigatório
    - **Fotografia** — imagem · opcional
    - **Descrição da imagem** — texto curto · opcional
    - **Ligação** — texto curto · opcional


## 6 · Conhecer

*A Biblioteca, o espaço, as pessoas e os documentos que a regem.*

### O que fazemos (seis áreas)

**Onde aparece:** em Conhecer

**Tem hoje:** 6 itens

**Ficheiro:** `content/pilares.json`

- **Áreas de trabalho** — lista · obrigatório
  - **Nome** — texto curto · obrigatório
  - **Descrição** — texto longo · obrigatório
  - **Logótipo da plataforma** — imagem · opcional
  - **Descrição da imagem** — texto curto · opcional
  - **Ícone** — texto curto · opcional

### Zonas do espaço

**Onde aparece:** em Conhecer

**Tem hoje:** 4 itens

**Ficheiro:** `content/zonas.json`

- **Zonas** — lista · obrigatório
  - **Nome da zona** — texto curto · obrigatório
  - **Descrição** — texto longo · obrigatório
  - **Fotografia** — imagem · opcional
  - **Descrição da imagem** — texto curto · opcional

### Galeria de fotografias

**Onde aparece:** em Conhecer

**Tem hoje:** 8 itens

**Ficheiro:** `content/galeria.json`

- **Fotografias** — lista · obrigatório
  - **Fotografia** — imagem · opcional
  - **Descrição da imagem (acessibilidade)** — texto curto · opcional
  - **Legenda** — texto curto · obrigatório

### Como funciona (quatro passos)

**Onde aparece:** em Conhecer

**Tem hoje:** 4 itens

**Ficheiro:** `content/passos.json`

- **Passos** — lista · obrigatório
  - **Número** — texto curto · obrigatório
  - **Título** — texto curto · obrigatório
  - **Texto** — texto longo · obrigatório
  - **Ilustração** — imagem · opcional
    Opcional. Exportar até 300 KB.
  - **Descrição da imagem (acessibilidade)** — texto curto · opcional

### Perguntas frequentes

**Onde aparece:** em Conhecer

**Tem hoje:** 5 itens

**Ficheiro:** `content/faq.json`

- **Perguntas** — lista · obrigatório
  - **Pergunta** — texto curto · obrigatório
  - **Resposta** — texto longo · obrigatório
  - **Logótipo da plataforma** — imagem · opcional
    Exportar até 300 KB. O painel escreve o caminho sozinho.
  - **Descrição da imagem (acessibilidade)** — texto curto · opcional
    O que se vê na imagem, para quem não a vê.

### Equipa da Biblioteca

**Onde aparece:** em Conhecer

**Tem hoje:** 4 itens

**Ficheiro:** `content/equipa.json`

- **Pessoas** — lista · obrigatório
  - **Nome** — texto curto · obrigatório
  - **Iniciais** — texto curto · obrigatório
    Duas letras: CC, CF, AO.
  - **Função** — texto curto · obrigatório
  - **Detalhe (abre na janela)** — texto longo · obrigatório
  - **Fotografia** — imagem · opcional
    Opcional. Exportar até 300 KB.
  - **Descrição da imagem (acessibilidade)** — texto curto · opcional

### Documentos oficiais

**Onde aparece:** em Conhecer

**Tem hoje:** 7 itens

**Ficheiro:** `content/documentos.json`

- **Documentos** — lista · obrigatório
  - **Título** — texto curto · obrigatório
  - **Ligação de partilha do OneDrive** — texto curto · opcional
    Vazio = aparece como «brevemente disponível».
  - **Logótipo da plataforma** — imagem · opcional
    Exportar até 300 KB. O painel escreve o caminho sozinho.
  - **Descrição da imagem (acessibilidade)** — texto curto · opcional
    O que se vê na imagem, para quem não a vê.

### Projetos da escola

**Onde aparece:** em Conhecer

**Tem hoje:** 5 itens

**Ficheiro:** `content/projetosEscola.json`

- **Projetos** — lista · obrigatório
  - **Nome** — texto curto · obrigatório
  - **Ligação** — texto curto · opcional
  - **Descrição** — texto longo · opcional
  - **Grupo** — texto curto · opcional
    Ex.: Projetos. Agrupa os cartões na página.
  - **Imagem** — imagem · opcional
    Opcional. Exportar até 300 KB.
  - **Ícone** — escolha · opcional


## Em todo o site

*O que não pertence a uma página só: contactos, cartões fixos e a área da equipa.*

### Informação geral e contactos

**Onde aparece:** em todas as páginas

**Ficheiro:** `content/info.json`

- **Informação** — grupo · obrigatório
  - **Nome** — texto curto · obrigatório
  - **Escola** — texto curto · obrigatório
  - **Correio eletrónico** — texto curto · obrigatório
  - **Telefone** — texto curto · obrigatório
  - **Horário (curto)** — texto curto · obrigatório
  - **Horário (versão longa)** — texto longo · obrigatório
  - **Localização** — texto curto · obrigatório
  - **Lugares** — texto curto · obrigatório
  - **Código RBE** — texto curto · obrigatório
  - **Atendimento (curto)** — texto curto · opcional
  - **Atendimento (versão longa)** — texto longo · opcional
  - **Cota de exemplo** — texto curto · opcional
    Alimenta o infográfico «Da cota à estante», em Encontrar. Confirme-a no catálogo.
  - **Vídeo do tutorial (YouTube)** — texto curto · opcional
  - **Equipa** — lista · obrigatório
    - **Função** — texto curto · obrigatório
    - **Nome** — texto curto · obrigatório
  - **Missão (texto completo)** — texto longo · obrigatório
  - **Missão (versão curta)** — texto longo · obrigatório
  - **Instagram** — texto curto · opcional
  - **Facebook** — texto curto · opcional
  - **Canal de YouTube** — texto curto · opcional
  - **Site da escola** — texto curto · opcional
  - **Catálogo — pesquisa simples** — texto curto · opcional
  - **Catálogo — pesquisa avançada** — texto curto · opcional
  - **Biblioteca Municipal** — texto curto · opcional
  - **Portal RBE** — texto curto · opcional
  - **PNL2027** — texto curto · opcional
  - **DGE** — texto curto · opcional
  - **Mapa** — texto curto · opcional
  - **Formulário: reservar a Biblioteca para uma turma** — texto curto · opcional
    Endereço do Microsoft Forms. Alimenta o bloco «Trabalhar com a Biblioteca», em Aprender. Se ficar vazio, o site usa o correio.
  - **Formulário: pedir ajuda a encontrar ou a pesquisar** — texto curto · opcional
    Endereço do Microsoft Forms. Abre dentro da página em Encontrar. Se ficar vazio, o site usa o correio.
  - **Formulário: sessão de articulação curricular (F07)** — texto curto · opcional
    Para docentes. Se ficar vazio, o site usa o correio.
  - **Formulário: requisitar livros para a aula (F08)** — texto curto · opcional
    Para docentes. Se ficar vazio, o site usa o correio.
  - **Formulário: sugerir uma aquisição (F03)** — texto curto · opcional
    Aberto a toda a comunidade. Se ficar vazio, o site usa o correio.
  - **Repositório do site** — texto curto · opcional

### Personalizar os cartões fixos

**Onde aparece:** em todas as páginas

**Tem hoje:** 2 itens

**Ficheiro:** `content/cartoes.json`

- **Cartões** — lista · opcional
  - **Identificador do cartão** — texto curto · obrigatório
    O valor de data-card no HTML.
  - **Título** — texto curto · opcional
  - **Texto** — texto longo · opcional
  - **Ligação** — texto curto · opcional
  - **Imagem** — imagem · opcional
    Opcional. Exportar até 300 KB.
  - **Descrição da imagem (acessibilidade)** — texto curto · opcional
    O que se vê na imagem, para quem não a vê.

### Ligações da equipa (página da equipa)

**Onde aparece:** em todas as páginas

**Ficheiro:** `content/areaTrabalho.json`

- **Área de trabalho** — grupo · obrigatório
  - **Ligações** — lista · obrigatório
    - **Nome** — texto curto · obrigatório
    - **Ligação** — texto curto · opcional
  - **Logótipo da plataforma** — imagem · opcional
    Exportar até 300 KB. O painel escreve o caminho sozinho.
  - **Descrição da imagem (acessibilidade)** — texto curto · opcional
    O que se vê na imagem, para quem não a vê.


## Sem efeito no site — a decidir

*Estas fichas gravam, mas nada delas aparece no site: o motor não as lê, ou não há página com o contentor onde apareceriam. Ficam aqui, à parte, para não se editarem por engano. A decidir uma a uma: ligar ao site ou retirar.*

### Quero… (cartões de missão)

> ⚠️ **Este formulário não muda nada no site neste momento.** Ou o motor não
> lê o ficheiro, ou não há página com o contentor onde o conteúdo apareceria.
> Grava sem dar erro, e não se vê. Está à espera de decisão: ligar ou retirar.

**Tem hoje:** 6 itens

**Ficheiro:** `content/missoes.json`

- **Missões** — lista · obrigatório
  - **Quero…** — texto curto · obrigatório
    Comece por um verbo: encontrar, fazer, participar.
  - **Explicação** — texto curto · obrigatório
  - **Ícone** — escolha · obrigatório
  - **Para onde leva** — texto curto · obrigatório
  - **Logótipo da plataforma** — imagem · opcional
    Exportar até 300 KB. O painel escreve o caminho sozinho.
  - **Descrição da imagem (acessibilidade)** — texto curto · opcional
    O que se vê na imagem, para quem não a vê.

### Ferramentas

> ⚠️ **Este formulário não muda nada no site neste momento.** Ou o motor não
> lê o ficheiro, ou não há página com o contentor onde o conteúdo apareceria.
> Grava sem dar erro, e não se vê. Está à espera de decisão: ligar ou retirar.

**Tem hoje:** 0 itens

**Ficheiro:** `content/ferramentas.json`

- **Ferramentas** — lista · obrigatório
  - **Nome** — texto curto · obrigatório
  - **O que é** — texto longo · opcional
  - **Para que serve** — texto longo · opcional
  - **Quando usar** — texto longo · opcional
  - **Tarefa** — escolha · opcional
  - **Endereço (URL)** — texto curto · opcional
  - **Ícone** — texto curto · opcional
  - **Mostrar nos destaques** — sim/não · opcional
  - **Logótipo da plataforma** — imagem · opcional
    Exportar até 300 KB. O painel escreve o caminho sozinho.
  - **Descrição da imagem (acessibilidade)** — texto curto · opcional
    O que se vê na imagem, para quem não a vê.

### Calendário do ano letivo

> ⚠️ **Este formulário não muda nada no site neste momento.** Ou o motor não
> lê o ficheiro, ou não há página com o contentor onde o conteúdo apareceria.
> Grava sem dar erro, e não se vê. Está à espera de decisão: ligar ou retirar.

**Tem hoje:** 10 itens

**Ficheiro:** `content/calendarioAno.json`

- **Meses** — lista · obrigatório
  - **Mês** — texto curto · obrigatório
  - **Ano** — texto curto · obrigatório
  - **Lema do mês** — texto curto · obrigatório
  - **Descrição** — texto longo · obrigatório
  - **Ícone** — texto curto · opcional
  - **Atividades** — lista · obrigatório
    - **Nome** — texto curto · obrigatório
    - **Público-alvo** — texto curto · obrigatório
    - **Domínio do PAA** — escolha · obrigatório
    - **Tema** — escolha · obrigatório
  - **Logótipo da plataforma** — imagem · opcional
    Exportar até 300 KB. O painel escreve o caminho sozinho.
  - **Descrição da imagem (acessibilidade)** — texto curto · opcional
    O que se vê na imagem, para quem não a vê.

### Temas do calendário

> ⚠️ **Este formulário não muda nada no site neste momento.** Ou o motor não
> lê o ficheiro, ou não há página com o contentor onde o conteúdo apareceria.
> Grava sem dar erro, e não se vê. Está à espera de decisão: ligar ou retirar.

**Tem hoje:** 6 itens

**Ficheiro:** `content/temasAtividades.json`

- **Temas** — lista · obrigatório
  - **Identificador** — texto curto · obrigatório
  - **Nome** — texto curto · obrigatório
  - **Ícone** — texto curto · opcional
  - **Logótipo da plataforma** — imagem · opcional
    Exportar até 300 KB. O painel escreve o caminho sozinho.
  - **Descrição da imagem (acessibilidade)** — texto curto · opcional
    O que se vê na imagem, para quem não a vê.

### Concursos

> ⚠️ **Este formulário não muda nada no site neste momento.** Ou o motor não
> lê o ficheiro, ou não há página com o contentor onde o conteúdo apareceria.
> Grava sem dar erro, e não se vê. Está à espera de decisão: ligar ou retirar.

**Tem hoje:** 4 itens

**Ficheiro:** `content/concursos.json`

- **Concursos** — lista · obrigatório
  - **Nome** — texto curto · obrigatório
  - **Estado** — escolha · obrigatório
  - **Quando** — texto curto · obrigatório
  - **Para quem** — texto curto · obrigatório
  - **Descrição** — texto longo · obrigatório
  - **Ligação** — texto curto · opcional
  - **Imagem** — imagem · opcional
  - **Descrição da imagem** — texto curto · opcional

### Catálogo · Cinco passos do tutorial

> ⚠️ **Este formulário não muda nada no site neste momento.** Ou o motor não
> lê o ficheiro, ou não há página com o contentor onde o conteúdo apareceria.
> Grava sem dar erro, e não se vê. Está à espera de decisão: ligar ou retirar.

**Tem hoje:** 5 itens

**Ficheiro:** `content/passosCatalogo.json`

- **Passos** — lista · obrigatório
  - **Número** — texto curto · obrigatório
  - **Título** — texto curto · obrigatório
  - **Texto** — texto longo · obrigatório
  - **Ilustração** — imagem · opcional
    Opcional. Exportar até 300 KB.
  - **Descrição da imagem (acessibilidade)** — texto curto · opcional

### Catálogo · Campos de pesquisa

> ⚠️ **Este formulário não muda nada no site neste momento.** Ou o motor não
> lê o ficheiro, ou não há página com o contentor onde o conteúdo apareceria.
> Grava sem dar erro, e não se vê. Está à espera de decisão: ligar ou retirar.

**Tem hoje:** 7 itens

**Ficheiro:** `content/etiquetasOpac.json`

- **Campos** — lista · obrigatório
  Título, Autor, Assunto…

### Vídeos (nenhuma página tem o contentor #videos)

> ⚠️ **Este formulário não muda nada no site neste momento.** Ou o motor não
> lê o ficheiro, ou não há página com o contentor onde o conteúdo apareceria.
> Grava sem dar erro, e não se vê. Está à espera de decisão: ligar ou retirar.

**Tem hoje:** 0 itens

**Ficheiro:** `content/videos.json`

- **Vídeos** — lista · obrigatório
  - **Título** — texto curto · obrigatório
  - **Descrição breve** — texto longo · opcional
  - **Endereço do vídeo** — texto curto · obrigatório
    Colar o endereço do YouTube tal como aparece na barra do browser.
  - **Data** — texto curto · opcional
    Ex.: out 2026
  - **Destacar em «O que a Biblioteca está a destacar»** — sim/não · opcional · por omissão: `False`
    Aparece na montra da página Ler. Poucos e escolhidos.
  - **Miniatura (opcional)** — imagem · opcional
  - **Porque é que a Biblioteca recomenda isto?** — texto longo · opcional
  - **Para quem** — texto curto · opcional
  - **Posição** — número · opcional
    Número. Menor aparece primeiro; em branco vai para o fim.
  - **Estado** — escolha · opcional · por omissão: `publicado`
    Em rascunho fica escrito mas não aparece no site.
