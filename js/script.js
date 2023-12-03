// Adiciona um ouvinte de evento para o botão de recarregar
document.getElementById("btnRecarregar").addEventListener("click", function () {
  // Recarrega a página
  location.reload(true); // O parâmetro true força o recarregamento do servidor, ignorando o cache
});

document.addEventListener("DOMContentLoaded", function () {
  // Adiciona escutadores de eventos aos elementos relevantes
  var passaro = document.getElementById("passaro");
  var lagarta = document.getElementById("lagarta");
  var caixaDestino1 = document.getElementById("caixa-destino");
  var caixaDestino2 = document.getElementById("caixa-destino2");
  var caixaPar1 = document.getElementById("caixa-par1");
  var caixaPar2 = document.getElementById("caixa-par2");
  var modal = document.getElementById("modal");

  // Suponha que você tenha uma imagem com o ID "minhaImagem" no seu HTML.
  var minhaImagem = document.getElementById("novaModalImg");

  var qtde = 0;

  // Armazena a posição inicial do passaro

  passaro.addEventListener("dragstart", iniciarArraste);
  lagarta.addEventListener("dragstart", iniciarArraste);
  caixaDestino1.addEventListener("drop", soltar);
  caixaDestino1.addEventListener("dragover", permitirSoltar);
  caixaDestino2.addEventListener("drop", soltar);
  caixaDestino2.addEventListener("dragover", permitirSoltar);
  caixaPar1.addEventListener("drop", soltar);
  caixaPar1.addEventListener("dragover", permitirSoltar);
  caixaPar2.addEventListener("drop", soltar);
  caixaPar2.addEventListener("dragover", permitirSoltar);

  function iniciarArraste(event) {
    // Define a transferência de dados como o ID da imagem
    event.dataTransfer.setData("text", event.target.id);
  }

  function soltar(event) {
    // Impede o comportamento padrão de abrir a imagem em uma nova aba
    event.preventDefault();
    // Obtém o ID da imagem que está sendo arrastada
    var idImagem = event.dataTransfer.getData("text");
    // Obtém a referência à imagem pelo ID
    var imagem = document.getElementById(idImagem);
    
    // Verifica qual é a caixa de destino
    if (event.target === caixaDestino1) {
      // Adiciona a imagem à caixa de destino 1
      event.target.appendChild(imagem);
      // Oculta a caixa de destino 2
      caixaDestino2.classList.add("oculto");
      //oculta as caixas par
      ocultarCaixasPar();
      if (idImagem == "passaro") {
        // Novo caminho para a imagem que você deseja definir dinamicamente.
        var novoCaminhoDaImagem = "imagens/passaro_arvore.jpeg";
        // Altera o atributo src da imagem dinamicamente.
        minhaImagem.src = novoCaminhoDaImagem;
        // Exibe o modal
        abrirPassaro("modalPassaro");
        //===== modal_passaro_arvore.style.display = "flex";

        // alert("Olá" + idImagem);
        abrirPassaro("modalPassaro");
      } else {
        var novoCaminhoDaImagem = "imagens/lagarta_arvore.jpeg";
        // Altera o atributo src da imagem dinamicamente.
        minhaImagem.src = novoCaminhoDaImagem;
        // Exibe o modal
        abrirPassaro("modalLagartixa");
      }
       
    } else if (event.target === caixaDestino2) {
      // Adiciona a imagem à caixa de destino 2
      event.target.appendChild(imagem);
      // Oculta a caixa de destino 1
      caixaDestino1.classList.add("oculto");
      ocultarCaixasPar();
      if (idImagem == "lagarta") {
        var novoCaminhoDaImagem = "imagens/lagarta_arvore.jpeg";
        // Altera o atributo src da imagem dinamicamente.
        minhaImagem.src = novoCaminhoDaImagem;
        abrirPassaro("modalLagartixa");
        } else {
           var novoCaminhoDaImagem = "imagens/passaro_arvore2.jpeg";
           // Altera o atributo src da imagem dinamicamente.
           minhaImagem.src = novoCaminhoDaImagem;
        abrirPassaro("modalPassaro2");
      }
     // abrirPassaro("modalLagartixa");
      //modal.style.display = "flex";
    } else if (event.target === caixaPar1) {
      // Adiciona a imagem à caixa de par1
      event.target.appendChild(imagem);
      qtde++;
      // Verifica se ambas as caixas "caixaPar1" e "caixaPar2" têm imagens
      verificarExibicaoModal();
    } else if (event.target === caixaPar2) {
      // Adiciona a imagem à caixa de par 2
      event.target.appendChild(imagem);
      // Verifica se ambas as caixas "caixaPar1" e "caixaPar2" têm imagens
      qtde++;
      verificarExibicaoModal();
    }

    // Função para ocultar as caixas "caixa-par"
    function ocultarCaixasPar() {
      caixaPar1.classList.add("oculto");
      caixaPar2.classList.add("oculto");
    }

    // Função para verificar se ambas as caixas "caixaPar1" e "caixaPar2" têm imagens
    function verificarExibicaoModal() {
      if (!(caixaPar1.hasChildNodes() && caixaPar2.hasChildNodes())) {
        // Exibe o modal quando ambas as caixas têm imagens
        modal.style.display = "flex";
      } else {
        // Oculta as caixas de destino 1 e 2 se as caixas "caixaPar1" e "caixaPar2" não tiverem imagens
        caixaDestino1.classList.add("oculto");
        caixaDestino2.classList.add("oculto");
      }
      if (qtde === 2) {
        modal.style.display = "flex";
      }
    }

    // Função para fechar a nova modal com a imagem
    window.fecharNovaModal = function () {
      document.getElementById("novaModal").style.display = "none";
    };

    // Função para abrir a nova modal com a imagem
    function abrirNovaModal() {
      document.getElementById("novaModal").style.display = "flex";
    }

    // Modifique a função fecharModal para abrir a nova modal ao fechar o vídeo
    window.fecharModal = function () {
      modal.style.display = "none";
      abrirNovaModal();
    };

    // Função chamada quando o player do YouTube está pronto
    function onPlayerReady(event) {
      // Inicia a reprodução do vídeo
      event.target.playVideo();
    }

    function fecharModal(idModal) {
       var jan = document.getElementById(idModal);
            jan.style.display = "none";
             abrirNovaModal();
      
    }

    //MODAL PÁSSARO-ARVORE
    function abrirPassaro(idModal) {
      var jan = document.getElementById(idModal);
      jan.style.display = "flex";
    }

    /*
    function fecharPassaro(idModal) {
      var jan = document.getElementById(idModal);
      jan.style.display = "none";
      abrirNovaModal();
    }*/

    // Reseta a posição do passaro
    resetarPosicao();
  }
});

function permitirSoltar(event) {
  // Impede o comportamento padrão de não permitir o soltar
  event.preventDefault();
}

// Função para resetar a posição do passaro
function resetarPosicao() {
  passaro.style.position = "relative";
  passaro.style.left = "0";
  passaro.style.top = "0";
}
/*
// Função para fechar o modal
function fecharModal() {
  modal.style.display = "none";
  resetarPosicao();
}*/
