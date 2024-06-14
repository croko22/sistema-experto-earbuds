interface QuestionProps {
  procesarRespuesta: (answer: string) => void;
  sintoma: string;
  resetear: () => void;
}

const Question: React.FC<QuestionProps> = ({
  procesarRespuesta,
  sintoma,
  resetear,
}) => {
  return (
    <div className="mb-4">
      {sintoma ? (
        <h3 className="mb-4 text-xl font-bold text-center text-gray-800">
          ¿El audífono tiene {sintoma} ?
        </h3>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <h3 className="mb-4 text-xl font-bold text-center text-gray-800">
            No hay más preguntas :({" "}
          </h3>
          <button onClick={resetear} className="btn btn-primary">
            Reiniciar Diagnóstico
          </button>
        </div>
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
