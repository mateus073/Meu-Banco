# Banco - Gerador de Dados Fictícios para Conta do Usuário
Este módulo é responsável por simular o ambiente bancário do projeto, criando e manipulando dados fictícios da conta do usuário. Ele cuida do registro de transações, compras, investimentos e do pagamento de faturas, utilizando o armazenamento local (localStorage) para manter os dados persistentes entre sessões.

## Sumário
- [Visão Geral](#visao-geral)
- [Recuperação de Dados do Usuário](#recuperação-de-dados-do-usuário)
- [Instanciação das Classes](#instanciação-das-classes)
- [Validação de Formulários](#validação-de-formulários)
- [Registro de Transações](#registro-de-transações)
- [Registro de Compras](#registro-de-compras)
- [Registro de Investimentos](#registro-de-investimentos)
- [Pagamento de Faturas](#pagamento-da-fatura)
- [Fluxo de Operação](#fluxo-de-operação)

---

## Visão Geral
Este módulo é responsável por:

- **Recuperar os dados do usuário logado** armazenados no localStorage.

- **Instanciar classes específicas** para manipulação de transações, compras e  investimentos.

- **Validar os dados** fornecidos via formulários antes de criar os registros.

- **Simular o ambiente bancário**, permitindo que o usuário execute operações como transações, compras e investimentos, além de gerar e pagar faturas.
Observação: Não remova o usuário principal, pois ele é utilizado em outras partes do site.

---

## Recuperação de Dados do Usuário
    
- **ID do Usuário:**

    O ID do usuário logado é recuperado através do localStorage:

    ```js
    const idss = JSON.parse(localStorage.getItem("idUserLogado"));
    ```

- **Lista de Usuários:**

    A lista de usuários é carregada ou inicializada como um array vazio:

    ```js
    const userss = JSON.parse(localStorage.getItem("listUser")) || [];
    ```

- **Usuário Logado:**

    O usuário logado é identificado ao buscar o usuário cujo ID coincide com o recuperado:

    ```js
    const loggedInUserr = userss.find(user => user.id === idss);
    ```
---

## Instanciação das Classes

Após a recuperação do usuário logado, são instanciadas três classes principais, cada uma responsável por um conjunto de operações:

- **Manipulação de Transações:**

    ```js
    const clsTransation = new ManipulateTransation(loggedInUserr);
    ```

- **Manipulação de Compras:**
    ```js
    const clsPurchase = new ManipulatePurchase(loggedInUserr);
    ```

- **Manipulação de Investimentos:**
    ```js
    const clsInvest = new ManipulateInvestment(loggedInUserr);
    ```

Cada classe recebe o usuário logado como parâmetro, assegurando que todas as operações estejam associadas à conta correta.

---

## Validação de Formulários

### Função `isValidDate(dateStr)`

- **Objetivo:**
Verificar se a data informada é válida e se está dentro do intervalo permitido (datas a partir de 2024 e até um mês à frente da data atual).

- **Exemplo:**

```js
function isValidDate(dateStr) {
    const dateObj = new Date(dateStr);
    if (isNaN(dateObj)) return false;
    const year = dateObj.getFullYear();
    if (year < 2024) return false;
    const today = new Date();
    const oneMonthAhead = new Date();
    oneMonthAhead.setMonth(today.getMonth() + 1);
    return dateObj <= oneMonthAhead;
}
```

### **Função** `isFormValid(formId, dateFieldId, valueFieldId)`

- **Objetivo:**
Validar se os campos de data e valor dos formulários são preenchidos corretamente (data válida e valor positivo).

- **Exemplo:**

    ```js
    function isFormValid(formId, dateFieldId, valueFieldId) {
        const dateValue = document.getElementById(dateFieldId).value;
        const value = parseFloat(document.getElementById(valueFieldId).value) || 0;
        if (!isValidDate(dateValue)) {
            alert('Data inválida. Por favor, insira uma data válida dentro do intervalo permitido.');
            return false;
        }
        if (value <= 0) {
            alert('Por favor, insira um valor positivo.');
            return false;
        }
        return true;
    }
    ```
---

## Registro de Transações
### **Função** `transition()` 
- **Objetivo:**
Criar um objeto de transação com os dados fornecidos pelo usuário e validar os campos obrigatórios.
Para transações do tipo `"sent"`, é verificado se o usuário possui saldo suficiente.

- **Exemplo:**

    ```js
    function transition() {
        let formTrans = document.getElementById('transactionForm');
        const transactionType = formTrans.querySelector('#transactionType').value;
        const transactionValue = parseFloat(formTrans.querySelector('#transactionValue').value) || 0;
        const transactionDate = formTrans.querySelector('#transactionDate').value;
        const transactionName = formTrans.querySelector('#transactionName').value;

        if (!transactionType || !transactionValue || !transactionDate || !transactionName) {
            alert('Por favor, preencha todos os campos corretamente!');
            return;
        }

        if (transactionType === 'sent') {
            if (transactionValue >= loggedInUserr.balance) {
                alert('Saldo insuficiente para transação');
                return;
            }
        }

        let newTransction = {
            type: transactionType,
            value: transactionValue,
            date: transactionDate,
            nameTransaction: transactionName
        };

        return newTransction;
    }
    ```

    ### **Evento de Registro**

    - **Implementação:**
    Um evento associado ao botão `.btnSTran` valida o formulário e, caso os dados estejam corretos, registra a transação:

    ```js
    document.querySelector('.btnSTran').addEventListener('click', (e) => {
        e.preventDefault();
        const isDateValid = isFormValid('transactionForm', 'transactionDate', 'transactionValue');
        if (isDateValid) {
            let newTransation = transition();
            if (newTransation && typeof newTransation === 'object') {
                clsTransation.addTransaction(newTransation);
                alert('Transação registrada com sucesso.');
            }
        } else {
            console.log('Erro: não foi possível criar e salvar a transação.');
        }
    });
    ```


    ## Registro de Compras
    
    ### Função purchase()
    - **Objetivo:**
    Criar um objeto de compra com os dados do formulário, validando:
        - Preenchimento dos campos obrigatórios.
        -  Saldo suficiente (para débito) ou limite de crédito (para crédito).
        - Existência do cartão ativo (com atributo inUser === true).

    - **Exemplo:**
    ```js
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

    const cardUsando = loggedInUserr.cards.find(card => card.inUser === true);

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
    }};

    ```


### **Evento de Registro**
- **Implementação:**

    O evento associado ao botão .btnCompr valida os dados, cria o objeto de compra, e em seguida:
    - Adiciona a compra.
    - Gera as faturas.
    - Atualiza a lista de faturas na tela.

    ```js
    document.querySelector('.btnCompr').addEventListener('click', (e) => {
        e.preventDefault();
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
                clsPurchase.addPurchase(newPurchase);
                clsPurchase.generateInvoices();
                getInvoices();
            }
        } else {
            console.log('Erro: não foi possível criar e salvar a compra.');
        }
    });
    ```
---

## Registro de Investimentos
### Função saveInvestment()
- **Objetivo:**
    
    Criar um objeto de investimento com os dados do formulário, assegurando que:
    - Todos os campos obrigatórios estejam preenchidos.
    - O usuário tenha saldo suficiente para o investimento.
    - Simule um rendimento anual.

- **Exemplo:**

    ```js
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
    ```

---

## Evento de Registro
- **Implementação:**

    O evento associado ao botão `.btnIvest` valida o formulário e, se os dados forem válidos, adiciona o investimento:

    ```js
    document.querySelector('.btnIvest').addEventListener('click', (e) => {
        e.preventDefault();
        let valid = isFormValid('investmentForm', 'investmentDate', 'investmentValue');
        if (valid) {
            let newInvesment = saveInvestment();
            clsInvest.addInvestment(newInvesment);
        } else {
            console.log('Erro: não foi possível criar e salvar o investimento.');
        }
    });
    ```
---
## Pagamento de Faturas
### Atualização e Seleção de Faturas
- **Função** `getInvoices()` :

    Atualiza a lista de faturas disponíveis no elemento `<select>` com base no cartão ativo do usuário. As datas de vencimento são formatadas (YYYY-MM) e o valor total de cada fatura é definido como atributo:

    ```js
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
            select.appendChild(option);
            option.setAttribute('data-valor', invoiceValue);
        }
    }
    getInvoices();
    ```

- **Evento** no `<select>:`

    Atualiza a exibição do valor a ser pago conforme a fatura selecionada:

    ```js
    select.addEventListener('change', () => {
        const selectedOption = select.options[select.selectedIndex];
        const dataValor = selectedOption.getAttribute('data-valor');
        valueI.textContent = `R$ ${dataValor}`;
    });
    ```

### Pagamento da Fatura
- **Implementação:**

    Ao clicar no botão .btnPagarFatura, o sistema efetua o pagamento da fatura selecionada:

    ```js
    btnP.addEventListener('click', (e) => {
        e.preventDefault();
        const selectedValue = select.value;
        if (selectedValue === '') {
            console.log('Selecione uma fatura para pagar');
        }
        clsPurchase.payInvoice(selectedValue);
        console.log("Valor selecionado:", selectedValue);
    });
   
    ```
---
## Fluxo de Operação
1. **Recuperação e Identificação:**

    - O usuário logado é identificado via localStorage.
    - O sistema filtra a lista de usuários para obter o usuário ativo.
    
2. **Instanciação:**

    - São criadas instâncias das classes de transações, compras e investimentos, garantindo que todas as operações se refiram ao usuário correto.

3. **Validação dos Formulários:**

    - Funções específicas validam as entradas de data e valor, assegurando a integridade dos dados antes de qualquer operação.

4. **Registro e Processamento:**

   - Dependendo da operação (transação, compra ou investimento), o sistema cria o objeto correspondente e utiliza métodos dedicados para registrar os dados.
    - Para compras, além de registrar, o sistema gera e atualiza faturas.

5. **Pagamento de Faturas:**

    - O usuário pode visualizar suas faturas, selecionar a desejada e efetuar o pagamento diretamente pelo sistema.
