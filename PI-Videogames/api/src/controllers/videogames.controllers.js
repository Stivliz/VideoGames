const axios = require('axios');
require('dotenv').config()
const { API_KEY } = process.env;
const { Videogame, Genre} = require('../db')
const getAllGames = require('../utils/getGames/allGames');


const getVideogame = async (req, res) => {
    try{

    const { name } = req.query;
    const allGames = await getAllGames()
    
    
        if(name){
            const gameName = allGames.filter((game) => {
                return game.name.toLowerCase().includes(name.toLowerCase()); // convierte ambas cadenas a minúsculas antes de compararlas, 
            });                                                              //osea, que compara el name que filtramos de allGames, con el name
                                                                             // que nos llega por query, pero antes, el name filtrado lo convierte a minusculas
                                                                             //e incluye al name que llega por query y lo convierte a minusculas tambien para compararlas
                                                                             //en minusculas. 

            gameName.length 
            ? res.status(200).json(gameName)
            : res.status(404).send('videogame not found 🚫')
        }else{
            res.status(200).json(allGames)
        }

    }catch(error){
        res.status(404).json({message: error})
    } 
}

const getIdVideogame = async (req, res) => {

    try{
        const { id } = req.params;

        //Si el id llegado por params, no es un UUID válido, se asume que es un id de la API y se realiza 
        //una solicitud/peticion a la API para obtener información del juego.
        if(!(id.match(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/))){

            const idGameApi = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
            const gameApi = idGameApi?.data
            const idVideogame = {
                name: gameApi.name,
                background_image: gameApi.background_image,
                description: gameApi.description_raw,
                genres: gameApi.genres?.map((e) => e.name),
                platforms: gameApi.platforms?.map((e) => e.platform.name).join(' | ').toString(),
                released: gameApi.released,
                rating: gameApi.rating,   
            }
            return res.status(200).json(idVideogame)
        
        }else {
            //Si es un UUID válido, se asume que es un id de la base de datos y se realiza una consulta a 
            // la base de datos para obtener la información del juego correspondiente.
            const gameBd = await Videogame.findByPk(id, {

                //Entonces le decimos que de la tabla videogame de la DB me traiga el id que sea similar al que 
                //llega por params.
                //y ademas que me incluya de la tabla Genre, su atributto name, y ademas que de la tabla
                //intermedia no me traiga ningun atributo.
                include: [
                    {
                        model: Genre,
                        attributes: ['name'], ///llamamos attributes a cada una de las columnas en las tablas de la DB.
                        through: {
                            attributes: []
                        }
                    }
                ]
            })

            if (!gameBd) {
                return res.status(404).json({ message: "The video game was not found in the database" });
            }
            
            return res.status(200).json(gameBd);
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}


const saveVideogameDb = async (req, res) => {
    try {
        const {  
            name,
            background_image,
            description,
            genres,
            platforms,
            released,
            rating } = req.body;
        
        // Si todos o alguno de los datos obligatorios, esta/n ausentes entonces enviamos una response con un 
        // mensaje indicando que falta informacion obligatoria.
        if(!name || !description || !released){
            res.status(404).send('Absence of mandatory data..')
        }
        // Si los datos obligatorios estan completos, entonces guardamos esa info en la Db.
        const saveDb = await Videogame.create({
            name,
            background_image,
            description,
            platforms,
            released,
            rating
         })

        console.log('saveDb:', saveDb) 
        //Buscamos en el modelo Genre, aquel genero/s, que coincida con el llegado por query, utilizando el 
        //where, para uscar en la columna name de el modelo Genre, algun genres que sea igual al llegado por query
        const findGenreDb = await Genre.findAll({
            where: {
                name: genres,
            },
        }) 
        //Dado el caso que coincida el genero llegado por query, con algun generoo filtrado desde la base de datos
        //lo que sucedera sera hacer la relacion en la tabla intermedia, entre el modelo Videogame con el modelo
        //Genre, utilizando el metodo addGenres(addGenres, es por genres que le pasamo por query).
        saveDb.addGenres(findGenreDb)
        res.status(201).json(saveDb)
    } catch (error) {
        res.status(404).json(error)
    }
}

/*
Sí, el código recibe los datos del videojuego a guardar a través del body y los almacena en la base de datos utilizando el modelo de Videogame.

Además, el código realiza una búsqueda en la base de datos utilizando el modelo Genre y la cláusula WHERE, para encontrar todos los registros que coincidan con el nombre de los géneros que se recibieron en el body (en la variable "genres").

Después de encontrar los géneros correspondientes en la base de datos, se realiza la relación de muchos a muchos utilizando el método "addGenres" en el objeto "saveDb" y pasándole como parámetro el resultado de la búsqueda anterior ("findGenreDb").

En resumen, el código guarda un nuevo registro de un videojuego en la base de datos y establece una relación de muchos a muchos con los géneros que se recibieron en el body.
*/

module.exports = {
    getVideogame,
    getIdVideogame,
    saveVideogameDb,
  
}


/*

1. Recibimos la petición POST con los datos del videogame a guardar en la base de datos.


const {  
  name,
  background_image,
  description,
  genres,
  platforms,
  released,
  rating 
} = req.body;

2. Validamos que los datos obligatorios estén presentes (name, description y released), si no están presentes 
devolvemos una respuesta 404 indicando la ausencia de datos obligatorios.

if(![name, description, released].every(Boolean)){
  res.status(404).send('Absence of mandatory data..')
}

3. Creamos una nueva instancia del modelo Videogame con los datos recibidos en la petición POST.

const saveDb = await Videogame.create({
  name,
  background_image,
  description,
  genres,
  platforms,
  released,
  rating
})

4.Buscamos en el modelo Genre aquellos géneros que coincidan con los recibidos en la petición POST, utilizando 
el operador where para buscar en la columna name de la tabla Genre aquellos géneros que coincidan con 
los recibidos en la petición POST.

const findGenreDb = await Genre.findAll({
  where: {
    name: genres,
  },
})

5. Si se encontraron coincidencias en la tabla Genre, se crean las relaciones en la tabla intermedia 
Videogame_Genre entre el nuevo videogame creado (saveDb) y los géneros encontrados (findGenreDb), 
utilizando el método addGenres().

saveDb.addGenres(findGenreDb)

6. Devolvemos una respuesta 201 (creado exitosamente) con el videogame creado en la base de datos.

res.status(201).json(saveDb)

7. Si se produce algún error en el proceso, devolvemos una respuesta 404 con el error.

catch (error) {
  res.status(404).json(error)
}


*/