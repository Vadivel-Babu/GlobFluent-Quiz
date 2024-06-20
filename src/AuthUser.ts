import { ReactNode, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "./context/AppContext";

const AuthUser = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();

  const { user } = useContext<any>(AppContext);

  useEffect(() => {
    if (!user) {
      return navigate("/login");
    }
  }, [user]);
  return children;
};

export default AuthUser;
