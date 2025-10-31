import { useState, useMemo, useEffect } from "react";
import { GlobalContext } from "./GlobalContext";

const daysOfWeek = ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica'];

const GlobalProvider = ({ children }) => {
    const url = import.meta.env.VITE_ENDPOINT_URL;

    const [exercises, setExercise] = useState([]);
    const [singleExercise, setSingleExercise] = useState();
    const [search, setSearch] = useState("");

    const [related, setRelated] = useState([]);
    const [sortBy, setSortBy] = useState("");
    const [sortOrder, setSortOrder] = useState(1);
    const [category, setCategory] = useState("");

    const [schedule, setSchedule] = useState(() => {
        const saved = localStorage.getItem("gymSchedule");
        if (saved) return JSON.parse(saved);

        const initial = {};
        daysOfWeek.forEach(day => initial[day] = []);
        return initial;
    })


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


    async function handleRelated(id) {
        try {
            if (!singleExercise?.exercise?.category_id) return;

            const categoryId = singleExercise.exercise.category_id;
            const currentId = Number(id.toString().replace(/^:/, '').trim());

            if (!categoryId || isNaN(currentId)) {
                console.warn("Parametri non validi per related:", { categoryId, currentId });
                setRelated([]);
                return;
            }

            const response = await fetch(`${url}/exercise/related?categoryId=${categoryId}&id=${currentId}`);
            if (!response.ok) throw new Error("Errore server " + response.status);

            let data = await response.json();

            const filtered = data.filter(ex => Number(ex.id) !== currentId);
            console.log("Related exercises filtrati:", filtered);
            setRelated(filtered);

            return filtered;
        } catch (error) {
            console.error("Errore in handleRelated:", error);
            setRelated([]);
        }
    }






    const searchExercise = useMemo(() => {
        if (!search.trim()) return exercises;

        return exercises.filter(exercise =>
            exercise.name.toLowerCase().includes(search.toLowerCase())
        );
    }, [search, exercises]);


    const handleSort = (value) => {
        if (value === 'title_asc') {
            setSortBy('title');
            setSortOrder(1);
        } else if (value === 'title_desc') {
            setSortBy('title')
            setSortOrder(-1)
        } else {
            setSortBy('')
            setSortOrder(0)
        }
    }


    const sortAndFilteredEx = useMemo(() => {
        let filtered = [...exercises];
        if (category) filtered = filtered.filter(ex => ex.category_id === category);
        if (sortBy === 'title') filtered.sort((a, b) => a.name.localeCompare(b.name) * sortOrder)
        return filtered
    }, [exercises, category, sortBy, sortOrder])



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
        daysOfWeek,
        related,
        handleRelated,
        handleSort,
        sortAndFilteredEx,
        category,
        setCategory,
        sortOrder,
        setSortOrder
    }

    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    )
}


export default GlobalProvider;