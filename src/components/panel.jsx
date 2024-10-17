export default function Panel() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-30">
      <div
        id="panel-left"
        className="relative top-0 -left-[calc(50vw+50vh)] h-full w-[calc((100vw-100vh)/2)] bg-pokered transition-left duration-500 pointer-events-auto"
      >
        <div className="w-0 h-0 border-l-[100vh] border-l-transparent border-t-[100vh] border-t-pokered border-r-[100vh] border-r-transparent relative left-[calc(50vw-150vh)]" />
        <div className="absolute -top-[100vh] left-[calc(50vw-1rem)] w-4 rotate-45 h-[300vh] bg-black" />
        <div className="absolute top-[calc(50vh-9rem)] left-[calc(50vw-4rem)] w-24 h-48 rotate-45 bg-white border-[1rem] border-black border-r-0 rounded-l-full" />
      </div>
      <div
        id="panel-right"
        className="relative -top-[100vh] -right-[calc(100vw+100vh)] h-full w-[calc((100vw-100vh)/2)] bg-pokered transition-right duration-500 pointer-events-auto"
      >
        <div className="w-0 h-0 border-l-[100vh] border-l-transparent border-b-[100vh] border-b-pokered border-r-[100vh] border-r-transparent relative right-[100vh]" />
        <div className="absolute -top-[100vh] right-[calc(max(50vw,50vh)-1rem)] w-4 rotate-45 h-[300vh] bg-black" />
        <div className="absolute bottom-[calc(50vh-7rem)] right-[calc(max(50vw,50vh)-6rem)] w-24 h-48 rotate-45 bg-white border-[1rem] border-black border-l-0 rounded-r-full" />
      </div>
    </div>
  );
}
