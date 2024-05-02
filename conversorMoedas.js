let valoresConversao = {
    dolar: {
        euro: 0.92,
        /* libra: 0.79, */
        real: 5.02
    },

    euro: {
        dolar: 1.09,
        /* libra: 0.86, */
        real: 5.46
    },

    /* franco: {
        dolar: 1.11,
        euro: 1.02,
        libra: 0.87, 
        real: 5.57
    }, */

    /* libra: {
        dolar: 1.27,
        euro: 1.17,
        real: 6.36
    }, */

    real: {
        dolar: 0.20,
        euro: 0.18,
        /* libra: 0.16 */
    }
};

let botaoConverter = document.getElementById("botao-converter");
botaoConverter.addEventListener("click", converter);


let botaoLimpar = document.getElementById("botao-limpar");
botaoLimpar.addEventListener("click", limpar);

let botaoInverter = document.getElementById("botao-inverter");
botaoInverter.addEventListener("click", inverter);

let botaoAceitaMensagem = document.getElementById("aceita-mensagem-usuario");
botaoAceitaMensagem.addEventListener("click", aceitaMensagem);

if(localStorage.getItem("aceitouCookie") == "1"){
    aceitaMensagem;
}


let valorUsuario = document.getElementById("valor-usuario");
valorUsuario.addEventListener("keypress", function(event) {

    console.log(event);

    if(event.ctrlKey == true && event.code == "KeyI"){
        inverter();
    }

    if(event.key == "Enter"){
        converter();
    }
});

function converter() {
    
    buscaAPI(moedaOrigem, moedaDestino).then(function(response){
        let objetoRetorno = JSON.parse(data);

        console.log(data);
    });
    return;

    let valorUsuario = document.getElementById("valor-usuario").value;

    let moedaOrigem = document.getElementById("moeda1").value;
    let moedaDestino = document.getElementById("moeda2").value;

    let conversao = valorUsuario * valoresConversao[moedaOrigem][moedaDestino];

    /*if(valorUsuario == ""){
        alert("O valor não pode ser vazio!");
        return;
    }

    if(moedaOrigem == moedaDestino){
        alert("As moedas são iguais, não é possível converter");
        return;
    }

    let simbolo = "";
    if(moedaDestino == "real"){
        simbolo = "R$";
    }
    if(moedaDestino == "dolar"){
        simbolo = "US$"
    }
    if(moedaDestino == "euro"){
        simbolo = "€";
    }
    */
    let paragrafoResultado = document.getElementById("resultado");
    paragrafoResultado.textContent = simbolo + " " + conversao.toFixed(2);

    let resultadoDaConversao = {
        valor: valorUsuario,
        moeda1: moedaOrigem,
        moeda2: moedaDestino,
        resultado: conversao
    }

    salvaResultadoNoHistorico(resultadoDaConversao)
}

function inverter() {
    let moeda1 = document.getElementById("moeda1").value;
    let moeda2 = document.getElementById("moeda2").value;
    
    document.getElementById("moeda1").value = moeda2;
    document.getElementById("moeda2").value = moeda1;
}

function limpar() {
    let valorUsuario = document.getElementById("valor-usuario");
    let resultado = document.getElementById("resultado");

    valorUsuario.value = "";
    resultado.textContent = "";
}

function salvaResultadoNoHistorico(conversao) {
    let historico = recuperaHistoricoDeConversoes ();

    historico.push(conversao);

    let conversaoEmJson = JSON.stringify(historico);
    console.log(conversaoEmJson)
    localStorage.setItem("historico", historico);
}

function aceitaMensagem() {
    let divMensagemUsuario = document.getElementById("container-mensagem-usuario");
    divMensagemUsuario.classList.add("oculto");

    localStorage.setItem("aceitouCookie", "1");
}

function recuperaHistoricoDeConversoes() {
    let historico = localStorage.getItem("historico");
    
    if(!historico){
        console.log("historico está vazio")
        return [];
    }
    let historicoConvertido = JSON.parse(historico);
    return historicoConvertido;
    console.log(historicoConvertido);
    
}

function buscaAPI(moedaOrigem="USD", moedaDestino="BRL") {
    let url = "https://economia.awesomeapi.com.br/json/last/USD-BRL" + parametro;
    return fetch(url).then(function(data){
        if(data.status == 200) {
            console.log("deu tudo certo")
        }
        return data.json();
        //console.log(data)
    }).then(function(response){
        console.log(response);
        console.log(response["USDBRL"]["ask"]);
        return response["USDBRL"]["ask"];

    }).catch()
}