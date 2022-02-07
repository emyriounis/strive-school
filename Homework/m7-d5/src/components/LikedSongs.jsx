import React from "react";
import { Container, Row, Col, ListGroup, ListGroupItem } from "react-bootstrap";
import { BsSuitHeartFill } from "react-icons/bs";
import { connect } from "react-redux";
import { removeFromLikedSongsAction } from "../../src/redux/actions";


const mapDispatchToProps = (dispatch) => ({
    removeFromLikedSongs: (song) => {
    dispatch(removeFromLikedSongsAction(song));
  },
});

const LikedSongs = ({liked, removeFromLikedSongs}) => {
    return (
       
      <Container>
          { console.log(liked) }
        <Row>
          <Col xs={12}>
            <ListGroup>
              {liked.songs.map((song) => (
                <ListGroupItem key={song.id}>
                  <BsSuitHeartFill onClick={() => removeFromLikedSongs(song)} />
                  <span>{song.title}</span>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    );
}

export default connect((s) => s, mapDispatchToProps)(LikedSongs);
