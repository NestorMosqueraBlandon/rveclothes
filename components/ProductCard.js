import React from 'react';
import styles from '../styles/ProductCard.module.css'
import Link from 'next/link';
import Image from 'next/image';
import Rating from '@material-ui/lab/Rating';
import DivisaFormater from '/components/DivisaFormater';

export default function ProductCard({product, addToCartHandler}) {
  return (
      <div className={styles.card}>
          <Link href={`/product/${product.slug}`}>
               <a>
                   <picture>
                       <Image src={product.image} alt={product.name} title={product.name} width={150} height={150} />
                   </picture>
                   <h2>{product.name}</h2>
                   <Rating value={product.rating} readOnly></Rating>
                   <div>
                       <DivisaFormater value={product.price} /> 
                       <button onClick={() => addToCartHandler(product)}>Anadir al carrito</button>
                   </div>
                </a> 
          </Link>
      </div>
  );
}
