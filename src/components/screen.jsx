import { cn } from "../utils";
import { useData } from "../context";
import Spinner from "./spinner";

export function BlackTiles({ index }) {
  const { animate } = useData();
  return (
    <div
      className={cn(
        "absolute left-0 right-0 h-24 overflow-hidden pointer-events-none z-0",
        animate ? "bg-tilesMovingBlack" : "bg-tilesBlack",
        index === 0 ? "top-16" : "top-32",
      )}
    />
  );
}

export function Fade() {
  return (
    <div
      id="fade"
      className={cn(
        "absolute inset-0 z-50 pointer-events-none bg-[#000] opacity-0 transition-opacity",
        "duration-300",
      )}
    ></div>
  );
}

export function Loader() {
  const { percentage } = useData();
  return (
    <div className="fixed inset-0 z-50 pointer-events-auto bg-[#0008]">
      <div className="flex flex-col justify-center items-center gap-2 h-full text-white text-4xl">
        <Spinner />
        <div />
        <p>Loading Sprites...</p>
        <p>{`${percentage}%`}</p>
      </div>
    </div>
  );
}
