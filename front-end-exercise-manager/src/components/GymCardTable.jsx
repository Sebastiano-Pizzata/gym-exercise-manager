import { useGlobalContext } from "../context/GlobalContext"
import "../style/GymCardTable.css"

export default function GymCardTable() {
    const { schedule, daysOfWeek, removeExerciseFromSchedule } = useGlobalContext();

    return (
        <div className="gym-table-container">
            <h2>Gym Weekly Schedule</h2>

            <table className="gym-table">
                <thead>
                    <tr>
                        <th>Giorno</th>
                        <th>Esercizio</th>
                        <th>Azioni</th>
                    </tr>
                </thead>

                <tbody>
                    {daysOfWeek.map(day => {
                        const exercises = schedule[day] || [];

                        if (exercises.length === 0) {
                            return (
                                <tr key={day}>
                                    <td className="day-column">{day}</td>
                                    <td className="no-exercise" colSpan="2">
                                        Nessun esercizio assegnato.
                                    </td>
                                </tr>
                            );
                        }

                        return exercises.map((exercise, index) => (
                            <tr key={`${day}-${index}`}>
                                {/* Solo la prima riga del giorno mostra il nome del giorno */}
                                {index === 0 && (
                                    <td className="day-column" rowSpan={exercises.length}>
                                        {day}
                                    </td>
                                )}

                                <td className="exercise-name">
                                    {typeof exercise === "string"
                                        ? exercise
                                        : exercise?.name || "Esercizio senza nome"}
                                </td>
                                <td className="button-cell">
                                    <button
                                        onClick={() => removeExerciseFromSchedule(day, index)}
                                        className="remove-btn"
                                    >
                                        Rimuovi
                                    </button>
                                </td>
                            </tr>
                        ));
                    })}
                </tbody>
            </table>
        </div>
    );
}