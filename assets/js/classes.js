
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
        this.lastTransactionDate = new Date();  // Data da última transação
        this.loanLimit = 5000;  // Limite de empréstimo
        this.transactions = [
            { type: "received", value: 110, date: new Date().toISOString(), nameTransaction: 'Person fictitious 01' }, // recebida
            { type: "sent", value: 900, date: new Date().toISOString(), nameTransaction: 'Person fictitious 02' }, // enviada 
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
                nameCard: "card 01",
                cardBalance: 1500, // Saldo no cartão
                limite: 3000,
                fatura: 0,
                compras: [
                    { type: "debito", value: 110, date: new Date().toISOString(), merchant: 'Person fictitious' },
                    { type: "Credito", value: 234, date: new Date().toISOString(), merchant: 'Person fictitious' },
                ],
                dataCard: {
                    nameCard: this.userName,
                    statusCard: 'active',
                    numero: this.generateRandomNumber(),
                    cv: this.generateRandomCV(),
                    Senha: this.password,
                }
            },
            {
                inUser: false, // variavel que define se e pra exibir esse cartao na tela
                nameCard: "card 02",
                cardBalance: 222, // Saldo no cartão
                limite: 2222,
                fatura: 0,
                compras: [
                    { type: "credito", value: 22, date: new Date().toISOString(), merchant: 'Person fictitious' },
                    { type: "Credito", value: 211, date: new Date().toISOString(), merchant: 'Person fictitious' },
                    { type: "debito", value: 211, date: new Date().toISOString(), merchant: 'Person fictitious' }
                ],
                dataCard: {
                    statusCard: 'active',
                    numero: this.generateRandomNumber(),
                    cv: this.generateRandomCV(),
                    Senha: this.password,
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
        return Math.floor(Math.random() * 1000000000000);
    }

    // Método para gerar um CVV aleatório
    generateRandomCV() {
        return Math.floor(Math.random() * 900) + 100;  // CVV de 3 dígitos
    }
}


// class responsavel por filtrar os dados a tela baseada no nosso objeto usuario
// dados recebidos = objeto usuario presente no local Storage
class UpdateScreenHome {
    constructor(user) {
        this.user = user
    }

    // retorna os dados pra div atalhos
    datesAtalho() {
        console.log("metodo que filtra os dados pro configurar atalho")
        console.log(this.user)
    }

    // retorna os dados pra div cartao
    datesCard() {
        console.log("metodo que filtra os dados pro cartao")
    }

    // retorna os dados pro hsitorico de compras
    purchaseHistory() {
        console.log("metod que filtra os dados pro historico")
    }
}






