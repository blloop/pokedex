import { useCallback, useRef, useState } from "react";
import { cn } from "./utils";

import Names from "./data/names.json";
import Mapping from "./data/mapping.json";
import Data from "./data/data.json";
import Info from "./data/info.json";
import MoveData from "./data/moveData.json";
import Moves0 from "./data/moves-00.json";
import Moves1 from "./data/moves-01.json";
import Moves2 from "./data/moves-02.json";
import Moves3 from "./data/moves-03.json";
import Moves4 from "./data/moves-04.json";
import Moves5 from "./data/moves-05.json";
import Moves6 from "./data/moves-06.json";
import Moves7 from "./data/moves-07.json";
import Moves8 from "./data/moves-08.json";
import Moves9 from "./data/moves-09.json";
import Moves10 from "./data/moves-10.json";
import Moves11 from "./data/moves-11.json";

import Panel from "./components/panel";
import Window from "./components/window";
import Title from "./components/title";
import TypeCell from "./components/typeCell";
import StatList from "./components/statList";
import InfoList from "./components/infoList";

import BackButton from "./assets/back.png";
import CloseButton from "./assets/close.png";
import ArrowLeft from "./assets/arrow-left.png";
import ArrowRight from "./assets/arrow-right.png";
import ArrowUp from "./assets/arrow-up.png";
import ArrowDown from "./assets/arrow-down.png";
import Frame from "./assets/frame.png";
import CellPhysical from "./assets/cell-physical.png";
import CellSpecial from "./assets/cell-special.png";
import CellStatus from "./assets/cell-status.png";

// Sprites and icons credit: https://veekun.com/dex/downloads

const FADE_MS = 250;

const MovesList = [
  Moves0,
  Moves1,
  Moves2,
  Moves3,
  Moves4,
  Moves5,
  Moves6,
  Moves7,
  Moves8,
  Moves9,
  Moves10,
  Moves11,
];

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

const gameMap = [
  0, 0, 1, 2, 2, 3, 4, 4, 5, 5, 6, 7, 7, 8, 9, 9, 10, 10, 11, 11,
];

const screenList = ["SETTINGS", "POKEDEX", "INFO", "MOVES", "STATS", "DATA"];

const moveCells = {
  physical: CellPhysical,
  special: CellSpecial,
  status: CellStatus,
};

