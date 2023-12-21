'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const Municipios = () => {
  const [municipios, setMunicipios] = useState([])

  // Exemplos para:
  // Lajes Das Flores
  // https://json.geoapi.pt/municipio/Lajes%20Das%20Flores
  // Lagoa (açores)
  // https://json.geoapi.pt/municipio/Lagoa%20(açores)

  useEffect(() => {
    fetch('https://json.geoapi.pt/municipios')
      .then((res) => res.json())
      .then((data) => {
        setMunicipios(data)
        //setLoading(false)
      })
      .catch((error) => {
        throw error
      })
  }, [])

  return (
    <div className='sitepage sitepage--municipios'>
      <div className='container'>
        <h1>Municípios</h1>
        <ul>
          {municipios &&
            municipios.map((item) => (
              <li key={JSON.stringify(item)} data-key={JSON.stringify(item)}>
                <Link href={`/municipios/${item}`}>{item}</Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}

export default Municipios
