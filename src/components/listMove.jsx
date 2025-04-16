import { cn } from "../utils";
import MoveData from "../data/moveData.json";
import CellPhysical from "../assets/cell-physical.png";
import CellSpecial from "../assets/cell-special.png";
import CellStatus from "../assets/cell-status.png";
import { useData } from "../context";

const CategoryStyle = {
  physical: CellPhysical,
  special: CellSpecial,
  status: CellStatus,
};

export default function ListMove() {
  const { move } = useData();
  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex flex-col justify-center h-48 w-full md:w-40 px-4 bg-gray text-pokewhite">
          <p>▪ Category</p>
          <p>▪ Power</p>
          <p>▪ Accuracy</p>
          <p>▪ PP</p>
        </div>
        <div className="flex flex-col justify-center items-center h-48 w-full md:w-32 px-4">
          <img
            src={CategoryStyle[MoveData[move].category]}
            className="h-8 py-1"
            alt=""
          />
          <p>{MoveData[move].power > 0 ? MoveData[move].power : "-"}</p>
          <p>
            {MoveData[move].accuracy > 0 || MoveData[move].accuracy === "∞"
              ? MoveData[move].accuracy
              : "-"}
          </p>
          <p>{MoveData[move].pp}</p>
        </div>
      </div>
      <p
        className={cn(
          "w-72 h-40 overflow-y-auto p-4 border-t-4 border-t-gray",
          !MoveData[move].text && "text-2xl italic",
        )}
      >
        {MoveData[move].text || "No additional effect"}
      </p>
    </>
  );
}
