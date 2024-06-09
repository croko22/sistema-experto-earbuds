import { FC } from "react";

interface ShapeQuestionProps {
  procesarRespuesta: (respuesta: string) => void;
}

const Unique_Shapes_of_Earbuds: string[] = ["Bud", "Stem", "Hook"];

const ShapeQuestion: FC<ShapeQuestionProps> = ({ procesarRespuesta }) => {
  return (
    <div className="mb-4">
      <h3 className="mb-4 text-2xl">Seleccione la forma del auricular:</h3>
      <div>
        {Unique_Shapes_of_Earbuds.map((shapeOption) => (
          <button
            key={shapeOption}
            className="px-4 py-2 mr-2 text-white bg-red-500"
            onClick={() => procesarRespuesta(shapeOption)}
          >
            {shapeOption}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ShapeQuestion;
