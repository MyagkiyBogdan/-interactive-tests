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
import "./SingleChoiceForm.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

interface SingleChoiceFormProps {
  type: string;
}

interface FormValues {
  question: string;
  correctAnswer: string;
  options: string[];
}

function SingleChoiceForm({ type }: SingleChoiceFormProps) {
  const initialValues: FormValues = {
    question: "",
    correctAnswer: "",
    options: ["", "", "", ""],
  };

  const handleSubmit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    try {
      const data = {
        question: values.question,
        correctAnswer: values.correctAnswer,
        options: values.options,
      };

      const response = await axios.post(
        "http://localhost:8081/api/tests/singleAnswer",
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
          <Form className="singleChoiceFormContainer">
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
              <FormLabel component="legend" className="singleChoiceFormLabel">
                Оберіть правильний варіант відповіді:
              </FormLabel>
              <Field name="correctAnswer">
                {({ field }: { field: any }) => (
                  <RadioGroup
                    {...field}
                    className="singleChoiceFormRadioGroup"
                    value={values.correctAnswer}
                    onChange={(e) => {
                      setFieldValue("correctAnswer", e.target.value);
                    }}
                  >
                    {initialValues.options.map((_, index) => (
                      <FormControlLabel
                        key={index}
                        value={index.toString()}
                        control={<Radio />}
                        label={`Варіант ${index + 1}`}
                      />
                    ))}
                  </RadioGroup>
                )}
              </Field>
            </FormControl>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="singleChoiceFormSubmitButton"
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

export default SingleChoiceForm;
