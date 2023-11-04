import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import QuizApp from "./components/QuizApp/QuizApp";
import LoginPage from "pages/LoginPage";
import RedirectToLogin from "pages/RedirectLogin";
import RegistrationPage from "pages/RegistrationPage";
import MyTestsPage from "pages/MyTests";
import Header from "components/Header/Header";
import { PrivateRoute } from "components/PrivateRoute";
import { PublicRoute } from "components/PublicRoute";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path="/registration"
          element={
            <PublicRoute>
              <RegistrationPage />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/mytests"
          element={
            <PrivateRoute>
              <MyTestsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/quiz"
          element={
            <PrivateRoute>
              <QuizApp />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<RedirectToLogin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
