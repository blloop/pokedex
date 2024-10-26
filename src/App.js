import { useState } from "react";
import Panel from "./components/panel";
import Window from "./components/window";
import Names from "./data/names.json";

function App() {
  const [game, setGame] = useState(-1);
  const [canUse, setCanUse] = useState(true);

  // const [currMon, setCurrmon] = useState(false);
  // const [moveData, setMoveData] = useState({});

  // useEffect(() => {
  //   setMoveData({});
  // }, []);

  const gameList = [
    "Red/Blue",
    "Yellow",
    "Gold/Silver",
    "Crystal",
    "Ruby/Sapphire",
    "FireRed/LeafGreen",
    "Emerald",
    "Diamond/Pearl",
    "Platinum",
    "Heartgold/Soulsilver",
    "Black/White",
    "Black2/White2",
  ];

  const setScreen = (game) => {
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
      setGame(game);
    }, 500);
  };

  return (
    <div className="flex items-center justify-center size-full p-8 gap-8 bg-tiles overflow-hidden">
      <Panel />
      <div className="absolute left-0 right-0 top-64 h-24 bg-tilesBlack overflow-hidden pointer-events-none z-0" />
      {game < 0 ? (
        <>
          <button
            onClick={() => setScreen(-1)}
            className="bg-red-500 text-white rounded-full px-4 py-2 md:hover:bg-red-700 transition-colors"
          >
            Refresh
          </button>
          {/* {moveData[currMon].level.map((e) => (
            <p>{e.name}</p>
          ))} */}
          <div className="flex flex-col gap-2 z-10">
            {gameList.map((e, i) => (
              <button
                key={i}
                onClick={() => setScreen(i)}
                className="bg-red-500 text-white rounded-full px-4 py-2 md:hover:bg-red-700 transition-colors"
              >
                {e}
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col items-center gap-8 w-1/2 z-10">
            <Window className="w-fit text-3xl">
              <p className="px-2 drop-shadow-gray">Game: {gameList[game]}</p>
            </Window>
            <button
              className="bg-red-500 text-white rounded-full px-4 py-2 md:hover:bg-red-700 transition-colors"
              onClick={() => setScreen(-1)}
            >
              Change Game
            </button>
            <Window className="w-72">
              <div className="w-full flex text-3xl bg-pokegray">
                <p className="drop-shadow-gray">• 025</p>
                <p className="flex-grow text-center drop-shadow-gray">
                  Pikachu
                </p>
              </div>
              <p className="text-3xl drop-shadow-gray text-center">
                Mouse Pokemon
              </p>
            </Window>
            <div className="w-full p-8 bg-dark font-semibold text-3xl">
              <p className="text-light drop-shadow-gray">
                It occasionally uses an electric shock to recharge a fellow
                Pikachu that is in a weakened state.
              </p>
            </div>
          </div>
          <div className="w-1/2 p-4 bNames-2 bNames-dark bg-light h-full overflow-y-auto z-10">
            {Names[game].map((e, i) => (
              <p className="text-3xl" key={e}>
                No{(i + 1).toString().padStart(3, "0")}: {e}
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
