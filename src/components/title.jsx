import { useData } from "../context";
import BigStripes from "../assets/stripes-big.png";

const screenList = ["SETTINGS", "POKEDEX", "INFO", "MOVES", "STATS", "DATA"];

const gameList = [
  "RED/BLUE",
  "YELLOW",
  "GOLD/SILVER",
  "CRYSTAL",
  "RUBY/SAPPHIRE",
  "FIRERED/LEAFGREEN",
  "EMERALD",
  "DIAMOND/PEARL",
  "PLATINUM",
  "HEARTGOLD/SOULSILVER",
  "BLACK/WHITE",
  "BLACK2/WHITE2",
];

const gameListShort = [
  "RED/BLU",
  "YELLOW",
  "GLD/SLV",
  "CRYSTAL",
  "RBY/SPH",
  "FRD/LGR",
  "EMERALD",
  "DIA/PRL",
  "PLATIN.",
  "HGO/SSV",
  "BLA/WHI",
  "BL2/WH2",
];

export default function Title() {
  const { game, screen } = useData();
  return (
    <div className="w-full mt-2 border-y-2 border-pokeblack">
      <div className="flex w-full justify-between py-1 bg-pokeblack border-y-4 border-lime-500 text-4xl text-light text-shadow-dark leading-[1.5rem]">
        <img
          src={BigStripes}
          alt=""
          className="h-[28px] w-[46px] shrink-0"
        ></img>
        <p className="hidden sm:block w-full mt-1 mx-4">
          {screen === 1 && gameList[game].toUpperCase()} {screenList[screen]}
        </p>
        <p className="block sm:hidden w-full mt-1 mx-4">
          {screen === 1 && gameListShort[game].toUpperCase()}{" "}
          {screenList[screen]}
        </p>
        {screen > 1 && (
          <>
            <p className="hidden sm:block w-full mt-1 mx-4 text-right">
              {gameList[game].toUpperCase()}
            </p>
            <p className="block sm:hidden w-full mt-1 mx-4 text-right">
              {gameListShort[game].toUpperCase()}
            </p>
          </>
        )}
        <img
          src={BigStripes}
          alt=""
          className="h-[28px] w-[46px] shrink-0"
        ></img>
      </div>
    </div>
  );
}
