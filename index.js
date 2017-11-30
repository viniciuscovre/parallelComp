const express = require('express');
const router  = express.Router();
const app     = express();

app.get('/', function (req, res, next) {
  const status = 200;
  const message = `Bem-vindo à loja! Não se importe com o visual da página :P`;
  res.status(status).json(message);
  next();
});

var readyToBuy = false;
var itemChosen = false;

app.get('/example', function (req, res, next) {
  var message = 'Verifique o console ;)';
  // FLUXO NORMAL:
  const choiceTime    = 1000; // Escolhe o produto no segundo 1
  const cartTime      = 3000; // Coloca no carrinho no segundo 3
  const executionTime = 5000; // Executa a compra no segundo 5
  const endTime       = 7000; // Termina o exemplo no segundo 7

  // EXECUÇÃO DA COMPRA
  new Promise(function (resolve, reject) {

    setTimeout(function () {
      if (readyToBuy)
        resolve(1);
      else
        reject('Carrinho vazio :(\n');
    }, executionTime); // Tente executar essa Promise entre 1 e 3 segundos

  }).then(function (num) {
    console.log('\n==> (' + num + ') Verifico se está no carrinho');
    return ++num;
  }).then(function (num) {
    console.log('==> (' + num + ') Obtenho informações do pagamento');
    return ++num;
  }).then(function (num) {
    console.log('==> (' + num + ') Efetuo a compra');
    return ++num;
  }).then(function (num) {
    console.log('==> (' + num + ') Mando para os correios\n\n');
  }).catch(function (err) {
    console.log('==> Compra não efetuada:', err);
  });

  // COLOCA NO CARRINHO
  new Promise(function (resolve, reject) {
    setTimeout(function () {
      if (itemChosen)
        resolve();
      else
        reject('Item ainda não foi escolhido :(\n');
    }, cartTime);
  }).then(function () {
    console.log('>>>>>>>>>>> Item foi colocado no carrinho!\n');
    readyToBuy = true;
  }).catch(function (err) {
    console.log('==> Compra não efetuada:', err);
  });

  // ESCOLHA DO ITEM
  setTimeout(function () {
    console.log('>>>>>>>>>>> Ainda escolhendo...\n');
    itemChosen = true;
  }, choiceTime); // Tente escolher o item depois do segundo 5 (> 5000 ms) ...
  // ... mas antes do tempo final, certamente.

  // FIM DO EXEMPLO
  setTimeout(function () {
    console.log("F I M\n");
    process.exit(0);
  }, 7500);

  const status = 200;
  res.status(status).json(message);
});

const port = 3000;
app.listen(port);
console.log('Listening to port ' + port + '\n');
