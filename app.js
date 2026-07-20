const slides = [
  [1, "Portada · Cómo hacer un trámite aprobado", "general"],
  [2, "Índice del proceso", "general"],
  [3, "Pantalla de acceso", "general"],
  [4, "Conexión con INVEX", "general"],
  [5, "Prueba de vida del ejecutivo", "general"],
  [6, "Geolocalización", "general"],
  [7, "Selección del lugar de venta", "general"],
  [8, "Bandeja de entrada / inicio de registro", "general"],
  [9, "Firma de autorización para consulta de Buró", "general"],
  [10, "Selección del método de identificación", "general"],
  [11, "Toma de foto de identificación / anverso", "general"],
  [12, "Inicialización del escáner", "general"],
  [13, "Preparación de la cámara", "general"],
  [14, "Escaneo de identificación", "general"],
  [15, "Revisa cómo se ve la INE", "general"],
  [16, "Vista previa de identificación / anverso", "general"],
  [17, "Toma de foto de identificación / reverso", "general"],
  [18, "Vista previa de identificación / reverso", "general"],
  [19, "Transcripción de identificación", "general"],
  [20, "Captura de solicitud / parte 1", "general"],
  [21, "Captura de solicitud / domicilio", "general"],
  [22, "INE con domicilio oculto o distinto", "general"],
  [23, "Captura de solicitud / parte 2", "general"],
  [24, "Captura de solicitud / parte 3", "general"],
  [25, "Captura de solicitud / parte 4", "general"],
  [26, "Resultado de aprobación", "general"],
  [27, "Validación de OTP", "general"],
  [28, "Segunda prueba de vida del ejecutivo / parte 1", "general"],
  [29, "Segunda prueba de vida del ejecutivo / parte 2", "general"],
  [30, "Segunda selfie del cliente", "general"],
  [31, "Prueba de vida del cliente", "general"],
  [32, "Video de confirmación de datos del cliente", "general"],
  [33, "Firma de solicitud y acuse de tarjeta", "general"],
  [34, "Activación por APP", "app"],
  [35, "Descarga la APP de INVEX", "app"],
  [36, "Da clic en Registrarse", "app"],
  [37, "Registro en la APP", "app"],
  [38, "Coloca los datos del cliente", "app"],
  [39, "Coloca el token que llega por SMS", "app"],
  [40, "Que el cliente cree una contraseña", "app"],
  [41, "Mensaje de registro exitoso", "app"],
  [42, "Pide que inicie sesión", "app"],
  [43, "Que active su tarjeta", "app"],
  [44, "Colocar fecha de vencimiento", "app"],
  [45, "Coloca el token de seguridad", "app"],
  [46, "Que el cliente cree un NIP", "app"],
  [47, "Activación lista", "app"],
  [48, "Beneficios y aceptación de primera compra", "app"],
  [49, "Beneficios · Ahorra Más", "app"],
  [50, "Tipo de activación · Finalizar trámite", "app"],
  [51, "Activación por MAAT", "maat"],
  [52, "Tipo de activación por MAAT", "maat"],
  [53, "Consulta los tipos de errores", "maat"],
  [54, "Token de activación", "maat"],
  [55, "Asignación de NIP", "maat"],
  [56, "Sube la foto del error", "maat"],
  [57, "Cierre de jornada", "maat"],
  [58, "Cierre exitoso", "maat"],
  [59, "Hagamos que las cosas sucedan", "cierre"],
].map(([number, title, section]) => ({ number, title, section }));

const sectionMeta = {
  general: {
    eyebrow: "Proceso general",
    title: "Realiza el trámite paso a paso.",
    description: "Desde el acceso y la captura de documentos hasta la firma de solicitud.",
  },
  app: {
    eyebrow: "Ruta 01 · APP",
    title: "Activación por APP",
    description: "Registro, token, creación de NIP y activación desde la aplicación de INVEX.",
  },
  maat: {
    eyebrow: "Ruta 02 · MAAT",
    title: "Activación por MAAT",
    description: "Tipificación del error, evidencia, token, NIP y cierre correcto del trámite.",
    link: "./assets/downloads/guia-errores-maat.pdf",
  },
  cierre: {
    eyebrow: "Cierre",
    title: "Hagamos que las cosas sucedan.",
    description: "Revisa el proceso completo y vuelve a la sección que necesites.",
  },
};

const sectionOrder = ["general", "app", "maat", "cierre"];
const sectionsRoot = document.querySelector("#manualSections");
const dialog = document.querySelector("#slideDialog");
const dialogImage = document.querySelector("#dialogImage");
const dialogTitle = document.querySelector("#dialogTitle");
const dialogNumber = document.querySelector("#dialogNumber");
const dialogProgress = document.querySelector("#dialogProgress");
const resultCount = document.querySelector("#resultCount");
let activeSlideIndex = 0;
let activeFilter = "all";

const slidePath = (number) => `./assets/slides/slide-${String(number).padStart(2, "0")}.webp`;

