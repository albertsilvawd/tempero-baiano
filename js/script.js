(function(){
  "use strict";

  const STORAGE_KEY = "tb-idioma";
  let idiomaAtual = localStorage.getItem(STORAGE_KEY) || "es";
  let categoriaAtiva = "todos";

  /* ---------- TRADUÇÃO DE TEXTOS ESTÁTICOS ---------- */
  function aplicarTraducaoEstatica(){
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const chave = el.getAttribute("data-i18n");
      const texto = UI[idiomaAtual][chave];
      if (texto !== undefined) el.textContent = texto;
    });
    document.documentElement.lang = idiomaAtual === "es" ? "es-AR" : "pt-BR";
    document.body.classList.toggle("lang-es", idiomaAtual === "es");
    document.body.classList.toggle("lang-pt", idiomaAtual === "pt");
    document.querySelectorAll(".lang-btn").forEach(btn => {
      btn.classList.toggle("is-active", btn.dataset.setlang === idiomaAtual);
      btn.setAttribute("aria-pressed", btn.dataset.setlang === idiomaAtual ? "true" : "false");
    });
  }

  function trocarIdioma(novo){
    idiomaAtual = novo;
    localStorage.setItem(STORAGE_KEY, novo);
    aplicarTraducaoEstatica();
    renderizarMenu();
    renderizarHorarios();
    renderizarResenas();
  }

  /* ---------- MENU ---------- */
  const CATEGORIAS_ORDEM = ["populares", "especiales", "economico", "combos", "bebidas", "postres"];
  const CATEGORIA_TAG_KEY = {
    populares: "menu_tab_populares",
    especiales: "menu_tab_especiales",
    economico: "menu_tab_economico",
    combos: "menu_tab_combos",
    bebidas: "menu_tab_bebidas",
    postres: "menu_tab_postres",
  };

  function renderizarMenu(){
    const grid = document.getElementById("menu-grid");
    if (!grid) return;
    grid.innerHTML = "";

    const itens = MENU.filter(item => categoriaAtiva === "todos" || item.categoria === categoriaAtiva);

    itens.forEach((item, i) => {
      const card = document.createElement("article");
      card.className = "plate-card reveal";
      card.style.transitionDelay = (i % 6) * 40 + "ms";

      const tagTexto = UI[idiomaAtual][CATEGORIA_TAG_KEY[item.categoria]] || "";

      card.innerHTML = `
        <div class="plate-card__media">
          <img src="assets/img/menu/${item.img}" alt="${item.nombre[idiomaAtual]}" loading="lazy" width="400" height="300">
        </div>
        <div class="plate-card__body">
          <span class="plate-card__tag">${tagTexto}</span>
          <h4>${item.nombre[idiomaAtual]}</h4>
          <p>${item.desc[idiomaAtual]}</p>
        </div>
      `;
      grid.appendChild(card);
    });

    observarRevelacao();
  }

  function renderizarAbas(){
    const tabs = document.getElementById("menu-tabs");
    if (!tabs) return;
    const todas = ["todos", ...CATEGORIAS_ORDEM];
    tabs.innerHTML = todas.map(cat => {
      const label = cat === "todos" ? UI[idiomaAtual].menu_tab_todos : UI[idiomaAtual][CATEGORIA_TAG_KEY[cat]];
      const ativo = cat === categoriaAtiva ? "is-active" : "";
      return `<button class="menu__tab ${ativo}" data-cat="${cat}">${label}</button>`;
    }).join("");

    tabs.querySelectorAll(".menu__tab").forEach(btn => {
      btn.addEventListener("click", () => {
        categoriaAtiva = btn.dataset.cat;
        renderizarAbas();
        renderizarMenu();
      });
    });
  }

  /* ---------- HORÁRIOS ---------- */
  function renderizarHorarios(){
    const html = HORARIOS.map(h => {
      const nomeDia = UI[idiomaAtual][h.dia_key];
      const horas = h.horas.length ? h.horas.join(" · ") : UI[idiomaAtual].cerrado;
      return `<li><span>${nomeDia}</span><span>${horas}</span></li>`;
    }).join("");
    ["lista-horarios", "lista-horarios-contato"].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.innerHTML = html;
    });
  }

  /* ---------- RESEÑAS ---------- */
  function renderizarResenas(){
    const wrap = document.getElementById("resenas-scroll");
    if (!wrap) return;
    wrap.innerHTML = RESENAS.map(r => `
      <div class="resena-card">
        <div class="resena-card__estrelas" aria-hidden="true">★★★★★</div>
        <p>&ldquo;${r.texto[idiomaAtual]}&rdquo;</p>
        <div class="resena-card__prato">${r.plato[idiomaAtual]}</div>
      </div>
    `).join("");
  }

  /* ---------- REVEAL ON SCROLL ---------- */
  let observer;
  function observarRevelacao(){
    if (!("IntersectionObserver" in window)){
      document.querySelectorAll(".reveal").forEach(el => el.classList.add("is-visible"));
      return;
    }
    if (!observer){
      observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting){
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });
    }
    document.querySelectorAll(".reveal:not(.is-visible)").forEach(el => observer.observe(el));
  }

  /* ---------- NAV MOBILE ---------- */
  function configurarNavMobile(){
    const toggle = document.getElementById("nav-toggle");
    const links = document.getElementById("nav-links");
    if (!toggle || !links) return;
    toggle.addEventListener("click", () => {
      const aberto = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", aberto ? "true" : "false");
    });
    links.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
      links.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }));
  }

  /* ---------- ANO NO RODAPÉ ---------- */
  function configurarAno(){
    const el = document.getElementById("ano-atual");
    if (el) el.textContent = new Date().getFullYear();
  }

  /* ---------- INICIALIZAÇÃO ---------- */
  function iniciar(){
    document.querySelectorAll(".lang-btn").forEach(btn => {
      btn.addEventListener("click", () => trocarIdioma(btn.dataset.setlang));
    });
    aplicarTraducaoEstatica();
    renderizarAbas();
    renderizarMenu();
    renderizarHorarios();
    renderizarResenas();
    configurarNavMobile();
    configurarAno();
    observarRevelacao();

    // Reveal genérico para seções (não só cards de menu)
    document.querySelectorAll(".section__head, .historia__texto, .historia__selo, .paso, .info-card").forEach(el => {
      el.classList.add("reveal");
    });
    observarRevelacao();
  }

  document.addEventListener("DOMContentLoaded", iniciar);
})();
