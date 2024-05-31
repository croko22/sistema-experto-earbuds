import { useState } from "react";

const knowledgeBase = {
  "Sony WF-1000XM4": {
    features: [
      "Bluetooth 5.3",
      "Conexión Multipunto Continua",
      "Cancelación de Ruido Activa",
      "Sonido de Alta Fidelidad",
      "Batería de Larga Duración",
      "Diseño Ergonómico",
    ],
    price: 250,
    shape: "Bud",
  },
  "Apple AirPods Pro": {
    features: [
      "Bluetooth 5.3",
      "Conexión Multipunto Continua",
      "Cancelación de Ruido Activa",
      "Modo Transparencia",
      "Sonido Envolvente",
      "Ajuste Personalizado",
    ],
    price: 249,
    shape: "Stem",
  },
  "Jabra Elite 85t": {
    features: [
      "Bluetooth 5.2",
      "Conexión Multipunto Continua",
      "Cancelación de Ruido Activa",
      "HearThrough",
      "Sonido Personalizable",
      "Ajuste Cómodo",
    ],
    price: 230,
    shape: "Bud",
  },
  "Samsung Galaxy Buds Pro": {
    features: [
      "Bluetooth 5.1",
      "Conexión Multipunto Continua",
      "Cancelación de Ruido Activa",
      "Sonido Envolvente con Dolby Atmos",
      "Modo Juego de Baja Latencia",
      "Carga Inalámbrica",
    ],
    price: 200,
    shape: "Bud",
  },
  "Bose QuietComfort Earbuds": {
    features: [
      "Bluetooth 5.1",
      "Cancelación de Ruido Activa Líder en la Industria",
      "Modo de Conciencia Natural",
      "Sonido Realista",
      "Batería de Larga Duración",
      "Ajuste Personalizado",
    ],
    price: 280,
    shape: "Bud",
  },
};

const categorias = [
  {
    categoria: "Bluetooth",
    opciones: ["Bluetooth 5.3", "Bluetooth 5.2", "Bluetooth 5.1"],
  },
  {
    categoria: "Conexión",
    opciones: ["Conexión Multipunto Continua"],
  },
  {
    categoria: "Cancelacion",
    opciones: [
      "Cancelación de Ruido Activa",
      "Cancelación de Ruido Activa Líder en la Industria",
    ],
  },
  {
    categoria: "Sonido",
    opciones: [
      "Sonido de Alta Fidelidad",
      "Sonido Envolvente",
      "Sonido Envolvente con Dolby Atmos",
      "Sonido Realista",
      "Sonido Personalizable",
    ],
  },
  {
    categoria: "Bateria",
    opciones: ["Batería de Larga Duración", "Carga Inalámbrica"],
  },
  {
    categoria: "Diseno",
    opciones: ["Diseño Ergonómico", "Ajuste Personalizado", "Ajuste Cómodo"],
  },
  {
    categoria: "Modo",
    opciones: [
      "Modo Transparencia",
      "Modo de Conciencia Natural",
      "Modo Juego de Baja Latencia",
    ],
  },
];

const Unique_Shapes_of_Earbuds = ["Bud", "Stem", "Hook"];
const Price_Range_of_Earbuds = [20.0, 405.0];

function Recomendador() {
  const [respuestas, setRespuestas] = useState({});
  const [categoriaIndex, setCategoriaIndex] = useState(-2);
  const [sintomaIndex, setSintomaIndex] = useState(0);
  const [diagnostico, setDiagnostico] = useState("");
  const [price, setPrice] = useState(null);
  const [shape, setShape] = useState(null);

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
        <div>
          <h3>Seleccione el rango de precio:</h3>
          <div>
            <button
              className="px-4 py-2 mr-2 text-white bg-red-500"
              onClick={() => procesarRespuesta(100)}
            >
              Hasta $100
            </button>
            <button
              className="px-4 py-2 mr-2 text-white bg-blue-500"
              onClick={() => procesarRespuesta(200)}
            >
              Hasta $200
            </button>
            <button
              className="px-4 py-2 mr-2 text-white bg-green-500"
              onClick={() => procesarRespuesta(300)}
            >
              Hasta $300
            </button>
            <button
              className="px-4 py-2 mr-2 text-white bg-yellow-500"
              onClick={() => procesarRespuesta(400)}
            >
              Hasta $400
            </button>
          </div>
        </div>
      )}
      {categoriaIndex === -1 && (
        <div>
          <h3>Seleccione la forma del auricular:</h3>
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
      )}
      {categoriaIndex >= 0 && !diagnostico && (
        <div>
          <h3>
            ¿El audífono tiene{" "}
            {categorias[categoriaIndex].opciones[sintomaIndex]}?
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
        <div>
          <p>Recomendación: {diagnostico}</p>
          <button onClick={resetear}>Reiniciar Diagnóstico</button>
        </div>
      )}
    </div>
  );
}

export default Recomendador;
