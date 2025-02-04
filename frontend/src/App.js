import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavigationBar from "./components/navbar/NavigationBar";
import ReservationForm from "./components/reservationForm/ReservationForm";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import QuizDetail from "./components/quizdetail/QuizDetail";
import QuizList from "./components/quizlist/QuizList";
import CourseList from "./components/courselist/CourseList";
import "./App.css";

function App() {
  // const userId = "123";
  return (
    <div className="App">
      <NavigationBar />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<CourseList />} />
          <Route path="/quiz" element={<QuizList />} />
          <Route path="/quiz/:id" element={<QuizDetail />} />
          <Route path="/reservation" element={<ReservationForm />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
