const { request } = require("express");
const cookiesController = {};

cookiesController.setCookie = (req, res, next) => {
  function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  res.cookie("Session", "Welcome to the DLO");
  res.cookie("codeSession", randomIntFromInterval(0, 99).toString());
  return next();
};
