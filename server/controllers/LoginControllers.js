const { request, response } = require("express");
const db = require("../models/sqlmodel");
const hashFunc = require("../Hashfunc.js");
const loginController = {};
//console.log(hashFunc('heello'));
loginController.verifyUser = (req, res, next) => {
  const findUser = `SELECT *  FROM users
WHERE email = $1 AND password = $2 ;`;
  const decryptPassword = hashFunc(req.body.password);
  const value = [req.body.email, decryptPassword];
  console.log("values passed in from request", value);
  db.query(findUser, value)
    .then((response) => {
      if (
        response.rows[0].email === value[0] &&
        response.rows[0].password === value[1]
      ) {
        res.locals.found = [
          response.rows[0].favorite_player,
          response.rows[0].favorite_team,
        ];
        return next();
      } else {
        res.locals.error = { error: "Wrong Password" };
        return next();
      }
    })
    .catch((err) => {
      res.locals.error = { err };
      return next();
    });
};

loginController.createUser = (req, res, next) => {
  const newUser = `INSERT INTO users (name, email, password, favorite_player, favorite_team )
VALUES ($1, $2, $3, $4, $5 );`;
  console.log(req);
  const encryptPassword = hashFunc(req.body.password);
  const value = [
    req.body.name,
    req.body.email,
    encryptPassword,
    req.body.favorite_player,
    req.body.favorite_team,
  ];
  //console.log(value);
  db.query(newUser, value)
    .then((response) => {
      return next();
    })
    .catch((err) => {
      //console.log(err);
      res.locals.error = err;
      return next();
    });
};
loginController.deleteUser = (req, res, next) => {
  const deleteQuery = `DELETE FROM users WHERE email='dlo@dlo'AND password = 'theone' AND name = 'Dennis';
`;
  let decryptedPassword = hashFunc(req.body.password);
  const value = [req.body.email, decryptedPassword, req.body.name];
  db.query(deleteQuery, value)
    .then((response) => {
      console.log("made it to the delete user middleware");
      res.locals.deleted = true;
      return next();
    })
    .catch((err) => {
      res.locals.err = err;
      return next();
    });
};
module.exports = loginController;
