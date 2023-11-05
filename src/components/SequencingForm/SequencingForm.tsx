import React from "react";
import { Field, Form, Formik, ErrorMessage, FormikHelpers } from "formik";
import { Button, FormControl, FormLabel, TextField } from "@mui/material";
import "./SequencingForm.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import * as Yup from "yup";

interface SequencingFormProps {
  type: string;
}

interface FormValues {
  questions: string[];
  order: string[];
}

function SequencingForm({ type }: SequencingFormProps) {
  const initialValues: FormValues = {
    questions: ["", "", "", ""],
    order: ["1", "2", "3", "4"],
  };

  const validationSchema = Yup.object().shape({
    order: Yup.array().of(
      Yup.string().required("Поле порядок є обов'язковим (1-4)")
    ),
  });

  const handleSubmit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    try {
      if (
        values.questions.every((question) => question.trim() !== "") &&
        values.order.includes("1") &&
        values.order.includes("2") &&
        values.order.includes("3") &&
        values.order.includes("4")
      ) {
        const uniqueValues = new Set(values.order);
        if (uniqueValues.size === values.order.length) {
          const data = {
            questions: values.questions,
            order: values.order.map(Number),
          };

          const response = await axios.post(
            "http://localhost:8081/api/tests/sequencing",
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
        } else {
          toast.error("Усі порядкові значення мають бути унікальними", {
            position: "top-right",
          });
        }
      } else {
        toast.error(
          "Всі поля мають бути заповнені, а порядок має включати 1, 2, 3 та 4,які не повинні повторюватись",
          {
            position: "top-right",
          }
        );
      }
    } catch (error) {
      console.error("Помилка при створенні тесту:", error);
      toast.error("Помилка при створенні тесту", {
        position: "top-right",
      });
    }
  };

  return (
    <div className="sequencingFormContainer">
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ values, setFieldValue }) => (
          <Form>
            {values.questions.map((_, index) => (
              <div key={index} className="sequencingFormItem">
                <div>
                  <TextField
                    label={`Порядок питання ${index + 1}`}
                    variant="outlined"
                    fullWidth
                    name={`questions[${index}]`}
                    margin="normal"
                    value={values.questions[index]}
                    onChange={(e) => {
                      setFieldValue(`questions[${index}]`, e.target.value);
                    }}
                  />
                  <ErrorMessage name={`order[${index}]`}>
                    {(msg) => <div className="errorText">{msg}</div>}
                  </ErrorMessage>
                </div>
                <Field name={`order[${index}]`}>
                  {({ field }: { field: any }) => (
                    <FormControl
                      component="fieldset"
                      className="sequencingFormOrder"
                    >
                      <FormLabel component="legend">Порядок</FormLabel>
                      <TextField
                        {...field}
                        variant="outlined"
                        name={`order[${index}]`}
                        margin="normal"
                        inputProps={{ maxLength: 1 }}
                        value={values.order[index] || ""}
                        onChange={(e) => {
                          const newOrder = e.target.value;
                          if (
                            newOrder === "" ||
                            ["1", "2", "3", "4"].includes(newOrder)
                          ) {
                            setFieldValue(`order[${index}]`, newOrder);
                          }
                        }}
                      />
                    </FormControl>
                  )}
                </Field>
              </div>
            ))}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="sequencingFormSubmitButton"
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
      <ToastContainer />
    </div>
  );
}

export default SequencingForm;
