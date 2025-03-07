// Observação: Não remova este usuário, pois ele será utilizado em outras partes do site.
const idss = JSON.parse(localStorage.getItem("idUserLogado")) // recupera o id pra acessar o usuario
const userss = JSON.parse(localStorage.getItem("listUser")) || []; // Recupera o array de usuários do localStorage
const loggedInUserr = userss.find(user => user.id === idss); // Encontra o usuário no array com base no ID


/**=========================================
 * INSTANCIA DAS CLASSES
 =========================================== */

/**
 * Instancia a classe para manipulação de transações,
 * passando o usuário logado como parâmetro.
 */
const clsTransation = new ManipulateTransation(loggedInUserr)

/**
 * Instancia a classe para manipulação de compras,
 * passando o usuário logado como parâmetro.
 */
const clsPurchase = new ManipulatePurchase(loggedInUserr)

/**
 * Instancia a classe para manipulação de investimentos,
 * passando o usuário logado como parâmetro.
 */
const clsInvest = new ManipulateInvestment(loggedInUserr)






/** Valida se a data fornecida é válida e está dentro do intervalo permitido.
 * @param {string} dateStr - Data no formato de string.
 * @returns {boolean} - Retorna true se a data for válida, caso contrário false.
 */
function isValidDate(dateStr) {
    const dateObj = new Date(dateStr); // Converte a string em um objeto de data
    if (isNaN(dateObj)) return false; // Retorna false se a data for inválida

    const year = dateObj.getFullYear();
    if (year < 2024) return false; // Desconsidera datas anteriores a 2024

    const today = new Date();
    const oneMonthAhead = new Date();
    oneMonthAhead.setMonth(today.getMonth() + 1); // Define o limite máximo como um mês a partir de hoje

    return dateObj <= oneMonthAhead; // Retorna verdadeiro se a data estiver dentro do intervalo permitido
}



/** Valida os campos de data e valor de um formulário.
 * Utiliza a função isValidDate para validar o campo de data.
 * @param {string} formId - ID do formulário.
 * @param {string} dateFieldId - ID do campo de data.
 * @param {string} valueFieldId - ID do campo de valor.
 * @returns {boolean} - Retorna true se os campos forem válidos; caso contrário, false.
 */
function isFormValid(formId, dateFieldId, valueFieldId) {
    const dateValue = document.getElementById(dateFieldId).value; // Obtém o valor do campo de data
    const value = parseFloat(document.getElementById(valueFieldId).value) || 0; // Obtém e converte o valor numérico

    // verifica se a data e valida
    if (!isValidDate(dateValue)) {
        alert('Data inválida. Por favor, insira uma data válida dentro do intervalo permitido.');
        return false;
    }
    // verifica se o valor e positivo
    if (value <= 0) {
        alert('Por favor, insira um valor positivo.');
        return false;
    }

    return true; // Retorna verdadeiro se ambas as validações forem bem-sucedidas
}



/*  ============================================================
    CÓDIGO PARA SALVAR TRANSAÇÕES
    ============================================================*/

/** Cria um objeto de transação a partir dos dados do formulário.
 * Executa somente se a data for válida e o valor for positivo.
 * @returns {object|undefined} - Retorna o objeto de transação ou undefined se houver dados incorretos.
 */
function transition() {
    // Obtém os valores dos campos do formulário
    let formTrans = document.getElementById('transactionForm');
    const transactionType = formTrans.querySelector('#transactionType').value;
    const transactionValue = parseFloat(formTrans.querySelector('#transactionValue').value) || 0;
    const transactionDate = formTrans.querySelector('#transactionDate').value;
    const transactionName = formTrans.querySelector('#transactionName').value;

    // Verifica se todos os campos foram preenchidos corretamente
    if (!transactionType || !transactionValue || !transactionDate || !transactionName) {
        alert('Por favor, preencha todos os campos corretamente!');
        return;
    }

    // Verifica se há saldo suficiente para transações do tipo "sent"
    if (transactionType === 'sent') {
        if (transactionValue >= loggedInUserr.balance) {
            alert('saldo insuficiente pra transação')
            return
        }
    }

    // Cria e retorna o objeto da nova transação
    let newTransction = {
        type: transactionType,
        value: transactionValue,
        date: transactionDate,
        nameTransaction: transactionName
    };

    return newTransction
}


