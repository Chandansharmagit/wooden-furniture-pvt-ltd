// src/components/Profileuser.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const Profileuser = () => {
  const [user, setUser] = useState({});

  const getuser = async () => {
    try {
      const response = await axios.get(`/googlelogin`, { withCredentials: true });
      console.log("response user", response.data);
      setUser(response.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getuser();
  }, []);

  const handleLogout = () => {
    window.open(`${apiBaseUrl}/logout`, "_self");
  };

  return (
    <div>
      {user && (
        <>
          <h1>Hello, {user.displayName}</h1>
          <p>Email: {user.email}</p>
          <img src={user.image} alt="Profile" />
        </>
      )}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profileuser;
