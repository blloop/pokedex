import BigStripes from "../assets/stripes-big.png";

export default function Title({ game, screen, gameList, screenList }) {
  const renderScreen = (index) => {
    switch (index) {
      case 1:
        return `${gameList[game].toUpperCase()} ${screenList[1]}`;
      default:
        return screenList[index];
    }
  };
  return (
    <div className="w-full mt-2 border-y-2 border-pokeblack">
      <div className="flex w-full justify-between py-1 bg-pokeblack border-y-4 border-lime">
        <img
          src={BigStripes}
          alt=""
          className="h-[28px] w-[46px]"
        ></img>
        <p className="flex-1 text-4xl mt-1 mx-4 text-light text-shadow-dark leading-[1.5rem]">
          {renderScreen(screen)}
        </p>
        <img
          src={BigStripes}
          alt=""
          className="h-[28px] w-[46px]"
        ></img>
      </div>
    </div>
  );
}
