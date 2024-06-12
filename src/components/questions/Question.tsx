interface QuestionProps {
  procesarRespuesta: (answer: string) => void;
  sintoma: string;
}

const Question: React.FC<QuestionProps> = ({ procesarRespuesta, sintoma }) => {
  return (
    <div className="mb-4">
      {sintoma ? (
        <h3 className="mb-4 text-2xl font-bold text-center text-gray-800">
          ¿El audífono tiene {sintoma} ?
        </h3>
      ) : (
        <h3 className="mb-4 text-2xl font-bold text-center text-gray-800">
          No hay más preguntas :({" "}
        </h3>
      )}
      {sintoma && (
        <div className="flex flex-wrap justify-center">
          <button
            className="mr-2 btn btn-primary"
            onClick={() => procesarRespuesta("Sí")}
          >
            Sí
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => procesarRespuesta("No")}
          >
            No
          </button>
        </div>
      )}
    </div>
  );
};

export default Question;
