// Adiciona um evento ao formulário para evitar o envio padrão ao clicar em qualquer área dentro de .frame-1
document.querySelector('.frame-1').addEventListener("submit", (event) => {
    event.preventDefault()
}
)

// Este evento chama a função entrar() ao clicar no botão, que gerencia a lógica de login
document.querySelector('.button').addEventListener('click', () => {
    entrar()
})



// Função responsável por gerenciar o login  do usuário
function entrar() {
    // pega o label e imput da div onde o usuario digita o nome 
    let labelName = document.querySelector('#labelName')
    let inputName = document.querySelector('#username');


    // Adiciona um evento ao campo de nome de usuário para restaurar o estilo padrão ao digitar
    inputName.addEventListener('keyup', () => {
        colorStandard(inputName, labelName)
    })

    // pega o label e imput da div onde o usuario digita a senha 
    let labelPassword = document.querySelector('#labelPassword')
    let inputPassword = document.querySelector('#password');

    // Adiciona um evento ao campo de senha para restaurar o estilo padrão ao digitar
    inputPassword.addEventListener('keyup', () => {
        colorStandard(inputPassword, labelPassword)
    })

    // Objeto para armazenar os dados do usuário válido (se encontrado)
    let listaUserStorage = [];

    // Objeto que armazenará os dados do usuário válido, caso seja encontrado
    let userValid = {
        name: '',
        password: '',
        campPrenchido: false // Indica se os campos foram preenchidos corretamente
    };

    // Recupera a lista de usuários cadastrados do localStorage (ou seja, usuários previamente registrados)
    listaUserStorage = JSON.parse(localStorage.getItem('listUser')) || [];

    console.log(listaUserStorage)

    // Itera sobre a lista de usuários para verificar se o usuário e a senha fornecidos correspondem a um registro existente
    listaUserStorage.forEach((item) => {
        // Verifica se o nome e a senha fornecidos correspondem a um registro existente. Caso haja correspondência, armazena os dados do usuário válido
        if (inputName.value == item.userName && inputPassword.value == item.password) {
            userValid = {
                name: item.userName,
                password: item.password,
                campPrenchido: true, // marca que os campos foram preenchidos 
                id: item.id
            };
        }
    });

    // Verifica se os dados fornecidos correspondem aos de um usuário válido
    if (inputName.value == userValid.name && inputPassword.value == userValid.password && userValid.campPrenchido) {
        // Salva o ID do usuário no localStorage para acesso posterior na home
        let idUser = userValid.id;
        localStorage.setItem("idUserLogado", idUser); // Armazena o ID no localStorage com uma chave única
        
        console.log(listaUserStorage)
        window.location.href = '../pages/home.html'; // Redireciona o usuário para a página home
        alert('usuario e senha corretos')
    } // Caso contrário, exibe mensagens de erro visual nos campos de entrada
    else {
        labelName.setAttribute('style', 'color: red');
        inputName.setAttribute('style', 'border-color: red');
        labelPassword.setAttribute('style', 'color: red');
        inputPassword.setAttribute('style', 'border-color: red');
        alert('usuario ou senha incorreto!')
    }
}


// Função auxiliar para restaurar os estilos padrão dos campos de entrada
// Recebe como parâmetros o campo de entrada (ipt) e o rótulo correspondente (lb)
function colorStandard(ipt, lb) {
    if (ipt.value === '') {
        lb.setAttribute('style', 'color: #484848'); // Torna o rótulo do usuário vermelho
        ipt.setAttribute('style', 'border-color: #D9D9D9'); // Torna a borda do campo de usuário vermelha
    }
}
