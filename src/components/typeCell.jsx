import { cn } from "../utils";

export default function TypeCell({ type, isLarge }) {
  if (!type) return undefined;

  return (
    <span
      className={cn(
        "text-shadow-black text-center border-2 border-gray",
        isLarge ? "h-8 w-20 text-3xl" : "h-7 w-16 text-2xl",
        `bg-${type}`,
      )}
    >
      <p className="-mt-1 text-white">{type.toUpperCase()}</p>
    </span>
  );
}
