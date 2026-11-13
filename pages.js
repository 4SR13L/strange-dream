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

   
delivery: ctx => shell('FINALIZAR COMPRA', 'Precisamos de um endereço para enviar seus achados.', `
  <div class="checkout-progress">
    <div class="checkout-step done"><span>01</span><small>CARRINHO</small></div>
    <div class="checkout-step active"><span>02</span><small>ENTREGA</small></div>
    <div class="checkout-step"><span>03</span><small>PAGAMENTO</small></div>
    <div class="checkout-step"><span>04</span><small>CONFIRMAÇÃO</small></div>
  </div>

  <div class="checkout-layout">
    <form class="page-panel checkout-form" data-demo-form="delivery">
      <h2>ENDEREÇO DE ENTREGA</h2>

      <label class="form-field">Nome completo
        <input name="name" required autocomplete="name"
          value="${escapeHTML(ctx.checkout?.name || '')}">
      </label>

      <div class="form-row">
        <label class="form-field">CEP
          <input name="cep" required placeholder="00000-000"
            autocomplete="postal-code" maxlength="9"
            value="${escapeHTML(ctx.checkout?.cep || '')}">
        </label>
        <label class="form-field">Estado
          <input name="state" required maxlength="2" placeholder="RS"
            value="${escapeHTML(ctx.checkout?.state || '')}">
        </label>
      </div>

      <label class="form-field">Endereço
        <input name="address" required autocomplete="street-address"
          placeholder="Rua, avenida... "
          value="${escapeHTML(ctx.checkout?.address || '')}">
      </label>

      <div class="form-row">
        <label class="form-field">Número
          <input name="number" required
            value="${escapeHTML(ctx.checkout?.number || '')}">
        </label>
        <label class="form-field">Complemento
          <input name="complement"
            value="${escapeHTML(ctx.checkout?.complement || '')}">
        </label>
      </div>

      <label class="form-field">Bairro
        <input name="neighborhood" required
          value="${escapeHTML(ctx.checkout?.neighborhood || '')}">
      </label>

      <label class="form-field">Cidade
        <input name="city" required
          value="${escapeHTML(ctx.checkout?.city || '')}">
      </label>

      <h2 class="checkout-subheading">OPÇÃO DE ENTREGA</h2>

      <label class="shipping-option">
        <input type="radio" name="shipping" value="12" checked>
        <span><strong>Entrega padrão</strong><small>Prazo estimado de 5 a 10 dias úteis</small></span>
        <strong>R$ 12,00</strong>
      </label>

      <label class="shipping-option">
        <input type="radio" name="shipping" value="22">
        <span><strong>Entrega expressa</strong><small>Prazo estimado de 2 a 5 dias úteis</small></span>
        <strong>R$ 22,00</strong>
      </label>

      <button class="button button-pink checkout-submit">
        CONTINUAR PARA PAGAMENTO →
      </button>
    </form>

    <aside class="page-panel checkout-summary">
      <h2>RESUMO DO PEDIDO</h2>
      ${ctx.cart.map(item => {
        const p = ctx.products.find(x => x.id === item.id);
        return p ? `<div class="checkout-product">
          <img src="assets/${escapeHTML(p.image)}" alt="${escapeHTML(p.name)}">
          <div><strong>${escapeHTML(p.name)}</strong>
          <small>Quantidade: ${item.qty}</small></div>
          <strong>${money(p.price * item.qty)}</strong>
        </div>` : '';
      }).join('')}
      <hr>
      <p>Subtotal <strong>${money(ctx.cart.reduce((s,i) => s + (ctx.products.find(p => p.id === i.id)?.price || 0) * i.qty, 0))}</strong></p>
      <p>Frete <strong>A partir de R$ 12,00</strong></p>
      <p class="checkout-total">Total calculado na próxima etapa</p>
      <a href="#carrinho" class="text-link">← VOLTAR AO CARRINHO</a>
    </aside>
  </div>
`),

