const {Videogame, Genre} = require('../../db');


const infoDb = async() => {
 
    const game = await Videogame.findAll({
        include: {
            model: Genre,
            Attribute: ["name"],
            through: {
                attributes: [],
            }
        }
    })

        // const response = {
        //     "id": game.id,
        //     "name": game.name,
        //     "background_image": game.background_image,
        //     "description": game.description,
        //     "genres": game.genres.map(genre => genre.name).join(' | '),
        //     "platforms": game.platforms.map((e) => e.platform.name).join(' | '),
        //     "released": game.released,
        //     "rating": game.rating
           
        // }
    return game;
}

module.exports = infoDb;