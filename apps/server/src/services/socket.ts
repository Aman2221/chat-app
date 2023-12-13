import { Server } from "socket.io";
import { Redis } from "ioredis";

const pub = new Redis({
    host: "redis-3848e748-as562770-d66e.a.aivencloud.com",
    port: 17987,
    username: "default",
    password: "AVNS_9Qq9GyMZmCYZAk92fR6"
});
const sub = new Redis({
    host: "redis-3848e748-as562770-d66e.a.aivencloud.com",
    port: 17987,
    username: "default",
    password: "AVNS_9Qq9GyMZmCYZAk92fR6"
});

class SocketService {
    private _io: Server;
    constructor() {
        this._io = new Server({
            cors: {
                allowedHeaders: ["*"],
                origin: "*"
            }
        });
        sub.subscribe("MESSAGES")
    }

    public initListener() {
        const io = this.io;
        console.log("Init socket listener");

        io.on("connect", (socket) => {
            console.log(`New Socket Connected`, socket.id);
            socket.on("event:message", async ({ message }: { message: string }) => {
                console.log("New Message Rec.", message);
                // publish this message to redis
                await pub.publish("MESSAGES", JSON.stringify({ message }));
            });
        });

        sub.on("message", (channel, message) => {
            if (channel == "MESSAGES") {
                io.emit("message", message)
            }
        })
    }

    get io() {
        return this._io;
    }

}

export default SocketService;