// obs nao apagar esse usuario poque ele ira passar para as outras partes do site esse usuario logado
const idss = JSON.parse(localStorage.getItem("idUserLogado")) // recupera o id pra acessar o usuario
const userss = JSON.parse(localStorage.getItem("listUser")) || []; // Recupera o array de usuários do localStorage
const loggedInUserr = userss.find(user => user.id === idss); // Encontra o usuário no array com base no ID
console.log(loggedInUserr)


// Função para validar a data
function isValidDate(dateStr) {
    const dateObj = new Date(dateStr); // Converte a string em um objeto de data
    if (isNaN(dateObj)) return false; // Verifica se a data é válida

    const year = dateObj.getFullYear();
    if (year < 2024) return false; // Impede datas antes de 2024

    const today = new Date();
    const oneMonthAhead = new Date();
    oneMonthAhead.setMonth(today.getMonth() + 1); // Define o limite de um mês no futuro

    return dateObj <= oneMonthAhead; // Retorna verdadeiro se a data estiver dentro do intervalo permitido
}


// Função para validar o valor do formulário e retornar verdadeiro ou falso
// ela usa a funcao acima de validar data
function isFormValid(formId, dateFieldId, valueFieldId) {
    const dateValue = document.getElementById(dateFieldId).value; // Obtém o valor do campo de data
    const value = parseFloat(document.getElementById(valueFieldId).value) || 0; // Obtém e converte o valor numérico

    // verifica se a data e valida
    if (!isValidDate(dateValue)) {
        alert('Data inválida. Por favor, insira uma data válida dentro do intervalo permitido.');
        return false;
    }
    // verifica se o valor e valido
    if (value <= 0) {
        alert('Por favor, insira um valor positivo.');
        return false;
    }

    return true; // Retorna verdadeiro se ambas as validações forem bem-sucedidas
}


/*  ============================================================
    CÓDIGO PARA SALVAR transasoes
    ============================================================
*/

// Função para so salvar a transação
// so roda se a data for correta e valor for positivo
function saveTransition() {
    // Obtém os valores dos campos do formulário
    let formTrans = document.getElementById('transactionForm');
    const transactionType = formTrans.querySelector('#transactionType').value;
    const transactionValue = parseFloat(formTrans.querySelector('#transactionValue').value) || 0;
    const transactionDate = formTrans.querySelector('#transactionDate').value;
    const transactionName = formTrans.querySelector('#transactionName').value;

    // Verifica se todos os campos foram preenchidos
    if (!transactionType || !transactionValue || !transactionDate || !transactionName) {
        alert('Por favor, preencha todos os campos corretamente!');
        return;
    }

    // verifica e atualiza o saldo
    if (transactionType === 'sent') {
        if (transactionValue <= loggedInUserr.balance) {
            loggedInUserr.balance -= transactionValue
        } else {
            alert('saldo insuficiente pra transação')
            return
        }
    } else {
        loggedInUserr.balance += transactionValue
    }

    // Cria o objeto da nova transação
    let newTransction = {
        type: transactionType,
        value: transactionValue,
        date: transactionDate,
        nameTransaction: transactionName
    };

    // Adiciona a nova transação no array de transações do usuário logado
    loggedInUserr.transactions.push(newTransction);

    // Atualiza o usuário no array de usuários
    const userIndex = userss.findIndex(user => user.id === idss);
    if (userIndex !== -1) {
        userss[userIndex] = loggedInUserr; // Substitui o usuário antigo pelo objeto atualizado
    }

    // Salva o array atualizado de usuários no localStorage
    localStorage.setItem("listUser", JSON.stringify(userss));
    alert('Transação salva com sucesso!');

    // Exibe as transações do usuário logado no console para verificação
    console.log(loggedInUserr.transactions);
}

// Evento para validar e salvar a transação ao clicar no botão
document.querySelector('.btnSTran').addEventListener('click', (e) => {
    e.preventDefault(); // Impede o envio padrão do formulário

    // Valida o formulário antes de salvar a transação
    const isDateValid = isFormValid('transactionForm', 'transactionDate', 'transactionValue');
    if (isDateValid) {
        saveTransition(); // Salva a transação se o formulário for válido
    } else {
        console.log('Erro: não posso criar e salvar a transação');
    }
});





/*  ============================================================
    CÓDIGO PARA SALVAR COMPRAS
    ============================================================
*/

// Evento para validar e salvar a compra ao clicar no botão (.btnCompr)
document.querySelector('.btnCompr').addEventListener('click', (e) => {
    e.preventDefault(); // Impede o comportamento padrão do formulário

    // Valida os campos de data e valor usando isFormValid
    let valid = isFormValid('purchaseForm', 'purchaseDate', 'purchaseValue');

    // Valida as regras específicas da compra:
    const purchaseType = document.getElementById('purchaseType').value;
    const purchaseInstallments = parseInt(document.getElementById('purchaseInstallments').value) || 0;

    if (purchaseInstallments < 0) {
        alert('Erro: número de parcelas negativo');
        valid = false;
    } else if (purchaseType === 'Debito' && purchaseInstallments > 0) {
        alert('Erro: não é possível parcelar compras no débito');
        valid = false;
    }

    // Se todas as validações estiverem corretas, salva a compra
    if (valid) {
        savePurchase();
    } else {
        console.log('Erro: não posso criar e salvar a compra');
    }
});



