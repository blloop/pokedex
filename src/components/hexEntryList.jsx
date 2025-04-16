import { cn } from "../utils";
import { useData } from "../context";
import Mapping from "../data/mapping.json";
import Names from "../data/names.json";
import ArrowLeft from "../assets/arrow-left.png";
import ArrowRight from "../assets/arrow-right.png";

function HexEntry({ name, number, gameMap, changeScroll }) {
  const { monster, animate, navigate, setMonster } = useData();
  return (
    <button
      onClick={() => {
        if (monster === number) {
          changeScroll();
          navigate(2);
        } else {
          setMonster(number);
        }
      }}
      className={cn(
        "group relative flex justify-between md:justify-start items-center gap-2 md:gap-4 md:hover:text-lime-300 text-pokegray bg-pokeblack overflow-visible",
        monster === number
          ? "bg-lime-700 text-lime-300 text-shadow-slate"
          : "text-shadow-slate md:hover:bg-lime-900",
      )}
      key={number}
    >
      <div
        className={cn(
          "w-0 h-0 border-t-[18px] md:border-t-[24px] border-t-transparent border-r-[12px] md:border-r-[12px] border-r-pokeblack border-b-[18px] md:border-b-[24px] border-b-transparent absolute -left-3",
          monster === number
            ? "border-r-lime-700"
            : "md:group-hover:border-r-lime-900",
        )}
      />
      <div
        className={cn(
          "w-0 h-0 border-t-[36px] md:border-t-[48px] border-t-pokeblack border-r-[16px] md:border-r-[25px] border-r-transparent absolute -right-[15px] md:-right-6",
          monster === number
            ? "border-t-lime-700"
            : "md:group-hover:border-t-lime-900",
        )}
      />
      <div
        className={cn(
          "relative -left-2 -top-0 shrink-0 h-8 md:h-12 md:group-hover:brightness-125",
          monster === number ? "brightness-125" : "",
        )}
      >
        <img className="absolute left-0 h-full" src={ArrowLeft} alt="" />
        <img className="absolute left-12 h-full" src={ArrowRight} alt="" />
        <div className="w-16 h-full overflow-hidden">
          <img
            className="relative -top-3 h-12 md:h-16 mx-auto object-cover z-10"
            src={
              monster === number && animate
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
  );
}

export default function HexEntryList() {
  const { setPosition, game, scrollRef } = useData();
  return (
    <div
      ref={scrollRef}
      className="size-full sm:shrink-0 sm:w-3/5 lg:w-1/2 flex flex-col gap-2 pl-4 pr-6 md:pr-8 overflow-y-auto overflow-x-hidden md:py-[calc(50dvh-3.5rem)] z-10"
    >
      {Names[game].map((e, i) => (
        <HexEntry
          key={i}
          name={e}
          number={i}
          gameMap={Mapping[game]}
          changeScroll={() => setPosition(scrollRef.current.scrollTop)}
        />
      ))}
    </div>
  );
}
