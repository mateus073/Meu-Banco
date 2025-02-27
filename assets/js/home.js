
// obs nao apagar esse usuario poque ele ira passar para as outras partes do site esse usuario logado
const ids = JSON.parse(localStorage.getItem("idUserLogado")) // recupera o id pra acessar o usuario
const users = JSON.parse(localStorage.getItem("listUser")) || []; // Recupera o array de usuários do localStorage
const loggedInUser = users.find(user => user.id === ids); // Encontra o usuário no array com base no ID


// adiciona o nome do usuario logado na tela
document.querySelectorAll('.spanNameUser').forEach((spanName) => {
   spanName.textContent = loggedInUser.userName
})


// funcionalidade de ver mais da div cartao
const btnVerMais  = document.querySelector('.btnMaDt')
const btnVerMenos  = document.querySelector('.btnMeDt')
const divInfoExtra = document.querySelector('.seeMore')

btnVerMais.addEventListener('click', () => {
   divInfoExtra.style.display = "block"
   btnVerMais.style.display = "none"
   
})

btnVerMenos.addEventListener('click', () => {
   divInfoExtra.style.display = "none"
   btnVerMais.style.display = "block"
   
})




// seleciona dados e instancia as classes
if (loggedInUser) {
  
   // objeto que ira armazenar os elementos dom
   const elDomCard = {
      // div pai do atalho
      domAtGastoMes: document.querySelector("#atalhoGastoMes"),
      domAtReceb: document.querySelector("#atalhoRecebimentos"),
      domAtInvest: document.querySelector("#atalhoInvestimentos"),
      domAtCart: document.querySelector("#atalhoCartoes"),
      domAtSaldo: document.querySelector("#atalhoSaldo"),
      domAtImprest: document.querySelector("#atalhoImprestimo"),
      domAtPix: document.querySelector("#AtalhoPix"),
      domAtRecarga: document.querySelector("#atalhoRecarga"),
      domAtBoleto: document.querySelector("#atalhoBoleto"),
      domAtConfig: document.querySelector("#cfgAtalho"),

      // cartao
      domcardNumber: document.querySelector(".cardNumber"),
      domcardName: document.querySelector(".sCardName"),
      domvalidade: document.querySelector(".cardDateNumber"),

      // barra de limite e span de limite gasto e disponivel
      dombarrLmt: document.querySelector(".barrLimit2"),
      domlimiteMensal: document.querySelector(".value"),

      domSLimiteDisponivel: document.querySelector(".sValorLimit"),

      domultimaCompra: document.querySelector(".estabelecimento"),
      domvalorUltimaCompra: document.querySelector(".valor"),

      
      domFaturaAtual: document.querySelector(".famount"),
      domLimiteDisponivel: document.querySelector(".favailable"),
      domDAtaFechamentoFatura: document.querySelector(".sInvoiceClosing"),
      
      // barrinha que exibe o limite domLmtDisponivel a fatura atual e as proximas faturas
      domBarrVerde: document.querySelector(".fbarrgren2"),
      domBarrAzul: document.querySelector(".fbarrblue2"),
      domBarrLaranja: document.querySelector(".fbarrorange2"),
      
      // textos que ficam ao lado da barra
      domTxtBarrVerde: document.querySelector(".sGrenTxt"),
      domTxtBarrAzul: document.querySelector(".sBlueTxt"),
      domTxtBarrLaranja: document.querySelector(".sOrangeTxt"),
      
      // elementos da div pequena que tem no final do cartao
      // domBtnAjustLmti: document.querySelector(".btnAjustLmt"),
      domhVlrLimit: document.querySelector(".hVlrLimit"),
      domBarrLA: document.querySelector(".progress"),
      domLmtEmUso: document.querySelector(".emUso"),
      domLmtDisponivel: document.querySelector(".disponívelUso"),   

      domDivCompras: document.querySelector(".listsComp"),  // dovpai onde ficara as compras   
      btnVerExtrato: document.querySelector(".btnVerExtrado"),  // dovpai onde ficara as compras   
   }; // objeto que contem os elementos do cartao
  


   // instancia da class que recebe os dados pra atualizar a tela
   const updateCard = new UpdateCardScreen(loggedInUser, elDomCard)

   updateCard.refreshCard()
   updateCard.conferirurser()
   updateCard.refreshShortcut()
   
   // updateCard.showAndHidenPurchase()

   




   
   // dados do historico de compras  e seues elementos no dom
   //const dataShortcutData = usuarioDataFilter.filterShortcutData()
   // const elDomShortcutData = {}


   // dados do atalho e seus elemento no dom
   //const dataPurchaseHistory = usuarioDataFilter.filterPurchaseHistory()
   // const elDomPurchaseHistory = {}
}