// Função para salvar a compra (sem parâmetro de validação, pois ela já foi feita)
// so roda se a data for correta e valor for positivo
function savePurchase() {
    // Seleciona o formulário de compras e coleta os dados
    let formTrans = document.getElementById('purchaseForm');
    const purchaseType = formTrans.querySelector('#purchaseType').value;
    const purchaseValue = parseFloat(formTrans.querySelector('#purchaseValue').value) || 0;
    const purchaseDate = formTrans.querySelector('#purchaseDate').value;
    const purchaseName = formTrans.querySelector('#purchaseMerchant').value;
    const purchaseInstallments = parseInt(formTrans.querySelector('#purchaseInstallments').value) || 0;

    // Verifica se algum campo não foi preenchido
    if (!purchaseType || purchaseValue <= 0 || !purchaseDate || !purchaseName) {
        alert('Por favor, preencha todos os campos corretamente!');
        return;
    }

    // Encontra o cartão em uso (com inUser === true)
    const cardUsando = loggedInUserr.cards.find(card => card.inUser === true);

    if (purchaseType === 'Debito') {
        if (purchaseValue < loggedInUserr.balance) {
            loggedInUserr.balance -= purchaseValue
        } else {
            alert('saldo insuficiente pra compra')
        }
    } else if (purchaseType === 'Credito') {
        if (purchaseValue < cardUsando.cardBalance) {
            cardUsando.balance -= purchaseValue

        } else {
            alert('limite insuficiente pra compra')
        }
    }


    // Cria o objeto da nova compra
    let newPurchase = {
        type: purchaseType,
        value: purchaseValue,
        date: purchaseDate,
        merchant: purchaseName,
        installments: purchaseInstallments
    };


    if (cardUsando) {
        // Adiciona a nova compra ao array de compras do cartão
        cardUsando.purchase.push(newPurchase);

        // Atualiza o usuário no array de usuários
        const userIndex = userss.findIndex(user => user.id === idss);
        if (userIndex !== -1) {
            userss[userIndex] = loggedInUserr;
        }

        // Salva os dados atualizados no localStorage
        localStorage.setItem("listUser", JSON.stringify(userss));
        alert('Compra salva com sucesso!');

        // Exibe as compras para verificação
        console.log(cardUsando.purchase);
    } else {
        console.log('Erro: cartão não encontrado ou não está em uso.');
        alert('Erro: cartão não encontrado ou não está em uso.');
    }
}



/*  ============================================================
    CÓDIGO PARA SALVAR INVESTIMENTOS
    ============================================================
*/

// Evento para validar e salvar o investimento ao clicar no botão (.btnIvest)
document.querySelector('.btnIvest').addEventListener('click', (e) => {
    e.preventDefault(); // Impede o comportamento padrão do formulário

    // Valida os campos de data e valor usando isFormValid
    let valid = isFormValid('investmentForm', 'investmentDate', 'investmentValue');

    if (valid) {
        saveInvestment();
    } else {
        console.log('Erro: não posso criar e salvar o investimento');
    }
});



// Função para salvar o investimento
// so roda se a data for correta e valor for positivo
function saveInvestment() {
    // Seleciona o formulário de investimentos e coleta os dados
    let formTrans = document.getElementById('investmentForm');
    const investmentType = formTrans.querySelector('#investmentType').value;
    const investmentValue = parseFloat(formTrans.querySelector('#investmentValue').value) || 0;
    const investmentDate = formTrans.querySelector('#investmentDate').value;
    const investmentName = formTrans.querySelector('#investmentName').value;

    // Verifica se algum campo está vazio ou inválido
    if (!investmentType || investmentValue <= 0 || !investmentDate || !investmentName) {
        alert('Por favor, preencha todos os campos corretamente!');
        return;
    }

    // Cria o objeto do novo investimento
    let newInvestment = {
        type: investmentType,
        value: investmentValue,
        date: investmentDate,
        nameTransaction: investmentName
    };

    // Adiciona o novo investimento ao histórico do usuário
    loggedInUserr.investmentHistory.push(newInvestment);

    // Atualiza o usuário no array de usuários
    const userIndex = userss.findIndex(user => user.id === idss);
    if (userIndex !== -1) {
        userss[userIndex] = loggedInUserr;
    }

    // Salva os dados atualizados no localStorage
    localStorage.setItem("listUser", JSON.stringify(userss));
    alert('Investimento salvo com sucesso!');
    
    // Exibe o histórico de investimentos para verificação
    console.log(loggedInUserr.investmentHistory);
}