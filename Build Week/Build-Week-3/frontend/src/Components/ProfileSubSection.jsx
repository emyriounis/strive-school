import { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SidebarProfiles from "./SidebarProfiles";
import { Link, useLocation, useParams } from "react-router-dom";

const ProfileSubSection = ({ heading, myInfo }) => {
  const [profiles, setProfiles] = useState([]);
  const [posts, setPosts] = useState([]);
  const [me, setMe] = useState({});

  const { pathname } = useLocation();
  const { profileId } = useParams();

  const randomNum = Math.floor(Math.random() * (profiles.length - 4));

  const fetchingData = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/profile/`);
      if (res) {
        const body = await res.json();
        setProfiles(body);
      } else {
        console.log("Something goes wrong while fetching the data");
      }
    } catch (err) {
      console.log("error connecting to the server");
    }
  };

  const fetchingProfile = async () => {
    try {
      const id =
        profileId === "me" || !profileId
          ? process.env.REACT_APP_ME_ID
          : profileId;
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/profile/${id}`
      );
      if (res) {
        const body = await res.json();
        setMe(body);
        console.log(me);
      } else {
        console.log("Something goes wrong while fetching the data");
      }
    } catch (err) {
      console.log("error connecting to the server");
    }
  };

  const fetchingActivity = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/posts`);
      if (res) {
        const body = await res.json();
        setPosts(body);
      } else {
        console.log("Something goes wrong while fetching the data");
      }
    } catch (err) {
      console.log("error connecting to the server");
    }
  };

  useEffect(() => {
    if (heading === "Interests") {
      fetchingData();
      fetchingProfile();
    } else {
      fetchingActivity();
      fetchingProfile();
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="profile-sub-section mt-4">
      <h4 className="pt-4 pl-3">{heading}</h4>
      {heading === "Interests" ? (
        <Row className="p-3">
          {profiles &&
            profiles
              .slice(randomNum, randomNum + 4)
              .map(({ _id, image, name, surname, title }) => (
                <Col xs="12" md="6" key={_id}>
                  <SidebarProfiles
                    _id={_id}
                    image={image}
                    name={name}
                    surname={surname}
                    title={title}
                  />
                </Col>
              ))}
        </Row>
      ) : (
        <Row className="p-3">
          {pathname === "/profile" ? (
            <>
              {posts &&
                posts
                  .filter((post) => post?.user?._id === myInfo?._id)
                  .reverse()
                  .map((post) => (
                    <Col key={post._id} xs="12" md="6" className="mb-2">
                      <Link to={`/post/${post._id}`}>
                        <p className="reduced-text mb-0">{post.text}</p>
                      </Link>
                      <p className="text-muted mb-2">
                        {myInfo.name} posted this
                      </p>
                    </Col>
                  ))}
            </>
          ) : (
            <>
              {posts &&
                posts
                  .filter((post) => post?.user?._id === me?._id)
                  .reverse()
                  .map((post) => (
                    <Col key={post._id} xs="12" md="6" className="mb-2">
                      <Link to={`/post/${post._id}`}>
                        <p className="reduced-text mb-0">{post.text}</p>
                      </Link>
                      <p className="text-muted mb-2">{me.name} posted this</p>
                    </Col>
                  ))}
            </>
          )}
        </Row>
      )}
    </div>
  );
};

export default ProfileSubSection;
