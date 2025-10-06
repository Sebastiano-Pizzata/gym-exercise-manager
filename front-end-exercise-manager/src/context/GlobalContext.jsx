import { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
    const url = import.meta.env.VITE_ENDPOINT_URL;

    const [exercises, setExercise] = useState([]);

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
            throw new error
        }
    }

    const value = {
        exercises,
        fetchExercises
    }

    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    )
}

const useGlobalContext = () => useContext(GlobalContext);

export {
    GlobalProvider,
    useGlobalContext
}