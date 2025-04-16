import { cn } from "../utils";
import ArrowLeft from "../assets/arrow-left.png";
import ArrowRight from "../assets/arrow-right.png";

export default function HexEntry({ name, number, selected, gameMap, animate, navigate, setPosition, setMonster }) {
  return (
    <>
      <button
        onClick={() => {
          if (selected) {
            setPosition();
            navigate();
          } else {
            setMonster(number);
          }
        }}
        className={cn(
          "group relative flex justify-between md:justify-start items-center gap-2 md:gap-4 md:hover:text-lime-300 text-pokegray bg-pokeblack overflow-visible",
          selected
            ? "bg-lime-700 text-lime-300 text-shadow-slate"
            : "text-shadow-slate md:hover:bg-lime-900",
        )}
        key={number}
      >
        <div
          className={cn(
            "w-0 h-0 border-t-[18px] md:border-t-[24px] border-t-transparent border-r-[12px] md:border-r-[12px] border-r-pokeblack border-b-[18px] md:border-b-[24px] border-b-transparent absolute -left-3",
            selected
              ? "border-r-lime-700"
              : "md:group-hover:border-r-lime-900",
          )}
        />
        <div
          className={cn(
            "w-0 h-0 border-t-[36px] md:border-t-[48px] border-t-pokeblack border-r-[16px] md:border-r-[25px] border-r-transparent absolute -right-[15px] md:-right-6",
            selected
              ? "border-t-lime-700"
              : "md:group-hover:border-t-lime-900",
          )}
        />
        <div
          className={cn(
            "relative -left-2 -top-0 shrink-0 h-8 md:h-12 md:group-hover:brightness-125",
            selected ? "brightness-125" : "",
          )}
        >
          <img className="absolute left-0 h-full" src={ArrowLeft} alt="" />
          <img className="absolute left-12 h-full" src={ArrowRight} alt="" />
          <div className="w-16 h-full overflow-hidden">
            <img
              className="relative -top-3 h-12 md:h-16 mx-auto object-cover z-10"
              src={
                selected && animate
                  ? `/icons/${gameMap[number]}.gif`
                  : `/icons/${gameMap[number]}.png`
              }
              alt=""
            />
          </div>
        </div>
        <div className="flex text-pokegray text-3xl md:text-5xl">
          <p>{(number + 1).toString().padStart(3, "0")}</p>
          <p className="ml-2 min-w-40 md:min-w-48 text-left">{name}</p>
        </div>
      </button>
    </>
  )
}
