const { contas } = require('./bancodedados');
const app = require('./servidor');
const { 
    listaContas, 
    criaConta, 
    atualizaDadosConta, 
    excluirConta, 
    depositoConta,
    saqueConta, 
    transferenciaEntreContas, 
    consultarSaldoConta, 
    emitirExtratoBancario
} = require('./controladores/contasBancarias')

app.get('/contas?senha_banco=123', listaContas);
app.post('/contas', criaConta);
app.put('/contas/:numeroConta/usuario', atualizaDadosConta);
app.delete('/contas/:numeroConta', excluirConta);
app.post('/transacoes/depositar', depositoConta);
app.post('/transacoes/sacar', saqueConta);
app.post('/transacoes/transferir', transferenciaEntreContas);
app.get('/contas/saldo?numero_conta=123&senha=123', consultarSaldoConta);
app.get('/contas/extrato?numero_conta=123&senha=123', emitirExtratoBancario);

app.listen(3000);