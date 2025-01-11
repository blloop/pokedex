import Stripes from "../assets/stripes.png";

export default function Window({ className, innerClass, children }) {
  return (
    <div className={className}>
      <div className="relative w-24 h-4 bg-pokeblack">
        <div
          className="absolute -right-4 w-0 h-0 
          border-l-[1rem] border-l-transparent
          border-b-[1rem] border-b-pokeblack
          border-r-[1rem] border-r-transparent"
        ></div>
        <img src={Stripes} className="absolute -right-2 h-3 top-1" alt=""></img>
      </div>
      <div
        className={`w-full p-1 text-gray text-shadow-gray border-2 border-pokeblack bg-pokewhite shadow-window ${innerClass}`}
      >
        {children}
      </div>
    </div>
  );
}
