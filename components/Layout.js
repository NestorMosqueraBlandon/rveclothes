import React, { useContext } from "react";
import Head from "next/head";
import {

  createMuiTheme,
  ThemeProvider,
  CssBaseline,
} from "@material-ui/core";
// import useStyles from "../utils/styles";
import { Store } from "../utils/Store";
// import { getError } from "../utils/error";
// import Cookies from "js-cookie";
// import { useState } from "react";
// import { useRouter } from "next/router";
// import { useSnackbar } from "notistack";
// import axios from "axios";
// import { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ title, description, children, back, price, type, addToCartHandler, product, subtotal }) {
  // const router = useRouter();
  const { state} = useContext(Store);
  const { darkMode } = state;
  const theme = createMuiTheme({
    typography: {
      h1: {
        fontSize: "1.6rem",
        fontWeight: 400,
        margin: "1rem 0",
      },
      h2: {
        fontSize: "1.4rem",
        fontWeight: 400,
        margin: "1rem 0",
      },
    },
    palette: {
      type: darkMode ? "dark" : "light",
      primary: {
        main: "#f0c000",
      },
      secondary: {
        main: "#208080",
      },
    },
  });
  // const classes = useStyles();

  // const [sidbarVisible, setSidebarVisible] = useState(false);
  // const sidebarOpenHandler = () => {
  //   setSidebarVisible(true);
  // };
  // const sidebarCloseHandler = () => {
  //   setSidebarVisible(false);
  // };

  // const [categories, setCategories] = useState([]);
  // const { enqueueSnackbar } = useSnackbar();

  // const fetchCategories = async () => {
  //   try {
  //     const { data } = await axios.get(`/api/products/categories`);
  //     setCategories(data);
  //   } catch (err) {
  //     enqueueSnackbar(getError(err), { variant: "error" });
  //   }
  // };

  // const [query, setQuery] = useState("");
  // const queryChangeHandler = (e) => {
  //   setQuery(e.target.value);
  // };
  // const submitHandler = (e) => {
  //   e.preventDefault();
  //   router.push(`/search?query=${query}`);
  // };

  // useEffect(() => {
  //   fetchCategories();
  // }, []);

  // const darkModeChangeHandler = () => {
  //   dispatch({ type: darkMode ? "DARK_MODE_OFF" : "DARK_MODE_ON" });
  //   const newDarkMode = !darkMode;
  //   Cookies.set("darkMode", newDarkMode ? "ON" : "OFF");
  // };
  // const [anchorEl, setAnchorEl] = useState(null);
  // const loginClickHandler = (e) => {
  //   setAnchorEl(e.currentTarget);
  // };
  // const loginMenuCloseHandler = (e, redirect) => {
  //   setAnchorEl(null);
  //   if (redirect) {
  //     router.push(redirect);
  //   }
  // };
  // const logoutClickHandler = () => {
  //   setAnchorEl(null);
  //   dispatch({ type: "USER_LOGOUT" });
  //   Cookies.remove("userInfo");
  //   Cookies.remove("cartItems");
  //   Cookies.remove("shippinhAddress");
  //   Cookies.remove("paymentMethod");
  //   router.push("/");
  // };
  return (
    <div>
      <Head>
        <title>
          {title ? `${title} - Atope Store` : "Atope Store"}
        </title>
        <link
          href="https://unpkg.com/boxicons@2.1.1/css/boxicons.min.css"
          rel="stylesheet"
        ></link>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />

        {description && <meta name="description" content={description}></meta>}
      </Head>

      
      <ThemeProvider theme={theme}>
        <Header back={back} />
        <CssBaseline />
        <div className="container">
          {children}
        </div>
        <Footer subtotal={subtotal} type={type} price={price} addToCartHandler={addToCartHandler} product={product} />
      </ThemeProvider>
    </div>
  );
}
