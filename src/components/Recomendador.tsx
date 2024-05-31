import React, { useState } from "react";

const knowledgeBase = {
  "Sony WF-1000XM4": [
    "Bluetooth 5.3",
    "Conexión Multipunto Continua",
    "Cancelación de Ruido Activa",
    "Sonido de Alta Fidelidad",
    "Batería de Larga Duración",
    "Diseño Ergonómico",
  ],
  "Apple AirPods Pro": [
    "Bluetooth 5.3",
    "Conexión Multipunto Continua",
    "Cancelación de Ruido Activa",
    "Modo Transparencia",
    "Sonido Envolvente",
    "Ajuste Personalizado",
  ],
  "Jabra Elite 85t": [
    "Bluetooth 5.2",
    "Conexión Multipunto Continua",
    "Cancelación de Ruido Activa",
    "HearThrough",
    "Sonido Personalizable",
    "Ajuste Cómodo",
  ],
  "Samsung Galaxy Buds Pro": [
    "Bluetooth 5.2",
    "Conexión Multipunto Continua",
    "Cancelación de Ruido Activa",
    "Sonido Envolvente con Dolby Atmos",
    "Modo Juego de Baja Latencia",
    "Carga Inalámbrica",
  ],
  "Bose QuietComfort Earbuds": [
    "Bluetooth 5.1",
    "Cancelación de Ruido Activa Líder en la Industria",
    "Modo de Conciencia Natural",
    "Sonido Realista",
    "Batería de Larga Duración",
    "Ajuste Personalizado",
  ],
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

function Recomendador() {
  const [respuestas, setRespuestas] = useState({});
  const [categoriaIndex, setCategoriaIndex] = useState(0);
  const [sintomaIndex, setSintomaIndex] = useState(0);
  const [diagnostico, setDiagnostico] = useState("");

  const procesarRespuesta = (respuesta) => {
    const sintomasCategoria = categorias[categoriaIndex].opciones;
    const sintomaActual = sintomasCategoria[sintomaIndex];
    const nuevosHechos = { ...respuestas, [sintomaActual]: respuesta };
    setRespuestas(nuevosHechos);

    // Filtrar la base de conocimientos según las respuestas actuales y las categorías restantes
    const categoriasRestantes = categorias.slice(categoriaIndex + 1);
    const opcionesRestantes = Object.entries(knowledgeBase).filter(
      ([_, audifonoSintomas]) =>
        sintomasCategoria.some(
          (sintoma) =>
            nuevosHechos[sintoma] === "Sí" && audifonoSintomas.includes(sintoma)
        ) &&
        categoriasRestantes.every((categoria) =>
          categoria.opciones.some(
            (opcion) =>
              nuevosHechos[opcion] === "No" ||
              !nuevosHechos.hasOwnProperty(opcion)
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
      // Saltar a la siguiente categoría si no hay más síntomas en la categoría actual
      setCategoriaIndex(categoriaIndex + 1);
      setSintomaIndex(0);
    }

    if (respuesta === "Sí") {
      // Si la respuesta es "Sí", saltar a la siguiente categoría
      setCategoriaIndex(categoriaIndex + 1);
    }
  };

  const obtenerDiagnostico = (hechosConocidos) => {
    for (let key in knowledgeBase) {
      const audifonoSintomas = knowledgeBase[key];
      if (
        audifonoSintomas.every((sintoma) => hechosConocidos[sintoma] === "Sí")
      ) {
        return key;
      }
    }
    return "No se pudo determinar el audífono recomendado.";
  };

  const resetear = () => {
    setRespuestas({});
    setCategoriaIndex(0);
    setSintomaIndex(0);
    setDiagnostico("");
  };

  return (
    <div>
      {!diagnostico && (
        <div>
          <h3>
            ¿El audífono tiene{" "}
            {categorias[categoriaIndex].opciones[sintomaIndex]}?
          </h3>
          <div>
            <button onClick={() => procesarRespuesta("Sí")}>Sí</button>
            <button onClick={() => procesarRespuesta("No")}>No</button>
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
