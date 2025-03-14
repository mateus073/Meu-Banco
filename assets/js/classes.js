/**
 * Classe Usuario
 * Cria e salva as informações do usuário no localStorage.
 * Recebe dados do formulário de login:
 * - Nome do usuário
 * - Senha
 * - Opção "lembrar senha" (para login automático)
 *
 * OBS: Os métodos da classe não serão preservados ao armazenar o objeto
 * no localStorage, pois ele aceita apenas dados (sem funções).
 */
class Usuario {
    constructor(userName, password, rememberDevice, idUser) {
        // Dados básicos e de autenticação
        this.id = idUser  // Identificador único do usuário (usado para login)
        this.userName = userName;
        this.password = password;
        this.rememberDevice = rememberDevice;  // Flag para login automático 

        // Informações de conta
        this.accountStatus = 'active';
        this.accountCreated = new Date();   // Data de criação da conta
        this.investimentos = 0;             // Total investido (inicialmente zero)
        this.balance = 4000;                // Saldo inicial da conta
        this.loanLimit = 5000;              // Limite de empréstimo disponível

        // Histórico de transações (exemplos iniciais)
        this.transactions = [
            { type: "received", value: 110, date: '2025-02-02', nameTransaction: 'Person fictitious 01' }, // recebida
            { type: "sent", value: 900, date: '2025-02-08', nameTransaction: 'Person fictitious 02' }, // enviada 
        ];

        // chaves pix
        this.pixKey = [
            { tipo: 'CPF', chave: '' },
            { tipo: 'Email', chave: '' },
            { tipo: 'Telefone', chave: '' },
            { tipo: 'Aleatória', chave: '' }
        ];

        // Dados pra criaçao e exibiçao dos atalhos 
        this.shortcuts = [
            { id: 1, name: 'gastosMes', imgSrc: '../assets/img/extrato-bancrio.png', idName: 'atalhoGastoMes', visible: true },
            { id: 2, name: 'recebimentos', imgSrc: '../assets/img/benefcios.png', idName: 'atalhoRecebimentos', visible: true },
            { id: 3, name: 'investimentos', imgSrc: '../assets/img/investment.png', idName: 'atalhoInvestimentos', visible: true },
            { id: 4, name: 'cartoes', imgSrc: '../assets/img/cartoes-de-credito.png', idName: 'atalhoCartoes', visible: true },
            { id: 5, name: 'Saldo', imgSrc: '../assets/img/saldo.png', idName: 'atalhoSaldo', visible: false },
            { id: 6, name: 'emprestimo', imgSrc: '../assets/img/emprestimo.png', idName: 'atalhoEmprestimo', visible: false },
            { id: 7, name: 'pix', imgSrc: '../assets/img/chave.png', idName: 'AtalhoPix', visible: false },
            { id: 8, name: 'recarga', imgSrc: '../assets/img/movel-5g.png', idName: 'atalhoRecarga', visible: false },
            { id: 9, name: 'boleto', imgSrc: '../assets/img/leitura-de-codigo-de-barras.png', idName: 'atalhoBoleto', visible: false }
        ];

        // Informações dos cartões associados à conta
        this.cards = [
            {
                inUser: true,                   // variavel que define se e pra exibir esse cartao na tela
                nameCard: "card 01 - ouroCard",
                cardStatus: 'active',
                limit: 3500,                    // limite que irei subtrair valor das compras
                limitAvailable: 3500,           // limite em uso 
                approvedLimit: 5000,            // limite aprovado 
                invoice: [],                    // array de faturas
                dateInvoicePayment: '2025-02-28',
                purchase: [ // Compras realizadas com o cartão
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
            { // Cartão inativo (não exibido na tela)
                inUser: false,          // variavel que define se e pra exibir esse cartao na tela
                nameCard: "card 02 - prataCard",
                cardStatus: 'active',
                limit: 3000,
                limitAvailable: 3000,
                approvedLimit: 3500,
                invoice: [], // array de faturas
                cardPassword: '654321',
                dateInvoicePayment: '2025-02-28T17:24:09.861Z',
                purchase: [ // compras
                    { type: "Debito", value: 110, date: '2025-02-28', merchant: 'Bazar Dbgt' },
                    { type: "Credito", value: 984, date: '2025-02-11', merchant: 'Bazar Mituzi', installments: 7 },
                    { type: "Credito", value: 24, date: '2025-02-12', merchant: 'Bazar Esferas', installments: 1 },
                    { type: "Debito", value: 664, date: '2025-02-14', merchant: 'Bazar nituzi' },
                    { type: "Credito", value: 274, date: '2025-02-21', merchant: 'Bazar Konoha', installments: 4 },
                ],
                dataCard: {
                    cardName: this.nameCard(),
                    cardNumber: this.generateRandomNumber(),
                    cv: this.generateRandomCV(),
                    cardPassword: '654321',
                    expirationDate: '11/30'
                }
            }
        ];
        this.investmentHistory = [
            { type: 'stocks', date: '2025-01-01', value: 1000, annualIncome: 0.05, },
            { type: 'bonds', date: '2025-01-15', value: 2000, annualIncome: 0.07, }
        ];
    }

    /** Gera um número aleatório formatado para o cartão.
    * - Gera um número de 16 dígitos.
    * - Preenche com zeros à esquerda, se necessário.
    * - Formata em grupos de 4 dígitos separados por espaço.
    * @returns {string} Número do cartão formatado.
    */
    generateRandomNumber() {
        const randomNumber = Math.floor(Math.random() * 10000000000000000);

        // Converte o número para string e preenche com zeros à esquerda, garantindo 16 dígitos
        const paddedNumber = randomNumber.toString().padStart(16, '0');

        // Divide a string em grupos de 4 caracteres e junta-os com espaços
        const formattedNumber = paddedNumber.match(/.{1,4}/g).join(" ");

        return formattedNumber;
    }


    /** Abrevia o nome do usuário para exibição no cartão.
     * - Se o nome tiver até 12 caracteres, retorna-o completo.
     * - Se tiver mais, utiliza a primeira parte e a inicial da segunda.
     * - Se ainda exceder, corta o primeiro nome e adiciona reticências.
     * @returns {string} Nome abreviado para o cartão.
     */
    nameCard() {
        if (this.userName.length <= 12) {
            return this.userName;
        }
        const parts = this.userName.split(" ").filter(part => part !== "");

        if (parts.length >= 2) {
            const firstName = parts[0];
            const secondNameAbbr = parts[1].charAt(0);

            let candidate = firstName + " " + secondNameAbbr;

            if (candidate.length <= 12) {
                return candidate;
            } else {
                const allowedFirstNameLength = 12 - 2; 
                return firstName.slice(0, allowedFirstNameLength) + " " + secondNameAbbr;
            }
        }

        // Se houver apenas uma parte (nome único) e ele ultrapassar 12 caracteres,
        // utiliza a estratégia de cortar e adicionar reticências (ex: 9 + '...')
        return this.userName.slice(0, 9) + '...';
    }

        /**
     * Gera um CVV aleatório de 3 dígitos para o cartão.
     * @returns {number} CVV gerado.
     */
    generateRandomCV() {
        return Math.floor(Math.random() * 900) + 100;  // CVV de 3 dígitos
    }
}






/* CLASS REPONAVEL PELOS ATALHO DA TELA DE HOME
*/
class HomeUpdateShortcutScreen {
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

            domModalAtOverlei,
            domModalAtModal,
            domModalbtnFechar,
            domModalAtSelecionados,
            domModalAtNaoSelecionados
        } = elDomCard

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

        this.domModalAtOverlei = domModalAtOverlei
        this.domModalAtModal = domModalAtModal
        this.domModalbtnFechar = domModalbtnFechar
        this.domModalAtSelecionados = domModalAtSelecionados
        this.domModalAtNaoSelecionados = domModalAtNaoSelecionados
    }

