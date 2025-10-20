import "../style/singleExerciseCard.css"
import { useGlobalContext } from "../context/GlobalContext"
import { useState } from "react"

export default function SingleExerciseCard({ singleExCard }) {
    const { name, image, description } = singleExCard;

    const {
        daysOfWeek,
        addExerciseToSchedule,
    } = useGlobalContext();

    const [selectedDay, setSelectedDay] = useState("");

    const handleAdd = () => {
        if (selectedDay) {
            addExerciseToSchedule(selectedDay, name);
            setSelectedDay(""); // reset dropdown
        }
    };

    return (
        <div className="card-container">
            <div className="single-card">
                <div className="single-card-image">
                    <img src={image} alt={name} />
                </div>
                <div className="single-card-name">
                    <h1>{name}</h1>
                </div>
                <div className="single-card-description">
                    <p>{description}</p>
                </div>
                <div className="single-card-btn">
                    <select
                        value={selectedDay}
                        onChange={(e) => setSelectedDay(e.target.value)}
                        className="day-select"
                    >
                        <option value="">Aggiungi al giorno...</option>
                        {daysOfWeek.map(day => (
                            <option key={day} value={day}>{day}</option>
                        ))}
                    </select>
                    <button
                        className="add-btn"
                        onClick={handleAdd}
                        disabled={!selectedDay}
                    >
                        Aggiungi
                    </button>
                </div>
            </div>
        </div>
    )
}