payment: ctx => {
  const subtotal = ctx.cart.reduce((s,i) => s + (ctx.products.find(p => p.id === i.id)?.price || 0) * i.qty, 0);
  const shipping = Number(ctx.checkout?.shipping || 12);

  return shell('FORMA DE PAGAMENTO', 'Escolha como deseja concluir seu pedido.', `
    <div class="checkout-progress">
      <div class="checkout-step done"><span>01</span><small>CARRINHO</small></div>
      <div class="checkout-step done"><span>02</span><small>ENTREGA</small></div>
      <div class="checkout-step active"><span>03</span><small>PAGAMENTO</small></div>
      <div class="checkout-step"><span>04</span><small>CONFIRMAÇÃO</small></div>
    </div>

    <div class="checkout-layout">
      <div class="page-panel">
        <h2>SELECIONE UMA OPÇÃO</h2>

        <form data-demo-form="payment" class="payment-options">
          <label class="payment-option">
            <input type="radio" name="payment" value="pix" checked>
            <span class="payment-icon">✳</span>
            <span><strong>PIX</strong><small>Pagamento instantâneo</small></span>
            <span class="payment-check">✓</span>
          </label>

          <label class="payment-option">
            <input type="radio" name="payment" value="card">
            <span class="payment-icon">▤</span>
            <span><strong>Cartão de crédito</strong><small>Consulte as opções disponíveis</small></span>
            <span class="payment-check">✓</span>
          </label>

          <label class="payment-option">
            <input type="radio" name="payment" value="boleto">
            <span class="payment-icon">▧</span>
            <span><strong>Boleto bancário</strong><small>Pagamento por código de barras</small></span>
            <span class="payment-check">✓</span>
          </label>

          <button class="button button-pink checkout-submit">
            CONTINUAR →
          </button>
        </form>
      </div>

      <aside class="page-panel checkout-summary">
        <h2>SEU PEDIDO</h2>
        <p>Subtotal <strong>${money(subtotal)}</strong></p>
        <p>Frete <strong>${money(shipping)}</strong></p>
        <hr>
        <p class="checkout-total">TOTAL <strong>${money(subtotal + shipping)}</strong></p>
        <h3>ENDEREÇO DE ENTREGA</h3>
        <p>${escapeHTML(ctx.checkout?.name || '')}</p>
        <p>${escapeHTML(ctx.checkout?.address || '')}, ${escapeHTML(ctx.checkout?.number || '')}</p>
        <p>${escapeHTML(ctx.checkout?.city || '')} - ${escapeHTML(ctx.checkout?.state || '')}</p>
        <a href="#delivery" class="text-link">ALTERAR ENDEREÇO</a>
      </aside>
    </div>
  `);
},

pix: ctx => shell('PAGAMENTO VIA PIX', 'Finalize seu pedido utilizando PIX.', `
  <div class="page-panel payment-detail">
    <div class="payment-big-icon">✳</div>
    <h2>PIX SELECIONADO</h2>
    <p>Você escolheu PIX como forma de pagamento.</p>
    <div class="payment-notice">
      <strong>Pagamento aguardando configuração</strong>
      <p>O código PIX será disponibilizado quando a loja estiver conectada ao serviço de pagamentos.</p>
    </div>
    <a href="#review" class="button button-pink">REVISAR MEU PEDIDO →</a>
    <p><a href="#payment">Alterar forma de pagamento</a></p>
  </div>
`),

'card-payment': ctx => shell('CARTÃO DE CRÉDITO', 'Confira a opção escolhida para seu pedido.', `
  <div class="page-panel payment-detail">
    <div class="payment-big-icon">▤</div>
    <h2>PAGAMENTO COM CARTÃO</h2>
    <p>O pagamento por cartão estará disponível após a integração com o processador de pagamentos.</p>
    <div class="payment-notice">
      <strong>Área de pagamento</strong>
      <p>Os campos de cartão serão disponibilizados pelo provedor seguro de pagamento. Não informe dados reais nesta versão.</p>
    </div>
    <a href="#review" class="button button-pink">REVISAR MEU PEDIDO →</a>
    <p><a href="#payment">Alterar forma de pagamento</a></p>
  </div>
`),

boleto: ctx => shell('BOLETO BANCÁRIO', 'Confira a opção escolhida para seu pedido.', `
  <div class="page-panel payment-detail">
    <div class="payment-big-icon">▧</div>
    <h2>BOLETO SELECIONADO</h2>
    <p>Você escolheu boleto bancário.</p>
    <div class="payment-notice">
      <strong>Emissão de boleto</strong>
      <p>O documento e o código de barras serão gerados após a integração com o serviço financeiro.</p>
    </div>
    <a href="#review" class="button button-pink">REVISAR MEU PEDIDO →</a>
    <p><a href="#payment">Alterar forma de pagamento</a></p>
  </div>
`),

