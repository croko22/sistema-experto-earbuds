import React, { useState } from "react";

const knowledgeBase = {
  // Updated with more features and values
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

const sintomas = [
  "Bluetooth 5.3",
  "Bluetooth 5.2",
  "Bluetooth 5.1",
  "Cancelación de Ruido Activa",
  "Cancelación de Ruido Activa Líder en la Industria",
  "Sonido de Alta Fidelidad",
  "Sonido Envolvente",
  "Sonido Realista",
  "Sonido Personalizable",
  "Batería de Larga Duración",
  "Carga Inalámbrica",
  "Diseño Ergonómico",
  "Ajuste Personalizado",
  "Ajuste Cómodo",
  "Modo Transparencia",
  "Modo de Conciencia Natural",
  "Modo Juego de Baja Latencia",
];

function Recomendador() {
  const [respuestas, setRespuestas] = useState({});
  const [preguntaIndex, setPreguntaIndex] = useState(0);
  const [diagnostico, setDiagnostico] = useState("");

  const procesarRespuesta = (respuesta) => {
    const preguntaActual = `¿El audífono tiene ${sintomas[preguntaIndex]}?`;
    const nuevosHechos = { ...respuestas, [preguntaActual]: respuesta };
    setRespuestas(nuevosHechos);

    if (preguntaIndex + 1 < sintomas.length) {
      setPreguntaIndex(preguntaIndex + 1);
    } else {
      const diagnostico = obtenerDiagnostico(nuevosHechos);
      setDiagnostico(diagnostico);
    }
  };

  const obtenerDiagnostico = (hechosConocidos) => {
    for (let key in knowledgeBase) {
      const audifonoSintomas = knowledgeBase[key];
      if (
        audifonoSintomas.every(
          (sintoma) =>
            hechosConocidos[`¿El audífono tiene ${sintoma}?`] === "Sí"
        )
      ) {
        return key;
      }
    }
    return "No se pudo determinar el audífono recomendado.";
  };

  return (
    <div>
      {preguntaIndex < sintomas.length && !diagnostico && (
        <div>
          <h3>¿El audífono tiene {sintomas[preguntaIndex]}?</h3>
          <div>
            <button onClick={() => procesarRespuesta("Sí")}>Sí</button>
            <button onClick={() => procesarRespuesta("No")}>No</button>
          </div>
        </div>
      )}
      {diagnostico && <p>Recomendación: {diagnostico}</p>}
    </div>
  );
}

export default Recomendador;
