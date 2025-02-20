
// class usaurio que ira criar e salvar o usuario
// vai receber infos do formulario de login e usalas pra criar o Usuario no local stroage 
// dados recebidos:
// nome 
// senha 
// se o usuario clicou em lembrar senha
// obs seus metodos sao perdidios no ato de aramzernar no local storage pos o local storage nao aceita metodos
class Usuario {
    constructor(userName, password, rememberDevice, idUser) {
        this.id = idUser // verifica se pode logar
        this.userName = userName;
        this.password = password;
        this.rememberDevice = rememberDevice; // pode logar altomaticamente na proxima 
        this.accountStatus = 'active';  // Status da conta
        this.accountCreated = new Date();  // Data de criação da conta
        this.investimentos = 0;
        this.balance = 4000;
        this.loanLimit = 5000;  // Limite de empréstimo
        this.transactions = [
            // { type: "received", value: 110, date: '2025-02-11T17:24:09.861Z', nameTransaction: 'Person fictitious 01' }, // recebida
            // { type: "sent", value: 900, date: '2025-02-08T17:24:09.861Z', nameTransaction: 'Person fictitious 02' }, // enviada 
        ];
        this.pixKey = [
            { tipo: 'CPF', chave: '' },
            { tipo: 'Email', chave: '' },
            { tipo: 'Telefone', chave: '' },
            { tipo: 'Aleatória', chave: '' }
        ]
        this.cards = [
            {
                inUser: true, // variavel que define se e pra exibir esse cartao na tela
                nameCard: "card 01 - ouroCard",
                cardStatus: 'active',
                limit: 3500, // limite que irei subtrair valor das compras
                limitAvailable: 3500, // limite em uso 
                approvedLimit: 5000, // limite aprovado 
                invoice: [], // array de faturas
                dateInvoicePayment: '2025-02-28T17:24:09.861Z',
                purchase: [ // compras
                    // { type: "Debito", value: 110, date: '2025-02-28T17:24:09.861Z', merchant: 'Bazar Dbgt' },
                    // { type: "Credito", value: 984, date: '2025-02-11T17:24:09.861Z', merchant: 'Bazar Mituzi', installments: 7 },
                    // { type: "Credito", value: 24, date: '2025-02-12T17:24:09.861Z', merchant: 'Bazar Esferas', installments: 1 },
                    // { type: "Debito", value: 664, date: '2025-02-14T17:24:09.861Z', merchant: 'Bazar nituzi' },
                    // { type: "Credito", value: 274, date: '2025-02-21T17:24:09.861Z', merchant: 'Bazar Konoha', installments: 4 },
                ],
                dataCard: { // dados cartao
                    cardName: this.nameCard(),
                    cardNumber: this.generateRandomNumber(),
                    cv: this.generateRandomCV(),
                    cardPassword: '123456',
                    expirationDate: '12/30'
                }
            },
            {
                inUser: false, // variavel que define se e pra exibir esse cartao na tela
                nameCard: "card 02 - prataCard",
                cardStatus: 'active',
                limit: 3000, // limite que irei subtrair valor das compras
                limitAvailable: 3000, // limite em uso 
                approvedLimit: 3500,
                invoice: [], // array de faturas
                cardPassword: '654321',
                dateInvoicePayment: '2025-02-28T17:24:09.861Z',
                purchase: [ // compr
                    // { type: "Credito", value: 910, date: '2025-02-28T17:24:09.861Z', merchant: 'Bazar Mituzi', installments: 4 },
                    // { type: "Credito", value: 84, date: '2025-02-31T17:24:09.861Z', merchant: 'Bazar Shokun', installments: 2 },
                    // { type: "Debito", value: 334, date: '2025-02-20T17:24:09.861Z', merchant: 'Bazar MM' },
                    // { type: "Debito", value: 64, date: '2025-02-24T17:24:09.861Z', merchant: 'Bazar L&D' },
                    // { type: "Credito", value: 2474, date: '2025-02-21T17:24:09.861Z', merchant: 'Bazar zk', installments: 7 },
                ],
                dataCard: {
                    cardName: this.nameCard(),
                    cardNumber: this.generateRandomNumber(),
                    cv: this.generateRandomCV(),
                    cardPassword: '654321',
                    expirationDate: '11/30'
                }
            }
        ]
        this.investmentHistory = [
            { type: 'stocks', date: '2025-01-01', value: 1000, annualIncome: 0.05, },
            { type: 'bonds', date: '2025-01-15', value: 2000, annualIncome: 0.07, }
        ];
    }

