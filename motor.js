/* ═══════════════════════════════════════════════════════════════
   motor.js — Site da Biblioteca Escolar da Escola Secundária de Paredes

   NÃO É PRECISO EDITAR ESTE FICHEIRO PARA ATUALIZAR O SITE.
   Todo o conteúdo vive em /content/*.json e edita-se na Área de Trabalho
   (painel /admin). Este ficheiro apenas lê esse conteúdo e desenha as páginas.

   Cada página identifica-se pelo id do <body> (ex.: <body id="p-catalogo">).
   ═══════════════════════════════════════════════════════════════ */

/* ---------- utilitários ---------- */
const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = t => String(t == null ? '' : t)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const temTexto = v => typeof v === 'string' && v.trim() !== '';
/* Liga externa: abre em nova aba com segurança */
const attrsLink = url => `href="${esc(url)}" target="_blank" rel="noopener"`;

/* ---------- conteúdo ---------- */
const CONTEUDO = {};
const FICHEIROS = [
  'info', 'banners', 'acessoRapido', 'metricas', 'noticias', 'agenda', 'regras',
  'documentos', 'projetosEscola', 'galeria', 'destaquesCatalogo', 'bibliotecaDigital',
  'faq', 'guioes', 'disciplinas', 'desafioMes', 'ligacoesUteis', 'exposicoes',
  'projetos', 'iniciativasNacionais', 'trabalhosAlunos', 'areaTrabalho', 'cartoes'
];

async function carregarConteudo() {
  await Promise.all(FICHEIROS.map(async chave => {
    try {
      const r = await fetch(`content/${chave}.json`, { cache: 'no-store' });
      if (!r.ok) return;
      const d = await r.json();
      CONTEUDO[chave] = (d && d[chave] !== undefined) ? d[chave] : d;
    } catch (e) { /* ficheiro ausente: a secção degrada com elegância */ }
  }));
}

/* ---------- cabeçalho ---------- */
const PAGINAS = [
  { id: 'p-inicio',      rotulo: 'Início',      url: 'index.html' },
  { id: 'p-biblioteca',  rotulo: 'Biblioteca',  url: 'biblioteca.html', completo: 'A Biblioteca' },
  { id: 'p-catalogo',    rotulo: 'Catálogo',    url: 'catalogo.html' },
  { id: 'p-recursos',    rotulo: 'Recursos',    url: 'recursos.html' },
  { id: 'p-atividades',  rotulo: 'Atividades',  url: 'atividades.html', completo: 'Atividades e Projetos' },
  { id: 'p-noticias',    rotulo: 'Notícias',    url: 'noticias.html' },
];

function renderCabecalho() {
  const alvo = $('#cabecalho'); if (!alvo) return;
  const atual = document.body.id;
  const i = CONTEUDO.info || {};
  const itens = PAGINAS.map(p =>
    `<div class="navitem"><a href="${p.url}"${p.id === atual ? ' class="active" aria-current="page"' : ''}>${esc(p.rotulo)}</a></div>`
  ).join('');
  alvo.innerHTML = `
  <header>
    <div class="topbar">
      <a class="brand" href="index.html" style="text-decoration:none">
        <!-- Substituir pelo logótipo do BrandKit: imagens/logo/logo-horizontal.png -->
        <div class="mono">BE</div>
        <div><b>${esc(i.nome || 'Biblioteca Escolar')}</b><span>${esc(i.escola || 'Escola Secundária de Paredes')}</span></div>
      </a>
      <nav class="main" id="nav" aria-label="Menu principal">${itens}</nav>
      <div class="utils">
        ${temTexto(i.opacSimples) ? `<a class="util" ${attrsLink(i.opacSimples)} title="Pesquisar no catálogo" aria-label="Pesquisar no catálogo">🔍</a>` : ''}
        <a class="util" href="atividades.html" title="Agenda" aria-label="Agenda">📅</a>
        <a class="util area" href="area-trabalho.html" title="Área de Trabalho da equipa">🔒<span>Área de trabalho</span></a>
      </div>
      <button class="menu-toggle" aria-label="Abrir menu" aria-expanded="false" aria-controls="nav">☰</button>
    </div>
  </header>`;
  const btn = $('.menu-toggle', alvo), nav = $('#nav', alvo);
  btn.addEventListener('click', () => {
    const aberto = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', aberto ? 'true' : 'false');
  });
}

