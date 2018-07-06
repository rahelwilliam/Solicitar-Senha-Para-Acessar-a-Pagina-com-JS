// "author": "Rahel William"
//  "license": "ISC"

/* O Documento a seguir tem como objetivo solicitar senha ao acessar a página. 
Mesmo não sendo muito seguro (pois o correto seria via PHP), 
acaba sendo muito eficaz para quem não tem conhecimento em PHP 
ou simplesmente necessita de uma função em Jquery e JS */

/* Iniciamos o carregamento da função, com a leitura do documento 
e gerando um "hide" para o artigo ou outra div qualquer da pagina */

$(document).ready(function() {
    // Função para colocar a pagina em "hide" (esconder) e chamar a função "senha" 
    $("divMaster").hide('fast', function(e) {
        // aqui chamamos a função senha (que será criada a seguir)
        senha();
    });
    // Função para adicionar um botão, para o usuário "tentar novamente" no caso de errar a senha
    $("divTentarNovamente").on('click', '#novamente', function() {
        senha();
    });
});

/* Agora será criada a função "senha", que deverá solicitar uma senha para acessar a página */
function senha() {

    /*criamos uma variável chamada senha, retornando uma opção do Jquery chama "Prompt", 
    que tem como objetivo enviar uma mensagem ao usuário e permitir que o mesmo (usuário) retorne uma "string" (texto, que será a senha)*/
    var senha = prompt("O acesso a este documento é autorizado somente para técnicos, por favor informe a senha técnica", "");
    
    /* Nesta parte aplicamos a "geração da senha", que em nossa função, 
    a senha será randômica, onde deverá ser aplicada dependendo da Data (dia, semana e mês) em que o usuário está acessando a página */
    
    // A variável senha será para criar uma nova data (indicando a data de hoje)
    var data = new Date();
    
    /* Em seguida criamos as variáveis com a propriedade "getXXXX()" 
    para "separar" nossa data por dia, semana e mês 
    (é possível também separar ano, horário e etc...)*/
    
    // Para pegar o dia usamos o getDate()
    var dia = data.getDate();
    
    // aqui usamos um "if" com a propriedade "toString" para retornar o dia corretamente
    if (dia.toString().length == 1)
        dia = "0" + dia;
    
    // Para pegar o mês usamos o getMonth() + 1
    var mes = data.getMonth() + 1;
    
    // aqui usamos um "if" com a propriedade "toString" para retornar o mês corretamente
    if (mes.toString().length == 1)
        mes = "0" + mes;
    
    // Para pegar a semana (em números, inicia-se em 0 também) usamos o getDay()
    var sem = data.getDay();
    
    // aqui criamos a variável que será usada para "senha" final, onde aplicamos todas as variáveis criadas anteriormente
    var datasenha = (sem + 1) + '' + mes + '' + dia;
    
    /* Em seguida, basta adicionar um "if" para fazer a validação, 
    verificando se a variável "senha = prompt" (adiciona acima) 
    é igual (usando os sinais "==" [sem aspas] ) a nossa "datasenha" (criada com a aplicação das variáveis de data) */
    if (senha == datasenha) {
        // Se o usuário acertar, será aplicado as funções abaixo:
        
        // Criamos um alerta, avisando que o usuário acertou a senha
        alert('Acertou miserável!!! =)');
        
        // Em seguida mostramos a página com show (escondida anteriormente com hide)
        $("divMaster").show();
        
        // Aqui removemos a div "tentar" (que será criada a seguir)
        $('#tentar').remove();
                
    } else {
        // Se o usuário errar, será aplicado as funções abaixo:
        
        // Criamos um alerta, avisando que o usuário errou a senha
        alert('Senha incorreta, não será possível acessar o documento');
        
        // Em seguida escondemos a página com hide
        $("divMaster").hide();
        
        // Aqui removemos a div "tentar" (que será criada a seguir). 
        // * É necessário remover a div "tentar" para não duplicar, pois a mesma será criada no final da aplicação.
        $('#tentar').remove();
        
        /* Agora criamos o nosso html "tentar", personalizado com mensagem para o usuário 
        e um botão para tentar novamente (esse botão levará para a função senha, reiniciando a operação) */
        var html = '<link id="theme-style" rel="stylesheet" href="/styles/errodeAcesso.css">' +
            '<div id="tentar" style="margin-top: -50px;">' +
            '<center>' +
            '<div class="e404">' +
            '<div class="img"></div>' +
            '<span class="titulo">ACESSO NEGADO</span>' +
            '<button id="novamente" class="btn btn-danger btn-lg">Quero Tentar Novamente</button><br><br>' +
            '<hr class="colorgraph">' +
            '<br><div style="text-align: left;">' +
            '<b>Essa não!!! Parece que você não tem acesso a este documento.</b> ' +
            '<br>Este documento só pode ser acessado por técnicos ou representantes da Empresa. Se você precisar acessar o artigo, entre em contato conosco.</br>' +
            '</div><br>' +
            '<hr>' +
            '<div class="logo"></div>' +
            '</div>' +
            '</center>' +
            '</div>'
        
        // Por fim e não menos importante, geramos o html que criamos acima, para o usuário tentar novamente
        $("divTentarNovamente").append(html);
    }
}
