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

/* ---------- caminho de ficheiro dentro do site ----------
   O site é publicado numa subpasta (…/be.esp/), por isso um caminho que
   comece por barra sai da pasta e devolve 404. O painel já grava sem barra,
   mas houve conteúdo antigo gravado com ela — e um caminho errado não dá
   erro nenhum, só uma imagem que não aparece. Normaliza-se aqui, uma vez,
   para nenhuma página ter de se preocupar com isso.
   Endereços externos (http, //, data:) passam intactos. */
const caminho = u => {
  const s = String(u || '').trim();
  if (!s || /^([a-z]+:|\/\/)/i.test(s)) return s;
  return s.replace(/^\/+/, '');
};
window.caminho = caminho;

/* ---------- texto legível sobre uma cor qualquer ----------
   As cores das classes da CDU vão do lilás claro ao roxo escuro. Adivinhar
   se a etiqueta leva texto branco ou tinta dá erros: o branco sobre o lilás
   #B39DDB dá 2,4:1. Calcula-se o contraste e escolhe-se o que passa. */
function textoSobre(fundo) {
  const h = String(fundo || '').replace('#', '');
  if (h.length !== 6) return 'var(--tinta)';
  const canal = c => { c /= 255; return c <= .03928 ? c / 12.92 : Math.pow((c + .055) / 1.055, 2.4); };
  const [r, g, b] = [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16));
  const L = .2126 * canal(r) + .7152 * canal(g) + .0722 * canal(b);
  const comBranco = 1.05 / (L + .05);
  const comTinta  = (L + .05) / 0.0522;   /* luminância do #2B2B2B */
  return comBranco >= comTinta ? '#fff' : 'var(--tinta)';
}
window.textoSobre = textoSobre;

/* ---------- capa opcional (imagem a ocupar o cartão) ---------- */
const capa = x => temTexto(x && x.imagem)
  ? `<span class="capa"><img src="${esc(caminho(x.imagem))}" alt="${esc(x.alt || '')}"></span><span class="veu"></span>`
  : `<span class="veu"></span>`;
const capaCartao = x => temTexto(x && x.imagem)
  ? { cls: ' card--img', bg: `<span class="capa"><img src="${esc(caminho(x.imagem))}" alt="${esc(x.alt || '')}"></span>` }
  : { cls: '', bg: '' };
window.capa = capa; window.capaCartao = capaCartao;

