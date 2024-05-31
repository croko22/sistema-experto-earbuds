import React, { useState } from "react";

const knowledgeBase = {
  "True Wireless": ["Inalambrico", "Compacto"],
  "Over-ear": ["Grande", "Comodo"],
  Inalambrico: ["SoundPEATS Air3", "QCY T13"],
  Compacto: ["Anker Soundcore Life P3", "JBL Live Pro+ TWS"],
  Grande: ["Sony WH-1000XM4", "Bose QC35"],
  Comodo: ["Sony WH-1000XM4", "Jabra Elite 85t"],
};

function Recomendador() {
  const [tipo, setTipo] = useState("");
  const [respuesta, setRespuesta] = useState("");
  const [pregunta, setPregunta] = useState("");
  const [diagnostico, setDiagnostico] = useState("");

  const iniciarDiagnostico = (tipo) => {
    const sintomas = knowledgeBase[tipo];
    const siguiente = siguientePregunta(sintomas);
    setTipo(tipo);
    setPregunta(siguiente);
  };

  const procesarRespuesta = () => {
    if (!respuesta) return;
    const nuevosHechos = [...respuesta];
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
          <input
            type="text"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            placeholder="Tipo de audífono"
          />
          <button onClick={() => iniciarDiagnostico(tipo)}>
            Iniciar Diagnóstico
          </button>
        </div>
      )}
      {pregunta && (
        <div>
          <p>{pregunta}</p>
          <input
            type="text"
            value={respuesta}
            onChange={(e) => setRespuesta(e.target.value)}
          />
          <button onClick={procesarRespuesta}>Enviar</button>
        </div>
      )}
      {diagnostico && <p>Recomendación: {diagnostico}</p>}
    </div>
  );
}

export default Recomendador;
