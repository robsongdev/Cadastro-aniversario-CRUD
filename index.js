const nomeInput = document.querySelector("#name");
const dataInput = document.querySelector("#birth-date");
const botao = document.querySelector("#botao");
const tabela = document.querySelector(".js-tabela")


const pessoas = JSON.parse(localStorage.getItem('pessoas')) || [];

exibirDados();


botao.addEventListener("click", (e)=>{
    e.preventDefault();
    if(!nomeInput.validity.valid){
        alert('nome invalido')
    }if(!dataInput.validity.valid){
        alert('Data invalida')
    }if(nomeInput.validity.valid && dataInput.validity.valid){
        
        // SALVANDO PESSOAS(OBJETO) NO LOCALSTORAGE 
        pessoas.push({nome: nomeInput.value, nascimento: dataInput.value})
        localStorage.setItem('pessoas', JSON.stringify(pessoas));
        
        resetarPagina();
 
    }
})




tabela.addEventListener("click", (e)=>{
    e.preventDefault()
  
    if(e.target.parentNode.id){
        const idNumber = parseInt(e.target.parentNode.id)
        //ALTERAR DADOS
        if(e.target.attributes.class.nodeValue == "pessoa-editar"){
            console.log(`vamos editar o numero: ${pessoas[idNumber].nome}`)
        }
        // EXCLUIR DADOS
        if(e.target.attributes.class.nodeValue == "pessoa-excluir"){
            alert(`Dados do: ${ pessoas[idNumber].nome} foram excluidos`)
            pessoas.splice(idNumber,1)
            localStorage.setItem('pessoas', JSON.stringify(pessoas));
            resetarPagina()
        }

    }
    

    
})



//FORMATANDO A DATA DE YYYY-MM-DD para DD/MM/YYYY
function getFormattedDate(dateString) {
    const date = new Date(dateString)
    var year = date.getFullYear();
  
    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
  
    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    
    return day + '/' + month + '/' + year;
}


function resetarPagina(){
    nomeInput.value = "";
    dataInput.value = "";
    window.location.reload()
}

function exibirDados(){
    for(var i = 0; i < pessoas.length; i++) {
        tabela.insertAdjacentHTML("beforeend",`
        <tr>
            <td>${pessoas[i].nome}</td>
            <td>${getFormattedDate(pessoas[i].nascimento)}</td>
            <td id=${i} ><a class="pessoa-editar" href="#">editar</a> <a class="pessoa-excluir" href="#">excluir</a></td>
        </tr>
        `)
        
    }
}