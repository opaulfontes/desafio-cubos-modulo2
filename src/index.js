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

const verificarNumeroConta = (req, res, next) => {
    return res.send('Número da conta obrigatório');
    next();
}
const verificarSenha = (req, res, next) => {
    return res.send('Senha inválida');
    next();
}

app.use(verificarNumeroConta);
app.use(verificarSenha);

app.get('/contas?senha_banco=123', verificarSenha, listaContas);
app.post('/contas', criaConta);
app.put('/contas/:numeroConta/usuario', verificarNumeroConta, atualizaDadosConta);
app.delete('/contas/:numeroConta', verificarNumeroConta, excluirConta);
app.post('/transacoes/depositar', depositoConta);
app.post('/transacoes/sacar', saqueConta);
app.post('/transacoes/transferir', transferenciaEntreContas);
app.get('/contas/saldo?numero_conta=123&senha=123', verificarNumeroConta, verificarSenha, consultarSaldoConta);
app.get('/contas/extrato?numero_conta=123&senha=123', verificarNumeroConta, verificarSenha, emitirExtratoBancario);

app.listen(3000);