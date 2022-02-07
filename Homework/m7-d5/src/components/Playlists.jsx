import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Singleplaylist from "./Singleplaylist";
import Error from "./Error";
import { connect } from "react-redux"

const mapStateToProps = state => ({
    playlists: state.playlists.createdLists
})

const Playlists = ({ playlists }) => {
    // const [songs, setSongs] = useState([]);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(false);


    // const getSongs = async (query) => {
    //     try {
    //         const response = await fetch(
    //             `https://striveschool-api.herokuapp.com/api/deezer/search?q=${query}`
    //         );
    //         if (!response.ok) {
    //             setError("failed to fetch");
    //         } else {
    //             const data = await response.json();
    //             setSongs(data.data);
    //             return data;
    //         }
    //     } catch (error) {
    //         setError(error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    // useEffect(() => {
    //     getSongs(category);
    // }, []);

    // if (error) <Error error={error} />;
    return (
        <>
            <h4 className="categoryTitle text-light my-3">Playlists</h4>
            <Container fluid className="p-0 mb-5">
                <Row className="d-flex g-2" xs={1} sm={2} md={3} lg={4} xl={6}>
                    {playlists.slice(0, 12).map((list, i) => (
                        <Col key={i} className="p-2">
                            <Singleplaylist
                                title={list.title}
                            />
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
};

export default connect(mapStateToProps)(Playlists)
