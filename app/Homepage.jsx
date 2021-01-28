import React, { useState, useEffect } from "react";
import axios from "axios";
import PlayerCards from "../app/PlayerCards.jsx";
import SearchEngine from "../app/SearchEngine.jsx";
import SearchResults from "../app/SearchResults.jsx";
function HomePage(props) {
  const [profileState, setProfileState] = useState(props);
  const userName = profileState.userInfo.name;
  const searchEngineFunc = profileState.searchEngineFunc;
  const setSearchResults = profileState.setSearchResults;
  console.log("homepage results", props.searchResults);
  //const playerStatistics = profileState.playerStatistics;
  const playersArray = [];
  for (let i = 0; i < 15; i += 1) {
    playersArray.push(
      <PlayerCards
        key={i}
        playerStatistics={profileState.playerStatistics.stats[i]}
        playerInfo={profileState.playerInfo.players[i]}
      />
    );
  }
  return (
    <div className="HomePageContainer">
      <div className="userBanner">
        <p>You made it to the HomePage</p>
        <p>Welcome to the Club:{userName}</p>
        <button className="deletebutton">Delete Account</button>
      </div>
      <SearchEngine setSearchResults={setSearchResults} />
      {Object.keys(props.searchResults).length !== 0 ? (
        <SearchResults searchResults={props.searchResults} />
      ) : null}
      {playersArray}
    </div>
  );
}

export default HomePage;
