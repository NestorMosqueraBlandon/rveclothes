import React from 'react';
import styles from '../styles/Footer.module.css'
import DivisaFormater from './DivisaFormater'

export default function Footer({type, price, addToCartHandler, product, subtotal}) {
  
  return (
    <>
    {type == 1? 
    
  (
    <ul className={styles.list}>
    <li><i className='bx bx-home-alt' ></i></li>      
    <li><i className='bx bx-package' ></i></li>      
    <li><i className='bx bx-category' ></i></li>      
    <li><i className='bx bx-cart' ></i></li>
    <li><i className='bx bx-user' ></i></li>      
  </ul>
  ) : type == 2? (
    <div className={styles.footerListTwo}>
    <div className={styles.list}>
      {price? (
        <DivisaFormater value={price} />
      ) :
        <div><DivisaFormater  value={subtotal} /></div>
      }
      <button onClick={() => addToCartHandler(product)}>Verificar</button>
    </div>
    <ul className={styles.list}>
    <li><i className='bx bx-home-alt' ></i></li>      
    <li><i className='bx bx-package' ></i></li>      
    <li><i className='bx bx-category' ></i></li>      
    <li><i className='bx bx-cart' ></i></li>
    <li><i className='bx bx-user' ></i></li>      
  </ul>
    </div>

  ) : (

    <div className={styles.list}>
      {price? (
        <DivisaFormater value={price} />
      ) :
        <div>Hola mundo</div>
      }
      <button onClick={() => addToCartHandler(product)}>Anadir al carrito</button>
    </div>
  )}
    
    </>
  );
}
