import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { IBeer } from '../../types/types';
 
const Beer = () => {

  const [beerList, setBeerList] = useState<IBeer[]>([])

  const getDados = () => {
    axios.get('https://api.punkapi.com/v2/beers/?per_page=8')
      .then(resposta => setBeerList(resposta.data))
  }
 
  return (
    <div className="food-beer-list food-shop">
      
      <h1>Tipos de Cerveja</h1>
      <button onClick={() => getDados()}>Buscar Cerveja</button>
      <div className="beers-list">
        {
          beerList !== null && 
            beerList.map((item: IBeer) => (
              <div key={item.id} className="beer">
                <img src={item.image_url} alt={item.name} />
                <h3>{item.name}</h3>
                <span>{item.tagline}</span>
                <small>{item.description}</small>
              </div>
            ))
        }
      </div>
    </div>
  );
}

export default Beer;