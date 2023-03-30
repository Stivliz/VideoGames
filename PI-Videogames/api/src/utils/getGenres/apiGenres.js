const axios = require('axios');
const { Genre } = require('../../db')

const apiGenres = async () => {

    const response = await axios(`https://api.rawg.io/api/genres?key=e3815659c22e4b46a3a8372896f333e4`)
    const genreNames = response?.data.results.map((genre) => genre.name);


    for (const name of genreNames) {
      await Genre.findOrCreate({ where: { name } });
    }

    const genresDb = await Genre.findAll()
    return genresDb;

}

module.exports = apiGenres;