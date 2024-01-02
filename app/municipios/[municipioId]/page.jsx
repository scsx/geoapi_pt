'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Badge from 'react-bootstrap/Badge'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

import useDistrictFlag from '@/hooks/useDistrictFlag'

import Loading from '@/components/Loading'
import PrettyNumber from '@/components/PrettyNumber'

import {
  toLocaleString,
  nomeDistrito,
  capitalizeFirstLetters
} from '@/utils/utils'
import './page.scss'

const MunicipioDetalhe = ({ params }) => {
  const municipioId = decodeURIComponent(params.municipioId)
  const [municipioData, setMunicipioData] = useState(null)
  const [distrito, setDistrito] = useState('')
  const [distritoVisibleName, setDistritoVisibleName] = useState('')
  const [isLoading, setLoading] = useState(true)

  const [DistritoImage] = useDistrictFlag(
    nomeDistrito(distrito),
    'municipio-detalhe__cardImg'
  )

  useEffect(() => {
    fetch(`https://json.geoapi.pt/municipio/${municipioId}`)
      .then((res) => res.json())
      .then((data) => {
        setMunicipioData(data)
        setDistrito(data.distrito)
        setDistritoVisibleName(capitalizeFirstLetters(data.distrito))
        setLoading(false)
      })
      .catch((error) => {
        throw error
      })
  }, [params])

  return (
    <div className='sitepage sitepage--municipios-detalhe'>
      <div className='container'>
        {isLoading && <Loading />}

        {municipioData && (
          <>
            <h1>
              <small>
                <Link
                  className='municipio-detalhe__Link'
                  href={`/distritos/${distritoVisibleName}`}>
                  {distritoVisibleName}
                </Link>
              </small>
              <br />
              {municipioId}
            </h1>

            <Row>
              <Col>
                <Card className='municipio-detalhe__card'>
                  <div className='municipio-detalhe__cardImg'>
                    <DistritoImage />
                  </div>
                  <Card.Body>
                    <Card.Text className='mt-4' as='div'>
                      <h3>
                        População:{' '}
                        <PrettyNumber
                          number={municipioData.populacao}
                          cssclass='d-inline-block'
                        />
                      </h3>
                      <br />
                      {`Área em hectares: ${municipioData.areaha}`}
                      <br />
                      {`Densidade pop.: ${Math.round(
                        municipioData.populacao / municipioData.areaha
                      )} hab./km²`}
                      <br />
                      {`Código Postal: ${municipioData.codigopostal}`}
                      <br />
                      {`Email: ${municipioData.email}`}
                      <br />
                      {`Cód. Postal: ${municipioData.codigopostal}`}
                    </Card.Text>
                  </Card.Body>
                </Card>

                <Link
                  className='btn btn-outline-secondary mt-4'
                  href={`/municipios`}>
                  Voltar a municípios
                </Link>
              </Col>
              <Col>
                <div className='municipio-detalhe'>
                  <h3 className='mb-4'>Freguesias</h3>
                  <div className='municipio-detalhe__lista'>
                    {municipioData.geojsons.freguesias.map((freg) => (
                      <Link
                        key={freg.properties.Freguesia}
                        href={`/municipios/${municipioData.distrito}/freguesias/${freg.properties.Freguesia}`}>
                        <Badge className='municipio-detalhe__item'>
                          {freg.properties.Freguesia}
                        </Badge>
                      </Link>
                    ))}
                  </div>
                </div>
              </Col>
            </Row>
          </>
        )}
      </div>
    </div>
  )
}

export default MunicipioDetalhe
