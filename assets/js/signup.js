
// VARIAVEIS USADAS:
let labelName = document.querySelector('#labelName')
let inputName = document.querySelector('#username');
let correctName = false // vaiavel de controle

let labelPassword = document.querySelector('#labelPassword')
let inputPassword = document.querySelector('#password');
let correctPassword = false // vaiavel de controle

let lbConfPassword = document.querySelector('#labelConfirmPass')
let iptConfPassword = document.querySelector('#confirm-password');
let correctPswConfirm = false // vaiavel de controle

let iptRemenberDevice = document.querySelector('#remember') // checkbox do login automativo 
let btnConfirm = document.querySelector('.button')

const form = document.querySelector('.frame-1') 

let formulario = document.querySelector('.frame-1').addEventListener("submit", (event) => {
    event.preventDefault()
})


// validaçao do input de name
inputName.addEventListener('keyup', () => {
    if (inputName.value.length < 5) {
        labelName.innerHTML = 'Insira no minimo 5 caracteres'
        correctName = false
        correctOrWrong(false, inputName, labelName) // funcao que adiciona efeito de cor vermelho pra errado
    } else {
        labelName.innerHTML = 'Usuário'
        correctName = true
        correctOrWrong(true, inputName, labelName) // funcao que adiciona efeito de cor verde pra correto
    }

    colorStandard(inputName, labelName) // funcao pra voltar a cor padrao dps que limpar o imput
})


// validaçao de input de senha
inputPassword.addEventListener('keyup', () => {
    if (inputPassword.value.length < 6) {
        labelPassword.innerHTML = 'Insira no minimo 6 caracteres'
        correctPassword = false
        correctOrWrong(false, inputPassword, labelPassword) // funcao que adiciona efeito de cor vermelho pra errado
    } else {
        correctPassword = true
        correctOrWrong(true, inputPassword, labelPassword)// funcao que adiciona efeito de cor verde pra correto
        labelPassword.innerHTML = 'Senha'
    }
    colorStandard(inputPassword, labelPassword) // funcao pra voltar a cor padrao dps que limpar o imput
})


// validaçao de input de confirma senha
iptConfPassword.addEventListener('keyup', () => {
    if (iptConfPassword.value != inputPassword.value) {
        lbConfPassword.innerHTML = '*As senhas não conferem'
        correctPswConfirm = false
        correctOrWrong(false, iptConfPassword, lbConfPassword) // funcao que adiciona efeito de cor vermelho de errado
    } else {
        lbConfPassword.innerHTML = 'Confirmar Senha'
        correctPswConfirm = true
        correctOrWrong(true, iptConfPassword, lbConfPassword) // funcao que adiciona efeito de cor verde de correto
    }
    colorStandard(iptConfPassword, lbConfPassword) // funcao pra voltar a cor padrao dps que limpar o imput
})


// chama funcao que vai valida todos os campo e criar o usuario 
btnConfirm.addEventListener('click', () => {
    register()
})



// funcao que aplica estilo caso o input esteja correto ou errado
function correctOrWrong(correct, ipt, lb) {
    if (correct) {
        lb.setAttribute('style', 'color: #1BC681')
        ipt.setAttribute('style', 'border-color: #1BC681')
    } else {
        lb.setAttribute('style', 'color: red')
        ipt.setAttribute('style', 'border-color: red')
    }
}

// funcao pra voltar a cor padrao dps que limpar o imput
function colorStandard(ipt, lb) {
    if (ipt.value === '') {
        lb.setAttribute('style', 'color: #484848'); // Torna o rótulo do usuário vermelho
        ipt.setAttribute('style', 'border-color: #D9D9D9'); // Torna a borda do campo de usuário vermelha
    }
}

// funcao reponsavel por validar e cadastrar o usuario 
function register() {
    // verifca se todas os iputs estao preenchidos corretamente
    if (correctName && correctPassword && correctPswConfirm) {
        
        // Recupera a lista de usuários existente no localStorage, ou cria uma lista vazia caso não exista
        let listUser = JSON.parse(localStorage.getItem("listUser") || "[]")
        
        // Obtém os valores dos inputs do formulário
        let name = inputName.value
        let senha = inputPassword.value
        let remenberDevice = iptRemenberDevice.checked

        // variavel usada Verifica se o usuário já existe
        let userExists = listUser.some(user => user.userName === name);

        // verifica se o usuario ja exite
        if (userExists) {
            alert("Usuário já cadastrado. Por favor, faça login.");
            window.location.href = '../../index.html';
        } else {
            const userId = Math.floor(Math.random() * 10000) + 1;
            // Cria e adiciona o novo usuário à lista
            let usuario = new Usuario(name, senha, remenberDevice, userId);
            listUser.push(usuario);

            // Salva a lista atualizada no localStorage
            localStorage.setItem("listUser", JSON.stringify(listUser));
            alert("Cadastro realizado com sucesso! Você já pode fazer login.");
            window.location.href = '../index.html';
        }
    }
    else { // Caso os campos não estejam preenchidos corretamente
        alert('Preencha todos os campos corretamente.');
    }
}