/* ---------- conteúdo ---------- */
const CONTEUDO = {};
const FICHEIROS = [
  'info', 'banners', 'acessoRapido', 'noticias', 'agenda',
  'documentos', 'projetosEscola', 'galeria', 'bibliotecaDigital',
  'faq', 'guioes', 'disciplinas', 'ligacoesUteis', 'exposicoes',
  'projetos', 'iniciativasNacionais', 'areaTrabalho', 'cartoes',
  'videos', 'missoes',
  /* página A Biblioteca */
  'equipa', 'pilares', 'zonas', 'passos',
  /* página Catálogo */
  'passosCatalogo', 'sugestoesLeitura', 'etiquetasOpac',
  /* Retirados a 21/08/2026, com o conteúdo transferido e não perdido:
     · modosProcura      — os «três caminhos» de Encontrar; a página passou a
                           conduzir catálogo › estante › sugestões, sem escolha
                           prévia. As três fotografias ficam em imagens/catalogo/.
     · destaquesDigitais — deixou de haver uma lista à parte de destaques: cada
                           item é marcado no seu próprio ficheiro (destaque /
                           destaqueHome) e recolhido por destaques(). Os seis
                           livros que lá estavam foram para livrosDigitais. */
  /* página Apoio ao Estudo */
  'percursos', 'literaciaPercurso', 'docentes',
  /* página Acontece na Biblioteca */
  'calendarioAno', 'rotina', 'temasAtividades',
  'concursos', 'galeriaAlunos', 'arquivoAnos',
  /* área LER — formatos de leitura (podem estar vazios até haver curadoria) */
  'livrosDigitais', 'audiolivros', 'podcasts', 'leituraAcessivel',
  /* camada editorial: montras por público, descoberta da semana e explicações */
  'escolhas', 'semana', 'explica',
  /* área ENCONTRAR — organização física do fundo */
  'estantes',
  /* área APRENDER — ferramentas, separadas das fontes */
  'ferramentas'
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

/* ═══════════════════════════════════════════════════════════════
   O CARTÃO DE RECURSO — um só modelo para tudo o que a Biblioteca
   recomenda: livros, livros digitais, audiolivros, podcasts, vídeos
   e recursos de leitura acessível.

   Existe um único componente, e não um por formato, para que o
   utilizador reconheça de imediato que tudo pertence ao mesmo sítio.
   Os campos são todos opcionais: um livro em papel sem endereço
   desenha-se com o mesmo cartão de um podcast com frase editorial,
   apenas sem as partes que não tem.

   Campos que o painel escreve:
     titulo · autor · imagem · alt · publico · genero · duracao
     porque (a frase editorial) · fonte · cta · url
     destaque · destaqueHome
   ═══════════════════════════════════════════════════════════════ */
const FORMATOS = {
  sugestoesLeitura: { rotulo: 'Livro',            icone: 'livro' },
  livrosDigitais:   { rotulo: 'Livro digital',    icone: 'monitor' },
  audiolivros:      { rotulo: 'Audiolivro',       icone: 'auscultador' },
  podcasts:         { rotulo: 'Podcast',          icone: 'microfone' },
  videos:           { rotulo: 'Vídeo',            icone: 'camara' },
  leituraAcessivel: { rotulo: 'Leitura acessível', icone: 'maos' },
  bibliotecaDigital:{ rotulo: 'Plataforma',       icone: 'globo' },
  galeriaAlunos:    { rotulo: 'Feito por alunos', icone: 'estrela' },
};
window.FORMATOS = FORMATOS;

function cartaoRecurso(x, opcoes = {}) {
  const fmt = FORMATOS[x.formato] || null;
  const meta = [x.publico, x.genero, x.duracao].filter(temTexto);
  const semCapa = !temTexto(x.imagem);
  /* Coleções mais antigas usam «nome» e «descricao» onde as novas usam
     «titulo» e «porque». Aceitam-se os dois, para nada partir. */
  const titulo = x.titulo || x.nome || '';
  const porque = x.porque || x.descricao || '';
  const dentro = `
    <span class="rec-capa${semCapa ? ' rec-vazia' : ''}">
      ${semCapa
        ? `<span class="rec-marca">${icone(fmt ? fmt.icone : 'livro', 26)}</span>`
        : `<img src="${esc(caminho(x.imagem))}" alt="${esc(x.alt || '')}" loading="lazy">`}
      ${opcoes.mostrarFormato !== false && fmt
        ? `<span class="rec-formato">${icone(fmt.icone, 13)}${esc(fmt.rotulo)}</span>` : ''}
    </span>
    <span class="rec-tx">
      ${temTexto(x.selo) ? `<span class="rec-selo">${esc(x.selo)}</span>` : ''}
      <b>${temTexto(titulo) ? esc(titulo) : '<i class="rec-porpreencher">Por preencher</i>'}</b>
      ${temTexto(x.autor) ? `<span class="rec-autor">${esc(x.autor)}</span>` : ''}
      ${meta.length ? `<span class="rec-meta">${meta.map(esc).join(' · ')}</span>` : ''}
      ${temTexto(porque) ? `<span class="rec-porque">${esc(porque)}</span>` : ''}
      ${temTexto(x.voz) ? `<span class="rec-voz">Lido por ${esc(x.voz)}</span>` : ''}
      ${temTexto(x.relacoes)
        ? `<span class="rec-rel">Relaciona-se com ${esc(x.relacoes)}</span>` : ''}
      <span class="rec-pe">
        ${temTexto(x.fonte) ? `<span class="rec-fonte">${esc(x.fonte)}</span>` : '<span></span>'}
        ${temTexto(x.url) ? `<span class="rec-cta">${esc(x.cta || 'Abrir')} &rarr;</span>` : ''}
      </span>
    </span>`;
  return temTexto(x.url)
    ? `<a class="rec" ${linkAttrs(x.url)}>${dentro}</a>`
    : `<div class="rec">${dentro}</div>`;
}
window.cartaoRecurso = cartaoRecurso;

/* ── ordem e estado ───────────────────────────────────────────────────
   Uma ficha com estado «rascunho» fica escrita mas não aparece no site —
   permite preparar conteúdo sem o publicar. O campo «ordem» (número)
   manda; quem não o tiver fica pela ordem em que está no ficheiro. */
function publicados(chave) {
  return (CONTEUDO[chave] || [])
    .filter(x => x && x.estado !== 'rascunho')
    .map((x, i) => ({ ...x, formato: x.formato || chave, _i: i }))
    .sort((a, b) => {
      const oa = Number.isFinite(+a.ordem) && a.ordem !== '' ? +a.ordem : 9999;
      const ob = Number.isFinite(+b.ordem) && b.ordem !== '' ? +b.ordem : 9999;
      return oa - ob || a._i - b._i;
    });
}
window.publicados = publicados;

/* ── referências ──────────────────────────────────────────────────────
   O princípio «um conteúdo, várias apresentações»: as montras por público
   e a descoberta da semana NÃO guardam cópias das fichas — guardam uma
   referência (coleção + título) e vão buscar a ficha verdadeira aqui.
   Se a ficha for editada num sítio, muda em todos. Se for apagada, a
   referência deixa simplesmente de aparecer, em vez de mostrar restos. */
function resolverRef(ref) {
  if (!ref || !temTexto(ref.colecao) || !temTexto(ref.titulo)) return null;
  const normal = s => String(s || '').trim().toLowerCase();
  const alvo = normal(ref.titulo);
  const achado = publicados(ref.colecao)
    .find(x => normal(x.titulo || x.nome) === alvo);
  if (!achado) return null;
  /* A nota da montra, se existir, substitui a frase editorial da ficha:
     é a mesma obra, dita ao público daquela montra. */
  return temTexto(ref.nota) ? { ...achado, porque: ref.nota } : achado;
}
window.resolverRef = resolverRef;

/* Recolhe o que a Biblioteca marcou como destaque, sem duplicar conteúdo:
   cada item continua a viver só no seu ficheiro; aqui apenas se olha para
   a marca. `onde` é 'destaque' (página Ler) ou 'destaqueHome' (início). */
function destaques(onde = 'destaque', limite = 0) {
  const saida = [];
  for (const chave of Object.keys(FORMATOS)) {
    for (const it of publicados(chave)) if (it[onde]) saida.push(it);
  }
  saida.sort((a, b) => {
    const oa = Number.isFinite(+a.ordem) && a.ordem !== '' ? +a.ordem : 9999;
    const ob = Number.isFinite(+b.ordem) && b.ordem !== '' ? +b.ordem : 9999;
    return oa - ob;
  });
  return limite > 0 ? saida.slice(0, limite) : saida;
}
window.destaques = destaques;

/* ── a descoberta da semana ───────────────────────────────────────────
   Quatro lugares fixos, um por formato. Desenha-se a partir de
   referências: se a ficha apontada desaparecer, o lugar desaparece com
   ela, em vez de mostrar um cartão vazio. */
function renderSemana(idAlvo) {
  const el = document.getElementById(idAlvo); if (!el) return 0;
  const s = CONTEUDO.semana || {};
  if (s.estado === 'rascunho') { el.closest('[data-seccao]')?.setAttribute('hidden',''); return 0; }
  const itens = (s.itens || []).map(it => {
    const ficha = resolverRef(it);
    return ficha ? { ...ficha, rotulo: it.rotulo, icone: it.icone, porque: it.nota || ficha.porque } : null;
  }).filter(Boolean);
  el.innerHTML = itens.map(x => {
    const fmt = FORMATOS[x.formato] || {};
    const dentro = `
      <span class="sem-capa">${temTexto(x.imagem)
        ? `<img src="${esc(caminho(x.imagem))}" alt="" loading="lazy">`
        : icone(x.icone || fmt.icone || 'estrela', 22)}</span>
      <span class="sem-tx">
        <span class="sem-rot">${esc(x.rotulo || fmt.rotulo || '')}</span>
        <b>${esc(x.titulo || x.nome || '')}</b>
        ${temTexto(x.autor) ? `<span class="sem-aut">${esc(x.autor)}</span>` : ''}
        ${temTexto(x.porque) ? `<span class="sem-nota">${esc(x.porque)}</span>` : ''}
      </span>`;
    return temTexto(x.url) ? `<a class="sem" ${linkAttrs(x.url)}>${dentro}</a>`
                           : `<div class="sem">${dentro}</div>`;
  }).join('');
  return itens.length;
}
window.renderSemana = renderSemana;

/* ── montras por público ──────────────────────────────────────────────
   Três escolhas para cada público. Também são referências: a nota da
   montra substitui a frase da ficha, porque é a mesma obra dita a
   alguém diferente. */
function renderEscolhas(idAlvo) {
  const el = document.getElementById(idAlvo); if (!el) return 0;
  const montras = publicados('escolhas').map(m => ({
    ...m, fichas: (m.refs || []).map(resolverRef).filter(Boolean)
  })).filter(m => m.fichas.length);
  el.innerHTML = montras.map(m => `
    <div class="mpub">
      <div class="mpub-topo">
        <span class="mpub-ico">${icone(m.icone || 'livro', 20)}</span>
        <span class="mpub-pub">${esc(m.publico || '')}</span>
      </div>
      <h3>${esc(m.titulo || '')}</h3>
      <p>${esc(m.nota || '')}</p>
      <ol>${m.fichas.map(x => {
        const fmt = FORMATOS[x.formato] || {};
        const dentro = `
          <span class="mpub-capa">${temTexto(x.imagem)
            ? `<img src="${esc(caminho(x.imagem))}" alt="" loading="lazy">`
            : icone(fmt.icone || 'livro', 18)}</span>
          <span>
            <b>${esc(x.titulo || x.nome || '')}</b>
            ${temTexto(x.autor) ? `<span class="aut">${esc(x.autor)}</span>` : ''}
            ${temTexto(x.porque) ? `<span class="pq">${esc(x.porque)}</span>` : ''}
          </span>`;
        return `<li>${temTexto(x.url)
          ? `<a class="mpub-item" ${linkAttrs(x.url)}>${dentro}</a>`
          : `<div class="mpub-item">${dentro}</div>`}</li>`;
      }).join('')}</ol>
    </div>`).join('');
  return montras.length;
}
window.renderEscolhas = renderEscolhas;

/* ═══════════════════════════════════════════════════════════════
   FASE 3 — LINGUAGEM DE MOVIMENTO E ASSINATURAS VISUAIS
   ═══════════════════════════════════════════════════════════════ */

/* ── revelação no scroll ──────────────────────────────────────────────
   Vinte linhas em vez de uma biblioteca de animação. Cada elemento com
   [data-revela] entra uma vez e fica. Quem tem «movimento reduzido»
   ligado no sistema vê tudo já no lugar, sem transição nenhuma. */
function ligarRevelacao() {
  const alvos = $$('[data-revela]');
  if (!alvos.length) return;
  const reduzido = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduzido || !('IntersectionObserver' in window)) return;   /* fica tudo visível */

  /* Só a partir daqui é que o conteúdo pode ser escondido: a partir do
     momento em que há mesmo quem o volte a mostrar. */
  document.documentElement.classList.add('js-revela');

  /* Rede de segurança: se por alguma razão um elemento nunca for observado
     (dentro de um contentor invisível, por exemplo), aparece à mesma
     passados três segundos. Nada fica escondido à espera de um evento. */
  setTimeout(() => alvos.forEach(el => el.classList.add('dentro')), 3000);

  const obs = new IntersectionObserver((entradas, o) => {
    for (const e of entradas) {
      if (!e.isIntersecting) continue;
      e.target.classList.add('dentro');
      o.unobserve(e.target);          /* entra uma vez; não repete ao subir */
    }
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
  alvos.forEach(el => obs.observe(el));
}
window.ligarRevelacao = ligarRevelacao;

/* ── a cota ───────────────────────────────────────────────────────────
   A etiqueta da lombada, usada como marcador de secção. */
function cota(codigo, nome, tom) {
  return `<span class="cota${tom ? ' cota--' + esc(tom) : ''}">
    <span class="banda"></span><span class="cod">${esc(codigo)}</span>
    ${temTexto(nome) ? `<span class="nome">${esc(nome)}</span>` : ''}</span>`;
}
window.cota = cota;

/* ── a estante ────────────────────────────────────────────────────────
   Retrato da coleção: cada bloco é uma classe da CDU, com largura
   proporcional aos exemplares que a Biblioteca tem mesmo. Os números
   vêm de content/colecao.json e editam-se no painel — se ficarem
   desatualizados, corrige-se lá, não aqui. */
function renderEstante(idAlvo) {
  const el = document.getElementById(idAlvo); if (!el) return 0;
  /* Fonte única: as MESMAS classes que a página Encontrar mostra em lista,
     com as MESMAS cores da sinalética física. Ter dois ficheiros com os
     mesmos números era garantir que um deles envelhecia. */
  const classes = publicados('estantes').filter(x => +x.exemplares > 0);
  if (!classes.length) return 0;
  const total = classes.reduce((s, x) => s + (+x.exemplares || 0), 0);
  el.innerHTML = classes.map(x => {
    const parte = (+x.exemplares || 0) / total;
    /* Um bloco com espaço mostra o nome da classe sempre; um estreito só o
       revela ao aproximar. Em repouso, os números sozinhos não diziam nada. */
    const larga = parte > 0.07 ? ' larga' : '';
    return `<div class="estante-c${larga}" style="flex:${parte.toFixed(4)} 1 0;--c:${esc(x.cor || '#7FB8A8')}"
                 tabindex="0" role="group"
                 aria-label="${esc(x.classe)} ${esc(x.designacao)}, ${esc(x.nomeCor || '')}: ${esc(x.exemplares)} exemplares">
      <span class="n">${esc(x.classe)}</span>
      <span class="d">${esc(x.designacao)}</span>
      <span class="q">${Number(x.exemplares).toLocaleString('pt-PT')}</span>
    </div>`;
  }).join('');
  const pe = document.getElementById(idAlvo + '-pe');
  if (pe) pe.innerHTML =
    `<span><b>${total.toLocaleString('pt-PT')}</b> exemplares, em nove classes, cada uma com a sua cor na estante</span>
     <span>Contagem da tabela de cotas da Biblioteca.</span>`;
  return classes.length;
}
window.renderEstante = renderEstante;

/* ── a prateleira de capas ────────────────────────────────────────────
   As capas encostam-se umas às outras; a que se aponta sai para a
   frente. Aceita qualquer coleção que tenha imagem, título e url. */
function renderPrateleira(idAlvo, itens, limite) {
  const el = document.getElementById(idAlvo); if (!el) return 0;
  const lista = (itens || []).filter(x => temTexto(x.imagem)).slice(0, limite || 14);
  el.innerHTML = lista.map(x => {
    const t = esc(x.titulo || x.nome || '');
    const dentro = `<img src="${esc(caminho(x.imagem))}" alt="${esc(x.alt || t)}" loading="lazy">`;
    return temTexto(x.url)
      ? `<a class="prat-l" ${linkAttrs(x.url)} title="${t}">${dentro}</a>`
      : `<span class="prat-l" title="${t}">${dentro}</span>`;
  }).join('');
  return lista.length;
}
window.renderPrateleira = renderPrateleira;

/* ---------- páginas e subsecções ---------- */
/* A navegação segue o que o utilizador quer FAZER, e não o tipo de conteúdo
   que a Biblioteca tem. Um aluno e um professor podem ambos querer encontrar
   um livro ou participar numa atividade — por isso não há menus por perfil. */
const PAGINAS = [
  { id: 'p-inicio',     rotulo: 'Início',     url: 'index.html' },
  { id: 'p-encontrar',  rotulo: 'Encontrar',  url: 'encontrar.html',  nota: 'Procura. Descobre. Escolhe.' },
  { id: 'p-aprender',   rotulo: 'Aprender',   url: 'aprender.html',   nota: 'Pesquisa melhor. Aprende melhor.' },
  { id: 'p-ler',        rotulo: 'Ler',        url: 'ler.html',        nota: 'Livros para ler. Histórias para ouvir.' },
  { id: 'p-participar', rotulo: 'Participar', url: 'participar.html', nota: 'Há sempre qualquer coisa a acontecer.' },
  { id: 'p-conhecer',   rotulo: 'Conhecer',   url: 'conhecer.html',   nota: 'A Biblioteca, as pessoas e os serviços.' },
];

/* ---------- cabeçalho ---------- */
function renderCabecalho() {
  const alvo = $('#cabecalho'); if (!alvo) return;
  const atual = document.body.id, i = CONTEUDO.info || {};
  const itens = PAGINAS.map(p =>
    `<a href="${p.url}"${p.id === atual ? ' class="active" aria-current="page"' : ''}>${esc(p.rotulo)}</a>`).join('');
  alvo.innerHTML = `
  <header>
    <div class="topbar">
      <!-- Logótipo oficial do BrandKit, versão Horizontal em SVG: já inclui o
           descritivo "Biblioteca Escolar" exigido pelo manual. Em ecrã estreito
           passa ao ícone, como o manual manda abaixo do tamanho mínimo. -->
      <a class="brand" href="index.html" aria-label="Biblioteca Escolar da Escola Secundária de Paredes — página inicial">
        <img class="logo" src="imagens/logo/logo-horizontal.svg" alt="Biblioteca Escolar ESParedes">
        <img class="logo-icone" src="imagens/logo/icone.svg" alt="Biblioteca Escolar ESParedes">
      </a>
      <nav class="main" id="nav" aria-label="Menu principal">${itens}</nav>
      <div class="utils">
        ${temTexto(i.opacSimples) ? `<a class="util" ${linkAttrs(i.opacSimples)} title="Pesquisar no catálogo" aria-label="Pesquisar no catálogo">${icone('lupa', 17)}</a>` : ''}
        <a class="util" href="participar.html#proximos" title="Agenda" aria-label="Agenda">${icone('calendario', 17)}</a>
        <a class="util area" href="admin/" title="Painel de edição do site" aria-label="Painel de edição do site">${icone('cadeado', 16)}</a>
        <button class="menu-toggle" aria-label="Abrir menu" aria-expanded="false" aria-controls="nav">${icone('pasta', 18)}</button>
      </div>
    </div>
  </header>`;
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
        <img class="foot-logo" src="imagens/logo/logo-horizontal-negativo.svg" alt="">
        <b>${esc(i.nome || 'Biblioteca Escolar')}</b><span>${esc(i.escola || '')}</span>
        <div class="foot-social">${redes}</div>
      </div>
      <div><h4>Mapa do Site</h4>${PAGINAS.map(p => `<a href="${p.url}">${esc(p.completo || p.rotulo)}</a>`).join('')}</div>
      <div><h4>Ligações Úteis</h4>${uteis}</div>
      <div><h4>A Biblioteca</h4>
        <a href="conhecer.html#quem-somos">Quem somos</a>
        <a href="conhecer.html#espaco">O espaço</a>
        <a href="conhecer.html#documentos">Documentos orientadores</a>
        <a href="aprender.html#docentes">Para docentes</a>
        <a href="area-trabalho.html">Área de trabalho</a>
      </div>
      <div><h4>Contactos</h4>
        <address class="foot-contact">
          ${esc(i.localizacao || '')}<br>${esc(i.escola || '')}<br>
          ${temTexto(i.telefone) ? `<a href="tel:${esc((i.telefone || '').replace(/\s/g, ''))}">${esc(i.telefone)}</a><br>` : ''}
          <a href="mailto:${esc(i.email)}">${esc(i.email)}</a><br>
          ${esc(i.horario || '')}${temTexto(i.atendimento) ? `<br><span class="foot-nota">Atendimento: ${esc(i.atendimento)}</span>` : ''}
          ${temTexto(i.mapa) ? `<br><a ${linkAttrs(i.mapa)}>Ver no Google Maps</a>` : ''}
        </address>
      </div>
    </div>
    <div class="foot-bottom wrap">
      © ${new Date().getFullYear()} ${esc(i.nome || '')} da ESP ·
      ${temTexto(i.codigoRBE) ? `Rede de Bibliotecas Escolares, código ${esc(i.codigoRBE)} ·` : ''}
      <a href="acessibilidade.html">Acessibilidade</a> ·
      <a href="privacidade.html">Privacidade</a> ·
      <a href="admin/">Editar o site</a>
    </div>
  </footer>`;
}

/* ---------- hero / carrossel ---------- */
/* O carrossel foi retirado a 21/08/2026 (Fase 3). Os mesmos banners passaram
   a desenhar-se na faixa editorial «Em cartaz» da página inicial, onde se veem
   todos ao mesmo tempo em vez de um de cada vez. O conteúdo (banners.json) e a
   sua edição no painel mantêm-se exatamente iguais. */
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
const CHIP = { '#D8AC47': 'gold', '#2B2B2B': 'grafite' };
function cardNoticia(n) {
  const dest = temTexto(n.url) ? n.url : 'participar.html';
  return `<a class="noticia" ${linkAttrs(dest)}>
    <span class="capa">${temTexto(n.imagem)
      ? `<img src="${esc(caminho(n.imagem))}" alt="${esc(n.alt || n.titulo || '')}">`
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
  /* Na página inicial a agenda é compacta: dia, mês e título, no máximo
     quatro entradas. A lista completa vive em Atividades (28/07/2026). */
  const casa = $('#home-agenda');
  if (casa) casa.innerHTML = (CONTEUDO.agenda || []).slice(0, 4).map(e => {
    const t = temTexto(e.url) ? `<a ${linkAttrs(e.url)}>${esc(e.titulo)}</a>` : esc(e.titulo);
    return `<li><span class="dia">${esc(e.dia)} ${esc(e.mes)}</span>
      <span class="tit">${t}</span></li>`;
  }).join('') || '<li><span class="tit">Sem eventos datados de momento.</span></li>';

  const html = (CONTEUDO.agenda || []).map(e => {
    const t = temTexto(e.url) ? `<a ${linkAttrs(e.url)}>${esc(e.titulo)}</a>` : esc(e.titulo);
    return `<li><span class="dia"><b>${esc(e.dia)}</b><span>${esc(e.mes)}</span></span>
      <span><h4>${t}</h4><small>${esc(e.local)}</small></span></li>`;
  }).join('');
  ['#ativ-agenda'].forEach(s => { const el = $(s); if (el) el.innerHTML = html; });
}

/* ---------- galeria e documentos ---------- */
function renderGaleria() {
  const el = $('#galeria'); if (!el) return;
  el.innerHTML = (CONTEUDO.galeria || []).map(g => {
    const leg = esc(g.legenda || 'foto');
    return `<div class="media tile" title="${leg}">${temTexto(g.imagem)
      ? `<img src="${esc(caminho(g.imagem))}" alt="${esc(g.alt || g.legenda || '')}">`
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
  const lista = publicados('videos').filter(v => v && idYoutube(v.url));
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
/* Documentos estruturantes.
   Por opção da Biblioteca, a documentação completa não é exposta em linha: a lista
   dá a conhecer os documentos que existem e permite pedi-los. Basta preencher o
   campo "url" em content/documentos.json para qualquer um passar a ficheiro público. */
function renderDocumentos() {
  const el = $('#lista-documentos'); if (!el) return;
  const email = ((CONTEUDO.info || {}).email) || 'biblioteca@esparedes.pt';
  el.innerHTML = (CONTEUDO.documentos || []).map(d => temTexto(d.url)
    ? `<li><a ${linkAttrs(d.url)}><span class="ico">${icone('ficheiro', 18)}</span>${esc(d.titulo)}</a></li>`
    : `<li><span class="item"><span class="ico">${icone('ficheiro', 18)}</span>${esc(d.titulo)}
        <em>— consulta na Biblioteca ou <a href="mailto:${esc(email)}?subject=${encodeURIComponent('Pedido de consulta: ' + d.titulo)}">a pedido</a></em></span></li>`).join('');
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
      s.innerHTML = `<img src="${esc(caminho(c.imagem))}" alt="">`;
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
/* ---------- pesquisa dentro do site ----------
   Constrói um índice a partir do próprio conteúdo, pelo que não é preciso
   manter uma lista à parte: o que a equipa publicar entra na pesquisa. */
function construirIndice(C) {
  const ix = [];
  const põe = (tipo, titulo, nota, url) => {
    if (temTexto(titulo)) ix.push({ tipo, titulo, nota: nota || '', url: url || '#' });
  };
  (C.noticias || []).forEach(n => põe('Notícia', n.titulo, n.data, n.url || 'participar.html'));
  (C.agenda || []).forEach(a => põe('Agenda', a.titulo, [a.dia, a.mes, a.ano].filter(Boolean).join(' '), a.url || 'participar.html#proximos'));
  (C.projetos || []).forEach(p => põe('Projeto', p.nome, p.descricao, 'participar.html#projetos'));
  (C.iniciativasNacionais || []).forEach(i => põe('Iniciativa', i.nome, i.area, i.url));
  (C.exposicoes || []).forEach(e => põe('Exposição', e.titulo, e.periodo, 'participar.html#exposicoes'));
  (C.trabalhosAlunos || []).forEach(t => põe('Trabalhos', t.titulo, t.autores, 'participar.html#trabalhos'));
  (C.guioes || []).forEach(g => põe('Guião', g.titulo, g.descricao, g.url || 'aprender.html#guioes'));
  /* Nos recursos digitais junta-se o género (ebooks, audiolivros, repositórios)
     e o tipo de acesso, para que quem escreve «ebook» os encontre. */
  const GENERO = { ebooks: 'eBooks', audiolivros: 'Audiolivros', imprensa: 'Jornais e revistas', repositorios: 'Repositórios' };
  (C.bibliotecaDigital || []).forEach(b => põe('Recurso digital', b.nome,
    [GENERO[b.tipo] || b.tipo, b.acesso ? 'acesso ' + b.acesso : '', b.descricao].filter(Boolean).join(' · '), b.url));
  (C.ligacoesUteis || []).forEach(l => põe('Ligação útil', l.nome, l.grupo, l.url));
  (C.disciplinas || []).forEach(d => {
    põe('Disciplina', d.nome, 'Recursos por disciplina', 'aprender.html#disciplinas');
    ['essenciais', 'aprofundamento', 'propostas', 'testados'].forEach(k =>
      (d[k] || []).forEach(r => põe('Recurso', r.titulo, d.nome, r.url || 'aprender.html#disciplinas')));
  });
  (C.faq || []).forEach(f => põe('Pergunta frequente', f.pergunta, '', 'encontrar.html#faq'));
  (C.documentos || []).forEach(d => põe('Documento', d.titulo, '', d.url || 'conhecer.html#documentos'));
  (C.destaquesCatalogo || []).forEach(d => põe('Destaque', d.titulo, d.autor, 'encontrar.html'));
  (C.acessoRapido || []).forEach(a => põe('Serviço', a.rotulo, a.sub, a.url));
  if (C.desafioMes && C.desafioMes.titulo) põe('Desafio', C.desafioMes.titulo, '', C.desafioMes.url || 'aprender.html#literacia');
  PAGINAS.forEach(p => põe('Página', p.completo || p.rotulo, '', p.url));
  põe('Formulário', 'Sugerir a compra de um livro', 'Fala com a equipa', 'conhecer.html#contactos');
  põe('Formulário', 'Pedir apoio numa pesquisa', 'Serviço de referência', 'aprender.html');
  põe('Formulário', 'Reservar espaço para uma turma', 'Para docentes', 'aprender.html');
  return ix;
}
/* Comparação sem acentos nem maiúsculas, para «matematica» encontrar «Matemática». */
const semAcento = t => String(t || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
function procurar(ix, termo) {
  const q = semAcento(termo).trim();
  if (q.length < 2) return [];
  const palavras = q.split(/\s+/);
  return ix.map(x => {
    const t = semAcento(x.titulo), n = semAcento(x.nota), c = semAcento(x.tipo);
    let p = 0;
    palavras.forEach(w => {
      if (t.startsWith(w)) p += 10;
      else if (t.includes(w)) p += 6;
      if (n.includes(w)) p += 2;
      /* A categoria também conta: quem escreve «formulário» ou «guião» procura
         um género de coisa, não um título. */
      if (c.includes(w)) p += 3;
    });
    return p ? { ...x, p } : null;
  }).filter(Boolean).sort((a, b) => b.p - a.p || a.titulo.length - b.titulo.length);
}
window.construirIndice = construirIndice; window.procurar = procurar;
window.esc = esc; window.temTexto = temTexto; window.linkAttrs = linkAttrs; window.cartaoAcao = cartaoAcao;
(async function iniciar() {
  await carregarConteudo();
  renderCabecalho(); renderRodape();
  renderNoticias(); renderAgenda(); renderGaleria(); renderDocumentos();
  renderVideos();
  if (window.renderPagina) window.renderPagina();
  aplicarCartoes();
  ligarFormulario();
  ligarRevelacao();
})();
