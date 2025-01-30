# Sistema de Atualização de Senhas

## Visão Geral
Este projeto implementa uma interface para validar usuários e atualizar suas senhas armazenadas no `localStorage`.

---

## Funcionalidades
1. Validação de usuários existentes.
2. Exibição de mensagens de erro e sucesso dinâmicas.
3. Atualização segura de senhas no `localStorage`.

---

## Estrutura do Código
### Variáveis Principais
- `iptName`: Campo para entrada do nome de usuário.
- `divPassword`: Div que contém o campo de senha.
- `inputPassword`: Campo de entrada da senha.

### Funções
- `correctOrWrong(correct, ipt, lb)`: Aplica estilos de validação ao input e rótulo.
- `colorStandard(ipt, lb)`: Aplica estilos padrão ao input quando vazio.
- `updatePassword()`: Atualiza a senha do usuário no `localStorage`.

---

## Como Usar
1. Preencha o nome de usuário no campo.
2. Caso o usuário seja encontrado, o campo de senha será exibido.
3. Digite uma nova senha com pelo menos 6 caracteres.
4. Clique em "Confirmar" para salvar as alterações.

---

## Observação
A lista de usuários é armazenada no `localStorage` no formato JSON. Certifique-se de inicializá-lo antes de usar.
