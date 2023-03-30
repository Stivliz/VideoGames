const apiGenres = require("../utils/getGenres/apiGenres")

const getGenres = async (req, res) => {
    try {
        
        const genresDb = await apiGenres()

        if(!genresDb){
            res.status(404).send('genres not found 🚫')
        }

        res.status(200).json(genresDb)

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = { getGenres }