import { Form, Formik, FormikHelpers } from "formik";
import { Button, TextField } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "./FillInTheBlanksForm.css";

interface FillInTheBlanksFormProps {
  type: string;
}

interface FormValues {
  question: string;
  missingWord: string;
}

function FillInTheBlanksForm({ type }: FillInTheBlanksFormProps) {
  const initialValues: FormValues = {
    question: "",
    missingWord: "",
  };

  const handleSubmit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    try {
      const data = {
        question: values.question,
        missingWord: values.missingWord,
      };

      const response = await axios.post(
        "http://localhost:8081/api/tests/fillInTheBlanks",
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
    <div className="fillInTheBlanksFormContainer">
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values, setFieldValue }) => (
          <Form>
            <TextField
              label="Вставте пропущене слово:"
              variant="outlined"
              fullWidth
              name="missingWord"
              margin="normal"
              value={values.missingWord}
              onChange={(e) => {
                setFieldValue("missingWord", e.target.value);
              }}
            />
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
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="fillInTheBlanksFormSubmitButton"
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

export default FillInTheBlanksForm;
