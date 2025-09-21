let ContPerguta = 0;
let TotalCorretas = 0;
let aliatorio = Math.floor(Math.random() * 60);
let perguntasEmbaralhadas = []; // Array para armazenar as perguntas embaralhadas

const btnEntrar = document.querySelector(".entrar");
const btnProximo = document.querySelector(".proximo");
const btnCadastro = document.querySelector(".btnCadastro");
const Boas_vindas = document.querySelector(".Boas_vindas");
const cadastro = document.querySelector(".cadastro");
const NomeUsuario = document.querySelector("#nome");
const JogoQuiz = document.querySelector(".JogoQuiz");
const Questao = document.querySelector(".pergunta");
const DivOpcoes = document.querySelector(".opcoes");
let btnOpcao = document.querySelectorAll(".opcao");


function embaralharPerguntas() {
  // Cópia do array original
  perguntasEmbaralhadas = [...PERGUNTAS];
  
  // Algoritmo Fisher-Yates para embaralhar
  for (let i = perguntasEmbaralhadas.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [perguntasEmbaralhadas[i], perguntasEmbaralhadas[j]] = [perguntasEmbaralhadas[j], perguntasEmbaralhadas[i]];
  }
}

function EntrarNoJogo() {
  let audio;
  audio = document.querySelector("#somEntrar");
  if (audio) {
    audio.currentTime = 0; // começa do início sempre
    audio.play();
  }
  cadastro.classList.remove("esconder");
  btnCadastro.classList.remove("esconder");
  Boas_vindas.classList.add("esconder");
  btnEntrar.classList.add("esconder");
}

function ComecarJogar() {
  if (NomeUsuario.value == "") {
    NomeUsuario.focus();
    NomeUsuario.setCustomValidity("Por favor, preencha o nome de usuário.");
    NomeUsuario.reportValidity();
    NomeUsuario.addEventListener("input", () => {
      NomeUsuario.setCustomValidity("");
    });
  } else {
    cadastro.classList.add("esconder");
    JogoQuiz.classList.remove("esconder");
    Boas_vindas.classList.add("esconder");
    btnCadastro.classList.add("esconder");
    var nome = NomeUsuario.value;
  }

  audio = document.querySelector("#somFundo");
  if (audio) {
    audio.currentTime = 0; //começa do início 
    audio.play();
  }

  // Embaralhar as perguntas antes de começar o jogo
  embaralharPerguntas();
  TrocarPergunta();
}

function TrocarPergunta() {
  LimparPergunta();

  if (perguntasEmbaralhadas.length === ContPerguta) {
    return FinalDoJogo();
  }

  Questao.textContent = perguntasEmbaralhadas[ContPerguta].pergunta;

  perguntasEmbaralhadas[ContPerguta].opcoes.forEach(novosBtn => {
    const btnsNovos = document.createElement("button");
    btnsNovos.classList.add("opcao", "button");
    btnsNovos.textContent = novosBtn.opcao;

    if (novosBtn.resposta) {
      btnsNovos.dataset.resposta = novosBtn.resposta;
    }

    DivOpcoes.appendChild(btnsNovos);
    btnsNovos.addEventListener("click", SelecionarOpcao);
  })
}

function LimparPergunta() {
  while (DivOpcoes.firstChild) {
    DivOpcoes.removeChild(DivOpcoes.firstChild);
  }

  btnProximo.classList.add("esconder");
}

function SelecionarOpcao(evento) {
  const verificarOpcaoClicada = evento.target;
  let audio;
  if (verificarOpcaoClicada.dataset.resposta) {
    audio = document.querySelector("#somAcerto");
    TotalCorretas++;
  } else {
    audio = document.querySelector("#somErro");
  }

  if (audio) {
    audio.currentTime = 0; // começa do início sempre
    audio.play();
  }

  btnOpcao = document.querySelectorAll(".opcao");
  btnOpcao.forEach(botao => {
    botao.disabled = true;

    if (botao.dataset.resposta) {
      botao.classList.add("certo");
    } else {
      botao.classList.add("errado");
    }
  });

  btnProximo.classList.remove("esconder");
  ContPerguta++;
}

function FinalDoJogo() {
  const totalPerguntas = perguntasEmbaralhadas.length;
  const performance = Math.floor(TotalCorretas * 100 / totalPerguntas);

  let mensagem = "";

  switch (true) {
    case (performance >= 90):
      mensagem = `🎉🔥Excelente🔥🎉 Parabéns😁 ${nome.value} `
      break
    case (performance >= 70):
      mensagem = `Estiveste muito bem ${nome.value}😄`
      break
    case (performance >= 50):
      mensagem = `Estiveste bem ${nome.value}🙂`
      break
    default:
      mensagem = `${nome.value} podes melhorar 🤨`
  }

  JogoQuiz.innerHTML =
    `
    <p class="mensagem_final">
      Você acertou ${TotalCorretas} de ${totalPerguntas} questões!
      <span>Resultado: ${mensagem}</span>
    </p>
    <button 
      onclick=window.location.reload() 
      class="btnRecomecar"
    >
      Voltar a Jogar
    </button>
  `

  // Guardar Historico
  localStorage.Usuario = nome.value;
  localStorage.potuacao = TotalCorretas;
}

