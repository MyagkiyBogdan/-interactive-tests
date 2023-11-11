import { TEST_TYPE } from "constants/testsConstants";
import {
  FillInTheBlanksQuestion,
  MatchingQuestion,
  MultipleChoiceQuestion,
  SequencingQuestion,
  SingleChoiceQuestion,
  SingleQuestion,
  TrueFalseQuestion,
} from "types/questionsDataTypes";
import SingleChoiceTest from "./SingleChoiseTest";
import MultipleChoiceTest from "./MultipleChoiceTest";
import TrueFalseChoiceTest from "./TrueFalseChoiceTest";
import FillInTheBlanksTest from "./FillInBlanksTest";
import SequencingTest from "./SequencingTest";
import MatchingTest from "./MatchingTest";

type TestComponentProps = {
  currentQuestion: SingleQuestion;
  currentQuestionIndex: number;
};

const TestComponent: React.FC<TestComponentProps> = ({
  currentQuestion,
  currentQuestionIndex,
}) => {
  let renderedComponent: React.ReactNode;

  switch (currentQuestion?.type) {
    case TEST_TYPE.SINGLE_CHOICE_TEST:
      renderedComponent = (
        <SingleChoiceTest
          question={currentQuestion as SingleChoiceQuestion}
          currentQuestionIndex={currentQuestionIndex}
        />
      );
      break;
    case TEST_TYPE.MULTIPLE_CHOICE_TEST:
      renderedComponent = (
        <MultipleChoiceTest
          question={currentQuestion as MultipleChoiceQuestion}
          currentQuestionIndex={currentQuestionIndex}
        />
      );
      break;
    case TEST_TYPE.TRUE_FALSE_TEST:
      renderedComponent = (
        <TrueFalseChoiceTest
          question={currentQuestion as TrueFalseQuestion}
          currentQuestionIndex={currentQuestionIndex}
        />
      );
      break;
    case TEST_TYPE.FILL_IN_THE_BLANKS_TEST:
      renderedComponent = (
        <FillInTheBlanksTest
          question={currentQuestion as FillInTheBlanksQuestion}
          currentQuestionIndex={currentQuestionIndex}
        />
      );
      break;
    case TEST_TYPE.SEQUENCING_TEST:
      renderedComponent = (
        <SequencingTest
          question={currentQuestion as SequencingQuestion}
          currentQuestionIndex={currentQuestionIndex}
        />
      );
      break;
    case TEST_TYPE.MATCHING_TEST:
      renderedComponent = (
        <MatchingTest
          question={currentQuestion as MatchingQuestion}
          currentQuestionIndex={currentQuestionIndex}
        />
      );
      break;
    default:
      break;
  }

  return <div>{renderedComponent}</div>;
};

export default TestComponent;
