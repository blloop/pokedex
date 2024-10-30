import BigStripes from "../assets/stripes-big.png";

export default function Title({ game, screen, gameList, screenList }) {
  return (
    <div className="w-full mt-2 border-y-2 border-pokeblack">
      <div className="flex w-full justify-between py-1 bg-pokeblack border-y-4 border-lime">
        <img src={BigStripes} alt="" className="h-[28px] w-[46px]"></img>
        <p className="flex-1 text-4xl mt-1 mx-4 text-light drop-shadow-dark leading-[1.5rem]">
          {screen > 0
            ? `${gameList[game].toUpperCase()} ${screenList[1]}`
            : screenList[0]}
        </p>
        <img src={BigStripes} alt="" className="h-[28px] w-[46px]"></img>
      </div>
    </div>
  );
}
