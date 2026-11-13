(() => {
  'use strict';

  const money = n => Number(n).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });

  const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, char => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[char]);

  const shell = (title, subtitle, content) => `
    <div class="page-wrap">
      <header class="page-heading">
        <p class="eyebrow">STRANGEDREAM / STORE</p>
        <h1>${title}</h1>
        <p>${subtitle}</p>
      </header>
      ${content}
    </div>
  `;

  const button = (text, href, extra = '') => `
    <a class="button button-pink" href="${href}" ${extra}>${text}</a>
  `;

  function productList(products, ids = null) {
    const list = ids
      ? products.filter(p => ids.includes(p.id))
      : products;

    if (!list.length) {
      return `
        <div class="success-panel">
          <h3>NENHUM PRODUTO POR AQUI.</h3>
          <p>Seu próximo achado estranho pode estar no catálogo.</p>
          ${button('EXPLORAR CATÁLOGO', '#catalogo')}
        </div>
      `;
    }

    return `
      <div class="product-grid">
        ${list.map(p => `
          <article class="product-card">
            <div class="product-image">
              <img src="assets/${escapeHTML(p.image)}"
                alt="${escapeHTML(p.name)}"
                loading="lazy">
            </div>
            <div class="product-info">
              <span class="product-category">${escapeHTML(p.category)}</span>
              <h3>${escapeHTML(p.name)}</h3>
              <span class="product-universe">${escapeHTML(p.universe)}</span>
              <strong class="product-price">${money(p.price)}</strong>
              <button class="product-open" data-page-add="${escapeHTML(p.id)}">
                ADICIONAR AO CARRINHO
              </button>
              <a href="#produto-${escapeHTML(p.id)}">VER DETALHES →</a>
            </div>
          </article>
        `).join('')}
      </div>
    `;
  }

  function cartContent(cart, products) {
    const lines = cart.map(item => {
      const p = products.find(product => product.id === item.id);
      if (!p) return '';

      return `
        <div class="cart-line">
          <img src="assets/${escapeHTML(p.image)}" alt="${escapeHTML(p.name)}">
          <div>
            <h3>${escapeHTML(p.name)}</h3>
            <p>${money(p.price)}</p>
            <div class="qty-controls">
              <button data-page-qty="${p.id}" data-delta="-1">−</button>
              <span>${item.qty}</span>
              <button data-page-qty="${p.id}" data-delta="1">+</button>
            </div>
          </div>
          <button class="remove-item" data-page-remove="${p.id}">
            REMOVER
          </button>
        </div>
      `;
    }).join('');

    const subtotal = cart.reduce((sum, item) => {
      const p = products.find(product => product.id === item.id);
      return sum + (p ? p.price * item.qty : 0);
    }, 0);

    const shipping = cart.length ? 12 : 0;

    return `
      <section class="page-panel">
        ${lines || '<p>Seu carrinho está vazio.</p>'}
        <hr>
        <p>Subtotal: <strong>${money(subtotal)}</strong></p>
        <p>Frete demonstrativo: <strong>${money(shipping)}</strong></p>
        <h2>Total: ${money(subtotal + shipping)}</h2>
        ${cart.length ? button('CONTINUAR COMPRA →', '#delivery') : button('VER CATÁLOGO', '#catalogo')}
      </section>
    `;
  }

  const pages = {
    conta: (ctx) => shell('SUA CONTA', 'Entre no seu pequeno universo.', `
      <div class="page-panel">
        <form data-demo-form="login">
          <label class="form-field">
            E-mail
            <input type="email" required placeholder="seu@email.com">
          </label>
          <label class="form-field">
            Senha
            <input type="password" required placeholder="Sua senha">
          </label>
          <button class="button button-pink" type="submit">ENTRAR</button>
        </form>
        <p><a href="#recuperar-senha">Esqueci minha senha</a></p>
        <p>Não tem conta? <a href="#cadastro">Criar cadastro</a></p>
      </div>
    `),

    cadastro: () => shell('CRIAR CONTA', 'Faça parte da STRANGEDREAM.', `
      <div class="page-panel">
        <form data-demo-form="register">
          <label class="form-field">Nome completo
            <input required autocomplete="name">
          </label>
          <label class="form-field">E-mail
            <input type="email" required autocomplete="email">
          </label>
          <label class="form-field">Senha
            <input type="password" minlength="8" required>
          </label>
          <button class="button button-pink">CRIAR CONTA</button>
        </form>
      </div>
    `),

    'recuperar-senha': () => shell('RECUPERAR SENHA', 'Vamos tentar encontrar sua conta.', `
      <div class="page-panel">
        <form data-demo-form="recover">
          <label class="form-field">E-mail cadastrado
            <input type="email" required>
          </label>
          <button class="button button-pink">CONTINUAR</button>
        </form>
      </div>
    `),

    favoritos: ctx => shell('SEUS FAVORITOS', 'As coisas estranhas que você guardou.', `
      ${productList(ctx.products, ctx.favorites)}
    `),

    favorites: ctx => shell('SEUS FAVORITOS', 'As coisas estranhas que você guardou.', `
      ${productList(ctx.products, ctx.favorites)}
    `),

    carrinho: ctx => shell('SEU CARRINHO', 'Confira seus achados.', `
      ${cartContent(ctx.cart, ctx.products)}
    `),

    cart: ctx => shell('SEU CARRINHO', 'Confira seus achados.', `
      ${cartContent(ctx.cart, ctx.products)}
    `),

    delivery: ctx => shell('ENTREGA', 'Onde devemos enviar seu pedido?', `
      <div class="checkout-layout">
        <form class="page-panel" data-demo-form="delivery">
          <label class="form-field">Nome completo
            <input required autocomplete="name">
          </label>
          <label class="form-field">CEP
            <input required inputmode="numeric" placeholder="00000-000">
          </label>
          <label class="form-field">Endereço
            <input required autocomplete="street-address">
          </label>
          <label class="form-field">Número
            <input required>
          </label>
          <label class="form-field">Complemento
            <input>
          </label>
          <label class="form-field">Cidade
            <input required>
          </label>
          <label class="form-field">Estado
            <input required maxlength="2">
          </label>
          <button class="button button-pink">CONTINUAR PARA PAGAMENTO →</button>
        </form>
        <aside class="page-panel">
          <h2>SEU PEDIDO</h2>
          <p>${ctx.cart.length} item(ns) no carrinho</p>
          <p>Os valores de frete são demonstrativos.</p>
        </aside>
      </div>
    `),

    payment: () => shell('PAGAMENTO', 'Escolha uma forma de pagamento.', `
      <div class="page-panel">
        <form data-demo-form="payment">
          <label><input type="radio" name="payment" value="pix" checked> PIX</label>
          <label><input type="radio" name="payment" value="card"> Cartão</label>
          <label><input type="radio" name="payment" value="boleto"> Boleto</label>
          <button class="button button-pink">CONTINUAR →</button>
        </form>
        <p>Esta é uma demonstração. Nenhum pagamento será realizado.</p>
      </div>
    `),

    pix: () => shell('PAGAMENTO PIX', 'Demonstração de pagamento.', `
      <div class="page-panel">
        <p>O pagamento PIX ainda não está conectado a um serviço financeiro.</p>
        ${button('VOLTAR AO PAGAMENTO', '#payment')}
      </div>
    `),

    'card-payment': () => shell('PAGAMENTO COM CARTÃO', 'Demonstração de pagamento.', `
      <div class="page-panel">
        <p>Não insira dados reais de cartão. O pagamento ainda não está integrado.</p>
        ${button('VOLTAR AO PAGAMENTO', '#payment')}
      </div>
    `),

    boleto: () => shell('BOLETO', 'Demonstração de pagamento.', `
      <div class="page-panel">
        <p>A emissão de boletos ainda não está integrada.</p>
        ${button('VOLTAR AO PAGAMENTO', '#payment')}
      </div>
    `),

    review: ctx => shell('REVISAR PEDIDO', 'Confira antes de continuar.', `
      <div class="page-panel">
        <p>Itens: ${ctx.cart.length}</p>
        <p>Esta etapa é apenas demonstrativa.</p>
        <label><input type="checkbox" id="accept-order-terms"> Li os termos demonstrativos.</label>
        <button class="button button-pink" data-toast="Pedido de demonstração revisado.">
          CONFIRMAR REVISÃO
        </button>
      </div>
    `),

    'pedido-confirmado': () => shell('OBRIGADO!', 'Esta é uma confirmação demonstrativa.', `
      <div class="success-panel">
        <h2>SEU PEDIDO DE TESTE FOI REGISTRADO.</h2>
        <p>Nenhuma compra ou cobrança real aconteceu.</p>
        ${button('VOLTAR À LOJA', '#inicio')}
      </div>
    `),

    sobre: () => shell('SOBRE A STRANGEDREAM', 'Coisas estranhas para pessoas estranhas.', `
      <section class="page-panel">
        <h2>UM UNIVERSO FORA DO COMUM.</h2>
        <p>A STRANGEDREAM é uma loja-conceito dedicada a produtos de universos, personagens e histórias que deixam marcas.</p>
        <p>Entre, explore e encontre algo que combine com seu lado estranho.</p>
      </section>
    `),

    faq: () => shell('PERGUNTAS FREQUENTES', 'Algumas respostas para suas dúvidas.', `
      <div class="faq-list">
        <details><summary>Como faço um pedido?</summary><p>Escolha um produto, adicione ao carrinho e siga as etapas demonstrativas.</p></details>
        <details><summary>Quais são as formas de pagamento?</summary><p>As opções exibidas são apenas demonstrativas nesta versão.</p></details>
        <details><summary>Como acompanho meu pedido?</summary><p>O rastreamento ainda não está conectado a transportadoras.</p></details>
        <details><summary>Posso cancelar uma compra?</summary><p>Não há compras reais sendo processadas nesta demonstração.</p></details>
      </div>
    `),

    contato: () => shell('CONTATO', 'Fale com a STRANGEDREAM.', `
      <div class="page-panel">
        <form data-demo-form="contact">
          <label class="form-field">Seu nome
            <input required>
          </label>
          <label class="form-field">Seu e-mail
            <input type="email" required>
          </label>
          <label class="form-field">Assunto
            <input required>
          </label>
          <label class="form-field">Mensagem
            <textarea required rows="5"></textarea>
          </label>
          <button class="button button-pink">ENVIAR MENSAGEM</button>
        </form>
        <p>O formulário ainda não envia mensagens para um servidor.</p>
      </div>
    `),

    envio: () => shell('ENVIO', 'Informações sobre entregas.', `
      <div class="page-panel">
        <h2>PRAZOS E FRETES</h2>
        <p>Os valores e prazos exibidos nesta versão são ilustrativos.</p>
        <p>O cálculo real depende de uma integração com serviço de frete.</p>
      </div>
    `),

    trocas: () => shell('TROCAS E DEVOLUÇÕES', 'Informações da loja.', `
      <div class="page-panel">
        <p>Esta página é um modelo demonstrativo. A política comercial definitiva deve ser preenchida antes de publicar a loja.</p>
      </div>
    `),

    privacidade: () => shell('PRIVACIDADE', 'Como os dados são tratados.', `
      <div class="page-panel">
        <p>Esta versão não possui sistema de contas ou processamento de pedidos no servidor.</p>
        <p>Não publique uma política definitiva sem revisar os serviços e dados que serão realmente utilizados.</p>
      </div>
    `),

    termos: () => shell('TERMOS DE USO', 'Condições de utilização.', `
      <div class="page-panel">
        <p>Conteúdo demonstrativo. Os termos definitivos devem ser revisados antes do lançamento da loja.</p>
      </div>
    `),

    cookies: () => shell('PREFERÊNCIAS DE COOKIES', 'Configurações demonstrativas.', `
      <div class="page-panel">
        <p>Esta demonstração usa armazenamento local do navegador para manter carrinho, favoritos e tema.</p>
        <button class="button button-pink" data-toast="Preferências demonstrativas mantidas.">SALVAR PREFERÊNCIAS</button>
      </div>
    `),

    rastreamento: () => shell('RASTREAMENTO', 'Consulte seu pedido.', `
      <div class="page-panel">
        <form data-demo-form="tracking">
          <label class="form-field">Código do pedido
            <input required placeholder="Ex.: SD-00001">
          </label>
          <button class="button button-pink">CONSULTAR</button>
        </form>
        <p>O rastreamento real ainda não está integrado.</p>
      </div>
    `),

    universos: () => shell('NOSSOS UNIVERSOS', 'Histórias e personagens que amamos.', `
      <div class="account-grid">
        <a class="page-panel" href="#omori"><h2>OMORI</h2><p>Explorar produtos →</p></a>
        <a class="page-panel" href="#dead-plate"><h2>DEAD PLATE</h2><p>Explorar produtos →</p></a>
        <a class="page-panel" href="#zeno-remake"><h2>ZENO REMAKE</h2><p>Explorar produtos →</p></a>
      </div>
    `),

    omori: ctx => shell('OMORI', 'Produtos deste universo.', productList(ctx.products.filter(p => p.universe === 'OMORI'))),

    'dead-plate': ctx => shell('DEAD PLATE', 'Produtos deste universo.', productList(ctx.products.filter(p => p.universe === 'Dead Plate'))),

    'zeno-remake': ctx => shell('ZENO REMAKE', 'Produtos deste universo.', productList(ctx.products.filter(p => p.universe === 'Zeno REMAKE'))),

    busca: ctx => shell('BUSCA', 'Explore os produtos disponíveis.', `
      <form data-search-form class="page-panel">
        <label class="form-field">O que você procura?
          <input name="q" type="search" placeholder="Nome, categoria ou universo">
        </label>
        <button class="button button-pink">BUSCAR</button>
      </form>
      ${productList(ctx.products)}
    `)
  };

  window.renderSDPage = function(route, context) {
    const ctx = context || {products:[],cart:[],favorites:[]};

    if (route.startsWith('produto-')) {
      const id = route.slice('produto-'.length);
      const p = ctx.products.find(item => item.id === id);

      if (!p) {
        return shell('PRODUTO NÃO ENCONTRADO', 'Este produto não está disponível.', button('VOLTAR AO CATÁLOGO','#catalogo'));
      }

      return shell(p.name, `${p.category} / ${p.universe}`, `
        <div class="product-page">
          <img src="assets/${escapeHTML(p.image)}" alt="${escapeHTML(p.name)}">
          <div class="page-panel">
            <h2>${escapeHTML(p.name)}</h2>
            <p>${escapeHTML(p.universe)}</p>
            <h2>${money(p.price)}</h2>
            <p>${escapeHTML(p.stock)}</p>
            <label class="form-field">Quantidade
              <input id="page-qty" type="number" min="1" value="1">
            </label>
            <button class="button button-pink" data-page-add="${p.id}">ADICIONAR AO CARRINHO</button>
            <p><a href="#catalogo">Voltar ao catálogo</a></p>
          </div>
        </div>
      `);
    }

    const render = pages[route];

    if (render) return render(ctx);

    return shell('PÁGINA NÃO ENCONTRADA', 'Parece que este caminho não existe.', `
      <p>Volte para a loja e continue explorando.</p>
      ${button('VOLTAR AO INÍCIO','#inicio')}
    `);
  };

  window.StorePages = {pages};
})();
