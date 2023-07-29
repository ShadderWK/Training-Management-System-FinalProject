import { Link } from "react-router-dom";

import { Box, Button, Typography } from "@mui/material";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useEffect } from "react";

function Role() {
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
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)), url(https://images.unsplash.com/photo-1500964757637-c85e8a162699?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=903&q=80)`,
        }}
      >
        <Typography
          className="animation"
          variant="h3"
          style={{ textTransform: "uppercase", color: "#fff" }}
        >
          เลือกบทบาทที่จะเข้าสู่ระบบ
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 5,
          }}
        >
          {/* Member */}
          <Link
            to="member"
            style={{
              textDecoration: "none",
            }}
          >
            <Button
              className="btn-user"
              variant="contained"
              startIcon={<AccountCircleIcon sx={{ color: "#fff" }} />}
              style={{
                color: "#fff",
                borderRadius: 20,
                backgroundColor: "#64ad6a",
                padding: "18px 70px",
                fontSize: "18px",
              }}
            >
              สมาชิก
            </Button>
          </Link>

          {/* Employee */}
          <Link
            to="employee"
            style={{
              textDecoration: "none",
            }}
          >
            <Button
              className="btn-user"
              variant="contained"
              startIcon={<AccountCircleIcon sx={{ color: "#fff" }} />}
              style={{
                color: "#fff",
                borderRadius: 20,
                backgroundColor: "#002147",
                padding: "18px 70px",
                fontSize: "18px",
              }}
            >
              พนักงาน
            </Button>
          </Link>
        </Box>

        {/* Admin */}
        <Link
          to="admin"
          style={{
            textDecoration: "none",
          }}
        >
          <Button
            className="btn-admin"
            variant="contained"
            startIcon={<AdminPanelSettingsIcon />}
            style={{
              color: "#fff",
              borderRadius: 20,
              backgroundColor: "#080808",
              padding: "18px 36px",
              fontSize: "18px",
            }}
          >
            ผู้ดูแล
          </Button>
        </Link>
      </Box>
    </div>
  );
}

export default Role;
