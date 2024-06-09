import { useEffect, useState } from "react";
import knowledgeBase from "../assets/earphone";
import { earbud_categories } from "../assets/shape";
import PriceQuestion from "./questions/PriceQuestion";
import ShapeQuestion from "./questions/ShapeQuestion";
type earphoneFeatureType = {
  categoria: string;
  opciones: string[];
};

const categorias: earphoneFeatureType[] = [
  // const categorias: earphoneFeatureType[] = earbud_categories || [
  {
    categoria: "Modo",
    opciones: ["Selfie remote function"],
  },
  {
    categoria: "WEA",
    opciones: ["3D audio"],
  },
  {
    categoria: "WEA",
    opciones: ["Active noise cancelling"],
  },
  {
    categoria: "WEA",
    opciones: ["In-app EQ"],
  },
];

const Unique_Shapes_of_Earbuds: string[] = ["Bud", "Stem", "Hook"];

function Recomendador() {
  const [respuestas, setRespuestas] = useState({});
  const [categoriaIndex, setCategoriaIndex] = useState(-2);
  const [sintomaIndex, setSintomaIndex] = useState(0);
  const [diagnostico, setDiagnostico] = useState("");
  const [price, setPrice] = useState(null);
  const [shape, setShape] = useState(null);

  const [earbud, setEarbud] = useState(null);

  useEffect(() => {
    if (diagnostico) {
      for (const [key, value] of Object.entries(knowledgeBase)) {
        if (key === diagnostico) {
          setEarbud(value);
          break;
        }
      }
    }
  }, [diagnostico]);

  const procesarRespuesta = (respuesta) => {
    if (categoriaIndex === -2) {
      setPrice(respuesta);
      setCategoriaIndex(-1);
      return;
    }
    if (categoriaIndex === -1) {
      setShape(respuesta);
      setCategoriaIndex(0);
      return;
    }
    const sintomasCategoria = categorias[categoriaIndex].opciones;
    const sintomaActual = sintomasCategoria[sintomaIndex];
    const nuevosHechos = { ...respuestas, [sintomaActual]: respuesta };
    setRespuestas(nuevosHechos);

    if (!sintomaActual) {
      return;
    }

    const categoriasRestantes = categorias.slice(categoriaIndex + 1);
    const opcionesRestantes = Object.entries(knowledgeBase).filter(
      ([nombre, { features }]) =>
        sintomasCategoria.some(
          (sintoma) =>
            nuevosHechos[sintoma] === "Sí" && features.includes(sintoma)
        ) &&
        categoriasRestantes.every((categoria) =>
          categoria.opciones.some(
            (opcion) =>
              nuevosHechos[opcion] === "No" ||
              !nuevosHechos.hasOwnProperty(opcion)
          )
        ) &&
        (!price || knowledgeBase[nombre].price <= price) &&
        (!shape || knowledgeBase[nombre].shape === shape)
    );

    if (opcionesRestantes.length === 1) {
      setDiagnostico(opcionesRestantes[0][0]);
      return;
    }

    if (sintomaIndex + 1 < sintomasCategoria.length) {
      setSintomaIndex(sintomaIndex + 1);
    } else {
      setCategoriaIndex(categoriaIndex + 1);
      setSintomaIndex(0);
    }

    if (respuesta === "Sí") {
      setCategoriaIndex(categoriaIndex + 1);
    }
  };

  const resetear = () => {
    setRespuestas({});
    setCategoriaIndex(-2);
    setSintomaIndex(0);
    setDiagnostico("");
    setPrice(null);
    setShape(null);
  };

  return (
    <div>
      {categoriaIndex === -2 && (
        <PriceQuestion procesarRespuesta={procesarRespuesta} />
      )}
      {categoriaIndex === -1 && (
        <ShapeQuestion procesarRespuesta={procesarRespuesta} />
      )}
      {categoriaIndex >= 0 && !diagnostico && (
        <div className="mb-4">
          <h3 className="mb-4 text-2xl">
            ¿El audífono tiene{" "}
            {categorias[categoriaIndex]?.opciones[sintomaIndex]}?
          </h3>
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
        </div>
      )}
      {diagnostico && (
        <div className="mb-4">
          <p className="mb-4 text-xl">Recomendación: {diagnostico}</p>
          <button
            onClick={resetear}
            className="px-4 py-2 text-white bg-red-500"
          >
            Reiniciar Diagnóstico
          </button>

          {earbud && (
            <div>
              <h3 className="mb-4 text-2xl">Características:</h3>
              <ul>
                {earbud.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <p className="mt-4">Precio: ${earbud.price}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Recomendador;
