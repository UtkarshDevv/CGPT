const express = require("express");
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");
const port = 5500;
app.use(express.static(__dirname + "/CGPT"));
app.use(cors());
app.use("/style", express.static(__dirname + "/CGPT/style"));

app.get("/", (req, res) => res.sendFile(__dirname + "/CGPT/Landingpage.html"));

app.get("/Auth.html", (req, res) => res.sendFile(__dirname + "CGPT/Auth.html"));
app.post("/Auth", bodyParser.urlencoded({ extended: true }), (req, res) => {
  const { username, password } = req.body;

  console.log(req.body);
  if (username === "Test" && password === "abc123") {
    res.status(200).redirect("/Contact.html");
  } else {
    res.status(401).send("Invalid Credentials");
  }
});

const isAuthenticated = (req, res, next) => {
  const { authenticated } = req.session;
  if (authenticated) {
    next(); // If authenticated, continue to the next middleware or route
  } else {
    res.redirect("/Auth.html"); // If not authenticated, redirect to the authentication page
  }
};
// Protected route for the contact page, only accessible if authenticated
app.get("/Contact.html", isAuthenticated, (req, res) =>
  res.sendFile(__dirname + "/CGPT/Auth.html"),
);

app.get("/StudentReg", (req, res) =>
  res.sendFile(__dirname + "/CGPT/StudentReg.html"),
);

app.post(
  "/StudentReg",
  bodyParser.urlencoded({ extended: true }),
  (req, res) => {
    const { email, password } = req.body;
    const StudentData = [];
    StudentData.push({ email, password });
    console.log(StudentData);
    res.status(200).send("Registration successful");
  },
);

app.get("/RecruiterReg.html", (req, res) =>
  res.sendFile(__dirname + "./WebProject/RecruiterReg.html"),
);

app.post(
  "/RecruiterReg",
  bodyParser.urlencoded({ extended: true }),
  (req, res) => {
    var {
      companyName,
      industry,
      website,
      recruiterName,
      email,
      phone,
      jobTitle,
      description,
      location,
      skills,
      experience,
      Recruitmentdate,
      mode,
    } = req.body;
    const RecruiterData = [];
    RecruiterData.push({
      companyName,
      industry,
      website,
      recruiterName,
      email,
      phone,
      jobTitle,
      description,
      location,
      skills,
      experience,
      Recruitmentdate,
      mode,
    });
    console.log(RecruiterData);

    // Redirect after a delay
    setTimeout(() => {
      console.log("abc");

      res.status(200).redirect("/Landingpage.html");
    }, 5000);
  },
);

console.log(__dirname);
app.listen(port, () => console.log(`Listening on port ${port}`));
