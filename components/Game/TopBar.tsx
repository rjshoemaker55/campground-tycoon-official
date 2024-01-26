import classes from "../../css/Play.module.scss";
import { TopBarProps } from "../../types";
import "@fortawesome/fontawesome-svg-core/styles.css";

const TopBar: React.FC<TopBarProps> = ({ gameState }) => {
  return (
    <div className={classes.statusBar}>
      <p className={classes.title}>Campground Tycoon</p>
      <div className={classes.userStatus}>
        <p className={classes.username}>
          <span>Logged in:</span> {gameState.user?.username}
        </p>
      </div>
    </div>
  );
};

export default TopBar;
