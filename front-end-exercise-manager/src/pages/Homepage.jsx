import { useGlobalContext } from "../context/GlobalContext";
import { useEffect } from "react";
import ExerciseCard from "../components/ExerciseCard";
import "../style/banner.css";


export default function Homepage() {
    const { exercises, fetchExercises } = useGlobalContext();

    useEffect(() => {
        fetchExercises()
    }, []);

    return (
        <>
            <div className="banner-container">
                <div className="banner-overlay">
                    <div className="banner-content">
                        <div className="banner-description">
                            <h1>Cerca gli esercizi perfetti per te</h1>
                            <p>Scopri gli esercizi ideali per il tuo livello e obiettivi</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                {
                    exercises.length <= 0 ? (
                        <p>Nessun risultato trovato</p>
                    ) : (
                        exercises.map(e => {
                            return <ExerciseCard key={e.id} exerciseProp={e} />
                        })
                    )
                }
            </div>

        </>
    )
}