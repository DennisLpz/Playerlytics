import React, { useState } from "react";

function PlayerCards(props) {
  const [playerStats, setPlayerStats] = useState(props);
  //console.log(playerStats.playerStatistics);
  return (
    <div className="playercards">
      <div className="playerInfoContainer">
        <p>
          Player Name : {playerStats.playerInfo.first_name}, LastName :
          {playerStats.playerInfo.last_name}, Team:
          {playerStats.playerInfo.team.full_name}
        </p>
      </div>
      <div className="statsboardcontainer">
        <p>
          {" "}
          Points per Game:
          {playerStats.playerStatistics.pts
            ? playerStats.playerStatistics.pts
            : "Unable to find Stats"}{" "}
          Assists per Game :{" "}
          {playerStats.playerStatistics.ast
            ? playerStats.playerStatistics.ast
            : "Unable to find Stats"}
        </p>
        <p>
          {" "}
          Steals per Game:
          {playerStats.playerStatistics.stl
            ? playerStats.playerStatistics.stl
            : "Unable to find Stats"}{" "}
          Games Played :{" "}
          {playerStats.playerStatistics.games_played
            ? playerStats.playerStatistics.games_played
            : "Unable to find Stats"}
        </p>
      </div>
    </div>
  );
}

export default PlayerCards;
