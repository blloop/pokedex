"use client";

import {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import MovesList from "./moves";
import Names from "./data/names.json";
import Mapping from "./data/mapping.json";

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
  isLoading: false,
  percentage: 0,
});

export const DataProvider = ({ children }) => {
  const [monster, setMonster] = useState(0);
  const [game, setGame] = useState(0);
  const [screen, setScreen] = useState(0);
  const [move, setMove] = useState("");
  const [moves, setMoves] = useState(MovesList[0]);
  const [position, setPosition] = useState(0);
  const [animate, setAnimate] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [percentage, setPercentage] = useState(0);
  const scrollRef = useRef(null);

  const sounds = {
    enter: new Audio("/sfx/sfx_enter.mp3"),
    exit: new Audio("/sfx/sfx_exit.mp3"),
    open: new Audio("/sfx/sfx_open.mp3"),
    close: new Audio("/sfx/sfx_close.mp3"),
    item: new Audio("/sfx/sfx_item.mp3"),
    mode: new Audio("/sfx/sfx_mode.mp3"),
  };
  const playSound = (name) => {
    if (sounds[name]) {
      sounds[name].play();
    }
  };

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;

    const container = scrollRef.current;
    const scrollTop = container.scrollTop;
    const clientHeight = container.clientHeight;
    const scrollHeight = container.scrollHeight;

    // Calculate the proportional target index based on the current scroll position
    const proportionalIndex =
        (scrollTop / (scrollHeight - clientHeight)) * (Names[game].length - 1);
    if (Math.ceil(proportionalIndex) !== monster) {
      playSound("item");
      setMonster(Math.ceil(proportionalIndex));
    }
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

  const navigate = (nextScreen) => {
    if (screen > 1) {
      playSound(nextScreen > 1 ? "mode" : "close");
    } else {
      playSound(nextScreen > screen ? "open" : "close");
    }
    setScroll(false);
    document.getElementById("fade").style.opacity = "1";
    document.getElementById("fade").style.pointerEvents = "auto";
    setTimeout(() => {
      document.getElementById("fade").style.opacity = "0";
      document.getElementById("fade").style.pointerEvents = "none";
      setScroll(true);
    }, FADE_MS * 2);
    setTimeout(() => {
      setScreen(nextScreen);
    }, FADE_MS);
  };

  const togglePanel = (open) => {
    playSound(open ? "exit" : "enter");
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
      return;
    }
    if (screen === 1) {
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

  // Effect for preloading sprites based on game and animate state
  useEffect(() => {
    const spritesToLoad = Mapping[game];
    if (!spritesToLoad || spritesToLoad.length === 0) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    let loadedCount = 0;
    setPercentage(0);

    spritesToLoad.forEach((spriteId) => {
      const img = new Image();
      img.onload = () => {
        loadedCount++;
        setPercentage(Math.floor((100 * loadedCount) / spritesToLoad.length));
        if (loadedCount === spritesToLoad.length) {
          setIsLoading(false);
        }
      };
      img.onerror = () => {
        console.error(
          `Failed to load sprite: /sprites/${spriteId}.${imageFormat}`,
        );
        loadedCount++;
        setPercentage(Math.floor((100 * loadedCount) / spritesToLoad.length));
        setPercentage(0);
        if (loadedCount === spritesToLoad.length) {
          setIsLoading(false);
        }
      };
      img.src = `/sprites/${spriteId}.${animate ? "gif" : "png"}`;
    });
  }, [game, animate]);

  return (
    <DataContext.Provider
      value={{
        navigate,
        monster,
        setMonster: (idx) => {
          playSound("item");
          setMonster(idx);
        },
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
        isLoading,
        percentage,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
