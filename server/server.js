const express = require("express");
const cors = require("cors");
const e = require("express");
require("dotenv").config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const RAWG_KEY = process.env.RAWG_KEY;

//Endpoint to search for games
app.get("api/games/search", async (req, res) => {
  const resp = await fetch(
    `https://api.rawg.io/api/games?key=${RAWG_KEY}&search=${req.query.s}`
  );
  // Handle 404 and other errors
  if (resp.status === 404) {
    return res.status(404).json({ error: "Games not found." });
  } else if (!resp.ok) {
    return res.status(resp.status).json({ error: "Failed to fetch games." });
  }

  // If the response is successful, parse and return the data
  const data = await resp.json();
  res.json(data);
});

//Endpoint to get game details by ID
app.get("api/games/details", async (req, res) => {
  const resp = await fetch(
    `https://api.rawg.io/api/games/${req.query.id}?key=${RAWG_KEY}`
  );
  const data = await resp.json();
  res.json(data);
});

//Endpoint to get game screenshots by game ID
app.get("api/games/screenshots", async (req, res) => {
  const resp = await fetch(
    `https://api.rawg.io/api/games/${req.query.game_pk}/screenshots?key=${RAWG_KEY}`
  );

  // Handle 404 and other errors
  if (resp.status === 404) {
    return res
      .status(404)
      .json({ error: "Screenshots not found for this game." });
  } else if (!resp.ok) {
    return res
      .status(resp.status)
      .json({ error: "Failed to fetch screenshots." });
  }

  // If the response is successful, parse and return the data
  const data = await resp.json();
  res.json(data);
});

//Endpoint to get game achievements by game ID
app.get("api/games/achievements", async (req, res, next) => {
  const resp = await fetch(
    `https://api.rawg.io/api/games/${req.query.id}/achievements?key=${RAWG_KEY}`
  );

  // Handle 404 and other errors
  if (resp.status === 404) {
    return res
      .status(404)
      .json({ error: "Achievements not found for this game." });
  } else if (resp.status !== 200) {
    return res
      .status(resp.status)
      .json({ error: "Failed to fetch achievements." });
  } else if (!resp.ok) {
    return res
      .status(resp.status)
      .json({ error: "Failed to fetch achievements." });
  }

  // If the response is successful, parse and return the data
  const data = await resp.json();
  res.json(data);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
