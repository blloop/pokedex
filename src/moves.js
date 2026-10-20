// Each game's move set is split into its own chunk and loaded on demand
const MovesList = [
  () => import("./data/moves-00.json"),
  () => import("./data/moves-01.json"),
  () => import("./data/moves-02.json"),
  () => import("./data/moves-03.json"),
  () => import("./data/moves-04.json"),
  () => import("./data/moves-05.json"),
  () => import("./data/moves-06.json"),
  () => import("./data/moves-07.json"),
  () => import("./data/moves-08.json"),
  () => import("./data/moves-09.json"),
  () => import("./data/moves-10.json"),
  () => import("./data/moves-11.json"),
];

export const loadMoves = (game) => MovesList[game]().then((m) => m.default);