    // metodo pra conferir se os dados inseridos estao corretos:
    conferirurser() {
        let cardUsing = this.userLogado.cards.find(card => card.inUser === true);

        console.log('objeto usuario:')
        console.log(this.userLogado)

        console.log('cartao em uso:')
        console.log(cardUsing)
    }


    // ATUALIZA O DOM DO ATALHO
    refreshShortcut() {
        // DIV DE GASTOS DO MES
        // chama o metodo reponsavel por obter o gasto do mes(compras e transferencias) e a pct de diferenca do gasto desse mes e do mes anterior
        let monthExpenses = this.monthExpenses()
        console.log(monthExpenses)
        let currenExpense = monthExpenses.currentTot // pega o gasto total - mes atual
        let pctDifferenceExpense = monthExpenses.pctDifference // pega a pct de diferenca do gasto desse mes e do anterior
        // verifica se o resultado e negativo pra saber se adiciono o "+" na frente ou nao
        if (pctDifferenceExpense > 0) {
            this.domAtGastoMes.querySelector('.pctAtalho').textContent = `+${pctDifferenceExpense.toLocaleString('pt-BR')}%` // prenche o dom de pct 
        } else {
            this.domAtGastoMes.querySelector('.pctAtalho').textContent = `${pctDifferenceExpense.toLocaleString('pt-BR')}%` // prenche o dom de pct 
        }
        this.domAtGastoMes.querySelector('.valueAtalho').textContent = `R$ ${currenExpense.toLocaleString('pt-BR')}.00` // preenche o dom de valor do gasto do mes


        // DIV DE RECEBIMENTOS DO MES
        // chama o metodo reponsavel por obter o gasto do mes(compras e transferencias) e a pct de diferenca do gasto desse mes e do mes anterior
        let monthReceived = this.moneyReceived()
        let currenReceived = monthReceived.receivedCurrentTot // pega o gasto total - mes atual
        let pctDifferenceReceived = monthReceived.receivedPctDifference // pega a pct de diferenca do gasto desse mes e do anterior
        // verifica se o resultado e negativo pra saber se adiciono o "+" na frente ou nao
        if (pctDifferenceReceived > 0) {
            this.domAtReceb.querySelector('.pctAtalho').textContent = `+${pctDifferenceReceived.toLocaleString('pt-BR')}%`
        } else {
            this.domAtReceb.querySelector('.pctAtalho').textContent = `${pctDifferenceReceived.toLocaleString('pt-BR')}%`
        }
        this.domAtReceb.querySelector('.valueAtalho').textContent = `R$ ${currenReceived.toLocaleString('pt-BR')}.00`

        // DIV DE INVESTIMENTOS
        // chama metodo responsavel por obter o valor final do total dos investimentos (valor investido/ lucro ate o momento / pct de lucro)
        let objtotlInvested = this.aggregateInvestmentResults()
        let investedProfit = objtotlInvested.totalProfit
        let investedTot = objtotlInvested.totalInvested
        let investedPct = objtotlInvested.profitPercentage

        this.domAtInvest.querySelector('.pctInvestments').textContent = `+R$${investedProfit.toLocaleString('pt-BR')}(+${investedPct.toLocaleString('pt-BR')}%)`
        this.domAtInvest.querySelector('.valueAtalho').textContent = `R$ ${investedTot.toLocaleString('pt-BR')}.00`


        // DIV ATALHO CARTOES 
        // pega resultado do metodo que vai obter o total de compras no credito
        let totCred = this.totalinvoice()
        this.domAtCart.querySelector('.valueAtalho').textContent = `R$ ${totCred.toLocaleString('pt-BR')}.00`

        // DIV ATALHO SALDO
        // prenche a div de saldo
        this.domAtSaldo.querySelector('.valueAtalho').textContent = `R$ ${this.userLogado.balance.toLocaleString('pt-BR')}.00`

        // DIV ATALHO EMPRESTIMO
        // preenchendo a div de emprestimos:
        this.domAtImprest.querySelector('.valueAtalho').textContent = `R$ ${this.userLogado.loanLimit.toLocaleString('pt-BR')}.00`

        // // atualizaçao inical do editar atalhos: 
        // let userat = this.userLogado.shortcuts
        // this.createDivsOpcShortcut(userat)
    }


