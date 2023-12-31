'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { calcPercentage } from '@/utils/utils'

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

            <h3 className='mb-4'>População <span className="badge text-bg-primary">{freguesiaData.censos2021.N_INDIVIDUOS}</span></h3>
            <h3>Sexos</h3>
            <table className='table tablesexes'>
              <tbody>
                <tr>
                  <td
                    className='mulheres'
                    style={{
                      width: `${calcPercentage(
                        freguesiaData.censos2021.N_INDIVIDUOS,
                        freguesiaData.censos2021.N_INDIVIDUOS_M
                      )}%`
                    }}>
                    Mulheres{' '}
                    {calcPercentage(
                      freguesiaData.censos2021.N_INDIVIDUOS,
                      freguesiaData.censos2021.N_INDIVIDUOS_M
                    )}
                    %
                  </td>
                  <td
                    className='homens'
                    style={{
                      width: `${calcPercentage(
                        freguesiaData.censos2021.N_INDIVIDUOS,
                        freguesiaData.censos2021.N_INDIVIDUOS_H
                      )}%`
                    }}>
                    Homens{' '}
                    {calcPercentage(
                      freguesiaData.censos2021.N_INDIVIDUOS,
                      freguesiaData.censos2021.N_INDIVIDUOS_H
                    )}
                    %
                  </td>
                </tr>
              </tbody>
            </table>
            <h3 className='mt-4'>Idades</h3>
            <table className='table tableages'>
              <tbody>
                <tr>
                  <td
                    className='age0'
                    style={{
                      width: `${calcPercentage(
                        freguesiaData.censos2021.N_INDIVIDUOS,
                        freguesiaData.censos2021.N_INDIVIDUOS_0_14
                      )}%`
                    }}>
                    {' '}
                  </td>
                  <td
                    className='age15'
                    style={{
                      width: `${calcPercentage(
                        freguesiaData.censos2021.N_INDIVIDUOS,
                        freguesiaData.censos2021.N_INDIVIDUOS_15_24
                      )}%`
                    }}>
                    {' '}
                  </td>
                  <td
                    className='age25'
                    style={{
                      width: `${calcPercentage(
                        freguesiaData.censos2021.N_INDIVIDUOS,
                        freguesiaData.censos2021.N_INDIVIDUOS_25_64
                      )}%`
                    }}>
                    {' '}
                  </td>
                  <td
                    className='age65'
                    style={{
                      width: `${calcPercentage(
                        freguesiaData.censos2021.N_INDIVIDUOS,
                        freguesiaData.censos2021.N_INDIVIDUOS_65_OU_MAIS
                      )}%`
                    }}>
                    {' '}
                  </td>
                </tr>
              </tbody>
            </table>
            <p>
              <b>0-14</b> (
              {calcPercentage(
                freguesiaData.censos2021.N_INDIVIDUOS,
                freguesiaData.censos2021.N_INDIVIDUOS_0_14
              )}
              %)
              <span className='divider'>/</span>
              <b>15-24</b> (
              {calcPercentage(
                freguesiaData.censos2021.N_INDIVIDUOS,
                freguesiaData.censos2021.N_INDIVIDUOS_15_24
              )}
              %)
              <span className='divider'>/</span>
              <b>25-64</b> (
              {calcPercentage(
                freguesiaData.censos2021.N_INDIVIDUOS,
                freguesiaData.censos2021.N_INDIVIDUOS_25_64
              )}
              %)
              <span className='divider'>/</span>
              <b>+65</b> (
              {calcPercentage(
                freguesiaData.censos2021.N_INDIVIDUOS,
                freguesiaData.censos2021.N_INDIVIDUOS_65_OU_MAIS
              )}
              %)
            </p>
          </>
        )}
      </div>
    </div>
  )
}

export default Freguesia
