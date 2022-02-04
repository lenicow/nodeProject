import express from "express";
import route from "./routes/routes";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const {
  APP_LOCALHOST: hostname,
  APP_PORT: port,
  APP_MONGODB: mongodb,
} = process.env;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

mongoose.connect(mongodb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/", route);
app.get("*", (req, res) => {
  res.status(404).send("Erreur 404 ou page non trouvé");
});

app.listen(port, () => {
  console.log(`Example app listening at http://${hostname}:${port}`);
});
