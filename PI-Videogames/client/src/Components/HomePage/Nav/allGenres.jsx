


const allGenres = ({genres}) => {

    return (
        <div>
            {
                genres.map((genre) => (
                    <option key={genre.id} value={genre.name}>{genre.name}</option>
                ))
            }
        </div>
    )
}

export default allGenres;