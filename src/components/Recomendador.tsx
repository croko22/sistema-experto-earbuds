import { useEffect, useState } from "react";
import PriceQuestion from "./questions/PriceQuestion";
import ShapeQuestion from "./questions/ShapeQuestion";
import Question from "./questions/Question";
import Result from "./questions/Result";
import knowledgeBase from "../assets/earphone";
import { earbud_categories } from "../assets/shape";
type earphoneFeatureType = {
  categoria: string;
  opciones: string[];
};

const categorias: earphoneFeatureType[] = [
  {
    categoria: "Modo",
    opciones: ["Selfie remote function"],
  },
  {
    categoria: "NULL",
    opciones: ["3D audio"],
  },
  {
    categoria: "NULL",
    opciones: ["Active noise cancelling"],
  },
  {
    categoria: "NULL",
    opciones: ["In-app EQ"],
  },
  {
    categoria: "NULL",
    opciones: ["Transparency mode"],
  },
  {
    categoria: "NULL",
    opciones: ["Wireless charging"],
  },
  {
    categoria: "NULL",
    opciones: ["Multipoint"],
  },
  {
    categoria: "NULL",
    opciones: ["Dolby Atmos"],
  },
  {
    categoria: "NULL",
    opciones: ["Spatial audio"],
  },
  {
    categoria: "NULL",
    opciones: ["Wear detection"],
  },
  {
    categoria: "NULL",
    opciones: ["Tile tracking"],
  },
  {
    categoria: "NULL",
    opciones: ["Find my earbuds"],
  },
  {
    categoria: "NULL",
    opciones: ["Mono mode"],
  },
  {
    categoria: "NULL",
    opciones: ["Battery percentage meter"],
  },
  {
    categoria: "NULL",
    opciones: ["In-ear detection"],
  },
  {
    categoria: "NULL",
    opciones: ["Low-latency mode"],
  },
  {
    categoria: "NULL",
    opciones: ["User-replaceable batteries"],
  },
];

function Recomendador() {
  const [categoriaIndex, setCategoriaIndex] = useState<number>(-2);
  const [respuestas, setRespuestas] = useState<Record<string, any>>({});

  const [opcionesRestantes, setOpcionesRestantes] = useState(
    Object.entries(knowledgeBase)
  );

  const [sintomaIndex, setSintomaIndex] = useState<number>(0);
  const [diagnostico, setDiagnostico] = useState<string>("");
  const [price, setPrice] = useState<number | null>(null);
  const [shape, setShape] = useState<string | null>(null);
  const [earbud, setEarbud] = useState<any>(null);

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

  const procesarRespuesta = (respuesta: number | string) => {
    //*Regla 1 - Si el usuario responde con un número en la primera pregunta, se asume que es el precio máximo que está dispuesto a pagar
    if (categoriaIndex === -2 && typeof respuesta === "number") {
      setPrice(respuesta);
      setOpcionesRestantes((prevOpciones) => {
        return prevOpciones.filter(
          ([nombre, { price }]) => !price || price <= respuesta
        );
      });
      setCategoriaIndex(-1);

      return;
    }
    //*Regla 2 - Si el usuario responde con un string en la primera pregunta, se asume que es la forma del auricular
    if (categoriaIndex === -1) {
      setShape(respuesta as string);
      setOpcionesRestantes((prevOpciones) => {
        return prevOpciones.filter(
          ([nombre, { shape }]) => !shape || shape === respuesta
        );
      });
      setCategoriaIndex(0);
      return;
    }

    //*Reglas de caracteristicas - Si el usuario responde la pregunta de caracteristicas, se asume que es la respuesta a la pregunta actual
    const sintomasCategoria = categorias[categoriaIndex].opciones;
    const sintomaActual = sintomasCategoria[sintomaIndex];
    const nuevosHechos = { ...respuestas, [sintomaActual]: respuesta };
    setRespuestas(nuevosHechos);

    if (!sintomaActual) {
      return;
    }

    //*Filtrar las opciones restantes
    // const categoriasRestantes = categorias.slice(categoriaIndex + 1);
    setOpcionesRestantes((prevOpciones) =>
      prevOpciones.filter(([nombre, { features }]) =>
        Object.entries(nuevosHechos).every(
          ([sintoma, respuesta]) =>
            respuesta !== "Sí" || features.includes(sintoma)
        )
      )
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
        <Question
          procesarRespuesta={procesarRespuesta}
          sintoma={categorias[categoriaIndex]?.opciones[sintomaIndex]}
          resetear={resetear}
        />
      )}
      <p>Posibles diagnósticos: {opcionesRestantes.length}</p>
      {diagnostico && (
        <Result diagnostico={diagnostico} earbud={earbud} resetear={resetear} />
      )}
    </div>
  );
}

export default Recomendador;
