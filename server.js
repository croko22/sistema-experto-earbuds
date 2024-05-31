const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.json());

let knownFacts = [];

const knowledgeBase = {
  "True Wireless": ["Inalambrico", "Compacto"],
  "Over-ear": ["Grande", "Comodo"],
  Inalambrico: ["SoundPEATS Air3", "QCY T13"],
  Compacto: ["Anker Soundcore Life P3", "JBL Live Pro+ TWS"],
  Grande: ["Sony WH-1000XM4", "Bose QC35"],
  Comodo: ["Sony WH-1000XM4", "Jabra Elite 85t"],
};

app.get("/recomendar", (req, res) => {
  const tipo = req.query.tipo;
  const respuesta = req.query.respuesta;

  if (!tipo) {
    return res.status(400).json({ error: "Tipo es requerido" });
  }

  if (!respuesta) {
    iniciarDiagnostico(tipo, res);
  } else {
    procesarRespuesta(tipo, respuesta, res);
  }
});

function iniciarDiagnostico(tipo, res) {
  knownFacts = [];
  const sintomas = knowledgeBase[tipo];
  const pregunta = siguientePregunta(sintomas);
  res.json({ pregunta });
}

function procesarRespuesta(tipo, respuesta, res) {
  knownFacts.push(respuesta);
  const diagnostico = obtenerDiagnostico();
  if (diagnostico) {
    res.json({ diagnostico });
  } else {
    const sintomas = knowledgeBase[tipo];
    const pregunta = siguientePregunta(sintomas);
    res.json({ pregunta });
  }
}

function obtenerDiagnostico() {
  for (let key in knowledgeBase) {
    if (Array.isArray(knowledgeBase[key])) {
      const sintomas = knowledgeBase[key];
      if (sintomas.every((sintoma) => knownFacts.includes(sintoma))) {
        return key;
      }
    }
  }
  return null;
}

function siguientePregunta(sintomas) {
  for (let sintoma of sintomas) {
    if (
      !knownFacts.includes(sintoma) &&
      !knownFacts.includes(`no-${sintoma}`)
    ) {
      return sintoma;
    }
  }
  return null;
}

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
