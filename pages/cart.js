import React, { useContext } from 'react';
import dynamic from 'next/dynamic';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';
import NextLink from 'next/link';
import Image from 'next/image';
import {
  Grid,
  TableContainer,
  Table,
  Typography,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Link,
  Select,
  MenuItem,
  Button,
  Card,
  List,
  ListItem,
} from '@material-ui/core';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from '../styles/Cart.module.css'
import DivisaFormater from '../components/DivisaFormater';

function CartScreen() {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const updateCartHandler = async (item, quantity) => {
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } });
  };
  const removeItemHandler = (item) => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };
  const checkoutHandler = () => {
    router.push('/shipping');
  };
  return (
    <Layout title="Carrito" type={2} subtotal={cartItems.reduce((a, c) => a + c.quantity * c.price, 0)} >
      <h2 className={styles.title}>Carrito <span>({cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}
                    items) </span></h2>
                    {cartItems.length === 0 ? (
        <div>
          El carrito esta vacio
          <NextLink href="/" passHref>
            <Link>Ir a comprar</Link>
          </NextLink>
        </div>
      ) : (
        <div className={styles.container}>
          {cartItems.map((item) => (
          <div className={styles.box}>
            <div className={styles.boxHeader}>
             <h3>{item.name}</h3>
             <span>Marca: {item.brand}</span>
            </div>
            <div className={styles.boxContent}>
              <picture>
                <img src={item.image} alt={item.name} />
              </picture>
              <div>
                <span className={styles.flexLeft}><p className={styles.availible}>Disponible</p> <p className={styles.send}>Envio Gratis</p></span>
                <span className={styles.amount}>Cantidad: {item.quantity > 1?  <button onClick={() => updateCartHandler(item, item.quantity -1)}><i class='bx bx-minus-circle' ></i></button> : <button onClick={() => removeItemHandler(item)}><i class='bx bx-trash'></i> </button> } <span>{item.quantity} </span>  <button><i class='bx bx-plus' ></i> </button> </span>
              </div>
            </div>
            <div className={styles.boxFooter}>
                <DivisaFormater value={item.price * item.quantity} />
            </div>
          </div>
          ))}
        </div>
      )}
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });
