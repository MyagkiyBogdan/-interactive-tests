import React from "react";
import { Field, Form, Formik, FormikHelpers } from "formik";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  TextField,
} from "@mui/material";
import "./MultipleChoiceForm.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

interface MultipleChoiceFormProps {
  type: string;
}

interface FormValues {
  question: string;
  correctAnswers: boolean[];
  options: string[];
}

function MultipleChoiceForm({ type }: MultipleChoiceFormProps) {
  const initialValues: FormValues = {
    question: "",
    correctAnswers: [false, false, false, false],
    options: ["", "", "", ""],
  };

  const handleSubmit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    try {
      const data = {
        question: values.question,
        correctAnswers: values.correctAnswers,
        options: values.options,
      };

      const response = await axios.post(
        "http://localhost:8081/api/tests/multipleAnswer",
        data
      );

      if (response.status === 200) {
        toast.success("Тест успішно створено", {
          position: "top-right",
        });
        actions.resetForm();
      } else {
        toast.error("Помилка при створенні тесту", {
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Ошибка при создании теста:", error);
      toast.error("Помилка при створенні тесту", {
        position: "top-right",
      });
    }
  };

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values, setFieldValue }) => (
          <Form className="multipleChoiceFormContainer">
            <TextField
              label="Питання"
              variant="outlined"
              fullWidth
              name="question"
              margin="normal"
              value={values.question}
              onChange={(e) => {
                setFieldValue("question", e.target.value);
              }}
            />
            {initialValues.options.map((_, index) => (
              <TextField
                key={index}
                label={`Варіант ${index + 1}`}
                variant="outlined"
                fullWidth
                name={`options[${index}]`}
                margin="normal"
                value={values.options[index]}
                onChange={(e) => {
                  setFieldValue(`options[${index}]`, e.target.value);
                }}
              />
            ))}
            <FormControl component="fieldset">
              <FormLabel component="legend" className="multipleChoiceFormLabel">
                Оберіть правильні варіанти відповіді:
              </FormLabel>
              {initialValues.options.map((_, index) => (
                <Field name={`correctAnswers[${index}]`} key={index}>
                  {({ field }: { field: any }) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          {...field}
                          checked={values.correctAnswers[index]}
                          onChange={(e) => {
                            setFieldValue(
                              `correctAnswers[${index}]`,
                              e.target.checked
                            );
                          }}
                        />
                      }
                      label={`Варіант ${index + 1}`}
                    />
                  )}
                </Field>
              ))}
            </FormControl>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="multipleChoiceFormSubmitButton"
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
      <ToastContainer />
    </>
  );
}

export default MultipleChoiceForm;
