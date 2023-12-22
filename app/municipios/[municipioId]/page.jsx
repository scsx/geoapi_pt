'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Badge from 'react-bootstrap/Badge'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

import useDistrictFlag from '@/hooks/useDistrictFlag'
import Loading from '@/components/Loading'
import './page.scss'

const MunicipioDetalhe = ({ params }) => {
  const municipioId = decodeURIComponent(params.municipioId)
  const [municipioData, setMunicipioData] = useState(null)
  const [distrito, setDistrito] = useState('')
  const [isLoading, setLoading] = useState(true)

  const [DistritoImage] = useDistrictFlag(
    distrito,
    'municipio-detalhe__cardImg'
  )

  useEffect(() => {
    fetch(`https://json.geoapi.pt/municipio/${municipioId}`)
      .then((res) => res.json())
      .then((data) => {
        setMunicipioData(data)
        setDistrito(data.distrito)
        setLoading(false)
      })
      .catch((error) => {
        throw error
      })
  }, [params])

  return (
    <div className='sitepage sitepage--municipios-detalhe'>
      <div className='container'>
        <h1>{municipioId}</h1>

        {isLoading && <Loading />}

        {municipioData && (
          <Row>
            <Col>
              <Card className='municipio-detalhe__card'>
                <div className='municipio-detalhe__cardImg'>
                  <DistritoImage />
                </div>
                <Card.Body>
                  <Card.Title>{`Distrito: ${municipioData.distrito}`}</Card.Title>
                  <Card.Text>{`População: ${municipioData.populacao}`}</Card.Text>
                  <Button variant='primary'>Go to Distrito (todo)</Button>
                </Card.Body>
              </Card>

                <Link className='btn btn-outline-secondary mt-4' href={`/municipios`}>Voltar a municípios</Link>
            </Col>
            <Col>
              <div className='municipio-detalhe'>
                <div className='municipio-detalhe__lista'>
                  <div className='municipio-detalhe__lista'>
                    {municipioData.geojsons.freguesias.map((freg) => (
                      <Badge
                        key={freg.properties.Freguesia}
                        className='municipio-detalhe__item'>
                        {freg.properties.Freguesia}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        )}
      </div>
    </div>
  )
}

export default MunicipioDetalhe
