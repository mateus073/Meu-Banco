
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
            { type: "received", value: 110, date: '2025-02', nameTransaction: 'Person fictitious 01' }, // recebida
            { type: "sent", value: 900, date: '2025-02-08', nameTransaction: 'Person fictitious 02' }, // enviada 
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
                dateInvoicePayment: '2025-02-28',
                purchase: [ // compras
                    { type: "Debito", value: 110, date: '2025-02-28', merchant: 'Bazar Dbgt' },
                    { type: "Credito", value: 984, date: '2025-02-11', merchant: 'Bazar Mituzi', installments: 7 },
                    { type: "Credito", value: 24, date: '2025-02-12', merchant: 'Bazar Esferas', installments: 1 },
                    { type: "Debito", value: 664, date: '2025-02-14', merchant: 'Bazar nituzi' },
                    { type: "Credito", value: 274, date: '2025-02-21', merchant: 'Bazar Konoha', installments: 4 },
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




// class responsavel por filtrar os dados a tela baseada no objeto usuario 
// dados recebidos = objeto usuario presente no local Storage (apenas um usuario nao o array de usuarios)
// class UsuarioDataFilter {
//     constructor(user) {
//         this.user = user
//     }

//     // retorna os dados pra div atalhos
//     filterShortcutData() {
//         console.log("metodo que filtra os dados pro configurar atalho")
//         console.log(this.user)
//     }

//     // Retorna os dados necessarios pra div cartao
//     filterHomeData() {
//         const cardAndPurchases = this.user.cards.find(card => card.inUser === true);

//         // Cria o objeto com os dados do cartão
//         const dateCard = {
//             nameCard: cardAndPurchases.nameCard,
//             approvedLimit: cardAndPurchases.approvedLimit,
//             cardBalance: cardAndPurchases.cardBalance,
//             cardStatus: cardAndPurchases.cardStatus,
//             limit: cardAndPurchases.limit,
//             invoice: cardAndPurchases.invoice,
//             dateInvoicePayment: cardAndPurchases.dateInvoicePayment,
//             purchase: cardAndPurchases.purchase, // arrai de historico de compras
//             dataCard: cardAndPurchases.dataCard, // objeto com os dados do cartao do usuario
//         };

//         // console.log("Dados do cartão filtrados:", dateCard);
//         return console.log(dateCard);
//     }


//     // retorna todo o historico ja organizado por data
//     filterPurchaseHistory() {
//         console.log("metod que filtra os dados pro historico")
//     }
// }




// class reponsavel por preencher a tela home com infos do usuario
// recbe um objeto com os dados do cartao ja filtrados 
// recebe um objeto com os elementos do doom necesario
class UpdateCardScreen {
    constructor(user, elDomCard) {
        this.userLogado = user
        // Desconstrução dos elementos DOM do objeto passado
        const {
            // divs de atalho
            domAtGastoMes,
            domAtReceb,
            domAtInvest,
            domAtCart,
            domAtSaldo,
            domAtImprest,
            domAtPix,
            domAtRecarga,
            domAtBoleto,
            domAtConfig,

            // Dados do cartão
            domcardNumber,
            domcardName,
            domvalidade,

            // Barra de limite e valores
            dombarrLmt,
            domlimiteMensal,
            domSLimiteDisponivel,

            // Última compra
            domultimaCompra,
            domvalorUltimaCompra,

            // Dados da fatura
            domFaturaAtual,
            domLimiteDisponivel,
            domDAtaFechamentoFatura,

            // Barrinhas que exibem limites
            domBarrVerde,
            domBarrAzul,
            domBarrLaranja,

            // Textos ao lado das barrinhas
            domTxtBarrVerde,
            domTxtBarrAzul,
            domTxtBarrLaranja,

            // Elementos finais do cartão
            domBtnAjustLmti,
            domhVlrLimit,
            domBarrLA,
            domLmtEmUso,
            domLmtDisponivel,

            domDivCompras,
            btnVerExtrato
        } = elDomCard;

        // Atribuição dos elementos desconstruídos às propriedades da instância
        this.domAtGastoMes = domAtGastoMes;
        this.domAtReceb = domAtReceb;
        this.domAtInvest = domAtInvest;
        this.domAtCart = domAtCart;
        this.domAtSaldo = domAtSaldo;
        this.domAtImprest = domAtImprest;
        this.domAtPix = domAtPix;
        this.domAtRecarga = domAtRecarga;
        this.domAtBoleto = domAtBoleto;
        this.domAtConfig = domAtConfig;

        this.domcardNumber = domcardNumber;
        this.domcardName = domcardName;
        this.domvalidade = domvalidade;

        this.dombarrLmt = dombarrLmt;
        this.domlimiteMensal = domlimiteMensal;
        this.domSLimiteDisponivel = domSLimiteDisponivel;

        this.domultimaCompra = domultimaCompra;
        this.domvalorUltimaCompra = domvalorUltimaCompra;

        this.domFaturaAtual = domFaturaAtual;
        this.domLimiteDisponivel = domLimiteDisponivel;
        this.domDAtaFechamentoFatura = domDAtaFechamentoFatura;

        this.domBarrVerde = domBarrVerde;
        this.domBarrAzul = domBarrAzul;
        this.domBarrLaranja = domBarrLaranja;

        this.domTxtBarrVerde = domTxtBarrVerde;
        this.domTxtBarrAzul = domTxtBarrAzul;
        this.domTxtBarrLaranja = domTxtBarrLaranja;

        this.domBtnAjustLmti = domBtnAjustLmti;
        this.domhVlrLimit = domhVlrLimit;
        this.domBarrLA = domBarrLA;
        this.domLmtEmUso = domLmtEmUso;
        this.domLmtDisponivel = domLmtDisponivel;

        this.domDivCompras = domDivCompras
        this.btnVerExtrato = btnVerExtrato
    }

    // Método responsável por conferir se todos os dados estão corretos
    conferirDados() {
        console.group("Verificação dos Dados do Cartão");
        // Elementos DOM
        console.log("domcardNumber:", this.domcardNumber);
        console.log("domcardName:", this.domcardName);
        console.log("domvalidade:", this.domvalidade);
        console.log("dombarrLmt:", this.dombarrLmt);
        console.log("domlimiteMensal:", this.domlimiteMensal);
        console.log("domlimiteDisponivel:", this.domlimiteDisponivel);
        console.log("domultimaCompra:", this.domultimaCompra);
        console.log("domvalorUltimaCompra:", this.domvalorUltimaCompra);
        console.log("domFaturaAtual:", this.domFaturaAtual);
        console.log("domLimiteDisponivel:", this.domLimiteDisponivel);
        console.log("domDAtaFechamentoFatura:", this.domDAtaFechamentoFatura);
        console.log("domBarrVerde:", this.domBarrVerde);
        console.log("domBarrAzul:", this.domBarrAzul);
        console.log("domBarrLaranja:", this.domBarrLaranja);
        console.log("domTxtBarrVerde:", this.domTxtBarrVerde);
        console.log("domTxtBarrAzul:", this.domTxtBarrAzul);
        console.log("domTxtBarrLaranja:", this.domTxtBarrLaranja);
        console.log("domBtnAjustLmti:", this.domBtnAjustLmti);
        console.log("domhVlrLimit:", this.domhVlrLimit);
        console.log("domBarrLmtAprovado:", this.domBarrLmtAprovado);
        console.log("domLmtEmUso:", this.domLmtEmUso);
        console.log("domLmtDisponivel:", this.domLmtDisponivel);

        console.groupEnd();
    }



    conferirurser() {
        let cardUsing = this.userLogado.cards.find(card => card.inUser === true);

        console.log('objeto usuario:')
        console.log(this.userLogado)

        // console.log('cartao em uso:')
        // console.log(cardUsing)
    }

    // metodo reponsavel por atualizar as divs de atalhos
    refreshShortcut() {
        let transReceived = this.userLogado.transactions.filter(transaction => transaction.type === "received")

        let date = new Date();

        // Formata o mês atual
        let currentYear = date.getFullYear();
        let currentMonth = (date.getMonth() + 1).toString().padStart(2, '0');
        let currentDay = date.getDate().toString().padStart(2, '0');

        let month = `${currentYear}-${currentMonth}-${currentDay}`;

        // Cria uma data para o mês anterior
        let previousDate = new Date(date.getFullYear(), date.getMonth() - 1, date.getDate());
        let previousYear = previousDate.getFullYear();
        let previousMonth = (previousDate.getMonth() + 1).toString().padStart(2, '0');
        let previousDay = previousDate.getDate().toString().padStart(2, '0');

        let beforeMonth = `${previousYear}-${previousMonth}-${previousDay}`;

        /*console.log("Mês atual:", month);
        console.log("Mês anterior:", beforeMonth);
        console.log('cartao em uso')
        console.log(transReceived)*/

        // DIV DE GASTOS DO MES
        // chama o metodo reponsavel por obter o gasto do mes(compras e transferencias) e a pct de diferenca do gasto desse mes e do mes anterior
        let monthExpenses = this.monthExpenses()
        let currenExpense = monthExpenses.currentTot // pega o gasto total - mes atual
        let pctDifferenceExpense = monthExpenses.pctDifference // pega a pct de diferenca do gasto desse mes e do anterior

        this.domAtGastoMes.querySelector('.pctAtalho').textContent = `+${pctDifferenceExpense.toLocaleString('pt-BR')}%` // prenche o dom de pct 
        this.domAtGastoMes.querySelector('.valueAtalho').textContent = `R$ ${currenExpense.toLocaleString('pt-BR')}.00` // preenche o dom de valor do gasto do mes

        // pega resultado do metodo que vai obter o total de compras no credito
        let totCred = this.totalinvoice()
        // prenche a div de cartoes
        this.domAtCart.querySelector('.valueAtalho').textContent = `R$ ${totCred.toLocaleString('pt-BR')}.00`

        // prenche a div de saldo
        this.domAtSaldo.querySelector('.valueAtalho').textContent = `R$ ${this.userLogado.balance.toLocaleString('pt-BR')}.00`


        // preenchendo a div de emprestimos:
        this.domAtImprest.querySelector('.valueAtalho').textContent = `R$ ${this.userLogado.loanLimit.toLocaleString('pt-BR')}.00`
    }



    // metodo reponsavel por atualizar a parte do cartoes
    refreshCard() {
        // pegando o cartao que esta em uso
        let cardUsing = this.userLogado.cards.find(card => card.inUser === true);

        // ordena as compras da mais recente pra mais antiga e exibe a mais recente na tela
        let purchaseOrdered = cardUsing.purchase.sort((a, b) => new Date(b.date) - new Date(a.date)); // ordena as compras por data
        purchaseOrdered.reverse() // reverte a ordem deixando da mais recente pra mais antiga

        this.datePurchase(purchaseOrdered) // passa as compras ja organizadas pro metodo que vai preecher e exibir na tela as compras

        // preenchendo cartao
        this.domcardNumber.textContent = cardUsing.dataCard.cardNumber
        this.domcardName.textContent = cardUsing.dataCard.cardName.toUpperCase()
        this.domvalidade.textContent = cardUsing.dataCard.expirationDate

        // preenchendo limite:
        let totalCredit = this.totalinvoice() //metodo que vai obter o valor total da fatura
        // barr de limite
        let pctLimit = (totalCredit / cardUsing.limitAvailable) * 100
        this.dombarrLmt.style.width = `${pctLimit}%`

        // txt de limite mensalc=
        this.domlimiteMensal.textContent = `R$ ${totalCredit.toLocaleString('pt-BR')}/${cardUsing.limitAvailable.toLocaleString('pt-BR')}`

        // // txt de limite disponivel
        this.domSLimiteDisponivel.textContent = `R$ ${cardUsing.limitAvailable.toLocaleString('pt-BR')}.00`

        // exibindo a ultima compra
        let recentPurchase = purchaseOrdered[0] // acessa a primeira ou seja a mais recente
        let nameBreve = this.shortenName(recentPurchase.merchant)
        this.domultimaCompra.textContent = nameBreve
        this.domvalorUltimaCompra.textContent = `R$ ${recentPurchase.value}.00`

        // Primeira div que é exibida após clicar em "ver mais" 
        //obtendo a fatura atual e preenche oque precisa de seus dados
        const currentDate = new Date();
        const month = currentDate.getMonth() + 1; // getMonth() retorna 0-11, por isso somamos 1
        const year = currentDate.getFullYear();

        // Cria a chave no formato "ano-mês" (exemplo: "2025-2")
        const dateKey = `${year}-${month + 1}`; // +1 pq ele e pra pegar a fatura do proximo mes abaixo

        // Procura a fatura cujo vencimento (data) corresponda à chave (formato "ano-mês")
        // Converte a data de vencimento da fatura para um objeto Date para extrair o ano e o mês
        const invoiceToPay = cardUsing.invoice.find(f => {
            const dueDate = new Date(f.expirationDate);
            const dueKey = `${dueDate.getFullYear()}-${dueDate.getMonth() + 1}`;
            return dueKey === dateKey;
        });

        // verifica se a fatura atual existe e se nao esta paga 
        // e preeche os elementos da primeira div que e exibida no ver mais do cartao
        if (invoiceToPay) {
            //  lmtDisponivel recebe o limit em uso menos o valor total das compras no credito
            let lmtDisponivel = cardUsing.limitAvailable - totalCredit

            // obtem o valor total de todas as faturas
            let invoices = cardUsing.invoice
            let somInvoices = invoices.reduce((tot, item) => tot + (item.totalInvoice || 0), 0)

            // obtem o valor das proximas fatura subtraindo o valor da fatura atual
            let valPrInvoices = somInvoices - invoiceToPay.totalInvoice

            // preenche a parte esqueda da div extra que mostra fatura atual, lmt disponivel e data de vencimento 
            this.domFaturaAtual.textContent = `R$ ${invoiceToPay.totalInvoice}` //texto de fatura
            this.domLimiteDisponivel.textContent = lmtDisponivel.toFixed(2) // limite deisponivel 
            this.domTxtBarrVerde.textContent = lmtDisponivel.toFixed(2) // text da div extraa com barr vertical direita

            // acessando data de fechamento da fatura e deixando ela no formato que o metodo que ira formatala aceite 
            let dateClose = new Date(invoiceToPay.expirationDate)
            let year = dateClose.getFullYear();
            let month = dateClose.getMonth() + 1; // getMonth() retorna de 0 a 11, por isso adiciona 1
            let day = dateClose.getDate();
            let newDAtef = `${year}-${month}-${day}`;
            this.domDAtaFechamentoFatura.textContent = this.formatDate(newDAtef) // preenche a tela com a data no formato ex: 22 de marco


            // preeche a barra vertical azul e o txt de (fatura atual)
            let pctBlue = (invoiceToPay.totalInvoice / cardUsing.limitAvailable) * 100
            this.domBarrAzul.style.height = `${pctBlue}%`
            this.domTxtBarrAzul.textContent = `R$ ${invoiceToPay.totalInvoice}` // tecto de fatura do lado direito


            // preenche a barra vertical laranja e seu texto (Proximas faturas)
            let pctorange = (valPrInvoices / cardUsing.limitAvailable) * 100
            this.domBarrLaranja.style.height = `${pctorange}%`
            this.domTxtBarrLaranja.textContent = valPrInvoices.toFixed(2)

            // console.log("Fatura do mes encontrada:", invoiceToPay);
        } else {
            console.log("Nenhuma fatura encontrada para este mes:", dateKey);
        }

        // elementos da div de ajustar limit:
        this.domhVlrLimit.textContent = `R$ ${totalCredit.toLocaleString('pt-BR')}`

        this.domBarrLA.style.width = `${pctLimit}%`

        this.domLmtEmUso.textContent = `Em uso: R$ ${cardUsing.limitAvailable}`
        this.domLmtDisponivel.textContent = `Disponivel para uso: R$ ${cardUsing.approvedLimit}`

        return
    }



    // metodo responsavel por obter o valor tototal dos valores de compras feitas no credito
    totalinvoice() {
        // pegando o cartao que esta em uso
        let cardUsing = this.userLogado.cards.find(card => card.inUser === true);

        // somanda as compras no credito:
        let creditTransactions = cardUsing.purchase.filter(purchase => purchase.type === 'Credito') // filtra compraas no credito 
        let totalCredit = creditTransactions.reduce((sum, transactions) => sum + transactions.value, 0) // soma as compras no credito 

        return totalCredit
    }



    // metodo reponsavel por obter o valor total dos gastos incluindo compras feitas no cred e deb, transaçoes feitas
    monthExpenses() {
        let currentMonthPurchase = 0; // toral de compras no cartao desse mes
        let previusMonthPurchase = 0; // toral de compras no cartao do mes passado

        let currentMonthTransaction = 0; // total de transferenica feita nesse mes 
        let previusMonthTransaction = 0; // total de transferenica feita mes no mes pasado

        let allOK = false; // variavel de controle 


        // obtendo a data atual e do mes passado no formato 'YYYY-MM':
        const today = new Date();

        // Obtém o ano e o mês atual (lembrando que getMonth() retorna 0 para janeiro, por isso somamos 1)
        const currentYear = today.getFullYear();
        const currentMonth = (today.getMonth() + 1).toString().padStart(2, '0');
        const currentYearMonth = `${currentYear}-${currentMonth}`;
        // console.log("Mês/Ano atual:", currentYearMonth);

        // Para obter a data de um mês atrás, criamos uma nova data com o mês decrementado
        const previusdateMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
        const previudateYear = previusdateMonth.getFullYear();
        const previusMonth = (previusdateMonth.getMonth() + 1).toString().padStart(2, '0');
        const previusYearsMont = `${previudateYear}-${previusMonth}`;
        // console.log("Mês/Ano de um mês atrás:", previusYearsMont);



        // OBTEM OS VALORES DAS COMPRAS NO CARTAO
        // pegando o cartao que esta em uso
        let cardUsing = this.userLogado.cards.find(card => card.inUser === true);
        let purchase = cardUsing.purchase
        // console.log(purchase)

        // criando objeto com o valor total e as compras de cada mes
        const groupPurchase = purchase.reduce((acc, purchase) => {
            // converte a data pra um objeto date e extrai o ano e mes
            const dateObj = new Date(purchase.date)
            const year = dateObj.getFullYear()
            const month = (dateObj.getMonth() + 1).toString().padStart(2, '0'); // padStart garante dois dígitos
            const key = `${year}-${month}`

            // se nao existir essa chave ainda, cria o objeto inicial
            if (!acc[key]) {
                acc[key] = {
                    total: 0,
                    purchase: []
                }
            }

            // acumula o valor da compra e armazena a compra
            acc[key].total += purchase.value
            acc[key].purchase.push(purchase)
            return acc;
        }, {})

        // console.log(groupPurchase)
        if (groupPurchase[`${currentYearMonth}`].total && groupPurchase[`${previusYearsMont}`].total) {
            currentMonthPurchase = groupPurchase[`${currentYearMonth}`].total // obtem o valor das compras desse mes 
            previusMonthPurchase = groupPurchase[`${previusYearsMont}`].total // obtem o valor das compras do mes passado
            // console.log(`Valor total das compras feitas no cartão - mês passado: ${previusMonthPurchase}`)
            // console.log(`Valor total das compras feitas no cartão - mês atual: ${currentMonthPurchase}`)
            allOK = true
        } else {
            allOK = false
            console.log('Erro: Compras dos últimos dois meses não encontradas para essa funcionalidade')
        }




        // OBTEM OS VALORES DAS TRANSAÇOES FEITAS ESSE MES
        const SentTransactions = this.userLogado.transactions.filter(transaction => transaction.type === 'sent')
        // console.log(SentTransactions)

        // criando objeto com o valor total das transaçoes feitas(nao as recebidas) de cada mes
        const groupTransaction = SentTransactions.reduce((acc, transaction) => {
            // converte a data pra um objeto date e extrai o ano e mes
            const dateObj = new Date(transaction.date)
            const year = dateObj.getFullYear()
            const month = (dateObj.getMonth() + 1).toString().padStart(2, '0'); // padStart garante dois dígitos
            const key = `${year}-${month}`

            // se nao existir essa chave ainda, cria o objeto inicial
            if (!acc[key]) {
                acc[key] = {
                    total: 0,
                    transaction: []
                }
            }

            // acumula o valor da compra e armazena a compra
            acc[key].total += transaction.value
            acc[key].transaction.push(transaction)
            return acc;
        }, {})
        // console.log(groupTransaction)

        // console.log(groupTransaction)
        if (groupTransaction[`${currentYearMonth}`].total && groupTransaction[`${previusYearsMont}`].total) {
            currentMonthTransaction = groupTransaction[`${currentYearMonth}`].total // obtem o valor das compras desse mes 
            previusMonthTransaction = groupTransaction[`${previusYearsMont}`].total // obtem o valor das compras do mes passado
            // console.log(`Valor total das transações feitas - mês passado: ${previusMonthTransaction}`)
            // console.log(`Valor total das transações feitas - mês atual: ${currentMonthTransaction}`)
            allOK = true
        } else {
            console.log('erro, transaçoes feitas nos ultimos dois meses nao encontradas para essa funcionalidae')
            allOK = false
        }

        if (allOK) {
            let curretTotExpense = currentMonthPurchase + currentMonthTransaction
            let previusTotExpense = previusMonthPurchase + previusMonthTransaction
            // console.log(`gastos totais desse mes: ${curretTotExpense}`)
            // console.log(`gastos totoais do mes passado ${previusTotExpense}`)

            //calculo pra descobri a diferenca em pct
            let pctDifference = ((curretTotExpense - previusTotExpense) / previusTotExpense) * 100;
            let pctFormatted = Math.round(pctDifference)

            console.log(`difenrenca em pect: ${pctFormatted}`)
            
            return {
                currentTot: curretTotExpense,
                pctDifference: pctFormatted
            }
        }








    }

    // metodo que obtem a quantidade de datas que foi feito pelo menos 1 compra pra saber a quantidade de divs irei criar
    datePurchase(purchaseOrdered) {
        // console.log(purchaseOrdered)

        //  Set e usado para guardar combinações únicas de ano e mês (ex.: "2025-02")
        const unicoYearMont = new Set();
        let arrayDate = []

        purchaseOrdered.forEach(purchase => {
            // A data completa já está no formato YYYY-MM-DD, então podemos usá-la diretamente como chave
            const fullDate = purchase.date;

            // Verificamos se essa combinação de ano e mês já está no Set.
            if (!unicoYearMont.has(fullDate)) {
                // Se NÃO estiver, adicionamos ao Set para rastrear que já encontramos esse ano e mês
                unicoYearMont.add(fullDate)

                // E então imprimimos a data no console (ou podemos armazená - la em outro lugar)
                arrayDate.push(fullDate)
                // console.log(fullDate);
            }
        })

        this.createDivsDte(arrayDate, purchaseOrdered)
        // console.log(arrayDate.length)
    }


    /* metodo que ira criar a lista de compras organizando as compras de cada dia em sua propria ul*/
    createDivsDte(arrayDate, purchaseOrdered) {
        // console.log(arrayDate);
        // console.log(purchaseOrdered);
        // console.log(this.domDivCompras);

        // Para cada data em arrayDate
        arrayDate.forEach(data => {
            // Cria o container para a data
            const divDiaMes = document.createElement("div");
            divDiaMes.classList.add("dDiaMes");

            // Cria e formata o título com a data
            const h3Title = document.createElement("h3");
            h3Title.classList.add("titleDataCompr");
            let dateF = this.formatDate(data); // Formata a data (ex.: "10 de Abril")
            h3Title.textContent = dateF;

            // Cria a lista para os itens de compra
            const ulComp = document.createElement("ul");
            ulComp.classList.add("ulComp");
            ulComp.setAttribute('data-op', data);

            // Filtra os itens de compra que correspondem à data atual
            const comprasDoDia = purchaseOrdered.filter(item => item.date === data);

            // Para cada compra que corresponde à data, cria os elementos necessários
            comprasDoDia.forEach(compra => {
                let name = compra.merchant;
                let type = compra.type;
                let value = compra.value;

                // Cria o elemento principal com classe "itemLst"
                const itemLst = document.createElement('div');
                itemLst.classList.add('itemLst');

                // Cria o container esquerdo para nome e tipo
                const itemLstEsquerda = document.createElement('div');
                itemLstEsquerda.classList.add('itemLstEsquerda');

                // Cria o span para o nome do estabelecimento
                const nLugar = document.createElement('span');
                nLugar.classList.add('nLugar');
                nLugar.textContent = name;

                // Cria o span para indicar crédito ou débito
                const credDeb = document.createElement('span');
                credDeb.classList.add('CredDeb');
                credDeb.textContent = `Compra no ${type}`;

                // Anexa os spans ao container esquerdo
                itemLstEsquerda.appendChild(nLugar);
                itemLstEsquerda.appendChild(credDeb);

                // Cria o container direito para o valor
                const itemLstDireta = document.createElement('div');
                itemLstDireta.classList.add('itemLstDireta');
                itemLstDireta.textContent = `R$ ${value},00`;

                // Monta o item da lista
                itemLst.appendChild(itemLstEsquerda);
                itemLst.appendChild(itemLstDireta);

                // Adiciona o item à lista UL
                ulComp.appendChild(itemLst);
            });

            // Anexa o título e a lista de compras à div do dia
            divDiaMes.appendChild(h3Title);
            divDiaMes.appendChild(ulComp);

            // Adiciona o container de data e compras ao container principal
            this.domDivCompras.appendChild(divDiaMes);
        });
        this.showAndHidenPurchase()

        // console.log(arrayDate);
    }


    /*metodo reponsavel pela exibiçao de apenas 7 compras
    faz um loop while que enquanto n chegar no 7 ele da a classs que exibe a li(compra)
    se passar desse 7 da a class que da display none
    dps pega as ul que tem li com a class de display none e da display none */
    showAndHidenPurchase() {
        const limit = 7; // Limite de exibição
        let count = 0; // Contador global para as compras exibidas

        // Seleciona todos os containers de dia
        const dayContainers = document.querySelectorAll('.listsComp .dDiaMes');

        // Inicialmente, percorre cada container para exibir apenas os primeiros 7 itens (globalmente)
        dayContainers.forEach(day => {
            // Exibe o container do dia
            day.style.display = 'block';

            // Seleciona a lista de compras e seus itens
            const ul = day.querySelector('.ulComp');
            const items = Array.from(ul.querySelectorAll('.itemLst'));

            // Gerencia a visibilidade dos itens usando um loop forEach (você também pode usar while)
            items.forEach(item => {
                if (count < limit) {
                    item.classList.remove('hidePurchase'); // Exibe o item
                    count++;
                } else {
                    item.classList.add('hidePurchase'); // Oculta o item
                }
            });

            // Se todos os itens do dia estiverem ocultos, oculta o container do dia (oculta a div interira incluise h3 de data)
            const visibleItems = items.filter(item => !item.classList.contains('hidePurchase'));
            if (visibleItems.length === 0) {
                day.style.display = 'none';
            }
        });

        // Seleciona o botão de "Ver mais"/"Ver menos" (garanta que ele exista no DOM)
        const btnVerComp = document.querySelector('.btnVerExtrado');
        if (btnVerComp) {
            btnVerComp.addEventListener('click', () => {
                let hiddenExists = false;

                // Verifica se em algum container ainda há itens ocultos
                dayContainers.forEach(day => {
                    const ul = day.querySelector('.ulComp');
                    const items = Array.from(ul.querySelectorAll('.itemLst'));
                    if (items.some(item => item.classList.contains('hidePurchase'))) {
                        hiddenExists = true;
                    }
                });

                if (hiddenExists) {
                    // Se houver itens ocultos, exibe todos eles e altera o texto para "Ver menos"
                    dayContainers.forEach(day => {
                        day.style.display = 'block';
                        const ul = day.querySelector('.ulComp');
                        const items = Array.from(ul.querySelectorAll('.itemLst'));
                        items.forEach(item => item.classList.remove('hidePurchase'));
                    });
                    btnVerComp.textContent = 'VER MENOS';
                } else {
                    // Se não houver itens ocultos, re-aplica o limite de 7 e altera o texto para "Ver mais"
                    count = 0; // Reinicia o contador
                    dayContainers.forEach(day => {
                        const ul = day.querySelector('.ulComp');
                        const items = Array.from(ul.querySelectorAll('.itemLst'));
                        items.forEach(item => {
                            if (count < limit) {
                                item.classList.remove('hidePurchase');
                                count++;
                            } else {
                                item.classList.add('hidePurchase');
                            }
                        });

                        // Verifica se o container deve ser exibido ou ocultado
                        const visibleItems = items.filter(item => !item.classList.contains('hidePurchase'));
                        day.style.display = visibleItems.length > 0 ? 'block' : 'none';
                    });
                    btnVerComp.textContent = 'VER EXTRATO';
                }
            });
        }

        console.log('Exibição configurada.');
    }


    // Método para abreviar o nome do usuário para o cartão
    shortenName(name) {
        // Se o nome já tiver 12 caracteres ou menos, retorna sem alteração
        if (name.length <= 12) {
            return name;
        }

        // Remove espaços em excesso e divide o nome em partes
        const parts = name.trim().split(/\s+/);

        // Se houver ao menos duas partes, usa a lógica para dois nomes
        if (parts.length >= 2) {
            const firstName = parts[0];
            const secondName = parts[1]; // tenta manter o segundo nome por completo
            const fullCandidate = firstName + " " + secondName;

            // Se o nome composto (primeiro + espaço + segundo) couber em 12 caracteres, retorna-o
            if (fullCandidate.length <= 12) {
                return fullCandidate;
            } else {
                // Calcula quantos caracteres do primeiro nome podem ser usados para que,
                // junto com o espaço e o segundo nome completo, o total seja 12
                const allowedFirstNameLength = 12 - (1 + secondName.length);
                if (allowedFirstNameLength > 0) {
                    return firstName.slice(0, allowedFirstNameLength) + " " + secondName;
                } else {
                    // Se não houver espaço para nenhuma letra do primeiro nome,
                    // retorna o segundo nome truncado para 12 caracteres
                    return secondName.slice(0, 12);
                }
            }
        }

        // Caso haja somente uma parte (nome único), utiliza a estratégia de truncar e adicionar reticências
        return name.slice(0, 9) + '...';
    }



    // metodo responsavel por abreviar as Datas colocando dia e mes ex: '03 junho'
    // deve receber a  data no seguinte formato: "2025-02-12"
    formatDate(data) {
        // data no formato "YYYY-MM-DD"
        const partes = data.split('-');
        const ano = partes[0];      // Recebe o ano, mas não será usado na saída
        const mes = parseInt(partes[1], 10); // Converte "02" para 2
        const dia = partes[2];

        const nomesDosMeses = [
            'janeiro', 'fevereiro', 'março', 'abril',
            'maio', 'junho', 'julho', 'agosto',
            'setembro', 'outubro', 'novembro', 'dezembro'
        ];

        // Retorna a data formatada ignorando o ano (exibe "dia mes")
        // console.log(`${dia}/${nomesDosMeses[mes - 1]}`);
        let month = nomesDosMeses[mes - 1]
        let day = dia

        // Adiciona zero à esquerda se necessário
        let nameMes = month < 10 ? '0' + month : month;
        let nameday = day < 10 ? '0' + day : day;

        // retorna a data formatada 
        return `${nameday}/${nameMes.slice(0, 3)}`
    }
}



/* ============================================== 
    CLASSES REFENTE A "INSERIR DADOS"
================================================= */


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
