import { sendEmail } from "../utils/emailSender.js";
import { saveUser } from "../utils/saveUser.js";

export const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    console.log(firstName, lastName, email, password);
    const userId = await saveUser(firstName, lastName, email, password);

    if (userId === null) res.send("Error!");

    await sendEmail(
      email,
      "Verify Email Address",
      `http://localhost:5000/verify-email/${userId}`
    );
    res.send("Successfully Registreated");
  } catch (e) {
    res.redirect("/register");
  }
};

export const verifyEmail = () => {};
