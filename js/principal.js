/* principal.js: comportamentos do site do curso de Engenharia de Software.
   Sao quatro: progresso das fases (acende na trilha o no da secao que esta
   na tela), acordeao das disciplinas, placar de fases abertas e aparecimento
   suave dos cartoes. A trilha e a unica navegacao da pagina.
   Tudo em JavaScript puro, sem bibliotecas externas. */

(function () {
  "use strict";

  var querMenosMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ----------------------------------------------------------
     1. Progresso das fases
     A secao visivel vira a fase atual e acende na trilha.
     Toda fase que ficou para tras conta como concluida, e o no da fase
     atual e trazido para o centro da trilha, que rola de lado.
     ---------------------------------------------------------- */
  function iniciarProgressoDasFases() {
    var itens = Array.prototype.slice.call(document.querySelectorAll(".trilha__item"));
    var trilha = document.getElementById("trilha");

    /* cada fase e um par: o no da trilha e a secao para onde ele aponta.
       Guardar os dois juntos evita que as duas listas saiam de sincronia
       se um no apontar para uma secao que nao existe. */
    var fases = itens
      .map(function (item) {
        var no = item.querySelector(".trilha__no");
        var secao = no && document.querySelector(no.getAttribute("href"));
        return secao ? { item: item, no: no, secao: secao } : null;
      })
      .filter(Boolean);

    if (!fases.length) {
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

      fases.forEach(function (fase, i) {
        var caixa = fase.secao.getBoundingClientRect();
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

      fases.forEach(function (fase, i) {
        fase.item.classList.toggle("esta-atual", i === indice);
        fase.item.classList.toggle("esta-concluida", i < indice);

        if (i === indice) {
          fase.no.setAttribute("aria-current", "true");
        } else {
          fase.no.removeAttribute("aria-current");
        }
      });

      centralizarNaTrilha(fases[indice].item);
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
     2. Acordeao das disciplinas por semestre
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
     3. Placar das fases do curso
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
    iniciarProgressoDasFases();
    iniciarAcordeao();
    atualizarPlacar();
    iniciarAnimacaoDeEntrada();
  });
})();
