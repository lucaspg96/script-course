// JSON é um formato de marcação de dados. A sigla significa:
// JavaScript Object Notation
// Ele é a representação textual de um dado estruturado em um Objeto Literal de JavaScript

var objeto = {chave: "valor"}
console.log(objeto)

var json = '{"chave":"valor"}'
console.log(json)
console.log(JSON.parse(json))