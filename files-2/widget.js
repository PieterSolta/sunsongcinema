/**
 * ☀ SUNSONG CINEMA — Find My Film Widget
 * ─────────────────────────────────────────────────────────────
 * Embed op elke site met één regel:
 * <div id="sunsong-widget"></div>
 * <script src="https://sunsongcinema.com/widget.js"></script>
 *
 * Optioneel configureren:
 * <script>
 *   window.SunsongConfig = {
 *     mubiRef:   'jouw-mubi-ref',    // affiliate code
 *     amazonTag: 'jouw-amazon-tag',  // affiliate code
 *     lang:      'nl',               // 'nl' of 'en'
 *     theme:     'dark',             // 'dark' of 'light'
 *   };
 * </script>
 */

(function() {
  'use strict';

  // ── CONFIG ────────────────────────────────────────────────
  const cfg = window.SunsongConfig || {};
  const MUBI_REF   = cfg.mubiRef   || '';
  const AMAZON_TAG = cfg.amazonTag || '';
  const LANG       = cfg.lang      || 'en';
  const THEME      = cfg.theme     || 'dark';
  const OMDB_KEY   = cfg.omdbKey   || 'ca52d131';
  const SITE_URL   = 'https://sunsongcinema.com';
  const FIND_URL   = SITE_URL + '/find.html';

  // ── STRINGS ───────────────────────────────────────────────
  const T = {
    en: {
      placeholder: 'Something slow and melancholic, about longing and time...',
      btn: 'Find my film',
      loading: 'Searching the universe of cinema',
      two_films: 'Two films for you',
      watch_mubi: 'Watch on MUBI',
      rent_buy: 'Rent or Buy',
      amazon: 'Amazon Video',
      more: 'More about this film →',
      discover: 'Discover more at Sunsong Cinema',
      again: 'Find different films',
      powered: 'Powered by',
      chips: [
        'something funny and absurd',
        'a film about grief',
        'directed by a woman',
        'Korean cinema',
        'a perfect gift film',
        'I want to fall in love with cinema',
      ]
    },
    nl: {
      placeholder: 'Iets langzaams en melancholisch, over verlangen en tijd...',
      btn: 'Vind mijn film',
      loading: 'We doorzoeken het filmuniversum',
      two_films: 'Twee films voor jou',
      watch_mubi: 'Bekijk op MUBI',
      rent_buy: 'Huur of Koop',
      amazon: 'Amazon Video',
      more: 'Meer over deze film →',
      discover: 'Ontdek meer op Sunsong Cinema',
      again: 'Andere films zoeken',
      powered: 'Mogelijk gemaakt door',
      chips: [
        'iets grappigs en absurds',
        'een film over verlies',
        'geregisseerd door een vrouw',
        'Koreaanse cinema',
        'een cadeau-film',
        'ik wil verliefd worden op film',
      ]
    }
  };
  const t = T[LANG] || T.en;

  // ── STYLES ────────────────────────────────────────────────
  const DARK = {
    bg:       '#0c0a08',
    bg2:      '#141210',
    gold:     '#d4af5a',
    goldDim:  'rgba(212,175,90,0.2)',
    cream:    '#f0e8da',
    text:     '#c8c0b4',
    dim:      '#8a7e70',
    border:   'rgba(212,175,90,0.15)',
    btnBg:    'rgba(255,255,255,0.03)',
  };
  const LIGHT = {
    bg:       '#faf7f2',
    bg2:      '#f0ebe2',
    gold:     '#a07820',
    goldDim:  'rgba(160,120,32,0.15)',
    cream:    '#1a1510',
    text:     '#3a3228',
    dim:      '#7a6e60',
    border:   'rgba(160,120,32,0.2)',
    btnBg:    'rgba(0,0,0,0.03)',
  };
  const c = THEME === 'light' ? LIGHT : DARK;

  const uid = 'ssw' + Math.random().toString(36).slice(2,7);

  const CSS = `
    #${uid}{
      font-family:'Georgia',serif;
      background:${c.bg};
      border:1px solid ${c.border};
      color:${c.text};
      max-width:560px;
      width:100%;
      box-sizing:border-box;
      position:relative;
      overflow:hidden;
    }
    #${uid} *{box-sizing:border-box;margin:0;padding:0}
    #${uid} a{color:inherit;text-decoration:none}

    /* header */
    #${uid} .ss-head{
      padding:20px 24px 0;
      display:flex;align-items:center;justify-content:space-between;
    }
    #${uid} .ss-logo{
      font-family:'Georgia',serif;font-size:11px;
      letter-spacing:0.22em;text-transform:uppercase;
      color:${c.gold};display:flex;align-items:center;gap:8px;
    }
    #${uid} .ss-logo-sun{
      font-size:16px;
      animation:${uid}pulse 3s ease-in-out infinite;
    }
    @keyframes ${uid}pulse{
      0%,100%{filter:drop-shadow(0 0 4px ${c.gold})}
      50%{filter:drop-shadow(0 0 12px ${c.gold})}
    }

    /* input area */
    #${uid} .ss-input-wrap{
      padding:16px 24px 0;
    }
    #${uid} .ss-textarea{
      width:100%;background:${c.bg2};
      border:1px solid ${c.border};
      color:${c.cream};
      font-family:'Georgia',serif;font-size:15px;
      line-height:1.6;padding:14px 16px;
      resize:none;outline:none;
      transition:border-color 0.25s;
      min-height:80px;
    }
    #${uid} .ss-textarea:focus{border-color:${c.gold}}
    #${uid} .ss-textarea::placeholder{color:${c.dim};font-style:italic}

    /* chips */
    #${uid} .ss-chips{
      padding:10px 24px 0;
      display:flex;flex-wrap:wrap;gap:6px;
    }
    #${uid} .ss-chip{
      background:none;border:1px solid ${c.border};
      color:${c.dim};padding:5px 11px;
      font-size:11px;letter-spacing:0.04em;
      cursor:pointer;font-family:'Georgia',serif;
      transition:all 0.18s;
    }
    #${uid} .ss-chip:hover{
      border-color:${c.gold};color:${c.gold};
      background:${c.goldDim};
    }

    /* submit */
    #${uid} .ss-submit-wrap{padding:14px 24px 20px}
    #${uid} .ss-btn{
      width:100%;background:${c.gold};
      color:${THEME==='light'?'#fff':'#0c0a08'};
      border:none;padding:13px 20px;
      font-family:'Georgia',serif;font-size:11px;
      letter-spacing:0.18em;text-transform:uppercase;
      cursor:pointer;display:flex;align-items:center;
      justify-content:center;gap:10px;
      transition:opacity 0.2s;
    }
    #${uid} .ss-btn:hover:not(:disabled){opacity:0.85}
    #${uid} .ss-btn:disabled{opacity:0.45;cursor:not-allowed}
    #${uid} .ss-btn-sun{
      font-size:14px;
      transition:transform 0.4s;
    }
    #${uid} .ss-btn:not(:disabled):hover .ss-btn-sun{transform:rotate(30deg)}

    /* divider */
    #${uid} .ss-divider{
      height:1px;background:${c.border};margin:0 24px;
    }

    /* loading */
    #${uid} .ss-loading{
      display:none;padding:32px 24px;
      text-align:center;
    }
    #${uid} .ss-loading-sun{
      font-size:36px;margin-bottom:14px;
      animation:${uid}spin 2s linear infinite;
      display:block;
    }
    @keyframes ${uid}spin{
      from{transform:rotate(0deg);filter:drop-shadow(0 0 6px ${c.gold})}
      50%{filter:drop-shadow(0 0 18px ${c.gold})}
      to{transform:rotate(360deg);filter:drop-shadow(0 0 6px ${c.gold})}
    }
    #${uid} .ss-loading-text{
      font-size:13px;font-style:italic;color:${c.dim};
    }
    #${uid} .ss-dots::after{
      content:'';animation:${uid}dots 1.4s steps(4,end) infinite;
    }
    @keyframes ${uid}dots{
      0%{content:''}25%{content:'.'}50%{content:'..'}75%{content:'...'}
    }

    /* results */
    #${uid} .ss-results{display:none;padding:0}
    #${uid} .ss-results-label{
      padding:16px 24px 4px;
      font-size:9px;letter-spacing:0.24em;text-transform:uppercase;
      color:${c.gold};opacity:0.7;
    }

    /* film card */
    #${uid} .ss-film{
      padding:16px 24px;
      border-top:1px solid ${c.border};
      display:flex;gap:16px;
      animation:${uid}fadein 0.4s ease;
    }
    @keyframes ${uid}fadein{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
    #${uid} .ss-film-num{
      font-size:10px;letter-spacing:0.16em;
      color:${c.gold};opacity:0.5;
      padding-top:3px;flex-shrink:0;width:18px;
    }
    #${uid} .ss-film-poster{
      width:54px;flex-shrink:0;aspect-ratio:2/3;
      display:flex;align-items:center;justify-content:center;
      border:1px solid ${c.border};position:relative;overflow:hidden;
    }
    #${uid} .ss-film-sym{
      font-size:18px;opacity:0.15;color:${c.cream};
      position:relative;z-index:1;
    }
    #${uid} .ss-film-info{flex:1;min-width:0}
    #${uid} .ss-film-meta{
      font-size:9px;letter-spacing:0.14em;text-transform:uppercase;
      color:${c.dim};margin-bottom:4px;
    }
    #${uid} .ss-film-title{
      font-size:20px;color:${c.cream};
      line-height:1.1;margin-bottom:2px;
    }
    #${uid} .ss-film-director{
      font-size:11px;font-style:italic;
      color:${c.gold};margin-bottom:8px;
    }
    #${uid} .ss-film-why{
      font-size:13px;font-style:italic;
      color:${c.text};line-height:1.6;margin-bottom:10px;
    }
    #${uid} .ss-film-actions{display:flex;flex-direction:column;gap:6px}
    #${uid} .ss-film-mubi{
      display:flex;align-items:center;gap:8px;
      background:${c.gold};
      color:${THEME==='light'?'#fff':'#0c0a08'};
      padding:8px 12px;font-size:10px;
      letter-spacing:0.1em;text-transform:uppercase;
      font-family:'Georgia',serif;
      transition:opacity 0.2s;
    }
    #${uid} .ss-film-mubi:hover{opacity:0.85}
    #${uid} .ss-film-links{display:flex;gap:6px;flex-wrap:wrap}
    #${uid} .ss-film-link{
      padding:6px 10px;font-size:9px;
      letter-spacing:0.1em;text-transform:uppercase;
      border:1px solid ${c.border};color:${c.dim};
      font-family:'Georgia',serif;transition:all 0.18s;
      white-space:nowrap;
    }
    #${uid} .ss-film-link:hover{border-color:${c.gold};color:${c.gold}}
    #${uid} .ss-film-more{
      font-size:10px;letter-spacing:0.1em;
      color:${c.gold};opacity:0.7;
      padding:4px 0 0;display:inline-block;
      transition:opacity 0.2s;
    }
    #${uid} .ss-film-more:hover{opacity:1}

    /* footer */
    #${uid} .ss-footer{
      padding:14px 24px;
      display:flex;align-items:center;justify-content:space-between;
      border-top:1px solid ${c.border};
      flex-wrap:wrap;gap:8px;
    }
    #${uid} .ss-powered{
      font-size:9px;letter-spacing:0.16em;text-transform:uppercase;
      color:${c.dim};display:flex;align-items:center;gap:6px;
    }
    #${uid} .ss-powered a{
      color:${c.gold};opacity:0.8;transition:opacity 0.2s;
    }
    #${uid} .ss-powered a:hover{opacity:1}
    #${uid} .ss-again{
      background:none;border:1px solid ${c.border};
      color:${c.dim};padding:6px 12px;
      font-size:9px;letter-spacing:0.12em;text-transform:uppercase;
      cursor:pointer;font-family:'Georgia',serif;
      transition:all 0.18s;
    }
    #${uid} .ss-again:hover{border-color:${c.gold};color:${c.gold}}

    /* discover banner */
    #${uid} .ss-discover{
      display:none;
      margin:0 24px 16px;padding:12px 16px;
      background:${c.goldDim};border:1px solid ${c.border};
      text-align:center;
    }
    #${uid} .ss-discover a{
      font-size:10px;letter-spacing:0.14em;text-transform:uppercase;
      color:${c.gold};transition:opacity 0.2s;
    }
    #${uid} .ss-discover a:hover{opacity:0.75}
  `;

  // ── HTML ──────────────────────────────────────────────────
  const HTML = `
    <div class="ss-head">
      <div class="ss-logo">
        <span class="ss-logo-sun">☀</span>
        Sunsong Cinema
      </div>
    </div>

    <div class="ss-input-wrap">
      <textarea class="ss-textarea" id="${uid}-input"
        placeholder="${t.placeholder}"
        rows="3" maxlength="300"></textarea>
    </div>

    <div class="ss-chips" id="${uid}-chips"></div>

    <div class="ss-submit-wrap">
      <button class="ss-btn" id="${uid}-btn">
        <span class="ss-btn-sun">☀</span>
        <span>${t.btn}</span>
      </button>
    </div>

    <div class="ss-divider"></div>

    <div class="ss-loading" id="${uid}-loading">
      <span class="ss-loading-sun">☀</span>
      <div class="ss-loading-text">${t.loading}<span class="ss-dots"></span></div>
    </div>

    <div class="ss-results" id="${uid}-results">
      <div class="ss-results-label" id="${uid}-label"></div>
      <div id="${uid}-films"></div>
      <div class="ss-discover" id="${uid}-discover">
        <a href="${SITE_URL}" target="_blank" rel="noopener">
          ${t.discover} ☀
        </a>
      </div>
    </div>

    <div class="ss-footer">
      <div class="ss-powered">
        ${t.powered} <a href="${SITE_URL}" target="_blank" rel="noopener">Sunsong Cinema</a>
      </div>
      <button class="ss-again" id="${uid}-again" style="display:none">${t.again}</button>
    </div>
  `;

  // ── GRADIENT LIBRARY ──────────────────────────────────────
  const GRADIENTS = [
    {bg:'linear-gradient(160deg,#0a1520,#1a3040)',sym:'映'},
    {bg:'linear-gradient(160deg,#1a1208,#3d2b0a)',sym:'光'},
    {bg:'linear-gradient(160deg,#0d1a0d,#122a12)',sym:'影'},
    {bg:'linear-gradient(160deg,#1a0d0d,#2a1215)',sym:'愛'},
    {bg:'linear-gradient(160deg,#150d1a,#20122a)',sym:'魂'},
    {bg:'linear-gradient(160deg,#0f0f12,#1a1a20)',sym:'夢'},
    {bg:'linear-gradient(160deg,#1a0a1a,#2a102a)',sym:'時'},
    {bg:'linear-gradient(160deg,#0a150a,#153015)',sym:'道'},
  ];

  // ── LINK BUILDERS ─────────────────────────────────────────
  function mubiUrl(title) {
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
    const base = `https://mubi.com/films/${slug}`;
    return MUBI_REF ? base + '?ref=' + MUBI_REF : base;
  }
  function amazonUrl(title, year) {
    const q = encodeURIComponent(title + ' ' + year + ' film');
    const base = 'https://www.amazon.com/s?k=' + q;
    return AMAZON_TAG ? base + '&tag=' + AMAZON_TAG : base;
  }
  function sunsongUrl(title) {
    // Links naar Sunsong site met film als query — voor toekomstige film-detailpagina's
    return `${SITE_URL}/find.html?film=${encodeURIComponent(title)}`;
  }

  // ── RENDER FILM CARD ──────────────────────────────────────
  function renderFilm(film, index) {
    const g = GRADIENTS[index % GRADIENTS.length];
    const mubi = mubiUrl(film.title);
    const amz  = amazonUrl(film.title, film.year);
    const more = sunsongUrl(film.title);

    return `
      <div class="ss-film">
        <div class="ss-film-num">0${index+1}</div>
        <div class="ss-film-poster" style="background:${g.bg}">
          <div class="ss-film-sym">${g.sym}</div>
        </div>
        <div class="ss-film-info">
          <div class="ss-film-meta">${film.country||''} · ${film.year||''}</div>
          <div class="ss-film-title">${film.title}</div>
          <div class="ss-film-director">${film.director||''}</div>
          <div class="ss-film-why">${film.why}</div>
          <div class="ss-film-actions">
            <a class="ss-film-mubi" href="${mubi}" target="_blank" rel="noopener">
              ▶ ${t.watch_mubi}
            </a>
            <div class="ss-film-links">
              <a class="ss-film-link" href="${amz}" target="_blank" rel="noopener">
                ${t.rent_buy} / ${t.amazon}
              </a>
            </div>
            <a class="ss-film-more" href="${more}" target="_blank" rel="noopener">
              ${t.more}
            </a>
          </div>
        </div>
      </div>`;
  }

  // ── API CALL ──────────────────────────────────────────────
  async function findFilms(query) {
    const prompt = `You are the film curator for Sunsong Cinema — an elegant, human-curated world cinema platform with refined, international taste.

A visitor described what they want: "${query}"

Respond with EXACTLY two film recommendations as JSON only (no markdown, no backticks, no explanation):
{"films":[{"title":"Film Title","year":1999,"director":"Director Name","country":"Country","why":"Two warm, intelligent sentences explaining why this film matches their request. Never start with This film."},{"title":"Film Title","year":2010,"director":"Director Name","country":"Country","why":"Two warm, intelligent sentences explaining why this film matches their request. Never start with This film."}]}

Rules: real films only, prefer world cinema & arthouse, vary between classics and contemporary, make the why feel personal and specific.`;

    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 800,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    if (!res.ok) throw new Error('API error');
    const data = await res.json();
    const text = (data.content||[]).map(b=>b.text||'').join('');
    const clean = text.replace(/```json|```/g,'').trim();
    return JSON.parse(clean).films;
  }

  // ── INIT ──────────────────────────────────────────────────
  function init() {
    // Find container
    const container = document.getElementById('sunsong-widget') || document.body;

    // Inject styles
    const style = document.createElement('style');
    style.textContent = CSS;
    document.head.appendChild(style);

    // Inject widget
    const wrap = document.createElement('div');
    wrap.id = uid;
    wrap.innerHTML = HTML;
    container.appendChild(wrap);

    // Load Google Fonts if not already loaded
    if (!document.querySelector('link[href*="Cormorant"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;1,300&display=swap';
      document.head.appendChild(link);
    }

    // Chips
    const chipsEl = document.getElementById(`${uid}-chips`);
    t.chips.forEach(chip => {
      const btn = document.createElement('button');
      btn.className = 'ss-chip';
      btn.textContent = chip;
      btn.onclick = () => {
        document.getElementById(`${uid}-input`).value = chip;
      };
      chipsEl.appendChild(btn);
    });

    // Submit
    const submitBtn = document.getElementById(`${uid}-btn`);
    const inputEl   = document.getElementById(`${uid}-input`);
    const loadingEl = document.getElementById(`${uid}-loading`);
    const resultsEl = document.getElementById(`${uid}-results`);
    const filmsEl   = document.getElementById(`${uid}-films`);
    const labelEl   = document.getElementById(`${uid}-label`);
    const discoverEl= document.getElementById(`${uid}-discover`);
    const againBtn  = document.getElementById(`${uid}-again`);

    async function doSearch() {
      const query = inputEl.value.trim();
      if (!query) return;

      submitBtn.disabled = true;
      loadingEl.style.display = 'block';
      resultsEl.style.display = 'none';
      discoverEl.style.display = 'none';
      againBtn.style.display = 'none';

      try {
        const films = await findFilms(query);

        labelEl.textContent = `${t.two_films} — "${query}"`;
        filmsEl.innerHTML = films.map((f,i) => renderFilm(f,i)).join('');
        loadingEl.style.display = 'none';
        resultsEl.style.display = 'block';
        discoverEl.style.display = 'block';
        againBtn.style.display = 'block';

      } catch(e) {
        loadingEl.style.display = 'none';
        filmsEl.innerHTML = `<div style="padding:20px 24px;font-size:13px;font-style:italic;color:${c.dim}">Something went wrong — please try again.</div>`;
        resultsEl.style.display = 'block';
      } finally {
        submitBtn.disabled = false;
      }
    }

    submitBtn.addEventListener('click', doSearch);
    inputEl.addEventListener('keydown', e => {
      if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) doSearch();
    });
    againBtn.addEventListener('click', () => {
      inputEl.value = '';
      resultsEl.style.display = 'none';
      discoverEl.style.display = 'none';
      againBtn.style.display = 'none';
    });
  }

  // Run after DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
