import { cn } from "../utils";
import MoveData from "../data/moveData.json";
import TypeCell from "./typeCell";

export default function HexMove({ isButton, name, level, onMoveClick }) {
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
