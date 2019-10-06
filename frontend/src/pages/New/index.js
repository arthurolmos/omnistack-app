import React, { useState, useMemo } from 'react';

import camera from '../../assets/camera.svg'

import './styles.css'

import api from '../../services/api'


export default function New({ history }) {
  const [company, setCompany] = useState('')
  const [techs, setTechs] = useState('')
  const [price, setPrice] = useState('')

  const [thumbnail, setThumbnail] = useState(null)

  //useMemo: cria uma memoria da variavel no []
  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null //Cria uma URL virtual para o preview 
  }, [thumbnail])

  async function handleSubmit(e) {
    e.preventDefault()

    const user_id = localStorage.getItem('user')

    //Necessario para usar Multiform ao inves de JSON
    const data = new FormData()
    data.append('thumbnail', thumbnail)
    data.append('company', company)
    data.append('techs', techs)
    data.append('price', price)

    //Manda a const data como um objeto e o headers
    await api.post('/spots', data, {
      headers: { user_id }
    })

    history.push('/dashboard')
  }

  return (
    <form onSubmit={handleSubmit}>
      <label 
        id='thumbnail' 
        style={{ 
          backgroundImage: `url(${preview})` 
        }}
        className={thumbnail ? 'hasThumbnail' : ''}
        >
        <input type='file' onChange={e => setThumbnail(e.target.files[0])}/>
        <img src={camera} alt='Select img' />
      </label>

      <label htmlFor='company'>EMPRESA *</label>
      <input 
        id='company'
        placeholder='Sua empresa incrível'
        value={company}
        onChange={e => setCompany(e.target.value)}
      />

      <label htmlFor='techs'>TECNOLOGIAS * <span>Separadas por vírgula</span></label>
      <input 
        id='techs'
        placeholder='Quais tecnologias usam?'
        value={techs}
        onChange={e => setTechs(e.target.value)}
      />

      <label htmlFor='price'>VALOR DA DIÁRIA * <span>(em branco para gratuíto)</span></label>
      <input 
        id='price'
        placeholder='Qual o valor cobrado por dia?'
        value={price}
        onChange={e => setPrice(e.target.value)}
      />

      <button type='submit' className='btn'>CADASTRAR</button>
    </form>
  );
}