// Evento para validar e salvar a transação ao clicar no botão
document.querySelector('.btnSTran').addEventListener('click', (e) => {
    e.preventDefault(); // Impede o envio padrão do formulário

    // Valida o formulário antes de criar o objeto transacao
    const isDateValid = isFormValid('transactionForm', 'transactionDate', 'transactionValue');
    if (isDateValid) {
        let newTransation = transition(); // Cria o objeto de transação pronto para salvar

        // verifica se tudo ocoreu certo em transition (foi retornado o objeto corretamente)
        if (newTransation && typeof newTransation === 'object') {
            clsTransation.addTransaction(newTransation);
            alert('Transação registrada com sucesso.')
        }
    } else {
        console.log('Erro: não foi possível criar e salvar a transação.');
    }
});




/* ============================================================
    CÓDIGO PARA SALVAR COMPRAS
    ============================================================ */

/** Cria um objeto de compra a partir dos dados do formulário.
 * Executa somente se a data for válida, o valor for positivo e os demais dados estiverem corretos.
 * @returns {object|undefined} - Retorna o objeto da nova compra ou undefined em caso de erro.
 */
function purchase() {
    // Seleciona o formulário de compras e coleta os dados
    let formTrans = document.getElementById('purchaseForm');
    const purchaseType = formTrans.querySelector('#purchaseType').value;
    const purchaseValue = parseFloat(formTrans.querySelector('#purchaseValue').value) || 0;
    const purchaseDate = formTrans.querySelector('#purchaseDate').value;
    const purchaseName = formTrans.querySelector('#purchaseMerchant').value;
    const purchaseInstallments = parseInt(formTrans.querySelector('#purchaseInstallments').value) || 0;

    // Verifica se os campos obrigatórios foram preenchidos corretamente
    if (!purchaseType || purchaseValue <= 0 || !purchaseDate || !purchaseName) {
        alert('Por favor, preencha todos os campos corretamente!');
        return;
    }

    // Encontra o cartão em uso (com inUser === true)
    const cardUsando = loggedInUserr.cards.find(card => card.inUser === true);

    // Verifica se há saldo ou limite suficiente para a compra
    if (purchaseType === 'Debito' && purchaseValue > loggedInUserr.balance) {
        alert('saldo insuficiente pra compra')
        return
    } else if (purchaseType === 'Credito' && purchaseValue > cardUsando.limit) {
        alert('limite insuficiente pra compra')
        return
    }

    // verifica se o cartao esta em usuo existe antes de criar o obj compra que sera adicionado nele
    if (cardUsando) {
        // Cria e retorna o objeto da nova compra
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


// Evento para validar e salvar a compra ao clicar no botão
document.querySelector('.btnCompr').addEventListener('click', (e) => {
    e.preventDefault(); // Impede o comportamento padrão do formulário

    // Valida os campos de data e valor usando isFormValid
    let valid = isFormValid('purchaseForm', 'purchaseDate', 'purchaseValue');

    // Valida as regras específicas da compra:
    const purchaseType = document.getElementById('purchaseType').value;
    const purchaseInstallments = parseInt(document.getElementById('purchaseInstallments').value) || 0;

    // valida se as parcelas nao sao negaticas e se o user esta tentando parcelar um acompra no debito
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
            clsPurchase.addPurchase(newPurchase); // metodo que vai adicionar compra na faturas 
            clsPurchase.generateInvoices() // metodo pra gerar faturas
            getInvoices() // metodo pra Atualiza a lista de faturas na tela
        }
    } else {
        console.log('Erro: não foi possível criar e salvar a compra.');
    }
});




/*  ============================================================
    CÓDIGO PARA SALVAR INVESTIMENTOS
    ============================================================
*/

/** Cria um objeto de investimento a partir dos dados do formulário.
 * Executa somente se a data for válida, o valor for positivo e o usuário possuir saldo suficiente.
 * @returns {object|undefined} - Retorna o objeto do novo investimento ou undefined em caso de erro.
 */
function saveInvestment() {
    // Seleciona o formulário de investimentos e coleta os dados
    let formTrans = document.getElementById('investmentForm');
    const investmentType = formTrans.querySelector('#investmentType').value;
    const investmentValue = parseFloat(formTrans.querySelector('#investmentValue').value) || 0;
    const investmentDate = formTrans.querySelector('#investmentDate').value;
    const investmentName = formTrans.querySelector('#investmentName').value;
    const annualIncome = Math.random()

    // Verifica se os campos obrigatórios foram preenchidos corretamente
    if (!investmentType || investmentValue <= 0 || !investmentDate || !investmentName) {
        alert('Por favor, preencha todos os campos corretamente!');
        return;
    } else if (investmentValue > loggedInUserr.balance) {
        alert('saldo insuficiente!');
        return
    } else {
        // Cria e retorna o objeto do novo investimento
        let newInvestment = {
            type: investmentType,
            date: investmentDate,
            value: investmentValue,
            nameInvestment: investmentName,
            annualIncome: 0, // Inicializa o rendimento anual
            pctAnnualIncome: annualIncome.toFixed(2), // Percentual simulado de rendimento anual
        };

        return newInvestment
    }
}


