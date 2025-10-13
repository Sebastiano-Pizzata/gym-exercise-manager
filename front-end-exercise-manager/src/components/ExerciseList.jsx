import { useGlobalContext } from "../context/GlobalContext";
import { Link } from "react-router-dom";

export default function ExerciseList() {
    const { search, searchExercise } = useGlobalContext();

    if (!search.trim()) return null;

    return (
        <div className="exercise-list">
            <p style={{ padding: '10px', color: '#999' }}>
                {searchExercise.length} risultati trovati
            </p>
            {searchExercise.map(ex => (
                <div key={ex.id} className="exercise-item">
                    <Link className="link-ex" to={`/exercise/:${ex.id}`}>
                        <h3>{ex.name}</h3>
                    </Link>
                </div>
            ))}
        </div>
    );
}
