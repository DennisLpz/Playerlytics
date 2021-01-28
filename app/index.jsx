import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import "./index.css";
import HomePage from "../app/Homepage.jsx";
import LoginForm from "../app/LoginForm.jsx";
import NewUserForm from "../app/NewUserForm.jsx";
import axios from "axios";

function App() {
  const [user, setUser] = useState({ name: "", email: "" });
  const [error, setError] = useState("");
  const [playerInfo, setPlayerInfo] = useState({ players: "" });
  const [creatingUser, setCreatingUser] = useState(null);
  const [playerStatistics, setPlayerStatistics] = useState({ stats: "" });
  const [searchResults, setSearchResults] = useState({});
  console.log("searchResults1", searchResults);
  // console.log("searchResults2", searchResults);
  const playerIDs = [];
  const getPlayerStats = (playerIDs) => {
    let statsURL =
      "https://www.balldontlie.io/api/v1/season_averages?season=2017";

    playerIDs.forEach((elem) => {
      statsURL += `&player_ids[]=${elem}`;
    });
    axios
      .get(statsURL)
      .then((res) => {
        //console.log(res.data.data)
        setPlayerStatistics({ stats: res.data.data });
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    axios
      .get("https://www.balldontlie.io/api/v1/players")
      .then((res) => {
        console.log(res.data.data);
        setPlayerInfo({ players: res.data.data });
        res.data.data.forEach((player) => {
          for (let key in player) {
            if (key === "id") {
              playerIDs.push(player[key]);
            }
          }
        });
        //console.log(playerIDs);
        getPlayerStats(playerIDs);
      })
      .catch((err) => console.log(err));
  }, []);
  //we need to add a Log IN anonymous function
  const Login = (details) => {
    fetch("/api", {
      method: "POST",
      body: JSON.stringify(details),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data) {
          setUser({ name: details.name, email: details.email });
        } else {
          console.log("wrong user info");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const Logout = () => {
    console.log("Logout!");
  };
  const userCreation = () => {
    setCreatingUser(true);
  };
  const saveUser = (userinfo) => {
    console.log(userinfo);
    fetch("/api/newUser", {
      method: "POST",
      body: JSON.stringify(userinfo),
      headers: { "Content-Type": "application/json" },
    })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
    //make post request with api endpoint
  };
  // const searchEngineFunc = (details) => {
  //   console.log(details);
  //   fetch("/api/searchplayer", {
  //     method: "POST",
  //     body: JSON.stringify(details),
  //     headers: { "Content-Type": "application/json" },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       return setSearchResults(data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  // console.log(
  //   "search results",
  //   searchResults,
  //   "set search results",
  //   setSearchResults
  // );
  //add even listener to make request
  //we need to add a Log Out anonymous function
  return (
    <div className="App">
      <header className="App-header">
        {user.email != "" ? (
          <HomePage
            searchResults={searchResults}
            playerStatistics={playerStatistics}
            setSearchResults={setSearchResults}
            playerInfo={playerInfo}
            userInfo={user}
          />
        ) : (
          <div className="maincontainer">
            <div className="loginContainer">
              <LoginForm Login={Login} error={error} />
              <div className="buttonCreateuserContainer">
                <button
                  className="createuserbutton"
                  onClick={() => userCreation()}
                >
                  Create User
                </button>
              </div>
              {creatingUser !== null ? (
                <NewUserForm saveUser={saveUser} />
              ) : null}
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

render(<App />, document.getElementById("root"));
