import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Result from "./components/Result";
import Quizz from "./components/Quizz";
import Admin from "./components/Admin";
import EditForm from "./components/EditForm";
import CreateForm from "./components/CreateForm";
import AuthUser from "./AuthUser";
import { useContext } from "react";
import { AppContext } from "./context/AppContext";

function App() {
  const { user } = useContext<any>(AppContext);
  return (
    <BrowserRouter>
      <Navbar />
      <div className=" p-5">
        <Routes>
          <Route
            path="/"
            element={
              <AuthUser>
                {user?.role === "user" ? (
                  <Quizz />
                ) : (
                  <Navigate to="/admin" replace={true} />
                )}
              </AuthUser>
            }
          />
          <Route
            path="/admin"
            element={
              <AuthUser>
                {user?.role === "admin" ? (
                  <Admin />
                ) : (
                  <Navigate to="/" replace={true} />
                )}
              </AuthUser>
            }
          />
          <Route
            path="/admin/edit/:id"
            element={
              <AuthUser>
                {user?.role === "admin" ? (
                  <EditForm />
                ) : (
                  <Navigate to="/" replace={true} />
                )}
              </AuthUser>
            }
          />
          <Route
            path="/admin/create"
            element={
              <AuthUser>
                {user?.role === "admin" ? (
                  <CreateForm />
                ) : (
                  <Navigate to="/" replace={true} />
                )}
              </AuthUser>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/result/:score"
            element={
              <AuthUser>
                {user?.role === "user" ? (
                  <Result />
                ) : (
                  <Navigate to="/admin" replace={true} />
                )}
              </AuthUser>
            }
          />
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
