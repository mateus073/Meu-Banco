
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
   const usuarioDataFilter = new UsuarioDataFilter(loggedInUser) // class que passa os dados filtrados pra class que preeche a tela 

   const dataCardd = usuarioDataFilter.filterCardData() // dados do cartao   
   const elDomCard = {
      domcardNumber: document.querySelector(".cardNumber"),
      domcardName: document.querySelector(".sCardName"),
      domvalidade: document.querySelector(".cardDateNumber"),
      dombarrLmt: document.querySelector(".barrLimit2"),
      domlimiteMensal: document.querySelector(".value"),
      domlimiteDisponivel: document.querySelector(".sValorLimit"),
      domultimaCompra: document.querySelector(".estabelecimento"),
      domvalorUltimaCompra: document.querySelector(".valor"),
      domBtnAjustLmti: document.querySelector(".btnAjustLmt"),
      domhVlrLimit: document.querySelector(".hVlrLimit"),
      domBarrLmtAprovado: document.querySelector(".progress"),
      domLmtEmUso: document.querySelector(".emUso"),
      domLmtDisponivel: document.querySelector(".disponívelUso"),      
   }; // objeto que contem os elementos do cartao
  
   
   // instancia da class que recebe os dados pra atualizar a tela
   const updateCard = new UpdateCardScreen(dataCardd, elDomCard)
   updateCard.refreshScreen()
   // updateCard.conferiredados()

   
   
   // dados do historico de compras  e seues elementos no dom
   //const dataShortcutData = usuarioDataFilter.filterShortcutData()
   // const elDomShortcutData = {}


   // dados do atalho e seus elemento no dom
   //const dataPurchaseHistory = usuarioDataFilter.filterPurchaseHistory()
   // const elDomPurchaseHistory = {}
}



