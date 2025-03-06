# Inserção de Dados e Operações de Conta

Este projeto contém a implementação para inserir dados fictícios na conta do usuário e gerenciar operações financeiras como transações, compras, investimentos e pagamento de faturas. A seguir, a documentação detalhada desta parte do sistema.

---

## Índice

- [Recuperação dos Dados do Usuário](#recuperação-dos-dados-do-usuário)
- [Instanciação das Classes de Manipulação](#instanciação-das-classes-de-manipulação)
- [Validação de Dados e Formulários](#validação-de-dados-e-formulários)
  - [Função `isValidDate`](#função-isvaliddate)
  - [Função `isFormValid`](#função-isformvalid)
- [Inserção e Salvamento das Operações](#inserção-e-salvamento-das-operações)
  - [Transações](#transações)
  - [Compras](#compras)
  - [Investimentos](#investimentos)
- [Pagamento de Faturas](#pagamento-de-faturas)
- [Considerações Finais](#considerações-finais)

---

## Recuperação dos Dados do Usuário

```js
// OBS: Não apagar esse usuário, pois ele será utilizado nas demais partes do site
const idss = JSON.parse(localStorage.getItem("idUserLogado")); // Recupera o ID do usuário logado
const userss = JSON.parse(localStorage.getItem("listUser")) || []; // Recupera o array de usuários do localStorage
const loggedInUserr = userss.find(user => user.id === idss); // Encontra o usuário com base no ID
