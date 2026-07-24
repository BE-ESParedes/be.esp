/* ═══════════════════════════════════════════════════════════════
   motor.js — Site da Biblioteca Escolar da Escola Secundária de Paredes

   NÃO É PRECISO EDITAR ESTE FICHEIRO PARA ATUALIZAR O SITE.
   Todo o conteúdo vive em /content/*.json e edita-se diretamente no GitHub
   (lápis ✏️ → Commit). Este ficheiro apenas lê esse conteúdo e desenha as páginas.

   Cada página identifica-se pelo id do <body> (ex.: <body id="p-catalogo">).
   ═══════════════════════════════════════════════════════════════ */

/* ---------- utilitários ---------- */
const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = t => String(t == null ? '' : t)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const temTexto = v => typeof v === 'string' && v.trim() !== '';
const externo = u => /^https?:/i.test(u || '');
const linkAttrs = u => externo(u) ? `href="${esc(u)}" target="_blank" rel="noopener"` : `href="${esc(u || '#')}"`;

/* ---------- ícones (SVG de linha) ---------- */
const P = 'stroke="currentColor" fill="none" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"';
const ICONES = {
  livro:    '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
  monitor:  '<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>',
  lupa:     '<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>',
  relogio:  '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  calendario:'<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  correio:  '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/>',
  pessoas:  '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/>',
  local:    '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
  ficheiro: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/>',
  globo:    '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18z"/>',
  escudo:   '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  cerebro:  '<path d="M12 5a3 3 0 0 0-6 0v1a3 3 0 0 0-1 5.8V13a3 3 0 0 0 4 2.8V19a2 2 0 0 0 3 0z"/><path d="M12 5a3 3 0 0 1 6 0v1a3 3 0 0 1 1 5.8V13a3 3 0 0 1-4 2.8V19a2 2 0 0 1-3 0z"/>',
  auscultador:'<path d="M3 14v-2a9 9 0 0 1 18 0v2"/><rect x="2" y="14" width="5" height="7" rx="2"/><rect x="17" y="14" width="5" height="7" rx="2"/>',
  camara:   '<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>',
  estrela:  '<path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/>',
  ligacao:  '<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',
  cadeado:  '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  maos:     '<path d="M11 12H7a2 2 0 0 0 0 4h1"/><path d="m13 12 4-4a2 2 0 1 1 3 3l-6 6a4 4 0 0 1-6 0l-4-4"/>',
  pasta:    '<path d="M4 20a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5l2 3h7a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2z"/>',
  bandeira: '<path d="M4 21V4h16l-3 5 3 5H4"/>',
  microfone:'<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>',
  balao:    '<path d="M21 12a8 8 0 0 1-8 8H7l-4 3V12a8 8 0 0 1 8-8h2a8 8 0 0 1 8 8z"/>',
  alvo:     '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/>',
  chave:    '<circle cx="8" cy="15" r="4"/><path d="m11 12 8-8 3 3-2 2-2-2-2 2-2-2"/>',
  seta:     '<path d="M5 12h14M13 6l6 6-6 6"/>',
  info:     '<circle cx="12" cy="12" r="9"/><path d="M12 16v-5M12 8h.01"/>',
};
const icone = (nome, t = 22) =>
  `<svg class="ico" width="${t}" height="${t}" viewBox="0 0 24 24" ${P} aria-hidden="true">${ICONES[nome] || ICONES.ligacao}</svg>`;
window.icone = icone;

/* ---------- capa opcional (imagem a ocupar o cartão) ---------- */
const capa = x => temTexto(x && x.imagem)
  ? `<span class="capa"><img src="${esc(x.imagem)}" alt="${esc(x.alt || '')}"></span><span class="veu"></span>`
  : `<span class="veu"></span>`;
const capaCartao = x => temTexto(x && x.imagem)
  ? { cls: ' card--img', bg: `<span class="capa"><img src="${esc(x.imagem)}" alt="${esc(x.alt || '')}"></span>` }
  : { cls: '', bg: '' };
window.capa = capa; window.capaCartao = capaCartao;

