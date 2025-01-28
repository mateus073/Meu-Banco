
// class usaurio que ira criar e salvar o usuario
// vai receber infos do formulario de login e usalas pra criar o Usuario no local stroage 
// dados recebidos:
// nome 
// senha 
class Usuario {
    constructor(userName, password, remenberDevice) {
        this.userName = userName;
        this.password = password;
        this.remenberDevice = remenberDevice; // pode logar altomaticamente na proxima 
        this.investimentos = 0;
        this.saldo = 0;
        this.transactions = [
            { type: "received", value: 110, date: new Date().toISOString(), nameTransactio: 'Person fictitious 01' }, // recebida
            { type: "sent", value: 900, date: new Date().toISOString(), nameTransactio: 'Person fictitious 02' }, // enviada 
        ];
        this.card = {
            compras: [
                { type: "debito", value: 110, date: new Date().toISOString(), merchant: 'Person fictitious' },
                { type: "Credito", value: 234, date: new Date().toISOString(), merchant: 'Person fictitious' },
            ],
            dataCard: {
                numero: this.generateRandomNumber(),
                cv: this.generateRandomCV(),
                Senha: this.password,
                limite: 3000,
                fatura: 0,
            }
        }
        this.accountCreated = new Date().toISOString();  // Data de criação da conta
        this.accountStatus = 'active';  // Status da conta
        this.loanLimit = 5000;  // Limite de empréstimo
        this.investmentHistory = [
            { date: '2025-01-01', value: 1000, type: 'stocks' },
            { date: '2025-01-15', value: 2000, type: 'bonds' }
        ];  // Histórico de investimentos
        this.cardBalance = 1500;  // Saldo no cartão
        this.lastTransactionDate = new Date().toISOString();  // Data da última transação
    }

    // Método para gerar um número aleatório para o cartão
    generateRandomNumber() {
        return Math.floor(Math.random() * 1000000000);
    }

    // Método para gerar um CVV aleatório
    generateRandomCV() {
        return Math.floor(Math.random() * 900) + 100;  // CVV de 3 dígitos
    }

    // // Método para salvar no localStorage
    // saveToLocalStorage() {
    //     localStorage.setItem(`${this.userName}`, JSON.stringify(this));
    // }
}


// variaveis usadas 
let labelName = document.querySelector('#labelName')
let inputName = document.querySelector('#username');
let correctName = false

let labelPassword = document.querySelector('#labelPassword')
let inputPassword = document.querySelector('#password');
let correctPassword = false

let lbConfPassword = document.querySelector('#labelConfirmPass')
let iptConfPassword = document.querySelector('#confirm-password');
let correctPswConfirm = false

let iptRemenberDevice = document.querySelector('#remember')
let btnConfirm = document.querySelector('.button')

const form = document.querySelector('.frame-1')

let formulario = document.querySelector('.frame-1').addEventListener("submit", (event) => {
    event.preventDefault()
})


// validaçao do input de name
inputName.addEventListener('keyup', () => {
    if (inputName.value.length <= 5) {
        labelName.setAttribute('style', 'color: red')
        labelName.innerHTML = 'Usuário *Insira no minimo 5 caracteres'
        inputName.setAttribute('style', 'border-color: red')
        correctName = false
    } else {
        labelName.setAttribute('style', 'color: #1BC681')
        labelName.innerHTML = 'Usuário'
        inputName.setAttribute('style', 'border-color: #1BC681')
        console.log('nome completo')
        correctName = true
    }
})


// validaçao de input de senha
inputPassword.addEventListener('keyup', () => {
    if (inputPassword.value.length <= 6) {
        labelPassword.setAttribute('style', 'color: red')
        labelPassword.innerHTML = 'Senha  *Insira no minimo 6 caracteres'
        inputPassword.setAttribute('style', 'border-color: red')
        correctPassword = false
    } else {
        labelPassword.setAttribute('style', 'color: #1BC681')
        labelPassword.innerHTML = 'Senha'
        inputPassword.setAttribute('style', 'border-color: #1BC681')
        correctPassword = true
    }
})



// validaçao de input de confirma senha
iptConfPassword.addEventListener('keyup', () => {
    if (iptConfPassword.value != inputPassword.value) {
        lbConfPassword.setAttribute('style', 'color: red')
        lbConfPassword.innerHTML = 'Confirmar Senha *As senhas não conferem'
        iptConfPassword.setAttribute('style', 'border-color: red')
        correctPswConfirm = false
    } else {
        lbConfPassword.setAttribute('style', 'color: #1BC681')
        lbConfPassword.innerHTML = 'Confirmar Senha'
        iptConfPassword.setAttribute('style', 'border-color: #1BC681')
        correctPswConfirm = true
    }
})



// valida todos os campo antes de criar o usuario
btnConfirm.addEventListener('click', () => {
    register()
}
)

// funcao reponsavel por cadastrar o usario
function register() {
    // verifca se todas os iputs estao preenchidos corretamente
    if (correctName && correctPassword && correctPswConfirm) {
        console.log('tudo preechido corretamente e usuario criado??')

        // Recupera a lista de usuários existente no localStorage, ou cria uma lista vazia caso não exista
        let listUser = JSON.parse(localStorage.getItem("listUser") || "[]")
        
        // Obtém os valores dos inputs do formulário
        let name = inputName.value
        let senha = inputPassword.value
        let remenberDevice = iptRemenberDevice.checked

        // Verifica se o usuário já existe
        let userExists = listUser.some(user => user.userName === name);

        if (userExists) {
            console.log("Erro: usuário já existe no sistema.");
            alert("Usuário já cadastrado. Por favor, faça login.");
        } else {
            // Cria e adiciona o novo usuário à lista
            let usuario = new Usuario(name, senha, remenberDevice);
            listUser.push(usuario);

            // Salva a lista atualizada no localStorage
            localStorage.setItem("listUser", JSON.stringify(listUser));
            console.log("Usuário criado com sucesso.");
            alert("Cadastro realizado com sucesso! Você já pode fazer login.");
        }
    } else {
        // Caso os campos não estejam preenchidos corretamente
        console.log('Nem todos os campos estão preenchidos corretamente.');
        alert('Preencha todos os campos corretamente.');
    }
}







