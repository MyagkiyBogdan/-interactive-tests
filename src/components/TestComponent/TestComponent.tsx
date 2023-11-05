import { TEST_TYPE } from "constants/testsConstants";
import {
  MultipleChoiceQuestion,
  SingleChoiceQuestion,
  SingleQuestion,
} from "types/questionsDataTypes";
import SingleChoiceTest from "./SingleChoiseTest";
import MultipleChoiceTest from "./MultipleChoiceTest";

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
    // case TEST_TYPE.TRUE_FALSE_TEST:
    //   renderedComponent = <TrueFalseTest question={currentQuestion.data} />;
    //   break;
    // case TEST_TYPE.FILL_IN_THE_BLANKS_TEST:
    //   renderedComponent = (
    //     <FillInTheBlanksTest question={currentQuestion.data} />
    //   );
    //   break;
    // case TEST_TYPE.SEQUENCING_TEST:
    //   renderedComponent = <SequencingTest question={currentQuestion.data} />;
    //   break;
    // case TEST_TYPE.MATCHING_TEST:
    //   renderedComponent = <MatchingTest question={currentQuestion.data} />;
    //   break;
    default:
      break;
  }

  return <div>{renderedComponent}</div>;
};

export default TestComponent;
