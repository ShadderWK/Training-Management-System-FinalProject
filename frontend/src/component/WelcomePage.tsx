import { Link } from "react-router-dom";
import { useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import LoginIcon from "@mui/icons-material/Login";

import WelcomeBg from "../image/WelcomeBg.jpg";

function WelcomePage() {
  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 6,
          height: "100vh",
          width: "100vw",
          overflow: "hidden",
          backgroundSize: "cover",
          color: "#f5f5f5",
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)), url(${WelcomeBg})`,
        }}
      >
        <Typography
          className="animation"
          variant="h1"
          style={{ color: "#fff" }}
          fontFamily="Prompt Thai"
        >
          ยินดีต้อนรับสู่บริการการอบรม
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 5,
          }}
        >
          <Link
            to="Homepage"
            style={{
              textDecoration: "none",
            }}
          >
            <Button
              className="btn-signin"
              variant="contained"
              startIcon={<LoginIcon sx={{ color: "#333" }} />}
              style={{
                color: "#333",
                borderRadius: 20,
                backgroundColor: "#fff",
                padding: "18px 36px",
                fontSize: "25px",
              }}
            >
              เข้าสู่ระบบ
            </Button>
          </Link>
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: 5,
          }}
        >
          <Link
            to="register"
            style={{
              textDecoration: "none",
            }}
          >
            <Button
              className="btn-register"
              variant="contained"
              startIcon={<PersonAddAltIcon />}
              style={{
                color: "#fff",
                borderRadius: 20,
                backgroundColor: "#393a3c",
                padding: "15px 30px",
                fontSize: "15px",
              }}
            >
              สมัครสมาชิก
            </Button>
          </Link>
        </Box>
      </Box>
    </div>
  );
}

export default WelcomePage;
