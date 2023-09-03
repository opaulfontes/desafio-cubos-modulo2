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
const { validarSenha } = require('./intermediarios');
const rotas = require('./roteador');

const verificarNumeroConta = (req, res, next) => {
    return res.send('Número da conta obrigatório');
    next();
}

app.use(rotas);
app.use(verificarNumeroConta);
app.use(validarSenha);

app.get('/contas?senha_banco=123', validarSenha, listaContas);
app.post('/contas', criaConta);
app.put('/contas/:numeroConta/usuario', verificarNumeroConta, atualizaDadosConta);
app.delete('/contas/:numeroConta', verificarNumeroConta, excluirConta);
app.post('/transacoes/depositar', depositoConta);
app.post('/transacoes/sacar', saqueConta);
app.post('/transacoes/transferir', transferenciaEntreContas);
app.get('/contas/saldo?numero_conta=123&senha=123', verificarNumeroConta, validarSenha, consultarSaldoConta);
app.get('/contas/extrato?numero_conta=123&senha=123', verificarNumeroConta, validarSenha, emitirExtratoBancario);

app.listen(3000);