/* ---------- conteúdo ---------- */
const CONTEUDO = {};
const FICHEIROS = [
  'info', 'banners', 'acessoRapido', 'metricas', 'noticias', 'agenda', 'regras',
  'documentos', 'projetosEscola', 'galeria', 'destaquesCatalogo', 'bibliotecaDigital',
  'faq', 'guioes', 'disciplinas', 'desafioMes', 'ligacoesUteis', 'exposicoes',
  'projetos', 'iniciativasNacionais', 'trabalhosAlunos', 'areaTrabalho', 'cartoes',
  'videos'
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

/* ---------- páginas e subsecções ---------- */
const PAGINAS = [
  { id: 'p-inicio',     rotulo: 'Início',     url: 'index.html' },
  { id: 'p-biblioteca', rotulo: 'Biblioteca', url: 'biblioteca.html', completo: 'A Biblioteca' },
  { id: 'p-catalogo',   rotulo: 'Catálogo',   url: 'catalogo.html' },
  { id: 'p-recursos',   rotulo: 'Recursos',   url: 'recursos.html' },
  { id: 'p-atividades', rotulo: 'Atividades', url: 'atividades.html', completo: 'Atividades e Projetos' },
  { id: 'p-noticias',   rotulo: 'Notícias',   url: 'noticias.html' },
];
const SUBNAV = {
  'p-inicio':     [{ r: 'Catálogo online', u: 'OPAC' }, { r: 'Biblioteca Digital', u: 'catalogo.html#digital' },
                   { r: 'Horário', u: 'biblioteca.html#horario' }, { r: 'Agenda', u: 'atividades.html#agenda' },
                   { r: 'Contactos', u: 'biblioteca.html#contactos' }],
  'p-biblioteca': [{ r: 'Quem somos', u: '#quem-somos' }, { r: 'Horário e regras', u: '#horario' },
                   { r: 'Documentos', u: '#documentos' }, { r: 'Galeria', u: '#galeria-t' }, { r: 'Contactos', u: '#contactos' }],
  'p-catalogo':   [{ r: 'Pesquisa no catálogo', u: '#opac' }, { r: 'Biblioteca Digital', u: '#digital' },
                   { r: 'Apoio à pesquisa', u: '#referencia' }, { r: 'Perguntas frequentes', u: '#faq' }],
  'p-recursos':   [{ r: 'Começa aqui', u: '#comecar' }, { r: 'Guiões e métodos de estudo', u: '#guioes' },
                   { r: 'Por disciplina', u: '#disciplinas' }, { r: 'Literacia digital', u: '#literacia' },
                   { r: 'Ligações úteis', u: '#ligacoes' }],
  'p-atividades': [{ r: 'Agenda', u: '#agenda' }, { r: 'Exposições', u: '#exposicoes' },
                   { r: 'Projetos da Biblioteca', u: '#projetos' }, { r: 'Iniciativas nacionais', u: '#iniciativas' },
                   { r: 'Trabalhos de alunos', u: '#trabalhos' }],
  'p-noticias':   [{ r: 'Todas as notícias', u: '#todas' }, { r: 'Segue-nos', u: '#redes' }],
};

/* ---------- cabeçalho ---------- */
function renderCabecalho() {
  const alvo = $('#cabecalho'); if (!alvo) return;
  const atual = document.body.id, i = CONTEUDO.info || {};
  const itens = PAGINAS.map(p =>
    `<a href="${p.url}"${p.id === atual ? ' class="active" aria-current="page"' : ''}>${esc(p.rotulo)}</a>`).join('');
  const subs = (SUBNAV[atual] || []).map(s => {
    const u = s.u === 'OPAC' ? (i.opacSimples || '#') : s.u;
    return `<a ${linkAttrs(u)}>${esc(s.r)}</a>`;
  }).join('');
  alvo.innerHTML = `
  <header>
    <div class="topbar">
      <a class="brand" href="index.html">
        <!-- Substituir pelo logótipo do BrandKit: imagens/logo/logo-horizontal.png -->
        <span class="mono">BE</span>
        <span class="brand-txt"><b>${esc(i.nome || 'Biblioteca Escolar')}</b><span>${esc(i.escola || '')}</span></span>
      </a>
      <nav class="main" id="nav" aria-label="Menu principal">${itens}</nav>
      <div class="utils">
        ${temTexto(i.opacSimples) ? `<a class="util" ${linkAttrs(i.opacSimples)} title="Pesquisar no catálogo" aria-label="Pesquisar no catálogo">${icone('lupa', 17)}</a>` : ''}
        <a class="util" href="atividades.html#agenda" title="Agenda" aria-label="Agenda">${icone('calendario', 17)}</a>
        <a class="util area" href="area-trabalho.html" title="Área de Trabalho da equipa" aria-label="Área de Trabalho">${icone('cadeado', 16)}</a>
        <button class="menu-toggle" aria-label="Abrir menu" aria-expanded="false" aria-controls="nav">${icone('pasta', 18)}</button>
      </div>
    </div>
  </header>
  ${subs ? `<div class="subnav"><div class="subnav-in">${subs}</div></div>` : ''}`;
  const btn = $('.menu-toggle', alvo), nav = $('#nav', alvo);
  btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" ${P}><path d="M3 6h18M3 12h18M3 18h18"/></svg>`;
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
    i.instagram && `<a ${linkAttrs(i.instagram)}>${icone('camara', 15)} Instagram</a>`,
    i.facebook  && `<a ${linkAttrs(i.facebook)}>${icone('balao', 15)} Facebook</a>`,
    i.youtube   && `<a ${linkAttrs(i.youtube)}>${icone('monitor', 15)} YouTube</a>`,
  ].filter(Boolean).join('');
  const uteis = [
    [i.siteEscola, 'Site da ESP'], [i.bibliotecaMunicipal, 'BiblioNet'], [i.rbe, 'RBE'],
    [i.pnl, 'PNL 2027'], [i.dge, 'DGE'],
  ].filter(([u]) => temTexto(u)).map(([u, r]) => `<a ${linkAttrs(u)}>${r}</a>`).join('');
  alvo.innerHTML = `
  <footer>
    <div class="wrap foot-grid">
      <div class="foot-brand">
        <b>${esc(i.nome || 'Biblioteca Escolar')}</b><span>${esc(i.escola || '')}</span>
        <p class="foot-mission">${esc(i.missaoCurta || '')}</p>
        <div class="foot-social">${redes}</div>
      </div>
      <div><h4>Mapa do Site</h4>${PAGINAS.map(p => `<a href="${p.url}">${esc(p.completo || p.rotulo)}</a>`).join('')}</div>
      <div><h4>Ligações Úteis</h4>${uteis}</div>
      <div><h4>Documentação</h4>
        <a href="biblioteca.html#documentos">Regulamento Interno</a>
        <a href="biblioteca.html#documentos">Políticas</a>
        <a href="biblioteca.html#contactos">Contactos</a>
      </div>
      <div><h4>Contactos</h4>
        <address class="foot-contact">
          ${esc(i.localizacao || '')}<br>${esc(i.escola || '')}<br>
          ${temTexto(i.telefone) ? `<a href="tel:${esc((i.telefone || '').replace(/\s/g, ''))}">${esc(i.telefone)}</a><br>` : ''}
          <a href="mailto:${esc(i.email)}">${esc(i.email)}</a><br>${esc(i.horario || '')}
          ${temTexto(i.mapa) ? `<br><a ${linkAttrs(i.mapa)}>Ver no Google Maps</a>` : ''}
        </address>
      </div>
    </div>
    <div class="foot-bottom wrap">
      © ${new Date().getFullYear()} ${esc(i.nome || '')} da ESP ·
      <a href="acessibilidade.html">Acessibilidade</a> ·
      <a href="privacidade.html">Privacidade</a> ·
      <a href="area-trabalho.html">Área de Trabalho</a>
    </div>
  </footer>`;
}

