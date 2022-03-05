import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { StoreType } from "./types";
import LoggedIn from "./pages/LoggedIn";
import LoggedOut from "./pages/LoggedOut";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const credentials = useSelector((state: StoreType) => state.credentials);
  const { accessToken, refreshToken } = credentials;

  useEffect(() => {
    accessToken && refreshToken ? setLoggedIn(true) : setLoggedIn(false);
    localStorage.setItem(
      "whatsapp",
      JSON.stringify({ accessToken, refreshToken })
    );
  }, [accessToken, refreshToken]);

  return loggedIn ? <LoggedIn /> : <LoggedOut />;
};

export default App;
