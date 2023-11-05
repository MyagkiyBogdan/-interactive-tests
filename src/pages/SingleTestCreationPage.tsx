import { Typography } from "@mui/material";
import FillInTheBlanksForm from "components/FillInTheBlanksForm/FillInTheBlanksForm";
import MatchingForm from "components/MatchingForm/MatchingForm";
import MultipleChoiceForm from "components/MultipleChoiceForm/MultipleChoiceForm";
import SequencingForm from "components/SequencingForm/SequencingForm";
import SingleChoiceForm from "components/SingleTestsForms/SingleChoiceForm";
import TrueFalseForm from "components/TrueFalseForm/TrueFalseForm";
import { TEST_TYPE } from "constants/testsConstants";
import { useParams } from "react-router-dom";

function SingleTestCreationPage() {
  const { id } = useParams();

  return (
    <>
      <Typography variant="h4" align="center" gutterBottom mt={4}>
        Заповніть форму для створення тесту:
      </Typography>
      {id === TEST_TYPE.SINGLE_CHOICE_TEST && <SingleChoiceForm type={id} />}
      {id === TEST_TYPE.MULTIPLE_CHOICE_TEST && (
        <MultipleChoiceForm type={id} />
      )}
      {id === TEST_TYPE.TRUE_FALSE_TEST && <TrueFalseForm type={id} />}
      {id === TEST_TYPE.FILL_IN_THE_BLANKS_TEST && (
        <FillInTheBlanksForm type={id} />
      )}
      {id === TEST_TYPE.SEQUENCING_TEST && <SequencingForm type={id} />}
      {id === TEST_TYPE.MATCHING_TEST && <MatchingForm type={id} />}
    </>
  );
}

export default SingleTestCreationPage;