    // Método para gerar um número aleatório para o cartão
    generateRandomNumber() {
        // Gera um número aleatório entre 0 e 9999999999999999 (16 dígitos)
        const randomNumber = Math.floor(Math.random() * 10000000000000000);

        // Converte o número para string e preenche com zeros à esquerda, garantindo 16 dígitos
        const paddedNumber = randomNumber.toString().padStart(16, '0');

        // Divide a string em grupos de 4 caracteres e junta-os com espaços
        const formattedNumber = paddedNumber.match(/.{1,4}/g).join(" ");

        return formattedNumber;
    }

    // Método para abreviar o nome do usuário para o cartão
    nameCard() {
        // Se o nome tiver 12 caracteres ou menos, retorna sem alteração
        if (this.userName.length <= 12) {
            return this.userName;
        }

        // Divide o nome em partes (removendo espaços extras)
        const parts = this.userName.split(" ").filter(part => part !== "");

        // Se houver pelo menos duas partes, usa a primeira e a inicial da segunda
        if (parts.length >= 2) {
            const firstName = parts[0];
            const secondNameAbbr = parts[1].charAt(0);

            // Monta um candidato: "primeiroNome + espaço + inicialDoSegundoNome"
            let candidate = firstName + " " + secondNameAbbr;

            // Se o candidato couber em 12 caracteres, retorna-o
            if (candidate.length <= 12) {
                return candidate;
            } else {
                // Calcula quantos caracteres do primeiro nome são permitidos:
                // 12 caracteres totais menos 1 para o espaço e 1 para a letra do segundo nome.
                const allowedFirstNameLength = 12 - 2; // 10
                // Retorna o primeiro nome encurtado + espaço + inicial do segundo nome
                return firstName.slice(0, allowedFirstNameLength) + " " + secondNameAbbr;
            }
        }

        // Se houver apenas uma parte (nome único) e ele ultrapassar 12 caracteres,
        // utiliza a estratégia de cortar e adicionar reticências (ex: 9 + '...')
        return this.userName.slice(0, 9) + '...';
    }

    // Método para gerar um CVV aleatório
    generateRandomCV() {
        return Math.floor(Math.random() * 900) + 100;  // CVV de 3 dígitos
    }
}


// class reponsavel por manipular os dados inseridos 
class BankDataManager {
    constructor(user) {

    }
}



// class responsavel por filtrar os dados a tela baseada no objeto usuario 
// dados recebidos = objeto usuario presente no local Storage (apenas um usuario nao o array de usuarios)
class UsuarioDataFilter {
    constructor(user) {
        this.user = user
    }

    // retorna os dados pra div atalhos
    filterShortcutData() {
        console.log("metodo que filtra os dados pro configurar atalho")
        console.log(this.user)
    }

    // Retorna os dados necessarios pra div cartao
    filterCardData() {
        const cardAndPurchases = this.user.cards.find(card => card.inUser === true);

        // Cria o objeto com os dados do cartão
        const dateCard = {
            nameCard: cardAndPurchases.nameCard,
            approvedLimit: cardAndPurchases.approvedLimit,
            cardBalance: cardAndPurchases.cardBalance,
            cardStatus: cardAndPurchases.cardStatus,
            limit: cardAndPurchases.limit,
            invoice: cardAndPurchases.invoice,
            dateInvoicePayment: cardAndPurchases.dateInvoicePayment,
            purchase: cardAndPurchases.purchase, // arrai de historico de compras
            dataCard: cardAndPurchases.dataCard, // objeto com os dados do cartao do usuario
        };

        // console.log("Dados do cartão filtrados:", dateCard);
        return dateCard;
    }


    // retorna todo o historico ja organizado por data
    filterPurchaseHistory() {
        console.log("metod que filtra os dados pro historico")
    }
}




