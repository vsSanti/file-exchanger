
# File transfer
Implementação de um programa em Node seguindo modelo cliente/servidor utilizando sockets.
O projeto deve possuir as seguintes características:
- [x] Criar menu de opções no cliente;
- [x] Cliente solicitar criação de arquivo no servidor e servidor avisar que arquivo foi criado;
- [x] Ler um arquivo do servidor e transferir para o cliente;
- [x] Alterar arquivo no cliente;
- [x] Devolver arquivo para o servidor por solicitação do cliente;
- [ ] Imprimir arquivo no cliente;
- [ ] Fechar arquivo no servidor quando cliente solicitar, e enviar mensagem informando o cliente do fechamento;
- [x] Finalizar cliente e servidor.

**Obs:** Esse projeto foi desenvolvido utilizando `Ubuntu 20.04`

## Instalação
- Instalar o [Node.JS](https://nodejs.org/)
- Abrir o diretório no terminal
- Executar o comando `npm install && cd server && npm install && cd ../client && npm install && cd ..`

## Como executar
- Abrir dois terminais no diretório principal do projeto
  - No primeiro terminal, execute o comando `npm run server`
  - No segundo terminal, execute o comando `npm run client`

### O que deverá acontecer
- Inicializar o `servidor`
- Inicializar o `cliente`
- **`SERVER`** Mensagem de que o cliente está conectado
- **`CLIENT`** Mensagem de escolha de opções

## Opções do terminal
 - Criar arquivo no servidor:
   - Digite `1` e pressione a tecla `enter`
   - Informe o nome do arquivo com a extensão (ex: texto.txt) e pressione a tecla `enter`
   - Você receberá uma mensagem confirmando ou não a criação do arquivo.
 - Ler arquivo do servidor:
   - Digite `2` e pressione a tecla `enter`
   - Informe o número da lista que deseja ler
   - Após informado o número, o arquivo selecionado será transferido para o diretório `temp` na raíz do projeto do `client`
   - Abra o arquivo no diretório `temp`, escreva o que quiser e salve o mesmo.
   - Para reenviar ele para o servidor, basta você digitar qualquer caractere e pressionar `enter`
 - Finalizar conexão:
   - Digite `3` e pressione a tecla `enter`
