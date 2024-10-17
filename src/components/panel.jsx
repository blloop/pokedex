export default function Panel() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-40">
      <div
        id="panel-top"
        className="relative top-0 -left-[50vw] h-full w-1/2 bg-pokered border-r-[1rem] border-black transition-left duration-500 pointer-events-auto"
      >
        <div className="absolute top-[calc(50vh-6rem)] left-[calc(100%-5rem)] w-24 h-48 bg-white border-[1rem] border-black border-r-0 rounded-l-full" />
      </div>
      <div
        id="panel-bottom"
        className="relative -top-[100vh] -right-[100vw] h-full w-1/2 bg-pokered border-l-[1rem] border-black transition-right duration-500 pointer-events-auto"
      >
        <div className="absolute bottom-[calc(50vh-6rem)] right-[calc(50vw-6rem)] w-24 h-48 bg-white border-[1rem] border-black border-l-0 rounded-r-full" />
      </div>
    </div>
  );
}
