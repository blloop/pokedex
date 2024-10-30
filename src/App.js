import { useState } from "react";
import Panel from "./components/panel";
import Window from "./components/window";
import Names from "./data/names.json";
import Title from "./components/title";

function App() {
  const [canUse, setCanUse] = useState(true);
  const [game, setGame] = useState(0); // Corresponds to gameList
  const [screen, setScreen] = useState(0); // Corresponds to screenList

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

  const screenList = ["SETTINGS", "POKEDEX", "INFO", "MOVES", "STATS", "DATA"];

  const navigate = (screen, game) => {
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
      setScreen(screen);
      setGame(game);
    }, 500);
  };

  const renderScreen = (screen) => {
    switch (screen) {
      case 1:
        return (
          <>
            <div className="flex items-center justify-center gap-8 w-full z-10 overflow-auto ">
              <button
                className="bg-red-500 text-white rounded-full px-4 py-2 md:hover:bg-red-700 transition-colors"
                onClick={() => navigate(0, game)}
              >
                Change Game
              </button>
              <button
                className="bg-red-500 text-white rounded-full px-4 py-2 md:hover:bg-red-700 transition-colors"
                onClick={() => navigate(2, game)}
              >
                Pikachu
              </button>
              <div className="p-4 bNames-2 bNames-dark bg-light h-full overflow-y-auto z-10">
                {Names[game].map((e, i) => (
                  <p className="text-3xl" key={e}>
                    No{(i + 1).toString().padStart(3, "0")}: {e}
                  </p>
                ))}
              </div>
            </div>
            <div
              id="hexrow"
              className="flex justify-center gap-2 w-full py-2 text-2xl text-white text-center bg-gradient-to-t from-pokeblack to-gray border-t-2 border-pokeblack"
            >
              <div className="w-[60px] h-[36px] p-[2px] bg-white">
                <div className="w-[56px] h-[32px] pt-0.5 bg-gray">INFO</div>
              </div>
              <div className="w-[60px] h-[36px] p-[2px] bg-gray cursor-pointer transition-colors hover:bg-white">
                <div className="w-[56px] h-[32px] pt-0.5 bg-black transition-colors hover:bg-gray">
                  INFO
                </div>
              </div>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <button
              className="bg-red-500 text-white rounded-full px-4 py-2 md:hover:bg-red-700 transition-colors"
              onClick={() => navigate(1, game)}
            >
              Back to Pokedex
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
          </>
        );
      default:
        return (
          <div className="flex items-center">
            <button
              onClick={() => navigate(0, game)}
              className="bg-red-500 text-white rounded-full px-4 py-2 md:hover:bg-red-700 transition-colors"
            >
              Refresh
            </button>
            <div className="flex flex-col gap-2 z-10">
              {gameList.map((e, i) => (
                <button
                  key={i}
                  onClick={() => navigate(1, i)}
                  className="bg-red-500 text-white rounded-full px-4 py-2 md:hover:bg-red-700 transition-colors"
                >
                  {e}
                </button>
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col justify-between items-center size-full gap-8 bg-tiles overflow-hidden">
      <Panel />
      <div className="absolute left-0 right-0 top-16 h-24 bg-tilesBlack overflow-hidden pointer-events-none z-0" />
      <Title game={game} gameList={gameList} screenList={screenList} />
      {renderScreen(screen)}
    </div>
  );
}

export default App;
