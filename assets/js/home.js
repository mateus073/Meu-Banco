const ids = JSON.parse(localStorage.getItem("idUserLogado")) // recupera o id pra acessar o usuario
const users = JSON.parse(localStorage.getItem("listUser")) || []; // Recupera o array de usuários do localStorage
const loggedInUser = users.find(user => user.id === ids); // Encontra o usuário no array com base no ID


// adiciona o nome do usuario logado na tela
document.querySelectorAll('.spanNameUser').forEach((spanName) => {
   spanName.textContent = loggedInUser.userName
})




// seleciona dados e instancia as classes
if (loggedInUser) {
   const usuarioDataFilter = new UsuarioDataFilter(loggedInUser)

   const dataCardd = usuarioDataFilter.filterCardData() // dados do cartao   
   const elDomCard = {
      cardNumber: document.querySelector(".cardNumber"),
      cardName: document.querySelector(".sCardName"),
      validade: document.querySelector(".cardDateNumber"),
      barrLmt: document.querySelector(".barrLimit2"),
      limiteMensal: document.querySelector(".value"),
      limiteDisponivel: document.querySelector(".sValorLimit"),
      ultimaCompra: document.querySelector(".estabelecimento"),
      valorUltimaCompra: document.querySelector(".valor"),
      botaoMaisDetalhes: document.querySelector(".storeMoreDetails"),
   };// objeto que contem os elementos do cartao
  
   
   // instancia da class que recebe os dados pra atualizar a tela
   const updateCard = new UpdateCardScreen(dataCardd, elDomCard)
   updateCard.conferiredados()
   
   
   // dados do historico de compras 
   //const dataShortcutData = usuarioDataFilter.filterShortcutData()


   // dados do atalho 
   //const dataPurchaseHistory = usuarioDataFilter.filterPurchaseHistory()

}



