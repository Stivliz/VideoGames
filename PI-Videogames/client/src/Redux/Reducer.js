import {GET_VIDEOGAMES, CLEAN_VIDEOGAMES, GET_VIDEOGAME_ID, CLEAN_VIDEOGAME_ID, GET_GENRES} from "./Actions-Types";


const initialState = {
    allVideogames: [],
    videogame: {},
    genres: [],
}


const reducer = (state = initialState, action) => {

    switch (action.type) {

        case GET_VIDEOGAMES:
            return{
                ...state,
                allVideogames: action.payload
            }

        case CLEAN_VIDEOGAMES:
            return {
             ...state,
                allVideogames: []
            }
        
        case GET_VIDEOGAME_ID:
            return {
                ...state,
                videogame: action.payload
            }
            
        case CLEAN_VIDEOGAME_ID:
            return {
              ...state,
                videogame: {}
            }

        case GET_GENRES:
            return {
                ...state,
                genres: action.payload
            }
        
        default:
            return state;
    }
}

export default reducer;