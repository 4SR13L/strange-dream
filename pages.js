/* ==========================================
   STRANGEDREAM — PÁGINAS INTERNAS
   Arquivo: pages.js
========================================== */

(() => {
  "use strict";

  const pages = {

    /* INÍCIO DE SESSÃO */

    login: `
      <div class="page-wrap">
        <div class="breadcrumbs">INÍCIO / CONTA / LOGIN</div>

        <div class="page-columns">
          <section class="page-panel">
            <span class="eyebrow">ACESSO AO ARQUIVO</span>
            <h2>ENTRAR NA SUA CONTA</h2>

            <form data-demo-form="login">
              <label class="form-field">
                E-MAIL
                <input type="email" name="email" placeholder="voce@email.com" required>
              </label>

              <label class="form-field">
                SENHA
                <input type="password" name="password" placeholder="Sua senha" required>
              </label>

              <label class="check-field">
                <input type="checkbox">
                Manter conectado
              </label>

              <button class="button button-pink" type="submit">
                ENTRAR →
              </button>

              <p><a href="#recuperar-senha">Esqueceu sua senha?</a></p>
              <p>Não possui uma conta? <a href="#cadastro">Criar conta</a></p>
            </form>

            <span class="notice">
              Demonstração visual. O acesso real precisa de autenticação no servidor.
            </span>
          </section>

          <aside class="page-panel auth-aside">
            <span class="eyebrow">STRANGEDREAM / IDENTIDADE</span>
            <h2>ALGUMAS COISAS MERECEM SER LEMBRADAS.</h2>
            <p>
              Entre para acompanhar seus pedidos, salvar produtos
              e manter suas pequenas obsessões organizadas.
            </p>
          </aside>
        </div>
      </div>
    `,

    cadastro: `
      <div class="page-wrap">
        <div class="breadcrumbs">INÍCIO / CONTA / CADASTRO</div>

        <div class="page-columns">
          <section class="page-panel">
            <span class="eyebrow">NOVO REGISTRO</span>
            <h2>CRIAR UMA CONTA</h2>

            <form data-demo-form="cadastro">
              <label class="form-field">
                NOME COMPLETO
                <input name="name" placeholder="Seu nome" required>
              </label>

              <label class="form-field">
                E-MAIL
                <input type="email" name="email" placeholder="voce@email.com" required>
              </label>

              <label class="form-field">
                SENHA
                <input type="password" name="password" minlength="8" placeholder="Mínimo de 8 caracteres" required>
              </label>

              <label class="form-field">
                CONFIRMAR SENHA
                <input type="password" name="confirmPassword" minlength="8" required>
              </label>

              <label class="check-field">
                <input type="checkbox" required>
                Li e aceito os termos de uso e a política de privacidade.
              </label>

              <button class="button button-pink" type="submit">
                CRIAR MINHA CONTA →
              </button>
            </form>

            <p>Já possui cadastro? <a href="#login">Entrar</a></p>
          </section>

          <aside class="page-panel auth-aside">
            <span class="eyebrow">BOAS-VINDAS</span>
            <h2>VOCÊ ENCONTROU O OUTRO LADO.</h2>
            <p>
              Crie sua conta para acompanhar suas compras e guardar
              seus produtos favoritos.
            </p>
          </aside>
        </div>
      </div>
    `,

    "recuperar-senha": `
      <div class="page-wrap">
        <div class="breadcrumbs">INÍCIO / CONTA / RECUPERAÇÃO</div>

        <section class="page-panel" style="max-width:600px;margin:auto">
          <span class="eyebrow">RECUPERAÇÃO DE ACESSO</span>
          <h2>ESQUECEU SUA SENHA?</h2>

          <p>
            Informe seu endereço de e-mail para iniciar a recuperação
            de acesso à sua conta.
          </p>

          <form data-demo-form="recuperar-senha">
            <label class="form-field">
              E-MAIL CADASTRADO
              <input type="email" name="email" placeholder="voce@email.com" required>
            </label>

            <button class="button button-pink" type="submit">
              SOLICITAR RECUPERAÇÃO →
            </button>
          </form>

          <p><a href="#login">Voltar para o login</a></p>
        </section>
      </div>
    `,

    conta: `
      <div class="page-wrap">
        <div class="breadcrumbs">INÍCIO / MINHA CONTA</div>

        <div class="page-intro">
          <span class="eyebrow">ARQUIVO PESSOAL</span>
          <h1>MINHA CONTA</h1>
          <p>
            Acompanhe suas informações, pedidos e produtos salvos.
          </p>
        </div>

        <div class="account-grid">

          <a class="page-panel" href="#pedidos">
            <span class="eyebrow">01 / COMPRAS</span>
            <h2>MEUS PEDIDOS →</h2>
            <p>Consulte seu histórico de compras e acompanhe entregas.</p>
          </a>

          <a class="page-panel" href="#favoritos">
            <span class="eyebrow">02 / DESEJOS</span>
            <h2>FAVORITOS →</h2>
            <p>Veja os produtos que você decidiu guardar.</p>
          </a>

          <a class="page-panel" href="#dados">
            <span class="eyebrow">03 / IDENTIDADE</span>
            <h2>MEUS DADOS →</h2>
            <p>Gerencie seus dados pessoais e endereço.</p>
          </a>

          <a class="page-panel" href="#enderecos">
            <span class="eyebrow">04 / LOCALIZAÇÃO</span>
            <h2>ENDEREÇOS →</h2>
            <p>Consulte seus endereços de entrega.</p>
          </a>

        </div>
      </div>
    `,

    dados: `
      <div class="page-wrap">
        <div class="breadcrumbs">INÍCIO / CONTA / DADOS</div>

        <div class="page-intro">
          <span class="eyebrow">IDENTIDADE</span>
          <h1>MEUS DADOS</h1>
        </div>

        <section class="page-panel" style="max-width:750px">
          <form data-demo-form="dados">
            <label class="form-field">
              NOME COMPLETO
              <input name="name" placeholder="Seu nome">
            </label>

            <label class="form-field">
              E-MAIL
              <input type="email" name="email" placeholder="voce@email.com">
            </label>

            <label class="form-field">
              TELEFONE
              <input name="phone" placeholder="(00) 00000-0000">
            </label>

            <button class="button button-pink" type="submit">
              SALVAR ALTERAÇÕES →
            </button>
          </form>
        </section>
      </div>
    `,

    enderecos: `
      <div class="page-wrap">
        <div class="breadcrumbs">INÍCIO / CONTA / ENDEREÇOS</div>

        <div class="page-intro">
          <span class="eyebrow">LOCALIZAÇÃO</span>
          <h1>MEUS ENDEREÇOS</h1>
          <p>Gerencie os locais de entrega dos seus pedidos.</p>
        </div>

        <section class="page-panel" style="max-width:750px">
          <form data-demo-form="endereco">
            <label class="form-field">
              NOME DO DESTINATÁRIO
              <input name="recipient" required>
            </label>

            <div class="form-grid">
              <label class="form-field">
                CEP
                <input name="cep" placeholder="00000-000" required>
              </label>

              <label class="form-field">
                NÚMERO
                <input name="number" required>
              </label>
            </div>

            <label class="form-field">
              RUA
              <input name="street" required>
            </label>

            <label class="form-field">
              COMPLEMENTO
              <input name="complement">
            </label>

            <div class="form-grid">
              <label class="form-field">
                CIDADE
                <input name="city" required>
              </label>

              <label class="form-field">
                ESTADO
                <input name="state" required>
              </label>
            </div>

            <button class="button button-pink" type="submit">
              SALVAR ENDEREÇO →
            </button>
          </form>
        </section>
      </div>
    `,

    /* FAVORITOS */

    favoritos: `
      <div class="page-wrap">
        <div class="breadcrumbs">INÍCIO / LISTA DE DESEJOS</div>

        <div class="page-intro">
          <span class="eyebrow">ARQUIVO PESSOAL / 002</span>
          <h1>MEUS FAVORITOS</h1>
          <p>
            Produtos que você encontrou e decidiu não esquecer.
          </p>
        </div>

        <section class="page-panel">
          <div id="favorites-page-list"></div>
        </section>
      </div>
    `,

    /* PEDIDOS */

    pedidos: `
      <div class="page-wrap">
        <div class="breadcrumbs">INÍCIO / CONTA / PEDIDOS</div>

        <div class="page-intro">
          <span class="eyebrow">HISTÓRICO</span>
          <h1>MEUS PEDIDOS</h1>
          <p>Consulte o histórico e o andamento das suas compras.</p>
        </div>

        <section class="page-panel">
          <div id="orders-list">
            <h2>NENHUM PEDIDO REGISTRADO</h2>
            <p>
              Seus pedidos aparecerão aqui depois que uma compra
              for realizada.
            </p>
            <a class="button button-pink" href="#catalogo">
              EXPLORAR CATÁLOGO →
            </a>
          </div>
        </section>
      </div>
    `,

    /* CARRINHO */

    carrinho: `
      <div class="page-wrap">
        <div class="breadcrumbs">INÍCIO / CARRINHO</div>

        <div class="page-intro">
          <span class="eyebrow">ARQUIVO / COMPRAS</span>
          <h1>SEU CARRINHO</h1>
          <p>Revise seus produtos antes de continuar.</p>
        </div>

        <div class="checkout-layout">
          <section class="page-panel">
            <div id="full-cart-items"></div>
          </section>

          <aside class="page-panel order-summary">
            <h2>RESUMO DO PEDIDO</h2>
            <div class="summary-line">
              <span>Subtotal</span>
              <strong id="full-cart-subtotal">R$ 0,00</strong>
            </div>
            <div class="summary-line">
              <span>Frete estimado</span>
              <strong id="full-cart-shipping">R$ 0,00</strong>
            </div>
            <div class="summary-line total">
              <span>TOTAL</span>
              <strong id="full-cart-total">R$ 0,00</strong>
            </div>

            <a class="button button-pink" href="#entrega">
              CONTINUAR →
            </a>
          </aside>
        </div>
      </div>
    `,

    /* CHECKOUT — ENTREGA */

    entrega: `
      <div class="page-wrap">
        <div class="breadcrumbs">INÍCIO / CARRINHO / ENTREGA</div>

        <div class="page-intro">
          <span class="eyebrow">FINALIZAÇÃO / ETAPA 01</span>
          <h1>PARA ONDE VAMOS?</h1>
          <p>Informe o endereço para continuar com seu pedido.</p>
        </div>

        <div class="steps">
          <b>01 ENTREGA</b>
          <span>02 PAGAMENTO</span>
          <span>03 REVISÃO</span>
        </div>

        <div class="checkout-layout">
          <section class="page-panel">
            <h2>DADOS DE ENTREGA</h2>

            <form id="delivery-form">
              <label class="form-field">
                NOME COMPLETO
                <input name="name" required>
              </label>

              <label class="form-field">
                E-MAIL
                <input type="email" name="email" required>
              </label>

              <label class="form-field">
                CPF
                <input name="cpf" placeholder="000.000.000-00" required>
              </label>

              <div class="form-grid">
                <label class="form-field">
                  CEP
                  <input name="cep" placeholder="00000-000" required>
                </label>

                <label class="form-field">
                  NÚMERO
                  <input name="number" required>
                </label>
              </div>

              <label class="form-field">
                RUA
                <input name="street" required>
              </label>

              <label class="form-field">
                COMPLEMENTO
                <input name="complement">
              </label>

              <div class="form-grid">
                <label class="form-field">
                  CIDADE
                  <input name="city" required>
                </label>

                <label class="form-field">
                  ESTADO
                  <input name="state" required>
                </label>
              </div>

              <button class="button button-pink" type="submit">
                CONTINUAR PARA PAGAMENTO →
              </button>
            </form>
          </section>

          <aside class="page-panel order-summary">
            <h2>SEU PEDIDO</h2>
            <div id="delivery-summary"></div>
          </aside>
        </div>
      </div>
    `,

    /* PAGAMENTO */

    pagamento: `
      <div class="page-wrap">
        <div class="breadcrumbs">INÍCIO / CHECKOUT / PAGAMENTO</div>

        <div class="page-intro">
          <span class="eyebrow">FINALIZAÇÃO / ETAPA 02</span>
          <h1>ESCOLHA COMO PAGAR.</h1>
        </div>

        <div class="steps">
          <span>01 ENTREGA</span>
          <b>02 PAGAMENTO</b>
          <span>03 REVISÃO</span>
        </div>

        <div class="checkout-layout">
          <section class="page-panel">
            <h2>FORMA DE PAGAMENTO</h2>

            <form id="payment-form">

              <label class="choice-card">
                <input type="radio" name="payment" value="pix" checked>
                <strong>PIX</strong>
                <small>Pagamento instantâneo — demonstração.</small>
              </label>

              <label class="choice-card">
                <input type="radio" name="payment" value="card">
                <strong>CARTÃO DE CRÉDITO</strong>
                <small>Pagamento com cartão — demonstração.</small>
              </label>

              <label class="choice-card">
                <input type="radio" name="payment" value="boleto">
                <strong>BOLETO</strong>
                <small>Pagamento por boleto — demonstração.</small>
              </label>

              <div id="payment-extra"></div>

              <button class="button button-pink" type="submit">
                REVISAR PEDIDO →
              </button>
            </form>
          </section>

          <aside class="page-panel order-summary">
            <h2>RESUMO</h2>
            <div id="payment-summary"></div>
          </aside>
        </div>
      </div>
    `,

    /* REVISÃO */

    revisao: `
      <div class="page-wrap">
        <div class="breadcrumbs">INÍCIO / CHECKOUT / REVISÃO</div>

        <div class="page-intro">
          <span class="eyebrow">FINALIZAÇÃO / ETAPA 03</span>
          <h1>QUASE LÁ.</h1>
          <p>Confira os detalhes antes de concluir.</p>
        </div>

        <div class="steps">
          <span>01 ENTREGA</span>
          <span>02 PAGAMENTO</span>
          <b>03 REVISÃO</b>
        </div>

        <div class="checkout-layout">
          <section class="page-panel">
            <h2>PRODUTOS</h2>
            <div id="review-products"></div>

            <h2>ENTREGA</h2>
            <div id="review-address"></div>

            <h2>PAGAMENTO</h2>
            <div id="review-payment"></div>

            <label class="check-field">
              <input type="checkbox" id="accept-order-terms">
              Confirmo os dados e aceito os termos da compra.
            </label>

            <button class="button button-pink" id="confirm-order">
              CONFIRMAR PEDIDO →
            </button>
          </section>

          <aside class="page-panel order-summary">
            <h2>TOTAL</h2>
            <div id="review-total"></div>
          </aside>
        </div>
      </div>
    `,

    "pedido-confirmado": `
      <div class="page-wrap">
        <div class="breadcrumbs">INÍCIO / PEDIDO / CONFIRMAÇÃO</div>

        <section class="page-panel success-panel" style="max-width:760px;margin:auto">
          <div class="success-mark">✓</div>

          <span class="eyebrow">SINAL RECEBIDO</span>
          <h1>SEU PEDIDO FOI REGISTRADO.</h1>

          <p>
            Obrigado por visitar a STRANGEDREAM.
            Os detalhes do pedido aparecerão abaixo.
          </p>

          <div id="confirmed-order-details"></div>

          <a class="button button-pink" href="#rastreamento">
            ACOMPANHAR PEDIDO →
          </a>

          <a class="button button-outline" href="#catalogo">
            VOLTAR AO CATÁLOGO
          </a>
        </section>
      </div>
    `,

    /* RASTREAMENTO */

    rastreamento: `
      <div class="page-wrap">
        <div class="breadcrumbs">INÍCIO / PEDIDOS / RASTREAMENTO</div>

        <div class="page-intro">
          <span class="eyebrow">LOCALIZAÇÃO DO SINAL</span>
          <h1>ONDE ESTÁ MEU PEDIDO?</h1>
          <p>Consulte as informações de acompanhamento.</p>
        </div>

        <section class="page-panel" style="max-width:800px">
          <form id="tracking-form">
            <label class="form-field">
              NÚMERO DO PEDIDO
              <input name="order" placeholder="Ex.: SD-0013" required>
            </label>

            <button class="button button-pink" type="submit">
              BUSCAR PEDIDO →
            </button>
          </form>

          <div id="tracking-result"></div>

          <span class="notice">
            O rastreamento real depende da integração com a transportadora.
          </span>
        </section>
      </div>
    `,

    /* COLEÇÕES */

    universos: `
      <div class="page-wrap">
        <div class="page-intro">
          <span class="eyebrow">STRANGEDREAM / UNIVERSOS</span>
          <h1>ENTRE EM OUTRO MUNDO.</h1>
          <p>
            Descubra produtos inspirados em histórias e universos
            que continuam existindo depois que a tela se apaga.
          </p>
        </div>

        <div class="account-grid">
          <a class="page-panel" href="#universo-omori">
            <span class="eyebrow">UNIVERSO 001</span>
            <h2>OMORI →</h2>
            <p>Uma viagem entre memória, sonho e realidade.</p>
          </a>

          <a class="page-panel" href="#universo-dead-plate">
            <span class="eyebrow">UNIVERSO 002</span>
            <h2>DEAD PLATE →</h2>
            <p>Personagens e objetos de um mundo peculiar.</p>
          </a>

          <a class="page-panel" href="#universo-zeno">
            <span class="eyebrow">UNIVERSO 003</span>
            <h2>ZENO REMAKE →</h2>
            <p>Um arquivo de lembranças incomuns.</p>
          </a>

          <a class="page-panel" href="#universo-yume">
            <span class="eyebrow">UNIVERSO 004</span>
            <h2>YUME NIKKI →</h2>
            <p>Uma coleção de sonhos e pequenas estranhezas.</p>
          </a>
        </div>
      </div>
    `,

    "universo-omori": `
      <div class="page-wrap">
        <div class="category-hero">
          <span>UNIVERSO / 001</span>
          <h2>OMORI</h2>
          <p>Personagens, acessórios e produtos inspirados nesse universo.</p>
        </div>
        <div class="product-grid" id="universe-products"></div>
      </div>
    `,

    "universo-dead-plate": `
      <div class="page-wrap">
        <div class="category-hero">
          <span>UNIVERSO / 002</span>
          <h2>DEAD PLATE</h2>
          <p>Uma seleção de produtos inspirados em Dead Plate.</p>
        </div>
        <div class="product-grid" id="universe-products"></div>
      </div>
    `,

    "universo-zeno": `
      <div class="page-wrap">
        <div class="category-hero">
          <span>UNIVERSO / 003</span>
          <h2>ZENO REMAKE</h2>
          <p>Uma seleção de produtos inspirados em Zeno REMAKE.</p>
        </div>
        <div class="product-grid" id="universe-products"></div>
      </div>
    `,

    "universo-yume": `
      <div class="page-wrap">
        <div class="category-hero">
          <span>UNIVERSO / 004</span>
          <h2>YUME NIKKI</h2>
          <p>Uma seleção de produtos inspirados em Yume Nikki.</p>
        </div>
        <div class="product-grid" id="universe-products"></div>
      </div>
    `,

    /* SOBRE */

    sobre: `
      <div class="page-wrap">
        <div class="breadcrumbs">INÍCIO / SOBRE O RUÍDO</div>

        <div class="manifesto-block">
          <span class="eyebrow">STRANGEDREAM / MANIFESTO</span>
          <h2>COISAS ESTRANHAS PARA PESSOAS ESTRANHAS.</h2>
          <p>
            A STRANGEDREAM nasceu para reunir objetos, personagens
            e pequenas obsessões em um só lugar.
          </p>
        </div>

        <section class="page-panel">
          <h2>UM LUGAR PARA O INCOMUM.</h2>
          <p>
            Acreditamos que aquilo que você gosta pode fazer parte
            do seu cotidiano. Uma figura na estante, um chaveiro
            na mochila ou uma pelúcia no quarto: pequenas coisas
            que carregam histórias importantes.
          </p>
        </section>
      </div>
    `,

    /* AJUDA */

    faq: `
      <div class="page-wrap">
        <div class="page-intro">
          <span class="eyebrow">CENTRAL DE AJUDA</span>
          <h1>PERGUNTAS FREQUENTES</h1>
          <p>Algumas respostas para dúvidas que podem aparecer.</p>
        </div>

        <section class="page-panel faq-list">

          <details>
            <summary>Como faço um pedido?</summary>
            <p>
              Escolha seus produtos, adicione ao carrinho e siga
              as etapas de entrega e pagamento.
            </p>
          </details>

          <details>
            <summary>Como acompanho minha compra?</summary>
            <p>
              Acesse a área de pedidos e consulte as informações
              de rastreamento disponíveis.
            </p>
          </details>

          <details>
            <summary>Quais formas de pagamento são aceitas?</summary>
            <p>
              A interface demonstra PIX, cartão e boleto.
              Os meios reais dependem da integração de pagamento.
            </p>
          </details>

          <details>
            <summary>Posso solicitar uma troca?</summary>
            <p>
              Consulte a política de trocas e entre em contato
              com o atendimento.
            </p>
          </details>

          <details>
            <summary>Como funciona o frete?</summary>
            <p>
              O valor e o prazo reais dependem do endereço e
              da integração com o serviço de entrega.
            </p>
          </details>

          <details>
            <summary>Como entro em contato?</summary>
            <p><a href="#contato">Acesse a página de contato.</a></p>
          </details>

        </section>
      </div>
    `,

    contato: `
      <div class="page-wrap">
        <div class="breadcrumbs">INÍCIO / AJUDA / CONTATO</div>

        <div class="page-intro">
          <span class="eyebrow">CANAL DE COMUNICAÇÃO</span>
          <h1>FALE COM O OUTRO LADO.</h1>
          <p>Envie sua dúvida ou mensagem para a equipe.</p>
        </div>

        <div class="page-columns">
          <section class="page-panel">
            <h2>ENVIAR MENSAGEM</h2>

            <form data-demo-form="contato">
              <label class="form-field">
                NOME
                <input name="name" required>
              </label>

              <label class="form-field">
                E-MAIL
                <input type="email" name="email" required>
              </label>

              <label class="form-field">
                ASSUNTO
                <select name="subject">
                  <option>Dúvida sobre produto</option>
                  <option>Pedido</option>
                  <option>Entrega</option>
                  <option>Troca ou devolução</option>
                  <option>Outro assunto</option>
                </select>
              </label>

              <label class="form-field">
                MENSAGEM
                <textarea name="message" rows="5" required></textarea>
              </label>

              <button class="button button-pink" type="submit">
                ENVIAR MENSAGEM →
              </button>
            </form>
          </section>

          <aside class="page-panel">
            <span class="eyebrow">ATENDIMENTO</span>
            <h2>PRECISA DE AJUDA?</h2>
            <p>
              Utilize o formulário para registrar sua solicitação.
            </p>
            <p>
              O envio real de mensagens exige integração com
              um serviço de atendimento ou e-mail.
            </p>
          </aside>
        </div>
      </div>
    `,

    envio: `
      <div class="page-wrap">
        <div class="page-intro">
          <span class="eyebrow">INFORMAÇÕES</span>
          <h1>ENVIO E ENTREGA</h1>
          <p>Informações gerais sobre o transporte dos pedidos.</p>
        </div>

        <section class="page-panel policy-copy">
          <section>
            <h2>PROCESSAMENTO</h2>
            <p>
              Os pedidos precisam ser preparados e conferidos
              antes de serem enviados.
            </p>
          </section>

          <section>
            <h2>PRAZOS</h2>
            <p>
              O prazo de entrega depende do endereço, modalidade
              de envio e disponibilidade da transportadora.
            </p>
          </section>

          <section>
            <h2>RASTREAMENTO</h2>
            <p>
              Quando disponível, o código de rastreamento poderá
              ser consultado na área de pedidos.
            </p>
          </section>
        </section>
      </div>
    `,

    trocas: `
      <div class="page-wrap">
        <div class="page-intro">
          <span class="eyebrow">ATENDIMENTO</span>
          <h1>TROCAS E DEVOLUÇÕES</h1>
        </div>

        <section class="page-panel policy-copy">
          <section>
            <h2>SOLICITAÇÕES</h2>
            <p>
              Para solicitar uma troca ou devolução, entre em
              contato com o atendimento e informe os dados do pedido.
            </p>
          </section>

          <section>
            <h2>ANÁLISE</h2>
            <p>
              Cada solicitação deve ser analisada de acordo com
              as condições aplicáveis e a legislação vigente.
            </p>
          </section>

          <section>
            <h2>CONTATO</h2>
            <p><a href="#contato">Acessar o formulário de contato.</a></p>
          </section>
        </section>
      </div>
    `,

    avaliacoes: `
      <div class="page-wrap">
        <div class="page-intro">
          <span class="eyebrow">COMUNIDADE</span>
          <h1>AVALIAÇÕES</h1>
          <p>Compartilhe sua experiência com os produtos.</p>
        </div>

        <section class="page-panel">
          <form data-demo-form="avaliacao">
            <label class="form-field">
              PRODUTO
              <input name="product" placeholder="Nome do produto" required>
            </label>

            <label class="form-field">
              SUA NOTA
              <select name="rating" required>
                <option value="">Selecione</option>
                <option value="5">5 — Excelente</option>
                <option value="4">4 — Muito bom</option>
                <option value="3">3 — Bom</option>
                <option value="2">2 — Regular</option>
                <option value="1">1 — Ruim</option>
              </select>
            </label>

            <label class="form-field">
              COMENTÁRIO
              <textarea name="comment" rows="4" required></textarea>
            </label>

            <button class="button button-pink" type="submit">
              ENVIAR AVALIAÇÃO →
            </button>
          </form>
        </section>
      </div>
    `,

    /* POLÍTICAS */

    privacidade: `
      <div class="page-wrap">
        <div class="page-intro">
          <span class="eyebrow">DOCUMENTAÇÃO</span>
          <h1>POLÍTICA DE PRIVACIDADE</h1>
        </div>

        <div class="policy-layout">
          <nav class="page-panel toc">
            <b>NESTA PÁGINA</b>
            <a href="#privacidade-coleta">Dados coletados</a>
            <a href="#privacidade-uso">Uso dos dados</a>
            <a href="#privacidade-seguranca">Segurança</a>
            <a href="#privacidade-direitos">Seus direitos</a>
          </nav>

          <section class="page-panel policy-copy">
            <section id="privacidade-coleta">
              <h2>1. DADOS COLETADOS</h2>
              <p>
                Uma loja funcional pode coletar informações necessárias
                para cadastro, atendimento, entrega e processamento
                de pedidos.
              </p>
            </section>

            <section id="privacidade-uso">
              <h2>2. USO DOS DADOS</h2>
              <p>
                Os dados devem ser utilizados apenas para finalidades
                legítimas e informadas ao usuário.
              </p>
            </section>

            <section id="privacidade-seguranca">
              <h2>3. SEGURANÇA</h2>
              <p>
                A aplicação real precisa adotar medidas técnicas
                e organizacionais adequadas para proteger informações.
              </p>
            </section>

            <section id="privacidade-direitos">
              <h2>4. SEUS DIREITOS</h2>
              <p>
                O tratamento de dados deve respeitar os direitos
                previstos na legislação aplicável, incluindo a LGPD.
              </p>
            </section>
          </section>
        </div>
      </div>
    `,

    termos: `
      <div class="page-wrap">
        <div class="page-intro">
          <span class="eyebrow">DOCUMENTAÇÃO</span>
          <h1>TERMOS DE USO</h1>
        </div>

        <section class="page-panel policy-copy">
          <section>
            <h2>1. UTILIZAÇÃO</h2>
            <p>
              O usuário deve utilizar a plataforma de maneira
              responsável e respeitar as regras aplicáveis.
            </p>
          </section>

          <section>
            <h2>2. PRODUTOS E PREÇOS</h2>
            <p>
              Informações comerciais, disponibilidade e preços
              devem ser confirmados antes de uma venda real.
            </p>
          </section>

          <section>
            <h2>3. PEDIDOS</h2>
            <p>
              A confirmação de uma compra depende do funcionamento
              dos serviços de pagamento e processamento.
            </p>
          </section>

          <section>
            <h2>4. ATUALIZAÇÕES</h2>
            <p>
              Os termos podem ser atualizados quando necessário,
              respeitando as regras legais aplicáveis.
            </p>
          </section>
        </section>
      </div>
    `,

    cookies: `
      <div class="page-wrap">
        <div class="page-intro">
          <span class="eyebrow">PREFERÊNCIAS</span>
          <h1>CONFIGURAÇÕES DE COOKIES</h1>
          <p>Gerencie as preferências de armazenamento do navegador.</p>
        </div>

        <section class="page-panel" style="max-width:750px">
          <label class="choice-card">
            <input type="checkbox" checked disabled>
            <strong>NECESSÁRIOS</strong>
            <small>Recursos essenciais da aplicação.</small>
          </label>

          <label class="choice-card">
            <input type="checkbox" id="analytics-cookies">
            <strong>ANALÍTICOS</strong>
            <small>Estatísticas de uso, quando integradas.</small>
          </label>

          <label class="choice-card">
            <input type="checkbox" id="marketing-cookies">
            <strong>MARKETING</strong>
            <small>Preferências de comunicação e publicidade.</small>
          </label>

          <button class="button button-pink" id="save-cookie-preferences">
            SALVAR PREFERÊNCIAS →
          </button>
        </section>
      </div>
    `,

    /* PÁGINA DE BUSCA */

    busca: `
      <div class="page-wrap">
        <div class="page-intro">
          <span class="eyebrow">PESQUISA NO ARQUIVO</span>
          <h1>O QUE VOCÊ PROCURA?</h1>
        </div>

        <form id="search-page-form" class="search-page-form">
          <input id="search-page-input" placeholder="Digite sua busca..." type="search">
          <button class="button button-pink" type="submit">BUSCAR →</button>
        </form>

        <div id="search-page-results" class="product-grid"></div>
      </div>
    `,

    /* PÁGINA NÃO ENCONTRADA */

    "nao-encontrado": `
      <div class="page-wrap">
        <div class="error-layout">
          <div class="error-code">404</div>

          <div>
            <span class="eyebrow">SINAL PERDIDO</span>
            <h1>ESTE LUGAR NÃO EXISTE.</h1>
            <p>
              A página que você procurou não foi encontrada
              no arquivo da STRANGEDREAM.
            </p>
            <a href="#inicio" class="button button-pink">
              VOLTAR AO INÍCIO →
            </a>
          </div>
        </div>
      </div>
    `

  };

  /* ==========================================
     CONFIGURAÇÃO DO SISTEMA DE PÁGINAS
  ========================================== */

  const main = document.querySelector("main");

  if (!main) {
    console.error("STRANGEDREAM: elemento main não encontrado.");
    return;
  }

  const homeContent = main.innerHTML;

  const knownHomeHashes = [
    "",
    "#inicio",
    "#catalogo",
    "#novidades",
    "#manifesto",
    "#newsletter",
    "#social",
    "#comunidade"
  ];

  function getPageName() {
    return decodeURIComponent(
      window.location.hash.replace(/^#/, "")
    ).trim().toLowerCase();
  }

  function renderPage() {
    const pageName = getPageName();

    if (knownHomeHashes.includes("#" + pageName) || pageName === "") {
      main.innerHTML = homeContent;
      main.classList.remove("page-view");

      window.dispatchEvent(
        new CustomEvent("store:home-rendered")
      );

      if (pageName && pageName !== "inicio") {
        requestAnimationFrame(() => {
          const target = document.getElementById(pageName);
          if (target) {
            target.scrollIntoView({ behavior: "smooth" });
          }
        });
      }

      return;
    }

    if (pageName.startsWith("produto-")) {
      window.dispatchEvent(
        new CustomEvent("store:product-route", {
          detail: { slug: pageName.replace("produto-", "") }
        })
      );
      return;
    }

    const content = pages[pageName];

    if (!content) {
      main.innerHTML = pages["nao-encontrado"];
    } else {
      main.innerHTML = content;
    }

    main.classList.add("page-view");

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

    window.dispatchEvent(
      new CustomEvent("store:page-rendered", {
        detail: { page: pageName }
      })
    );
  }

  window.addEventListener("hashchange", renderPage);

  window.addEventListener("store:request-page-render", renderPage);

  window.StorePages = {
    pages,
    render: renderPage,
    getCurrentPage: getPageName
  };

  renderPage();

})();
