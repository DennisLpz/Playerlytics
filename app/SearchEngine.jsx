import React, { useState } from "react";

function SearchEngine(props) {
  const [searchDetails, setSearchDetails] = useState({ search: "" });
  const submitHandler = (info) => {
    info.preventDefault();
    //invoke some function in the app component to make search
    console.log(searchDetails);
    fetch("/api/searchplayer", {
      method: "POST",
      body: JSON.stringify(searchDetails),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        props.setSearchResults(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <form onSubmit={submitHandler}>
        <label> Search Your Favorite Player </label>
        <input
          type="text"
          name="search"
          id="search-engine"
          onChange={(event) => setSearchDetails({ search: event.target.value })}
          value={searchDetails.search}
        />
        <input
          className="loginbutton"
          type="submit"
          value="Search Player"
        ></input>
      </form>
    </div>
  );
}

export default SearchEngine;
