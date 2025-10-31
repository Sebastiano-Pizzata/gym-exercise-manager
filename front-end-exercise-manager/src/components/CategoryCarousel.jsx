import { useEffect } from "react";
import { useGlobalContext } from "../context/GlobalContext";
import { useParams } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function CategoryCarousel() {
    const { handleRelated, related, singleExercise } = useGlobalContext();
    const { id } = useParams();

    useEffect(() => {
        if (singleExercise) {
            handleRelated(id);
        }
    }, [id, singleExercise]);

    console.log("Related:", related);

    if (!related || related.length === 0) {
        return <p>Nessun prodotto correlato</p>;
    }

    return (
        <div style={{ maxWidth: "400px", margin: "0 auto", padding: "10px" }}>
            <Carousel>
                {related.map((item) => (
                    <Carousel.Item key={item.id}>
                        <img
                            className="d-block w-100"
                            src={item.image}
                            alt={item.name}
                            style={{ height: "200px", objectFit: "cover" }}
                        />
                        <Carousel.Caption>
                            <h3>{item.name}</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    );
}
