import { useState } from "react";
import Panel from "./components/panel";
import Ball from "./ball.png";

function App() {
  const [canUse, setCanUse] = useState(true);
  const [scrollY, setScrollY] = useState(0);

  const showPanels = () => {
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
      <div className="flex flex-col justify-center absolute right-[55vw] h-screen w-[calc(max(100vw,100vh))] opacity-25 overflow-hidden pointer-events-none">
        <img
          src={Ball}
          className="w-[calc(max(100vw,100vh))] h-[calc(max(100vw,100vh))]"
          alt=""
          style={{ transform: `rotate(${scrollY * 5}deg)` }}
        />
      </div>
      <div className="flex flex-col items-center gap-8 w-1/2 z-10">
        <div className="bg-[#e7dfa1] w-1/2 h-2" />
        <button
          onClick={showPanels}
          className="bg-red-500 text-white rounded-full px-4 py-2 md:hover:bg-red-700 transition-colors"
        >
          Refresh!
        </button>
        <div className="bg-[#e7dfa1] w-1/2 h-2" />
        <div className="w-full p-8 bg-[#efefef] text-4xl">
          <p className="text-dark drop-shadow-gray">
            025 Pikachu: Mouse Pokemon
          </p>
        </div>
        <div className="w-full p-8 bg-dark font-semibold text-4xl">
          <p className="text-light drop-shadow-gray">
            It occasionally uses an electric shock to recharge a fellow Pikachu
            that is in a weakened state.
          </p>
        </div>
      </div>
      <div
        className="w-1/2 p-4 border-2 border-dark bg-light h-full overflow-y-auto z-10"
        onScroll={handleScroll}
      >
        {Array.from(Array(202).keys()).map((e) => (
          <p className="text-3xl" key={e}>
            No{e.toString().padStart(3, "0")}
          </p>
        ))}
      </div>
    </div>
  );
}

// FEFECE light tan
// E7DFA1 dark tan

export default App;
