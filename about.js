var last_scroll_top,
  app = { init: function () {} };
function initHomeCarousel() {
  new Splide("#home-carousel", {
    perPage: 1,
    perMove: 1,
    autoplay: !0,
    arrows: !0,
    pagination: !1,
    waitForTransition: !1,
    pauseOnHover: !1,
    rewind: !0,
    type: "slide",
    easing: "ease",
    interval: 15e3,
    speed: 500,
    arrowPath:
      "m15.5 0.932-4.3 4.38 14.5 14.6-14.5 14.5 4.3 4.4 14.6-14.6 4.4-4.3-4.4-4.4-14.6-14.6z",
    classes: {
      arrow: "splide__arrow arrow",
      prev: "splide__arrow--prev prev",
      next: "splide__arrow--next next",
    },
  }).mount();
}
function initProductCarousel() {
  var e = new Splide("#thumb-product-slider", {
    rewind: !0,
    fixedWidth: 110,
    fixedHeight: 110,
    isNavigation: !0,
    gap: 15,
    focus: "center",
    pagination: !1,
    cover: !0,
    arrows: !1,
    breakpoints: { 600: { fixedWidth: 64, fixedHeight: 64, gap: 10 } },
  }).mount();
  new Splide("#product-slider", {
    type: "fade",
    heightRatio: 1,
    pagination: !1,
    cover: !0,
  })
    .sync(e)
    .mount();
}
function removeQuantity(e) {
  1 < parseInt(document.getElementById(e).value) &&
    (document.getElementById(e).value =
      parseInt(document.getElementById(e).value) - 1);
}
function addQuantity(e) {
  document.getElementById(e).value =
    parseInt(document.getElementById(e).value) + 1;
}
function openMenu() {
  document.getElementById("sidebarMenu").style.transform = "translateX(0%)";
}
function closeMenu() {
  document.getElementById("sidebarMenu").style.transform = "translateX(-100%)";
}
function openSearch() {
  console.log("open"),
    (document.getElementById("sidebarSearch").style.transform =
      "translateY(0%)");
}
function closeSearch() {
  document.getElementById("sidebarSearch").style.transform =
    "translateY(-100%)";
}
function openCheckoutEmail() {
  (document.getElementById("email-button").style.display = "none"),
    (document.getElementById("email-form").style.display = "block"),
    closeCheckoutWhatsapp();
}
function closeCheckoutEmail() {
  (document.getElementById("email-button").style.display = "block"),
    (document.getElementById("email-form").style.display = "none");
}
function openCheckoutWhatsapp() {
  (document.getElementById("whatsapp-button").style.display = "none"),
    (document.getElementById("whatsapp-form").style.display = "block"),
    closeCheckoutEmail();
}
function closeCheckoutWhatsapp() {
  (document.getElementById("whatsapp-button").style.display = "block"),
    (document.getElementById("whatsapp-form").style.display = "none");
}
$("document").ready(function () {
  app.init();
}),
  $("body").css(
    "padding-top",
    $(".navbar").outerHeight() + $(".top-bar").outerHeight() + "px"
  ),
  0 < $(".smart-scroll").length &&
    ((last_scroll_top = 0),
    $(window).on("scroll", function () {
      (scroll_top = $(this).scrollTop()),
        scroll_top > last_scroll_top
          ? ($(".smart-scroll")
              .removeClass("scrolled-up")
              .addClass("scrolled-down"),
            $("body").css("padding-top", $(".navbar").outerHeight() + "px"))
          : ($(".smart-scroll")
              .removeClass("scrolled-down")
              .addClass("scrolled-up"),
            $("body").css(
              "padding-top",
              $(".navbar").outerHeight() + $(".top-bar").outerHeight() + "px"
            )),
        (last_scroll_top = scroll_top);
    }));

/* =================== ENVIA CONTATO =================== */
jQuery(document).ready(function ($) {
  var enviando_formulario = false;
  $("#form-contato").on("submit", function (e) {
    e.preventDefault();
    var obj = this;
    var form = $(obj);
    var submit_btn = form.find("#enviar");
    var submit_btn_text = submit_btn.text();
    var dados = new FormData(obj);

    function volta_submit() {
      submit_btn.attr("disabled", false);
      submit_btn.text(submit_btn_text);
      enviando_formulario = false;
      //hideLoading();
    }

    if (!enviando_formulario) {
      $.ajax({
        url: form.attr("action"),
        type: form.attr("method"),
        data: dados,
        processData: false,
        cache: false,
        contentType: false,
        beforeSend: function beforeSend() {
          //showLoading();
          enviando_formulario = true;
          submit_btn.attr("disabled", true);
          submit_btn.text("Enviando...");
        },
        success: function success(data) {
          console.log(data);
          volta_submit();

          if (data == "ok") {
            $("#form-contato .campo").val("");
            alert("Sua mensagem foi enviada com sucesso.");
            //$("#myModal").modal("show");
            //showAlert(
            //  "Sucesso",
            //  "Sua mensagem foi enviada com sucesso.",
            //  "success"
            //);
          } else {
            //$("#myModal").modal("show");
            alert("Sua mensagem foi enviada com sucesso.");
            //showAlert("Erro", "NÃ£o foi possÃ­vel enviar a mensagem.", "error");
          }
        },
        error: function error(xhr, type, exception) {
          volta_submit();
          //showAlert("Erro", "NÃ£o foi possÃ­vel enviar a mensagem.", "error");
          alert("NÃ£o foi possÃ­vel enviar a mensagem.");
          console.log("ajax error response type " + type);
        },
      });
    }
  });
});

