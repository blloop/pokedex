import { cn } from "../utils";

const barColors = [
  "bg-statRed",
  "bg-statOrange",
  "bg-statYellow",
  "bg-statLime",
  "bg-statGreen",
  "bg-statAqua",
];

// StatList design inspired by Pokemondb.net
export default function StatList({ stats, showSpecials }) {
  function RenderBar({ value }) {
    return (
      <div
        className={cn(
          "h-3 border border-gray rounded-md",
          barColors[Math.min(Math.floor(value / 30), 5)],
        )}
        style={{
          width: `${value / (Object.keys(stats).some((e) => stats[e] > 180) ? 1.5 : 1)}px`,
        }}
      />
    );
  }

  return (
    <div className="flex flex-col items-start p-4 text-2xl text-shadow-mini w-80">
      <div className="flex gap-2 items-center">
        <p className="w-16 text-right">HP</p>
        <p className="w-8 text-right">{stats.hp}</p>
        <RenderBar value={stats.hp} />
      </div>
      <div className="flex gap-2 items-center">
        <p className="w-16 text-right">Attack</p>
        <p className="w-8 text-right">{stats.attack}</p>
        <RenderBar value={stats.attack} />
      </div>
      <div className="flex gap-2 items-center">
        <p className="w-16 text-right">Defense</p>
        <p className="w-8 text-right">{stats.defense}</p>
        <RenderBar value={stats.defense} />
      </div>
      {showSpecials && (
        <div className="flex gap-2 items-center">
          <p className="w-16 text-right">Sp. Atk</p>
          <p className="w-8 text-right">{stats.spatk}</p>
          <RenderBar value={stats.spatk} />
        </div>
      )}
      {showSpecials && (
        <div className="flex gap-2 items-center">
          <p className="w-16 text-right">Sp. Def</p>
          <p className="w-8 text-right">{stats.spdef}</p>
          <RenderBar value={stats.spdef} />
        </div>
      )}
      {!showSpecials && (
        <div className="flex gap-2 items-center">
          <p className="w-16 text-right">Special</p>
          <p className="w-8 text-right">{stats.spatk}</p>
          <RenderBar value={stats.spatk} />
        </div>
      )}
      <div className="flex gap-2 items-center">
        <p className="w-16 text-right">Speed</p>
        <p className="w-8 text-right">{stats.speed}</p>
        <RenderBar value={stats.speed} />
      </div>
      <div className="flex gap-2 items-center">
        <p className="w-16 text-right tracking-tight">Total</p>
        <p className="w-8 text-right font-bold">
          {Object.values(stats).reduce((acc, val) => acc + val, 0)}
        </p>
      </div>
    </div>
  );
}