// class reponsavel por preencher a parte de cartoes da tela home com infos do usuario
// recbe um objeto com os dados do cartao ja filtrados 
// recebe um objeto com os elementos do doom necesario
class UpdateCardScreen {
    constructor({ nameCard, approvedLimit, cardBalance, limit, invoice, dateInvoicePayment, purchase, dataCard }, elDomCard) {
        // dados do proprio cartao
        const { cardName, cardNumber, cardPassword, cv, expirationDate } = dataCard
        this.cardName = cardName
        this.cardNumber = cardNumber
        this.cardPassword = cardPassword
        this.cardCv = cv
        this.cardExpirationDate = expirationDate

        // dados relacionado ao cartao
        this.nameCard = nameCard
        this.approvedLimit = approvedLimit
        this.cardBalance = cardBalance
        this.limit = limit
        this.invoice = invoice
        this.arayPurchase = purchase
        this.dateInvoicePayment = dateInvoicePayment

        // Desconstrução dos elementos DOM do objeto passado
        const {
            domcardNumber,
            domcardName,
            domvalidade,
            dombarrLmt,
            domlimiteMensal,
            domlimiteDisponivel,
            domultimaCompra,
            domvalorUltimaCompra,
            domBtnAjustLmti,
            domhVlrLimit,
            domLmtEmUso,
            domLmtDisponivel,
            domBarrLmtAprovado,

        } = elDomCard;

        // Atribuindo os elementos desconstruídos às propriedades da instância
        this.domcardNumber = domcardNumber;
        this.domcardName = domcardName;
        this.domvalidade = domvalidade;
        this.dombarrLmt = dombarrLmt;
        this.domlimiteMensal = domlimiteMensal;
        this.domlimiteDisponivel = domlimiteDisponivel;
        this.domultimaCompra = domultimaCompra;
        this.domvalorUltimaCompra = domvalorUltimaCompra;
        this.domBtnAjustLmti = domBtnAjustLmti;
        this.domhVlrLimit = domhVlrLimit;
        this.domLmtEmUso = domLmtEmUso;
        this.domLmtDisponivel = domLmtDisponivel;
        this.domBarrLmtAprovado = domBarrLmtAprovado
    }

    // metodo reponsavel por confeirir se todos os dados estao corretos
    conferiredados() {
        console.group("Verificação dos Dados do Cartão");

        // Dados relacionados ao cartão
        console.log("nameCard:", this.nameCard);
        console.log("approvedLimit:", this.approvedLimit);
        console.log("cardBalance:", this.cardBalance);
        console.log("limit:", this.limit);
        console.log("invoice:", this.invoice);
        console.log("arayPurchase:", this.arayPurchase);

        // Dados do próprio cartão (dados pessoais/internos)
        console.log("cardName:", this.cardName);
        console.log("cardNumber:", this.cardNumber);
        console.log("cardPassword:", this.cardPassword);
        console.log("cv:", this.cv);
        console.log("expirationDate:", this.expirationDate);

        // Elementos DOM
        console.log("domcardNumber:", this.domcardNumber);
        console.log("domcardName:", this.domcardName);
        console.log("domvalidade:", this.domvalidade);
        console.log("dombarrLmt:", this.dombarrLmt);
        console.log("domlimiteMensal:", this.domlimiteMensal);
        console.log("domlimiteDisponivel:", this.domlimiteDisponivel);
        console.log("domultimaCompra:", this.domultimaCompra);
        console.log("domvalorUltimaCompra:", this.domvalorUltimaCompra);
        console.log("domBtnMaisDetalhes:", this.domBtnMaisDetalhes);
        console.log("domDivVerMais:", this.domDivVerMais);
        console.log("domBtnAjustLmti:", this.domBtnAjustLmti);
        console.log("domhVlrLimit:", this.domhVlrLimit);
        console.log("domLmtEmUso:", this.domLmtEmUso);
        console.log("domLmtDisponivel:", this.domLmtDisponivel);
        console.log("domBtnVerMenos:", this.domBtnVerMenos);
        console.log("dombarrlimitDisponivel:", this.domBarrLmtAprovado);

        console.groupEnd();
    }

