import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getGenres, apiOrDb, alphabeticalOrder } from '../../../Redux/Actions';
// import allGenres from './allGenres';
import styles from './Nav.module.css'


const Nav = ({setCurrentPage, setOrder}) => {

    const dispatch = useDispatch();
    const genres = useSelector((state) => state.genres)

    useEffect(() => {
        dispatch(getGenres())
    }, [dispatch])


    const hanlderFilterGenres = (event) => {
        event.preventDefault()
        dispatch(apiOrDb(event))
    }

    const hanlderApiOrDb = (event) => {
        event.preventDefault()
        dispatch(apiOrDb(event.target.value))
        setCurrentPage(1)
    }

    const handlerAlphabeticOrder = (event) => {
        
        dispatch(alphabeticalOrder(event.target.value))
        setOrder(event.target.value)
        setCurrentPage(1)
    }

    return(
        <div className={styles.containerNav}>


            <select onChange={hanlderApiOrDb}>
                <option value='allVideogames'>ALL VIDEOGAMES</option>
                <option value='API'>API</option>
                <option valu='DB'>DB</option>
            </select>

            <select onChange={handlerAlphabeticOrder}>
                <option value='alphabetic'>ALPHABETIC</option>
                <option value='A-Z'>A-Z</option>
                <option value='Z-A'>Z-A</option>
            </select>

            <select onChange={hanlderFilterGenres}>
                <option value='Genres'> ALL VIDEOGAMES </option>   
                <allGenres genres={genres}/>         
            </select>
            
        </div>
    )
}

export default Nav;