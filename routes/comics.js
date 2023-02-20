const express = require("express");
const router = express.Router();
const axios = require("axios");

const isAuthenticated = require("../middleware/isAuthenticated");

require("dotenv").config();

router.get("/comics", isAuthenticated, async (req, res) => {
  try {
    const comicResponse = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.MARVEL_API_KEY}`
    );
    console.log(comicResponse.data);
    res.json(comicResponse.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/comics/:characterId", async (req, res) => {
  try {
    const comicId = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${id}?apiKey=${process.env.MARVEL_API_KEY}

        `
    );
    console.log(req.params.id);
    res.json(req.params.id);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
