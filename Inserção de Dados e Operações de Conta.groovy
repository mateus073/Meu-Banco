Inserção de Dados e Operações de Conta
Este projeto contém a implementação para inserir dados fictícios na conta do usuário e gerenciar operações financeiras, como transações, compras, investimentos e pagamento de faturas. A seguir, a documentação detalhada desta parte do sistema.

Índice
Recuperação dos Dados do Usuário
Instanciação das Classes de Manipulação
Validação de Dados e Formulários
Função isValidDate
Função isFormValid
Inserção e Salvamento das Operações
Transações
Compras
Investimentos
Pagamento de Faturas
Considerações Finais
Recuperação dos Dados do Usuário
js
Copy
Edit
// OBS: Não apagar esse usuário, pois ele será utilizado nas demais partes do site.
const idss = JSON.parse(localStorage.getItem("idUserLogado")); // Recupera o ID do usuário logado.
const userss = JSON.parse(localStorage.getItem("listUser")) || []; // Recupera o array de usuários.
const loggedInUserr = userss.find(user => user.id === idss); // Encontra o usuário com base no ID.
Instanciação das Classes de Manipulação
js
Copy
Edit
// Classe para manipular transações.
const clsTransation = new ManipulateTransation(loggedInUserr);

// Classe para manipular compras.
const clsPurchase = new ManipulatePurchase(loggedInUserr);

// Classe para manipular investimentos.
const clsInvest = new ManipulateInvestment(loggedInUserr);
Validação de Dados e Formulários
Função isValidDate
Valida a data informada, garantindo que:

A data seja válida.
O ano não seja anterior a 2024.
A data não ultrapasse um mês a partir da data atual.
js
Copy
Edit
function isValidDate(dateStr) {
    const dateObj = new Date(dateStr); // Converte a string em um objeto Date.
    if (isNaN(dateObj)) return false; // Verifica se a data é válida.

    const year = dateObj.getFullYear();
    if (year < 2024) return false; // Impede datas anteriores a 2024.

    const today = new Date();
    const oneMonthAhead = new Date();
    oneMonthAhead.setMonth(today.getMonth() + 1); // Define o limite de um mês no futuro.

    return dateObj <= oneMonthAhead; // Retorna true se estiver dentro do intervalo permitido.
}
Função isFormValid
Valida os campos de data e valor do formulário utilizando a função isValidDate:

js
Copy
Edit
function isFormValid(formId, dateFieldId, valueFieldId) {
    const dateValue = document.getElementById(dateFieldId).value; // Obtém o valor do campo de data.
    const value = parseFloat(document.getElementById(valueFieldId).value) || 0; // Converte o valor para número.

    if (!isValidDate(dateValue)) {
        alert('Data inválida. Por favor, insira uma data válida dentro do intervalo permitido.');
        return false;
    }
    if (value <= 0) {
        alert('Por favor, insira um valor positivo.');
        return false;
    }
    return true; // Retorna true se as validações forem bem-sucedidas.
}
Inserção e Salvamento das Operações
Transações
Função transition
Extrai os dados do formulário de transações, valida os campos e cria um objeto com as informações da nova transação. Para transações do tipo "sent", também verifica se há saldo suficiente.

js
Copy
Edit
function transition() {
    let formTrans = document.getElementById('transactionForm');
    const transactionType = formTrans.querySelector('#transactionType').value;
    const transactionValue = parseFloat(formTrans.querySelector('#transactionValue').value) || 0;
    const transactionDate = formTrans.querySelector('#transactionDate').value;
    const transactionName = formTrans.querySelector('#transactionName').value;

    // Verifica se todos os campos foram preenchidos.
    if (!transactionType || !transactionValue || !transactionDate || !transactionName) {
        alert('Por favor, preencha todos os campos corretamente!');
        return;
    }

    // Para transações do tipo "sent", verifica se há saldo suficiente.
    if (transactionType === 'sent' && transactionValue >= loggedInUserr.balance) {
        alert('Saldo insuficiente para transação');
        return;
    }

    // Cria e retorna o objeto da nova transação.
    let newTransction = {
        type: transactionType,
        value: transactionValue,
        date: transactionDate,
        nameTransaction: transactionName
    };

    return newTransction;
}
Evento para Salvar Transação
Ao clicar no botão com a classe .btnSTran, o formulário é validado e, se aprovado, a transação é registrada.

