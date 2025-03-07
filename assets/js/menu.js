
// evento de click no botao pra abri e fechar o menu 
document.querySelector('.open_btn').addEventListener('click', () => {
    document.querySelector('.MOBsidebar').classList.toggle('opemSidbar')
    document.querySelector('.help').classList.toggle('openHelp')
})


const menuItems = document.querySelectorAll('.menuLi'); // li do menu 
const sections = document.querySelectorAll('.section'); // sessoes do site (home, cartao, tranferencias etc...)


// Função que altera o estado dos itens
function toggleMenuItem(event) {

    // Primeiro, definir todos os itens para o estado inativo (fundo branco, txt e img preto)
    menuItems.forEach((item) => {
        item.style.backgroundColor = "#FFFFFF";

        const aTag = item.querySelector('a');
        const imgTag = item.querySelector('img');

        aTag.style.color = "#484848";
        imgTag.src = imgTag.src.replace("white", "default"); // Troca a imagem para a versão inativa(preta)
    });
    

    // Agora, para o item clicado, aplicar o estado ativo (fundo verde, txt e img branco)
    const clickedItem = event.currentTarget;
    const clickedA = clickedItem.querySelector('a');

    clickedItem.style.backgroundColor = "#1BC681"; 
    clickedA.style.color = "#FFFFFF"; 

    const clickedImg = clickedItem.querySelector('img');
    clickedImg.src = clickedImg.src.replace("default", "white");

    // Gerencia as seções removendo a classe "ative" de todas as seções antes de adicionar a ativa pra sessaao selecionada
    sections.forEach((section) => {
        section.classList.remove("ative");
    });

    // Recupera o ID da seção alvo a partir do atributo data-target do li clicado
    const targetSectionId = clickedItem.getAttribute("data-target");

    if (targetSectionId) {
        const targetSection = document.querySelector(`.${targetSectionId}`);
        if (targetSection) {
            // Adiciona a classe "ative" à seção correspondente para exibi-la
            targetSection.classList.add("ative");
        }
    }
}


// Adiciona o listener de clique para cada item do menu
menuItems.forEach((item) => {
    item.addEventListener("click", toggleMenuItem);
});