    // Método para criar as opções de atalhos baseadas no local storage
    createDivsOpcShortcut(userat) {
        // Limpa os contêineres antes de adicionar novos elementos
        this.domModalAtSelecionados.innerHTML = "";
        this.domModalAtNaoSelecionados.innerHTML = "";

        // Loop para criar elementos HTML
        userat.forEach(shortcut => {
            // Cria a div e adiciona atributos e classe
            const div = document.createElement('div');
            div.setAttribute('data-name', shortcut.idName);
            div.classList.add('option-item');

            // Cria a imagem
            const img = document.createElement('img');
            img.setAttribute('src', shortcut.imgSrc);
            img.setAttribute('alt', shortcut.name);

            // Cria o span com o nome
            const span = document.createElement('span');
            span.textContent = shortcut.name;

            // Cria o botão e adiciona classe
            const button = document.createElement('button');
            button.classList.add('btnAt');

            // Anexa os elementos à div
            div.appendChild(img);
            div.appendChild(span);
            div.appendChild(button);

            // Define o contêiner com base na visibilidade e anexa a div
            const container = shortcut.visible ? this.domModalAtSelecionados : this.domModalAtNaoSelecionados;
            container.appendChild(div);
        });

        // Configura eventos de clique para gerenciar os atalhos
        this.configShortCut();
        this.openCloseModalAt();
    }

