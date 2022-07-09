import { Router } from "express";
import { saveUser, verifyUser } from "../utils/userDB.js";
import { sendEmail } from "../utils/emailSender.js";
const AuthRouter = Router();

AuthRouter.get("/", (req, res) => {
  res.redirect("/register");
});

AuthRouter.get("/register", (req, res) => {
  res.render("register");
});

AuthRouter.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    // console.log(firstName, lastName, email, password);
    const userId = await saveUser(firstName, lastName, email, password);

    if (userId === null) {
      res.status(400).render("message", {
        title: "Error!",
        message: "Registration Failed!",
      });
    } else {
      await sendEmail(
        email,
        "Verify Email Address",
        `<p>To verify your email address click <a href="http://localhost:5000/verify-email/${userId}">here</a>!</p>`
      );
      res.status(200).render("message", {
        title: "Success!",
        message: "Registration was Successful!",
      });
    }
  } catch (e) {
    res.redirect("/register");
  }
});

AuthRouter.get("/verify-email/:id", async (req, res) => {
  const { id } = req.params;
  const verified = await verifyUser(id);
  if (verified) {
    res.status(200).render("message", {
      title: "Success!",
      message: "Successfully Verified!",
    });
  } else {
    res
      .status(400)
      .render("message", { title: "Error!", message: "Verification Failed!" });
    //   res.send(`${id}`);
  }
});

export default AuthRouter;
