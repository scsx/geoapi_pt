'use client'
import { useState, useEffect } from 'react'
import Badge from 'react-bootstrap/Badge'

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
  }, [])

  return (
    <div className='container'>
      <h1>Municipio: {municipioId}</h1>

      {municipioData && (
        <>
          <p>{JSON.stringify(municipioData.codigo)}</p>
          <div>
            {municipioData.geojsons.freguesias.map((freg) => (
              <Badge bg='info' key={freg.properties.Freguesia}>{freg.properties.Freguesia}</Badge>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default MunicipioDetalhe
