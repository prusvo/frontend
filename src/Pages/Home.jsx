import './search.css'
import Header from '../components/Header'
import Recipes from '../components/Recipes'
import {Link} from 'react-router-dom'
import { FaSearch } from "react-icons/fa"

const Search = () => {
    return (
        <div>
            <Header/>
            <div className="search__button">
                <Link to="/search"><FaSearch /></Link>
            </div>
            <Recipes/>

        </div>
    )
}
export default Search