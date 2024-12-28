import React, { useState } from "react";
import axios from "axios";
import UserInfo from "./UserProfile";

function UserLogin() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [userDetails, setUserDetails] = useState(null);

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3000/studio/login", {
        userName,
        password,
      });
      console.log(response.data);

      // If login is successful
      alert("Login successful!");
      setUserDetails(response.data); // Set user details after login
      console.log("Response Data:", response.data);

      setErrorMessage(""); // Clear any error messages
    } catch (error) {
      // If login fails
      alert("Login failed. Please check your username and password.");
      setErrorMessage("Invalid username or password.");
      setUserDetails(null);
    }
  };

  if (userDetails) {
    // Display user details after successful login
    return (
      <div className="user-details">
        <h2>Welcome, {userName}!</h2>
        {<UserInfo userInfo={userDetails} />}
      </div>
    );
  }

  return (
    <div className="input-container">
      <div>
        <label>
          Username:
          <input
            type="text"
            placeholder="Enter your username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="input"
          />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
          />
        </label>
      </div>
      <button className="input-button" onClick={handleLogin}>
        Login
      </button>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default UserLogin;
