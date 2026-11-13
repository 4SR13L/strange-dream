(() => {
  'use strict';

  const products = [
    {id:'pins',name:'Pin buttons Haru, Aki e Fuyu',category:'Acessórios',universe:'Zeno REMAKE',price:10.90,image:'pins-haru-aki-fuyu.png',stock:'EM ESTOQUE'},
    {id:'deadkeys',name:'Pingentes de acrílico Dead Plate',category:'Acessórios',universe:'Dead Plate',price:13.90,image:'dead-plate-keychains.png',stock:'EM ESTOQUE'},
    {id:'sweatshirt',name:'Dead Plate Sweatshirts',category:'Roupas',universe:'Dead Plate',price:44.95,image:'dead-plate-sweatshirt.png',stock:'EM ESTOQUE'},
    {id:'carnivore',name:'Carnivore Tee',category:'Roupas',universe:'Dead Plate',price:41.99,image:'carnivore-tee.png',stock:'ÚLTIMAS 4'},
    {id:'basil',name:'Nendoroid BASIL',category:'Figures & Estátuas',universe:'OMORI',price:429.00,image:'basil-figure.png',stock:'EM ESTOQUE'},
    {id:'omoriset',name:'Banpresto Osuwari Figure OMORI & Basil',category:'Figures & Estátuas',universe:'OMORI',price:129.90,image:'omori-figure-set.png',stock:'EM ESTOQUE'},
    {id:'basilplush',name:'FARAWAY BASIL Plush',category:'Pelúcias',universe:'OMORI',price:34.90,image:'basil-plush.png',stock:'EM ESTOQUE'},
    {id:'omorishirt',name:'OMORI? T-shirt',category:'Roupas',universe:'OMORI',price:49.90,image:'omori-shirt.png',stock:'EM ESTOQUE'},
    {id:'maeno',name:'Maeno Aki double-sided Keychain',category:'Acessórios',universe:'Zeno REMAKE',price:14.90,image:'hero-keychain.png',stock:'EM ESTOQUE'},
    {id:'plushdead',name:'Xm Plush Toy Dead Plate Game',category:'Pelúcias',universe:'Dead Plate',price:41.90,image:'dead-plate-plush.png',stock:'ÚLTIMAS 4'},
    {id:'omoriplush',name:'OMORI Plush',category:'Pelúcias',universe:'OMORI',price:34.90,image:'omori-plush.png',stock:'EM ESTOQUE'},
    {id:'blacktee',name:'OMORI monochrome Tee',category:'Roupas',universe:'OMORI',price:45.69,image:'black-shirt.png',stock:'EM ESTOQUE'},
    {id:'heroplush',name:'Plush Toy — coleção especial',category:'Pelúcias',universe:'Zeno REMAKE',price:39.90,image:'hero-plush.png',stock:'EM ESTOQUE'},
    {id:'basilalt',name:'BASIL Figure — edição alternativa',category:'Figures & Estátuas',universe:'OMORI',price:139.90,image:'basil-figure-alt.png',stock:'EM ESTOQUE'},
    {id:'keychainset',name:'Keychain Set',category:'Acessórios',universe:'Dead Plate',price:19.90,image:'keychain-set.png',stock:'EM ESTOQUE'}
  ];

  const $ = (s, root=document) => root.querySelector(s);
  const $$ = (s, root=document) => [...root.querySelectorAll(s)];
  const money = n => Number(n).toLocaleString('pt-BR',{style:'currency',currency:'BRL'});

  function read(key, fallback) {
    try {
      return JSON.parse(localStorage.getItem(key)) ?? fallback;
    } catch {
      return fallback;
    }
  }

  let cart = read('sd-cart', []);
  let favorites = read('sd-favs', ['carnivore','basil','maeno']);
  let categoryFilters = [];
  let universeFilters = [];
  let stockOnly = false;
  let maxPrice = 500;
  let favoritesOnly = false;

  function persist() {
    localStorage.setItem('sd-cart', JSON.stringify(cart));
    localStorage.setItem('sd-favs', JSON.stringify(favorites));
  }

  function toast(message) {
    const el = $('#toast');
    if (!el) return;
    el.textContent = message;
    el.classList.add('show');
    clearTimeout(window.sdToastTimer);
    window.sdToastTimer = setTimeout(() => el.classList.remove('show'), 2200);
  }

  function productCard(p) {
    const fav = favorites.includes(p.id);

    return `
      <article class="product-card">
        <div class="product-image">
          <img
            src="assets/${p.image}"
            alt="${p.name}"
            loading="lazy"
            onerror="this.style.display='none';this.parentElement.classList.add('image-missing')"
          >
          <button class="favorite-btn ${fav ? 'is-favorite' : ''}"
            data-fav="${p.id}" aria-label="Favoritar ${p.name}">
            ${fav ? '♥' : '♡'}
          </button>
        </div>

        <div class="product-info">
          <span class="product-category">${p.category}</span>
          <h3>${p.name}</h3>
          <span class="product-universe">${p.universe}</span>

          <div class="product-price-row">
            <strong class="product-price">${money(p.price)}</strong>
            <span class="stock ${p.stock.includes('ÚLTIMAS') ? 'low' : ''}">
              ${p.stock}
            </span>
          </div>

          <button class="product-open" data-view="${p.id}">
            VER PRODUTO →
          </button>
        </div>
      </article>
    `;
  }

  function renderFeatured() {
    const grid = $('#featured-grid');
    if (grid) grid.innerHTML = products.slice(0, 4).map(productCard).join('');
  }

  function getFiltered() {
    const query = ($('#catalog-search')?.value || '').trim().toLocaleLowerCase('pt-BR');

    let list = products.filter(p => {
      const text = `${p.name} ${p.category} ${p.universe}`.toLocaleLowerCase('pt-BR');

      return (
        (!query || text.includes(query)) &&
        (!categoryFilters.length || categoryFilters.includes(p.category)) &&
        (!universeFilters.length || universeFilters.includes(p.universe)) &&
        (!stockOnly || p.stock.includes('ESTOQUE')) &&
        p.price <= maxPrice &&
        (!favoritesOnly || favorites.includes(p.id))
      );
    });

    const sort = $('#sort-products')?.value;
    if (sort === 'low') list.sort((a,b) => a.price - b.price);
    if (sort === 'high') list.sort((a,b) => b.price - a.price);
    if (sort === 'name') list.sort((a,b) => a.name.localeCompare(b.name,'pt-BR'));

    return list;
  }

  function renderCatalog() {
    const grid = $('#catalog-grid');
    if (!grid) return;

    const list = getFiltered();
    grid.innerHTML = list.map(productCard).join('');

    const total = $('#catalog-total');
    if (total) total.textContent = `${list.length} ITENS ENCONTRADOS`;

    const empty = $('#empty-state');
    if (empty) empty.hidden = list.length !== 0;

    const chips = $('#active-filters');
    if (chips) {
      const filters = [
        ...categoryFilters,
        ...universeFilters,
        ...(stockOnly ? ['Em estoque'] : []),
        ...(favoritesOnly ? ['Favoritos'] : [])
      ];
      chips.innerHTML = filters.map(x => `<span class="filter-chip">${x}</span>`).join('');
    }
  }

  function updateFavoriteCount() {
    const el = $('#favorite-count');
    if (el) el.textContent = String(favorites.length).padStart(2,'0');
  }

  function updateCart() {
    cart = cart.filter(i => products.some(p => p.id === i.id) && Number(i.qty) > 0);

    const count = cart.reduce((n,i) => n + i.qty, 0);
    const subtotal = cart.reduce((n,i) => n + (products.find(p => p.id === i.id)?.price || 0) * i.qty, 0);
    const shipping = count ? 12 : 0;

    if ($('#cart-count')) $('#cart-count').textContent = `[${count}]`;
    if ($('#cart-subtotal')) $('#cart-subtotal').textContent = money(subtotal);
    if ($('#cart-shipping')) $('#cart-shipping').textContent = money(shipping);
    if ($('#cart-total')) $('#cart-total').textContent = money(subtotal + shipping);

    const holder = $('#cart-items');

    if (holder) {
      holder.innerHTML = cart.length ? cart.map(i => {
        const p = products.find(x => x.id === i.id);
        return `
          <div class="cart-line">
            <img src="assets/${p.image}" alt="${p.name}">
            <div>
              <h3>${p.name}</h3>
              <small>${p.universe} · ${money(p.price)}</small>
              <div class="qty-controls">
                <button data-qty="${p.id}" data-delta="-1">−</button>
                <span>${i.qty}</span>
                <button data-qty="${p.id}" data-delta="1">+</button>
              </div>
            </div>
            <button class="remove-item" data-remove="${p.id}">REMOVER</button>
          </div>
        `;
      }).join('') : '<div class="cart-empty">SEU CARRINHO ESTÁ EM SILÊNCIO.</div>';
    }

    persist();
  }

  function addToCart(id, qty=1) {
    if (!products.some(p => p.id === id)) return;
    const item = cart.find(i => i.id === id);
    if (item) item.qty += qty;
    else cart.push({id,qty});
    updateCart();
    toast('PRODUTO ADICIONADO AO CARRINHO.');
  }

  function openCart() {
    $('#cart-drawer')?.classList.add('open');
    $('#drawer-backdrop')?.classList.add('open');
    $('#cart-drawer')?.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    $('#cart-drawer')?.classList.remove('open');
    $('#drawer-backdrop')?.classList.remove('open');
    $('#cart-drawer')?.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
  }

  function showProduct(id) {
    const p = products.find(x => x.id === id);
    const detail = $('#product-detail');
    const dialog = $('#product-dialog');
    if (!p || !detail || !dialog) return;

    detail.innerHTML = `
      <div class="dialog-product">
        <img src="assets/${p.image}" alt="${p.name}">
        <div>
          <span class="eyebrow">${p.category} / ${p.universe}</span>
          <h2>${p.name}</h2>
          <p>Uma pequena obsessão para levar seu universo favorito para fora da tela.</p>
          <div class="price">${money(p.price)}</div>
          <p class="stock">${p.stock}</p>
          <button class="button button-pink" data-add="${p.id}">
            ADICIONAR AO CARRINHO →
          </button>
        </div>
      </div>
    `;
    dialog.showModal();
  }

  // Rotas da homepage: o catálogo continua visível.
  const homeHashes = new Set([
    '', 'inicio', 'catalogo', 'novidades', 'new',
    'manifesto', 'about', 'newsletter', 'social', 'community'
  ]);

  function renderRoute() {
    const raw = decodeURIComponent(location.hash.replace(/^#/,''));
    const route = raw.split('/')[0];
    const main = $('main');
    if (!main) return;

    let pageView = $('#page-view');

    if (!pageView) {
      pageView = document.createElement('div');
      pageView.id = 'page-view';
      pageView.className = 'page-view';
      main.appendChild(pageView);
    }

    const homeContent = [...main.children].filter(el => el !== pageView);

    if (homeHashes.has(route)) {
      homeContent.forEach(el => el.hidden = false);
      pageView.hidden = true;

      if (route === 'new') $('#novidades')?.scrollIntoView();
      else if (route === 'about' || route === 'manifesto') $('#manifesto')?.scrollIntoView();
      else if (route === 'catalogo') $('#catalogo')?.scrollIntoView();

      renderFeatured();
      renderCatalog();
      updateCart();
      return;
    }

    closeCart();
    homeContent.forEach(el => el.hidden = true);
    pageView.hidden = false;

    if (typeof window.renderSDPage === 'function') {
      pageView.innerHTML = window.renderSDPage(raw,{products,cart,favorites,toast}) ||
        '<div class="page-wrap"><h1>Página não encontrada</h1><a href="#catalogo">Voltar ao catálogo</a></div>';
    }
  }

  document.addEventListener('click', e => {
    const add = e.target.closest('[data-add]');
    if (add) {
      addToCart(add.dataset.add);
      if ($('#product-dialog')?.open) $('#product-dialog').close();
    }

    const fav = e.target.closest('[data-fav]');
    if (fav) {
      const id = fav.dataset.fav;
      favorites = favorites.includes(id)
        ? favorites.filter(x => x !== id)
        : [...favorites,id];

      persist();
      updateFavoriteCount();
      renderFeatured();
      renderCatalog();
      toast(favorites.includes(id) ? 'SALVO NOS FAVORITOS.' : 'REMOVIDO DOS FAVORITOS.');
    }

    const view = e.target.closest('[data-view]');
    if (view) showProduct(view.dataset.view);

    const qty = e.target.closest('[data-qty]');
    if (qty) {
      const item = cart.find(i => i.id === qty.dataset.qty);
      if (item) {
        item.qty += Number(qty.dataset.delta);
        if (item.qty < 1) cart = cart.filter(i => i !== item);
        updateCart();
      }
    }

    const remove = e.target.closest('[data-remove]');
    if (remove) {
      cart = cart.filter(i => i.id !== remove.dataset.remove);
      updateCart();
    }

    const pageAdd = e.target.closest('[data-page-add]');
    if (pageAdd) addToCart(pageAdd.dataset.pageAdd, Math.max(1,Number($('#page-qty')?.value || 1)));

    const pageQty = e.target.closest('[data-page-qty]');
    if (pageQty) {
      const item = cart.find(i => i.id === pageQty.dataset.pageQty);
      if (item) {
        item.qty += Number(pageQty.dataset.delta);
        if (item.qty < 1) cart = cart.filter(i => i !== item);
        updateCart();
        renderRoute();
      }
    }

    const pageRemove = e.target.closest('[data-page-remove]');
    if (pageRemove) {
      cart = cart.filter(i => i.id !== pageRemove.dataset.pageRemove);
      updateCart();
      renderRoute();
    }

    const themeChoice = e.target.closest('[data-theme-choice]');
    if (themeChoice) setTheme(themeChoice.dataset.themeChoice);
  });

  $('#open-cart')?.addEventListener('click',openCart);
  $('#close-cart')?.addEventListener('click',closeCart);
  $('#drawer-backdrop')?.addEventListener('click',closeCart);
  $('#close-product')?.addEventListener('click',() => $('#product-dialog')?.close());

  $('#checkout-button')?.addEventListener('click',() => {
    if (cart.length) {
      closeCart();
      location.hash = '#delivery';
    } else toast('SEU CARRINHO ESTÁ VAZIO.');
  });

  $('#catalog-search')?.addEventListener('input',() => {
    favoritesOnly = false;
    renderCatalog();
  });

  $('#sort-products')?.addEventListener('change',renderCatalog);

  $('#price-filter')?.addEventListener('input',e => {
    maxPrice = Number(e.target.value);
    if ($('#price-output')) $('#price-output').textContent = money(maxPrice);
    renderCatalog();
  });

  $('#apply-filters')?.addEventListener('click',() => {
    categoryFilters = $$('.category-filter:checked').map(x => x.value);
    universeFilters = $$('.universe-filter:checked').map(x => x.value);
    stockOnly = !!$('#stock-filter')?.checked;
    favoritesOnly = false;
    renderCatalog();
  });

  $('#clear-filters')?.addEventListener('click',() => {
    $$('.category-filter,.universe-filter').forEach(x => x.checked = false);
    if ($('#stock-filter')) $('#stock-filter').checked = false;
    if ($('#price-filter')) $('#price-filter').value = 500;
    if ($('#catalog-search')) $('#catalog-search').value = '';

    maxPrice = 500;
    categoryFilters = [];
    universeFilters = [];
    stockOnly = false;
    favoritesOnly = false;

    if ($('#price-output')) $('#price-output').textContent = money(500);
    renderCatalog();
  });

  $('#global-search')?.addEventListener('keydown',e => {
    if (e.key === 'Enter') {
      const q = e.currentTarget.value;
      location.hash = '#catalogo';
      setTimeout(() => {
        if ($('#catalog-search')) $('#catalog-search').value = q;
        renderCatalog();
      },50);
    }
  });

  $('#favorites-shortcut')?.addEventListener('click',() => {
    favoritesOnly = true;
    categoryFilters = [];
    universeFilters = [];
    stockOnly = false;
    location.hash = '#catalogo';
    renderCatalog();
  });

  $('#newsletter-form')?.addEventListener('submit',e => {
    e.preventDefault();
    toast('INSCRIÇÃO REGISTRADA NESTA DEMONSTRAÇÃO.');
    e.currentTarget.reset();
  });

  $('.menu-toggle')?.addEventListener('click',() => {
    const nav = $('.main-nav');
    if (!nav) return;
    const open = nav.classList.toggle('open');
    $('.menu-toggle')?.setAttribute('aria-expanded',String(open));
  });

  $$('.main-nav a').forEach(a => a.addEventListener('click',() => {
    $('.main-nav')?.classList.remove('open');
    $('.menu-toggle')?.setAttribute('aria-expanded','false');
  }));

  function setTheme(theme) {
    const dark = theme === 'dark';
    document.body.classList.toggle('dark',dark);
    localStorage.setItem('sd-theme',dark ? 'dark' : 'light');
    if ($('#theme-toggle')) $('#theme-toggle').textContent = dark ? '☀' : '☾';
  }

  $('#theme-toggle')?.addEventListener('click',() => {
    setTheme(document.body.classList.contains('dark') ? 'light' : 'dark');
  });

  document.addEventListener('submit',e => {
    const form = e.target;

    if (form.matches('[data-demo-form]')) {
      e.preventDefault();
      const kind = form.dataset.demoForm;
      const next = {
        delivery:'payment',
        register:'verify',
        recover:'verify',
        reset:'login'
      };

      if (kind === 'payment') {
        const v = form.querySelector('[name="payment"]:checked')?.value || 'pix';
        location.hash = v === 'pix' ? '#pix' : v === 'card' ? '#card-payment' : '#boleto';
      } else if (next[kind]) {
        location.hash = '#' + next[kind];
      } else {
        toast('Solicitação registrada nesta demonstração. Nenhum dado foi enviado.');
      }
    }

    if (form.matches('[data-search-form]')) {
      e.preventDefault();
      const q = new FormData(form).get('q') || '';
      location.hash = '#catalogo';
      setTimeout(() => {
        if ($('#catalog-search')) $('#catalog-search').value = q;
        renderCatalog();
      },50);
    }
  });

  function init() {
    updateFavoriteCount();
    renderFeatured();
    renderCatalog();
    updateCart();

    if (localStorage.getItem('sd-theme') === 'dark') setTheme('dark');

    renderRoute();
  }

  window.addEventListener('hashchange',renderRoute);

  window.StrangeDream = {
    products,
    renderCatalog,
    renderFeatured,
    addToCart,
    cart:() => cart,
    favorites:() => favorites
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded',init,{once:true});
  } else {
    init();
  }
})();
