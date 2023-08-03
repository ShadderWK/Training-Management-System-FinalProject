import React from "react";
import {
  Box,
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import { id } from "date-fns/locale";

type Props = {
  id: number;
  title: string;
  detail: string;
  adminId: number;
  date_create: string;
};

function CardNews({ id, title, detail, date_create }: Props) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {date_create}
        </Typography>
        <Typography variant="body2">{detail}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small">เพิ่มเติม</Button>
      </CardActions>
    </Card>
  );
}

export default CardNews;