/* ---------- rodapé ---------- */
function renderRodape() {
  const alvo = $('#rodape'); if (!alvo) return;
  const i = CONTEUDO.info || {};
  const redes = [
    i.instagram && `<a ${attrsLink(i.instagram)}>📷 Instagram</a>`,
    i.facebook && `<a ${attrsLink(i.facebook)}>📘 Facebook</a>`,
    i.youtube && `<a ${attrsLink(i.youtube)}>▶️ YouTube</a>`,
  ].filter(Boolean).join('');
  const mapa = PAGINAS.map(p => `<a href="${p.url}">${esc(p.completo || p.rotulo)}</a>`).join('');
  const uteis = [
    i.siteEscola && `<a ${attrsLink(i.siteEscola)}>Site da ESP</a>`,
    i.bibliotecaMunicipal && `<a ${attrsLink(i.bibliotecaMunicipal)}>BiblioNet</a>`,
    i.rbe && `<a ${attrsLink(i.rbe)}>RBE</a>`,
    i.pnl && `<a ${attrsLink(i.pnl)}>PNL 2027</a>`,
    i.dge && `<a ${attrsLink(i.dge)}>DGE</a>`,
  ].filter(Boolean).join('');
  alvo.innerHTML = `
  <footer>
    <div class="wrap foot-grid">
      <div class="foot-brand">
        <b>${esc(i.nome || 'Biblioteca Escolar')}</b>
        <span>${esc(i.escola || '')}</span>
        <p class="foot-mission">${esc(i.missaoCurta || '')}</p>
        <div class="foot-social">${redes}</div>
      </div>
      <div><h4>Mapa do Site</h4>${mapa}</div>
      <div><h4>Ligações Úteis</h4>${uteis}</div>
      <div><h4>Documentação</h4>
        <a href="biblioteca.html#documentos">Regulamento Interno</a>
        <a href="biblioteca.html#documentos">Políticas</a>
        <a href="biblioteca.html#contactos">Contactos</a>
      </div>
      <div><h4>Contactos</h4>
        <address class="foot-contact">
          ${esc(i.localizacao || '')}<br>
          ${esc(i.escola || '')}<br>
          ${temTexto(i.telefone) ? `<a href="tel:${esc((i.telefone || '').replace(/\s/g, ''))}">${esc(i.telefone)}</a><br>` : ''}
          <a href="mailto:${esc(i.email)}">${esc(i.email)}</a><br>
          ${esc(i.horario || '')}
          ${temTexto(i.mapa) ? `<br><a ${attrsLink(i.mapa)}>Ver no Google Maps ↗</a>` : ''}
        </address>
      </div>
    </div>
    <div class="foot-bottom wrap">
      © ${new Date().getFullYear()} ${esc(i.nome || 'Biblioteca Escolar')} da ESP ·
      <a href="acessibilidade.html">Acessibilidade</a> ·
      <a href="privacidade.html">Privacidade</a> ·
      <a href="area-trabalho.html">Área de Trabalho</a>
    </div>
  </footer>`;
}

