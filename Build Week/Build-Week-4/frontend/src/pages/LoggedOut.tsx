import { useSelector } from "react-redux";
import Login from "../components/Login";
import Register from "../components/Register";
import { StoreType } from "../types";

const LoggedOut = () => {
  const registered = useSelector((state: StoreType) => state.registered);

  return registered ? <Login /> : <Register />;
};

export default LoggedOut;
