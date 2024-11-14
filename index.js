var last_scroll_top, // Armazena a posição anterior do scroll
  app = { init: function () {} }; // Objeto de aplicativo com função de inicialização vazia

// Inicializa o carrossel da página inicial
function initHomeCarousel() {
  new Splide("#home-carousel", { // Cria um novo carrossel usando a biblioteca Splide
    perPage: 1, // Número de slides exibidos por vez
    perMove: 1, // Número de slides movidos por vez
    autoplay: true, // Ativa a reprodução automática
    arrows: true, // Exibe setas de navegação
    pagination: false, // Desativa a paginação
    waitForTransition: false, // Não aguarda a transição para mover o próximo slide
    pauseOnHover: false, // Não pausa a reprodução automática ao passar o mouse
    rewind: true, // Permite que o carrossel volte ao início após o último slide
    type: "slide", // Tipo de transição de slides
    easing: "ease", // Efeito de suavização
    interval: 15000, // Intervalo entre as transições
    speed: 500, // Duração da transição em milissegundos
    arrowPath: "m15.5 0.932-4.3 4.38 14.5 14.6-14.5 14.5 4.3 4.4 14.6-14.6 4.4-4.3-4.4-4.4-14.6-14.6z", // Caminho SVG para as setas
    classes: { // Classes personalizadas para os elementos do carrossel
      arrow: "splide__arrow arrow",
      prev: "splide__arrow--prev prev",
      next: "splide__arrow--next next",
    },
  }).mount(); // Monta o carrossel
}

// Inicializa o carrossel de produtos
function initProductCarousel() {
  var e = new Splide("#thumb-product-slider", { // Cria um carrossel de miniaturas
    rewind: true, // Permite que o carrossel volte ao início após o último slide
    fixedWidth: 110, // Largura fixa das miniaturas
    fixedHeight: 110, // Altura fixa das miniaturas
    isNavigation: true, // Define como um carrossel de navegação
    gap: 15, // Espaço entre os slides
    focus: "center", // Mantém o slide centralizado
    pagination: false, // Desativa a paginação
    cover: true, // Exibe a imagem de fundo
    arrows: false, // Desativa as setas de navegação
    breakpoints: { // Define estilos para diferentes tamanhos de tela
      600: { fixedWidth: 64, fixedHeight: 64, gap: 10 }, // Estilos para telas menores que 600px
    },
  }).mount(); // Monta o carrossel

  new Splide("#product-slider", { // Cria o carrossel principal de produtos
    type: "fade", // Tipo de transição de desvanecimento
    heightRatio: 1, // Proporção de altura
    pagination: false, // Desativa a paginação
    cover: true, // Exibe a imagem de fundo
  })
    .sync(e) // Sincroniza com o carrossel de miniaturas
    .mount(); // Monta o carrossel
}

// Remove uma unidade da quantidade
function removeQuantity(e) {
  if (parseInt(document.getElementById(e).value) > 1) { // Verifica se a quantidade é maior que 1
    document.getElementById(e).value = parseInt(document.getElementById(e).value) - 1; // Decrementa a quantidade
  }
}

// Adiciona uma unidade à quantidade
function addQuantity(e) {
  document.getElementById(e).value = parseInt(document.getElementById(e).value) + 1; // Incrementa a quantidade
}

// Abre o menu lateral
function openMenu() {
  document.getElementById("sidebarMenu").style.transform = "translateX(0%)"; // Move o menu para a posição visível
}

// Fecha o menu lateral
function closeMenu() {
  document.getElementById("sidebarMenu").style.transform = "translateX(-100%)"; // Move o menu para fora da tela
}

// Abre a barra de busca
function openSearch() {
  console.log("open"), // Log de abertura
    (document.getElementById("sidebarSearch").style.transform = "translateY(0%)"); // Move a barra de busca para a posição visível
}

// Fecha a barra de busca
function closeSearch() {
  document.getElementById("sidebarSearch").style.transform = "translateY(-100%)"; // Move a barra de busca para fora da tela
}

// Abre o formulário de checkout por email
function openCheckoutEmail() {
  document.getElementById("email-button").style.display = "none"; // Esconde o botão de email
  document.getElementById("email-form").style.display = "block"; // Exibe o formulário de email
  closeCheckoutWhatsapp(); // Fecha o formulário de WhatsApp se aberto
}

// Fecha o formulário de checkout por email
function closeCheckoutEmail() {
  document.getElementById("email-button").style.display = "block"; // Exibe o botão de email
  document.getElementById("email-form").style.display = "none"; // Esconde o formulário de email
}

