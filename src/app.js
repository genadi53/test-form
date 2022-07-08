import express from "express";
import * as path from "path";
import { fileURLToPath } from "url";
import pug from "pug";

import * as url from "url";
// const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const main = async () => {
  const app = express();
  const PORT = 5000;

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.set("view engine", "pug");
  app.set("views", path.join(__dirname, "views"));
  //   app.use(express.static(path.join(__dirname, "public")));

  app.get("/", (req, res) => {
    res.redirect("/register");
  });

  app.get("/register", (req, res) => {
    res.render("index", { title: "Hey", message: "Hello there!" });
  });

  app.post("/register", (req, res) => {});

  app.post("/verify-email", (req, res) => {});

  app.all("*", (req, res) => {
    res.status(404).send("Not Found!");
  });

  app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
  });
};

main().catch((err) => {
  console.log(err);
});
