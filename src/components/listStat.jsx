import { cn } from "../utils";
import { useData } from "../context";
import Data from "../data/data.json";
import Names from "../data/names.json";

const barColors = [
  "bg-statRed",
  "bg-statOrange",
  "bg-statYellow",
  "bg-statLime",
  "bg-statGreen",
  "bg-statAqua",
];

const genMap = [0, 0, 0, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4];

// ListStat design inspired by Pokemondb.net
export default function ListStat() {
  const { game, monster } = useData();
  const stats = Data[Names[game][monster].toLowerCase()]["stats"];
  const get = (name) => {
    return Array.isArray(stats[name]) ? stats[name][genMap[game]] : stats[name];
  };
  function RenderBar({ value }) {
    return (
      <>
        <p className="w-8 text-right">{value}</p>
        <div
          className={cn(
            "h-3 border border-gray rounded-md",
            barColors[Math.min(Math.floor(value / 30), 5)],
          )}
          style={{
            width: `${value / (Object.keys(stats).some((e) => stats[e] > 180) ? 1.5 : 1)}px`,
          }}
        />
      </>
    );
  }

  return (
    <div className="flex flex-col items-start p-4 text-2xl text-shadow-mini w-80">
      <div className="flex gap-2 items-center">
        <p className="w-16 text-right">HP</p>
        <RenderBar value={get("hp")} />
      </div>
      <div className="flex gap-2 items-center">
        <p className="w-16 text-right">Attack</p>
        <RenderBar value={get("attack")} />
      </div>
      <div className="flex gap-2 items-center">
        <p className="w-16 text-right">Defense</p>
        <RenderBar value={get("defense")} />
      </div>
      {genMap[game] > 0 && (
        <div className="flex gap-2 items-center">
          <p className="w-16 text-right">Sp. Atk</p>
          <RenderBar value={get("spatk")} />
        </div>
      )}
      {genMap[game] > 0 && (
        <div className="flex gap-2 items-center">
          <p className="w-16 text-right">Sp. Def</p>
          <RenderBar value={get("spdef")} />
        </div>
      )}
      {genMap[game] === 0 && (
        <div className="flex gap-2 items-center">
          <p className="w-16 text-right">Special</p>
          <RenderBar value={get("spatk")} />
        </div>
      )}
      <div className="flex gap-2 items-center">
        <p className="w-16 text-right">Speed</p>
        <RenderBar value={get("speed")} />
      </div>
      <div className="flex gap-2 items-center">
        <p className="w-16 text-right tracking-tight">Total</p>
        <p className="w-8 text-right font-bold">
          {Object.keys(stats).reduce((acc, val) => acc + get(val), 0)}
        </p>
      </div>
    </div>
  );
}
