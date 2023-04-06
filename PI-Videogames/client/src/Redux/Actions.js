import axios from 'axios'
import {GET_VIDEOGAMES, CLEAN_VIDEOGAMES, GET_VIDEOGAME_ID, 
        CLEAN_VIDEOGAME_ID, GET_GENRES, API_OR_DB, ALPHABETICAL_ORDER, ERROR } from "./Actions-Types.js";



export const getVideogames = () => {
    return async (dispatch) => {
        try {
            const response = await axios('/videogames');
            // console.log(response)
            dispatch({
                type: GET_VIDEOGAMES,
                payload: response.data
            })
        } catch (error) {
            dispatch({
                type: ERROR,
                payload: error
            })
        }
    }
}
export const cleanVideogames = () => {
    return {
        type: CLEAN_VIDEOGAMES
    }
}

//---------------------------------//-----------//---------------------------------//

export const getVideogameId = (id) => {
    return async (dispatch) => {
        try {
            let response = await axios(`/videogames/${id}`)
            dispatch({
                type: GET_VIDEOGAME_ID,
                payload: response.data
            })
        } catch (error) {
            dispatch({
                type: ERROR,
                payload: error
            })
        }
    }
}

        
export const cleanVideogameId = () => {
    return {
        type: CLEAN_VIDEOGAME_ID
    }
}


//---------------------------------//-----------//---------------------------------//


export const getGenres = () => {
    return async (dispatch) => {
        try {
            let response = await axios('/genres')
            dispatch({
                type: GET_GENRES,
                payload: response.data
            })
        } catch (error) {
            dispatch({
                type:ERROR,
                payload: error
            })
        }
    }
    
}


//---------------------------------//-----------//---------------------------------//

export const apiOrDb = (game) => {
    return {
        type: API_OR_DB,
        payload: game
    }
}


//---------------------------------//-----------//---------------------------------//

export const alphabeticalOrder = (order) => {
    return {
        type: ALPHABETICAL_ORDER,
        payload: order
    }
}