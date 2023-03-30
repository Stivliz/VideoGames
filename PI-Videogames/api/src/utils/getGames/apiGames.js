const axios = require('axios');
require('dotenv').config()
const { API_KEY } = process.env;



const infoApi = async () => {

    const games = []
    try{
        
        const response = await axios(`https://api.rawg.io/api/games?key=${API_KEY}`)
        response?.data.results.map((game) => {
            games.push({
                id: game.id,
                name: game.name,
                description: game.description,
                platforms: game.platforms.map((e) => e.platform.name).join(' | '),
                background_image: game.background_image,
                released: game.released,
                rating: game.rating,
                genres: game.genres.map((e) => e.name).join(' | '),
                })
            })
        
        return games;

    }catch(error){
        console.log(error);
    }
}

module.exports = infoApi;