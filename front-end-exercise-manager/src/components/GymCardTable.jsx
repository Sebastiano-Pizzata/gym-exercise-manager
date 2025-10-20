import { useGlobalContext } from "../context/GlobalContext"

export default function GymCardTable() {
    const {
        schedule,
        daysOfWeek,
        removeExerciseFromSchedule
    } = useGlobalContext();

    return (
        <div style={{ padding: "20px" }}>
            <h2>Gym Weekly Schedule</h2>

            {daysOfWeek.map(day => (
                <div
                    key={day}
                    style={{
                        marginBottom: "20px",
                        border: '1px solid #ccc',
                        padding: '10px',
                        borderRadius: '6px'
                    }}
                >
                    <h3>{day}</h3>

                    {(schedule[day] && schedule[day].length > 0) ? (
                        <ul>
                            {schedule[day].map((exercise, index) => (
                                <li key={index}>
                                    {exercise}
                                    <button
                                        onClick={() => removeExerciseFromSchedule(day, index)}
                                        style={{
                                            marginLeft: '10px',
                                            backgroundColor: 'red',
                                            color: 'white',
                                            border: 'none',
                                            padding: '4px 8px',
                                            borderRadius: '4px',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        Rimuovi
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Nessun esercizio assegnato.</p>
                    )}
                </div>
            ))}
        </div>
    );
}
