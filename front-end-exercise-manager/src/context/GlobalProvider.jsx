import { useState, useMemo, useEffect } from "react";
import { GlobalContext } from "./GlobalContext";

const daysOfWeek = ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica'];

const GlobalProvider = ({ children }) => {
    const url = import.meta.env.VITE_ENDPOINT_URL;

    const [exercises, setExercise] = useState([]);
    const [singleExercise, setSingleExercise] = useState();
    const [search, setSearch] = useState("");
    const [schedule, setSchedule] = useState({});

    useEffect(() => {
        const saved = localStorage.getItem("gymSchedule");
        if (saved) {
            setSchedule(JSON.parse(saved));
        } else {
            const initial = {};
            daysOfWeek.forEach(day => initial[day] = []);
            setSchedule(initial);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("gymSchedule", JSON.stringify(schedule));
    }, [schedule]);


    const addExerciseToSchedule = (day, exerciseName) => {
        setSchedule(prev => ({
            ...prev,
            [day]: [...(prev[day] || []), exerciseName]
        }));
    };


    const removeExerciseFromSchedule = (day, indexToRemove) => {
        setSchedule(prev => ({
            ...prev,
            [day]: prev[day].filter((_, idx) => idx !== indexToRemove)
        }));
    };

    async function fetchExercises() {
        try {
            const response = await fetch(`${url}/exercise`)
            if (!response.ok) {
                throw new Error('Errore nel server')
            }
            const data = await response.json();
            setExercise(data)
            return data
        } catch (error) {
            console.error(error)
            throw error
        }
    }


    async function fetchSingleExercise(id) {
        try {
            console.log('Fetching exercise with ID:', id);
            const cleanId = id.toString().startsWith(':') ? id.toString().slice(1) : id.toString();
            const response = await fetch(`${url}/exercise/${cleanId}`)
            if (!response.ok) {
                throw new Error('Errore nel server show' + response.status)
            }
            const data = await response.json();
            setSingleExercise(data)
            return data
        } catch (error) {
            console.error(error)
            throw error
        }
    }


    const searchExercise = useMemo(() => {
        if (!search.trim()) return exercises;

        return exercises.filter(exercise =>
            exercise.name.toLowerCase().includes(search.toLowerCase())
        );
    }, [search, exercises]);



    const value = {
        exercises,
        fetchExercises,
        singleExercise,
        fetchSingleExercise,
        search,
        setSearch,
        searchExercise,
        schedule,
        addExerciseToSchedule,
        removeExerciseFromSchedule,
        daysOfWeek
    }

    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    )
}


export default GlobalProvider;