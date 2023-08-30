const app = require('./servidor');

app.get('/contas?senha_banco=123');
app.post('/contas');
app.put('/contas/:numeroConta/usuario');
app.delete('/contas/:numeroConta');
app.post('/transacoes/depositar');
app.post('/transacoes/sacar');
app.post('/transacoes/transferir');
app.get('/contas/saldo?numero_conta=123&senha=123');
app.get('/contas/extrato?numero_conta=123&senha=123');

app.listen(3000);