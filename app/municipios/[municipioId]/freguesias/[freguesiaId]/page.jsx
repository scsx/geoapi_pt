'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const Freguesia = ({ params }) => {
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
        {freguesiaData && (
          <>
            <h1>
              <small>
                <Link
                  className='municipio-detalhe__Link'
                  href={`/municipios/${freguesiaData.municipio}`}>
                  {freguesiaData.municipio}
                  &gt;
                </Link>
              </small>
              <br />
              {freguesiaId}
            </h1>

            <h3>População</h3>
            <p>{freguesiaData.censos2021.N_INDIVIDUOS}</p>
            <h3>Sexos</h3>
            <table className='table'>
              <tbody>
                <tr>
                  <td className='mulheres'>Mulheres</td>
                  <td className='homens'>Homens</td>
                </tr>
              </tbody>
            </table>
            <p>{freguesiaData.censos2021.N_EDIFICIOS_CONSTR_ANTES_1945}</p>
          </>
        )}
      </div>
    </div>
  )
}

export default Freguesia
