let selectedFile = null; // Variável global para armazenar o arquivo

// Permite apenas JPG e JPEG
function isValidImage(file) {
  return (
    file &&
    (file.type === "image/jpeg" ||
      file.name.toLowerCase().endsWith(".jpg") ||
      file.name.toLowerCase().endsWith(".jpeg"))
  );
}

function dragOverHandler(ev) {
  console.log("File(s) in drop zone");

  // Prevent default behavior (Prevent file from being opened)
  ev.preventDefault();
}

// Exibe a imagem na tela
function displayImage(file) {
  const reader = new FileReader();
  reader.onload = function (e) {
    const imgElement = document.getElementById("preview");
    imgElement.src = e.target.result;
    imgElement.style.display = "block"; // Torna a imagem visível
  };
  reader.readAsDataURL(file);
}

// Função unificada para processar o arquivo
function handleFile(file) {
  if (!isValidImage(file)) {
    alert("Apenas imagens JPG/JPEG são permitidas!");
    return;
  }
  selectedFile = file; // Salva o arquivo globalmente
  displayImage(file); // Exibe a imagem
}

// Quando o usuário arrasta e solta o arquivo
function dropHandler(ev) {
  ev.preventDefault();
  let file = null;

  if (ev.dataTransfer.items) {
    // Para navegadores modernos
    [...ev.dataTransfer.items].forEach((item) => {
      if (item.kind === "file") {
        file = item.getAsFile();
      }
    });
  } else {
    // Para navegadores antigos
    file = ev.dataTransfer.files[0];
  }

  if (file) {
    handleFile(file);
  } else {
    alert("Nenhum arquivo válido foi arrastado!");
  }
}

// Quando o usuário seleciona manualmente um arquivo
function fileSelected(event) {
  const file = event.target.files[0];
  handleFile(file);
}

// Gera o ticket e passa os dados para outra página
function generateTicket() {
  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const github = document.getElementById("github").value;

  if (!nome || !email || !github || !selectedFile) {
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
      fileName: selectedFile.name,
      imageData: e.target.result, // Salva a imagem como Base64
    };

    localStorage.setItem("ticketData", JSON.stringify(ticketData));
    window.location.href = "ticket.html";
  };
  reader.readAsDataURL(selectedFile);
}
