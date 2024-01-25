import classes from "../../css/Play.module.scss";
import "@fortawesome/fontawesome-svg-core/styles.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket, faRadiation } from "@fortawesome/free-solid-svg-icons";
import { LoggedInUser } from "../../models/User";

interface TopBarProps {
  user: LoggedInUser | null;
}

const TopBar: React.FC<TopBarProps> = ({ user }) => {
  return (
    <div className={classes.statusBar}>
      <p className={classes.title}>Campground Tycoon</p>
      <div className={classes.userStatus}>
        <p className={classes.username}>
          <span>Logged in:</span> {user?.username}
        </p>
      </div>
    </div>
  );
};

export default TopBar;
