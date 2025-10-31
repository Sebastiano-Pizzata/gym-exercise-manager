import { useEffect } from "react";
import { useGlobalContext } from "../context/GlobalContext";
import { useParams, Link } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import { Row, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const chunkArray = (arr, size) => {
    const chunkedArray = [];
    for (let i = 0; i < arr.length; i += size) {
        chunkedArray.push(arr.slice(i, i + size));
    }
    return chunkedArray;
};

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


    const itemsPerSlide = 3;
    const relatedChunks = chunkArray(related, itemsPerSlide);

    return (

        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "20px 0" }}>
            <h2 className="text-center mb-4">Esercizi Correlati</h2>
            <Carousel indicators={false} controls={true}>
                {relatedChunks.map((chunk, chunkIndex) => (
                    <Carousel.Item key={chunkIndex}>
                        <Row className="g-4">
                            {chunk.map((item) => (
                                <Col key={item.id} xs={12} md={4}>
                                    <Link
                                        to={`/exercise/${item.id}`}
                                        style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <div className="text-center">
                                            <img
                                                className="img-fluid"
                                                src={item.image}
                                                alt={item.name}
                                                style={{ height: "150px", objectFit: "cover", width: "100%" }}
                                            />
                                            <h5 className="mt-2">{item.name}</h5>
                                        </div>
                                    </Link>
                                </Col>
                            ))}
                        </Row>
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    );
}