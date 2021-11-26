import "../styles/SingleAlbum.css";
import { useEffect } from "react";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { PlayCircleFill } from "react-bootstrap-icons";
import { run as runHolder } from "holderjs/holder";

const SingleAlbum = ({ id, cover, title }) => {
  useEffect(() => {
    runHolder("image-class-name");
  });

  return (
    <div className="singleAlbum text-center w-100">
      <Link className="link albumLink" to={`/album/${id}`}>
        <PlayCircleFill className="playButton" size={25} />
        {cover ? (
          <Image className="albumImg" src={cover} />
        ) : (
          <Image className="albumImg" src="holder.js/250x250" />
        )}
        <div className="albumText text-light p-1">{title}</div>
      </Link>
    </div>
  );
};

export default SingleAlbum;
