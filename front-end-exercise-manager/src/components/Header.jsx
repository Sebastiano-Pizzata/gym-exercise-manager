import "../style/header.css";
import Search from "./Search";
import { Link } from "react-router-dom";
import ExerciseList from "./ExerciseList";

function Header() {
    return (
        <header>
            <div className="header-container">
                <Link className="home-link" to={'/'}>
                    <h2>Gym Exercise</h2>
                </Link>


                <div className="search-wrapper">
                    <Search />
                    <ExerciseList />
                </div>
            </div>
        </header>
    );
}

export default Header;
