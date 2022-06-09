const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const mongoose = require("mongoose");
const middleware = require("./middleware");
require("dotenv").config();

// ENV connection to MongoDB
mongoose.connect(process.env.ATLAS_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const corsConfig = {
  origin: "http://localhost:3000", // Do not use wildcard
  methods: ["GET", "POST", "PUT", "DELETE"], // List only available methods
  credentials: true, // Must be set to true
  allowedHeaders: [
    "Origin",
    "Content-Type",
    "X-Requested-With",
    "Accept",
    "Authorization",
  ], // Allowed Headers to be received
};

app.use(cors(corsConfig)); // Pass configuration to cors
const server = http.createServer(app);

// Used to receive req.body in api
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

const connection = mongoose.connection;
connection.once("open", () =>
  console.log("MongoDB database connection established successfully")
);

// List of available Routes
app.use("/roles", require("./routes/Roles"));
app.use("/auth", require("./routes/Auth"));
app.use("/users", require("./routes/Users"));
app.use("/children", require("./routes/Children"));
app.use(middleware.notFound);
app.use(middleware.errorHandler);

const io = new Server(server, {
  cors: corsConfig,
});

io.on("connection", socket => {
  console.log(`connection established by: ${socket.id}`);

  socket.on("send_children", () => {
    socket.broadcast.emit("receive_children");
  });
});

const port = process.env.PORT || 5000; // Dynamic port for deployment
server.listen(port, () => console.log(`Server is running on port: ${port}`));
