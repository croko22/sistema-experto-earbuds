import { FC } from "react";

interface ShapeQuestionProps {
  procesarRespuesta: (respuesta: string) => void;
}

// const Unique_Shapes_of_Earbuds: string[] = ["Bud", "Stem", "Hook"];
const Unique_Shapes_of_Earbuds: any[] = [
  {
    value: "Bud",
    spanish: "Bud | Intraurales",
    image: "bud.jpg",
  },
  {
    value: "Stem",
    spanish: "Stem | Con tallo",
    image: "stem.jpeg",
  },
  {
    value: "Hook",
    spanish: "Hook | Gancho",
    image: "hook.webp",
  },
];

const ShapeQuestion: FC<ShapeQuestionProps> = ({ procesarRespuesta }) => {
  return (
    <div className="mb-4">
      <h3 className="mb-4 text-2xl font-bold text-gray-800">
        Seleccione la forma del auricular:
      </h3>
      <div>
        {Unique_Shapes_of_Earbuds.map((shapeOption) => (
          <div
            key={shapeOption.value}
            className="mb-2 shadow-xl card card-compact w-96 bg-base-100"
          >
            <figure className="px-10 pt-10">
              <img
                src={`images/${shapeOption.image}`}
                alt={shapeOption.spanish}
                className="object-contain h-20 w-22 rounded-xl"
              />
            </figure>
            <div className="justify-center card-actions">
              <button
                className="btn btn-ghost"
                onClick={() => procesarRespuesta(shapeOption.value)}
              >
                {shapeOption.spanish}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShapeQuestion;
