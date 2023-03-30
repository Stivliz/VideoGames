const { Router } = require('express');
const videogames = require('./videogames.route');
const genres = require('./genres.route');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use(videogames);
router.use(genres);


module.exports = router;
