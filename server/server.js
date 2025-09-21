const express = require("express");
const cors = require("cors");

require("dotenv").config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const RAWG_KEY = process.env.RAWG_KEY;

//Endpoint to search for games
app.get("/api/games/search", async (req, res) => {
  const resp = await fetch(
    `https://api.rawg.io/api/games?search=${req.query.search}&search_exact=true&key=${RAWG_KEY}`
  );
  // Handle 404 and other errors
  if (resp.status === 404) {
    console.log("404 Error");

    return res.status(404).json({ error: "Games not found." });
  } else if (!resp.ok) {
    console.log("Other Error");

    return res.status(resp.status).json({ error: "Failed to fetch games." });
  }

  // If the response is successful, parse and return the data.
  const data = await resp.json();

  //Filter to make sure the games could pass as actually legitimate.
  const filter = data.results.filter(
    (game) =>
      game.name &&
      !game.name.toLowerCase().includes("undefined") && // remove ".undefined"
      game.background_image && // must have image
      game.rating > 0 && // must have rating
      game.ratings_count > 0
  );
  res.json(filter);
});

//Endpoint to get game details by ID
app.get("/api/games/details", async (req, res) => {
  const resp = await fetch(
    `https://api.rawg.io/api/games/${req.query.id}?key=${RAWG_KEY}`
  );
  const data = await resp.json();
  console.log(
    data.achievements_count,
    data.background_image,
    data.background_image
  );

  res.json(data);
});

//Endpoint to get game screenshots by game ID
app.get("/api/games/screenshots", async (req, res) => {
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
app.get("/api/games/achievements", async (req, res) => {
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

  const filteredInfo = data.results.map((ach) => ({
    name: ach.name,
    description: ach.description,
  }));
  console.log(filteredInfo);

  res.json(filteredInfo);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
