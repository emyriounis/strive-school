import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./Components/Footer";
import MyNavbar from "./Components/MyNavbar";
import Home from "./Pages/Home";
import NotFound from "./Pages/NotFound";
import Profile from "./Pages/Profile";
import ProfileDetails from "./Pages/ProfileDetails";
import Jobs from "./Pages/Jobs";
import Messages from "./Pages/Messages";
import Network from "./Pages/Network";
import Notifications from "./Pages/Notifications";
import Search from "./Pages/Search";
import Post from "./Pages/Post";
// import AddComment from "./Components/AddComment";


function App() {
  const [data, setData] = useState(null);

  const fetchMyDetails = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/profile/${process.env.REACT_APP_ME_ID}`
      );
      if (response.ok) {
        const data = await response.json();
        setData(data);
      } else {
        console.error("fetch failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMyDetails();
    // eslint-disable-next-line
  }, []);

  return (
    <BrowserRouter>
      <MyNavbar data={data} />
      <Routes>
        <Route path="/" element={<Home data={data} />} />
        <Route path="/feed/post/:postId" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/network" element={<Network myInfo={data} />} />
        <Route path="/notifications" element={<Notifications data={data} />} />
        <Route path="/profile" element={<Profile myInfo={data} />} />
        <Route
          path="/profile/:profileId"
          element={<ProfileDetails myInfo={data} />}
        />
        <Route path="/search/:searchQuery" element={<Search />} />
        <Route path="/post/:postId" element={<Post />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
     
      <Footer />
    </BrowserRouter>
  );
}

export default App;