    // Método que configura os atalhos para serem exibidos
    configShortCut() {
        const userat = this.userLogado.shortcuts;

        // Obter atalhos selecionados e não selecionados
        const atSelec = this.domModalAtSelecionados.querySelectorAll('.option-item');
        const atNoSelec = this.domModalAtNaoSelecionados.querySelectorAll('.option-item');

        // Adiciona eventos de clique aos atalhos selecionados
        atSelec.forEach(elAt => {
            elAt.addEventListener('click', () => {
                const dataName = elAt.dataset.name; // Acessa o atributo data-name
                const alterarVisi = userat.find(obj => obj.idName === dataName);

                // Atualiza a visibilidade
                if (alterarVisi) {
                    alterarVisi.visible = false;

                    console.log("Atalho desmarcado:", alterarVisi);

                    // Salva as alterações no localStorage e recria os atalhos
                    this.salvarUsuario(userat);
                    this.toggleDisplay(userat)
                    this.createDivsOpcShortcut(userat);
                }
            });
        });

        // Adiciona eventos de clique aos atalhos não selecionados
        atNoSelec.forEach(elAt => {
            elAt.addEventListener('click', () => {
                const dataName = elAt.dataset.name;
                const alterarVisi = userat.find(obj => obj.idName === dataName);

                if (alterarVisi) {
                    // Verifica se o limite de 4 atalhos exibidos foi atingido
                    if (atSelec.length < 4) {
                        alterarVisi.visible = true;

                        console.log("Atalho marcado:", alterarVisi);

                        // Salva as alterações no localStorage e recria os atalhos
                        this.salvarUsuario(userat);
                        this.toggleDisplay(userat)
                        this.createDivsOpcShortcut(userat);
                    } else {
                        alert('Número máximo de atalhos exibidos alcançado. Exclua um antes.');
                    }
                }
            });
        });
    }

    // metodo pra para aplicar as configurações de visibilidade baseado no array de obj atalhos 
    toggleDisplay(arrShortCut) {
        arrShortCut.forEach(ShortCut => {
            // Seleciona o elemento pelo ID
            const element = document.getElementById(ShortCut.idName);

            if (element) {
                // Define o estilo de display com base no status booleano
                element.style.display = ShortCut.visible ? "block" : "none";
            } else {
                console.warn(`Elemento com ID '${ShortCut.idName}' não encontrado.`);
            }
        });
    }
    // eventos de abri fechar atalho
    openCloseModalAt() {
        this.domAtConfig.addEventListener('click', () => {
            this.domModalAtOverlei.classList.add('overlayOpen')
            this.domModalAtModal.classList.add('openModal')
        })

        this.domModalbtnFechar.addEventListener('click', () => {
            this.domModalAtOverlei.classList.remove('overlayOpen')
            this.domModalAtModal.classList.remove('openModal')
        })
    }


