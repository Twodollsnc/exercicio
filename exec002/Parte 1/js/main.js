
let result = document.getElementById("result")
const btn = document.getElementById("verificarBotao")
console.error("conectou kkkkkkkkkkk");
btn.addEventListener("click", verifiacarNota)

function verifiacarNota(){
    let nota= document.getElementById("nota").value
    let result = document.getElementById("result")
    console.log(nota)
    if (nota >= 7)
    {
        console.log("Aprovado");
        result.innerText = "Aprovado"
        result.style.color = "green"
        
    }     
    if (nota >= 4 && nota <7){  
        console.log("ta de recu recu otario");
        result.innerText = "Recuperação"
        result.style.color = "orange"
    }
    if (nota < 4){
        console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk chora ai kkkkkkkkkkkkkkkkk")
        result.innerText = "Recupreação kkkkkkkkkkkkkkkkkkkkkkkkkk"
        result.style.color= "red"
    } 
}

