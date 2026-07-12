# Publicar o site da Biblioteca — GitHub + Netlify + painel de edição

Este site é **estático** (HTML/CSS/JS, sem build) com um **painel de edição** (Decap CMS)
na *Área de trabalho* (`/admin`). O conteúdo editável vive em `content/*.json`.

**O que já está pronto neste repositório**
- `index.html` — o site.
- `content/noticias.json`, `content/agenda.json`, `content/destaques.json` — conteúdo editável.
- `admin/` — o painel de edição (Decap CMS).
- `netlify.toml` — configuração de publicação.

**Divisão de tarefas:** os ficheiros estão prontos. Os passos abaixo (contas e
autorizações) tens de ser tu a fazê-los — envolvem o teu login e não podem ser
feitos por outra pessoa.

---

## 1. Enviar o código para o GitHub

1. Em <https://github.com/new> cria um repositório novo (ex.: `be-esparedes-site`), **Public** ou **Private**, sem README.
2. No Terminal, dentro desta pasta (`prototipo`), liga o repositório e envia:
   ```bash
   git remote add origin https://github.com/<o-teu-utilizador>/be-esparedes-site.git
   git branch -M main
   git push -u origin main
   ```
   (O repositório já está iniciado e com o primeiro *commit* feito.)

## 2. Publicar no Netlify

1. Entra em <https://app.netlify.com> com a conta GitHub.
2. **Add new site → Import an existing project → GitHub** e escolhe o repositório.
3. Deixa as opções por omissão (publish directory `.`, sem build) e **Deploy**.
4. Em 1–2 minutos o site fica online num endereço `https://<nome>.netlify.app`.
   Podes mudar o nome em **Site configuration → Change site name**.

## 3. Ativar a Área de trabalho (edição sem código)

O painel `/admin` usa o **Netlify Identity** (login) + **Git Gateway** (gravar as alterações).

1. No painel do site em Netlify: **Integrations / Identity → Enable Identity**
   (em versões recentes: **Site configuration → Identity → Enable**).
2. Ainda em Identity: **Services → Git Gateway → Enable Git Gateway**.
3. Em **Identity → Registration**, mete **Invite only** (só entra quem for convidado).
4. **Identity → Invite users** e convida os e-mails da equipa da BE (2 responsáveis).
   Cada pessoa recebe um e-mail, define a palavra-passe e fica com acesso.

> Depois disto, a `config.yml` funciona como está (backend `git-gateway`). Atualiza
> também os campos `site_url`/`display_url` em `admin/config.yml` para o endereço real.

## 4. Editar o site (o dia a dia da equipa)

1. Abrir o site → botão **Área de trabalho** (ou ir a `.../admin/`).
2. Entrar com o e-mail convidado.
3. Editar **Notícias**, **Agenda** ou **Destaques** e **Publish**.
   As alterações são gravadas no GitHub e o Netlify republica o site sozinho (~1 min).

---

## Domínio próprio (opcional, mais tarde)

Em Netlify: **Domain management → Add a domain**. Aponta o DNS do domínio
(ex.: `biblioteca.esparedes.pt`) para o Netlify. O HTTPS é automático.

## Testar localmente

O site precisa de ser servido por HTTP (o `fetch` do conteúdo não funciona por
duplo-clique). Na pasta:
```bash
python3 -m http.server 8000
```
e abre <http://localhost:8000>. (O `/admin` só funciona já publicado, com o Identity ativo.)