    /* metodo de atalhos - gasto do mes 
    metodo reponsavel por:
        - obter o valor total dos gastos do mes atual e do mes anterior
        - e a difenreca entre eles em pct
    obs: usa os valores das compras no cartao, e das transaçoes feitas(feitas nao recebidas)
    */
    monthExpenses() {
        // Inicializa variáveis para armazenar os totais
        let currentMonthPurchase = 0;      // Total de compras do cartão neste mês
        let previousMonthPurchase = 0;     // Total de compras do cartão do mês passado
        let currentMonthTransaction = 0;   // Total das transações "sent" neste mês
        let previousMonthTransaction = 0;  // Total das transações "sent" do mês passado

        // ================================
        // 1. Obtenção e Formatação das Datas
        // ================================
        const today = new Date();  // Data atual

        // Extrai o ano e o mês atual, garantindo dois dígitos para o mês (ex.: "2025-02")
        const currentYear = today.getFullYear();
        const currentMonth = (today.getMonth() + 1).toString().padStart(2, '0');
        const currentYearMonth = `${currentYear}-${currentMonth}`;  // Exemplo: "2025-02"

        // Cria uma data representando o mesmo dia do mês anterior
        const previousDateMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
        // Extrai o ano e o mês da data do mês anterior (também com dois dígitos)
        const previousYear = previousDateMonth.getFullYear();
        const previousMonth = (previousDateMonth.getMonth() + 1).toString().padStart(2, '0');
        const previousYearMonth = `${previousYear}-${previousMonth}`;  // Exemplo: "2025-01"

        // ================================
        // 2. Processamento das Compras
        // ================================
        // Seleciona o cartão em uso (onde "inUser" é true)
        const cardUsing = this.userLogado.cards.find(card => card.inUser === true);
        // Obtém as compras do cartão; se não houver, usa um array vazio
        const purchases = cardUsing?.purchase || [];
        // console.log('Array de compras do cartão em uso:');
        // console.log(purchases);

        // Agrupa as compras por chave "YYYY-MM" usando reduce
        const groupPurchase = purchases.reduce((acc, p) => {
            // Converte a data da compra em um objeto Date
            const dateObj = new Date(p.date);
            // Extrai o ano e o mês (com dois dígitos)
            const year = dateObj.getFullYear();
            const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
            const key = `${year}-${month}`; // Exemplo: "2025-02"

            // Se essa chave ainda não existir, inicializa o objeto com total = 0 e um array vazio
            if (!acc[key]) {
                acc[key] = { total: 0, purchase: [] };
            }
            // Adiciona o valor da compra ao total e armazena a compra no array
            acc[key].total += p.value;
            acc[key].purchase.push(p);
            return acc;
        }, {});

        // Se existir dados para o mês atual, atribui ao total de compras do mês atual
        if (groupPurchase[currentYearMonth]?.total !== undefined) {
            currentMonthPurchase = groupPurchase[currentYearMonth].total;
        }
        // Se existir dados para o mês passado, usa esses dados; caso contrário, utiliza os dados do mês atual como fallback
        if (groupPurchase[previousYearMonth]?.total !== undefined) {
            previousMonthPurchase = groupPurchase[previousYearMonth].total;
        } else {
            previousMonthPurchase = currentMonthPurchase;
        }
        // console.log(`Compras - Mês atual (${currentYearMonth}): ${currentMonthPurchase}`);
        // console.log(`Compras - Mês passado (${previousYearMonth}): ${previousMonthPurchase}`);

        // ================================
        // 3. Processamento das Transações (tipo "sent")
        // ================================
        // Filtra as transações do usuário para obter apenas aquelas com type "sent"
        const sentTransactions = this.userLogado.transactions.filter(transaction => transaction.type === 'sent');

        // Agrupa as transações por chave "YYYY-MM" usando reduce
        const groupTransaction = sentTransactions.reduce((acc, t) => {
            // Converte a data da transação para objeto Date
            const dateObj = new Date(t.date);
            // Extrai o ano e o mês (garantindo dois dígitos)
            const year = dateObj.getFullYear();
            const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
            const key = `${year}-${month}`; // Exemplo: "2025-02"

            // Se a chave ainda não existe, inicializa-a com total = 0 e um array vazio
            if (!acc[key]) {
                acc[key] = { total: 0, transaction: [] };
            }
            // Soma o valor da transação e adiciona a transação ao array
            acc[key].total += t.value;
            acc[key].transaction.push(t);
            return acc;
        }, {});

        // Se existir dados para o mês atual, atribui ao total das transações do mês atual
        if (groupTransaction[currentYearMonth]?.total !== undefined) {
            currentMonthTransaction = groupTransaction[currentYearMonth].total;
        }
        // Se existir dados para o mês passado, usa esses dados; se não, usa os dados do mês atual como fallback
        if (groupTransaction[previousYearMonth]?.total !== undefined) {
            previousMonthTransaction = groupTransaction[previousYearMonth].total;
        } else {
            previousMonthTransaction = currentMonthTransaction;
        }
        // console.log(`Transações feitas - Mês atual (${currentYearMonth}): ${currentMonthTransaction}`);
        // console.log(`Transações feitas - Mês passado (${previousYearMonth}): ${previousMonthTransaction}`);

        // ================================
        // 4. Cálculo Final dos Gastos e Diferença Percentual
        // ================================
        // Soma os totais de compras e transações para o mês atual e o mês passado
        let currentTotalExpense = currentMonthPurchase + currentMonthTransaction;
        let previousTotalExpense = previousMonthPurchase + previousMonthTransaction;
        // console.log(`Gastos totais - Mês atual: ${currentTotalExpense}`);
        // console.log(`Gastos totais - Mês passado: ${previousTotalExpense}`);

        // Calcula a diferença percentual entre os gastos dos dois meses
        // Se previousTotalExpense for 0, definimos a diferença como 0 para evitar divisão por zero
        let pctDifference = previousTotalExpense !== 0
            ? ((currentTotalExpense - previousTotalExpense) / previousTotalExpense) * 100
            : 0;
        let pctFormatted = Math.round(pctDifference);
        // console.log(`Diferença percentual: ${pctFormatted}%`);

        // Retorna um objeto com o total de gastos do mês atual e a diferença percentual
        return {
            currentTot: currentTotalExpense,
            pctDifference: pctFormatted
        };
    }




