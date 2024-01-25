import Image from "next/image";
import { useState } from "react";
import classes from "../../../css/Map.module.scss";
import "@fortawesome/fontawesome-svg-core/styles.css";
import cabinImage from "../../../assets/images/cabin.svg";
import tentImage from "../../../assets/images/tent.svg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHammer, faXmark, faHouseChimney, faTent } from "@fortawesome/free-solid-svg-icons";

interface MapTileProps {
  tilesDisabled: boolean;
  setTilesDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  hasCabin: boolean;
}

const MapTile: React.FC<MapTileProps> = ({ tilesDisabled, setTilesDisabled, hasCabin }) => {
  const [tileActive, setTileActive] = useState(false);
  const [currentAction, setCurrentAction] = useState("start");
  const [tileContents, setTileContents] = useState("");

  const handleTileClick = () => {
    if (!tilesDisabled) {
      setTilesDisabled(true);
      setTileActive(true);
    }
  };

  const handleCloseActions = () => {
    setTilesDisabled(false);
    setTileActive(false);
    setCurrentAction("start");
  };

  const handleBuild = (type: string) => {
    console.log(`building ${type}`);
    setTileContents(type);
    setTileActive(false);
    setCurrentAction("start");
    setTilesDisabled(false);
  };

  return (
    <div className={`${classes.mapTile} ${tilesDisabled && classes.noHover} ${tileActive && classes.active}`} onClick={handleTileClick}>
      <div className={`${classes.tileContents}`}>
        {tileContents === "cabin" ? <Image src={cabinImage} alt='Cabin' /> : tileContents === "tent" ? <Image src={tentImage} alt='Tent' /> : ""}
      </div>
      <div className={`${classes.tileActions} ${tileActive && classes.show}`}>
        <button onClick={() => setCurrentAction("build")} className={`${classes.build} ${currentAction === "start" && classes.show}`}>
          <FontAwesomeIcon icon={faHammer} />
        </button>
        <button onClick={() => handleBuild("cabin")} className={`${classes.cabin} ${currentAction === "build" && classes.show}`}>
          <FontAwesomeIcon icon={faHouseChimney} />
        </button>
        <button onClick={() => handleBuild("tent")} className={`${classes.tent} ${currentAction === "build" && classes.show}`}>
          <FontAwesomeIcon icon={faTent} />
        </button>
        <button onClick={handleCloseActions} className={classes.close}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>
    </div>
  );
};

export default MapTile;
