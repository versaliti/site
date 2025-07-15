function cadastrar(){

    const nome = document.getElementById('name_contato').value;
    const email = document.getElementById('email_contato').value;
    const assunto = document.getElementById('assunto_contato').value;
    const telefone = document.getElementById('telefone_contato').value;
    const segmento = document.getElementById('ramo_contato').value;
    const mensagem = document.getElementById('mensagem_contato').value;
    
    if (telefone.length !== 11) { 
        alert("O telefone de contato deve ter exatamente 11 dígitos.");
        return;
    }    

    const contato = {nome, 
        email, 
        assunto, 
        telefone, 
        segmento, 
        mensagem, 
        };

    fetch('http://127.0.0.1:5000/cadastrar-contato', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(contato)
    })
    .then(resposta =>{
        console.log(resposta.ok);
        if (resposta.ok){
            alert('Contato cadastrado com sucesso!');
        }
    })
}