import React from "react";
import { useEffect,useState } from "react";
import "./profile.css";
import axios from "axios";
import Footer from "../component/footers/footer";
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const Profile = () => {
    const [user, setUser] = useState({});
    const [islogin, setislogin] = useState(false);
    const getuser = async () => {
        try {
          const response = await axios.get(`${apiBaseUrl}/googlelogin`, {
            withCredentials: true,
          });
          console.log("response user", response.data);
          setUser(response.data.user);
          if (response.status === 200) {
            setislogin(true);
          } else {
            setislogin(false);
          }
        } catch (error) {
          console.log(error);
        }
      };
    
      useEffect(() => {
        getuser();
      }, []);

      const handleCall = () => {};
  return (
    <div>
      <div className="call-button-profile" onClick={handleCall}>
        <div className="icons-pregination">
          <div className="icons-items">
            {islogin ? (
              <div className="profile">
                <img src={user.image} className="image--cover--profile"></img>
              </div>
            ) : (
              <div className="profile">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50"
                  height="50"
                  id="phone-profile"
                  fill="currentColor"
                  class="bi bi-person-circle"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                  <path
                    fill-rule="evenodd"
                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                  />
                </svg>
                
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Profile;