    // METODO  DE ATALHOS - OBTEM OS DADOS PRO ATALHO RECEBIMENTOS
    moneyReceived() {
        // Variáveis para armazenar os totais das transações recebidas
        let currentMonthTransaction = 0;   // Total das transações recebidas neste mês
        let previousMonthTransaction = 0;  // Total das transações recebidas no mês passado
        let allOK = false;                 // Flag para indicar se os dados foram encontrados corretamente

        // ================================
        // 1. Obtenção e Formatação das Datas
        // ================================
        const today = new Date(); // Data atual

        // Extrai o ano e o mês atual (garante dois dígitos para o mês)
        const currentYear = today.getFullYear();
        const currentMonth = (today.getMonth() + 1).toString().padStart(2, '0');
        const currentYearMonth = `${currentYear}-${currentMonth}`; // Ex: "2025-02"

        // Cria uma data representando o mesmo dia do mês anterior
        const previousDateMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
        const previousYear = previousDateMonth.getFullYear();
        const previousMonth = (previousDateMonth.getMonth() + 1).toString().padStart(2, '0');
        const previousYearMonth = `${previousYear}-${previousMonth}`; // Ex: "2025-01"

        // ================================
        // 2. Processamento das Transações Recebidas
        // ================================
        // Filtra as transações do usuário para obter somente aquelas do tipo "received"
        const receivedTransactions = this.userLogado.transactions.filter(transaction => transaction.type === 'received');

        // Agrupa as transações por ano-mês usando reduce
        const groupTransaction = receivedTransactions.reduce((acc, transaction) => {
            // Converte a data da transação para um objeto Date
            const dateObj = new Date(transaction.date);
            // Extrai o ano e o mês com dois dígitos
            const year = dateObj.getFullYear();
            const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
            const key = `${year}-${month}`; // Chave no formato "YYYY-MM"

            // Se a chave ainda não existir, inicializa-a com total = 0 e um array vazio
            if (!acc[key]) {
                acc[key] = { total: 0, transaction: [] };
            }
            // Acumula o valor da transação e guarda a transação no array
            acc[key].total += transaction.value;
            acc[key].transaction.push(transaction);
            return acc;
        }, {});

        // ================================
        // 3. Verificação e Atribuição dos Totais
        // ================================
        // Se houver dados para o mês atual, atribui o total à variável
        if (groupTransaction[currentYearMonth]?.total !== undefined) {
            currentMonthTransaction = groupTransaction[currentYearMonth].total;
            // Se houver dados para o mês passado, usa-os; caso contrário, usa o valor do mês atual como fallback
            if (groupTransaction[previousYearMonth]?.total !== undefined) {
                previousMonthTransaction = groupTransaction[previousYearMonth].total;
            } else {
                previousMonthTransaction = currentMonthTransaction;
            }
            allOK = true;
        } else {
            // console.log('Erro: Transações recebidas do mês atual não encontradas para essa funcionalidade.');
            allOK = false;
        }

        // ================================
        // 4. Cálculo Final e Retorno dos Dados
        // ================================
        if (allOK) {
            // Para este atalho, o total recebido é o valor das transações do mês atual
            let currentTotal = currentMonthTransaction;
            let previousTotal = previousMonthTransaction;
            // console.log(`Transações recebidas - Mês atual (${currentYearMonth}): ${currentTotal}`);
            // console.log(`Transações recebidas - Mês passado (${previousYearMonth}): ${previousTotal}`);

            // Calcula a diferença percentual; se o total do mês passado for 0, define 0% para evitar divisão por zero
            let pctDifference = previousTotal !== 0 ? ((currentTotal - previousTotal) / previousTotal) * 100 : 0;
            let pctFormatted = Math.round(pctDifference);
            // console.log(`Diferença percentual: ${pctFormatted}%`);

            // Retorna um objeto com os dados que serão usados na interface
            return {
                receivedCurrentTot: currentTotal,
                receivedPctDifference: pctFormatted
            };
        }

        // Caso não haja dados, retorna um objeto com valores zerados
        return {
            receivedCurrentTot: 0,
            receivedPctDifference: 0
        };
    }




