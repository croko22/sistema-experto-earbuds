import { useState } from "react";
import { Drawer } from "vaul";
import Question from "./components/Question";
import Recomendador from "./components/Recomendador";

function App() {
  const [start, setStart] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [questions, setQuestions] = useState([
    {
      question: "¿Prefieres auriculares con cancelación de ruido?",
      answers: ["Sí", "No"],
    },
    {
      question: "¿Cuál es tu presupuesto?",
      answers: ["Menos de $50", "$50 - $100", "Más de $100"],
    },
    {
      question: "¿Qué marca prefieres?",
      answers: ["Apple", "Samsung", "Sony", "JBL", "Otras"],
    },
    {
      question: "¿Qué tipo de auriculares prefieres?",
      answers: ["In-ear", "On-ear", "Over-ear"],
    },
    {
      question: "¿Qué color prefieres?",
      answers: [" Blanco", "Gris", "Negro"],
    },
  ]);
  const [question, setQuestion] = useState(questions[questionNumber]);

  const handleAnswer = (question: string, answer: string) => {
    // Add logic to handle the answer here
    console.log(question, answer);
    if (questionNumber + 1 < questions.length)
      setQuestionNumber(questionNumber + 1);
    else console.log("Last question");
    setQuestion(questions[questionNumber]);
  };

  const startSystem = () => {
    setStart(true);
    setQuestionNumber(0);

    // Add logic to start the expert system here
  };
  return (
    <body className="antialiased bg-white max-h-screen">
      <h1 className="text-4xl font-light text-center mt-8 mb-4">
        Sistema Experto para Auriculares True Wireless
      </h1>
      <img
        src="wireless-earbuds.jpg"
        alt="Placeholder"
        className="w-full h-96 object-cover rounded-md"
      />
      <Drawer.Root shouldScaleBackground>
        <Drawer.Trigger
          asChild
          className="fixed left-1/2 transform -translate-x-1/2"
        >
          <button
            className="bg-blue-500 text-white text-2xl px-8 py-4 mt-10 rounded-lg shadow-lg hover:bg-blue-600 transition-colors duration-200"
            onClick={startSystem}
          >
            Encuentra tus auriculares ideales
          </button>
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40" />
          <Drawer.Content className="bg-zinc-100 flex flex-col rounded-t-[10px] h-[96%] mt-24 fixed bottom-0 left-0 right-0">
            <div className="p-4 bg-white rounded-t-[10px] flex-1">
              <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-8" />
              <div className="max-w-md mx-auto">
                <Drawer.Title className="font-medium mb-4">
                  Sistema Experto para Auriculares True Wireless
                </Drawer.Title>
                <p className="text-zinc-600 mb-2">
                  Te haremos algunas preguntas para encontrar los auriculares
                  que mejor se adaptan a tus necesidades.
                </p>
                {/* //* QUESTION */}
                <Recomendador />
                <Question
                  questionNumber={questionNumber.toString()}
                  questionText={question.question}
                  answers={question.answers}
                  handleAnswer={handleAnswer}
                />
              </div>
            </div>
            <div className="p-4 bg-zinc-100 border-t border-zinc-200 mt-auto">
              <Drawer.Close
                className="bg-zinc-500 text-white px-4 py-2 rounded-md"
                onClick={() => setStart(false)}
              >
                Cerrar sistema experto
              </Drawer.Close>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </body>
  );
}

export default App;
