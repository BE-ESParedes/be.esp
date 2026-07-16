# Publicar o site da Biblioteca — GitHub + Netlify + painel de edição

Guia técnico de instalação. Para o **dia a dia da equipa**, ver o [LEIA-ME.md](LEIA-ME.md).

---

## O que está neste repositório

```
index.html, biblioteca.html, catalogo.html,
recursos.html, atividades.html, noticias.html   → as 6 páginas do menu
area-trabalho.html                              → página da equipa (fora do menu)
acessibilidade.html, privacidade.html, 404.html
estilos.css        → identidade visual (paleta da app BE-ESP v7)
motor.js           → desenha as páginas a partir do conteúdo (não editar no dia a dia)
content/*.json     → TODO o conteúdo editável (23 ficheiros)
admin/             → painel de edição (Decap CMS)
imagens/           → logótipo, banners, notícias, exposições, trabalhos, galeria
documentos/        → PDF dos documentos estruturantes
netlify.toml       → configuração de publicação
sitemap.xml, robots.txt
```

**Site estático, sem build.** Não há npm nem compilação: o Netlify serve os ficheiros tal como estão.

**Divisão de tarefas:** os ficheiros estão prontos. Os passos abaixo envolvem as **tuas contas** e o teu login, por isso têm de ser feitos por ti.

---

## 1. Enviar o código para o GitHub

1. Em <https://github.com/new> cria um repositório (sugestão: `be-esparedes`), sem README.
   Idealmente a partir de uma **conta institucional** (biblioteca@esparedes.pt), não de uma conta pessoal.
2. No Terminal, dentro desta pasta:
   ```bash
   git remote add origin https://github.com/<o-teu-utilizador>/be-esparedes.git
   git branch -M main
   git push -u origin main
   ```
   (O repositório já está iniciado e com o histórico de commits.)

## 2. Publicar no Netlify

1. Entra em <https://app.netlify.com> com a conta GitHub.
2. **Add new site → Import an existing project → GitHub** e escolhe o repositório.
3. Deixa as opções por omissão (sem build; publish directory `.`) e **Deploy**.
4. Em 1 a 2 minutos o site fica em `https://<nome>.netlify.app`.
   Muda o nome em **Site configuration → Change site name**.

## 3. Ativar a Área de Trabalho (edição sem código)

O painel `/admin` usa **Netlify Identity** (login) + **Git Gateway** (gravar as alterações).

1. No painel do site: **Site configuration → Identity → Enable Identity**.
2. Em **Identity → Services → Git Gateway → Enable Git Gateway**.
3. Em **Identity → Registration**, escolher **Invite only**.
4. **Identity → Invite users** e convidar os emails da equipa (pelo menos **dois responsáveis**).

## 4. Depois de publicar, atualizar 3 valores

| Onde | O quê |
|---|---|
| `sitemap.xml` | trocar `exemplo.netlify.app` pelo endereço real |
| Painel → **Informação geral** | preencher **YouTube**, **Link de marcação (Bookings)** e **Repositório GitHub** |
| Painel → **Documentos** | carregar os PDF (RI-BE, PAA, PDC, POL-RED, PPL, RAA) |

---

## Ver o site antes de publicar

⚠️ **Abrir o `index.html` com duplo-clique (`file://`) não funciona.** O conteúdo é lido dos
ficheiros `content/*.json` por `fetch`, e o `file://` bloqueia esses pedidos (é o erro
*«Failed to load config.yml»* que aparece no `/admin`). É preciso servir a pasta por HTTP.

### Ver o site
```bash
python3 -m http.server 8000
```
e abrir <http://localhost:8000>.

### Testar o painel localmente (precisa de Node.js)
```bash
npx decap-server            # num terminal
python3 -m http.server 8000 # noutro terminal
```
e abrir <http://localhost:8000/admin/>. Com o `local_backend: true` (já ativo), o painel
lê e grava nos ficheiros da pasta, sem login. Ideal para experimentar.

> **Nota de arquitetura.** O brief pedia que o site funcionasse também por `file://`.
> Isso é incompatível com ter um painel de edição: o conteúdo tem de estar em ficheiros
> que o painel saiba escrever (JSON), e esses são lidos por `fetch`. Optou-se pelo painel,
> conforme decidido. Em produção (Netlify) tudo funciona normalmente.

---

## Domínio próprio (opcional, mais tarde)

Em Netlify: **Domain management → Add a domain** (ex.: `biblioteca.esparedes.pt`).
O DNS é configurado junto dos serviços da escola. O HTTPS é automático.

---

## Manutenção técnica

- **Mudar o aspeto**: `estilos.css` (a paleta está nas variáveis no topo; é a mesma da app BE-ESP v7).
- **Mudar a forma como as páginas são desenhadas**: `motor.js`.
- **Acrescentar uma página**: criar o `.html` (copiar a estrutura de outra), dar um `id` novo ao `<body>`
  e, se entrar no menu, acrescentar à lista `PAGINAS` no `motor.js`.
- **Acrescentar um campo editável**: criar/editar o `content/<nome>.json`, acrescentar a chave à lista
  `FICHEIROS` do `motor.js` e criar a coleção correspondente em `admin/config.yml`.
