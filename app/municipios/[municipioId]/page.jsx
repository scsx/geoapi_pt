'use client'
import { useState, useEffect } from 'react'
import Badge from 'react-bootstrap/Badge'

import Loading from '@/components/Loading'
import './page.scss'

const MunicipioDetalhe = ({ params }) => {
  const municipioId = decodeURIComponent(params.municipioId)
  const [municipioData, setMunicipioData] = useState(null)
  const [isLoading, setLoading] = useState(true)

  console.log(municipioData)
  useEffect(() => {
    fetch(`https://json.geoapi.pt/municipio/${municipioId}`)
      .then((res) => res.json())
      .then((data) => {
        setMunicipioData(data)
        setLoading(false)
      })
      .catch((error) => {
        throw error
      })
  }, [params])

  return (
    <div className='municipio-detalhe'>
    <div className='container'>
      <h1>Municipio: {municipioId}</h1>

      {isLoading && <Loading />}

      <div>
        {municipioData && (
          <>
            <p>{JSON.stringify(municipioData.codigo)}</p>
            <div className='municipio-detalhe__lista'>
              {municipioData.geojsons.freguesias.map((freg) => (
                <Badge key={freg.properties.Freguesia} className='municipio-detalhe__item'>
                  {freg.properties.Freguesia}
                </Badge>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
    </div>
  )
}

export default MunicipioDetalhe
