import { Switch } from "@material-ui/core";
import Cookies from "js-cookie";
import React from "react";
import { useContext } from "react";
import styles from "../styles/Header.module.css";
import { Store } from "../utils/Store";

export default function Header() {
  const { state, dispatch } = useContext(Store);
  const { darkMode, userInfo } = state;

  const darkModeChangeHandler = () => {
    dispatch({ type: darkMode ? "DARK_MODE_OFF" : "DARK_MODE_ON" });
    const newDarkMode = !darkMode;
    Cookies.set("darkMode", newDarkMode ? "ON" : "OFF");
  };

  return (
    <header className={styles.header}>
      <button>
        <i class="bx bx-menu"></i>
      </button>
      <div className={styles.logo}>atope</div>
      <Switch checked={darkMode} onChange={darkModeChangeHandler}></Switch>
    </header>
  );
}