    // metodo reponsavel por atualizar a tela com os dados recebidos
    refreshScreen() {
        // preenchendo cartao
        this.domcardNumber.textContent = this.cardNumber
        this.domcardName.textContent = this.cardName.toUpperCase()
        this.domvalidade.textContent = this.cardExpirationDate

        // preenchendo limite:
        let creditTransactions = this.arayPurchase.filter(purchase => purchase.type === 'Credito') // filtra compraas no credito 
        let totalCredit = creditTransactions.reduce((sum, transactions) => sum + transactions.value, 0) // soma as compras no credito 
        // barr de limite
        let pctLimit = (totalCredit / this.limit) * 100
        this.dombarrLmt.style.width = `${pctLimit}%`
        // txt de limite mensal
        this.domlimiteMensal.textContent = `R$ ${totalCredit.toLocaleString('pt-BR')}/${this.limit.toLocaleString('pt-BR')}`

        // txt de limite disponivel
        this.domlimiteDisponivel.textContent = `R$ ${this.limit.toLocaleString('pt-BR')}.00`

        // ordena as compras da mais recente pra mais antiga e exibe a mais recente na tela
        let purchaseOrdered = this.arayPurchase.sort((a, b) => new Date(b.date) - new Date(a.date)); // ordena as compras por data
        purchaseOrdered.reverse() // reverte a ordem deixando da mais recente pra mais antiga
        let recentPurchase = purchaseOrdered[0] // acessa a primeira ou seja a mais recente
        this.domultimaCompra.textContent = recentPurchase.merchant
        this.domvalorUltimaCompra.textContent = `R$ ${recentPurchase.value}.00`

        // div do ajustar limit
        this.domhVlrLimit.textContent = `R$ ${this.limit}`
        // barra de limite em uso
        let pctLmtUso = (this.limit / this.approvedLimit) * 100
        this.domBarrLmtAprovado.style.width = `${pctLmtUso}%`
        this.domLmtEmUso.textContent = `Em uso: R$ ${this.limit}`
        this.domLmtDisponivel.textContent = `Disponível para uso: R$ ${this.approvedLimit}`
        return
    }

}





// adicona transacoes e manipula dados relacionados 
class ManipulateTransation {
    constructor(user) {
        this.user = user
    }

    // Método para adicionar a transaçao
    addTransaction(newTransation) {
        this.user.transactions.push(newTransation); // Adiciona a nova transação ao array de transações do usuário

        // atualiza o saldo baseado em transaçoes enviadas ou recebidas
        if (newTransation.type === 'sent') {
            this.user.balance -= newTransation.value // subtrai transaçao do saldo
        }
        else if (newTransation.type === 'received') {
            this.user.balance += newTransation.value // adiciona transaçao ao saldo
        }

        this.salvarUsuario(); //atualiza o usuario
        console.log(this.user)
    }

    // Método para salvar o usuário atualizado no localStorage
    salvarUsuario() {
        // Busca o array de usuários do localStorage
        const usuarios = JSON.parse(localStorage.getItem("listUser")) || [];

        // Encontra o índice do usuário no array usando seu ID
        const index = usuarios.findIndex(user => user.id === this.user.id);

        if (index !== -1) {
            // Atualiza o usuário no array
            usuarios[index] = this.user;

            // Salva o array atualizado no localStorage
            localStorage.setItem("listUser", JSON.stringify(usuarios));

            console.log("Usuário atualizado com sucesso!");
        } else {
            console.error("Usuário não encontrado no localStorage!");
        }
    }
}


// adiciona compras e manipula dodos relacionados
class ManipulatePurchase {
    constructor(user) {
        this.user = user // objeto usuario, contem todos os dados 
    }

    // metodo pra salvar a nova compra 
    addPurchase(newPurchase) {
        // Encontra o cartão em uso (com inUser === true)
        const cardUsing = this.user.cards.find(card => card.inUser === true);

        cardUsing.purchase.push(newPurchase)
        console.log(cardUsing)
        // console.log(newPurchase)

        // verifica se o saldo ou limite e suficiente
        if (newPurchase.type === 'Debito') {
            this.user.balance -= newPurchase.value
        } else if (newPurchase.type === 'Credito') {
            cardUsing.limit -= newPurchase.value
        }

        this.salvarUsuario()
    }


