import React, { useState, useEffect } from "react";
import { getCookie, deleteCookie } from "cookies-next";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Button from "../components/Button";
import classes from "../css/Play.module.scss";
import Map from "../components/Game/Map/Map";
import TopBar from "../components/Game/TopBar";
import { GameState } from "../types";

const Play = () => {
  const [gameState, setGameState] = useState<GameState>({ user: null, tiles: [] });
  const router = useRouter();

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        const userId = await getCookie("cgt-userid");

        // Get user data
        const gameStateResponse = await fetch(`/api/users/getLoggedInUser?userId=${userId}`);
        const gameStateData = await gameStateResponse.json();

        setGameState(gameStateData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchGameData();
  }, []);

  const saveGame = async () => {
    const saveResponse = await fetch("/api/game/saveGame", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(gameState)
    });

    const saveData = saveResponse.json();
    console.log(saveData);
  };

  const logOut = async () => {
    await deleteCookie("cgt-userid");
    router.push("/");
  };

  return (
    <div className={classes.playWrapper}>
      <TopBar gameState={gameState} />
      <Map gameState={gameState} setGameState={setGameState} />
      <div className={`${classes.bottomBar}`}>
        <Button onClick={saveGame} variant='green'>
          <FontAwesomeIcon icon={faFloppyDisk} />
          Save Game
        </Button>
        <Button onClick={logOut} variant='red'>
          <FontAwesomeIcon icon={faRightFromBracket} />
          Log Out
        </Button>
      </div>
    </div>
  );
};

export default Play;
