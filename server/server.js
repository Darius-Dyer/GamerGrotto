const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const RAWG_KEY = process.env.RAWG_KEY;

app.get("api/games", async (req, res) => {
  const resp = await fetch(
    `https://api.rawg.io/api/games?key=${RAWG_KEY}&search=${req.query.s}`
  );
  const data = await resp.json();
  res.json(data);
});