/* ---------- hero / carrossel ---------- */
function renderCarrossel() {
  const car = $('#carousel'); if (!car) return;
  const B = CONTEUDO.banners || [];
  if (!B.length) { car.remove(); return; }
  const reduz = matchMedia('(prefers-reduced-motion: reduce)').matches;
  $('#slides').innerHTML = B.map((b, k) => {
    const btns = (b.botoes || []).filter(x => temTexto(x.rotulo)).map((x, n) =>
      `<a class="btn ${n === 0 ? 'primario' : 'sobre-escuro'}" ${linkAttrs(x.url)}>${esc(x.rotulo)}</a>`).join('');
    return `<div class="slide" role="group" aria-roledescription="destaque" aria-label="Destaque ${k + 1} de ${B.length}">
      ${temTexto(b.imagem) ? `<span class="capa"><img src="${esc(b.imagem)}" alt=""></span>` : ''}
      <span class="veu"></span>
      <div class="txt">
        ${temTexto(b.tag) ? `<div class="eyebrow">${esc(b.tag)}</div>` : ''}
        <h2>${b.titulo || ''}</h2>
        ${temTexto(b.texto) ? `<p>${esc(b.texto)}</p>` : ''}
        <div class="btns">${btns}</div>
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

/* ---------- cartão de ação (usado no acesso rápido) ---------- */
const CORES = ['', 'menta', 'dourado'];
function cartaoAcao(x, n) {
  const cor = temTexto(x.cor) ? x.cor : CORES[n % 3];
  return `<a class="acao ${cor}" ${linkAttrs(x.url)}>
    ${capa(x)}
    <span class="conteudo">
      ${icone(x.icone || 'ligacao', 26)}
      <span><b>${esc(x.rotulo)}</b><span class="sub">${esc(x.sub || '')}</span></span>
      ${temTexto(x.acao) ? `<span class="pill">${esc(x.acao)}</span>` : ''}
    </span></a>`;
}

/* ---------- notícias ---------- */
const ordenadas = () => (CONTEUDO.noticias || []).slice()
  .sort((a, b) => String(b.dataOrdenacao || '').localeCompare(String(a.dataOrdenacao || '')));
const CHIP = { '#D8B260': 'gold', '#20493B': 'verde' };
function cardNoticia(n) {
  const dest = temTexto(n.url) ? n.url : 'noticias.html';
  return `<a class="noticia" ${linkAttrs(dest)}>
    <span class="capa">${temTexto(n.imagem)
      ? `<img src="${esc(n.imagem)}" alt="${esc(n.alt || n.titulo || '')}">`
      : `<span class="vazio">${icone('camara', 22)}</span>`}</span>
    <span class="corpo">
      <span class="chip ${CHIP[n.cor] || ''}">${esc(n.categoria)}</span>
      <b>${esc(n.titulo)}</b>
      <span class="res">${esc(n.resumo)}</span>
      <time>${esc(n.data)}</time>
    </span></a>`;
}
function renderNoticias() {
  const casa = $('#home-news'); if (casa) casa.innerHTML = ordenadas().slice(0, 3).map(cardNoticia).join('');
  const todas = $('#all-news'); if (!todas) return;
  const cats = [...new Set(ordenadas().map(n => n.categoria).filter(Boolean))];
  const pinta = c => todas.innerHTML = ordenadas().filter(n => !c || n.categoria === c).map(cardNoticia).join('');
  const f = $('#filtro-noticias');
  if (f) {
    f.innerHTML = [`<button class="fchip active" data-c="">Todas</button>`]
      .concat(cats.map(c => `<button class="fchip" data-c="${esc(c)}">${esc(c)}</button>`)).join('');
    f.addEventListener('click', e => { const b = e.target.closest('.fchip'); if (!b) return;
      $$('.fchip', f).forEach(x => x.classList.toggle('active', x === b)); pinta(b.dataset.c); });
  }
  pinta('');
}

/* ---------- agenda ---------- */
function renderAgenda() {
  const html = (CONTEUDO.agenda || []).map(e => {
    const t = temTexto(e.url) ? `<a ${linkAttrs(e.url)}>${esc(e.titulo)}</a>` : esc(e.titulo);
    return `<li><span class="dia"><b>${esc(e.dia)}</b><span>${esc(e.mes)}</span></span>
      <span><h4>${t}</h4><small>${esc(e.local)}</small></span></li>`;
  }).join('');
  ['#home-agenda', '#ativ-agenda'].forEach(s => { const el = $(s); if (el) el.innerHTML = html; });
}

/* ---------- galeria e documentos ---------- */
function renderGaleria() {
  const el = $('#galeria'); if (!el) return;
  el.innerHTML = (CONTEUDO.galeria || []).map(g => {
    const leg = esc(g.legenda || 'foto');
    return `<div class="media tile" title="${leg}">${temTexto(g.imagem)
      ? `<img src="${esc(g.imagem)}" alt="${esc(g.alt || g.legenda || '')}">`
      : `<span class="ph">${icone('camara', 24)}${leg}</span>`}</div>`;
  }).join('');
}
/* ---------- vídeos ----------
   Basta colar o endereço do YouTube no painel; aqui extrai-se o identificador.
   O embutido usa youtube-nocookie.com (não deixa cookies antes de o utilizador
   carregar em «reproduzir») e só carrega quando entra no ecrã. */
function idYoutube(u) {
  const m = String(u || '').match(
    /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{11})/);
  return m ? m[1] : '';
}
function renderVideos() {
  const el = $('#videos'); if (!el) return;
  const lista = (CONTEUDO.videos || []).filter(v => v && idYoutube(v.url));
  const seccao = el.closest('[data-seccao]');
  if (!lista.length) { if (seccao) seccao.hidden = true; return; }
  if (seccao) seccao.hidden = false;
  el.innerHTML = lista.map(v => {
    const id = idYoutube(v.url), t = esc(v.titulo || 'Vídeo da Biblioteca');
    return `<figure class="video">
      <div class="video-frame">
        <iframe src="https://www.youtube-nocookie.com/embed/${esc(id)}" title="${t}"
          loading="lazy" allowfullscreen
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          referrerpolicy="strict-origin-when-cross-origin"></iframe>
      </div>
      <figcaption><strong>${t}</strong>${temTexto(v.data) ? ` <span class="video-data">${esc(v.data)}</span>` : ''}
        ${temTexto(v.descricao) ? `<span class="video-desc">${esc(v.descricao)}</span>` : ''}</figcaption>
    </figure>`;
  }).join('');
}
function renderDocumentos() {
  const el = $('#lista-documentos'); if (!el) return;
  el.innerHTML = (CONTEUDO.documentos || []).map(d => temTexto(d.url)
    ? `<li><a ${linkAttrs(d.url)}><span class="ico">${icone('ficheiro', 18)}</span>${esc(d.titulo)}</a></li>`
    : `<li><span class="item"><span class="ico">${icone('ficheiro', 18)}</span>${esc(d.titulo)} <em>— brevemente disponível</em></span></li>`).join('');
}

/* ---------- personalização de cartões fixos ---------- */
function aplicarCartoes() {
  const mapa = {}; (CONTEUDO.cartoes || []).forEach(c => { if (c && c.id) mapa[c.id] = c; });
  $$('[data-card]').forEach(el => {
    const c = mapa[el.getAttribute('data-card')]; if (!c) return;
    if (temTexto(c.titulo)) { const h = $('h3', el); if (h) h.textContent = c.titulo; }
    if (temTexto(c.texto))  { const p = $('p', el);  if (p) p.textContent = c.texto; }
    if (temTexto(c.link)) {
      if (el.tagName === 'A') { el.href = c.link; if (externo(c.link)) { el.target = '_blank'; el.rel = 'noopener'; } }
      else { el.style.cursor = 'pointer'; el.addEventListener('click', () => window.open(c.link, '_blank', 'noopener')); }
    }
    if (temTexto(c.imagem) && !$('.capa', el)) {
      el.classList.add('card--img');
      const s = document.createElement('span'); s.className = 'capa';
      s.innerHTML = `<img src="${esc(c.imagem)}" alt="">`;
      el.insertBefore(s, el.firstChild);
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
    f.innerHTML = `<h3>Formulário de contacto</h3><p>O formulário está disponível aqui:</p>
      <p style="margin-top:12px"><a class="btn primario" ${linkAttrs(i.linkFormulario)}>Abrir formulário</a></p>`;
    return;
  }
  f.addEventListener('submit', ev => {
    ev.preventDefault();
    const d = new FormData(f);
    const corpo = `Nome: ${d.get('nome')}\nEmail: ${d.get('email')}\n\n${d.get('mensagem')}`;
    location.href = `mailto:${i.email}?subject=${encodeURIComponent('[Site BE] ' + d.get('assunto'))}&body=${encodeURIComponent(corpo)}`;
  });
}

/* ---------- arranque ---------- */
window.esc = esc; window.temTexto = temTexto; window.linkAttrs = linkAttrs; window.cartaoAcao = cartaoAcao;
(async function iniciar() {
  await carregarConteudo();
  renderCabecalho(); renderRodape();
  renderCarrossel(); renderNoticias(); renderAgenda(); renderGaleria(); renderDocumentos();
  renderVideos();
  if (window.renderPagina) window.renderPagina();
  aplicarCartoes();
  ligarFormulario();
})();
