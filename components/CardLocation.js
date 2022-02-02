import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import styles from '../styles/CardLocation.module.css'

export default function CardLocation() {
  
    const [text, setText] = useState('')

    useEffect(() => {
        
        const onSuccess = async(position) => {
            const {latitude, longitude} = position.coords;

            const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=4f99fa44f4f4435db7411d3f72b3c8f7&language=es&pretty=1            `)            
            const result = await response.json()
            const {city, country, state} =  result.results[0].components;

            setText(city +", " + state + ", " + country)
        }
        const onError = (error) => {
            if(error.code == 1){
                setText('Has denegado la peticion')
            }else if(error.code == 2){
                setText('Ubicacion no disp')
            }else{
                setText('Algo salio mal')
            }
        }

        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(onSuccess, onError);
        }else{
            setText('Tu navegador no soporta la geolocalizacion')
        }
    }, [])

    



    return (
      <div className={styles.card}>
        <i class='bx bx-map' ></i>
        <div>
            <p>Ubicacion</p>
            <h2>{text}</h2>
        </div>
      </div>
  );
}