$("#form-add-cart").on("submit", function (e) {
  e.preventDefault();
  addToCart();
}); // Evento do botÃ£o para remover um item do carrinho

$(".cart-rem").on("click", function (e) {
  e.preventDefault();
  remFromCart($(this).data("item"));
}); // Evento do botÃ£o para alterar a quantidade

$(".cart-qtde").on("change", function () {
  var idItem = $(this).attr("id").replace(/\D/g, "");
  var itemQtde = Number($(this).val());
  updateQtdeCart(idItem, itemQtde);
}); // Evento do botÃ£o para finalizar o carrinho

//$("#form-cart-orcamento").on("submit", function (e) {
//  e.preventDefault();
//  enviaOrcamento();
//}); // Retorna a quantidade de itens do carrinho

function getCartTotal() {
  return $("tr[data-row]").length;
} // Adiciona um produto ao carrinho

function addToCart() {
  var form = $("#form-add-cart");
  var formObj = form.get(0);
  var submitBtn = $(".btn-add-cart");
  var dados = new FormData(formObj);
  $.ajax({
    url: form.attr("action"),
    type: form.attr("method"),
    data: dados,
    processData: false,
    cache: false,
    contentType: false,
    beforeSend: function beforeSend() {
      //showLoading();
      submitBtn.attr("disabled", true);
    },
    success: function success(data) {
      //console.log(data);
      submitBtn.attr("disabled", false);
      //hideLoading();

      if (data == "ok") {
        location.href = "checkout.php";
      } else {
        //showAlert("Erro", "NÃ£o foi possÃ­vel realizar esta operaÃ§Ã£o.", "error");
        alert("NÃ£o foi possÃ­vel realizar esta operaÃ§Ã£o.");
      }
    },
    error: function error(xhr, type, exception) {
      submitBtn.attr("disabled", false);
      //hideLoading();
      //showAlert("Erro", "NÃ£o foi possÃ­vel realizar esta operaÃ§Ã£o.", "error");
      alert("NÃ£o foi possÃ­vel realizar esta operaÃ§Ã£o.");
    },
  });
} // Atualiza o cÃ¡lculo no carrinho com base nas alteraÃ§Ãµes

function updateCart() {
  var total = 0;
  $("tr[data-row]").each(function () {
    var itemId = $(this).data("row");
    var qtde = Number($("#quantidade-" + itemId).val());
    var valor = $(this).data("valor");
    var subtotal = qtde * valor;
    $(this)
      .find(".cart-subtotal")
      .text("R$ " + formataMoeda(subtotal));
    total += subtotal;
  });
  $("#cart-total").text("R$ " + formataMoeda(total));
} // Remove um produto do carrinho

function remFromCart(idRem) {
  $.ajax({
    url: urlAction,
    type: "POST",
    data: {
      registro_id: idRem,
      acao: "delete",
    },
    beforeSend: function beforeSend() {
      //showLoading();
    },
    success: function success(data) {
      //console.log(data);
      //hideLoading();

      if (data == "ok") {
        $('[data-row="' + idRem + '"]').remove();

        if (getCartTotal() === 0) {
          location.reload();
        }

        updateCart();
        //showAlert(
        //  "Sucesso",
        //  "O produto foi removido do carrinho com sucesso.",
        //  "success"
        //);
        alert("O produto foi removido do carrinho com sucesso.");
      } else {
        //showAlert("Erro", "NÃ£o foi possÃ­vel realizar esta operaÃ§Ã£o.", "error");
        alert("NÃ£o foi possÃ­vel realizar esta operaÃ§Ã£o.");
      }
    },
    error: function error(xhr, type, exception) {
      hideLoading();
      //showAlert("Erro", "NÃ£o foi possÃ­vel realizar esta operaÃ§Ã£o.", "error");
      alert("NÃ£o foi possÃ­vel realizar esta operaÃ§Ã£o.");
    },
  });
} // Atualiza a quantidade do produto do carrinho

