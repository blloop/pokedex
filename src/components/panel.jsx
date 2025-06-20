import { useData } from "../context";

export default function Panel() {
  const { togglePanel } = useData();
  return (
    <div
      id="panel"
      className="absolute inset-0 overflow-hidden pointer-events-none z-50"
    >
      <div
        id="panel-left"
        className="relative top-0 left-0 h-full w-[calc((100vw-100dvh)/2)] bg-pokered transition-left duration-1000 pointer-events-auto"
      >
        <div className="w-0 h-0 border-l-[100dvh] border-l-transparent border-t-[100dvh] border-t-pokered border-r-[100dvh] border-r-transparent relative left-[calc(50vw-150dvh)]" />
        <div className="absolute -top-[100dvh] left-[calc(50vw-2.25rem)] w-8 rotate-45 h-[300dvh] bg-pokeblack" />
        <div className="absolute top-[calc(50dvh-9rem)] left-[calc(50vw-4rem)] w-24 h-48 rotate-45 bg-pokewhite border-[1rem] border-pokeblack border-r-0 rounded-l-full" />
      </div>
      <div
        id="panel-right"
        className="relative -top-[100dvh] -right-[calc(50vw+50dvh)] h-full w-[calc((100vw-100dvh)/2)] bg-pokered transition-right duration-1000 pointer-events-auto"
      >
        <div className="w-0 h-0 border-l-[100dvh] border-l-transparent border-b-[100dvh] border-b-pokered border-r-[100dvh] border-r-transparent relative right-[100dvh]" />
        <div className="absolute -top-[100dvh] right-[calc(max(50vw,50dvh)-2.25rem)] w-8 rotate-45 h-[300dvh] bg-pokeblack" />
        <div className="absolute bottom-[calc(50dvh-7rem)] right-[calc(max(50vw,50dvh)-6rem)] w-24 h-48 rotate-45 bg-pokewhite border-[1rem] border-pokeblack border-l-0 rounded-r-full" />
      </div>
      <button
        onClick={() => togglePanel()}
        id="panel-button"
        className="md:cursor-pointer pointer-events-auto absolute top-1/2 right-1/2 -translate-y-[5.5rem] translate-x-[5.5rem] w-36 h-36 rounded-full animate-pulse bg-blue-400 z-40"
      ></button>
    </div>
  );
}
