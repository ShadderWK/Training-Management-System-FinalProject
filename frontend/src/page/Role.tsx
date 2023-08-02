import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Button, Typography, Grid, Paper, Avatar } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import FaceIcon from "@mui/icons-material/Face";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

import RolePageBg from "../image/RolePageBg.jpg";

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
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)), url(${RolePageBg})`,
        }}
      >
        <Grid
          item
          xs={10}
          component={Paper}
          elevation={6}
          square
          sx={{
            borderRadius: 10,
          }}
        >
          <Box
            sx={{
              my: 5,
              mx: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              alignSelf: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <FaceIcon />
            </Avatar>
            <Typography
              variant="h5"
              style={{
                textTransform: "uppercase",
                color: "#000",
                fontFamily: "Kanit, sans-serif",
              }}
            >
              เลือกบทบาทที่จะเข้าสู่ระบบ
            </Typography>
            <Box
              sx={{
                my: 4,
                display: "flex",
                gap: 5,
              }}
            >
              {/* ปุ่มสมาชิก */}
              <Link
                to="/member"
                style={{
                  textDecoration: "none",
                }}
              >
                <Button
                  className="btn-member"
                  variant="contained"
                  startIcon={<PersonIcon sx={{ color: "#fff" }} />}
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

              {/* ปุ่มพนักงาน */}
              <Link
                to="/employee"
                style={{
                  textDecoration: "none",
                }}
              >
                <Button
                  className="btn-employee"
                  variant="contained"
                  startIcon={<ManageAccountsIcon sx={{ color: "#fff" }} />}
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

            {/* ปุ่มถอยกลับ */}
            <Box>
              <Link
                to="/"
                style={{
                  textDecoration: "none",
                }}
              >
                <Button
                  variant="contained"
                  style={{
                    color: "#fff",
                    borderRadius: 20,
                    backgroundColor: "#C0C0C0",
                    padding: "10px 40px",
                    fontSize: "18px",
                  }}
                >
                  ถอยกลับ
                </Button>
              </Link>
            </Box>
          </Box>
        </Grid>
      </Box>
    </div>
  );
}

export default Role;
