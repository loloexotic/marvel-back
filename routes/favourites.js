const express = require("express");
const { findById } = require("../models/Card");
const Card = require("../models/Card");
const router = express.Router();

router.get("/favourites", async (res, req) => {
  // const favorite = await Card.findById(req.body.id)
  //  trouver et stocker l'id/le favoris dans la BDD
  // methode à utiliser ?
  // findById
  // if (){
  //     await favorite.save()
  // }
});

module.exports = router;
