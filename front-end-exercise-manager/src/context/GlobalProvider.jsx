import { useState } from "react";
import { GlobalContext } from "./GlobalContext";

const GlobalProvider = ({ children }) => {
    const url = import.meta.env.VITE_ENDPOINT_URL;

    const [exercises, setExercise] = useState([]);
    const [singleExercise, setSingleExercise] = useState();

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




    const value = {
        exercises,
        fetchExercises,
        singleExercise,
        fetchSingleExercise
    }

    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    )
}


export default GlobalProvider;