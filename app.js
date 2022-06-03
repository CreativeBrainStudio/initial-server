const express = require("express"),
  cors = require("cors"),
  mongoose = require("mongoose");
require("dotenv").config();

// ENV connection to MongoDB
mongoose.connect(process.env.ATLAS_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
const port = process.env.PORT || 5000; // Dynamic port for deployment

const corsConfig = {
  origin: "http://localhost:3000", // Do not use wildcard
  methods: ["GET", "POST", "PUT", "DELETE"], // List only available methods
  credentials: true, // Must be set to true
  allowedHeaders: ["Origin", "Content-Type", "X-Requested-With", "Accept"], // Still unclear
};

app.use(cors(corsConfig)); // Pass configuration to cors

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
app.use("/users", require("./routes/Users"));

app.listen(port, () => console.log(`Server is running on port: ${port}`));
