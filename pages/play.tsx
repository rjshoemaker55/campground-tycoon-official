import React, { useState, useEffect } from "react";
import { Center } from "@mantine/core";
import { LoggedInUser, UserDocument } from "../models/User";
import { getCookie } from "cookies-next";
import classes from "../css/Play.module.scss";
import Map from "../components/Game/Map/Map";
import Button from "../components/Button";
import "@fortawesome/fontawesome-svg-core/styles.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket, faRadiation } from "@fortawesome/free-solid-svg-icons";
import TopBar from "../components/Game/TopBar";

const Play = () => {
  const [user, setUser] = useState<LoggedInUser | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = await getCookie("cgt-userid");

        const response = await fetch(`/api/users/getLoggedInUser?userId=${userId}`);
        const userData = await response.json();

        await setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this effect runs once on mount

  console.log("user from play.tsx: " + JSON.stringify(user));

  return (
    <div className={classes.playWrapper}>
      <TopBar user={user} />
      <Map user={user} />
      <div className={classes.buttonBar}>
        <Button onClick={() => console.log("hi!")}>Hello</Button>
      </div>
    </div>
  );
};

export default Play;
