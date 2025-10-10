import { useGlobalContext } from "../context/GlobalContext";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

export default function SingleExercise() {
    const { id } = useParams();
    const { singleExercise, fetchSingleExercise } = useGlobalContext();


    useEffect(() => {
        fetchSingleExercise(id);
    }, [id]);


    if (!singleExercise) {
        return <p>Caricamento in corso...</p>
    }

    return (
        <>
            <div>
                <h1>{singleExercise.exercise.name}</h1>
                <div>
                    <img src={singleExercise.exercise.image} alt={singleExercise.exercise.name} />
                </div>
            </div>

        </>
    )
}