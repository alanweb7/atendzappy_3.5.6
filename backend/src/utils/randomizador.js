"use strict";
exports.__esModule = true;
exports.randomizarCaminho = void 0;
function randomizarCaminho(chance) {
    var chanceA = chance; // 20% de chance para o caminho A
    var max = 1;
    var min = 0;
    var numeroAleatorio = Math.random() * (max - min) + min; // Gere um número aleatório entre 0 e 1
    if (numeroAleatorio < chanceA) {
        return "A";
    }
    else {
        return "B";
    }
}
exports.randomizarCaminho = randomizarCaminho;
