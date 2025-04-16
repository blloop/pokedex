import { cn } from "./utils";
import { useData } from "./context";

import Data from "./data/data.json";
import Info from "./data/info.json";
import Mapping from "./data/mapping.json";
import Names from "./data/names.json";

import HexButton from "./components/hexButton";
import HexEntry from "./components/hexEntry";
import HexMove from "./components/hexMove";
import ListInfo from "./components/listInfo";
import ListMove from "./components/listMove";
import ListStat from "./components/listStat";
import Panel from "./components/panel";
import Title from "./components/title";
import TypeCell from "./components/typeCell";
import Window from "./components/window";

import ArrowDown from "./assets/arrow-down.png";
import ArrowUp from "./assets/arrow-up.png";
import BackButton from "./assets/back.png";
import Frame from "./assets/frame.png";

// Sprites and icons credit: https://veekun.com/dex/downloads

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

const genMap = [0, 0, 0, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4];

function App() {
  const {
    navigate,
    monster,
    setMonster,
    game,
    screen,
    move,
    setMove,
    moves,
    animate,
    setAnimate,
    setPosition,
    goBack,
    handleGameChange,
    togglePanel,
    scrollRef,
  } = useData();
  const renderScreen = () => {
    switch (screen) {
      case 1:
        return (
          <>
            <div className="z-10 relative flex flex-col sm:flex-row items-center justify-between gap-4 md:gap-8 px-4 md:px-8 size-full overflow-y-hidden">
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
                className="size-full sm:shrink-0 sm:w-3/5 lg:w-1/2 flex flex-col gap-2 pl-4 pr-6 md:pr-8 overflow-y-auto overflow-x-hidden md:py-[calc(50dvh-3.5rem)] z-10"
              >
                {Names[game].map((e, i) => (
                  <HexEntry
                    key={i}
                    name={e}
                    number={i}
                    selected={monster === i}
                    gameMap={Mapping[game]}
                    animate={animate}
                    navigate={() => navigate(2)}
                    setPosition={() => setPosition(scrollRef.current.scrollTop)}
                    setMonster={setMonster}
                  />
                ))}
              </div>
            </div>
            <div className="flex z-0 absolute top-16 sm:top-1/2 h-64 w-full sm:top-[calc(50dvh-8rem)] overflow-visible items-center">
              <div
                className={cn(
                  "relative h-36 sm:h-[25vw] max-h-64 w-full bg-fill sm:bg-contain bg-repeat-x",
                  animate ? "bg-stripesMoving" : "bg-stripes",
                )}
              ></div>
            </div>
          </>
        );
      case 3:
        return (
          <div className="flex flex-col items-center justify-center size-full gap-8 text-4xl max-h-[calc(100dvh-9rem)] z-10 overflow-hidden">
            <div className="relative flex flex-col gap-8 md:gap-16 px-8 md:flex-row w-full md:h-[48rem] overflow-y-auto overflow-x-hidden md:overflow-y-hidden justify-start md:justify-center items-center">
              <div className="absolute top-4 left-0 h-[240px] w-[237px] bg-contain bg-no-repeat bg-rulerHead" />
              <div className="absolute top-4 left-[237px] h-[240px] w-full bg-contain bg-ruler" />
              <div className="flex flex-col z-10 md:h-full items-center md:overflow-y-auto md:overflow-x-hidden">
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
                      <ListMove move={move} />
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
          <div className="relative flex flex-col gap-8 md:gap-16 md:flex-row w-full h-fit text-4xl max-h-[calc(100dvh-9rem)] overflow-y-auto overflow-x-hidden z-10 justify-start md:justify-center items-center md:items-start">
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
            <div className="flex flex-col justify-start gap-4 h-full z-10 md:overflow-y-auto md:overflow-x-hidden">
              <Window>
                <div className="w-full flex bg-pokegray">
                  <p>• {String(monster + 1).padStart(3, "0")}</p>
                  <p className="flex-grow text-center">
                    {Names[game][monster]}
                  </p>
                </div>
                <ListStat
                  stats={Data[Names[game][monster].toLowerCase()]["stats"]}
                  gen={genMap[game]}
                />
              </Window>
              <Window>
                <ListInfo
                  info={Data[Names[game][monster].toLowerCase()]}
                  gen={genMap[game]}
                />
              </Window>
            </div>
          </div>
        );
      case 2:
      case 5:
        return (
          <div className="flex flex-col items-center w-full gap-8 text-4xl overflow-y-auto overflow-x-hidden z-10">
            <div className="relative flex flex-col gap-8 md:gap-16 md:flex-row w-full justify-center items-center">
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
              <div className="w-full p-4 md:p-8 bg-slate text-3xl md:text-4xl">
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
          <div className="z-10 flex flex-col items-stretch gap-4 text-4xl">
            <Window innerClass="align-top">
              <div className="w-full px-5 py-1 bg-pokegray">
                <p>Settings</p>
              </div>
              <div className="flex gap-4 px-4 py-2">
                <input
                  id="anim"
                  type="checkbox"
                  checked={animate}
                  onChange={(e) => setAnimate(e.target.checked)}
                  className="scale-150"
                />
                <label htmlFor="anim" className="text-3xl text-shadow-none">
                  Show Animations
                </label>
              </div>
            </Window>
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
    <div
      className={cn(
        "relative overflow-y-auto overflow-x-hidden flex flex-col justify-between items-center w-full h-dvh gap-4",
        animate ? "bg-tilesMovingGreen" : "bg-tilesGreen",
      )}
    >
      <Panel onClick={togglePanel} />
      <div
        className={cn(
          "absolute left-0 right-0 top-16 h-24 overflow-hidden pointer-events-none z-0",
          animate ? "bg-tilesMovingBlack" : "bg-tilesBlack",
        )}
      />
      <div
        id="fade"
        className={cn(
          "absolute inset-0 z-50 pointer-events-none bg-[#000] opacity-0 transition-opacity",
          "duration-300",
        )}
      ></div>
      <Title game={game} screen={screen} />
      <div
        className={cn(
          "absolute left-0 right-0 top-32 h-24 overflow-hidden pointer-events-none z-0",
          animate ? "bg-tilesMovingBlack" : "bg-tilesBlack",
        )}
      />
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
            <img className="h-8 sm:h-10" src={ArrowUp} alt="" />
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
            <img className="h-8 sm:h-10" src={ArrowDown} alt="" />
          </button>
        </div>
        {screen > 1 && (
          <div className="flex gap-2">
            <HexButton
              isButton={screen !== 2}
              text={"INFO"}
              navigate={() => navigate(2)}
            />
            <HexButton
              isButton={screen !== 3}
              text={"MOVES"}
              navigate={() => navigate(3)}
            />
            <HexButton
              isButton={screen !== 4}
              text={"STATS"}
              navigate={() => navigate(4)}
            />
            {/* <HexButton isButton={screen !== 5} text={"DATA"} navigate={() => navigate(5)} /> */}
          </div>
        )}
        <button
          className="md:hover:brightness-50 transition-filter ml-10"
          onClick={goBack}
        >
          <img className="h-8 sm:h-10" src={BackButton} alt="" />
        </button>
      </div>
    </div>
  );
}

export default App;
