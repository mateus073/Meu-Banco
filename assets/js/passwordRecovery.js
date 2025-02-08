// =======================================
// VARIÁVEIS UTILIZADAS NO SISTEMA
// =======================================

// Captura o campo de entrada de nome de usuário
const iptName = document.querySelector("#username");

// Captura a div que contém o campo de senha
const divPassword = document.querySelector('.divPassword');

// Captura o campo de entrada para a senha
const inputPassword = document.querySelector('#password');

// Captura o rótulo associado ao campo de senha
const labelPassword = document.querySelector('#labelPassword');

// Captura o formulário principal
const form = document.querySelector('.frame-1');

// Captura o botão de confirmação
const btnConfirm = document.querySelector('.button');

// Recupera a lista de usuários armazenada no localStorage
const listUser = JSON.parse(localStorage.getItem("listUser")) || [];

// Exibe a lista de usuários no console para depuração
console.log(listUser);

// =======================================
// FUNÇÕES DE VALIDAÇÃO E ESTILO
// =======================================

/**
 * Aplica estilos de validação ao input e rótulo.
 * @param {boolean} correct - Indica se o input está correto.
 * @param {HTMLElement} ipt - Campo de entrada.
 * @param {HTMLElement} lb - Rótulo associado ao campo.
 */
function correctOrWrong(correct, ipt, lb) {
    const color = correct ? "#1BC681" : "red";
    lb.setAttribute('style', `color: ${color}`);
    ipt.setAttribute('style', `border-color: ${color}`);
}

/**
 * Aplica estilos padrão ao input e rótulo quando o campo está vazio.
 * @param {HTMLElement} ipt - Campo de entrada.
 * @param {HTMLElement} lb - Rótulo associado ao campo.
 */
function colorStandard(ipt, lb) {
    if (ipt.value === '') {
        lb.setAttribute('style', 'color: #484848'); // Cor padrão do rótulo
        ipt.setAttribute('style', 'border-color: #D9D9D9'); // Cor padrão da borda
    }
}

// =======================================
// EVENTOS E FUNCIONALIDADES
// =======================================

/**
 * Evento para exibir o campo de senha ao encontrar um usuário correspondente.
 * Realiza a busca na lista de usuários armazenada no localStorage.
 */
iptName.addEventListener('keyup', () => {
    const nameUser = iptName.value; // Obtém o nome digitado pelo usuário
    const userEncontrado = listUser.find(user => user.userName === nameUser); // Procura pelo usuário na lista

    if (userEncontrado) {
        console.log("Usuário encontrado");
        divPassword.style.display = "block"; // Exibe o campo de senha
    } else {
        divPassword.style.display = "none"; // Oculta o campo de senha
    }
});

/**
 * Evento para validar a senha enquanto o usuário digita.
 * Aplica mensagens de erro e estilos dinâmicos ao campo.
 */
inputPassword.addEventListener('keyup', () => {
    if (inputPassword.value.length < 6) {
        labelPassword.innerHTML = 'Insira no mínimo 6 caracteres'; // Mensagem de erro
        correctOrWrong(false, inputPassword, labelPassword); // Aplica estilo de erro
    } else {
        labelPassword.innerHTML = 'Nova Senha'; // Mensagem de sucesso
        correctOrWrong(true, inputPassword, labelPassword); // Aplica estilo de sucesso
    }
    colorStandard(inputPassword, labelPassword); // Ajusta para o estilo padrão se o campo estiver vazio
});

/**
 * Função para atualizar a senha do usuário no localStorage.
 * Verifica se o usuário existe e se a nova senha é válida.
 */
function updatePassword() {
    const nameUser = iptName.value; // Obtém o nome do usuário digitado
    const newPassword = inputPassword.value; // Obtém a nova senha digitada

    // Busca o índice do usuário correspondente na lista
    const userIndex = listUser.findIndex(user => user.userName === nameUser);

    if (userIndex !== -1 && newPassword.length >= 6) {
        // Atualiza a senha do usuário na lista
        listUser[userIndex].password = newPassword;

        // Salva a lista atualizada no localStorage
        localStorage.setItem("listUser", JSON.stringify(listUser));

        // Exibe uma mensagem de sucesso
        alert('Senha atualizada com sucesso!');
        window.location.href = '../index.html';
        // Reseta os campos e oculta a área de senha
        inputPassword.value = '';
        divPassword.style.display = "none";
    } else {
        // Exibe uma mensagem de erro
        alert('Usuário não encontrado ou senha inválida!');
    }
}

// =======================================
// EVENTOS DE CLIQUE E SUBMISSÃO
// =======================================

/**
 * Evento para confirmar a atualização da senha.
 * Chama a função de atualização de senha ao clicar no botão.
 */
btnConfirm.addEventListener('click', () => {
    updatePassword();
});

/**
 * Evento para impedir o envio padrão do formulário.
 * Evita o recarregamento da página ao enviar o formulário.
 */
form.addEventListener("submit", (event) => {
    event.preventDefault();
});
