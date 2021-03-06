import { useEffect, useState } from "react";
import OtherProfiles from "./OtherProfiles";
import ProfileOptions from "./ProfileOptions";

const Sidebar = () => {
  const [profiles, setProfiles] = useState([]);

  const fetchingData = async () => {
    try {
      let res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/profile/`);
      if (res.ok) {
        let data = await res.json();
        setProfiles(data);
      } else {
        console.log("Something goes wrong while fetching the data");
      }
    } catch (err) {
      console.log("error connecting to the server");
    }
  };

  useEffect(() => {
    fetchingData();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <ProfileOptions />
      <OtherProfiles title="People also viewed" profiles={profiles} />
      <OtherProfiles title="People you may know" profiles={profiles} />
    </>
  );
};

export default Sidebar;
