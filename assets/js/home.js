const ids = JSON.parse(localStorage.getItem("idUserLogado"))


// Recupera o array de usuários do localStorage
const usuarios = JSON.parse(localStorage.getItem("listUser")) || [];

// Encontra o usuário no array com base no ID
const usuarioLogado = usuarios.find(user => user.id === ids);

if(usuarioLogado) {
    console.log('usuario encontrado')
    console.log(usuarioLogado)
 } else {
    console.log("usuario nao encontrado")
 }


