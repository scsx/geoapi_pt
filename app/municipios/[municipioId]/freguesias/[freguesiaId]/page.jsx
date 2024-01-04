'use client'

import { useState, useEffect } from 'react'
import getFreguesia from '@/api/getFreguesia'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Link from 'next/link'
import Loading from '@/components/Loading'
import './page.scss'
import { calcPercentage } from '@/utils/utils'

const Freguesia = ({ params }) => {
  const municipioId = decodeURIComponent(params.municipioId)
  const freguesiaId = decodeURIComponent(params.freguesiaId)
  const [freguesiaData, setFreguesiaData] = useState(null)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    getFreguesia(freguesiaId).then((data) => {
      if (mounted) {
        if (Array.isArray(data)) {
          const filtered = data.filter((freg) => freg.municipio === municipioId)
          setFreguesiaData(filtered[0])
        } else {
          setFreguesiaData(data)
          setLoading(false)
        }
      }
    })
    return () => (mounted = false)
  }, [params])

  return (
    <div className='sitepage sitepage--freguesia-detalhe'>
      <div className='container'>
        {isLoading && <Loading />}

        {freguesiaData && (
          <>
            <h1 className='mb-5'>
              <small>
                <Link
                  className='freguesia-detalhe__Link'
                  href={`/municipios/${freguesiaData.municipio}`}>
                  {freguesiaData.municipio}
                </Link>
              </small>
              <br />
              {freguesiaId}
            </h1>
            <Row>
              <Col className='mb-4'>
                <h3>
                  População{' '}
                  <span className='badge text-bg-primary'>
                    {freguesiaData.censos2021.N_INDIVIDUOS}
                  </span>
                </h3>
              </Col>
              <Col>
                <h3>Site</h3>
                <p>
                  {freguesiaData.sitio.length > 0 ? freguesiaData.sitio : '--'}
                </p>
              </Col>
              <Col>
                <h3>Email</h3>
                <p>{freguesiaData.email}</p>
              </Col>
            </Row>

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
