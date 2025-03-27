let imagem = null; //  para armazenar o arquivo globalmente

// permite só JPG e JPEG
function validateImage(arq) {
  return arq && (arq.type === "image/jpeg" || arq.type === "image/png");
}

// para exibir a pré-visualizacao na tela
function showImage(arq) {
  const img = document.getElementById("visualizar");
  img.src = URL.createObjectURL(arq);
  img.style.display = "block";
}

// função unificada para processar o arquivo
function handleFile(arq) {
  if (!validateImage(arq)) {
    alert("Apenas imagens JPG/PNG são permitidas!");
    return;
  } else if (arq.size > 500 * 1024) {
    alert("O arquivo deve ter no máximo 500KB!");
    return;
  }
  imagem = arq; // manda p/ variavel global
  showImage(arq);
}

//quando o usuario solta o arquivo
function dropHandler(ev) {
  ev.preventDefault();

  const arq = ev.dataTransfer.files[0];

  if (arq) {
    handleFile(arq);
  } else {
    alert("Nenhum arquivo válido foi arrastado!");
  }
}

//seleciona manualmente um arquivo (input)
function fileSelected(event) {
  const arq = event.target.files[0];
  handleFile(arq);
}

// gerar o ticket e passar os dados para outra página
function generateTicket() {
  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const github = document.getElementById("github").value;

  if (!nome || !email || !github || !imagem) {
    alert("Preencha todos os campos e selecione uma imagem JPG/JPEG!");
    return;
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    alert("Insira um e-mail válido!");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    // quando terminar de carregar a imagem, faz a funcao
    const ticketData = {
      nome,
      email,
      github,
      image: e.target.result,
    };

    localStorage.setItem("ticketData", JSON.stringify(ticketData));
    window.location.href = "ticket.html";
  };
  reader.readAsDataURL(imagem); //transforma em url
}
//carregar o tkt na pagina do ticket
function loadTicket() {
  const ticketData = JSON.parse(localStorage.getItem("ticketData"));

  if (ticketData) {
    document.getElementById("ticket-nome-h").textContent = ticketData.nome;
    document.getElementById("ticket-nome").textContent = ticketData.nome;
    document.getElementById("ticket-email").textContent = ticketData.email;
    document.getElementById("ticket-github").textContent = ticketData.github;

    if (ticketData.image) {
      const img = document.getElementById("ticket-image");
      img.src = ticketData.image;
      img.style.display = "block";
    }
  }
}
