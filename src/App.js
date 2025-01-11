import { useCallback, useRef, useState } from "react";
import Panel from "./components/panel";
import Window from "./components/window";
import Names from "./data/names.json";
import Mapping from "./data/mapping.json";
import Title from "./components/title";
import CloseButton from "./assets/close.png";
import ArrowLeft from "./assets/arrow-left.png";
import ArrowRight from "./assets/arrow-right.png";
import Frame from "./assets/frame.png";
import { cn } from "./utils";

// TODO: Check if index is selected when clicking list item
// and set index if not equal

// Sprites and icons credit: https://veekun.com/dex/downloads

function App() {
  const [index, setIndex] = useState(0);
  const [game, setGame] = useState(0); // Corresponds to gameList
  const [screen, setScreen] = useState(0); // Corresponds to screenList
  // const [moveData, setMoveData] = useState({});

  // useEffect(() => {
  //   setMoveData({});
  // }, []);

  const scrollRef = useRef(null);
  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;

    const container = scrollRef.current;
    const scrollTop = container.scrollTop;
    const clientHeight = container.clientHeight;
    const scrollHeight = container.scrollHeight;

    // Calculate the proportional target index based on the current scroll position
    const proportionalIndex =
      (scrollTop / (scrollHeight - clientHeight)) * (Names[game].length - 1);
    const targetIndex = Math.ceil(proportionalIndex);
    setIndex(targetIndex);
  }, [game]);

  const setScroll = (create) => {
    const container = scrollRef.current;
    if (container) {
      if (create) {
        setIndex(0);
        container.addEventListener("scroll", handleScroll);
      } else {
        container.removeEventListener("scroll", handleScroll);
      }
    }
  };

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
    setScroll(false);
    document.getElementById("fade").style.opacity = "1";
    document.getElementById("fade").style.pointerEvents = "auto";
    setTimeout(() => {
      document.getElementById("fade").style.opacity = "0";
      document.getElementById("fade").style.pointerEvents = "none";
      setScroll(true);
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
        onClick={() => {
          if (index === number) {
            navigate(2, game);
          } else {
            setIndex(number);
          }
        }}
        className={cn(
          "group relative flex justify-between md:justify-start items-center gap-2 md:gap-4 md:hover:bg-limeDark md:hover:text-limeLight text-pokegray text-shadow-dark bg-pokeblack overflow-visible",
          number === index ? "bg-limeDark text-limeLight" : "",
        )}
        key={number}
      >
        <div
          className={cn(
            "w-0 h-0 border-t-[18px] md:border-t-[24px] border-t-transparent border-r-[12px] md:border-r-[12px] border-r-pokeblack md:group-hover:border-r-limeDark border-b-[18px] md:border-b-[24px] border-b-transparent absolute -left-3",
            number === index ? "border-r-limeDark" : "",
          )}
        />
        <div
          className={cn(
            "w-0 h-0 border-t-[36px] md:border-t-[48px] border-t-pokeblack border-r-[16px] md:border-r-[25px] border-r-transparent md:group-hover:border-t-limeDark absolute -right-[15px] md:-right-6",
            number === index ? "border-t-limeDark" : "",
          )}
        />
        <div
          className={cn(
            "relative -left-2 -top-0 shrink-0 h-8 md:h-12 md:group-hover:brightness-125",
            number === index ? "brightness-125" : "",
          )}
        >
          <img className="absolute left-0 h-full" src={ArrowLeft} alt="" />
          <img className="absolute left-12 h-full" src={ArrowRight} alt="" />
          <div className="w-16 h-full overflow-hidden">
            <img
              className="relative -top-3 h-12 md:h-16 object-cover z-10"
              src={`/icons/${Mapping[game][number]}.png`}
              alt=""
            />
          </div>
        </div>
        <div className="flex text-pokegray text-3xl md:text-5xl">
          <p>{(number + 1).toString().padStart(3, "0")}</p>
          <p className="ml-2 min-w-40 md:min-w-48 text-left">{name}</p>
        </div>
      </button>
    );
  };

  const renderScreen = () => {
    switch (screen) {
      case 1:
        return (
          <>
            <div className="z-10 relative flex flex-col sm:flex-row items-center justify-between gap-4 md:gap-8 px-4 md:px-8 size-full overflow-y-auto">
              <div className="relative flex flex-col justify-center items-center w-auto sm:w-full h-96 sm:h-auto">
                <img src={Frame} className="size-full max-w-96" alt="" />
                {Array.from(Array(Mapping[game].length).keys()).map(e => 
                  <img
                    key={e}
                    data-temp={e}
                    hidden={(e) !== index}
                    alt={Names[game][e]}
                    src={`/sprites/${Mapping[game][e]}.png`}
                    className="absolute w-full max-w-96 scale-x-[-1]"
                  />
                )}
              </div>
              <div
                ref={scrollRef}
                className="size-full sm:shrink-0 sm:w-3/5 lg:w-1/2 flex flex-col gap-2 pl-4 pr-6 md:pr-8 overflow-y-auto z-10"
              >
                {Names[game].map((e, i) => renderListItem(e, i))}
              </div>
            </div>
            <div className="absolute z-0 h-64 w-full top-[calc(50vh-8rem)] left-0 object-contain bg-stripes bg-contain bg-repeat-x"></div>
            <div
              id="hexrow"
              className="flex justify-end gap-2 w-full px-4 py-2 text-2xl text-white text-center bg-gradient-to-t from-pokeblack to-gray border-t-2 border-pokeblack"
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
            <div className="flex items-center">
              <img
                alt={Names[game][index]}
                src={`/sprites/${Mapping[game][index]}.png`}
                className="w-72 scale-x-[-1]"
              />
              <Window className="z-10 w-72">
                <div className="w-full flex text-3xl bg-pokegray">
                  <p className="text-shadow-gray">• {index + 1}</p>
                  <p className="flex-grow text-center text-shadow-gray">
                    {Names[game][index]}
                  </p>
                </div>
                <p className="text-3xl text-shadow-gray text-center">
                  Mouse Pokemon
                </p>
                <p className="text-3xl text-shadow-gray text-center">
                  ELECTR
                </p>
                <div className="relative flex justify-between w-full text-3xl text-shadow-gray">
                  <div className="absolute top-4 w-full h-2 bg-pokegray rounded-full" />
                  <p className="z-10 pl-8">HT</p>
                  <p className="z-10">1'04"</p>
                </div>
                <div className="relative flex justify-between w-full text-3xl text-shadow-gray">
                  <div className="absolute top-4 w-full h-2 bg-pokegray rounded-full" />
                  <p className="z-10 pl-8">WT</p>
                  <p className="z-10">13.2 lbs.</p>
                </div>
              </Window>
            </div>
            <Window innerClass="!p-0">
              <div className="w-full p-8 bg-dark text-3xl">
                <p className="text-light text-shadow-gray">
                  It occasionally uses an electric shock to recharge a fellow
                  Pikachu that is in a weakened state.
                </p>
              </div>
            </Window>
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
            <div className="z-10 flex items-center text-4xl">
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
            <div
              id="hexrow"
              className="flex justify-end gap-2 w-full px-4 py-2 text-2xl text-white text-center bg-gradient-to-t from-pokeblack to-gray border-t-2 border-pokeblack"
            >
              <button onClick={() => togglePanel(true)}>
                <img
                  src={CloseButton}
                  alt=""
                  className="h-[36px] md:hover:brightness-50 transition-filter"
                />
              </button>
            </div>
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
      {renderScreen()}
    </div>
  );
}

export default App;