    /** gera fatura
     * Gera faturas agrupando compras no crédito por mês e ano, considerando parcelas.
     * Cada fatura contém o valor total, data de vencimento, status de pagamento e as compras relacionadas.
     */
    generateInvoices() {
        const cartaoAtivo = this.user.cards.find(c => c.inUser); // Encontra o cartão que está ativo (inUser === true)

        if (!cartaoAtivo) {
            console.error("Nenhum cartão ativo encontrado!");
            return
        }

        // Pega apenas as compras do tipo "Credito"
        const comprasCredito = cartaoAtivo.purchase.filter(compra => compra.type === "Credito");

        // Cria um objeto para guardar as faturas, agrupadas por "ano-mês"
        let faturas = {};

        // Para cada compra de crédito:
        comprasCredito.forEach(compra => {
            // converte a data para um objeto data
            let dataCompr = new Date(compra.date)
            // console.log(`objeto data: ${dataCompr}`)

            // calcula o valor das parcelas 
            // se nao ter parcelas pega so o valor da parcela
            let valorParcela = 0
            if (compra.installments > 1) {
                valorParcela = (compra.value / compra.installments)
            } else {
                valorParcela = compra.value
            }
            // console.log(valorParcela)

            // obtem a quantidade de parcelas 
            let numberParcelas = compra.installments || 1
            // console.log(numberParcelas)

            // loop pra cada parcela da compra criar o objeto fatura
            for (let x = 0; x < numberParcelas; x++) {
                // vai adicionando mais 1 mes a cada parcela a partir da data da compra
                let dataParcela = new Date(dataCompr) // pega a data da compra pra saber de onde deve começar as parcelas
                dataParcela.setMonth(dataParcela.getMonth() + x) //vai somando +1 a data da parcela pra criar parcelas
                // console.log(`compra: ${dataCompr}`)
                // console.log(`parcela: ${dataParcela}`)

                // cria uma chave usando o ano e mes da parcela pra cada parcela de cada compra pq ta em um loop
                let chaveDataParcela = `${dataParcela.getFullYear()} - ${dataParcela.getMonth() + 1}`
                // console.log(chaveDataParcComp)

                // cira fatura caso nao tenha ainda pro mes (chave) 
                if (!faturas[chaveDataParcela]) {
                    faturas[chaveDataParcela] = {
                        totalInvoice: 0,
                        expirationDate: this.calculateDueDate(dataParcela), // Data de vencimento da fatura
                        paymentDate: null, // Data pagamento
                        pay: false, // Indica se a fatura foi paga ou não
                        purchaseInstallment: [], // Array de compras feitas no créditoto
                    }
                }

                // soma o valor da parcela ao valor da fatura do mes
                faturas[chaveDataParcela].totalInvoice += parseFloat(valorParcela.toFixed(1));
                // console.log(faturas[chaveDataParcela])

                // console.log(compra)
                // adiconando os dados da parcela a lista de compras da fatura
                faturas[chaveDataParcela].purchaseInstallment.push({
                    ...compra, // compia todas as propriedades da compra
                    parcela: x + 1, //x + 1 pq a primeira interaçao o x e considerado como 0
                    totalParcelas: numberParcelas
                })
            }
        });
        // console.log(faturas)

        // Converte o objeto de faturas em um array e salva no cartão ativo
        cartaoAtivo.invoice = Object.values(faturas)

        // Salva o usuário atualizado (em localStorage, por exemplo)
        this.salvarUsuario();

        console.log("Faturas geradas com sucesso!", cartaoAtivo.invoices);
    }


    /**  Calcula a data de vencimento da fatura.
    * A data de vencimento é definida como o dia 5 do mês seguinte à data da compra.
    */
    calculateDueDate(date) {
        const dueDate = new Date(date);

        // Define o mês seguinte como base
        dueDate.setMonth(dueDate.getMonth() + 1);

        // Define o dia 5 como o vencimento fixo
        dueDate.setDate(5);

        // Retorna a data no formato ISO (pode ser convertida posteriormente para exibição)
        return dueDate.toISOString();
    }


