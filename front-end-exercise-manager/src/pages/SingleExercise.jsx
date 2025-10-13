import { useGlobalContext } from "../context/GlobalContext";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import SingleExerciseCard from "../components/SingleExerciseCard";

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
            <SingleExerciseCard key={singleExercise.exercise.id} singleExCard={singleExercise.exercise} />
        </>
    )
}