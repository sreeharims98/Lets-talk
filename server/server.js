import express from "express";
import { connectDB } from "./config/connectDB.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import cors from "cors";
// import { videoRoute } from "./routes/videoRoute.js";
import { userRoute } from "./routes/userRoute.js";
import { config } from "./config/config.js";
import { Server } from "socket.io";
import http from "http";
import { SOCKET } from "./data/constants.js";
import { addUserToOnline, getOnlineUsers, removeUserFromOnline } from "./utils/users.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: config.SOCKET_CORS_ORIGIN,
  },
});
connectDB();

app.use(cors());
app.use(express.json());
// app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("Hello, This is Let's Talk backend!");
});

//socket.io
io.on(SOCKET.CONNECTION, (socket) => {
  // console.log(io.of("/").adapter);
  //send to a user that is joined
  socket.emit(SOCKET.MESSAGE, "Welcome to Let's talk!");

  //listen for statuses ONLINE
  socket.on(SOCKET.STATUS_CLIENT_ONLINE, (userData) => {
    const allOnlineUsers = addUserToOnline(userData, socket.id);
    //broadcast to all users when a user is online
    io.emit(SOCKET.STATUS_SERVER, allOnlineUsers);
  });

  //listen for chat messages
  socket.on(SOCKET.CHAT_MESSAGE, (msg) => {
    //send to all users when a new message is recieved
    io.emit(SOCKET.MESSAGE, msg);
  });

  //socket when disconnect
  socket.on(SOCKET.DISCONNECT, () => {
    const remOnlineUsers = removeUserFromOnline(socket.id);
    io.emit(SOCKET.STATUS_SERVER, remOnlineUsers);
  });
});

//users
app.use("/api/user", userRoute);
//videos
// app.use("/api/video", videoRoute);

//errors
app.use(notFound);
app.use(errorHandler);

//listen
const PORT = config.PORT || 5000;
server.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});
