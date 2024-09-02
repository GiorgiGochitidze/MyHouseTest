const express = require("express");
const cors = require("cors");
const PORT = 5000;
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const localPathDB = process.env.DB_LOCAL_PATH
const DbUserPass = process.env.DB_USER_PASS

const uri = `mongodb+srv://giorgigochitidze5555:${DbUserPass}@cluster0.ga0pz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error with connection to MongoDB", err);
  });

const AuthRoute = require("./routes/UserAuth");
const HouseUpload = require("./routes/HouseUpload");

app.use("/", AuthRoute);
app.use("/", HouseUpload);

app.listen(PORT, () => {
  console.log(`Server is running on localhost: ${PORT}`);
});