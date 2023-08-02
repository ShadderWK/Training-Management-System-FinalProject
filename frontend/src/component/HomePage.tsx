import React, { useEffect, useState } from "react";
import { Box, Button, Typography, Grid, Paper } from "@mui/material";

import HomePageBg from "../image/HomePageBg.jpg";
import Navbar from "./Navbar";

function HomePage() {
  return (
    <div>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 6,
          height: "100vh",
          overflow: "hidden",
          backgroundSize: "cover",
          color: "#f5f5f5",
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)), url(${HomePageBg})`,
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Box marginX={80} marginY={2}>
                <Paper
                  sx={{
                    height: "10vh",
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                  }}
                >
                  <Typography variant="h6" style={{ color: "#000" }}>
                    ข่าวสารประจำวัน
                  </Typography>
                </Paper>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box marginX={2}>
                <Paper>
                  <h1>หน้าแรก</h1>
                </Paper>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box marginX={2}>
                <Paper>
                  <h1>หน้าแรก</h1>
                </Paper>
              </Box>
            </Grid>
            <Grid item xs={8}>
              <Box marginX={2}>
                <Paper>
                  <h1>หน้าแรก</h1>
                </Paper>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  );
}

export default HomePage;
