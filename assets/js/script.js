// Localize ou crie esta função no seu arquivo JavaScript (ex: script.js)

async function cadastrarInteresse(event) {
    if (event) {
        // ESSENCIAL: Impede o comportamento padrão do botão (embora o type="button" já ajude)
        event.preventDefault(); 
    }

    // URL DA SUA API FLASK: Confirme que este endereço está correto
    const url = 'http://127.0.0.1:5000/cadastrar-contato';
    
    // Elementos de Feedback
    const loadingDiv = document.querySelector('.loading');
    const sentMessageDiv = document.querySelector('.sent-message');
    const errorMessageDiv = document.querySelector('.error-message');

    // Oculta todas as mensagens e mostra o carregamento
    loadingDiv.style.display = 'block'; 
    sentMessageDiv.style.display = 'none';
    errorMessageDiv.style.display = 'none';

    // 1. Coleta os dados do formulário pelos IDs
    const dadosContato = {
        nome: document.getElementById('name_contato').value,
        email: document.getElementById('email_contato').value,
        assunto: document.getElementById('assunto_contato').value,
        telefone: document.getElementById('telefone_contato').value,
        segmento: document.getElementById('ramo_contato').value, // ID ramo_contato mapeado para 'segmento' no JSON
        mensagem: document.getElementById('mensagem_contato').value
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                // Seu Flask espera JSON
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(dadosContato) // Converte o objeto JavaScript para string JSON
        });

        // Oculta o carregamento
        loadingDiv.style.display = 'none';

        if (response.ok) {
            // Sucesso (Status 200)
            sentMessageDiv.style.display = 'block';
            // Opcional: Limpar o formulário
            document.getElementById('contactForm').reset(); 
        } else {
            // Erro retornado pela API (Ex: 412)
            const erro = await response.json();
            errorMessageDiv.innerHTML = `Erro ao cadastrar. Verifique os dados. (Status: ${response.status})`;
            errorMessageDiv.style.display = 'block';
        }

    } catch (error) {
        // Erro de rede (ex: API Flask não está rodando)
        loadingDiv.style.display = 'none';
        errorMessageDiv.innerHTML = 'Erro de conexão: Verifique se o servidor Flask está ativo em http://127.0.0.1:5000.';
        errorMessageDiv.style.display = 'block';
        console.error('Erro de Fetch:', error);
    }
}