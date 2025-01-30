
// class usaurio que ira criar e salvar o usuario
// vai receber infos do formulario de login e usalas pra criar o Usuario no local stroage 
// dados recebidos:
// nome 
// senha 
// se o usuario clicou em lembrar senha
class Usuario {
    constructor(userName, password, remenberDevice) {
        this.userName = userName;
        this.password = password;
        this.remenberDevice = remenberDevice; // pode logar altomaticamente na proxima 
        this.investimentos = 0;
        this.saldo = 0;
        this.transactions = [
            { type: "received", value: 110, date: new Date().toISOString(), nameTransactio: 'Person fictitious 01' }, // recebida
            { type: "sent", value: 900, date: new Date().toISOString(), nameTransactio: 'Person fictitious 02' }, // enviada 
        ];
        this.card = {
            compras: [
                { type: "debito", value: 110, date: new Date().toISOString(), merchant: 'Person fictitious' },
                { type: "Credito", value: 234, date: new Date().toISOString(), merchant: 'Person fictitious' },
            ],
            dataCard: {
                numero: this.generateRandomNumber(),
                cv: this.generateRandomCV(),
                Senha: this.password,
                limite: 3000,
                fatura: 0,
            }
        }
        this.accountCreated = new Date().toISOString();  // Data de criação da conta
        this.accountStatus = 'active';  // Status da conta
        this.loanLimit = 5000;  // Limite de empréstimo
        this.investmentHistory = [
            { date: '2025-01-01', value: 1000, type: 'stocks' },
            { date: '2025-01-15', value: 2000, type: 'bonds' }
        ];  // Histórico de investimentos
        this.cardBalance = 1500;  // Saldo no cartão
        this.lastTransactionDate = new Date().toISOString();  // Data da última transação
    }

    // Método para gerar um número aleatório para o cartão
    generateRandomNumber() {
        return Math.floor(Math.random() * 1000000000);
    }

    // Método para gerar um CVV aleatório
    generateRandomCV() {
        return Math.floor(Math.random() * 900) + 100;  // CVV de 3 dígitos
    }
}