function updateQtdeCart(idItem, itemQtde) {
  $.ajax({
    url: urlAction,
    type: "POST",
    data: {
      registro_id: idItem,
      quantidade: itemQtde,
      acao: "update",
    },
    beforeSend: function beforeSend() {
      //showLoading();
    },
    success: function success(data) {
      //console.log(data);
      //hideLoading();

      if (data == "ok") {
        updateCart();
      } else {
        //showAlert("Erro", "NÃ£o foi possÃ­vel realizar esta operaÃ§Ã£o.", "error");
        alert("NÃ£o foi possÃ­vel realizar esta operaÃ§Ã£o.");
      }
    },
    error: function error(xhr, type, exception) {
      hideLoading();
      //showAlert("Erro", "NÃ£o foi possÃ­vel realizar esta operaÃ§Ã£o.", "error");

      alert("NÃ£o foi possÃ­vel realizar esta operaÃ§Ã£o.");
    },
  });
} // Finaliza o carrinho e envia a solicitaÃ§Ã£o de orÃ§amento

$(function () {
  $("#form-cart-orcamento").on("submit", function (e) {
    var form = $("#form-cart-orcamento");
    var formObj = document.getElementById("form-cart-orcamento");
    var submitBtn = $("#btn-cart-orcamento");
    var dados = new FormData(formObj);

    var sendModal = new bootstrap.Modal(
      document.getElementById("exampleModal"),
      {
        keyboard: false,
      }
    );

    $.ajax({
      url: "acoes/app/produtos/carrinho.php",
      type: "POST",
      data: dados,
      processData: false,
      cache: false,
      contentType: false,
      success: function (data) {
        sendModal.show();
      },
    });
    e.preventDefault();
  });
});

$(function () {
  $("#form-cart-orcamento-whatsapp").on("submit", function (e) {
    var form = $("#form-cart-orcamento-whatsapp");
    var formObj = document.getElementById("form-cart-orcamento-whatsapp");
    var submitBtn = $("#btn-cart-orcamento");
    var dados = new FormData(formObj);

    var sendModal = new bootstrap.Modal(
      document.getElementById("exampleModal"),
      {
        keyboard: false,
      }
    );

    $.ajax({
      url: "acoes/app/produtos/carrinho.php",
      type: "POST",
      data: dados,
      processData: false,
      cache: false,
      contentType: false,
      success: function (data) {
        location.replace(data);
        //alert(data);
        //sendModal.show();
      },
    });
    e.preventDefault();
  });
});

function removeCarrinho(id) {
  var removeModal = new bootstrap.Modal(
    document.getElementById("removeModal"),
    {
      keyboard: false,
    }
  );

  var postData = {
    acao: "delete",
    registro_id: id,
  };

  $.ajax({
    type: "POST",
    url: "acoes/app/produtos/carrinho.php",
    data: postData,
    success: function (data) {
      removeModal.show();
      setTimeout(function () {
        location.href = "checkout.php";
      }, 1100);
    },
  });
  //e.preventDefault();
}

function enviaOrcamento() {
  var form = $("#form-cart-orcamento");
  var formObj = document.getElementById("form-cart-orcamento");
  var submitBtn = $("#btn-cart-orcamento");
  var dados = new FormData(formObj);

  $.ajax({
    url: "acoes/app/produtos/carrinho.php",
    type: "POST",
    data: dados,
    processData: false,
    cache: false,
    contentType: false,
    beforeSend: function beforeSend() {
      //showLoading();
      submitBtn.attr("disabled", true);
    },
    success: function success(data) {
      //console.log(data);
      submitBtn.attr("disabled", false);
      //hideLoading();

      if (data == "ok") {
        $("#envioModal").modal();

        location.href = "checkout.php?rg-session=true";
      } else {
        //showAlert("Erro", "NÃ£o foi possÃ­vel realizar esta operaÃ§Ã£o.", "error");
        alert("1 NÃ£o foi possÃ­vel realizar esta operaÃ§Ã£o.");
      }
    },
    error: function error(xhr, type, exception) {
      submitBtn.attr("disabled", false);
      hideLoading();
      //showAlert("Erro", "NÃ£o foi possÃ­vel realizar esta operaÃ§Ã£o.", "error");
      alert("2 NÃ£o foi possÃ­vel realizar esta operaÃ§Ã£o.");
    },
  });
}

function geraLinkWhatsapp() {
  // https://web.whatsapp.com/send?phone=5511993179665&text=Ol%C3%A1%20Hells%20Brindes!
}

$(function () {
  $("#mailingForm").on("submit", function (e) {
    var formObj = document.getElementById("mailingForm");
    var dados = new FormData(formObj);

    var mailingModal = new bootstrap.Modal(
      document.getElementById("mailingModal"),
      {
        keyboard: false,
      }
    );

    $.ajax({
      url: "acoes/app/newsletter/cadastrar_email.php",
      type: "POST",
      data: dados,
      processData: false,
      cache: false,
      contentType: false,
      success: function (data) {
        mailingModal.show();
      },
    });
    e.preventDefault();
  });
});