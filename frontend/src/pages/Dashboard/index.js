import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

import api from '../../services/api'

import './styles.css'

export default function Dashboard() {
  const [spots, setSpots] = useState([])

  //Função async para trazer os spots
  async function loadSpots() {
    const user_id = localStorage.getItem('user')

    const response = await api.get('/dashboard', {
      headers: { user_id }
    })

    console.log(response.data)
    setSpots(response.data)
  }

  useEffect(() => {
    loadSpots() //Chama a função
  }, []) //[] filtro para o useEffect

  return (
    <>
      <ul className='spot-list'>
        {spots.map(spot => (
          <li key={spot._id}> {/*Key sempre necessaria no 1o elemento depois do .map*/}
            <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }} />
              <strong>{spot.company}</strong>
              <span>{spot.price ? `R$${spot.price}/dia` : 'GRÁTIS'}</span>
          </li>
        ))}
      </ul>

      <Link to='/new' >
        <button className='btn'>
          CADASTRAR NOVO SPOT
        </button>
      </Link>
    </>
  );
}
