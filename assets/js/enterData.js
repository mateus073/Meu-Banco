// obs nao apagar esse usuario poque ele ira passar para as outras partes do site esse usuario logado
const idss = JSON.parse(localStorage.getItem("idUserLogado")) // recupera o id pra acessar o usuario
const userss = JSON.parse(localStorage.getItem("listUser")) || []; // Recupera o array de usuários do localStorage
const loggedInUserr = userss.find(user => user.id === idss); // Encontra o usuário no array com base no ID

// class que ira salvar e manipular os dados de transacao
const clsTransation = new ManipulateTransation(loggedInUserr)

// class que ira salvar e manipular os dados de transaçao
const clsPurchase = new ManipulatePurchase(loggedInUserr)

// class que ira salvar e manipular os dados do investimento
const clsInvest = new ManipulateInvestment(loggedInUserr)
//clsPurchase.generateInvoices() // chama o metodo que e responsavel pela criaçao da fatura

// console.log(loggedInUserr)






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

// Função para pegar a transaçao e passar pra classe
// so roda se a data for correta e valor for positivo
function transition() {
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

    // verifica se tem saldo pra fazer
    if (transactionType === 'sent') {
        if (transactionValue >= loggedInUserr.balance) {
            alert('saldo insuficiente pra transação')
            return
        }
    }

    // Cria o objeto da nova transação
    let newTransction = {
        type: transactionType,
        value: transactionValue,
        date: transactionDate,
        nameTransaction: transactionName
    };

    // retorna o objeto transaçao que sera passado pro metodo de adiciona transaçao ai abaixo
    return newTransction
}


// Evento para validar e salvar a transação ao clicar no botão
document.querySelector('.btnSTran').addEventListener('click', (e) => {
    e.preventDefault(); // Impede o envio padrão do formulário

    // Valida o formulário antes de criar o objeto transacao
    const isDateValid = isFormValid('transactionForm', 'transactionDate', 'transactionValue');
    if (isDateValid) {
        let newTransation = transition(); //pega o objeto transaçao ja pronto pra salvar

        // verifica se tudo ocoreu certo em transition (foi retornado o objeto corretamente)
        if (newTransation && typeof newTransation === 'object') {
            clsTransation.addTransaction(newTransation);
            alert('tudo certo transaçao registrada')
        }
    } else {
        console.log('Erro: não posso criar e salvar a transação');
    }
});




/*  ============================================================
    CÓDIGO PARA SALVAR COMPRAS
    ============================================================
*/




// Função para salvar a compra (sem parâmetro de validação, pois ela já foi feita)
// so roda se a data for correta e valor for positivo
function purchase() {
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

    // verifica se o saldo ou limite e suficiente
    if (purchaseType === 'Debito' && purchaseValue > loggedInUserr.balance) {
        alert('saldo insuficiente pra compra')
        return
    } else if (purchaseType === 'Credito' && purchaseValue > cardUsando.limit) {
        alert('limite insuficiente pra compra')
        return
    }

    // verifica se o cartao esta em usuo existe antes de criar o obj compra que sera adicionado nele
    if (cardUsando) {
        // Cria o objeto da nova compra
        let newPurchase = {
            type: purchaseType,
            value: purchaseValue,
            date: purchaseDate,
            merchant: purchaseName,
            installments: purchaseInstallments
        };
        return newPurchase
    } else {
        console.log('Erro: cartão não encontrado ou não está em uso.');
        alert('Erro: cartão não encontrado ou não está em uso.');
        return
    }
}


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
        let newPurchase = purchase();

        // verifica se tudo ocoreu certo em transition (foi retornado o objeto corretamente)
        if (newPurchase && typeof newPurchase === 'object') {
            console.log(newPurchase)
            alert('tudo certo compra registrada')
            clsPurchase.addPurchase(newPurchase); // metodo que vai adicionar compra
            clsPurchase.generateInvoices() // metodo que vai mexer com a fatura
            getInvoices()
        }
    } else {
        console.log('Erro: não posso criar e salvar a compra');
    }
});




/*  ============================================================
    CÓDIGO PARA SALVAR INVESTIMENTOS
    ============================================================
*/




