export default function Panel() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div id="panel-top" className="relative top-[-50vh] w-full h-1/2 bg-[#f0463d] border-b-4 border-black transition-top duration-500 pointer-events-auto">
        <div className="absolute left-[calc(50vw-4.5rem)] top-[calc(100%-4.25rem)] w-36 h-[4.5rem] bg-white border-8 border-black border-b-white rounded-t-full" />
      </div>
      <div id="panel-bottom" className="relative bottom-[-50vh] w-full h-1/2 bg-white border-t-4 border-black transition-bottom duration-500 pointer-events-auto">
        <div className="absolute left-[calc(50vw-4.5rem)] bottom-[calc(50vh-4.25rem)] w-36 h-[4.5rem] bg-white border-8 border-black border-t-white rounded-b-full" />
      </div>
    </div>
  )
}
