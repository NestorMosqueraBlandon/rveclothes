import { Switch } from "@material-ui/core";
import Cookies from "js-cookie";
import React from "react";
import { useContext } from "react";
import styles from "../styles/Header.module.css";
import { Store } from "../utils/Store";
import Link from "next/link";

export default function Header({back}) {
  const { state, dispatch } = useContext(Store);
  const { darkMode } = state;

  const darkModeChangeHandler = () => {
    dispatch({ type: darkMode ? "DARK_MODE_OFF" : "DARK_MODE_ON" });
    const newDarkMode = !darkMode;
    Cookies.set("darkMode", newDarkMode ? "ON" : "OFF");
  };

  return (
    <header className={back? styles.headerBack : styles.header}>
      <button>
        {back ? 
      (
        <Link href="/">
        <a>
          <i class='bx bx-arrow-back'></i>
        </a>
        </Link>
        ) :
        (
          <i className="bx bx-menu"></i>
       ) 
      }
      </button>
      {back ? (
        <div className={styles.logo}></div>
        ): 
        (
        <div className={styles.logo}> atope</div>

      )}
      <Switch checked={darkMode} onChange={darkModeChangeHandler}></Switch>
    </header>
  );
}
