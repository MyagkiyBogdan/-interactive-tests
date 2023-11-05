import { Field, Form, Formik, FormikHelpers } from "formik";
import {
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  TextField,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "./TrueFalseForm.css";

interface TrueFalseFormProps {
  type: string;
}

interface FormValues {
  question: string;
  correctAnswer: string;
}

function TrueFalseForm({ type }: TrueFalseFormProps) {
  const initialValues: FormValues = {
    question: "",
    correctAnswer: "true",
  };

  const handleSubmit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    try {
      const data = {
        question: values.question,
        correctAnswer: values.correctAnswer,
      };

      const response = await axios.post(
        "http://localhost:8081/api/tests/trueFalse",
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
          <Form className="trueFalseFormContainer">
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
            <FormControl component="fieldset">
              <FormLabel component="legend" className="trueFalseFormLabel">
                Виберіть правильний варіант відповіді:
              </FormLabel>
              <Field name="correctAnswer">
                {({ field }: { field: any }) => (
                  <RadioGroup
                    {...field}
                    className="trueFalseFormRadioGroup"
                    value={values.correctAnswer}
                    onChange={(e) => {
                      setFieldValue("correctAnswer", e.target.value);
                    }}
                  >
                    <FormControlLabel
                      key="true"
                      value="true"
                      control={<Radio />}
                      label="Правильно"
                    />
                    <FormControlLabel
                      key="false"
                      value="false"
                      control={<Radio />}
                      label="Неправильно"
                    />
                  </RadioGroup>
                )}
              </Field>
            </FormControl>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="trueFalseFormSubmitButton"
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

export default TrueFalseForm;
