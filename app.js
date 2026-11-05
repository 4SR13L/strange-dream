
const products = [
  {id:"pins",name:"Pin buttons Haru, Aki e Fuyu",category:"Acessórios",universe:"Zeno REMAKE",price:10.90,image:"pins-haru-aki-fuyu.png",stock:"EM ESTOQUE",low:false},
  {id:"deadkeys",name:"Pingentes de acrílico Dead Plate",category:"Acessórios",universe:"Dead Plate",price:13.90,image:"dead-plate-keychains.png",stock:"OFERTA −33%",low:false},
  {id:"sweatshirt",name:"Dead Plate Sweatshirts",category:"Roupas",universe:"Dead Plate",price:44.95,image:"dead-plate-sweatshirt.png",stock:"EM ESTOQUE",low:false},
  {id:"carnivore",name:"Carnivore Tee",category:"Roupas",universe:"Dead Plate",price:41.99,image:"carnivore-tee.png",stock:"ÚLTIMAS 4",low:true},
  {id:"basil",name:"Nendoroid BASIL",category:"Figures & Estátuas",universe:"OMORI",price:429.00,image:"basil-figure.png",stock:"EM ESTOQUE",low:false},
  {id:"omoriset",name:"Banpresto Osuwari Figure OMORI & Basil",category:"Figures & Estátuas",universe:"OMORI",price:129.90,image:"omori-figure-set.png",stock:"OFERTA −33%",low:false},
  {id:"basilplush",name:"FARAWAY BASIL Plush",category:"Pelúcias",universe:"OMORI",price:34.90,image:"basil-plush.png",stock:"EM ESTOQUE",low:false},
  {id:"omorishirt",name:"OMORI? T-shirt",category:"Roupas",universe:"OMORI",price:49.90,image:"omori-shirt.png",stock:"EM ESTOQUE",low:false},
  {id:"maeno",name:"Maeno Aki double-sided Keychain",category:"Acessórios",universe:"Zeno REMAKE",price:14.90,image:"hero-keychain.png",stock:"EM ESTOQUE",low:false},
  {id:"plushdead",name:"Xm Plush Toy Dead Plate Game",category:"Pelúcias",universe:"Dead Plate",price:41.90,image:"dead-plate-plush.png",stock:"ÚLTIMAS 4",low:true},
  {id:"omoriplush",name:"OMORI Plush",category:"Pelúcias",universe:"OMORI",price:34.90,image:"omori-plush.png",stock:"EM ESTOQUE",low:false},
  {id:"blacktee",name:"OMORI monochrome Tee",category:"Roupas",universe:"OMORI",price:45.69,image:"black-shirt.png",stock:"EM ESTOQUE",low:false}
];

const money = n => n.toLocaleString("pt-BR", {
  style:"currency",
  currency:"BRL"
});

const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];

let cart = JSON.parse(localStorage.getItem("sd-cart") || "[]");
let favorites = JSON.parse(localStorage.getItem("sd-favs") || '["carnivore","basil","maeno"]');

let activeCategory = [];
let activeUniverse = [];
let onlyStock = false;
let maxPrice = 500;

function save() {
  localStorage.setItem("sd-cart", JSON.stringify(cart));
  localStorage.setItem("sd-favs", JSON.stringify(favorites));
}

function toast(message) {
  const el = $("#toast");
  if (!el) return;

  el.textContent = message;
  el.classList.add("show");

  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => {
    el.classList.remove("show");
  }, 2100);
}

function card(product) {
  const isFavorite = favorites.includes(product.id);

  return `
    <article class="product-card">
      <div class="product-image">
        <img
          src="assets/${product.image}"
          alt="${product.name}"
          loading="lazy"
        >

        <button
          class="favorite-btn ${isFavorite ? "is-favorite" : ""}"
          data-fav="${product.id}"
          aria-label="Salvar ${product.name}"
        >
          ${isFavorite ? "♥" : "♡"}
        </button>
      </div>

      <div class="product-info">
        <span class="product-category">${product.category}</span>
        <h3>${product.name}</h3>
        <span class="product-universe">${product.universe}</span>

        <div class="product-price-row">
          <strong class="product-price">${money(product.price)}</strong>
          <span class="stock ${product.low ? "low" : ""}">
            ${product.stock}
          </span>
        </div>

        <button class="product-open" data-view="${product.id}">
          VER PRODUTO →
        </button>
      </div>
    </article>
  `;
}

function renderFeatured() {
  const grid = $("#featured-grid");
  if (!grid) return;

  grid.innerHTML = products.slice(0, 4).map(card).join("");
}

