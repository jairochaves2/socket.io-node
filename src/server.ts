import http from "http";
import * as SocketIo from "socket.io";

const server = http.createServer();
let io = require("socket.io")(server, {
  cors: { origin: "*" },
});
interface Hand {
  luz: "apagada" | "acesa";
  sala: string;
}
const users = new Map<string, Hand>();
io.on("connection", (client: SocketIo.Socket) => {
  // users.set(client, client.id);
  // console.table(users);
  client.on("levanta.mao", (event) => {
    console.table(event);
    users.set(event.sala, event);
    console.log(users);
    client.broadcast.emit("muda.mao", Array.from(users));
  });
  client.emit("connection", Array.from(users));
});
server.listen("8181", () => {
  console.log("Running on", 8181);
});