review: ctx => {
  const subtotal = ctx.cart.reduce((s,i) => s + (ctx.products.find(p => p.id === i.id)?.price || 0) * i.qty, 0);
  const shipping = Number(ctx.checkout?.shipping || 12);
  const methods = {pix:'PIX',card:'Cartão de crédito',boleto:'Boleto bancário'};

  return shell('REVISÃO DO PEDIDO', 'Confira todos os detalhes antes de concluir.', `
    <div class="checkout-progress">
      <div class="checkout-step done"><span>01</span><small>CARRINHO</small></div>
      <div class="checkout-step done"><span>02</span><small>ENTREGA</small></div>
      <div class="checkout-step done"><span>03</span><small>PAGAMENTO</small></div>
      <div class="checkout-step active"><span>04</span><small>REVISÃO</small></div>
    </div>

    <div class="checkout-layout">
      <div class="page-panel">
        <h2>ITENS DO PEDIDO</h2>
        ${ctx.cart.map(item => {
          const p = ctx.products.find(x => x.id === item.id);
          return p ? `<div class="checkout-product">
            <img src="assets/${escapeHTML(p.image)}" alt="${escapeHTML(p.name)}">
            <div><strong>${escapeHTML(p.name)}</strong><small>Quantidade: ${item.qty}</small></div>
            <strong>${money(p.price * item.qty)}</strong>
          </div>` : '';
        }).join('')}

        <hr>
        <h2>ENTREGA</h2>
        <p><strong>${escapeHTML(ctx.checkout?.name || '')}</strong></p>
        <p>${escapeHTML(ctx.checkout?.address || '')}, ${escapeHTML(ctx.checkout?.number || '')}</p>
        <p>${escapeHTML(ctx.checkout?.neighborhood || '')} — ${escapeHTML(ctx.checkout?.city || '')}/${escapeHTML(ctx.checkout?.state || '')}</p>
        <p>CEP: ${escapeHTML(ctx.checkout?.cep || '')}</p>

        <hr>
        <h2>PAGAMENTO</h2>
        <p>${methods[ctx.checkout?.payment] || 'Não selecionado'}</p>
        <a href="#payment" class="text-link">ALTERAR PAGAMENTO</a>

        <form data-demo-form="review">
          <button class="button button-pink checkout-submit" ${ctx.cart.length ? '' : 'disabled'}>
            CONFIRMAR PEDIDO →
          </button>
        </form>
      </div>

      <aside class="page-panel checkout-summary">
        <h2>RESUMO FINANCEIRO</h2>
        <p>Subtotal <strong>${money(subtotal)}</strong></p>
        <p>Frete <strong>${money(shipping)}</strong></p>
        <hr>
        <p class="checkout-total">TOTAL <strong>${money(subtotal + shipping)}</strong></p>
        <div class="payment-notice">
          <strong>Antes de continuar</strong>
          <p>A confirmação registra o pedido e suas informações. A cobrança depende da integração com o provedor de pagamento.</p>
        </div>
      </aside>
    </div>
  `);
},

'pedido-confirmado': ctx => shell('PEDIDO RECEBIDO!', 'Seu pedido foi registrado.', `
  <div class="success-panel order-success">
    <div class="order-success-icon">✓</div>
    <h2>OBRIGADO POR ESCOLHER A STRANGEDREAM.</h2>
    <p>Seu pedido foi registrado com sucesso.</p>
    <div class="order-number">
      <small>NÚMERO DO PEDIDO</small>
      <strong>${escapeHTML(ctx.order?.number || 'SD-PENDENTE')}</strong>
    </div>
    <div class="payment-notice">
      <strong>STATUS: ${escapeHTML(ctx.order?.status || 'AGUARDANDO PAGAMENTO')}</strong>
      <p>O registro do pedido não representa aprovação ou confirmação de pagamento.</p>
    </div>
    <a href="#catalogo" class="button button-pink">CONTINUAR EXPLORANDO →</a>
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