function filtered() {
  const search = ($("#catalog-search")?.value || "").trim().toLowerCase();

  let list = products.filter(product => {
    const searchable = (
      product.name + " " +
      product.category + " " +
      product.universe
    ).toLowerCase();

    return (
      (!search || searchable.includes(search)) &&
      (!activeCategory.length || activeCategory.includes(product.category)) &&
      (!activeUniverse.length || activeUniverse.includes(product.universe)) &&
      (!onlyStock || product.stock.includes("ESTOQUE")) &&
      product.price <= maxPrice
    );
  });

  const sort = $("#sort-products")?.value;

  if (sort === "low") {
    list.sort((a, b) => a.price - b.price);
  }

  if (sort === "high") {
    list.sort((a, b) => b.price - a.price);
  }

  if (sort === "name") {
    list.sort((a, b) => a.name.localeCompare(b.name));
  }

  return list;
}

function renderCatalog() {
  const grid = $("#catalog-grid");
  if (!grid) return;

  const list = filtered();

  grid.innerHTML = list.map(card).join("");

  const total = $("#catalog-total");
  if (total) {
    total.textContent = `${list.length} ITENS ENCONTRADOS`;
  }

  const empty = $("#empty-state");
  if (empty) {
    empty.hidden = list.length > 0;
  }

  const active = $("#active-filters");
  if (active) {
    const filters = [
      ...activeCategory,
      ...activeUniverse,
      ...(onlyStock ? ["Em estoque"] : [])
    ];

    active.innerHTML = filters
      .map(item => `<span class="filter-chip">${item} ×</span>`)
      .join("");
  }
}

function updateFavoriteCount() {
  const count = $("#favorite-count");

  if (count) {
    count.textContent = String(favorites.length).padStart(2, "0");
  }
}

function updateCart() {
  const count = cart.reduce((total, item) => total + item.qty, 0);

  const countElement = $("#cart-count");
  if (countElement) {
    countElement.textContent = `[${count}]`;
  }

  const subtotal = cart.reduce((total, item) => {
    const product = products.find(p => p.id === item.id);
    return total + (product ? product.price * item.qty : 0);
  }, 0);

  const shipping = count ? 12 : 0;

  if ($("#cart-subtotal")) {
    $("#cart-subtotal").textContent = money(subtotal);
  }

  if ($("#cart-shipping")) {
    $("#cart-shipping").textContent = money(shipping);
  }

  if ($("#cart-total")) {
    $("#cart-total").textContent = money(subtotal + shipping);
  }

  const cartItems = $("#cart-items");

  if (cartItems) {
    cartItems.innerHTML = cart.length
      ? cart.map(item => {
          const product = products.find(p => p.id === item.id);
          if (!product) return "";

          return `
            <div class="cart-line">
              <img src="assets/${product.image}" alt="${product.name}">

              <div>
                <h3>${product.name}</h3>
                <small>
                  ${product.universe} · ${money(product.price)}
                </small>

                <div class="qty-controls">
                  <button data-qty="${product.id}" data-delta="-1">−</button>
                  <span>${item.qty}</span>
                  <button data-qty="${product.id}" data-delta="1">+</button>
                </div>
              </div>

              <button class="remove-item" data-remove="${product.id}">
                REMOVER
              </button>
            </div>
          `;
        }).join("")
      : `
        <div class="cart-empty">
          SEU CARRINHO ESTÁ EM SILÊNCIO.
          <br><br>
          Talvez uma pequena obsessão esteja esperando por você.
        </div>
      `;
  }

  save();
}

function addToCart(id, quantity = 1) {
  const product = products.find(p => p.id === id);
  if (!product) return;

  const item = cart.find(p => p.id === id);

  if (item) {
    item.qty += quantity;
  } else {
    cart.push({id, qty:quantity});
  }

  updateCart();
  toast("PRODUTO ADICIONADO AO CARRINHO.");
}

