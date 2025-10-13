import "../style/singleExerciseCard.css"

export default function SingleExerciseCard({ singleExCard }) {

    const { name, image, description } = singleExCard;
    return (
        <>
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
                </div>
            </div>
        </>
    )
}