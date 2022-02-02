import React from 'react';
import styles from '../styles/Footer.module.css'

export default function Footer() {
  return (
      <ul className={styles.list}>
        <li><i className='bx bx-home-alt' ></i></li>      
        <li><i className='bx bx-package' ></i></li>      
        <li><i className='bx bx-category' ></i></li>      
        <li><i className='bx bx-cart' ></i></li>
        <li><i className='bx bx-user' ></i></li>      
      </ul>
  );
}
