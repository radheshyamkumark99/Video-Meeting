import React, { useContext, useState } from "react";
import withAuth from "../utils/withAuth";
import { useNavigate } from "react-router-dom";
import "../App.css";

import { Button, IconButton, TextField } from "@mui/material";
import RestoreIcon from "@mui/icons-material/Restore";

import { AuthContext } from "../contexts/AuthContext";

function HomeComponent() {
  const navigate = useNavigate();

  const [meetingCode, setMeetingCode] = useState("");

  const { addToUserHistory } = useContext(AuthContext);

  const handleJoinVideoCall = async () => {
    if (!meetingCode.trim()) return;

    await addToUserHistory(meetingCode);
    navigate(`/${meetingCode}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth");
  };

  return (
    <div className="homePage">

      {/* Navbar */}
      <nav className="navBar">

        <div className="brandSection">
          <h2 style={{marginLeft:"0"}}>Video Meeting</h2>
        </div>

        <div className="navActions">

          <div
            className="historyBtn"
            onClick={() => navigate("/history")}
          >
            <IconButton>
              <RestoreIcon />
            </IconButton>

            <span>History</span>
          </div>

          <Button onClick={handleLogout}>
            Logout
          </Button>

        </div>

      </nav>


      {/* Hero Section */}
      <section className="meetContainer">

        {/* Left */}
        <div className="leftPanel">

          <div className="contentWrapper">

            <h1>
              Providing Quality Video Call Just Like
              Quality Education
            </h1>

            <div className="joinMeetingBox">

              <TextField
                fullWidth
                label="Meeting Code"
                variant="outlined"
                value={meetingCode}
                onChange={(e) =>
                  setMeetingCode(e.target.value)
                }
              />

              <Button
                variant="contained"
                onClick={handleJoinVideoCall}
              >
                Join
              </Button>

            </div>

          </div>

        </div>


        {/* Right */}
        <div className="rightPanel">

          <img
            src="/logo3.png"
            alt="video meeting"
          />

        </div>

      </section>

    </div>
  );
}

export default withAuth(HomeComponent);