    /* METODO DE ATALHO -  calcula o rendimento acumulado de um único investimento
    ele e usado como callback no metodo abaixo que da o loop em todos os investimentos e aplica ele*/
    calculateRealTimeYield(investment) {
        // Converte a porcentagem anual para número (caso esteja em string)
        const annualPct = parseFloat(investment.pctAnnualIncome);

        // Converte a data do investimento para um objeto Date
        const investmentDate = new Date(investment.date);
        const now = new Date();

        // Se o investimento ainda não começou, retorna 0
        if (now < investmentDate) {
            return 0;
        }

        // Calcula a diferença em milissegundos e converte para dias
        const msPerDay = 1000 * 60 * 60 * 24;
        const elapsedDays = (now - investmentDate) / msPerDay;

        // Fórmula: rendimento = valor investido * (porcentagem anual) * (dias decorrido / 365)
        const yieldValue = investment.value * annualPct * (elapsedDays / 365);

        // Retorna o rendimento arredondado para duas casas decimais
        return Number(yieldValue.toFixed(2));
    }

    /* METODO DE ATALHO - recebe um array de investimentos e retorna o array com os rendimentos calculados
     metodo chamado no metodo abaixo onde passa o array de investimenos para ele*/
    calculateInvestmentsWithYield(investments) {
        return investments.map(investment => {
            const yieldValue = this.calculateRealTimeYield(investment);
            return { ...investment, yield: yieldValue };// retorna um objeto ja formatado
        });
    }

