import { useState } from "react";
import Panel from "./components/panel";
import Window from "./components/window";
import Names from "./data/names.json";
import Title from "./components/title";
import CloseButton from "./assets/close.png";
import ArrowLeft from "./assets/arrow-left.png";
import ArrowRight from "./assets/arrow-right.png";

function App() {
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
    document.getElementById("fade").style.opacity = "1";
    document.getElementById("fade").style.pointerEvents = "auto";
    setTimeout(() => {
      document.getElementById("fade").style.opacity = "0";
      document.getElementById("fade").style.pointerEvents = "none";
    }, 1000);
    setTimeout(() => {
      setScreen(screen);
      setGame(game);
    }, 500);
  };

  const togglePanel = (open) => {
    document.getElementById("panel-button").style.display = "none";
    document.getElementById("panel-left").style.left = open
      ? ""
      : "calc(-1*(50vw + 50vh))";
    document.getElementById("panel-right").style.right = open
      ? ""
      : "calc(-1*(100vw + 100vh))";
    setTimeout(() => {
      document.getElementById("panel-button").style.display = open
        ? "block"
        : "none";
    }, 1000);
  };

  const handleGameChange = (event) => {
    setGame(event.target.value);
  };

  const renderListItem = (name, number) => {
    return (
      <button
        onClick={() => navigate(2, game)}
        className="group relative flex justify-between md:justify-start items-center gap-2 md:gap-4 text-3xl md:text-5xl md:hover:bg-limeDark md:hover:text-limeLight text-pokegray text-shadow-dark bg-pokeblack overflow-visible"
        key={number}
      >
        <div className="w-0 h-0 border-t-[18px] md:border-t-[24px] border-t-transparent border-r-[12px] md:border-r-[12px] border-r-pokeblack md:group-hover:border-r-limeDark border-b-[18px] md:border-b-[24px] border-b-transparent absolute -left-3" />
        <div className="w-0 h-0 border-t-[36px] md:border-t-[48px] border-t-pokeblack border-r-[16px] md:border-r-[25px] border-r-transparent md:group-hover:border-t-limeDark absolute -right-[15px] md:-right-6" />
        <div className="flex size-full max-w-36 relative -left-2 md:group-hover:brightness-150">
          <img className="shrink-0" src={ArrowLeft} alt="" />
          <img className="shrink-0" src={CloseButton} alt="" />
          <img className="shrink-0" src={ArrowRight} alt="" />
        </div>
        <div className="flex">
          <p>{(number + 1).toString().padStart(3, "0")}</p>
          <p className="ml-2 min-w-40 md:min-w-48 text-left">{name}</p>
        </div>
      </button>
    );
  };

  const renderScreen = (screen) => {
    switch (screen) {
      case 1:
        return (
          <>
            <div className="flex flex-col sm:flex-row justify-between gap-4 md:gap-8 px-4 md:px-8 w-full z-10 overflow-auto ">
              <div className="h-full text-center"></div>
              <div className="size-full sm:w-3/5 lg:w-1/2 flex flex-col gap-2 pl-4 pr-6 md:pr-8 overflow-y-auto z-10">
                {Names[game].map((e, i) => renderListItem(e, i))}
              </div>
            </div>
            <div
              id="hexrow"
              className="flex justify-center gap-2 w-full p-2 text-2xl text-white text-center bg-gradient-to-t from-pokeblack to-gray border-t-2 border-pokeblack"
            >
              <button onClick={() => navigate(0, game)}>
                <img
                  src={CloseButton}
                  alt=""
                  className="h-[36px] md:hover:brightness-50 transition-filter"
                />
              </button>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <Window className="w-72">
              <div className="w-full flex text-3xl bg-pokegray">
                <p className="text-shadow-gray">• 025</p>
                <p className="flex-grow text-center text-shadow-gray">
                  Pikachu
                </p>
              </div>
              <p className="text-3xl text-shadow-gray text-center">
                Mouse Pokemon
              </p>
            </Window>
            <div className="w-full p-8 bg-dark text-3xl">
              <p className="text-light text-shadow-gray">
                It occasionally uses an electric shock to recharge a fellow
                Pikachu that is in a weakened state.
              </p>
            </div>
            <div
              id="hexrow"
              className="flex justify-center gap-2 w-full p-2 text-2xl text-white text-center bg-gradient-to-t from-pokeblack to-gray border-t-2 border-pokeblack"
            >
              <div className="w-[60px] h-[36px] p-[2px] bg-white">
                <div className="w-[56px] h-[32px] pt-0.5 bg-gray text-shadow-dark">
                  INFO
                </div>
              </div>
              <div className="w-[60px] h-[36px] p-[2px] bg-gray md:cursor-pointer transition-colors md:hover:bg-white">
                <div className="w-[56px] h-[32px] pt-0.5 bg-black text-shadow-dark transition-colors md:hover:bg-gray">
                  INFO
                </div>
              </div>
              <button onClick={() => navigate(1, game)}>
                <img
                  src={CloseButton}
                  alt=""
                  className="h-[36px] md:hover:brightness-50 transition-filter"
                />
              </button>
            </div>
          </>
        );
      default:
        return (
          <>
            <div className="flex items-center text-4xl">
              <Window innerClass="align-top">
                <div className="w-full flex px-5 py-1 bg-pokegray">
                  <p>Select Game:</p>
                </div>
                <div className="space-y-2 px-4 py-2">
                  <select
                    value={game}
                    onChange={handleGameChange}
                    className="flex flex-col gap-2 z-10 border-2 border-pokeblack"
                  >
                    {gameList.map((e, i) => (
                      <option value={i} key={i}>
                        {e}
                      </option>
                    ))}
                  </select>
                  <button
                    className="bg-red-500 text-white rounded-md px-4 md:hover:bg-red-700 transition-colors"
                    onClick={() => navigate(1, game)}
                  >
                    Enter
                  </button>
                </div>
              </Window>
            </div>
            <div className="h-20" />
            <button
              onClick={() => togglePanel(true)}
              className="bg-red-500 text-white rounded-md text-lg px-4 md:hover:bg-red-700 transition-colors absolute left-4 bottom-4"
            >
              CLOSE
            </button>
          </>
        );
    }
  };

  return (
    <div className="flex flex-col justify-between items-center size-full gap-4 md:gap-8 bg-tiles overflow-hidden">
      <Panel onClick={togglePanel} />
      <div className="absolute left-0 right-0 top-16 h-24 bg-tilesBlack overflow-hidden pointer-events-none z-0" />
      <div
        id="fade"
        className="absolute inset-0 z-20 pointer-events-none bg-[#000] opacity-0 transition-opacity duration-500"
      ></div>
      <Title
        game={game}
        screen={screen}
        gameList={gameList}
        screenList={screenList}
      />
      {renderScreen(screen)}
    </div>
  );
}

export default App;
