import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import NavigationBar from "./components/navbar/NavigationBar";
import ReservationForm from "./components/reservationForm/ReservationForm";
import HomeGuest from "./pages/HomeGuest";
import HomeUser from "./pages/HomeUser";
import Login from "./pages/Login";
import QuizDetail from "./components/quizdetail/QuizDetail";
import QuizList from "./components/quizlist/QuizList";
import CourseList from "./components/courselist/CourseList";
import SignUp from "./pages/SignUp";
import Logout from "./pages/Logout";
import "./App.css";

function RedirectToHome() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/home-user"); // Redirige vers HomeUser si connecté
    } else {
      navigate("/home-guest"); // Sinon vers HomeGuest
    }
  }, [navigate]);

  return null; // Ne rend rien, sert juste à rediriger
}

function App() {
  return (
    <div className="App">
      <Router>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<RedirectToHome />} />
          <Route path="/home-guest" element={<HomeGuest />} />
          <Route path="/home-user" element={<HomeUser />} />
          <Route path="/courses" element={<CourseList />} />
          <Route path="/quiz" element={<QuizList />} />
          <Route path="/quiz/:id" element={<QuizDetail />} />
          <Route path="/reservation" element={<ReservationForm />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
