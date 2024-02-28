import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const StartUpHandler = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth) {
      console.log(auth);
      navigate("/listview");
    }
  }, [auth]);

  return null;
};

export default StartUpHandler;
