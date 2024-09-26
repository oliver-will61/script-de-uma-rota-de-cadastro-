const btnCadastro = document.querySelector('#btn-cadastro')

btnCadastro.addEventListener('click', function(event){
    event.preventDefault(); // impede o envio padrão do frmulário

    const usuario = {
        email: document.getElementById('email-cadastro').value,
        senha: document.getElementById('senha-cadastro').value
    };

    fetch('http://localhost:3000/submit', {
        method:'POST', //Método da solicitação
        headers: {
            'Content-Type': 'application/json' // Tipo de conteúdo sendo enviado (JSON)
        },
        body: JSON.stringify(usuario) // Converte o objeto em uma string JSON
    })
    .then(response => response.text()) // Converte a resposta do servidor para texto
    .then(data=>{
        console.log('Resposta do servidor', data); // Log da resposta do servidor
    })
    .catch(erro => {
        console.error('Erro ao enviar para o servidor', erro);  // Log de erro, se ocorrer
    });
});
