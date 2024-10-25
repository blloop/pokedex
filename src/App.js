import { useEffect, useState } from "react";
import Panel from "./components/panel";
import Window from "./components/window";

function App() {
  const [canUse, setCanUse] = useState(true);
  const [scrollY, setScrollY] = useState(0);

  const [currMon, setCurrmon] = useState(false);
  const [moveData, setMoveData] = useState({});

  useEffect(() => {
    setMoveData({});
  }, []);

  const showPanels = (name) => {
    if (!canUse) return;
    setCanUse(false);
    document.getElementById("panel-left").style.left = "0";
    document.getElementById("panel-right").style.right =
      "calc(-1*(50vw + 50vh))";
    setTimeout(() => {
      document.getElementById("panel-left").style.left = "";
      document.getElementById("panel-right").style.right = "";
    }, 1000);
    setTimeout(() => {
      setCanUse(true);
    }, 1500);
    setTimeout(() => {
      setCurrmon(name);
    }, 500);
  };

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    const position = Math.ceil(
      (scrollTop / (scrollHeight - clientHeight)) * 100,
    );
    setScrollY(position);
  };

  return (
    <div className="flex items-center justify-center size-full p-8 gap-8 bg-tiles overflow-hidden">
      <Panel />
      <div className="flex flex-col justify-center absolute left-0 right-0 top-64 h-24 bg-tilesBlack overflow-hidden pointer-events-none" />
      {currMon ? (
        <>
          <button
            onClick={() => showPanels("")}
            className="bg-red-500 text-white rounded-full px-4 py-2 md:hover:bg-red-700 transition-colors"
          >
            Return
          </button>
          <p>{currMon}</p>
          {/* {moveData[currMon].level.map((e) => (
            <p>{e.name}</p>
          ))} */}
        </>
      ) : (
        <>
          <div className="flex flex-col items-center gap-8 w-1/2 z-10">
            <div className="bg-pokered w-1/2 h-2" />
            <button
              onClick={() => showPanels("pidgey")}
              className="bg-red-500 text-white rounded-full px-4 py-2 md:hover:bg-red-700 transition-colors"
            >
              Pidgey!
            </button>
            <button
              onClick={() => showPanels("caterpie")}
              className="bg-red-500 text-white rounded-full px-4 py-2 md:hover:bg-red-700 transition-colors"
            >
              Caterpie!
            </button>
            <div className="bg-pokered w-1/2 h-2" />

            <Window className="w-72">
              <div className="w-full flex text-gray text-3xl bg-pokegray">
                <p className="drop-shadow-light">• 025</p>
                <p className="flex-grow text-center drop-shadow-light">
                  Pikachu
                </p>
              </div>
              <p className="text-gray text-3xl drop-shadow-light text-center">
                Mouse Pokemon
              </p>
            </Window>

            <div className="w-full p-8 bg-dark font-semibold text-4xl">
              <p className="text-light drop-shadow-dark">
                It occasionally uses an electric shock to recharge a fellow
                Pikachu that is in a weakened state.
              </p>
            </div>
          </div>
          <div
            className="w-1/2 p-4 border-2 border-dark bg-light h-full overflow-y-auto z-10"
            onScroll={handleScroll}
          >
            {Array.from(Array(202).keys()).map((e) => (
              <p className="text-3xl" key={e}>
                No{(e + 1).toString().padStart(3, "0")}
              </p>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// FEFECE light tan
// E7DFA1 dark tan

export default App;
