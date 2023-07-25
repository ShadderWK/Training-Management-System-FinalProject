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
                borderRadius: 20,
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
                borderRadius: 20,
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
                borderRadius: 20,
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
                borderRadius: 20,
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
        <Box position={"absolute"} right="0">
          <Button
            startIcon={<LogoutIcon sx={{ color: "#333" }} />}
            variant="contained"
            style={{
              color: "#333",
              borderRadius: 20,
              backgroundColor: "#fff",
              padding: "2px 15px",
              fontSize: "15px",
            }}
            href="/"
          >
            ออกจากระบบ
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;
