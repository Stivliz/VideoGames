const { Router } = require('express');
const { getVideogame, getIdVideogame, saveVideogameDb, modifyGame } = require('../controllers/videogames.controllers');
const router = Router();

router.get('/videogames', getVideogame);
router.get('/videogames/:id', getIdVideogame);
router.post('/videogames', saveVideogameDb);
router.put('/videogames/:id', modifyGame);

module.exports = router;