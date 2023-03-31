import settings from "../assets/settings.png";
import john from "../assets/john.png";
import "./Profile.css";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const handleClick = (event) => {
    navigate("/settings");
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          p: 1,
          m: 1,
          bgcolor: "background.paper",
          width: "auto",
          borderRadius: 1,
        }}
      >
        <div className="settings">
          <img src={settings} alt={settings} onClick={handleClick} />
        </div>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          p: 1,
          m: 1,
          bgcolor: "background.paper",
          borderRadius: 1,
        }}
      >
        <img src={john} />
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          p: 1,
          m: 1,
          bgcolor: "background.paper",
          borderRadius: 1,
        }}
      >
        <div className="name"> John </div>
      </Box>
    </>
  );
}

export default Profile;
