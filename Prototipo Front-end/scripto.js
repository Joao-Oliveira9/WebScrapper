const url_tam = localStorage.getItem('url_tam');
const valor_tam = localStorage.getItem('valor_tam');

const url_gol = localStorage.getItem('url_gol');
const valor_gol = localStorage.getItem('valor_gol');

const preco_tam = document.getElementById("precotam")
const preco_gol = document.getElementById("precogol")
const link_tam = document.getElementById("linktam")
const link_gol = document.getElementById("linkgol")

preco_tam.textContent = `${valor_tam}`
preco_gol.textContent = `${valor_gol}`

link_tam.href = `${url_tam}`
link_gol.href = `${url_gol}`