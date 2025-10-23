import "../style/header.css";
import Search from "./Search";
import { Link } from "react-router-dom";
import ExerciseList from "./ExerciseList";
import { useGlobalContext } from "../context/GlobalContext";

function Header() {
    const { schedule } = useGlobalContext();
    const totalExercises = Object.values(schedule).reduce((total, exercises) => total + exercises.length, 0);
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

                <div className="gym-card-btn">
                    <Link to={'/exercise/gym-card'}>
                        <button className="gym-btn">
                            {totalExercises > 0 ? "Modifica la tua Scheda" : "Crea la tua Scheda"}
                        </button>
                    </Link>
                </div>
            </div>
        </header>
    );
}

export default Header;
