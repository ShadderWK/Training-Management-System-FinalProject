import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Stack,
} from "@mui/material";

import HomePageBg from "../image/HomePageBg.jpg";
import Navbar from "./Navbar";
import CardNews from "./CardNews";

import { GetNews } from "../service/HttpClientService";

import { NewsInterface } from "../interface/INews";

function HomePage() {
  const [news, setNews] = useState<NewsInterface[]>([]);

  const fetchNews = async () => {
    let res = await GetNews();
    res && setNews(res);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
          height: "100vh",
          overflow: "hidden",
          backgroundSize: "cover",
          color: "#f5f5f5",
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)), url(${HomePageBg})`,
        }}
      >
        <Box sx={{ my: 3 }}>
          <Typography
            variant="h4"
            style={{
              color: "#fff",
            }}
          >
            ข่าวสารประจำวัน
          </Typography>
        </Box>

        <Stack direction={"row"} gap={2}>
          {news.map((item) => {
            return (
              <Grid item xs={6} sm={4} md={4}>
                <CardNews
                  id={item.ID!}
                  title={item.Title!}
                  detail={item.Detail!}
                  adminId={item.AdminID!}
                  date_create={item.CreatedAt!.slice(0, 10)}
                />
              </Grid>
            );
          })}
        </Stack>
      </Box>
    </div>
  );
}

export default HomePage;
