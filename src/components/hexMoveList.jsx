import { cn } from "../utils";
import { useData } from "../context";
import MoveData from "../data/moveData.json";
import Names from "../data/names.json";
import TypeCell from "./typeCell";

export function HexMove({ isButton, name, level, onMoveClick }) {
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

export default function HexMoveList() {
  const { monster, game, move, moves, setMove } = useData();
  return (
    <div
      id="hexlist"
      className="z-10 h-full md:overflow-y-auto md:overflow-x-hidden"
    >
      {moves[Names[game][monster].toLowerCase()]["level"].map((e, i) => (
        <HexMove
          key={i}
          isButton={e.name !== move}
          name={e.name}
          level={e.num}
          onMoveClick={() => setMove(e.name === move ? "" : e.name)}
        />
      ))}
    </div>
  );
}
