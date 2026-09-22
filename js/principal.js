/* principal.js: comportamentos do site do curso de Engenharia de Software.
   Sao cinco: menu sanfona no celular, progresso das fases (que acende o
   item de menu e o no da trilha da secao visivel), acordeao das disciplinas,
   placar de fases abertas e aparecimento suave dos cartoes.
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
     2. Progresso das fases
     A secao visivel vira a fase atual: acende no menu e na trilha.
     Toda fase que ficou para tras conta como concluida, e o no da fase
     atual e trazido para o centro da trilha, que rola de lado.
     ---------------------------------------------------------- */
  function iniciarProgressoDasFases() {
    var links = Array.prototype.slice.call(document.querySelectorAll(".navegacao__link"));
    var itens = Array.prototype.slice.call(document.querySelectorAll(".trilha__item"));
    var trilha = document.getElementById("trilha");
    var secoes = links
      .map(function (link) {
        return document.querySelector(link.getAttribute("href"));
      })
      .filter(Boolean);

    if (!secoes.length) {
      return;
    }

    var faseAtual = -1;

    function centralizarNaTrilha(item) {
      if (!trilha || trilha.scrollWidth <= trilha.clientWidth) {
        return;
      }

      var alvo = item.offsetLeft - (trilha.clientWidth - item.offsetWidth) / 2;
      trilha.scrollTo({
        left: Math.max(alvo, 0),
        behavior: querMenosMovimento ? "auto" : "smooth",
      });
    }

    /* a fase atual e a secao que esta ocupando o meio da tela. Medir a
       posicao direto e mais confiavel do que reagir a eventos de entrada,
       porque funciona subindo, descendo e em salto de ancora. */
    function indiceDaSecaoNoMeio() {
      var meio = window.innerHeight / 2;
      var escolhido = 0;
      var menorDistancia = Infinity;

      secoes.forEach(function (secao, i) {
        var caixa = secao.getBoundingClientRect();
        var distancia =
          caixa.top <= meio && caixa.bottom >= meio
            ? 0
            : Math.min(Math.abs(caixa.top - meio), Math.abs(caixa.bottom - meio));

        if (distancia < menorDistancia) {
          menorDistancia = distancia;
          escolhido = i;
        }
      });

      return escolhido;
    }

    function marcar(indice) {
      if (indice === faseAtual) {
        return;
      }

      faseAtual = indice;
      var id = secoes[indice].id;

      links.forEach(function (link) {
        var estaAtivo = link.getAttribute("href") === "#" + id;
        link.classList.toggle("esta-ativo", estaAtivo);

        if (estaAtivo) {
          link.setAttribute("aria-current", "true");
        } else {
          link.removeAttribute("aria-current");
        }
      });

      itens.forEach(function (item, i) {
        var no = item.querySelector(".trilha__no");
        item.classList.toggle("esta-atual", i === indice);
        item.classList.toggle("esta-concluida", i < indice);

        if (!no) {
          return;
        }

        if (i === indice) {
          no.setAttribute("aria-current", "true");
        } else {
          no.removeAttribute("aria-current");
        }
      });

      if (itens[indice]) {
        centralizarNaTrilha(itens[indice]);
      }
    }

    /* a leitura roda no maximo uma vez por quadro de animacao, para nao
       pesar durante a rolagem */
    var agendado = false;

    function agendarLeitura() {
      if (agendado) {
        return;
      }

      agendado = true;
      window.requestAnimationFrame(function () {
        agendado = false;
        marcar(indiceDaSecaoNoMeio());
      });
    }

    window.addEventListener("scroll", agendarLeitura, { passive: true });
    window.addEventListener("resize", agendarLeitura);
    marcar(indiceDaSecaoNoMeio());
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
        atualizarPlacar();
      });
    });
  }

  /* ----------------------------------------------------------
     4. Placar das fases do curso
     Conta quantos semestres a pessoa ja abriu. E so um incentivo
     visual: nenhuma fase fica bloqueada de verdade.
     ---------------------------------------------------------- */
  function atualizarPlacar() {
    var valor = document.getElementById("placar-valor");

    if (!valor) {
      return;
    }

    var abertas = document.querySelectorAll(
      '.acordeao--fases .acordeao__gatilho[aria-expanded="true"]'
    ).length;

    valor.textContent = abertas < 10 ? "0" + abertas : String(abertas);
  }

  /* ----------------------------------------------------------
     5. Aparecimento suave dos cartoes ao rolar a pagina
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
    iniciarProgressoDasFases();
    iniciarAcordeao();
    atualizarPlacar();
    iniciarAnimacaoDeEntrada();
  });
})();
