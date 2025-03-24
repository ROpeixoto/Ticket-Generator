let imagem = null; //  para armazenar o arquivo globalmente

// permite só JPG e JPEG
function validarImagem(arq) {
  return arq && arq.type === "image/jpeg";
}

function dragOverHandler(ev) {
  console.log("File(s) in drop zone");

  ev.preventDefault();  // para nao abrir a imagem na tela
}

// para exibir a pré-visualizacao na tela
function showImage(arq) {
  const img = document.getElementById("visualizar");
  img.src = URL.createObjectURL(arq);
  img.style.display = "block";
}

// Função unificada para processar o arquivo
function handleFile(arq) {
  if (!validarImagem(arq)) {
    alert("Apenas imagens JPG/JPEG são permitidas!");
    return;
  }
  imagem = arq; // manda p variavel global
  showImage(arq); // Exibe a imagem
}

// Quando o usuário arrasta e solta o arquivo
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
  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const github = document.getElementById("github").value;

  if (!nome || !email || !github || !imagem) {
    alert(
      "Por favor, preencha todos os campos e selecione uma imagem JPG/JPEG!"
    );
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    const ticketData = {
      nome,
      email,
      github,
      imageData: e.target.result, // Salva a imagem como Base64
    };

    localStorage.setItem("ticketData", JSON.stringify(ticketData));
    window.location.href = "ticket.html";
  };
  reader.readAsDataURL(imagem);
}