let { contas, saques, depositos, transferencias} = require('../bancodedados');
const { format } = require('date-fns');

const depositar = (req, res) => {
    const { numero_conta, valor } = req.body;

    if (!numero_conta || !valor) {
        return res.status(400).json({ mensagem: 'O número da conta e o valor são obrigatórios!'});
}

    const contaEncontrada = contas.find(conta => Number(conta.numero) === Number(numero_conta));

    if (!contaEncontrada) {
        return res.status(404).json({ mensagem: 'Conta não encontrada!'});
}

    if (valor <= 0) {
        return res.status(400).json({ mensagem: 'O valor não pode ser menor ou igual a 0'});
}

contaEncontrada.saldo += valor;

const registro = {
    data: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
    numero_conta,
    valor
}

depositos.push(registro);

return res.status(201).send();

}

const sacar = (req, res) => {
    const { numero_conta, valor, senha } = req.body;

    if (!numero_conta || !valor || !senha) {
        return res.status(400).json({ mensagem: 'O número da conta, a senha e o valor são obrigatórios!'});
}

    const contaEncontrada = contas.find(conta => Number(conta.numero) === Number(numero_conta));

    if (!contaEncontrada) {
        return res.status(404).json({ mensagem: 'Conta não encontrada!'});
}

    if (contaEncontrada.usuario.senha !== senha) {
        return res.status(400).json({ mensagem: 'Senha inválida!'});
    }

    if (contaEncontrada.saldo <= valor) {
        return res.status(403).json({ mensagem: 'Saldo insuficiente'});
}

contaEncontrada.saldo -= valor;

const registro = {
    data: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
    numero_conta,
    valor
}

depositos.push(registro);

return res.saques.push(201).send();

}

module.exports = {
    depositar,
    sacar
}