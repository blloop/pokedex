import { useState } from "react";
import Panel from "./components/panel";

function App() {
  const [canUse, setCanUse] = useState(true);

  const showPanels = () => {
    if (!canUse) return;
    setCanUse(false);
    document.getElementById("panel-top").style.top = "0";
    document.getElementById("panel-bottom").style.bottom = "0";
    setTimeout(() => {
      document.getElementById("panel-top").style.top = "";
      document.getElementById("panel-bottom").style.bottom = "";
    }, 1000);
    setTimeout(() => {
      setCanUse(true);
    }, 1500);
  };

  return (
    <div className="flex items-center justify-center size-full">
      <Panel />
      <button
        onClick={showPanels}
        className="bg-red-500 text-white rounded-full px-4 py-2 md:hover:bg-red-700 transition-colors"
      >
        Animate!
      </button>
    </div>
  );
}

export default App;
