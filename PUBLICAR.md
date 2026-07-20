# Publicar o site da Biblioteca — GitHub Pages + OneDrive

Guia técnico de instalação. Para o **dia a dia da equipa**, ver o [LEIA-ME.md](LEIA-ME.md).

---

## Arquitetura escolhida

| Onde | O quê |
|---|---|
| **GitHub** (público) | O site: páginas, `estilos.css`, `motor.js`, conteúdo em `content/*.json` e imagens **otimizadas e com consentimento** em `imagens/` |
| **OneDrive institucional** (privado) | A estrutura documental: pasta BE-ESP da aplicação, PDF oficiais (ligados ao site por *link de partilha*), fotografias originais, consentimentos, listas com dados pessoais |

**Regra de ouro RGPD:** nada com dados pessoais entra no GitHub. O repositório é público.

**Site estático, sem build.** O GitHub Pages serve os ficheiros tal como estão.
Todas as ligações internas são relativas, por isso funciona em
`https://<utilizador>.github.io/be-esparedes/` sem alterações.

---

## 1. Criar o repositório e carregar o site

1. Criar conta GitHub (se ainda não houver) em <https://github.com/signup>.
   Pode ser criada com um email pessoal e mais tarde transferida; a decisão de usar
   o email institucional cabe à escola.
2. Em <https://github.com/new>: nome `be-esparedes`, **Public**, sem README.
3. No Terminal, dentro desta pasta:
   ```bash
   git remote add origin https://github.com/<utilizador>/be-esparedes.git
   git branch -M main
   git push -u origin main
   ```
   *(Sem Terminal: usar «uploading an existing file» na página do repositório e
   arrastar o conteúdo da pasta — incluindo o ficheiro escondido `.nojekyll`.)*

## 2. Ativar o GitHub Pages

1. No repositório: **Settings → Pages**.
2. Em **Source**: *Deploy from a branch* → branch `main` → pasta `/ (root)` → **Save**.
3. Em 1 a 2 minutos o site fica em `https://<utilizador>.github.io/be-esparedes/`.

## 3. Depois de publicar, atualizar 3 coisas

| Onde | O quê |
|---|---|
| `sitemap.xml` | trocar `SUBSTITUIR` pelo utilizador GitHub real |
| `content/info.json` | preencher `repositorioGitHub` (o botão da Área de Trabalho passa a funcionar), e confirmar `youtube`, `linkMarcacao` |
| `content/documentos.json` | colar os *links de partilha* do OneDrive em cada documento (ver abaixo) |

## 4. Ligar os documentos do OneDrive

Para cada PDF oficial (RI-BE, PAA, PDC, POL-RED, PPL, RAA):

1. No OneDrive, botão direito sobre o ficheiro → **Partilhar**.
2. Definir **«Qualquer pessoa com a ligação pode ver»** (só leitura).
   *Se esta opção estiver bloqueada pelo administrador, usar «Pessoas na organização»
   (só a comunidade escolar autenticada abre) ou pedir a exceção ao administrador.*
3. Copiar a ligação e colá-la no campo `url` do documento em `content/documentos.json`.

O mesmo vale para qualquer ligação em `content/` (guiões, materiais por disciplina…).

## 5. Fotografias

- O **original** fica no OneDrive (com o registo de consentimento).
- Para o site: exportar uma versão **até 300 KB**, carregá-la para `imagens/`
  no GitHub (**Add file → Upload files**) e referenciá-la no JSON como
  `imagens/nome-da-foto.jpg`.
- Não usar links do OneDrive para imagens embutidas: o OneDrive não serve imagens
  de forma fiável dentro de páginas externas (redirecionamentos e limites).

---

## Fluxo de edição do dia a dia

Editar `content/<ficheiro>.json` na interface web do GitHub (lápis ✏️ → *Commit changes*).
A publicação é automática em 1 a 2 minutos. Detalhes e exemplos no `LEIA-ME.md`.

## Ver o site antes de publicar

⚠️ Abrir o `index.html` com duplo-clique (`file://`) não mostra o conteúdo
(o site lê os `content/*.json` por `fetch`). Servir a pasta por HTTP:
```bash
python3 -m http.server 8000
```
e abrir <http://localhost:8000>.

## Domínio próprio (opcional, mais tarde)

Ex.: `biblioteca.esparedes.pt` — registo CNAME junto dos serviços da escola e
ficheiro `CNAME` no repositório (Settings → Pages → Custom domain).

## Evolução futura (registada, não bloqueante)

- **Módulo «Site» na aplicação BE-ESP v7**: a app já autentica no Microsoft 365 e
  escreve no OneDrive; pode ganhar um ecrã que edita os `content/*.json` e os envia
  ao GitHub pela API, usando as permissões já existentes. A equipa deixaria de tocar
  no GitHub.
- **Power Automate**: fluxo que copia ficheiros de uma pasta do OneDrive para o
  repositório (sincronização automática).

## Manutenção técnica

- **Aspeto**: `estilos.css` (paleta nas variáveis do topo; é a da app BE-ESP v7).
- **Como as páginas são desenhadas**: `motor.js`.
- **Nova página**: copiar a estrutura de um `.html`, dar `id` novo ao `<body>` e
  acrescentar à lista `PAGINAS` (e `SUBNAV`) no `motor.js`.
- **Novo campo editável**: criar `content/<nome>.json` e acrescentar a chave à
  lista `FICHEIROS` do `motor.js`.
