const btnEnv = document.getElementById("mandar")
btnEnv.addEventListener('click', enviar)

function enviar(){
    let nome = document.getElementById("nome").value
    console.log(nome)
    alert(`bem vindo ${nome}`)
}