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
import audioManager from "./audioManager";

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
  audio: false,
  setAudio: () => {},
  animate: false,
  setAnimate: () => {},
  setPosition: () => {},
  scrollRef: null,
  goBack: () => {},
  handleGameChange: () => {},
  togglePanel: () => {},
  loadContent: false,
  percentage: 0,
});

export const DataProvider = ({ children }) => {
  const [monster, setMonster] = useState(0);
  const [game, setGame] = useState(0);
  const [screen, setScreen] = useState(0);
  const [move, setMove] = useState("");
  const [moves, setMoves] = useState(MovesList[0]);
  const [position, setPosition] = useState(0);
  const [audio, setAudio] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [loadContent, setLoadContent] = useState(null);
  const [percentage, setPercentage] = useState(0);
  const scrollRef = useRef(null);
  const monsterRef = useRef(monster);

  useEffect(() => {
    monsterRef.current = monster;
  }, [monster]);

  const soundList = {
    enter: "/sfx/sfx_enter.mp3",
    exit: "/sfx/sfx_exit.mp3",
    open: "/sfx/sfx_open.mp3",
    close: "/sfx/sfx_close.mp3",
    item: "/sfx/sfx_item.mp3",
    mode: "/sfx/sfx_mode.mp3",
  };

  const playSound = (name) => {
    if (audio) {
      audioManager.playSound(name);
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
    const newMonster = Math.ceil(proportionalIndex);
    if (newMonster !== monsterRef.current) {
      playSound("item");
      setMonster(newMonster);
    }
  }, [game, setMonster, playSound]);

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
    if (!spritesToLoad || spritesToLoad.length == 0) return;
    let loadedCount = 0;
    setLoadContent("Sprites");
    setPercentage(0);

    spritesToLoad.forEach((spriteId) => {
      const img = new Image();
      img.onload = () => {
        loadedCount++;
        setPercentage(Math.floor((100 * loadedCount) / spritesToLoad.length));
        if (loadedCount === spritesToLoad.length) {
          setLoadContent(null);
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
          setLoadContent(null);
        }
      };
      img.src = `/sprites/${spriteId}.${animate ? "gif" : "png"}`;
    });
  }, [game, animate]);

  // Effect for preloading sounds based on game and audio state
  useEffect(() => {
    if (!audio) return;

    setPercentage(0);
    setLoadContent("Sounds");
    const soundNames = Object.keys(soundList);
    let loadedCount = 0;

    async function loadSounds() {
      for (const sound of Object.keys(soundList)) {
        try {
          await audioManager.loadSound(sound, soundList[sound]);
        } catch (error) {
          console.error(`Failed to load audio: ${soundId}`);
        }
        loadedCount++;
        setPercentage(Math.floor((100 * loadedCount) / soundNames.length));
        if (loadedCount === soundNames.length) {
          setLoadContent(null);
        }
      }
    }

    loadSounds();
  }, [audio]);

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
        audio,
        setAudio,
        animate,
        setAnimate,
        setPosition,
        scrollRef,
        goBack,
        handleGameChange,
        togglePanel,
        loadContent,
        percentage,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
