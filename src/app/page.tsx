'use client'

import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {useFirstStore} from "../../stores/first";
import Button from "@mui/material/Button";

export default function Home() {
  const {count, increasePopulation, decreasePopulation} = useFirstStore();
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h3" component="h1" sx={{mb: 2}}>
          {count}
        </Typography>

        <Button variant="contained" onClick={increasePopulation}>Increase</Button>
        <Button variant="contained" onClick={decreasePopulation}>Decrease</Button>
      </Box>
    </Container>
  );
}