js
Copy
Edit
document.querySelector('.btnSTran').addEventListener('click', (e) => {
    e.preventDefault(); // Impede o envio padrão do formulário.

    // Valida o formulário.
    const isDateValid = isFormValid('transactionForm', 'transactionDate', 'transactionValue');
    if (isDateValid) {
        let newTransation = transition(); // Cria o objeto da transação.

        // Se o objeto for criado corretamente, adiciona a transação.
        if (newTransation && typeof newTransation === 'object') {
            clsTransation.addTransaction(newTransation);
            alert('Tudo certo: transação registrada.');
        }
    } else {
        console.log('Erro: não posso criar e salvar a transação');
    }
});
Compras
Função purchase
Extrai os dados do formulário de compras, valida os campos e cria um objeto representando a nova compra. Também verifica se o saldo ou limite é suficiente, conforme o tipo de compra.

js
Copy
Edit
function purchase() {
    let formTrans = document.getElementById('purchaseForm');
    const purchaseType = formTrans.querySelector('#purchaseType').value;
    const purchaseValue = parseFloat(formTrans.querySelector('#purchaseValue').value) || 0;
    const purchaseDate = formTrans.querySelector('#purchaseDate').value;
    const purchaseName = formTrans.querySelector('#purchaseMerchant').value;
    const purchaseInstallments = parseInt(formTrans.querySelector('#purchaseInstallments').value) || 0;

    if (!purchaseType || purchaseValue <= 0 || !purchaseDate || !purchaseName) {
        alert('Por favor, preencha todos os campos corretamente!');
        return;
    }

    // Encontra o cartão em uso.
    const cardUsando = loggedInUserr.cards.find(card => card.inUser === true);

    // Valida saldo para débito e limite para crédito.
    if (purchaseType === 'Debito' && purchaseValue > loggedInUserr.balance) {
        alert('Saldo insuficiente para compra');
        return;
    } else if (purchaseType === 'Credito' && purchaseValue > cardUsando.limit) {
        alert('Limite insuficiente para compra');
        return;
    }

    if (cardUsando) {
        let newPurchase = {
            type: purchaseType,
            value: purchaseValue,
            date: purchaseDate,
            merchant: purchaseName,
            installments: purchaseInstallments
        };
        return newPurchase;
    } else {
        console.log('Erro: cartão não encontrado ou não está em uso.');
        alert('Erro: cartão não encontrado ou não está em uso.');
        return;
    }
}
Evento para Salvar Compra
Valida os campos do formulário (incluindo regras específicas de parcelamento) e, se aprovado, registra a compra e atualiza a fatura.

js
Copy
Edit
document.querySelector('.btnCompr').addEventListener('click', (e) => {
    e.preventDefault(); // Impede o comportamento padrão do formulário.

    let valid = isFormValid('purchaseForm', 'purchaseDate', 'purchaseValue');

    const purchaseType = document.getElementById('purchaseType').value;
    const purchaseInstallments = parseInt(document.getElementById('purchaseInstallments').value) || 0;

    if (purchaseInstallments < 0) {
        alert('Erro: número de parcelas negativo');
        valid = false;
    } else if (purchaseType === 'Debito' && purchaseInstallments > 0) {
        alert('Erro: não é possível parcelar compras no débito');
        valid = false;
    }

    if (valid) {
        let newPurchase = purchase();

        if (newPurchase && typeof newPurchase === 'object') {
            console.log(newPurchase);
            alert('Tudo certo: compra registrada.');
            clsPurchase.addPurchase(newPurchase); // Adiciona a compra.
            clsPurchase.generateInvoices(); // Atualiza a fatura.
            getInvoices(); // Atualiza as opções de fatura na interface.
        }
    } else {
        console.log('Erro: não posso criar e salvar a compra');
    }
});
Investimentos
Função saveInvestment
Extrai os dados do formulário de investimentos, valida os campos e cria um objeto com as informações do novo investimento. Gera um valor aleatório para a porcentagem anual e o formata para duas casas decimais.

