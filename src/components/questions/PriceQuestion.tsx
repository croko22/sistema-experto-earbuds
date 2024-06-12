import { FC } from "react";

interface PriceQuestionProps {
  procesarRespuesta: (respuesta: number) => void;
}

const PriceQuestion: FC<PriceQuestionProps> = ({ procesarRespuesta }) => {
  return (
    <div className="mb-4 ">
      <h3 className="mb-4 text-2xl font-bold text-gray-800">
        Seleccione el rango de precio:
      </h3>
      <div className="flex flex-wrap gap-2">
        <button
          className="px-4 py-2 mr-2 btn btn-info"
          onClick={() => procesarRespuesta(100)}
        >
          Hasta $100
        </button>
        <button
          className="px-4 py-2 mr-2 btn btn-success"
          onClick={() => procesarRespuesta(200)}
        >
          Hasta $200
        </button>
        <button
          className="px-4 py-2 mr-2 btn btn-warning"
          onClick={() => procesarRespuesta(300)}
        >
          Hasta $300
        </button>
        <button
          className="px-4 py-2 mr-2 btn btn-error"
          onClick={() => procesarRespuesta(400)}
        >
          Hasta $400
        </button>
      </div>
    </div>
  );
};

export default PriceQuestion;
