import React, { useState } from "react";

const knowledgeBase = {
  "Sony WF-1000XM4": ["Bluetooth 5.3", "Conexión Multipunto Continua"],
  "Apple AirPods Pro": ["Bluetooth 5.3", "Conexión Multipunto Continua"],
  "Jabra Elite 85t": ["Bluetooth 5.3", "Conexión Multipunto Continua"],
  "Samsung Galaxy Buds Pro": ["Bluetooth 5.3", "Conexión Multipunto Continua"],
  "Bose QuietComfort Earbuds": [
    "Bluetooth 5.3",
    "Conexión Multipunto Continua",
  ],
};

function Recomendador() {
  const [tipo, setTipo] = useState("");
  const [respuesta, setRespuesta] = useState([]);
  const [pregunta, setPregunta] = useState("");
  const [diagnostico, setDiagnostico] = useState("");

  const iniciarDiagnostico = (tipo) => {
    const sintomas = knowledgeBase[tipo];
    const siguiente = siguientePregunta(sintomas, respuesta);
    setTipo(tipo);
    setPregunta(siguiente);
  };

  const procesarRespuesta = (respuesta) => {
    const nuevosHechos = [...respuesta, pregunta];
    setRespuesta(nuevosHechos);
    const diagnostico = obtenerDiagnostico(nuevosHechos);
    if (diagnostico) {
      setDiagnostico(diagnostico);
    } else {
      const sintomas = knowledgeBase[tipo];
      const siguiente = siguientePregunta(sintomas, nuevosHechos);
      setPregunta(siguiente);
    }
  };

  const siguientePregunta = (sintomas, hechosConocidos) => {
    for (let sintoma of sintomas) {
      if (
        !hechosConocidos.includes(sintoma) &&
        !hechosConocidos.includes(`no-${sintoma}`)
      ) {
        return sintoma;
      }
    }
    return "";
  };

  const obtenerDiagnostico = (hechosConocidos) => {
    for (let key in knowledgeBase) {
      if (Array.isArray(knowledgeBase[key])) {
        const sintomas = knowledgeBase[key];
        if (sintomas.every((sintoma) => hechosConocidos.includes(sintoma))) {
          return key;
        }
      }
    }
    return "";
  };

  return (
    <div>
      {!pregunta && !diagnostico && (
        <div>
          <h3>Elige un tipo de audífono:</h3>
          <div>
            {Object.keys(knowledgeBase).map((tipo) => (
              <button key={tipo} onClick={() => iniciarDiagnostico(tipo)}>
                {tipo}
              </button>
            ))}
          </div>
        </div>
      )}
      {pregunta && (
        <div>
          <h3>{pregunta}</h3>
          <div>
            <button onClick={() => procesarRespuesta([...respuesta, pregunta])}>
              Sí
            </button>
            <button
              onClick={() =>
                procesarRespuesta([...respuesta, `no-${pregunta}`])
              }
            >
              No
            </button>
          </div>
        </div>
      )}
      {diagnostico && <p>Recomendación: {diagnostico}</p>}
    </div>
  );
}

export default Recomendador;
