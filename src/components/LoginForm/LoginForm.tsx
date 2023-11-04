import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom"; // Импортируйте Link из react-router-dom
import "./LoginForm.css";
import { useDispatch } from "react-redux";
import { loginUser } from "redux/userSlice";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Неправильний формат email")
    .required("Обов'язкове поле"),
  password: Yup.string().required("Обов'язкове поле"),
});

const LoginForm: React.FC = () => {
  const dispatch = useDispatch();
  const handleLogin = async (values: any) => {
    try {
      //@ts-ignore
      const resultAction = await dispatch(loginUser(values));
      //@ts-ignore
      const user = unwrapResult(resultAction);

      console.log("User logged in successfully:", user);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="form-container">
      <h1 className="form-title">
        Перед початком проходження тестування будьласка зайдіть у свій аккаунт
      </h1>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
      >
        <Form className="form">
          <label htmlFor="email">Email</label>
          <Field type="email" name="email" id="email" className="form-input" />
          <ErrorMessage
            name="email"
            component="div"
            className="error-message"
          />

          <label htmlFor="password">Password</label>
          <Field
            type="password"
            name="password"
            id="password"
            className="form-input"
          />
          <ErrorMessage
            name="password"
            component="div"
            className="error-message"
          />

          <button type="submit" className="submit-button">
            Увійти
          </button>
        </Form>
      </Formik>
      <p className="register-link">
        Ще не зареєстровані?{" "}
        <Link to="/registration" className="blue-link">
          Створіть аккаунт
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
