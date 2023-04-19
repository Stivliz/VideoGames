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

    return game;
}

module.exports = infoDb;