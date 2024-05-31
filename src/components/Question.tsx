interface QuestionProps {
  questionNumber: string;
  questionText: string;
  answers: string[];
  handleAnswer: (question: string, answer: string) => void;
}

const Question: React.FC<QuestionProps> = ({
  questionNumber,
  questionText,
  answers,
  handleAnswer,
}) => {
  return (
    <>
      <h2 className="mb-4">{questionText}</h2>
      <div>
        {answers.map((answer, index) => (
          <button
            key={index}
            className={`${
              index === 0 ? "bg-blue-500" : "bg-red-500"
            } text-white px-4 py-2 mr-2`}
            onClick={() => handleAnswer(questionNumber, answer)}
          >
            {answer}
          </button>
        ))}
      </div>
    </>
  );
};

export default Question;
