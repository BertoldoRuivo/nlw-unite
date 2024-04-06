let participantes = [
  {
    nome: "Guilherme Bertoldo",
    email: "guilherme@gmail.com",
    dataInscricao: new Date(2024, 2, 22, 19, 20),
    dataCheckIn: new Date(2024, 2, 25, 22, 00)
  },
  {
    nome: "Ana Silva",
    email: "ana.silva@example.com",
    dataInscricao: new Date(2024, 2, 23, 10, 30),
    dataCheckIn: null
  },
  {
    nome: "Carlos Oliveira",
    email: "carlos.oliveira@example.com",
    dataInscricao: new Date(2024, 2, 24, 15, 45),
    dataCheckIn: new Date(2024, 2, 27, 18, 20)
  },
  {
    nome: "Maria Souza",
    email: "maria.souza@example.com",
    dataInscricao: new Date(2024, 2, 25, 8, 0),
    dataCheckIn: new Date(2024, 2, 28, 10, 30)
  },
  {
    nome: "Pedro Santos",
    email: "pedro.santos@example.com",
    dataInscricao: new Date(2024, 2, 26, 14, 20),
    dataCheckIn: new Date(2024, 2, 29, 17, 45)
  },
  {
    nome: "Camila Oliveira",
    email: "camila.oliveira@example.com",
    dataInscricao: new Date(2024, 2, 27, 11, 10),
    dataCheckIn: new Date(2024, 2, 30, 13, 25)
  },
  {
    nome: "Felipe Silva",
    email: "felipe.silva@example.com",
    dataInscricao: new Date(2024, 2, 28, 17, 30),
    dataCheckIn: new Date(2024, 3, 1, 20, 40)
  },
  {
    nome: "Juliana Martins",
    email: "juliana.martins@example.com",
    dataInscricao: new Date(2024, 2, 29, 9, 15),
    dataCheckIn: new Date(2024, 3, 2, 11, 30)
  },
  {
    nome: "Rafaela Lima",
    email: "rafaela.lima@example.com",
    dataInscricao: new Date(2024, 2, 30, 12, 40),
    dataCheckIn: new Date(2024, 3, 3, 15, 10)
  },
  {
    nome: "Gustavo Almeida",
    email: "gustavo.almeida@example.com",
    dataInscricao: new Date(2024, 2, 31, 20, 0),
    dataCheckIn: new Date(2024, 3, 4, 22, 20)
  }
];

const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)

  let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn)

  //condicional
  if(participante.dataCheckIn == null) {
    dataCheckIn = `
    <button
      data-email="${participante.email}"
      onclick="fazerCheckIn(event)"
    >
      Confirmar check-in
    </button>
    `
  }

  return `
  <tr>
    <td>
      <strong>
        ${participante.nome}
      </strong>
      <br>
      <small>
        ${participante.email}
      </small>
    </td>
    <td>${dataInscricao}</td>
    <td>${dataCheckIn}</td>
  </tr>
  `
}

const atualizarLista = (participantes) => {
  let output = ""
  // estrutura de repetição - loop
  for(let participante of participantes){
    output = output + criarNovoParticipante(participante)
  }

  // substituir informações do HTML
  document
  .querySelector('tbody')
  .innerHTML = output
}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const formData = new FormData(event.target)

  const participante = {
    nome: formData.get('nome'),
    email: formData.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null
  }

  // verificar se o participante ja existe
  const participanteExiste = participantes.find(
    (p) => p.email == participante.email
  )

  if(participanteExiste) {
    alert('Email já cadastrado!')
    return
  }

  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  // limpar o formulario
  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""
}

const fazerCheckIn = (event) => {
  // confirmar se realmente quer o check-in
  const mensagemConfirmacao = 'Tem certeza que deseja fazer o check-in?'
  if(confirm(mensagemConfirmacao) == false) {
    return
  }

  // encontrar o participante dentro da lista
  const participante = participantes.find((p) => {
    return p.email == event.target.dataset.email
  })
  // atualizar o check-in do participante
  participante.dataCheckIn = new Date()

  // atualizar a lista de participantes
  atualizarLista(participantes)
}