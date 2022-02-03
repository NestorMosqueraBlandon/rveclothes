import React, { useContext, useEffect, useState } from "react";
import {
  Link,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import Layout from "../../components/Layout";
// import useStyles from "../../utils/styles";
import Product from "../../models/Product";
import db from "../../utils/db";
import axios from "axios";
import { Store } from "../../utils/Store";
import { getError } from "../../utils/error";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import styles from "../../styles/Product.module.css";

export default function ProductScreen(props) {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  const { product } = props;
  // const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  // const [reviews, setReviews] = useState([]);
  // const [rating, setRating] = useState(0);
  // const [comment, setComment] = useState("");
  // const [loading, setLoading] = useState(false);

  // const submitHandler = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   try {
  //     await axios.post(
  //       `/api/products/${product._id}/reviews`,
  //       {
  //         rating,
  //         comment,
  //       },
  //       {
  //         headers: { authorization: `Bearer ${userInfo.token}` },
  //       }
  //     );
  //     setLoading(false);
  //     enqueueSnackbar("Review submitted successfully", { variant: "success" });
  //     fetchReviews();
  //   } catch (err) {
  //     setLoading(false);
  //     enqueueSnackbar(getError(err), { variant: "error" });
  //   }
  // };

  const fetchReviews = async () => {
    try {
      const { data } = await axios.get(`/api/products/${product._id}/reviews`);
      // setReviews(data);
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: "error" });
    }
  };
  useEffect(() => {
    fetchReviews();
  }, []);

  if (!product) {
    return <div>Product Not Found</div>;
  }
  const addToCartHandler = async () => {
    const existItem = state.cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      window.alert("Sorry. Product is out of stock");
      return;
    }
    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
    router.push("/cart");
  };

  const [text, setText] = useState("");

  useEffect(() => {
    const onSuccess = async (position) => {
      const { latitude, longitude } = position.coords;

      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=4f99fa44f4f4435db7411d3f72b3c8f7&language=es&pretty=1            `
      );
      const result = await response.json();
      const { city, country, state } = result.results[0].components;

      setText(city + ", " + state + ", " + country);
    };
    const onError = (error) => {
      if (error.code == 1) {
        setText("Has denegado la peticion");
      } else if (error.code == 2) {
        setText("Ubicacion no disp");
      } else {
        setText("Algo salio mal");
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    } else {
      setText("Tu navegador no soporta la geolocalizacion");
    }
  }, []);

  return (
    <Layout
      back
      title={product.name}
      description={product.description}
      price={product.price}
      addToCartHandler={addToCartHandler}
      product={product}
    >
      <div className={styles.container}>
        <picture>
          <img src={product.image} alt={product.name} />
        </picture>
        <div className={styles.bottomCard}>
          <div className={styles.section}>
            <div className={styles.bottomCardheader}>
              <p>{product.brand}</p>
              <span>Real Vision</span>
            </div>
            <h2 className={styles.title}>{product.name}</h2>
            <span className={styles.rating}>
              <Rating value={product.rating} readOnly></Rating>{" "}
              <p>{product.numReviews} resenas </p>
            </span>

            <div className={styles.flex}>
              <div>
                <i className="bx bx-map"></i>
                <span>{text}</span>
              </div>
              <div>
                <p>Envio Gratis</p>
              </div>
            </div>

            <div className={styles.flex}>
              <p className={styles.amount}>
                Cantidad:{" "}
                <select name="" id="">
                  <option value="">1</option>
                  <option value="">2</option>
                  <option value="">3</option>
                  <option value="">4</option>
                  <option value="">5</option>
                  <option value="">6</option>
                </select>
              </p>

              {product.countInStock > 0 ? (
                <p className={styles.availible}>Disponible</p>
              ) : (
                <p className={styles.noavailible}>Agotado</p>
              )}
            </div>
          </div>

          <div className={styles.section}>
            <h2>Talla</h2>
              <ul>
                <li><button>S</button></li>
                <li><button className={styles.selected}>M</button></li>
                <li><button>L</button></li>
                <li><button>XL</button></li>

              </ul>
          </div>

          <div className={styles.section}>
               <h2>Descripcion</h2>   
               <p>{product.description}</p>
          </div>

          <div className={styles.section}>
            {userInfo? 
            (
              <div className={styles.review}>
                <h2 className={styles.textCenter}>Deja tu resena</h2>
                <textarea name="" id="" aria-multiline cols="30" rows="10" placeholder="Ingresa un comentario"></textarea>
              </div>
            ):
            (
              <p>
              Porfavor
              <Link href={`/login?redirect=/product/${product.slug}`}>
                Inicia sesion
              </Link>
              para escribir una resena
              </p>
            )

            }
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  await db.connect();
  const product = await Product.findOne({ slug }, "-reviews").lean();
  await db.disconnect();
  return {
    props: {
      product: db.convertDocToObj(product),
    },
  };
}