/* ---------- carrossel (acessível) ---------- */
function renderCarrossel() {
  const car = $('#carousel'); if (!car) return;
  const B = CONTEUDO.banners || [];
  if (!B.length) { car.remove(); return; }
  const reduz = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  $('#slides').innerHTML = B.map((b, k) => {
    const botoes = (b.botoes || []).filter(x => temTexto(x.rotulo)).map((x, n) =>
      `<a class="btn ${n === 0 ? 'primario' : 'outline'}" ${/^https?:/i.test(x.url || '') ? attrsLink(x.url) : `href="${esc(x.url || '#')}"`}>${esc(x.rotulo)}</a>`
    ).join('');
    const fundo = temTexto(b.imagem) ? `background-image:url('${esc(b.imagem)}');background-size:cover;background-position:center` : '';
    return `<div class="slide" role="group" aria-roledescription="destaque" aria-label="Destaque ${k + 1} de ${B.length}" style="${fundo}">
      <div class="wrap">
        ${temTexto(b.tag) ? `<span class="tag">${esc(b.tag)}</span>` : ''}
        <h1>${b.titulo || ''}</h1>
        ${temTexto(b.texto) ? `<p>${esc(b.texto)}</p>` : ''}
        <div class="btns">${botoes}</div>
      </div></div>`;
  }).join('');
  $('#car-dots').innerHTML = B.map((_, k) => `<button aria-label="Ir para o destaque ${k + 1}" data-i="${k}"></button>`).join('');
  const slides = $('#slides'), pontos = $$('#car-dots button');
  let i = 0, t = null;
  const ir = n => { i = (n + B.length) % B.length; slides.style.transform = `translateX(-${i * 100}%)`;
    pontos.forEach((d, k) => d.classList.toggle('active', k === i)); };
  const seg = () => ir(i + 1), ant = () => ir(i - 1);
  const parar = () => { if (t) clearInterval(t); t = null; };
  const andar = () => { if (reduz) return; parar(); t = setInterval(seg, 5500); };
  $('#car-next').addEventListener('click', () => { seg(); andar(); });
  $('#car-prev').addEventListener('click', () => { ant(); andar(); });
  pontos.forEach(d => d.addEventListener('click', () => { ir(+d.dataset.i); andar(); }));
  car.addEventListener('mouseenter', parar); car.addEventListener('mouseleave', andar);
  car.addEventListener('focusin', parar);    car.addEventListener('focusout', andar);
  car.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') { seg(); andar(); }
    if (e.key === 'ArrowLeft')  { ant(); andar(); }
  });
  ir(0); andar();
}

/* ---------- notícias ---------- */
const ordenadas = () => (CONTEUDO.noticias || []).slice()
  .sort((a, b) => String(b.dataOrdenacao || '').localeCompare(String(a.dataOrdenacao || '')));

function cardNoticia(n) {
  const cor = n.cor || '#A8D8CC';
  const corTxt = cor === '#A8D8CC' ? '#20493B' : cor;
  const media = temTexto(n.imagem)
    ? `<img src="${esc(n.imagem)}" alt="${esc(n.alt || n.titulo || '')}">`
    : esc(n.emoji || '📰');
  const link = temTexto(n.url) ? `<p style="margin-top:8px"><a class="btn claro btn-sm" ${attrsLink(n.url)}>Ler mais</a></p>` : '';
  return `<article><div class="thumb" style="background:${esc(cor)}22;color:${esc(corTxt)}">${media}</div>
    <div class="body"><span class="chip" style="background:${esc(cor)}33;color:${esc(corTxt)}">${esc(n.categoria)}</span>
      <h3>${esc(n.titulo)}</h3><time>${esc(n.data)}</time><p>${esc(n.resumo)}</p>${link}</div></article>`;
}

function renderNoticias() {
  const casa = $('#home-news'); if (casa) casa.innerHTML = ordenadas().slice(0, 3).map(cardNoticia).join('');
  const todas = $('#all-news'); if (!todas) return;
  const cats = [...new Set(ordenadas().map(n => n.categoria).filter(Boolean))];
  const filtros = $('#filtro-noticias');
  const pinta = cat => todas.innerHTML = ordenadas().filter(n => !cat || n.categoria === cat).map(cardNoticia).join('');
  if (filtros) {
    filtros.innerHTML = [`<button class="fchip active" data-c="">Todas</button>`]
      .concat(cats.map(c => `<button class="fchip" data-c="${esc(c)}">${esc(c)}</button>`)).join('');
    filtros.addEventListener('click', e => {
      const b = e.target.closest('.fchip'); if (!b) return;
      $$('.fchip', filtros).forEach(x => x.classList.toggle('active', x === b));
      pinta(b.dataset.c);
    });
  }
  pinta('');
}

