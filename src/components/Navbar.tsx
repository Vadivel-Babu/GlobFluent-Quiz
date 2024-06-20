import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
const Navbar = () => {
  //@ts-ignore
  const { user, logout } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div className="bg-yellow-400 text-black py-5 px-10 text-lg flex justify-between">
      <NavLink to="/">Quizz</NavLink>
      {!user ? (
        <NavLink to="/login">Login</NavLink>
      ) : (
        <button
          onClick={() => {
            logout();
            navigate("/login");
          }}
        >
          logout
        </button>
      )}
    </div>
  );
};

export default Navbar;
