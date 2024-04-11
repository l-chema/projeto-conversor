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
    let valorUsuario = document.getElementById("valor-usuario").value;

    let moedaOrigem = document.getElementById("moeda1").value;
    let moedaDestino = document.getElementById("moeda2").value;

    let conversao = valorUsuario * valoresConversao[moedaOrigem][moedaDestino];

    if(valorUsuario == ""){
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

    let paragrafoResultado = document.getElementById("resultado");
    paragrafoResultado.textContent = simbolo + " " + conversao.toFixed(2);

    console.log(conversao);
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