import "bootstrap/dist/css/bootstrap.min.css";
import MyNav from "./components/MyNav";
import Welcome from "./components/Welcome";
import LatestRelease from "./components/LatestRelease";
import MyFooter from "./components/MyFooter";

const App = () => {
  return (
    <>
      <MyNav />
      <Welcome />
      <LatestRelease />
      <MyFooter />
    </>
  );
};

export default App;
