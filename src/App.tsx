import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import QuizApp from "./components/QuizApp/QuizApp";
import LoginPage from "pages/LoginPage";
import RedirectToLogin from "pages/RedirectLogin";
import RegistrationPage from "pages/RegistrationPage";

import Header from "components/Header/Header";
import { PrivateRoute } from "components/PrivateRoute";
import { PublicRoute } from "components/PublicRoute";
import CreateTestsPage from "pages/CreateTestsPage";
import SingleTestCreationPage from "pages/SingleTestCreationPage";
import StatisticPage from "pages/StatisticPage";

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
          path="/create-tests"
          element={
            <PrivateRoute>
              <CreateTestsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/create-tests/:id"
          element={
            <PrivateRoute>
              <SingleTestCreationPage />
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
        <Route
          path="/statistic"
          element={
            <PrivateRoute>
              <StatisticPage />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<RedirectToLogin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
