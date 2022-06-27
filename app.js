const { Client, Intents } = require("discord.js");

require("dotenv").config();

const prefix = "!";

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

// CODIGO

client.once("ready", (bot) => {
  console.log(`Bot: ${bot.user.username}\nStatus: ${bot.presence.status}`);
});

//Al recibir un mensaje
client.on("messageCreate", (msg)=>{
    //Si el mensaje empieza con !
    if(msg.author.bot===false && msg.content.startsWith(prefix)){
        funcionesBot(msg)
    }
})

function funcionesBot(msg){
    //elimina el prefix del mensaje y lo guarda en mayuscula
    let mensaje = msg.content.slice(1).toUpperCase();
    
    mensaje= mensaje.split(" ");

    if(mensaje[0]==="TIRAR"){
        
        posiblesTiradas(msg, mensaje[1]);
    }
}

function posiblesTiradas(msg, argumento){
    let mensajeSalida = "Has obtenido un "
    if(argumento==="DLEGENDARIO"){
        let numObtenido = obtenerNumAleatorio(12);
        dadoLegendario(numObtenido, msg, mensajeSalida);
        return
        
    }else 
    
    if(argumento==="D4"){
        mensajeSalida += obtenerNumAleatorio(4).toString();
        
    }else
    
    if(argumento==="D6"){
        mensajeSalida += (obtenerNumAleatorio(7)-1).toString();
        
    }else
    
    if(argumento==="D8"){
        mensajeSalida += obtenerNumAleatorio(8).toString();
        
    }else
    
    if(argumento==="D10"){
        mensajeSalida += (obtenerNumAleatorio(10)-1).toString()
        
    }else{
        mensajeSalida= "Ese no es ningun dado"
    }

    msg.reply(mensajeSalida);

}

function obtenerNumAleatorio(numero){
    //Numero aleatorio entre 1 y 12
    return Math.ceil(Math.random()*numero);
}

function dadoLegendario(numObtenido, msg, mensajeSalida){
    //Convertimos numero en enunciado legendario
    if(numObtenido===8 || numObtenido===9){
        msg.reply(mensajeSalida+"Exito con consecuencia negativa")
    }else{
        if(numObtenido>=10){
            msg.reply(mensajeSalida+"Exito con consecuencia positiva")
        }else{
            msg.reply(mensajeSalida+"Máximo potencial")
        }
    }
    
}

//------n

client.login(process.env.DSTOKEN);