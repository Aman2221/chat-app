import { Server } from "socket.io";
import { Redis } from "ioredis";

//this is the redis instance configuration for publish
const pub = new Redis({
    host: "redis-3848e748-as562770-d66e.a.aivencloud.com",
    port: 17987,
    username: "default",
    password: "AVNS_9Qq9GyMZmCYZAk92fR6"
});

//this is the redis instance configuration for publish
const sub = new Redis({
    host: "redis-3848e748-as562770-d66e.a.aivencloud.com",
    port: 17987,
    username: "default",
    password: "AVNS_9Qq9GyMZmCYZAk92fR6"
});

class SocketService {
    private _io: Server;
    //here we create a fresh socket.io server
    constructor() {
        this._io = new Server({
            //here we allowed any headers and origin because of the CORS policy error
            cors: {
                allowedHeaders: ["*"],
                origin: "*"
            }
        });
        sub.subscribe("MESSAGES") //subscribed to MESSAGES channel
    }

    public initListener() {
        const io = this.io;
        console.log("Init socket listener");
        //connection to socket.io server
        io.on("connect", (socket) => {
            console.log(`New Socket Connected`, socket.id);
            socket.on("event:message", async ({ message }: { message: string }) => {
                console.log("New Message Rec.", message);
                // publish this message to redis
                await pub.publish("MESSAGES", JSON.stringify({ message }));
            });
        });

        //subscribing to any new message into the MESSAGE channel
        sub.on("message", (channel, message) => {
            if (channel == "MESSAGES") {
                //this will emit any new message to all subscribed users.
                io.emit("message", message)
            }
        })
    }

    get io() {
        return this._io;
    }

}

export default SocketService;