import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./RegistrationForm.css";
import { Link } from "react-router-dom";
import { createUser } from "redux/userSlice";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Неправильный формат email")
    .required("Обязательное поле"),
  password: Yup.string().required("Обязательное поле"),
  name: Yup.string().required("Обязательное поле"),
  surname: Yup.string().required("Обязательное поле"),
});

const RegistrationForm: React.FC = () => {
  const dispatch = useDispatch();

  const handleRegistration = async (values: any) => {
    try {
      const role = values.isTeacher ? 2 : 1;
      const userWithRole = { ...values, role };

      //@ts-ignore
      const resultAction = await dispatch(createUser(userWithRole));
      //@ts-ignore
      const user = unwrapResult(resultAction);

      console.log("User registered successfully:", user);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };
  return (
    <div className="form-container">
      <h1 className="form-title">
        Перед початком проходження тестування будьласка створіть свій аккаунт
      </h1>
      <Formik
        initialValues={{
          email: "",
          password: "",
          name: "",
          surname: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleRegistration}
      >
        <Form className="form">
          <div>
            <label htmlFor="email">Email</label>
            <Field
              type="email"
              name="email"
              id="email"
              className="form-input"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="error-message"
            />
          </div>
          <div>
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
          </div>
          <div>
            <label htmlFor="name">Name</label>
            <Field type="text" name="name" id="name" className="form-input" />
            <ErrorMessage
              name="name"
              component="div"
              className="error-message"
            />
          </div>
          <div>
            <label htmlFor="surname">Surname</label>
            <Field
              type="text"
              name="surname"
              id="surname"
              className="form-input"
            />
            <ErrorMessage
              name="surname"
              component="div"
              className="error-message"
            />
          </div>
          <div>
            <label>
              <Field
                type="checkbox"
                name="isTeacher"
                className="teacher-checkbox"
              />
              Are you a teacher?
            </label>
          </div>
          <button type="submit" className="submit-button">
            Зареєструватись
          </button>
        </Form>
      </Formik>
      <p className="register-link">
        Вже зареєстровані?{" "}
        <Link to="/login" className="blue-link">
          Зайдіть в свій аккаунт
        </Link>
      </p>
    </div>
  );
};

export default RegistrationForm;