// Evento para validar e salvar o investimento ao clicar no botão
document.querySelector('.btnIvest').addEventListener('click', (e) => {
    e.preventDefault(); // Impede o comportamento padrão do formulário

    // Valida os campos de data e valor usando isFormValid
    let valid = isFormValid('investmentForm', 'investmentDate', 'investmentValue');

    // Se a validação for bem-sucedida, cria o objeto de investimento e o adiciona
    if (valid) {
        let newInvesment = saveInvestment();
        clsInvest.addInvestment(newInvesment)
    } else {
        console.log('Erro: não foi possível criar e salvar o investimento.');
    }
});




/*  ============================================================
    CÓDIGO PARA PAGAR A FATURA
    ============================================================
*/

/** Seleciona os elementos do DOM para o pagamento de faturas:
 * - formPF: formulário de pagamento de faturas
 * - valueI: elemento que exibe o valor a ser pago
 * - select: dropdown para seleção da fatura
 * - btnP: botão para efetuar o pagamento
 */
const formPF = document.querySelector('#PagarFaturaForm');
const valueI = document.querySelector('.valorASerPago');
const select = document.querySelector('#opcFaturas');
const btnP = document.querySelector('.btnPagarFatura');


/** Atualiza a lista de faturas disponíveis na tela.
 * Obtém as faturas do cartão ativo do usuário e preenche o elemento <select>.
 */
function getInvoices() {
    // Encontra o cartão ativo do usuário
    const cardUsing = loggedInUserr.cards.find(card => card.inUser === true);
    
    let invoices = cardUsing.invoice; // Obtém o array de faturas do cartão ativo 
    
    select.innerHTML = ''; // Limpa as opções existentes no <select>

    // Percorre cada fatura e cria uma opção para o <select>
    for (let x = 0; x < invoices.length; x++) {

        // Converte a data de vencimento (expirationDate) para um objeto Date
        const invoiceDate = new Date(invoices[x].expirationDate);
        const invoiceValue = invoices[x].totalInvoice.toFixed(1)

        // Extrai o ano e o mês da data.
        const year = invoiceDate.getFullYear();
        const month = (invoiceDate.getMonth() + 1) // getMonth() retorna valores de 0 a 11

        // Cria a string formatada no formato "YYYY-MM"
        const formattedDate = `${year}-${month}`;

        // Cria um novo elemento <option> para o <select> de faturas
        const option = document.createElement('option');

        // Define o value e o conteúdo de texto da option com a data formatada
        option.value = formattedDate;
        option.textContent = formattedDate;

        // Adiciona a option ao <select>
        select.appendChild(option);

        // Define o atributo data-valor com o valor total da fatura
        option.setAttribute('data-valor', invoiceValue);
    }
    /* //Exibe as faturas no console para verificação
    console.log("faturas selecionadas e colocadas nas options:")
    console.log(invoices);
    */
}
getInvoices();




// Adiciona um evento "change" ao <select> pra atualizar o valor a ser pago sempre que o usuário seleciona uma nova fatura 
select.addEventListener('change', () => {
    // Obtém a opção atualmente selecionada
    const selectedOption = select.options[select.selectedIndex];

    // Pega o valor do atributo data-valor
    const dataValor = selectedOption.getAttribute('data-valor');

    // Atualiza o elemento que exibe o valor a ser pago
    valueI.textContent = `R$ ${dataValor}`;
});




// Evento para efetuar o pagamento da fatura ao clicar no botão
btnP.addEventListener('click', (e) => {
    e.preventDefault()

    // Obtém o valor selecionado do <select>
    const selectedValue = select.value;

    if (selectedValue === '') {
        console.log('selecione um fatura pra pagar')
    }

    // Chama o método responsável por efetuar o pagamento da fatura usando a chave (formato "YYYY-MM")
    // Observação: o método aceita datas a partir do próximo mês
    clsPurchase.payInvoice(selectedValue)

    console.log("Valor selecionado:", selectedValue);
});