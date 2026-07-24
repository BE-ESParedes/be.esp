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
| `admin/config.yml` | Os formulários de **todos os 24 ficheiros** de `content/` |
| `robots.txt` | Já impede que o painel apareça no Google |

Nada mais é preciso criar. Basta publicar o site como habitualmente.

---

## 2. Entrar no painel (não é preciso instalar nada)

O painel precisa de saber quem está a editar, para gravar no GitHub em nome dessa pessoa.
O caminho mais simples, e **sem infraestrutura nenhuma**, é entrar com um *token*.

**Uma vez por pessoa (e por computador):**

1. Abrir `.../admin/` e carregar em **Sign In with Token**.
2. O painel mostra uma ligação para o GitHub que já traz as permissões certas
   escolhidas. Carregar nela.
3. No GitHub, dar um nome ao token (ex.: `Painel BE`), definir a validade
   e **Generate token**.
4. Copiar o token e colar no painel.

O token fica guardado no browser dessa pessoa — nas visitas seguintes entra logo.

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

Não é necessário para arrancar. A entrada por token funciona desde o primeiro dia.

### Quem pode editar

Só quem tiver acesso de escrita ao repositório. Para acrescentar alguém:
**Settings → Collaborators → Add people**. Deve haver sempre **dois responsáveis**.

---

## 3. Como se usa (o dia a dia)

1. Abrir `.../admin/`.
2. Escolher a secção na barra lateral (ex.: **2 · Notícias, agenda e vídeos**).
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
| Exposições | `imagens/exposicoes/` |
| Trabalhos de alunos | `imagens/trabalhos/` |

Exportar as fotografias **até 300 KB**. O original fica no OneDrive.

### Vídeos

Secção **Vídeos**: colar o endereço do YouTube tal como aparece na barra do browser.
Aceita `youtube.com/watch?v=…`, `youtu.be/…`, `/shorts/…` e `/live/…`.
O vídeo aparece na página de **Notícias**; enquanto não houver vídeos, a secção não aparece.

Os vídeos ficam alojados no YouTube (não pesam no site) e são embutidos em modo
sem cookies (`youtube-nocookie.com`), que só regista o utilizador se ele carregar em «reproduzir».

---

## 4. Estrutura do painel

| Secção | Contém |
|---|---|
| 1 · Página inicial | Banners, Acesso rápido, Números |
| 2 · Notícias, agenda e vídeos | Notícias, Agenda, Vídeos |
| 3 · A Biblioteca | Informação e contactos, Regras, Documentos, Galeria, FAQ, Projetos da escola |
| 4 · Catálogo e recursos | Biblioteca Digital, Sugestões de leitura, Guiões, Disciplinas, Ligações úteis, Desafio do mês |
| 5 · Atividades e projetos | Projetos, Iniciativas nacionais, Exposições, Trabalhos de alunos |
| 6 · Área de trabalho | Ligações da equipa, Personalizar cartões |

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
| O painel fica na mensagem «A carregar…» | Confirmar que se abriu por `https://` (ou `localhost`). Em `file://` não funciona. |
| «Not Found» ou não deixa gravar | A conta não tem acesso de escrita ao repositório, ou o token expirou. Gerar novo token. |
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
