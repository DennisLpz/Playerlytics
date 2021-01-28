const { request } = require("express");
const axios = require("axios");
const playersController = {};

playersController.findPlayer = (req, res, next) => {
  //we will get player name from request
  let { search } = req.body;
  search = search.split(" ").join("_");
  // we will make a post request to the API player personal info
  let getPlayerURL = "https://www.balldontlie.io/api/v1/players?search=";
  getPlayerURL += search;
  axios
    .get(getPlayerURL)
    .then((response) => {
      //console.log(response.data.data);
      res.locals.playerinfo = {
        id: response.data.data[0].id,
        first_name: response.data.data[0].first_name,
        last_name: response.data.data[0].last_name,
        team: response.data.data[0].team.full_name,
      };
      //console.log(res.locals.playerinfo);
      return next();
    })
    .catch((err) => {
      console.log(err);
      return next();
    });
  // we will grab player to invoke the the next API call on the player stats
  //we will save personal info and player stats and send back to client
};
playersController.gettingStats = (req, res, next) => {
  const playerID = res.locals.playerinfo.id;
  let playerStatsURL =
    "https://www.balldontlie.io/api/v1/season_averages/?season=2019&player_ids[]=";
  playerStatsURL += playerID;
  axios
    .get(playerStatsURL)
    .then((response) => {
      // console.log(response.data.data[0]);
      res.locals.playerinfo = {
        ...res.locals.playerinfo,
        assists: response.data.data[0].ast,
        points: response.data.data[0].pts,
        rebounds: response.data.data[0].reb,
        steals: response.data.data[0].stl,
        blocks: response.data.data[0].blk,
      };
      console.log(res.locals.playerinfo);
      return next();
    })
    .catch((error) => {
      console.log(error);
      return next();
    });
};
module.exports = playersController;
