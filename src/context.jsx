"use client";

import {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
} from "react";
import MovesList from "./moves";
import Names from "./data/names.json";

const FADE_MS = 250;

// Default context value - can be simplified or expanded based on needs
const DataContext = createContext({
  navigate: () => {},
  monster: 0,
  setMonster: () => {},
  game: 0,
  screen: 0,
  move: "",
  moves: [],
  setMove: () => {},
  animate: false,
  setAnimate: () => {},
  setPosition: () => {},
  scrollRef: null,
  goBack: () => {},
  handleGameChange: () => {},
  togglePanel: () => {},
});

export const DataProvider = ({ children }) => {
  const [monster, setMonster] = useState(0);
  const [game, setGame] = useState(0);
  const [screen, setScreen] = useState(0);
  const [move, setMove] = useState("");
  const [moves, setMoves] = useState(MovesList[0]);
  const [position, setPosition] = useState(0);
  const [animate, setAnimate] = useState(false);
  const scrollRef = useRef(null);

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;

    const container = scrollRef.current;
    const scrollTop = container.scrollTop;
    const clientHeight = container.clientHeight;
    const scrollHeight = container.scrollHeight;

    // Calculate the proportional target index based on the current scroll position
    const proportionalIndex =
      (scrollTop / (scrollHeight - clientHeight)) * (Names[game].length - 1);
    setMonster(Math.ceil(proportionalIndex));
  }, [game]);

  const setScroll = (create) => {
    const container = scrollRef.current;
    if (container) {
      if (create) {
        container.addEventListener("scroll", handleScroll);
      } else {
        container.removeEventListener("scroll", handleScroll);
      }
    }
  };

  const navigate = (screen) => {
    setScroll(false);
    document.getElementById("fade").style.opacity = "1";
    document.getElementById("fade").style.pointerEvents = "auto";
    setTimeout(() => {
      document.getElementById("fade").style.opacity = "0";
      document.getElementById("fade").style.pointerEvents = "none";
      setScroll(true);
    }, FADE_MS * 2);
    setTimeout(() => {
      setScreen(screen);
    }, FADE_MS);
  };

  const togglePanel = (open) => {
    document.getElementById("panel-button").style.display = "none";
    document.getElementById("panel-left").style.left = open
      ? ""
      : "calc(-1*(50vw + 50dvh))";
    document.getElementById("panel-right").style.right = open
      ? ""
      : "calc(-1*(100vw + 100dvh))";
    setTimeout(() => {
      document.getElementById("panel-button").style.display = open
        ? "block"
        : "none";
    }, 1000);
  };

  const goBack = () => {
    if (screen === 0) {
      togglePanel(true);
    } else if (screen === 1) {
      navigate(0);
      setTimeout(() => {
        setMonster(0);
        setMove("");
      }, FADE_MS * 1.5);
    } else {
      setTimeout(() => {
        scrollRef.current.scrollTop = position;
      }, FADE_MS * 1.5);
      navigate(1);
    }
  };

  const handleGameChange = (event) => {
    setGame(event.target.value);
    setMoves(MovesList[event.target.value]);
  };

  return (
    <DataContext.Provider
      value={{
        navigate,
        monster,
        setMonster,
        game,
        screen,
        move,
        moves,
        setMove,
        animate,
        setAnimate,
        setPosition,
        scrollRef,
        goBack,
        handleGameChange,
        togglePanel,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
