import { Form, Formik, FormikHelpers } from "formik";
import { Button, TextField } from "@mui/material";
import "./MatchingForm.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

interface MatchingFormProps {
  type: string;
}

interface FormValues {
  questions: string[];
  answers: string[];
  matching: Record<string, string>;
}

function MatchingForm({ type }: MatchingFormProps) {
  const initialValues: FormValues = {
    questions: ["", "", ""],
    answers: ["", "", ""],
    matching: {},
  };

  const handleSubmit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    try {
      const matching: Record<string, string> = {};

      for (let i = 0; i < values.questions.length; i++) {
        const question = values.questions[i];
        const answer = values.answers[i];
        matching[question] = answer;
      }

      const data = {
        questions: values.questions,
        answers: values.answers,
        matching,
      };

      const response = await axios.post(
        "http://localhost:8081/api/tests/matching",
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
          <Form className="matchingFormContainer">
            {values.questions.map((_, index) => (
              <div key={index} className="matchingFormItem">
                <TextField
                  label={`Елемент ${index + 1}`}
                  variant="outlined"
                  fullWidth
                  name={`questions[${index}]`}
                  margin="normal"
                  value={values.questions[index]}
                  onChange={(e) => {
                    setFieldValue(`questions[${index}]`, e.target.value);
                  }}
                />
                <TextField
                  label={`Відповідь ${index + 1}`}
                  variant="outlined"
                  fullWidth
                  name={`answers[${index}]`}
                  margin="normal"
                  value={values.answers[index]}
                  onChange={(e) => {
                    setFieldValue(`answers[${index}]`, e.target.value);
                  }}
                />
              </div>
            ))}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="matchingFormSubmitButton"
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

export default MatchingForm;
