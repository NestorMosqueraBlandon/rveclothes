import React from 'react';
import styles from '../styles/Footer.module.css'
import DivisaFormater from './DivisaFormater'
import Link from 'next/link'

export default function Footer({type, price, addToCartHandler, product, subtotal, checkoutHandler}) {
  
  return (
    <>
    {type == 1? 
    
  (
    <ul className={styles.list}>
    <li><Link href="/"><a><i className='bx bx-home-alt' ></i></a></Link></li>      
    <li><Link href="/search"><a><i className='bx bx-package' ></i></a></Link></li>      
    <li><Link href="/category"><a><i className='bx bx-category' ></i></a></Link></li>      
    <li><Link href="/cart"><a><i className='bx bx-cart' ></i></a></Link></li>
    <li><Link href="/profile"><a><i className='bx bx-user' ></i></a></Link></li>      
  </ul>
  ) : type == 2? (
    <div className={styles.footerListTwo}>
    <div className={styles.list}>
      {price? (
        <DivisaFormater value={price} />
      ) :
        <div><DivisaFormater  value={subtotal} /></div>
      }
      <button onClick={checkoutHandler}>Verificar</button>
    </div>
    <ul className={styles.list}>
    <li><Link href="/"><a><i className='bx bx-home-alt' ></i></a></Link></li>      
    <li><Link href="/search"><a><i className='bx bx-package' ></i></a></Link></li>      
    <li><Link href="/category"><a><i className='bx bx-category' ></i></a></Link></li>      
    <li><Link href="/cart"><a><i className='bx bx-cart' ></i></a></Link></li>
    <li><Link href="/profile"><a><i className='bx bx-user' ></i></a></Link></li>      
  </ul>
    </div>

  ) : (

    <div className={styles.list}>
        <DivisaFormater value={price} />
      <button onClick={() => addToCartHandler(product)}>Anadir al carrito</button>
    </div>
  )}
    
    </>
  );
}
