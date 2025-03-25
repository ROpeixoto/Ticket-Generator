let imagem = null; //  para armazenar o arquivo globalmente

// permite só JPG e JPEG
function validarImagem(arq) {
  return arq && (arq.type === "image/jpeg" || arq.type === "image/png");
}

function dragOverHandler(ev) {
  console.log("Pode Soltar");

  ev.preventDefault(); // para nao abrir a imagem na tela
}

// para exibir a pré-visualizacao na tela
function showImage(arq) {
  const img = document.getElementById("visualizar");
  img.src = URL.createObjectURL(arq);
  img.style.display = "block";
}

// função unificada para processar o arquivo
function handleFile(arq) {
  if (!validarImagem(arq)) {
    alert("Apenas imagens JPG/PNG são permitidas!");
    return;
  } else if (arq.size > 500 * 1024) {
    alert("O arquivo deve ter no máximo 500KB!");
    return;
  }
  imagem = arq; // manda p variavel global
  showImage(arq); // exibe a imagem
}

//quando o usuario solta o arquivo
function dropHandler(ev) {
  ev.preventDefault(); // para nao abrir a imagem na tela

  // acessa o arquivo arrastado
  const arq = ev.dataTransfer.files[0];

  if (arq) {
    handleFile(arq); // manda pra funçao abrir ou negar o arquivo
  } else {
    alert("Nenhum arquivo válido foi arrastado!");
  }
}

// Quando o usuário seleciona manualmente um arquivo
function fileSelected(event) {
  const arq = event.target.files[0];
  handleFile(arq);
}

// Gera o ticket e passa os dados para outra página
function generateTicket() {
  const nome = document.getElementById("nome").value; //pegando todos os valores do input no index
  const email = document.getElementById("email").value;
  const github = document.getElementById("github").value;

  if (!nome || !email || !github || !imagem) {
    alert("Preencha todos os campos e selecione uma imagem JPG/JPEG!");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    // quando terminar de carregar a imagem, faz a funcao
    const ticketData = {
      //cria objeto ticket, com todas as infos e a imagem
      nome,
      email,
      github,
      imageData: e.target.result,
    };

    localStorage.setItem("ticketData", JSON.stringify(ticketData)); //salva os dados no localstorage
    window.location.href = "ticket.html"; // leva para a janela do tkt
  };
  reader.readAsDataURL(imagem); //transforma em url b64
}