    // metodo pra pagar uma fatura
    // ele recebe uma data que e a data da fatura que sera paga 
    // ele deve colocar a fatura como paga ou seja true 
    // ele deve liberar o valor pago do limite e subtrair do saldo da conta
    // obs devo sempre passar data a partir de 1 mes a frente pos n tem fatura do passado
    payInvoice(monthKeyInvoice) {
        // Procura o cartão que está ativo (ou seja, que está em uso pelo usuário)
        const cardUsing = this.user.cards.find(card => card.inUser === true);

        // Se não encontrar um cartão ativo ou se o cartão não tiver faturas, exibe um erro e interrompe a execução
        if (!cardUsing || !cardUsing.invoice) {
            console.log("Nenhum cartão ativo ou faturas encontradas!");
            alert("Nenhum cartão ativo ou faturas encontradas!");
        } else {
            console.log('card encontrado')
        }

        // procura a fatura cujo vencimento (data) corresponda a chaveData recebida (formato "ano-mes")
        // Aqui, convertemos a data de vencimento da fatura para um objeto Date para extrair o ano e o mês
        const invoiceToPay = cardUsing.invoice.find(f => {
            const dueDate = new Date(f.expirationDate); // Converte a string de data em objeto Date
            // Compara o ano e o mês da data de vencimento com a chave (ex: "2025-2")
            return `${dueDate.getFullYear()}-${dueDate.getMonth() + 1}` === monthKeyInvoice;
        });

        console.log(invoiceToPay)

        // verifica se a fatura foi pega corretamente
        if (!invoiceToPay) {
            console.log("Fatura não encontrada!");
            alert("Fatura não encontrada!");
            return
        }

        // verifica se a fatura ja foi paga
        if (invoiceToPay.pay === true) {
            console.log('a fatura ja foi paga')
            alert('a fatura ja foi paga')
            return
        }

        // verifica se o saldo e insuficiente pra pagar a fatura
        if (invoiceToPay.totalInvoice > this.user.balance) {
            console.log('saldo insuficiente para pagar a fatura')
            alert('saldo insuficiente para pagar a fatura')
            return
        }

        // se for tudo bem ele paga a fatura usando o saldo 
        this.user.balance -= invoiceToPay.totalInvoice

        // libera o valor pago pro limite
        cardUsing.limit += parseFloat(invoiceToPay.totalInvoice.toFixed(1))

        // preenche a data de pagamento da fatura
        invoiceToPay.paymentDate = new Date().toISOString()

        // atulaiza a variavel que defini se a fatura foi paga ou nao
        invoiceToPay.pay = true

        this.salvarUsuario()
    }



    // Método para salvar o usuário atualizado no localStorage
    salvarUsuario() {
        // Busca o array de usuários do localStorage
        const usuarios = JSON.parse(localStorage.getItem("listUser")) || [];

        // Encontra o índice do usuário no array usando seu ID
        const index = usuarios.findIndex(user => user.id === this.user.id);

        if (index !== -1) {
            // Atualiza o usuário no array
            usuarios[index] = this.user;

            // Salva o array atualizado no localStorage
            localStorage.setItem("listUser", JSON.stringify(usuarios));

            // console.log("Usuário atualizado com sucesso!");
        } else {
            console.error("Usuário não encontrado no localStorage!");
        }
    }
}




// adiciona investimento e manipula dados relacionados
class ManipulateInvestment {
    constructor(user) {
        this.user = user
    }

    addInvestment(newInvestment) {


        // calcula o rendimento do investimento e passa ele pro obj newinvestment
        let income = newInvestment.value * newInvestment.pctAnnualIncome
        newInvestment.annualIncome = income

        console.log(newInvestment)
        
        // Adiciona o novo investimento ao histórico do usuário
        this.user.investmentHistory.push(newInvestment);
        alert('investimento salvo')
        console.log('investimento salvo')

        this.salvarUsuario()
    }

    // Método para salvar o usuário atualizado no localStorage
    salvarUsuario() {
        // Busca o array de usuários do localStorage
        const usuarios = JSON.parse(localStorage.getItem("listUser")) || [];

        // Encontra o índice do usuário no array usando seu ID
        const index = usuarios.findIndex(user => user.id === this.user.id);

        if (index !== -1) {
            // Atualiza o usuário no array
            usuarios[index] = this.user;

            // Salva o array atualizado no localStorage
            localStorage.setItem("listUser", JSON.stringify(usuarios));

            console.log("Usuário atualizado com sucesso!");
        } else {
            console.error("Usuário não encontrado no localStorage!");
        }
    }
}
// logica de fatura limite fica na funcao de adicionar compras
