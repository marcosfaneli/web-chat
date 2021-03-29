let socket = io.connect();

let texto = document.getElementById("txt");

let id = Math.floor(Math.random() * 100)

socket.on(`message:${id}`, function(data){
    addMsg(data)
});

socket.on(`message:public`, function(data){
    addMsg(data)
});

function addMsg(data){

    const listagem = document.getElementById('chatArea');

    let mensagem = document.createElement(tagName = "div");

    mensagem.className = data.id == id ? "msg-me" : "msg-other";
    mensagem.innerHTML = data.message;

    listagem.appendChild(mensagem);

    window.scrollTo(0,document.body.scrollHeight);
}

function enviar(){

    socket.emit('sending message', {
        id: id, 
        message: texto.value
    });
    texto.value = "";
}

texto.addEventListener('keypress', function(key){
    console.log(id)
    if (key.keyCode == 13){
        enviar();
    }
});