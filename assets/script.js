const highlights = [
  {
    id: 1,
    title: "Atualizações recentes do portal institucional",
    description: "Painel com as publicações e sistemas mais recentes da Fapespa para consulta rápida em um único ambiente.",
    date: "Abr 2026",
    icon: "UP",
    accent: "bg-highlight-primary",
    featured: true,
    link: "#produtos"
  },
  {
    id: 2,
    title: "Anuário Estatístico do Pará 2026",
    description: "Publicação com indicadores econômicos, sociais e demográficos para consulta por tema e território.",
    date: "Mar 2026",
    icon: "AN",
    accent: "bg-highlight-secondary"
  },
  {
    id: 3,
    title: "Radar - Mapa Interativo de Bacias",
    description: "Visualização geoespacial com dados ambientais e de território para apoio à análise regional.",
    date: "Fev 2026",
    icon: "RD",
    accent: "bg-highlight-tertiary"
  },
  {
    id: 4,
    title: "PIB Municipal - Relatório Trimestral",
    description: "Análise do Produto Interno Bruto dos municípios paraenses com série histórica e recortes comparativos.",
    date: "Jan-Mar 2026",
    icon: "PIB",
    accent: "bg-highlight-quaternary"
  }
];

const products = [
  {
    name: "Anuário Estatístico",
    status: "Portal externo",
    accent: "bg-primary-gradient",
    symbol: "A",
    description: "Publicação principal com acesso próprio, sem depender da estrutura interna do servidor da Fapespa.",
    links: [
      { label: "Abrir", url: "https://marlonpalhetajr.github.io/Anuario/", note: "visualização provisória" }
    ]
  },
  {
    name: "Radar",
    status: "Aplicação independente",
    accent: "bg-success-gradient",
    symbol: "R",
    description: "Produto próprio para mapas e painéis, preparado para evoluir sem ocupar o servidor local.",
    links: [
      { label: "Abrir", url: "https://marlonpalhetajr.github.io/radar2025/", note: "acesso externo" }
    ]
  },
  {
    name: "PIB",
    status: "Site institucional",
    accent: "bg-info-gradient",
    symbol: "P",
    description: "Página dedicada para conteúdo econômico, com estrutura leve e publicação separada.",
    links: [
      { label: "Abrir", url: "https://marlonpalhetajr.github.io/pib-para/", note: "acesso externo" }
    ]
  },
  {
    name: "Conversor de Imagem",
    status: "Ferramenta web",
    accent: "bg-warning-gradient",
    symbol: "C",
    description: "Aplicação para converter imagens com processamento no navegador e distribuição independente.",
    links: [
      { label: "Abrir", url: "https://marlonpalhetajr.github.io/Conversor-de-Imagem/", note: "acesso externo" }
    ]
  }
];

const grid = document.getElementById("product-grid");
const searchInput = document.getElementById("product-search");
const productCount = document.getElementById("product-count");

function createCard(product) {
  const card = document.createElement("article");
  card.className = "card-modern card-hover-lift product-card";

  const links = product.links
    .map(
      link => `
        <a href="${link.url}" target="_blank" rel="noreferrer" class="btn-card-modern btn-card-modern-inline">
          ${link.label}
        </a>
      `
    )
    .join("");

  card.innerHTML = `
    <div class="card-icon-wrapper ${product.accent}">${product.symbol}</div>
    <h5 class="card-modern-title">${product.name}</h5>
    <p class="card-modern-text">${product.description}</p>
    <div class="product-status">${product.status}</div>
    <div class="product-links">
      ${links}
    </div>
  `;

  return card;
}

function normalizeText(text) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function renderProducts(items) {
  grid.innerHTML = "";
  items.forEach(product => {
    grid.appendChild(createCard(product));
  });

  if (productCount) {
    const total = products.length;
    productCount.textContent = `${items.length} de ${total} produtos`;
  }
}

function filterProducts(query) {
  const q = normalizeText(query.trim());
  if (!q) {
    return products;
  }

  return products.filter(product => {
    const haystack = normalizeText(
      `${product.name} ${product.status} ${product.description}`
    );
    return haystack.includes(q);
  });
}

if (searchInput) {
  searchInput.addEventListener("input", event => {
    const query = event.target.value;
    renderProducts(filterProducts(query));
  });
}

renderProducts(products);

// Renderizar destaques
const featuredContainer = document.getElementById("featured-highlight");
const highlightsGrid = document.getElementById("highlights-grid");

function createFeaturedHighlight(highlight) {
  const featured = document.createElement("div");
  featured.className = "highlight-featured-content";
  
  const linkHTML = highlight.link ? `
    <a href="${highlight.link}" target="_blank" rel="noreferrer" class="highlight-featured-link">
      Leia mais →
    </a>
  ` : "";
  
  featured.innerHTML = `
    <span class="highlight-featured-date">${highlight.date}</span>
    <h3>${highlight.title}</h3>
    <p class="highlight-featured-text">${highlight.description}</p>
    ${linkHTML}
  `;
  
  const icon = document.createElement("div");
  icon.className = `highlight-featured-icon ${highlight.accent}`;
  icon.textContent = highlight.icon;
  
  const container = document.createElement("div");
  container.style.display = "contents";
  container.appendChild(icon);
  container.appendChild(featured);
  
  return container.children;
}

function createHighlightCard(highlight) {
  const card = document.createElement("article");
  card.className = "highlight-card";
  
  card.innerHTML = `
    <div class="highlight-card-header">
      <div class="highlight-card-icon ${highlight.accent}">
        ${highlight.icon}
      </div>
      <div class="highlight-card-date">${highlight.date}</div>
    </div>
    <h4 class="highlight-card-title">${highlight.title}</h4>
    <p class="highlight-card-text">${highlight.description}</p>
  `;
  
  return card;
}

// Renderizar o destaque featured
const featured = highlights.find(h => h.featured);
if (featured) {
  const elements = createFeaturedHighlight(featured);
  Array.from(elements).forEach(el => featuredContainer.appendChild(el));
}

// Renderizar os destaques secundários
const secondaryHighlights = highlights.filter(h => !h.featured);
secondaryHighlights.forEach(highlight => {
  highlightsGrid.appendChild(createHighlightCard(highlight));
});
