const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require("axios");

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URI);

const comicsRoutes = require("./routes/comics");
const charactersRoutes = require("./routes/characters");
const userRoutes = require("./routes/signup");

app.use(comicsRoutes);
app.use(charactersRoutes);
app.use(userRoutes);

app.get("/", (req, res) => {
  //   console.log("Nous sommes sur le serveur");
  res.json({ message: "Le serveur fonctionne" });
});

app.all("*", (req, res) => {
  res.status(404).json({ message: "This route doesn't exist" });
});

app.listen(process.env.PORT, () => {
  console.log("Served started 🚀");
});