function App() {
  const [monster, setMonster] = useState(0);
  const [game, setGame] = useState(0);
  const [screen, setScreen] = useState(0);
  const [move, setMove] = useState("");
  const [moves, setMoves] = useState(MovesList[game]);
  const [position, setPosition] = useState(0);

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
    setMonster(Math.ceil(proportionalIndex));
  }, [game]);

  const setScroll = (create) => {
    const container = scrollRef.current;
    if (container) {
      if (create) {
        container.addEventListener("scroll", handleScroll);
      } else {
        container.removeEventListener("scroll", handleScroll);
      }
    }
  };

  // TODO: Add settings to switch to imperial units
  // function getImperial(meters) {
  //   const totalInches = meters * 39.3701;
  //   const feet = Math.floor(totalInches / 12);
  //   const inches = Math.round(totalInches % 12).toString().padStart(2, '0');
  //   return `${feet}'${inches}"`;
  // }
  // function getPounds(kg) {
  //   const pounds = kg * 2.20462;
  //   return pounds.toFixed(1);
  // }

  const navigate = (screen) => {
    setScroll(false);
    document.getElementById("fade").style.opacity = "1";
    document.getElementById("fade").style.pointerEvents = "auto";
    setTimeout(() => {
      document.getElementById("fade").style.opacity = "0";
      document.getElementById("fade").style.pointerEvents = "none";
      setScroll(true);
    }, FADE_MS * 2);
    setTimeout(() => {
      setScreen(screen);
    }, FADE_MS);
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
    setMoves(MovesList[event.target.value]);
  };

  const renderListItem = (name, number) => {
    return (
      <button
        onClick={() => {
          if (monster === number) {
            setPosition(scrollRef.current.scrollTop);
            navigate(2);
          } else {
            setMonster(number);
          }
        }}
        className={cn(
          "group relative flex justify-between md:justify-start items-center gap-2 md:gap-4 md:hover:text-lime-300 text-pokegray bg-pokeblack overflow-visible",
          number === monster
            ? "bg-lime-700 text-lime-300 text-shadow-slate"
            : "text-shadow-slate md:hover:bg-lime-900",
        )}
        key={number}
      >
        <div
          className={cn(
            "w-0 h-0 border-t-[18px] md:border-t-[24px] border-t-transparent border-r-[12px] md:border-r-[12px] border-r-pokeblack border-b-[18px] md:border-b-[24px] border-b-transparent absolute -left-3",
            number === monster
              ? "border-r-lime-700"
              : "md:group-hover:border-r-lime-900",
          )}
        />
        <div
          className={cn(
            "w-0 h-0 border-t-[36px] md:border-t-[48px] border-t-pokeblack border-r-[16px] md:border-r-[25px] border-r-transparent absolute -right-[15px] md:-right-6",
            number === monster
              ? "border-t-lime-700"
              : "md:group-hover:border-t-lime-900",
          )}
        />
        <div
          className={cn(
            "relative -left-2 -top-0 shrink-0 h-8 md:h-12 md:group-hover:brightness-125",
            number === monster ? "brightness-125" : "",
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

  function HexButton({ isButton, text, toScreen }) {
    return isButton ? (
      <div className="select-none w-20 h-10 p-[2px] bg-gray md:cursor-pointer transition-colors md:hover:bg-white">
        <div className="w-[4.75rem] h-[2.25rem] pt-0.5 bg-black text-shadow-slate transition-colors md:hover:bg-gray">
          <button type="button" onClick={() => navigate(toScreen)}>
            {text}
          </button>
        </div>
      </div>
    ) : (
      <div className="select-none w-20 h-10 p-[2px] bg-white">
        <div className="w-[4.75rem] h-[2.25rem] pt-0.5 bg-gray text-shadow-slate">
          {text}
        </div>
      </div>
    );
  }

  function HexMove({ isButton, name, level, onMoveClick }) {
    return (
      <div
        onClick={onMoveClick}
        className={cn(
          "w-[320px] h-[80px] p-[4px]",
          isButton
            ? "bg-gradient-to-b from-aquaLight to-aquaDark md:cursor-pointer"
            : "bg-tealLight",
        )}
      >
        <div
          className={cn(
            "w-[312px] h-[72px] flex gap-2 py-1 px-6 text-white",
            isButton
              ? "bg-slate transition-colors md:hover:bg-slateDark"
              : "bg-tealDark",
          )}
        >
          <TypeCell
            type={MoveData[name] ? MoveData[name].type : "normal"}
            isLarge={true}
          />
          <span className="flex flex-col h-full justify-between text-3xl">
            <p>{name}</p>
            <p className="-mt-1">
              {"Lv."}
              {level}
            </p>
          </span>
        </div>
      </div>
    );
  }

  const renderScreen = () => {
    switch (screen) {
      case 1:
        return (
          <>
            <div className="z-10 relative flex flex-col sm:flex-row items-center justify-between gap-4 md:gap-8 px-4 md:px-8 size-full overflow-y-auto">
              <div className="relative flex flex-col justify-center items-center w-auto sm:w-full h-96 sm:h-auto">
                <img src={Frame} className="size-full max-w-96" alt="" />
                {Array.from(Array(Mapping[game].length).keys()).map((e) => (
                  <img
                    key={e}
                    data-temp={e}
                    hidden={e !== monster}
                    alt={Names[game][e]}
                    src={`/sprites/${Mapping[game][e]}.png`}
                    className="absolute w-full max-w-96 scale-x-[-1]"
                  />
                ))}
              </div>
              <div
                ref={scrollRef}
                className="size-full sm:shrink-0 sm:w-3/5 lg:w-1/2 flex flex-col gap-2 pl-4 pr-6 md:pr-8 overflow-y-auto overflow-x-hidden z-10"
              >
                {Names[game].map((e, i) => renderListItem(e, i))}
              </div>
            </div>
            <div className="flex z-0 absolute top-16 sm:top-1/2 h-64 w-full sm:top-[calc(50vh-8rem)] overflow-visible items-center">
              <div className="relative h-36 sm:h-[25vw] max-h-64 w-full bg-stripes bg-fill sm:bg-contain bg-repeat-x"></div>
            </div>
          </>
        );
      case 3:
        return (
          <div className="flex flex-col items-center justify-center size-full gap-8 text-4xl max-h-[calc(100dvh-9rem)] z-10 overflow-hidden md:overflow-y-auto">
            <div className="relative flex flex-col gap-16 px-8 md:flex-row w-full md:h-[48rem] overflow-y-auto overflow-x-hidden justify-start md:justify-center items-center">
              <div className="absolute top-4 left-0 h-[240px] w-[237px] bg-contain bg-no-repeat bg-rulerHead" />
              <div className="absolute top-4 left-[237px] h-[240px] w-full bg-contain bg-ruler" />
              <div className="flex flex-col z-10 items-center md:overflow-y-auto md:overflow-x-hidden">
                <img
                  alt=""
                  src={`/sprites/${Mapping[game][monster - 1]}.png`}
                  className="w-72 hidden"
                />
                <img
                  alt={Names[game][monster]}
                  src={`/sprites/${Mapping[game][monster]}.png`}
                  className="w-72 scale-x-[-1]"
                />
                <img
                  alt=""
                  src={`/sprites/${Mapping[game][monster + 1]}.png`}
                  className="w-72 hidden"
                />
                <Window innerClass="!p-0 text-3xl">
                  {move.length > 0 ? (
                    <>
                      <div className="flex justify-between items-center">
                        <div className="flex flex-col justify-center h-48 w-full md:w-40 px-4 bg-gray text-pokewhite">
                          <p>▪ Category</p>
                          <p>▪ Power</p>
                          <p>▪ Accuracy</p>
                          <p>▪ PP</p>
                        </div>
                        <div className="flex flex-col justify-center items-center h-48 w-full md:w-32 px-4">
                          <img
                            src={moveCells[MoveData[move].category]}
                            className="h-8 py-1"
                            alt=""
                          />
                          <p>
                            {MoveData[move].power > 0
                              ? MoveData[move].power
                              : "-"}
                          </p>
                          <p>
                            {MoveData[move].accuracy > 0 ||
                            MoveData[move].accuracy === "∞"
                              ? MoveData[move].accuracy
                              : "-"}
                          </p>
                          <p>{MoveData[move].pp}</p>
                        </div>
                      </div>
                      <p
                        className={cn(
                          "w-72 h-40 overflow-y-auto p-4 border-t-4 border-t-gray",
                          !MoveData[move].text && "text-2xl italic",
                        )}
                      >
                        {MoveData[move].text || "No additional effect"}
                      </p>
                    </>
                  ) : (
                    <div className="flex flex-col items-center w-72 h-[22rem]">
                      <p className="p-4 text-center">
                        Please select a move to see its details
                      </p>
                    </div>
                  )}
                </Window>
              </div>
              <div
                id="hexlist"
                className="z-10 h-full md:overflow-y-auto md:overflow-x-hidden"
              >
                {moves[Names[game][monster].toLowerCase()]["level"].map(
                  (e, i) => (
                    <HexMove
                      key={i}
                      isButton={e.name !== move}
                      name={e.name}
                      level={e.num}
                      onMoveClick={() => setMove(e.name === move ? "" : e.name)}
                    />
                  ),
                )}
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="relative flex flex-col gap-16 md:flex-row w-full h-fit text-4xl max-h-[calc(100dvh-9rem)] overflow-y-auto overflow-x-hidden z-10 justify-start md:justify-center items-center md:items-start">
            <div className="absolute top-4 left-0 h-[240px] w-[237px] bg-contain bg-no-repeat bg-rulerHead" />
            <div className="absolute top-4 left-[237px] h-[240px] w-full bg-contain bg-ruler" />
            <img
              alt=""
              src={`/sprites/${Mapping[game][monster - 1]}.png`}
              className="w-72 hidden"
            />
            <img
              alt={Names[game][monster]}
              src={`/sprites/${Mapping[game][monster]}.png`}
              className="w-72 scale-x-[-1]"
            />
            <img
              alt=""
              src={`/sprites/${Mapping[game][monster + 1]}.png`}
              className="w-72 hidden"
            />
            <div className="flex flex-col justify-start gap-4 h-full z-10">
              <Window>
                <div className="w-full flex bg-pokegray">
                  <p>• {String(monster + 1).padStart(3, "0")}</p>
                  <p className="flex-grow text-center">
                    {Names[game][monster]}
                  </p>
                </div>
                <StatList
                  stats={Data[Names[game][monster].toLowerCase()]["stats"]}
                  showSpecials={game > 1}
                />
              </Window>
              <Window>
                <InfoList info={Data[Names[game][monster].toLowerCase()]} />
              </Window>
            </div>
          </div>
        );
      case 2:
      case 5:
        return (
          <div className="flex flex-col items-center w-full gap-8 text-4xl overflow-y-auto overflow-x-hidden z-10">
            <div className="relative flex flex-col gap-16 md:flex-row w-full justify-center items-center">
              <div className="absolute top-4 left-0 h-[240px] w-[237px] bg-contain bg-no-repeat bg-rulerHead" />
              <div className="absolute top-4 left-[237px] h-[240px] w-full bg-contain bg-ruler" />
              <img
                alt=""
                src={`/sprites/${Mapping[game][monster - 1]}.png`}
                className="w-72 hidden"
              />
              <img
                alt={Names[game][monster]}
                src={`/sprites/${Mapping[game][monster]}.png`}
                className="w-72 scale-x-[-1]"
              />
              <img
                alt=""
                src={`/sprites/${Mapping[game][monster + 1]}.png`}
                className="w-72 hidden"
              />
              <Window className="z-10 w-72">
                <div className="w-full flex bg-pokegray">
                  <p>• {String(monster + 1).padStart(3, "0")}</p>
                  <p className="flex-grow text-center">
                    {Names[game][monster]}
                  </p>
                </div>
                <p className="text-center">
                  {Data[Names[game][monster].toLowerCase()]["species"]} Pokemon
                </p>
                <div className="flex justify-center px-12 py-6 gap-2 bg-tilesWhite bg-repeat-x bg-contain">
                  <div className="hidden bg-bug bg-dark bg-dragon bg-electr bg-fight bg-fire bg-flying bg-ghost bg-grass bg-ground bg-ice bg-normal bg-poison bg-psychc bg-rock bg-steel bg-water" />
                  <TypeCell
                    type={Data[Names[game][monster].toLowerCase()]["type1"]}
                  />
                  <TypeCell
                    type={Data[Names[game][monster].toLowerCase()]["type2"]}
                  />
                </div>
                <div className="w-full px-2">
                  <div className="relative flex justify-between w-full gap-2">
                    <div className="absolute top-4 w-full h-2 bg-pokegray rounded-full" />
                    <p className="z-10 pl-8">HT</p>
                    <p className="z-10">
                      {Data[Names[game][monster].toLowerCase()]["height"]} m
                    </p>
                  </div>
                  <div className="relative flex justify-between w-full gap-2">
                    <div className="absolute top-4 w-full h-2 bg-pokegray rounded-full" />
                    <p className="z-10 pl-8">WT</p>
                    <p className="z-10">
                      {Data[Names[game][monster].toLowerCase()]["weight"]} kg
                    </p>
                  </div>
                </div>
              </Window>
            </div>
            <Window innerClass="!p-0">
              <div className="w-full p-8 bg-slate">
                <p className="text-light">
                  {
                    Info[Names[game][monster].toLowerCase()][
                      gameMap.indexOf(Number(game))
                    ]
                  }
                </p>
              </div>
            </Window>
          </div>
        );
      default:
        return (
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
                  onClick={() => navigate(1)}
                >
                  Enter
                </button>
              </div>
            </Window>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col justify-between items-center w-full h-dvh gap-4 bg-tiles overflow-hidden">
      <Panel onClick={togglePanel} />
      <div className="absolute left-0 right-0 top-16 h-24 bg-tilesBlack overflow-hidden pointer-events-none z-0" />
      <div
        id="fade"
        className={cn(
          "absolute inset-0 z-50 pointer-events-none bg-[#000] opacity-0 transition-opacity",
          "duration-300",
        )}
      ></div>
      <Title
        game={game}
        screen={screen}
        gameList={gameList}
        screenList={screenList}
      />
      <div className="absolute left-0 right-0 top-32 h-24 bg-tilesBlack overflow-hidden pointer-events-none z-0" />
      {renderScreen()}
      <div
        id="hexrow"
        className="flex justify-between z-30 gap-2 w-full px-4 py-2 text-2xl text-white text-center bg-gradient-to-t from-pokeblack to-gray border-t-2 border-pokeblack"
      >
        <div
          className={
            screen > 1 ? "flex gap-4" : "opacity-0 pointer-events-none"
          }
        >
          <button
            onClick={() => {
              setMonster(monster - 1);
              setMove("");
            }}
            className={cn(
              "select-none md:hover:brightness-50 transition-filter",
              monster === 0 && "opacity-0 pointer-events-none",
            )}
          >
            <img className="h-10" src={ArrowUp} alt="" />
          </button>
          <button
            onClick={() => {
              setMonster(monster + 1);
              setMove("");
            }}
            className={cn(
              "md:hover:brightness-50 transition-filter",
              monster + 1 === Names[game].length &&
                "opacity-0 pointer-events-none",
            )}
          >
            <img className="h-10" src={ArrowDown} alt="" />
          </button>
        </div>
        {screen > 1 && (
          <div className="flex gap-2">
            <HexButton isButton={screen !== 2} text={"INFO"} toScreen={2} />
            <HexButton isButton={screen !== 3} text={"MOVES"} toScreen={3} />
            <HexButton isButton={screen !== 4} text={"STATS"} toScreen={4} />
            {/* <HexButton isButton={screen !== 5} text={"DATA"} toScreen={5} /> */}
          </div>
        )}
        <div className="flex items-center gap-4 ml-10">
          <button
            className={cn(
              "md:hover:brightness-50 transition-filter",
              screen < 2 && "hidden",
            )}
            onClick={() => {
              if (screen === 1) {
                navigate(0);
                setTimeout(() => {
                  setMonster(0);
                  setMove("");
                }, FADE_MS * 1.5);
              } else {
                setTimeout(() => {
                  scrollRef.current.scrollTop = position;
                }, FADE_MS * 1.5);
                navigate(1);
              }
            }}
          >
            <img className="h-10" src={BackButton} alt="" />
          </button>
          <button
            className="md:hover:brightness-50 transition-filter"
            onClick={() => {
              if (screen === 0) {
                togglePanel(true);
              } else {
                navigate(0);
                setTimeout(() => {
                  setMonster(0);
                  setMove("");
                }, FADE_MS * 1.5);
              }
            }}
          >
            <img className="h-10" src={CloseButton} alt="" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
