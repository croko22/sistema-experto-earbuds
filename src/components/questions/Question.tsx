interface QuestionProps {
  procesarRespuesta: (answer: string) => void;
  sintoma: string;
}

const Question: React.FC<QuestionProps> = ({ procesarRespuesta, sintoma }) => {
  return (
    <div className="mb-4">
      {sintoma ? (
        <h3 className="mb-4 text-2xl">¿El audífono tiene {sintoma} ?</h3>
      ) : (
        <h3 className="mb-4 text-2xl">No hay más preguntas :( </h3>
      )}
      {sintoma && (
        <div>
          <button
            className="px-4 py-2 mr-2 text-white bg-red-500"
            onClick={() => procesarRespuesta("Sí")}
          >
            Sí
          </button>
          <button
            className="px-4 py-2 mr-2 text-white bg-blue-500"
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
