import express from "express";
import * as path from "path";
import * as url from "url";
import AuthRouter from "./routes/index.js";
// const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const main = async () => {
  const app = express();
  const PORT = 5000;

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.set("view engine", "ejs");
  app.set("views", path.join(__dirname, "views"));
  app.use(express.static(path.join(__dirname, "public")));

  app.use("", AuthRouter);

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