function createSection(sectionKey) {
  const meta = sectionMeta[sectionKey];
  const sectionSlides = slides.filter((slide) => slide.section === sectionKey);
  const section = document.createElement("section");
  section.className = "manual-section";
  section.dataset.section = sectionKey;
  section.id = sectionKey === "app" ? "activacion-app" : sectionKey === "maat" ? "activacion-maat" : `seccion-${sectionKey}`;

  const link = meta.link
    ? `<a class="section-route-button" href="${meta.link}" target="_blank" rel="noopener">Abrir guía de errores MAAT ↗</a>`
    : "";

  section.innerHTML = `
    <header class="section-head reveal">
      <div>
        <p class="eyebrow">${meta.eyebrow}</p>
        <h2>${meta.title}</h2>
        ${link}
      </div>
      <p>${meta.description}</p>
    </header>
    <div class="slides-grid"></div>
    <div class="no-results">No encontramos diapositivas con esa búsqueda.</div>
  `;

  const grid = section.querySelector(".slides-grid");
  sectionSlides.forEach((slide) => grid.append(createSlideCard(slide)));
  return section;
}

function createSlideCard(slide) {
  const article = document.createElement("article");
  article.className = "slide-card reveal";
  article.id = `slide-${slide.number}`;
  article.dataset.section = slide.section;
  article.dataset.title = slide.title.toLocaleLowerCase("es");
  article.dataset.slide = String(slide.number);
  article.innerHTML = `
    <button class="slide-image-button" type="button" aria-label="Ampliar diapositiva ${slide.number}: ${slide.title}">
      <img src="${slidePath(slide.number)}" alt="${slide.title}" loading="lazy" width="1600" height="900" />
    </button>
    <div class="slide-card-body">
      <span class="slide-index">${String(slide.number).padStart(2, "0")}</span>
      <h3>${slide.title}</h3>
      <button class="open-slide" type="button" aria-label="Abrir diapositiva ${slide.number}">↗</button>
    </div>
  `;
  article.querySelectorAll("button").forEach((button) => button.addEventListener("click", () => openSlide(slide.number)));
  return article;
}

sectionOrder.forEach((key) => sectionsRoot.append(createSection(key)));

function openSlide(number) {
  activeSlideIndex = slides.findIndex((slide) => slide.number === number);
  updateDialog();
  dialog.showModal();
  document.body.classList.add("dialog-open");
}

function updateDialog() {
  const slide = slides[activeSlideIndex];
  dialogImage.src = slidePath(slide.number);
  dialogImage.alt = slide.title;
  dialogTitle.textContent = slide.title;
  dialogNumber.textContent = `Diapositiva ${String(slide.number).padStart(2, "0")}`;
  dialogProgress.textContent = `${String(slide.number).padStart(2, "0")} / 59`;
}

function moveSlide(direction) {
  activeSlideIndex = (activeSlideIndex + direction + slides.length) % slides.length;
  updateDialog();
}

document.querySelector("#prevSlide").addEventListener("click", () => moveSlide(-1));
document.querySelector("#nextSlide").addEventListener("click", () => moveSlide(1));
document.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("close", () => document.body.classList.remove("dialog-open"));
dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && document.activeElement === document.querySelector("#slideSearch")) {
    document.querySelector("#slideSearch").value = "";
    applyFilters();
  }
  if (!dialog.open) return;
  if (event.key === "ArrowLeft") moveSlide(-1);
  if (event.key === "ArrowRight") moveSlide(1);
});

const searchInput = document.querySelector("#slideSearch");
searchInput.addEventListener("input", applyFilters);
document.querySelectorAll(".filter-button").forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    document.querySelectorAll(".filter-button").forEach((item) => item.classList.toggle("is-active", item === button));
    applyFilters();
  });
});

function normalize(value) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}

function applyFilters() {
  const query = normalize(searchInput.value);
  let visible = 0;
  document.querySelectorAll(".manual-section").forEach((section) => {
    let sectionVisible = 0;
    section.querySelectorAll(".slide-card").forEach((card) => {
      const matchFilter = activeFilter === "all" || card.dataset.section === activeFilter;
      const matchQuery = !query || normalize(card.dataset.title).includes(query) || card.dataset.slide.includes(query);
      const show = matchFilter && matchQuery;
      card.classList.toggle("is-hidden", !show);
      if (show) { visible += 1; sectionVisible += 1; }
    });
    const hideSection = sectionVisible === 0 && (activeFilter !== "all" || query);
    section.hidden = hideSection;
    section.querySelector(".no-results").classList.toggle("is-visible", sectionVisible === 0 && !hideSection);
  });
  resultCount.textContent = String(visible);
}

document.querySelectorAll("[data-jump-slide]").forEach((link) => {
  link.addEventListener("click", () => {
    activeFilter = "all";
    searchInput.value = "";
    document.querySelectorAll(".filter-button").forEach((button) => button.classList.toggle("is-active", button.dataset.filter === "all"));
    applyFilters();
  });
});

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");
menuToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(open));
});
nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  nav.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

const backToTop = document.querySelector(".back-to-top");
backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
window.addEventListener("scroll", () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  document.querySelector(".scroll-progress span").style.width = `${progress}%`;
  backToTop.classList.toggle("is-visible", window.scrollY > 800);
}, { passive: true });

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-revealed");
      revealObserver.unobserve(entry.target);
    }
  });
}, { rootMargin: "0px 0px -8%" });
document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const current = entry.target.id === "inicio" ? "#inicio" : entry.target.id === "soporte" ? "#soporte" : "#manual";
    document.querySelectorAll(".nav-link").forEach((link) => link.classList.toggle("is-active", link.getAttribute("href") === current));
  });
}, { rootMargin: "-40% 0px -50%" });
[document.querySelector("#inicio"), document.querySelector("#manual"), document.querySelector("#soporte")].forEach((section) => navObserver.observe(section));

if (location.hash.startsWith("#slide-")) {
  requestAnimationFrame(() => document.querySelector(location.hash)?.scrollIntoView());
}
