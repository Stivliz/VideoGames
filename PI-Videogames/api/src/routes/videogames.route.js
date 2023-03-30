const { Router } = require('express');
const { getVideogame, getIdVideogame, saveVideogameDb } = require('../controllers/videogames.controllers');
const router = Router();

router.get('/videogames', getVideogame);
router.get('/videogames/:id', getIdVideogame);
router.post('/videogames', saveVideogameDb);

module.exports = router;