// Abre o formulário de checkout por WhatsApp
function openCheckoutWhatsapp() {
  document.getElementById("whatsapp-button").style.display = "none"; // Esconde o botão de WhatsApp
  document.getElementById("whatsapp-form").style.display = "block"; // Exibe o formulário de WhatsApp
  closeCheckoutEmail(); // Fecha o formulário de email se aberto
}

// Fecha o formulário de checkout por WhatsApp
function closeCheckoutWhatsapp() {
  document.getElementById("whatsapp-button").style.display = "block"; // Exibe o botão de WhatsApp
  document.getElementById("whatsapp-form").style.display = "none"; // Esconde o formulário de WhatsApp
}

// Inicializa o aplicativo quando o documento estiver pronto
$("document").ready(function () {
  app.init();
}),
  $("body").css(
    "padding-top",
    $(".navbar").outerHeight() + $(".top-bar").outerHeight() + "px" // Define o padding-top do corpo com base na altura da navbar e da top-bar
  ),
  0 < $(".smart-scroll").length && // Se houver elementos com a classe smart-scroll
    ((last_scroll_top = 0),
    $(window).on("scroll", function () {
      (scroll_top = $(this).scrollTop()), // Armazena a posição atual do scroll
        scroll_top > last_scroll_top // Verifica se a rolagem foi para baixo
          ? ($(".smart-scroll")
              .removeClass("scrolled-up")
              .addClass("scrolled-down"), // Adiciona classes de scroll
            $("body").css("padding-top", $(".navbar").outerHeight() + "px")) // Ajusta o padding-top
          : ($(".smart-scroll")
              .removeClass("scrolled-down")
              .addClass("scrolled-up"), // Adiciona classes de scroll
            $("body").css(
              "padding-top",
              $(".navbar").outerHeight() + $(".top-bar").outerHeight() + "px" // Ajusta o padding-top
            )),
        (last_scroll_top = scroll_top); // Atualiza a posição do scroll anterior
    }));

/* =================== ENVIA CONTATO =================== */
// Inicializa o formulário de contato
jQuery(document).ready(function ($) {
  var enviando_formulario = false; // Flag para controle do envio do formulário
  $("#form-contato").on("submit", function (e) { // Evento de envio do formulário
    e.preventDefault(); // Previne o comportamento padrão do formulário
    var obj = this; // Armazena o objeto do formulário
    var form = $(obj); // Cria um jQuery object do formulário
    var submit_btn = form.find("#enviar"); // Seleciona o botão de envio
    var submit_btn_text = submit_btn.text(); // Armazena o texto do botão
    var dados = new FormData(obj); // Cria um objeto FormData com os dados do formulário

    function volta_submit() { // Função para reabilitar o botão de envio
      submit_btn.attr("disabled", false); // Habilita o botão
      submit_btn.text(submit_btn_text); // Restaura o texto do botão
      enviando_formulario = false; // Reseta a flag
      //hideLoading(); // Oculta loading (se implementado)
    }

    if (!enviando_formulario) { // Se o formulário não estiver sendo enviado
      $.ajax({ // Inicia uma requisição AJAX
        url: form.attr("action"), // URL de envio
        type: form.attr("method"), // Método de envio (GET ou POST)
        data: dados, // Dados do formulário
        processData: false, // Não processar os dados
        cache: false, // Não usar cache
        contentType: false, // Não definir tipo de conteúdo
        beforeSend: function () { // Função antes do envio
          enviando_formulario = true; // Define a flag como verdadeira
          submit_btn.attr("disabled", true); // Desabilita o botão
          submit_btn.text("Enviando..."); // Altera o texto do botão
          //showLoading(); // Exibe loading (se implementado)
        },
        success: function (resposta) { // Função de sucesso da requisição
          //hideLoading(); // Oculta loading (se implementado)
          if (resposta.result === "sucesso") { // Verifica se a resposta foi de sucesso
            $(obj).find("input[type=text], textarea").val(""); // Limpa os campos do formulário
            alert("Mensagem enviada com sucesso!"); // Exibe mensagem de sucesso
          } else {
            alert("Erro ao enviar mensagem."); // Exibe mensagem de erro
          }
        },
        error: function () { // Função de erro da requisição
          //hideLoading(); // Oculta loading (se implementado)
          alert("Erro ao enviar mensagem."); // Exibe mensagem de erro
        },
        complete: function () { // Função quando a requisição é completa
          volta_submit(); // Chama a função para reabilitar o botão
        },
      });
    }
  });
});
