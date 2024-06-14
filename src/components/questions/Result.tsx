import { FC } from "react";

interface ResultProps {
  diagnostico: string;
  earbud: any;
  resetear: () => void;
}

const Result: FC<ResultProps> = ({ diagnostico, earbud, resetear }) => {
  return (
    <div className="mb-4">
      {earbud && (
        <div className="w-full shadow-xl card bg-base-100">
          <figure>
            <img
              src={`images/${earbud.shape.toLowerCase()}.webp`}
              className="h-20 rounded-lg w-30"
              alt={earbud?.shape}
            />
          </figure>
          <div className="card-body">
            <h3 className="card-title">{diagnostico}</h3>

            <h4 className="mb-4">Características:</h4>
            <ul className="list-disc list-inside">
              {earbud.features.map((feature: string) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <p className="mt-4">Precio: ${earbud.price}</p>

            <div className="flex flex-row justify-center card-actions">
              <a
                href={`https://www.amazon.com/s?k=${diagnostico}`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-secondary"
              >
                Buscar en Amazon
              </a>
              <div className="justify-end card-actions">
                <button onClick={resetear} className="btn btn-primary">
                  Reiniciar Diagnóstico
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Result;
