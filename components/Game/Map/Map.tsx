import React, { useState, useEffect } from "react";
import { LoggedInUser } from "../../../models/User";
import classes from "../../../css/Map.module.scss";
import Button from "../../Button";
import MapTile from "./MapTile";
import { TileDocument } from "../../../models/Tile";

interface MapProps {
  user: LoggedInUser | null;
}

const Map: React.FC<MapProps> = ({ user }) => {
  const [tiles, setTiles] = useState<TileDocument[]>([]);
  const [tilesDisabled, setTilesDisabled] = useState(false);

  useEffect(() => {
    const fetchTiles = async () => {
      try {
        const response = await fetch(`/api/tiles/getUsersTiles?userId=${user?._id}`);
        const data = await response.json();
        setTiles(data.tiles);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTiles();
  }, [user]);

  return (
    <div className={classes.map}>
      {tiles.map((tile) => {
        return <MapTile key={tile._id} tilesDisabled={tilesDisabled} setTilesDisabled={setTilesDisabled} hasCabin={tile.hasCabin} />;
      })}
    </div>
  );
};

export default Map;