function openCart() {
  $("#cart-drawer")?.classList.add("open");
  $("#drawer-backdrop")?.classList.add("open");

  $("#cart-drawer")?.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeCart() {
  $("#cart-drawer")?.classList.remove("open");
  $("#drawer-backdrop")?.classList.remove("open");

  $("#cart-drawer")?.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function showProduct(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;

  const detail = $("#product-detail");
  const dialog = $("#product-dialog");

  if (!detail || !dialog) return;

  detail.innerHTML = `
    <div class="dialog-product">
      <img src="assets/${product.image}" alt="${product.name}">

      <div>
        <span class="eyebrow">
          ${product.category} / ${product.universe}
        </span>

        <h2>${product.name}</h2>

        <p>
          Uma pequena obsessão para levar seu universo favorito
          para fora da tela. Produto apresentado no arquivo STRANGEDREAM.
        </p>

        <div class="price">${money(product.price)}</div>

        <p class="stock ${product.low ? "low" : ""}">
          ${product.stock}
        </p>

        <button class="button button-pink" data-add="${product.id}">
          ADICIONAR AO CARRINHO →
        </button>

        <p>
          <small>
            Informações de envio e pagamento são demonstrativas nesta versão.
          </small>
        </p>
      </div>
    </div>
  `;

  dialog.showModal();
}

/* Ações dos produtos, favoritos e carrinho */

document.addEventListener("click", event => {
  const add = event.target.closest("[data-add]");

  if (add) {
    addToCart(add.dataset.add);

    if ($("#product-dialog")?.open) {
      $("#product-dialog").close();
    }
  }

  const favorite = event.target.closest("[data-fav]");

  if (favorite) {
    const id = favorite.dataset.fav;

    favorites = favorites.includes(id)
      ? favorites.filter(item => item !== id)
      : [...favorites, id];

    updateFavoriteCount();
    renderFeatured();
    renderCatalog();
    save();

    toast(
      favorites.includes(id)
        ? "SALVO NOS FAVORITOS."
        : "REMOVIDO DOS FAVORITOS."
    );
  }

  const view = event.target.closest("[data-view]");

  if (view) {
    showProduct(view.dataset.view);
  }

  const quantity = event.target.closest("[data-qty]");

  if (quantity) {
    const item = cart.find(p => p.id === quantity.dataset.qty);

    if (item) {
      item.qty += Number(quantity.dataset.delta);

      if (item.qty < 1) {
        cart = cart.filter(p => p !== item);
      }

      updateCart();
    }
  }

  const remove = event.target.closest("[data-remove]");

  if (remove) {
    cart = cart.filter(p => p.id !== remove.dataset.remove);
    updateCart();
  }
});

/* Controles principais */

$("#open-cart")?.addEventListener("click", openCart);
$("#close-cart")?.addEventListener("click", closeCart);
$("#drawer-backdrop")?.addEventListener("click", closeCart);

$("#close-product")?.addEventListener("click", () => {
  $("#product-dialog")?.close();
});

$("#checkout-button")?.addEventListener("click", () => {
  if (cart.length) {
    closeCart();
    location.hash = "#delivery";
  } else {
    toast("SEU CARRINHO ESTÁ VAZIO.");
  }
});

/* Busca e filtros */

$("#catalog-search")?.addEventListener("input", renderCatalog);
$("#sort-products")?.addEventListener("change", renderCatalog);

$("#price-filter")?.addEventListener("input", event => {
  maxPrice = Number(event.target.value);

  if ($("#price-output")) {
    $("#price-output").textContent = money(maxPrice);
  }

  renderCatalog();
});

$("#apply-filters")?.addEventListener("click", () => {
  activeCategory = $$(".category-filter:checked").map(item => item.value);
  activeUniverse = $$(".universe-filter:checked").map(item => item.value);

  onlyStock = Boolean($("#stock-filter")?.checked);

  renderCatalog();
});

$("#clear-filters")?.addEventListener("click", () => {
  $$(".category-filter, .universe-filter").forEach(item => {
    item.checked = false;
  });

  if ($("#stock-filter")) {
    $("#stock-filter").checked = false;
  }

  if ($("#price-filter")) {
    $("#price-filter").value = 500;
  }

  if ($("#catalog-search")) {
    $("#catalog-search").value = "";
  }

  maxPrice = 500;
  activeCategory = [];
  activeUniverse = [];
  onlyStock = false;

  if ($("#price-output")) {
    $("#price-output").textContent = money(500);
  }

  renderCatalog();
});

/* Busca global */

$("#global-search")?.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    const search = event.target.value;

    location.hash = "#catalogo";

    setTimeout(() => {
      if ($("#catalog-search")) {
        $("#catalog-search").value = search;
        renderCatalog();
      }
    }, 50);
  }
});

$("#global-search")?.addEventListener("focus", event => {
  event.target.select();
});

/* Atalho de favoritos */

$("#favorites-shortcut")?.addEventListener("click", () => {
  location.hash = "#favorites";
});

/* Newsletter */

$("#newsletter-form")?.addEventListener("submit", event => {
  event.preventDefault();

  toast("INSCRIÇÃO REGISTRADA NESTA DEMONSTRAÇÃO.");
  event.target.reset();
});

/* Menu mobile */

$(".menu-toggle")?.addEventListener("click", () => {
  const nav = $(".main-nav");
  if (!nav) return;

  const open = nav.classList.toggle("open");

  $(".menu-toggle")?.setAttribute("aria-expanded", String(open));
});

$$(".main-nav a").forEach(link => {
  link.addEventListener("click", () => {
    $(".main-nav")?.classList.remove("open");
    $(".menu-toggle")?.setAttribute("aria-expanded", "false");
  });
});

/* Tema claro e escuro */

