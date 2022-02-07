import "../styles/Album.css";
import { useState, useEffect } from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { useParams } from "react-router";
import { Heart, MusicNote, ThreeDots } from "react-bootstrap-icons";
import Loading from "./Loading";
import Error from "./Error";
import { run as runHolder } from "holderjs/holder";
import { Link } from "react-router-dom";
import Modal from 'react-bootstrap/Modal'
import { connect } from 'react-redux'
import { addTrackAction } from '../redux/actions/playlistsAction.js'
import { BsThreeDotsVertical } from "react-icons/bs";

const mapStateToProps = state => ({
    tracks: state.playlists.createdLists.songs,
    playlist: state.playlists.createdLists[0]
})

const Album = ({ playlist, tracks }) => {

    const getDuration = (duration) => {
        const minutes = parseInt(duration / 60);
        const seconds = duration % 60;
        return `${minutes}:${seconds >= 10 ? seconds : "0" + seconds}`;
    };

    return (
        <Container fluid className="px-5 py-4 mx-0 mb-5">
            <Row className="m-0">
                <Col className="text-light text-center my-4" xs={12} lg={4}>
                    {/* {album.cover_medium ? (
                        <Image className="albumImage" src={album.cover_medium} />
                    ) : (
                        <Image className="albumImage" src="holder.js/250x250" />
                    )}
                    <h2 className="mb-1">{album.title}</h2>
                    {album.artist && (
                        <Link className="link" to={`/artist/${album.artist.id}`}>
                            <h6 className="text-grey-smaller mb-4">{album.artist.name}</h6>
                        </Link>
                    )}
                    <Button
                        className="albumPlayButton px-5 py-2"
                        variant="success"
                        type="button"
                    >
                        PLAY
                    </Button>
                    {album.tracks && (
                        <h6 className="text-grey-smaller mt-2 mb-4">
                            {`${new Date(album.release_date).getFullYear()} • ${album.tracks.data.length
                                } SONGS`}
                        </h6>
                    )}
                    <div className="d-flex justify-content-center align-items-center">
                        <div className="px-2">
                            <Heart />
                        </div>
                        <div className="px-2">
                            <ThreeDots />
                        </div>
                    </div> */}
                </Col>
                <Col className="text-light my-4" xs={12} lg={8}>
                    {tracks &&
                        tracks.data.map((track, index) => (
                            <div key={index} className="d-flex justify-content-between">
                                <div className="text-grey-smaller px-1">
                                    <MusicNote />
                                </div>
                                <div className="px-1 w-100">
                                    <div
                                        style={{
                                            overflow: "hidden",
                                            whiteSpace: "nowrap",
                                            textOverflow: "ellipsis",
                                            maxWidth: "100%",
                                        }}
                                    >
                                        {track.title} - {track.title}
                                    </div>
                                    <div className="text-grey-smaller">{track.artist.name}</div>
                                </div>
                                <div className="text-grey-smaller px-1">
                                    {getDuration(track.duration)}
                                </div>
                            </div>
                        ))}
                </Col>
            </Row>
        </Container>
    );
};

export default connect(mapStateToProps)(Album)