    // METODO DE ATALHO - que agrega todos os resultados de todos os investimentos
    aggregateInvestmentResults() {
        // Obtém o array de investimentos do usuário
        const investments = this.userLogado.investmentHistory;

        // variaveis que armazenam os valores total de todos os invesmentos
        let totalInvested = 0;
        let totalProfit = 0;


        investments.forEach(investment => {
            // Calcula o rendimento para cada investimento
            const yieldValue = this.calculateRealTimeYield(investment);
            totalInvested += investment.value;
            totalProfit += yieldValue;
        });

        // Calcula a porcentagem de lucro
        const profitPercentage = totalInvested ? (totalProfit / totalInvested) * 100 : 0;

        return {
            totalInvested,
            totalProfit,
            profitPercentage: Number(profitPercentage.toFixed(2))
        };
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

    // Método para salvar o usuário atualizado no localStorage
    salvarUsuario(userat) {
        // Atualiza os atalhos do usuário logado
        this.userLogado.shortcuts = userat;

        // Busca o array de usuários do localStorage
        const usuarios = JSON.parse(localStorage.getItem("listUser")) || [];

        // Encontra o índice do usuário no array usando seu ID
        const index = usuarios.findIndex(user => user.id === this.userLogado.id);

        if (index !== -1) {
            // Atualiza o usuário no array
            usuarios[index] = this.userLogado;
            // Salva o array atualizado no localStorage
            localStorage.setItem("listUser", JSON.stringify(usuarios));

            console.log("Usuário atualizado com sucesso!");
        } else {
            console.error("Usuário não encontrado no localStorage!");
        }
    }
}


// class reponsavel por preencher a tela home com infos do usuario
// recbe um objeto com os dados do cartao ja filtrados 
// recebe um objeto com os elementos do doom necesario
class HomeUpdateCardScreen {
    constructor(user, elDomCard) {
        this.userLogado = user
        // Desconstrução dos elementos DOM do objeto passado
        const {
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



    // ATUALIZA DOM DO CARTAO
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
        this.dombarrLmt.style.width = `${pctLimit}% `

        // txt de limite mensalc=
        this.domlimiteMensal.textContent = `R$ ${totalCredit.toLocaleString('pt-BR')} /${cardUsing.limitAvailable.toLocaleString('pt-BR')}`

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
            this.domFaturaAtual.textContent = `R$ ${invoiceToPay.totalInvoice.toFixed(2)}` //texto de fatura
            this.domLimiteDisponivel.textContent = `R$ ${lmtDisponivel.toFixed(2)}` // limite deisponivel 
            this.domTxtBarrVerde.textContent = `R$ ${lmtDisponivel.toFixed(2)}` // text da div extraa com barr vertical direita

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
            this.domTxtBarrAzul.textContent = `R$ ${invoiceToPay.totalInvoice.toFixed(2)}` // tecto de fatura do lado direito


            // preenche a barra vertical laranja e seu texto (Proximas faturas)
            let pctorange = (valPrInvoices / cardUsing.limitAvailable) * 100
            this.domBarrLaranja.style.height = `${pctorange}%`
            this.domTxtBarrLaranja.textContent = `R$ ${valPrInvoices.toFixed(2)}`

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


    /* METODO QUE PASSA AS DATAS DE COMPRAS E O ARRAY DE COMPRAS ORDENADOS
    ele obtem a quantidade de datas que foi feito pelo menos 1 compra pra saber a quantidade de divs irei criar
    assim o metodo que ira criar as divs dias e organizar as compras em seus dias, sabe quias divs dia criar */
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


    /* METODO QUE CRIA O DOM DE LISTA DE COMPRAS 
    a lista de compras sera organizada em uma div pra cada dia 
    e cada div dia contera um h3 com a data 
    e uma ul com os li que sao as compras daquele dia */
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


    /* METODO QUE LIMITA A EXIBIÇAO DAS COMPRAS EM 7 LI DE COMPRA
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

        // console.log('Exibição configurada.');
    }


    // METODO QUE ABREVIA O NOME DO USUARIO PRO CARTAO
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


    // METO QUE FORMATA DATA PRA SER EXIBIDA NO FORMATO: '03 junho'
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
        this.user.balance -= newInvestment.value // subtrai o valor investido do saldo da conta

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

