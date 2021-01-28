const express = require("express");
const app = express();
const path = require("path");
const axios = require("axios");
const loginController = require("../server/controllers/LoginControllers.js");
const playersController = require("../server/controllers/playersController.js");

//const path = require("path");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

//making request to render index file and REACT
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});
// making request to verify user
app.post("/api", loginController.verifyUser, (req, res) => {
  if (res.locals.error) {
    res.status(400).send("File not found");
  } else {
    console.log(res.locals.found);
    res.status(200).json({ message: res.locals.found });
  }
});
app.post("/api/newUser", loginController.createUser, (req, res) => {
  if (res.locals.error) {
    res.status(310).send("Unable to set up account");
  } else {
    res.status(200).json("Created User!");
  }
});
app.post(
  "/api/searchplayer",
  playersController.findPlayer,
  playersController.gettingStats,
  (req, res) => {
    if (res.locals.error) {
      res.status(310).send("Unable to find player");
    } else {
      res.status(200).json(res.locals.playerinfo);
    }
  }
);

app.delete("/api/deleteuser", loginController.deleteUser, (req, res) => {
  if (res.locals.error) {
    res.status(007).send("Something went wrong : Unable to find user");
  } else {
    res.status(200).json("Deleted: Sad to see you go");
  }
});

app.listen(3000); //listens on port 3000 -> http://localhost:3000/
