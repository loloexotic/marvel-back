const express = require("express");
const router = express.Router();
const axios = require("axios");

const isAuthenticated = require("../middleware/isAuthenticated");

router.get(
  "/characters",
  isAuthenticated,

  async (req, res) => {
    try {
      const name = req.query.name || "";
      const limit = req.query.limit || "";
      const skip = req.query.skip || 0;
      const response = await axios.get(
        `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.MARVEL_API_KEY}&name=${name}&skip=${skip}&limit=${limit}`
      );
      console.log(response.data);
      res.json(response.data);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

router.get("/character/:characterId", async (req, res) => {
  try {
    const characterId = req.params.id;

    const resCardid = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/character/${id}?apiKey=${process.env.MARVEL_API_KEY}`
    );

    resCardid = await findById(req.params.id).populate({
      results: "",
    });

    console.log(req.params.id);
    res.send(characterId);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
