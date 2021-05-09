require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const path = require("path");
const passport = require("passport");
const socketio = require("socket.io");
const io = socketio(server, {
  path: "/ws/",
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
const formatMessage = require("./lib/messages");
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
} = require("./lib/users");

require("./config/passport")(passport);

app.use(passport.initialize());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

//----ROUTES----//

app.use(require("./routes"));

//---------------//

//----SOCKET.IO----//
io.on("connection", (socket) => {
  socket.on("join_guest", () => {
    socket.join("guest");

    socket.emit("show_message", formatMessage("Welcome to the Quiz!"));
    socket.emit("fetch_problem");
  });

  socket.on("join_main", ({ username, name, room }) => {
    const user = userJoin(socket.id, username, name, room);

    socket.join(user.room);

    socket.emit("show_message", formatMessage("Welcome to the Quiz!"));
    socket.emit("fetch_problem");
    socket.emit("fetch_answerable");
    socket.emit("fetch_house_ranking");

    socket.broadcast
      .to(user.room)
      .emit(
        "info_message",
        formatMessage(`${user.name} is pondering the problem.`)
      );

    io.to(user.room).emit("roomUsers", {
      room: user.room,
      users: getRoomUsers(user.room),
    });
  });

  socket.on("successful_answer", () => {
    const user = getCurrentUser(socket.id);
    socket.broadcast
      .to(user.room)
      .emit(
        "success_message",
        formatMessage(`${user.name} solved the problem!`)
      );
    socket.emit("fetch_problem");
    socket.emit("fetch_answerable");
    socket.emit("fetch_house_ranking");
    socket.broadcast.to(user.room).emit("fetch_problem");
    socket.broadcast.to(user.room).emit("fetch_answerable");
    socket.broadcast.to(user.room).emit("fetch_house_ranking");
  });

  socket.on("failed_answer", () => {
    const user = getCurrentUser(socket.id);
    socket.broadcast
      .to(user.room)
      .emit(
        "error_message",
        formatMessage(`${user.name} failed to solve the problem!`)
      );
    socket.emit("fetch_problem");
    socket.emit("fetch_answerable");
    socket.emit("fetch_house_ranking");
  });

  socket.on("disconnect", () => {
    const user = userLeave(socket.id);

    if (user) {
      io.to(user.room).emit(
        "info_message",
        formatMessage(`${user.name} stopped pondering.`)
      );

      // Send users and room info
      io.to(user.room).emit("roomUsers", {
        room: user.room,
        users: getRoomUsers(user.room),
      });
    }
  });
});

//----------------//

server.listen(5000, () => {
  console.log("Listening on port 5000: http://localhost:5000");
});
