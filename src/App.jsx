import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Default from "./pages/Default/Default";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import DetailEvent from "./pages/Dashboard/DetailEvent";
import Admin from "./pages/Admin/Admin";
import Committee from "./pages/Committee/Committee";
import Pesan from "./pages/Pesan/Pesan";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import History from "./pages/History/History";

function App() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuth(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuth(false);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={isAuth ? <Navigate to="/dashboard" /> : <Login setAuth={setIsAuth} />} />
        <Route path="/register" element={isAuth ? <Navigate to="/dashboard" /> : <Register onRegister={setIsAuth} />} />
        <Route element={<PrivateRoute isAuth={isAuth} />}>
          <Route path="/dashboard" element={<Dashboard onLogout={handleLogout} />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/panitia" element={<Committee />} />
          <Route path="/event/event_detail/:id" element={<DetailEvent />} />
          <Route path="/event/event_detail/pesan/:id" element={<Pesan />} />
        </Route>
        <Route path="/history" element={<History />} />
        <Route path="/" element={<Default />} />
      </Routes>
    </Router>
  );
}

export default App;
