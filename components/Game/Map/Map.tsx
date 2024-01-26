import React, { useState } from "react";
import classes from "../../../css/Map.module.scss";
import MapTile from "./MapTile";
import { MapProps } from "../../../types";

const Map: React.FC<MapProps> = ({ gameState, setGameState }) => {
  const [tilesDisabled, setTilesDisabled] = useState(false);

  const updateTile = async (tileId: string, type: string, options?: any) => {
    switch (type) {
      case "build":
        const updatedTiles = gameState.tiles.map((tile) => (tile._id === tileId ? { ...tile, contents: options.structureType } : tile));
        setGameState({ ...gameState, tiles: updatedTiles });
        setTilesDisabled(false);
        break;

      case "remove":
        console.log(`Removing building from tile ${tileId}`);
        break;

      default:
        console.log(`Unsupported action type: ${type}`);
    }
  };

  return (
    <div className={classes.map}>
      {gameState.tiles.map((tile) => (
        <MapTile
          key={tile._id}
          tile={tile}
          tilesDisabled={tilesDisabled}
          setTilesDisabled={setTilesDisabled}
          gameState={gameState}
          updateTile={updateTile}
          contents={tile.contents}
        />
      ))}
    </div>
  );
};

export default Map;
