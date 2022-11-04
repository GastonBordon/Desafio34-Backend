const { Server: HttpServer } = require("http");
const app = require("../app");
const httpServer = new HttpServer(app);
const { Server: SocketServer } = require("socket.io");
const productsContainer = require("../container/Contenedor.js");
const msjsContainer = require("../container/ContenedorMensajes.js");
const normalize = require("../normalizr/normalizr.js");

const initSocket =()=>{

const io = new SocketServer(httpServer);

  io.on("connection", async (socket) => {
    let products = await productsContainer.getAllFile();
    console.log("alguien se conecto");
    //Enviar la info
    socket.emit("productos", products);

    //Escucha los cambios
    socket.on("product", async (data) => {
      await productsContainer.saveInFile(data);
      products = await productsContainer.getAllFile();
      io.sockets.emit("productos", products);
    });
  });



  io.on("connection", async (socket) => {
    let mensajes = await msjsContainer.getAllFile();
    let data = await msjsContainer.readFile();
    data = await normalize.dataNormalizer(data);
    socket.emit("chat", data);

    socket.on("nuevoMensaje", async (data) => {
      await msjsContainer.saveInFile(data);
      mensajes = await msjsContainer.getAllFile();
      io.sockets.emit("chat", mensajes);
    });
  });
}

module.exports = {initSocket, httpServer}