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
    <div className="flex items-center justify-center size-full p-8 bg-[#fefece] overflow-hidden">
      <Panel />
      <div className="flex flex-col items-center gap-8 w-1/2">
        <div className="bg-[#e7dfa1] w-1/2 h-2" />
        <button
          onClick={showPanels}
          className="bg-red-500 text-white rounded-full px-4 py-2 md:hover:bg-red-700 transition-colors"
        >
          Refresh!
        </button>
        <div className="bg-[#e7dfa1] w-1/2 h-2" />
      </div>
      <div
        className="w-1/2 p-4 border-2 border-black h-full overflow-y-auto z-10"
        onScroll={handleScroll}
      >
        {Array.from(Array(202).keys()).map((e) => (
          <p className="text-3xl" key={e}>
            No{e.toString().padStart(3, "0")}
          </p>
        ))}
      </div>
      <div className="absolute right-[5vw] top-[25vh] w-[50vh] opacity-25 overflow-hidden">
        <img
          src={Ball}
          className="size-full"
          alt=""
          style={{ transform: `rotate(${scrollY * 5}deg)` }}
        />
      </div>
    </div>
  );
}

// FEFECE light tan
// E7DFA1 dark tan

export default App;
