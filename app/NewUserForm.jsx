import React, { useState } from "react";

function NewUserForm({ saveUser }) {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
    favorite_player: "",
    favorite_team: "",
  });
  const submitHandler = (info) => {
    //  info.preventDefault();
    saveUser(userDetails);
  };

  return (
    <div className="newusercontainer">
      <form onSubmit={submitHandler}>
        <div>
          <div>Welcome to the Club!</div>
          <div className="sectionNewUserForm ">
            <label className="form-group">Enter Name : </label>
            <input
              type="text"
              name="name"
              id="newName"
              onChange={(event) =>
                setUserDetails({ ...userDetails, name: event.target.value })
              }
              value={userDetails.name}
              required
            />
          </div>
          <div className="sectionNewUserForm ">
            <label className="form-group">Enter Email : </label>
            <input
              type="text"
              name="email"
              id="newEmail"
              onChange={(event) =>
                setUserDetails({ ...userDetails, email: event.target.value })
              }
              value={userDetails.email}
              required
            />
          </div>
          <div className="sectionNewUserForm ">
            <label className="form-group">Enter Password : </label>
            <input
              type="password"
              name="password"
              id="newPassword"
              onChange={(event) =>
                setUserDetails({ ...userDetails, password: event.target.value })
              }
              value={userDetails.password}
              required
            />
          </div>
          <div className="sectionNewUserForm ">
            <label className="form-group">Enter Favorite NBA Player : </label>
            <input
              type="text"
              name="favorite-player"
              id="favoritePlayer"
              onChange={(event) =>
                setUserDetails({
                  ...userDetails,
                  favorite_player: event.target.value,
                })
              }
              value={userDetails.favorite_player}
              required
            />
            <p>*Must be in the League </p>
          </div>
          <div className="sectionNewUserForm ">
            <label className="form-group">Enter Favorite Team : </label>
            <input
              type="text"
              name="favorite_team"
              id="favoriteTeam"
              onChange={(event) =>
                setUserDetails({
                  ...userDetails,
                  favorite_team: event.target.value,
                })
              }
              value={userDetails.favorite_team}
              required
            />
          </div>
          <div className="createusercontainer">
            <input
              className="createuserbutton"
              type="submit"
              value="Create Account"
            ></input>
          </div>
        </div>
      </form>
    </div>
  );
}

export default NewUserForm;
