/* eslint-disable @next/next/no-img-element */
// import NextLink from 'next/link';
import Layout from '../components/Layout';
import db from '../utils/db';
import Product from '../models/Product';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { Store } from '../utils/Store';
// import ProductItem from '../components/ProductItem';
// import Carousel from 'react-material-ui-carousel';
// import useStyles from '../utils/styles';
import CardLocation from '../components/CardLocation';
import ProductCard from '../components/ProductCard';

export default function Home(props) {
  // const classes = useStyles();
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { topRatedProducts } = props;
  const addToCartHandler = async (product) => {
    const existItem = state.cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    router.push('/cart');
  };
  return (
    <Layout type={1}>
      <div className='spand'>

      <CardLocation />
      <h2 className='title'>Productos Populares</h2>
      <div className='grid'>
        {topRatedProducts.map((product) => (
            <ProductCard
            key={product.name}
            product={product}
            addToCartHandler={addToCartHandler}
            />
            ))}
      </div>
            </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const featuredProductsDocs = await Product.find(
    { isFeatured: true },
    '-reviews'
  )
    .lean()
    .limit(3);
  const topRatedProductsDocs = await Product.find({}, '-reviews')
    .lean()
    .sort({
      rating: -1,
    })
    .limit(6);
  await db.disconnect();
  return {
    props: {
      featuredProducts: featuredProductsDocs.map(db.convertDocToObj),
      topRatedProducts: topRatedProductsDocs.map(db.convertDocToObj),
    },
  };
}
