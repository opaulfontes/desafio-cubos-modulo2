const express = require('express');
const { listaContas,
    criaConta,
    atualizaDadosConta,
    excluirConta,
    depositoConta,
    saqueConta,
    transferenciaEntreContas,
    consultarSaldoConta,
    emitirExtratoBancario } = require('./controladores/contasBancarias');

const rotas = express();

rotas.get('/contas?senha_banco=123', listaContas);
rotas.get('/contas/saldo?numero_conta=123&senha=123', consultarSaldoConta);
rotas.get('/contas/extrato?numero_conta=123&senha=123', emitirExtratoBancario);
rotas.put('/contas/:numeroConta/usuario', atualizaDadosConta);
rotas.delete('/contas/:numeroConta', excluirConta);
rotas.post('/transacoes/depositar', depositoConta);
rotas.post('/transacoes/sacar', saqueConta);
rotas.post('/transacoes/transferir', transferenciaEntreContas);

module.exports = rotas