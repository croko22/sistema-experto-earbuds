import { Drawer } from "vaul";
import Recomendador from "./components/Recomendador";

function App() {
  return (
    <body className="max-h-screen antialiased bg-white">
      <h1 className="mt-8 mb-4 text-4xl font-light text-center">
        Sistema Experto para Auriculares True Wireless
      </h1>
      <img
        src="wireless-earbuds.jpg"
        alt="Placeholder"
        className="object-cover w-full rounded-md h-96"
      />
      <Drawer.Root shouldScaleBackground>
        <Drawer.Trigger
          asChild
          className="fixed transform -translate-x-1/2 left-1/2"
        >
          <button className="px-8 py-4 mt-10 text-2xl text-white transition-colors duration-200 bg-blue-500 rounded-lg shadow-lg hover:bg-blue-600">
            Encuentra tus auriculares ideales
          </button>
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40" />
          <Drawer.Content className="bg-zinc-100 flex flex-col rounded-t-[10px] h-[96%] mt-24 fixed bottom-0 left-0 right-0">
            <div className="p-4 bg-white rounded-t-[10px] flex-1">
              <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-8" />
              <div className="max-w-md mx-auto">
                <Drawer.Title className="mb-4 text-3xl font-medium">
                  Sistema Experto para Auriculares True Wireless
                </Drawer.Title>
                <p className="mb-2 text-zinc-600">
                  Te haremos algunas preguntas para encontrar los auriculares
                  que mejor se adaptan a tus necesidades.
                </p>
                {/* //* QUESTION */}
                <Recomendador />
              </div>
            </div>
            <div className="p-4 mt-auto border-t bg-zinc-100 border-zinc-200">
              <Drawer.Close className="px-4 py-2 text-white rounded-md bg-zinc-500">
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
