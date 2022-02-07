import "../styles/Home.css";
import AlbumList from "./AlbumList";

const Home = () => {
  return (
    <div className="px-5 py-4 mb-5">
      <AlbumList category="Pop" />
      <AlbumList category="Jazz" />
      <AlbumList category="House" />
    </div>
  );
};

export default Home;
