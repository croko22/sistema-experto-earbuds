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
        <div className="shadow-xl card card-side bg-base-100">
          <figure>
            <img
              src={`images/${earbud.shape.toLowerCase()}.webp`}
              className="w-full rounded-lg h-25"
              alt={earbud?.shape}
            />
          </figure>
          <div className="card-body">
            <h3 className="card-title">{diagnostico}</h3>

            <h4 className="mb-4">Características:</h4>
            <ul>
              {earbud.features.map((feature: string) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <p className="mt-4">Precio: ${earbud.price}</p>

            <div className="justify-end card-actions">
              <button onClick={resetear} className="btn btn-primary">
                Reiniciar Diagnóstico
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Result;