function verPontuacao() {
  const UltimoUser = localStorage.Usuario;
  const UltimaPont = localStorage.potuacao;
  alert(`Ultimo Jogador: ${UltimoUser}, Pontuação: ${UltimaPont}`);
}

// ->>>>>>>> PERGUNTAS <<<<<<<<<-
const PERGUNTAS = [
  {
    pergunta: "O que é considerado o “cérebro” do computador?",
    opcoes: [
      { opcao: "a) Disco rígido", resposta: false },
      { opcao: "b) CPU", resposta: true },
      { opcao: "c) Monitor", resposta: false },
      { opcao: "d) Teclado", resposta: false }
    ]
  },
  {
    pergunta: "Qual destes é um dispositivo de saída?",
    opcoes: [
      { opcao: "a) Impressora", resposta: true },
      { opcao: "b) Teclado", resposta: false },
      { opcao: "c) Mouse", resposta: false },
      { opcao: "d) Scanner", resposta: false }
    ]
  },
  {
    pergunta: "O sistema operacional Windows é desenvolvido por qual empresa?",
    opcoes: [
      { opcao: "a) Apple", resposta: false },
      { opcao: "b) Microsoft", resposta: true },
      { opcao: "c) Google", resposta: false },
      { opcao: "d) IBM", resposta: false }
    ]
  },
  {
    pergunta: "(V/F) O monitor é um dispositivo de entrada de dados.",
    opcoes: [
      { opcao: "Verdadeiro", resposta: false },
      { opcao: "Falso", resposta: true }
    ]
  },
  {
    pergunta: "Qual destes armazena dados permanentemente?",
    opcoes: [
      { opcao: "a) RAM", resposta: false },
      { opcao: "b) HD", resposta: true },
      { opcao: "c) Cache", resposta: false },
      { opcao: "d) Registrador", resposta: false }
    ]
  },
  {
    pergunta: "A sigla 'PC' significa:",
    opcoes: [
      { opcao: "a) Personal Computer", resposta: true },
      { opcao: "b) Power Control", resposta: false },
      { opcao: "c) Process Control", resposta: false },
      { opcao: "d) Private Connection", resposta: false }
    ]
  },
  {
    pergunta: "(V/F) O mouse é um periférico de entrada.",
    opcoes: [
      { opcao: "Verdadeiro", resposta: true },
      { opcao: "Falso", resposta: false }
    ]
  },
  {
    pergunta: "Qual é o sistema operacional dos iPhones?",
    opcoes: [
      { opcao: "a) iOS", resposta: true },
      { opcao: "b) Android", resposta: false },
      { opcao: "c) Windows Phone", resposta: false },
      { opcao: "d) Symbian", resposta: false }
    ]
  },
  {
    pergunta: "O que significa a sigla USB?",
    opcoes: [
      { opcao: "a) Universal Serial Bus", resposta: true },
      { opcao: "b) Unique System Base", resposta: false },
      { opcao: "c) User Standard Block", resposta: false },
      { opcao: "d) Unified System Backup", resposta: false }
    ]
  },
  {
    pergunta: "(V/F) A memória RAM perde os dados quando o computador é desligado.",
    opcoes: [
      { opcao: "Verdadeiro", resposta: true },
      { opcao: "Falso", resposta: false }
    ]
  },
  {
    pergunta: "Qual destes NÃO é um sistema operacional?",
    opcoes: [
      { opcao: "a) Linux", resposta: false },
      { opcao: "b) Android", resposta: false },
      { opcao: "c) Google Chrome", resposta: true },
      { opcao: "d) Windows", resposta: false }
    ]
  },
  {
    pergunta: "A memória cache está localizada entre:",
    opcoes: [
      { opcao: "a) RAM e Disco rígido", resposta: false },
      { opcao: "b) CPU e RAM", resposta: true },
      { opcao: "c) GPU e Monitor", resposta: false },
      { opcao: "d) Placa-mãe e Fonte", resposta: false }
    ]
  },
  {
    pergunta: "(V/F) Um byte é formado por 10 bits.",
    opcoes: [
      { opcao: "Verdadeiro", resposta: false },
      { opcao: "Falso", resposta: true }
    ]
  },
  {
    pergunta: "Qual destes dispositivos é usado para conectar computadores em rede?",
    opcoes: [
      { opcao: "a) Roteador", resposta: true },
      { opcao: "b) Impressora", resposta: false },
      { opcao: "c) Pen Drive", resposta: false },
      { opcao: "d) Monitor", resposta: false }
    ]
  },
  {
    pergunta: "O que significa a sigla BIOS?",
    opcoes: [
      { opcao: "a) Basic Input Output System", resposta: true },
      { opcao: "b) Binary Internal Operating System", resposta: false },
      { opcao: "c) Base Instruction Over System", resposta: false },
      { opcao: "d) Bus Integrated Operating System", resposta: false }
    ]
  },
  {
    pergunta: "(V/F) O Linux é um sistema operacional de código aberto.",
    opcoes: [
      { opcao: "Verdadeiro", resposta: true },
      { opcao: "Falso", resposta: false }
    ]
  },
  {
    pergunta: "Qual destes é um periférico híbrido (entrada e saída)?",
    opcoes: [
      { opcao: "a) Pendrive", resposta: true },
      { opcao: "b) Teclado", resposta: false },
      { opcao: "c) Scanner", resposta: false },
      { opcao: "d) Caixa de som", resposta: false }
    ]
  },
  {
    pergunta: "A placa responsável pela exibição de imagens é:",
    opcoes: [
      { opcao: "a) Placa de Som", resposta: false },
      { opcao: "b) Placa de Rede", resposta: false },
      { opcao: "c) Placa de Vídeo", resposta: true },
      { opcao: "d) Placa-mãe", resposta: false }
    ]
  },
  {
    pergunta: "(V/F) O antivírus serve apenas para limpar vírus já instalados, não para prevenir.",
    opcoes: [
      { opcao: "Verdadeiro", resposta: false },
      { opcao: "Falso", resposta: true }
    ]
  },
  {
    pergunta: "Qual desses processadores é da Intel?",
    opcoes: [
      { opcao: "a) Ryzen 5", resposta: false },
      { opcao: "b) Core i7", resposta: true },
      { opcao: "c) Snapdragon", resposta: false },
      { opcao: "d) Apple M1", resposta: false }
    ]
  },
  {
    pergunta: "Qual foi o primeiro computador eletrônico de propósito geral?",
    opcoes: [
      { opcao: "a) Colossus", resposta: false },
      { opcao: "b) ENIAC", resposta: true },
      { opcao: "c) IBM 650", resposta: false },
      { opcao: "d) Univac", resposta: false }
    ]
  },
  {
    pergunta: "(V/F) O barramento PCI Express é mais rápido que o antigo AGP.",
    opcoes: [
      { opcao: "Verdadeiro", resposta: true },
      { opcao: "Falso", resposta: false }
    ]
  },
  {
    pergunta: "Qual é a principal função do kernel no sistema operacional?",
    opcoes: [
      { opcao: "a) Exibir interface gráfica", resposta: false },
      { opcao: "b) Controlar hardware e recursos do sistema", resposta: true },
      { opcao: "c) Gerar relatórios", resposta: false },
      { opcao: "d) Instalar programas", resposta: false }
    ]
  },
  {
    pergunta: "Qual destes NÃO é um tipo de memória volátil?",
    opcoes: [
      { opcao: "a) RAM", resposta: false },
      { opcao: "b) Cache", resposta: false },
      { opcao: "c) Registrador", resposta: false },
      { opcao: "d) ROM", resposta: true }
    ]
  },
  {
    pergunta: "(V/F) RAID 0 garante tolerância a falhas.",
    opcoes: [
      { opcao: "Verdadeiro", resposta: false },
      { opcao: "Falso", resposta: true }
    ]
  },
  {
    pergunta: "Em arquitetura de computadores, qual é a função da ALU (Unidade Lógica e Aritmética)?",
    opcoes: [
      { opcao: "a) Gerenciar energia", resposta: false },
      { opcao: "b) Executar cálculos matemáticos e lógicos", resposta: true },
      { opcao: "c) Controlar memória", resposta: false },
      { opcao: "d) Armazenar programas", resposta: false }
    ]
  },
  {
    pergunta: "Qual foi o primeiro sistema operacional desenvolvido pela Microsoft?",
    opcoes: [
      { opcao: "a) Windows 95", resposta: false },
      { opcao: "b) MS-DOS", resposta: true },
      { opcao: "c) Windows XP", resposta: false },
      { opcao: "d) OS/2", resposta: false }
    ]
  },
  {
    pergunta: "(V/F) O protocolo TCP/IP é a base de comunicação da internet.",
    opcoes: [
      { opcao: "Verdadeiro", resposta: true },
      { opcao: "Falso", resposta: false }
    ]
  },
  {
    pergunta: "Qual destes NÃO é um tipo de virtualização?",
    opcoes: [
      { opcao: "a) VirtualBox", resposta: false },
      { opcao: "b) VMware", resposta: false },
      { opcao: "c) Docker", resposta: false },
      { opcao: "d) Firewall", resposta: true }
    ]
  },
  {
    pergunta: "O que significa a sigla SSD?",
    opcoes: [
      { opcao: "a) Solid State Drive", resposta: true },
      { opcao: "b) System Software Disk", resposta: false },
      { opcao: "c) Secure Storage Device", resposta: false },
      { opcao: "d) Static Storage Data", resposta: false }
    ]
  }
] 