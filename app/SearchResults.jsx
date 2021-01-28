import React, { useState, useEffect } from "react";

function SearchResults(props) {
  const [searchInfo, setSearchInfo] = useState(props);
  console.log("searach result component", props.searchResults);

  return (
    <div>
      <div>
        <div>
          <div className="resultsheadercontainer">
            <h1>Search Results</h1>
            <h2>
              Player Name : {props.searchResults.first_name}{" "}
              {searchInfo.last_name}{" "}
            </h2>
          </div>
          <div className="playerstatscontainer">
            <p> Team: {props.searchResults.team} </p>
            <p> Points: {props.searchResults.points}</p>
            <p> Rebounds: {props.searchResults.rebounds}</p>
            <p> Steals: {props.searchResults.steals}</p>
            <p> Blocks: {props.searchResults.blocks}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchResults;