function setTheme(theme) {
  const dark = theme === "dark";

  document.body.classList.toggle("dark", dark);
  localStorage.setItem("sd-theme", dark ? "dark" : "light");

  if ($("#theme-toggle")) {
    $("#theme-toggle").textContent = dark ? "☀" : "☾";
  }
}

$("#theme-toggle")?.addEventListener("click", () => {
  setTheme(document.body.classList.contains("dark") ? "light" : "dark");
});

document.addEventListener("click", event => {
  const choice = event.target.closest("[data-theme-choice]");

  if (choice) {
    setTheme(choice.dataset.themeChoice);
  }
});

if (localStorage.getItem("sd-theme") === "dark") {
  setTheme("dark");
}

/* Navegação das páginas internas */

function renderPageRoute() {
  const main = $("main");
  if (!main || typeof window.renderSDPage !== "function") return;

  const rawRoute = location.hash.replace(/^#/, "");
  const route = rawRoute || "";

  const homeRoutes = [
    "",
    "inicio",
    "catalogo",
    "novidades",
    "manifesto",
    "newsletter",
    "social",
    "comunidade"
  ];

  const isHome = homeRoutes.includes(route);

  let pageView = $("#page-view");

  if (!pageView) {
    pageView = document.createElement("div");
    pageView.id = "page-view";
    pageView.className = "page-view";
    main.appendChild(pageView);
  }

  const homeElements = [...main.children].filter(element => {
    return element !== pageView;
  });

  if (isHome) {
    homeElements.forEach(element => {
      element.hidden = false;
    });

    pageView.hidden = true;

    renderFeatured();
    renderCatalog();
    updateCart();

    return;
  }

  closeCart();

  homeElements.forEach(element => {
    element.hidden = true;
  });

  pageView.hidden = false;

  pageView.innerHTML = window.renderSDPage(route, {
    products,
    cart,
    favorites,
    toast
  }) || window.renderSDPage("404", {
    products,
    cart,
    favorites,
    toast
  });

  window.scrollTo({
    top: 0,
    behavior: "auto"
  });
}

window.addEventListener("hashchange", renderPageRoute);

/* Eventos dos elementos das páginas internas */

document.addEventListener("click", event => {
  const add = event.target.closest("[data-page-add]");

  if (add) {
    const id = add.dataset.pageAdd;
    const quantity = Math.max(1, Number($("#page-qty")?.value || 1));

    addToCart(id, quantity);
    return;
  }

  const quantity = event.target.closest("[data-page-qty]");

  if (quantity) {
    const item = cart.find(p => p.id === quantity.dataset.pageQty);

    if (item) {
      item.qty += Number(quantity.dataset.delta);

      if (item.qty < 1) {
        cart = cart.filter(p => p !== item);
      }

      updateCart();
      renderPageRoute();
    }

    return;
  }

  const remove = event.target.closest("[data-page-remove]");

  if (remove) {
    cart = cart.filter(p => p.id !== remove.dataset.pageRemove);

    updateCart();
    renderPageRoute();
    return;
  }

  const toastButton = event.target.closest("[data-toast]");

  if (toastButton) {
    toast(toastButton.dataset.toast);
  }
});

/* Formulários demonstrativos */

document.addEventListener("submit", event => {
  const form = event.target;

  if (form.matches("[data-demo-form]")) {
    event.preventDefault();

    const kind = form.dataset.demoForm;

    const next = {
      delivery: "payment",
      register: "verify",
      recover: "verify",
      reset: "login",
      card: "review",
      support: "request-status",
      cancel: "request-status",
      request: "request-status",
      settings: "account"
    };

    if (kind === "payment") {
      const selected = form.querySelector(
        'input[name="payment"]:checked'
      )?.value || "pix";

      location.hash = selected === "pix"
        ? "#pix"
        : selected === "card"
          ? "#card-payment"
          : "#boleto";

      return;
    }

    if (kind === "review") {
      toast("AVALIAÇÃO REGISTRADA NESTA DEMONSTRAÇÃO.");
      return;
    }

    if (next[kind]) {
      location.hash = "#" + next[kind];
    } else {
      toast("SOLICITAÇÃO REGISTRADA NESTA DEMONSTRAÇÃO.");
    }
  }

  if (form.matches("[data-search-form]")) {
    event.preventDefault();

    const query = new FormData(form).get("q") || "";

    location.hash = "#catalogo";

    setTimeout(() => {
      if ($("#catalog-search")) {
        $("#catalog-search").value = query;
        renderCatalog();
      }
    }, 50);
  }
});

/* Inicialização */

function initializeStore() {
  updateFavoriteCount();
  renderFeatured();
  renderCatalog();
  updateCart();
  renderPageRoute();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeStore);
} else {
  initializeStore();
}
