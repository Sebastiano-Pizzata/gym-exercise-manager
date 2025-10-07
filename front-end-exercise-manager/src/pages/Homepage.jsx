import { useGlobalContext } from "../context/GlobalContext";
import { useEffect } from "react";


export default function Homepage() {
    const { exercises, fetchExercises } = useGlobalContext();

    useEffect(() => {
        fetchExercises()
    }, []);

    return (
        <>
            <div>
                Cerca gli esercizi perfetti per te
            </div>
            <div>
                <ul>
                    {
                        exercises.length <= 0 ? (
                            <p>Nessun risultato trovato</p>
                        ) : (
                            exercises.map(e => {
                                return <li key={e.id}>{e.name}</li>
                            })
                        )
                    }
                </ul>
            </div>

        </>
    )
}