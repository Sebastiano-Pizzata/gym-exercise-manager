import { useGlobalContext } from "../context/GlobalContext"

export default function GymCardTable() {
    const {
        schedule,
        daysOfWeek,
        searchExercise,
        addExerciseToSchedule,
        removeExerciseFromSchedule
    } = useGlobalContext();
    return (
        <>
            <div style={{ padding: "20px" }}>
                <h2>Gym Weekly Schedule</h2>

                {daysOfWeek.map(day => (
                    <div key={day} style={{ marginBottom: "20px", border: '1px solid #ccc', padding: '10px' }}>
                        <h3>{day}</h3>

                        <select onChange={(e) => {
                            if (e.target.value) {
                                addExerciseToSchedule(day, e.target.value);
                                e.target.value = "";
                            }
                        }}>
                            <option value="">Seleziona esercizio</option>
                            {searchExercise.map(ex => (
                                <option key={ex.id} value={ex.name}>{ex.name}</option>
                            ))}
                        </select>

                        <ul>
                            {(schedule[day] || []).map((exercise, index) => (
                                <li key={index}>
                                    {exercise}
                                    <button onClick={() => removeExerciseFromSchedule(day, index)} style={{ marginLeft: '10px' }}>
                                        Rimuovi
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </>
    )
}