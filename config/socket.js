const socket = io => {
  io.on("connection", socket => {
    console.log(`connection established by: ${socket.id}`);

    socket.on("send_children", () => {
      socket.broadcast.emit("receive_children");
    });
  });
};

module.exports = socket;
