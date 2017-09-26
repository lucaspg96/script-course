//Arrow functions são funções de mapeamento, comumente usadas em scala
//Elas permitem você percorrer iteraveis e executar um bloco de comando simples sobre cada um deles,
//uma versão mais simples de um for each

var frutas = ["Banana","Maça","Uva","Laranja"]

var frutas_tamanhos = frutas.map(fruta => fruta.length)

console.log(frutas)
console.log(frutas_tamanhos)