// Função para salvar o investimento
// so roda se a data for correta e valor for positivo
function saveInvestment() {
    // Seleciona o formulário de investimentos e coleta os dados
    let formTrans = document.getElementById('investmentForm');
    const investmentType = formTrans.querySelector('#investmentType').value;
    const investmentValue = parseFloat(formTrans.querySelector('#investmentValue').value) || 0;
    const investmentDate = formTrans.querySelector('#investmentDate').value;
    const investmentName = formTrans.querySelector('#investmentName').value;
    const annualIncome = Math.random()

    // Verifica se algum campo está vazio ou inválido
    if (!investmentType || investmentValue <= 0 || !investmentDate || !investmentName) {
        alert('Por favor, preencha todos os campos corretamente!');
        return;
    } else if (investmentValue > loggedInUserr.balance) {
        alert('saldo insuficiente!');
        return
    } else {
        // Cria o objeto do novo investimento
        let newInvestment = {
            type: investmentType,
            date: investmentDate,
            value: investmentValue,
            nameInvestment: investmentName,
            annualIncome: 0,
            pctAnnualIncome: annualIncome.toFixed(2),
        };
        return newInvestment
    }
}


// Evento para validar e salvar o investimento ao clicar no botão (.btnIvest)
document.querySelector('.btnIvest').addEventListener('click', (e) => {
    e.preventDefault(); // Impede o comportamento padrão do formulário

    // Valida os campos de data e valor usando isFormValid
    let valid = isFormValid('investmentForm', 'investmentDate', 'investmentValue');

    // se estiver tudo oq ele cria o objInvestmento e passa pro metodo que ira adicionalo 
    if (valid) {
        let newInvesment = saveInvestment();
        clsInvest.addInvestment(newInvesment)
    } else {
        console.log('Erro: não posso criar e salvar o investimento');
    }
});




/*  ============================================================
    CÓDIGO PARA pagar a fatura
    ============================================================
*/

// Seleciona os elementos necessários da tela
const formPF = document.querySelector('#PagarFaturaForm');
const valueI = document.querySelector('.valorASerPago');
const select = document.querySelector('#opcFaturas');
const btnP = document.querySelector('.btnPagarFatura');


// Função para atualizar a tela com as faturas disponíveis
function getInvoices() {
    // Encontra o cartão ativo do usuário
    const cardUsing = loggedInUserr.cards.find(card => card.inUser === true);
    // console.log(cardUsing);

    // Obtém o array de faturas do cartão ativo 
    let invoices = cardUsing.invoice; // Certifique-se de que o nome da propriedade está correto!

    // Limpa as opções existentes no <select>
    select.innerHTML = '';

    // Percorre cada fatura do array
    for (let x = 0; x < invoices.length; x++) {
        // Converte a data de vencimento (expirationDate) para um objeto Date
        const invoiceDate = new Date(invoices[x].expirationDate);
        const invoiceValue = invoices[x].totalInvoice.toFixed(1)

        // Extrai o ano e o mês da data. O mês é incrementado em 1, pois getMonth() começa em 0.
        const year = invoiceDate.getFullYear();
        const month = (invoiceDate.getMonth() + 1)

        // Cria a string formatada no formato "YYYY-MM"
        const formattedDate = `${year}-${month}`;

        // Cria um novo elemento <option>
        const option = document.createElement('option');

        // Define o value e o conteúdo de texto da option com a data formatada
        option.value = formattedDate;
        option.textContent = formattedDate;

        // Adiciona a option ao <select>
        select.appendChild(option);

        // Define o atributo data-valor com o valor total da fatura
        option.setAttribute('data-valor', invoiceValue);

    }

    // Exibe as faturas no console para verificação
    // console.log("faturas selecionadas e colocadas nas options:")
    // console.log(invoices);
}
getInvoices();




// Adiciona um evento "change" ao <select> ele e disparado sempre que o usuário seleciona uma nova opção
select.addEventListener('change', () => {
    // Obtém a opção atualmente selecionada
    const selectedOption = select.options[select.selectedIndex];

    // Pega o valor do atributo data-valor
    const dataValor = selectedOption.getAttribute('data-valor');

    // Atualiza o elemento valueI com o valor obtido
    valueI.textContent = `R$ ${dataValor}`;
});




// Adiciona um listener de clique ao botão que vai passar a data da fatura a ser pago 
btnP.addEventListener('click', (e) => {
    e.preventDefault()
    // Obtém o valor selecionado do <select>
    const selectedValue = select.value;

    if (selectedValue === '') {
        console.log('selecione um fatura pra pagar')
    }
    // chama o metodo reponsavel por pagar a fatura usando a chave ano-mes
    // obs: ele so recebe data a partir do proximo mes
    clsPurchase.payInvoice(selectedValue)

    // Exibe o valor selecionado no console (ou pode atualizar outro elemento da página)
    console.log("Valor selecionado:", selectedValue);
});