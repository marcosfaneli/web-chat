let socket = io.connect();

let texto = document.getElementById("txt");

let token;

function logar(){
    socket.emit('login', "login");
}

logar();

socket.on('new message', function(data){
    addMsg(data, data.token == token)
});

socket.on('logon', function(data){ 
    if (!token){
        token = data.token;
    }
});

function addMsg(data, myself){
    const listagem = document.getElementById('chatArea');

    let mensagem = document.createElement(tagName = "div");

    mensagem.className = myself ? "msg-me" : "msg-other";
    mensagem.innerHTML = data.message;

    listagem.appendChild(mensagem);

    window.scrollTo(0,document.body.scrollHeight);
}

function enviar(){
    socket.emit('sending message', texto.value);
    texto.value = "";
}

texto.addEventListener('keypress', function(key){
    if (key.keyCode == 13){
        enviar();
    }
});