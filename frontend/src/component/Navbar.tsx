import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Stack,
  Divider,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

function Navbar() {
  const Logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };
  return (
    <AppBar position="static">
      <Toolbar>
        <Stack
          direction="row"
          spacing={3}
          divider={<Divider orientation="vertical" flexItem />}
        >
          <Typography variant="h4" color="inherit" className="animation">
            บริการการอบรม
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 3,
            }}
          >
            <Button
              variant="contained"
              style={{
                color: "#333",
                borderRadius: 10,
                backgroundColor: "#fff",
                padding: "5px 15px",
                fontSize: "15px",
              }}
              href="/homepage"
            >
              หน้าแรก
            </Button>
            <Button
              variant="contained"
              style={{
                color: "#333",
                borderRadius: 10,
                backgroundColor: "#fff",
                padding: "2px 15px",
                fontSize: "15px",
              }}
              href="/course-reg"
            >
              สมัครคอร์สการอบรม
            </Button>
            <Button
              variant="contained"
              style={{
                color: "#333",
                borderRadius: 10,
                backgroundColor: "#fff",
                padding: "2px 15px",
                fontSize: "15px",
              }}
              href="/course"
            >
              ดูการอบรม
            </Button>
            <Button
              variant="contained"
              style={{
                color: "#333",
                borderRadius: 10,
                backgroundColor: "#fff",
                padding: "2px 15px",
                fontSize: "15px",
              }}
              href="/question"
            >
              สอบถาม
            </Button>
          </Box>
        </Stack>
        <Box position={"absolute"} right="0" sx={{ marginX: 3 }}>
          <Button
            startIcon={<LogoutIcon sx={{ color: "#fff" }} />}
            variant="contained"
            style={{
              color: "#fff",
              borderRadius: 10,
              backgroundColor: "#CD5C5C",
              padding: "2px 15px",
              fontSize: "15px",
            }}
            onClick={Logout}
          >
            ออกจากระบบ
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;
