import { Drawer } from "vaul";
import Recomendador from "./components/Recomendador";

function App() {
  return (
    <body className="max-h-screen antialiased bg-white">
      <div
        className=" hero min-h-[80vh]"
        style={{ backgroundImage: "url(images/wireless-earbuds.jpg)" }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="max-w-lg text-center hero-content">
          <h1 className="mb-5 text-5xl font-bold">
            Sistema Experto para Auriculares True Wireless
          </h1>
        </div>
      </div>
      <Drawer.Root shouldScaleBackground>
        <Drawer.Trigger className="fixed transform -translate-x-1/2 left-1/2">
          <button className="my-5 btn btn-success">
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
