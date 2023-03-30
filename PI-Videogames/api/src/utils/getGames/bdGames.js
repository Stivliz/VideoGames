const {Videogame, Genre} = require('../../db');


const infoDb = async() => {

    const info = await Videogame.findAll({
        include: {
            model: Genre,
            Attribute: ['name'],
            through: {
                attributes: [],
            }
        }
    })
    return info;
}

module.exports = infoDb;