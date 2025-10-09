import "../style/ExerciseCard.css";

export default function ExerciseCard({ exerciseProp }) {
    const { name, description, image } = exerciseProp;

    return (
        <>
            <div className="card">
                <div className="card-body">
                    <div className="card-image">
                        <img src={image} alt={name} />
                    </div>
                    <div className="card-title">
                        <h3>{name}</h3>
                    </div>
                    <div className="card-description">
                        <p>{description}</p>
                    </div>
                </div>
            </div>
        </>
    )
}