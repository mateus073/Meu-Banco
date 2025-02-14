
// class usaurio que ira criar e salvar o usuario
// vai receber infos do formulario de login e usalas pra criar o Usuario no local stroage 
// dados recebidos:
// nome 
// senha 
// se o usuario clicou em lembrar senha
class Usuario {
    constructor(userName, password, rememberDevice, idUser) {
        this.id = idUser // verifica se pode logar
        this.userName = userName;
        this.password = password;
        this.rememberDevice = rememberDevice; // pode logar altomaticamente na proxima 
        this.accountStatus = 'active';  // Status da conta
        this.accountCreated = new Date();  // Data de criação da conta
        this.investimentos = 0;
        this.saldo = 0;
        this.loanLimit = 5000;  // Limite de empréstimo
        this.transactions = [
            { type: "received", value: 110, date: '2025-02-11T17:24:09.861Z', nameTransaction: 'Person fictitious 01' }, // recebida
            { type: "sent", value: 900, date: '2025-02-08T17:24:09.861Z', nameTransaction: 'Person fictitious 02' }, // enviada 
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
                cardBalance: 1500, // Saldo no cartão
                limit: 3500,
                approvedLimit: 5000,
                invoice: [
                    {
                        id: "fatura_001", // Identificador único
                        descricao: "Conta de Luz",
                        valor: 250.75,
                        dataVencimento: "2025-03-10",
                        dataPagamento: null, // Se for pago, preenche com a data
                        status: "pendente", // "pendente", "pago", "atrasado"
                        metodoPagamento: null, // "cartao", "boleto", "pix", etc.
                        categoria: "Contas",
                    },
                    {
                        id: "fatura_002",
                        descricao: "Cartão de Crédito",
                        valor: 1500.00,
                        dataVencimento: "2025-02-20",
                        dataPagamento: "2025-02-18",
                        status: "pago",
                        metodoPagamento: "pix",
                        categoria: "Crédito",
                    }
                ],
                dateInvoicePayment: '2025-02-28T17:24:09.861Z',
                purchase: [ // compras
                    { type: "Debito", value: 110, date: '2025-02-28T17:24:09.861Z', merchant: 'Bazar Dbgt' },
                    { type: "Credito", value: 984, date: '2025-02-11T17:24:09.861Z', merchant: 'Bazar Mituzi', installments: 7 },
                    { type: "Credito", value: 24, date: '2025-02-12T17:24:09.861Z', merchant: 'Bazar Esferas', installments: 1 },
                    { type: "Debito", value: 664, date: '2025-02-14T17:24:09.861Z', merchant: 'Bazar nituzi' },
                    { type: "Credito", value: 274, date: '2025-02-21T17:24:09.861Z', merchant: 'Bazar Konoha', installments: 4 },
                ],
                dataCard: {
                    cardName: this.nameCard(),
                    cardNumber: this.generateRandomNumber(),
                    cv: this.generateRandomCV(),
                    cardPassword: '123456',
                    expirationDate: '12/30'
                }
            },
            {
                inUser: false, // variavel que define se e pra exibir esse cartao na tela
                nameCard: "card 02 -prataCard",
                cardStatus: 'active',
                cardBalance: 222, // Saldo no cartão
                limit: 2222,
                approvedLimit: 3500,
                invoice: 0, // fatura
                cardPassword: '654321',
                purchase: [ // compr
                    { type: "Credito", value: 910, date: '2025-02-28T17:24:09.861Z', merchant: 'Bazar Mituzi', installments: 4 },
                    { type: "Credito", value: 84, date: '2025-02-31T17:24:09.861Z', merchant: 'Bazar Shokun', installments: 2 },
                    { type: "Debito", value: 334, date: '2025-02-20T17:24:09.861Z', merchant: 'Bazar MM' },
                    { type: "Debito", value: 64, date: '2025-02-24T17:24:09.861Z', merchant: 'Bazar L&D' },
                    { type: "Credito", value: 2474, date: '2025-02-21T17:24:09.861Z', merchant: 'Bazar zk', installments: 7 },
                ],
                dataCard: {
                    cardName: this.nameCard(),
                    cardNumber: this.generateRandomNumber(),
                    cv: this.generateRandomCV(),
                    expirationDate: '12/30'
                }
            }
        ]
        this.investmentHistory = [
            { date: '2025-01-01', value: 1000, type: 'stocks' },
            { date: '2025-01-15', value: 2000, type: 'bonds' }
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





// logica de fatura limite fica na funcao de adicionar compras

