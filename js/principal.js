/* principal.js: comportamentos do site do curso de Engenharia de Software.
   Sao tres: menu sanfona no celular, destaque do item de menu da secao
   visivel, acordeao das disciplinas e aparecimento suave dos cartoes.
   Tudo em JavaScript puro, sem bibliotecas externas. */

(function () {
  "use strict";

  var querMenosMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ----------------------------------------------------------
     1. Menu sanfona (hamburguer) no celular
     ---------------------------------------------------------- */
  function iniciarMenu() {
    var botao = document.getElementById("botao-menu");
    var lista = document.getElementById("menu");

    if (!botao || !lista) {
      return;
    }

    function fecharMenu() {
      lista.classList.remove("esta-aberto");
      botao.setAttribute("aria-expanded", "false");
    }

    botao.addEventListener("click", function () {
      var estaAberto = lista.classList.toggle("esta-aberto");
      botao.setAttribute("aria-expanded", String(estaAberto));
    });

    lista.addEventListener("click", function (evento) {
      if (evento.target.closest(".navegacao__link")) {
        fecharMenu();
      }
    });

    document.addEventListener("keydown", function (evento) {
      if (evento.key !== "Escape" || !lista.classList.contains("esta-aberto")) {
        return;
      }

      fecharMenu();
      botao.focus();
    });
  }

  /* ----------------------------------------------------------
     2. Destaque do item de menu da secao visivel
     ---------------------------------------------------------- */
  function iniciarDestaqueDoMenu() {
    var links = Array.prototype.slice.call(document.querySelectorAll(".navegacao__link"));
    var secoes = links
      .map(function (link) {
        return document.querySelector(link.getAttribute("href"));
      })
      .filter(Boolean);

    if (!secoes.length || !("IntersectionObserver" in window)) {
      return;
    }

    var observador = new IntersectionObserver(
      function (entradas) {
        entradas.forEach(function (entrada) {
          if (!entrada.isIntersecting) {
            return;
          }

          links.forEach(function (link) {
            var estaAtivo = link.getAttribute("href") === "#" + entrada.target.id;
            link.classList.toggle("esta-ativo", estaAtivo);

            if (estaAtivo) {
              link.setAttribute("aria-current", "true");
            } else {
              link.removeAttribute("aria-current");
            }
          });
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    secoes.forEach(function (secao) {
      observador.observe(secao);
    });
  }

  /* ----------------------------------------------------------
     3. Acordeao das disciplinas por semestre
     ---------------------------------------------------------- */
  function iniciarAcordeao() {
    var gatilhos = document.querySelectorAll(".acordeao__gatilho");

    gatilhos.forEach(function (gatilho) {
      gatilho.addEventListener("click", function () {
        var painel = document.getElementById(gatilho.getAttribute("aria-controls"));

        if (!painel) {
          return;
        }

        var vaiAbrir = gatilho.getAttribute("aria-expanded") === "false";
        gatilho.setAttribute("aria-expanded", String(vaiAbrir));
        painel.hidden = !vaiAbrir;
      });
    });
  }

  /* ----------------------------------------------------------
     4. Aparecimento suave dos cartoes ao rolar a pagina
     ---------------------------------------------------------- */
  function iniciarAnimacaoDeEntrada() {
    var elementos = Array.prototype.slice.call(document.querySelectorAll(".animar"));

    if (!elementos.length) {
      return;
    }

    if (querMenosMovimento || !("IntersectionObserver" in window)) {
      elementos.forEach(function (elemento) {
        elemento.classList.add("esta-visivel");
      });
      return;
    }

    var observador = new IntersectionObserver(
      function (entradas, instancia) {
        entradas.forEach(function (entrada) {
          if (entrada.isIntersecting) {
            entrada.target.classList.add("esta-visivel");
            instancia.unobserve(entrada.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
    );

    elementos.forEach(function (elemento) {
      observador.observe(elemento);
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    iniciarMenu();
    iniciarDestaqueDoMenu();
    iniciarAcordeao();
    iniciarAnimacaoDeEntrada();
  });
})();
