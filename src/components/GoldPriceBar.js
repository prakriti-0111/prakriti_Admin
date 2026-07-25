import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, CircularProgress, Typography } from "@mui/material";

const GOLD_API = "https://api.gold-api.com/price/XAU/INR";
const TROY_OUNCE_IN_GRAM = 31.1034768;
// gold-api.com blocks IPs that spam it and asks for a 30s cache — poll once a minute.
const POLL_MS = 60 * 1000;

/**
 * Live 24K gold rate shown in the top header.
 */
const GoldPriceBar = () => {
  const [price, setPrice] = useState(null);

  useEffect(() => {
    let active = true;
    const load = () =>
      axios
        .get(GOLD_API)
        .then((res) => active && res.data && res.data.price > 0 && setPrice(res.data))
        .catch(() => {});
    load();
    const timer = setInterval(load, POLL_MS);
    return () => {
      active = false;
      clearInterval(timer);
    };
  }, []);

  const perGram = price ? price.price / TROY_OUNCE_IN_GRAM : 0;

  return (
    <Box
      title={price ? `Updated ${new Date(price.updatedAt).toLocaleTimeString("en-IN")}` : ""}
      sx={{
        display: { xs: "none", sm: "flex" },
        flexDirection: "column",
        justifyContent: "center",
        px: 2,
        mr: 1,
        borderRadius: "12px",
        background: "rgba(255, 255, 255, 0.12)",
        color: "#fff",
        minWidth: 150,
        height: 44,
      }}
    >
      <Typography component="span" sx={{ fontSize: 11, lineHeight: 1.2, opacity: 0.8 }}>
        Gold 24K
      </Typography>
      <Typography component="span" sx={{ fontSize: 15, lineHeight: 1.2, fontWeight: 600 }}>
        {price ? (
          `${price.currencySymbol} ${perGram.toLocaleString("en-IN", {
            maximumFractionDigits: 2,
          })} / g`
        ) : (
          <CircularProgress size="14px" color="inherit" />
        )}
      </Typography>
    </Box>
  );
};

export default GoldPriceBar;
