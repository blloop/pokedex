import { useData } from "../context";

export default function HexButton({ index, text }) {
  const { screen, navigate } = useData();
  return screen !== index ? (
    <div className="group select-none w-10 sm:w-20 h-10 p-[2px] bg-gray md:cursor-pointer transition-colors md:hover:bg-white">
      <button type="button" onClick={() => navigate(index)}>
        <div className="hidden sm:block w-[4.75rem] h-[2.25rem] pt-0.5 bg-black text-shadow-slate transition-colors md:group-hover:bg-gray">
          {text}
        </div>
      </button>
      <button type="button" onClick={() => navigate(index)}>
        <div className="block sm:hidden w-[2.25rem] h-[2.25rem] pt-0.5 bg-black text-shadow-slate transition-colors md:group-hover:bg-gray">
          {text.slice(0, 2)}
        </div>
      </button>
    </div>
  ) : (
    <div className="select-none w-10 sm:w-20 h-10 p-[2px] bg-white">
      <div className="hidden sm:block w-[4.75rem] h-[2.25rem] pt-0.5 bg-gray text-shadow-slate">
        {text}
      </div>
      <div className="block sm:hidden w-[2.25rem] h-[2.25rem] pt-0.5 bg-gray text-shadow-slate">
        {text.slice(0, 2)}
      </div>
    </div>
  );
}
