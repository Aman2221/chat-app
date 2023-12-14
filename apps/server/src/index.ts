import http from "http"
import SocketService from "./services/socket";

async function init() {
    const socketService = new SocketService();
    const httpServer = http.createServer();
    const PORT = process.env.PORT || 8000;
    //here we attached out local http server with socket.io service(server)
    socketService.io.attach(httpServer)

    socketService.initListener();

    httpServer.listen(PORT);

    console.log("https server started", PORT)
}

init();