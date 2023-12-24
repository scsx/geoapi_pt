'use client'

import { useState, useEffect } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'
import Link from 'next/link'
import useDistrictFlag from '@/hooks/useDistrictFlag'
import Loading from '@/components/Loading'
import './page.scss'

const DistritoDetalhe = ({ params }) => {
  const distritoId = decodeURIComponent(params.distritoId)
  const [distritoData, setDistritoData] = useState(null)
  const [isLoading, setLoading] = useState(true)

  const [DistritoImage] = useDistrictFlag(
    distritoId,
    'distrito-detalhe__cardImg'
  )

  useEffect(() => {
    fetch(`https://json.geoapi.pt/distrito/${distritoId}`)
      .then((res) => res.json())
      .then((data) => {
        setDistritoData(data)
        setLoading(false)
      })
      .catch((error) => {
        throw error
      })
  }, [params])

  return (
    <div className='sitepage sitepage--distritos-detalhe'>
      <div className='container'>
        <h1>{distritoId}</h1>

        {isLoading && <Loading />}
        {distritoData && (
          <Row>
            <Col>
              <h2>Municípios</h2>
              <ListGroup className='distrito-municipios'>
                {distritoData.municipios.map((mun) => {
                  return (
                    <ListGroup.Item key={JSON.stringify(mun)}>
                      <Link
                        className='distrito-municipios__link'
                        href={`/municipios/${mun.nome}`}>
                        {mun.nome}
                      </Link>
                    </ListGroup.Item>
                  )
                })}
              </ListGroup>
              <p>
                <Link
                  className='btn btn-outline-secondary mt-4'
                  href={`/distritos`}>
                  Voltar a distritos
                </Link>
              </p>
            </Col>
            <Col>
              <DistritoImage />
            </Col>
          </Row>
        )}
      </div>
    </div>
  )
}

export default DistritoDetalhe
