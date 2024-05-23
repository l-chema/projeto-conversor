const express = require('express');
const aplicacao = express();

aplicacao.get('/conversao/:moedas', (req, res) =>{
    let moedas = req.params.moedas.split("-");

    let moeda1 = moedas[0];
    let moeda2 = moedas[1];

    console.log(moeda1);
    console.log(moeda2);

    const resultado = {
        moedaOrigem: moeda1,
        moedaDestino: moeda2
    };
});

aplicacao.post('/', (req, res) =>{
    res.send("Meu backend funcionando com método POST")
});

aplicacao.listen(4000, () => {
    console.log("Estou escutando na porta 4000")
});