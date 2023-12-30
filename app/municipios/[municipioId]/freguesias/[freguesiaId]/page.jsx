'use client'

import { useState, useEffect } from 'react'

const Freguesia = ({ params }) => {
  const municipioId = decodeURIComponent(params.municipioId)
  const freguesiaId = decodeURIComponent(params.freguesiaId)
  const [freguesiaData, setFreguesiaData] = useState(null)

  useEffect(() => {
    fetch(`https://json.geoapi.pt/freguesia/${freguesiaId}`)
      .then((res) => res.json())
      .then((data) => {
        setFreguesiaData(data)
        console.log(data)
      })
      .catch((error) => {
        throw error
      })
  }, [params])

  return (
    <div className='sitepage sitepage--freguesia-detalhe'>
      <div className='container'>
        <h1>Freguesia: {freguesiaId}</h1>
        {freguesiaData && <h1>Pop: {freguesiaData.censos2021.N_INDIVIDUOS}</h1>}
      </div>
    </div>
  )
}

export default Freguesia
