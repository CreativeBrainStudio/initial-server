const socket = io => {
  io.on("connection", socket => {
    console.log(`connection established by: ${socket.id}`);

    // Video call
    socket.emit("me", socket.id);

    socket.on("leaveCall", () => socket.broadcast.emit("callEnded"));

    socket.on("callUser", data =>
      io.to(data.userToCall).emit("callUser", {
        signal: data.signalData,
        from: data.from,
        name: data.name,
      })
    );

    socket.on("answerCall", data => {
      io.to(data.to).emit("callAccepted", data.signal);
    });

    // Broadcasting
    socket.on("broadcast_stream", status =>
      socket.broadcast.emit("broadcast_status", status)
    );

    socket.on("load_broadcast", () =>
      socket.broadcast.emit("get_broadcast_status")
    );

    // Children collection
    socket.on("send_children", () => socket.broadcast.emit("receive_children"));
  });
};

module.exports = socket;