/* ---------- agenda ---------- */
function itemAgenda(e) {
  const t = temTexto(e.url) ? `<a ${attrsLink(e.url)}>${esc(e.titulo)}</a>` : esc(e.titulo);
  return `<li><div class="dia"><b>${esc(e.dia)}</b><span>${esc(e.mes)}</span></div>
    <div><h4>${t}</h4><small>${esc(e.local)}</small></div></li>`;
}
function renderAgenda() {
  const html = (CONTEUDO.agenda || []).map(itemAgenda).join('');
  ['#home-agenda', '#ativ-agenda'].forEach(s => { const el = $(s); if (el) el.innerHTML = html; });
}

/* ---------- listas simples ---------- */
function renderLista(sel, dados, fn) { const el = $(sel); if (el && dados) el.innerHTML = dados.map(fn).join(''); }

function renderGaleria() {
  renderLista('#galeria', CONTEUDO.galeria, g => {
    const leg = esc(g.legenda || 'foto');
    return `<div class="media tile" title="${leg}">${temTexto(g.imagem)
      ? `<img src="${esc(g.imagem)}" alt="${esc(g.alt || g.legenda || '')}">`
      : `<span class="ph"><span class="g">📷</span>${leg}</span>`}</div>`;
  });
}

function renderDocumentos() {
  renderLista('#lista-documentos', CONTEUDO.documentos, d => temTexto(d.url)
    ? `<li><a ${attrsLink(d.url)}>📄 ${esc(d.titulo)}</a></li>`
    : `<li><a aria-disabled="true" style="opacity:.65;cursor:default">📄 ${esc(d.titulo)} <em style="font-weight:400;color:var(--cinza)">— brevemente disponível</em></a></li>`);
}

/* ---------- personalização de cartões (imagem/texto/link) ---------- */
function aplicarCartoes() {
  const mapa = {}; (CONTEUDO.cartoes || []).forEach(c => { if (c && c.id) mapa[c.id] = c; });
  $$('[data-card]').forEach(el => {
    const c = mapa[el.getAttribute('data-card')]; if (!c) return;
    if (temTexto(c.titulo)) { const h = $('h3', el); if (h) h.textContent = c.titulo; }
    if (temTexto(c.texto))  { const p = $('p', el);  if (p) p.textContent = c.texto; }
    if (temTexto(c.link)) {
      if (el.tagName === 'A') { el.href = c.link; el.target = '_blank'; el.rel = 'noopener'; }
      else { el.style.cursor = 'pointer'; el.addEventListener('click', () => window.open(c.link, '_blank', 'noopener')); }
    }
    if (temTexto(c.imagem) && !$('.card-bg', el)) {
      el.classList.add('card--img');
      const img = document.createElement('img'); img.className = 'card-bg'; img.src = c.imagem; img.alt = '';
      el.insertBefore(img, el.firstChild);
    }
  });
}

/* ---------- formulário de contacto (mailto, sem servidor) ---------- */
function ligarFormulario() {
  const f = $('#form-contacto'); if (!f) return;
  const i = CONTEUDO.info || {};
  /* Alternativa: se info.linkFormulario estiver preenchido (Formspree / Microsoft Forms),
     o formulário externo substitui o mailto. */
  if (temTexto(i.linkFormulario)) {
    f.innerHTML = `<p>O formulário de contacto está disponível aqui:</p>
      <p><a class="btn primario" ${attrsLink(i.linkFormulario)}>Abrir formulário</a></p>`;
    return;
  }
  f.addEventListener('submit', ev => {
    ev.preventDefault();
    const d = new FormData(f);
    const corpo = `Nome: ${d.get('nome')}\nEmail: ${d.get('email')}\n\n${d.get('mensagem')}`;
    window.location.href = `mailto:${i.email}?subject=${encodeURIComponent('[Site BE] ' + d.get('assunto'))}&body=${encodeURIComponent(corpo)}`;
  });
}

/* ---------- arranque ---------- */
(async function iniciar() {
  await carregarConteudo();
  renderCabecalho(); renderRodape();
  renderCarrossel(); renderNoticias(); renderAgenda(); renderGaleria(); renderDocumentos();
  if (window.renderPagina) window.renderPagina();   // renders específicos da página
  aplicarCartoes();
  ligarFormulario();
})();
