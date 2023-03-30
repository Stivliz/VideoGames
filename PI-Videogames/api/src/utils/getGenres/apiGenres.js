const axios = require('axios');
const { Genre } = require('../../db')
require('dotenv').config()
const { API_KEY } = process.env;

const apiGenres = async () => {

    const response = await axios(`https://api.rawg.io/api/genres?key=${API_KEY}`)
    const genreNames = response?.data.results.map((genre) => genre.name);


    for (const name of genreNames) {
      await Genre.findOrCreate({ where: { name } });
    }

    const genresDb = await Genre.findAll()
    return genresDb;

}

module.exports = apiGenres;