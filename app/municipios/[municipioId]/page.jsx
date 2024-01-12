'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Badge from 'react-bootstrap/Badge'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'

import useDistrictFlag from '@/hooks/useDistrictFlag'

import PoderDeCompraMun from './PoderDeCompraMun'
import MunicipioEdificios from './MunicipioEdificios'
import MunicipioSaldo from './MunicipioSaldo'
import Loading from '@/components/Loading'
import PrettyNumber from '@/components/PrettyNumber'

import {
  nomeDistrito,
  capitalizeFirstLetters,
  toLocaleString,
  calcPercentage
} from '@/utils/utils'
import './page.scss'

const MunicipioDetalhe = ({ params }) => {
  const municipioId = decodeURIComponent(params.municipioId)
  const [municipioData, setMunicipioData] = useState(null)
  const [distrito, setDistrito] = useState('')
  const [distritoVisibleName, setDistritoVisibleName] = useState('')
  const [isLoading, setLoading] = useState(true)
  const [simpleNames, setSimpleNames] = useState(true)

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
              <small className='codigo'>
                INE
                <br />
                <PrettyNumber
                  number={municipioData.codigoine}
                  cssclass='d-inline-block'
                />
              </small>
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
              <Col sm='4'>
                <h3 className='mb-4'>Dados Gerais</h3>
                <ListGroup>
                  <ListGroup.Item>
                    População: <b>{toLocaleString(municipioData.populacao)}</b>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Eleitores:{' '}
                    <b>
                      {toLocaleString(municipioData.eleitores)}{' '}
                      <small>
                        (
                        {calcPercentage(
                          municipioData.populacao,
                          municipioData.eleitores
                        )}
                        %)
                      </small>
                    </b>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Núcleos familiares:{' '}
                    <b>
                      {toLocaleString(
                        municipioData.censos2021.N_NUCLEOS_FAMILIARES
                      )}
                    </b>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Área em hectares: <b>{municipioData.areaha}</b>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Densidade pop:{' '}
                    <b>
                      {Math.round(
                        municipioData.populacao / municipioData.areaha
                      )}{' '}
                      hab./km²
                    </b>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Código Postal: <b>{municipioData.codigopostal}</b>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Email:{' '}
                    <b>
                      <a href={`mailto:${municipioData.email}`}>
                        {municipioData.email}
                      </a>
                    </b>
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col sm='4'>
                <div className='municipio-detalhe'>
                  <h3 className='mb-4'>
                    Freguesias{' '}
                    <button
                      className='municipio-detalhe__UF btn btn-link'
                      onClick={() => setSimpleNames(!simpleNames)}>
                      nomes {simpleNames ? 'completos' : 'simples'}
                    </button>
                  </h3>
                  <div className='municipio-detalhe__lista'>
                    {municipioData.geojsons.freguesias.map((freg) => (
                      <Link
                        key={freg.properties.Freguesia}
                        href={`/municipios/${municipioId}/freguesias/${freg.properties.Freguesia}`}>
                        <Badge className='municipio-detalhe__item'>
                          {simpleNames
                            ? freg.properties.Freguesia.replace(
                                'União das freguesias de ',
                                ''
                              )
                            : freg.properties.Freguesia}
                        </Badge>
                      </Link>
                    ))}
                  </div>
                </div>
              </Col>
              <Col sm='4'>
                <h3 className='mb-4'>Brasão Distrito</h3>
                <div className='brasao'>
                  <DistritoImage />
                </div>

                <h3 className='mt-5 mb-4'>Poder de compra</h3>
                <PoderDeCompraMun municipio={municipioId} />
              </Col>
            </Row>

            <h3 className='mt-5 mb-4'>Edifícios por ano de construção</h3>
            <MunicipioEdificios
              censos={municipioData.censos2021}
              total={toLocaleString(
                municipioData.censos2021.N_EDIFICIOS_CLASSICOS
              )}
              calcPercentage={calcPercentage}
            />

            <h3 className='mt-5 mb-4'>Saldo Migratório</h3>
            <MunicipioSaldo
              municipio={municipioId}
              calcPercentage={calcPercentage}
            />

            <Link
              className='btn btn-outline-secondary mt-4'
              href={`/municipios`}>
              Voltar a municípios
            </Link>
          </>
        )}
      </div>
    </div>
  )
}

export default MunicipioDetalhe
