import Modal from 'react-bootstrap/Modal'
import { useState } from 'react';
import { Button } from 'react-bootstrap'

const PlaylistModal = () => {
    const [show, setShow] = useState(false);

    const handleCloseCreatePlaylist = () => setShow(false);
    const handleShowCreatePlaylist = () => setShow(true);

    return (
        <>
            <Modal show={show} onHide={handleCloseCreatePlaylist}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseCreatePlaylist}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleShowCreatePlaylist}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default PlaylistModal


