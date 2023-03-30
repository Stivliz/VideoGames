const axios = require('axios');
const {API_KEY} = process.env;



const infoApi = async () => {

    const games = []
    try{
        
        const response = await axios(`https://api.rawg.io/api/games?key=e3815659c22e4b46a3a8372896f333e4`)
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