js
Copy
Edit
function saveInvestment() {
    let formTrans = document.getElementById('investmentForm');
    const investmentType = formTrans.querySelector('#investmentType').value;
    const investmentValue = parseFloat(formTrans.querySelector('#investmentValue').value) || 0;
    const investmentDate = formTrans.querySelector('#investmentDate').value;
    const investmentName = formTrans.querySelector('#investmentName').value;
    const annualIncome = Math.random();

    if (!investmentType || investmentValue <= 0 || !investmentDate || !investmentName) {
        alert('Por favor, preencha todos os campos corretamente!');
        return;
    } else if (investmentValue > loggedInUserr.balance) {
        alert('Saldo insuficiente!');
        return;
    } else {
        let newInvestment = {
            type: investmentType,
            date: investmentDate,
            value: investmentValue,
            nameInvestment: investmentName,
            annualIncome: 0,
            pctAnnualIncome: annualIncome.toFixed(2)
        };
        return newInvestment;
    }
}
Evento para Salvar Investimento
Valida o formulário e, se aprovado, registra o investimento.

js
Copy
Edit
document.querySelector('.btnIvest').addEventListener('click', (e) => {
    e.preventDefault(); // Impede o envio padrão do formulário.

    let valid = isFormValid('investmentForm', 'investmentDate', 'investmentValue');

    if (valid) {
        let newInvesment = saveInvestment();
        clsInvest.addInvestment(newInvesment);
    } else {
        console.log('Erro: não posso criar e salvar o investimento');
    }
});
Pagamento de Faturas
Função getInvoices
Atualiza o elemento <select> com as faturas disponíveis para o cartão em uso, formatando a data e atribuindo o valor da fatura como atributo data-valor.

js
Copy
Edit
function getInvoices() {
    const cardUsing = loggedInUserr.cards.find(card => card.inUser === true);
    let invoices = cardUsing.invoice;

    select.innerHTML = '';

    for (let x = 0; x < invoices.length; x++) {
        const invoiceDate = new Date(invoices[x].expirationDate);
        const invoiceValue = invoices[x].totalInvoice.toFixed(1);
        const year = invoiceDate.getFullYear();
        const month = (invoiceDate.getMonth() + 1);
        const formattedDate = `${year}-${month}`;
        
        const option = document.createElement('option');
        option.value = formattedDate;
        option.textContent = formattedDate;
        option.setAttribute('data-valor', invoiceValue);
        
        select.appendChild(option);
    }
}
getInvoices();
Atualização do Valor da Fatura Selecionada
Ao alterar a seleção no <select>, atualiza o elemento que exibe o valor da fatura.

js
Copy
Edit
select.addEventListener('change', () => {
    const selectedOption = select.options[select.selectedIndex];
    const dataValor = selectedOption.getAttribute('data-valor');
    valueI.textContent = `R$ ${dataValor}`;
});
Pagamento da Fatura
Ao clicar no botão de pagamento, o valor selecionado é utilizado para efetuar o pagamento através do método payInvoice.

js
Copy
Edit
btnP.addEventListener('click', (e) => {
    e.preventDefault();
    const selectedValue = select.value;
    
    if (selectedValue === '') {
        console.log('Selecione uma fatura para pagar');
    }
    clsPurchase.payInvoice(selectedValue);
    console.log("Valor selecionado:", selectedValue);
});
Considerações Finais
Esta parte do projeto integra as seguintes funcionalidades:

Persistência de Dados: Recupera e utiliza o usuário logado armazenado no localStorage.
Manipulação de Operações: Utiliza classes específicas para gerenciar transações, compras e investimentos.
Validação: Garante que os dados inseridos (datas e valores) sejam válidos e respeitem as regras de negócio (saldo, limite, parcelamento).
Interface Dinâmica: Atualiza a interface com as opções de faturas e permite o pagamento delas.
Utilize este README para compreender e manter a parte do sistema responsável pela inserção e manipulação de dados fictícios e operações financeiras.