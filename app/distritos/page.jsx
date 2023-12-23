'use client'

import { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table'
import Link from 'next/link'

import Loading from '@/components/Loading'

const Distritos = () => {
  const [distritos, setDistritos] = useState([])
  // Açores e Madeira têm vários códigos INE num array; trabalha-se o texto à parte
  const [codigosIneAcores, setCodigosIneAcores] = useState('')
  const [codigosIneMadeira, setCodigosIneMadeira] = useState('')
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://json.geoapi.pt/distritos')
      .then((res) => res.json())
      .then((data) => {
        setDistritos(data)
        console.log(data)
        setLoading(false)
      })
      .catch((error) => {
        throw error
      })
  }, [])

  useEffect(() => {
    distritos.map((dist) => {
      if (dist.distrito === 'R. A. Açores') {
        setCodigosIneAcores(dist.codigoine.toString().replaceAll(',', ', '))
      } else if (dist.distrito === 'R. A. Madeira') {
        setCodigosIneMadeira(dist.codigoine.toString().replaceAll(',', ', '))
      } else return
    })
  }, [distritos])

  return (
    <div className='sitepage sitepage--distritos'>
      <div className='container'>
        <h1>Distritos</h1>

        {isLoading && <Loading />}

        {distritos.length > 0 && (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Dados 2011</th>
                <th>Dados 2022</th>
                <th>Diferença</th>
                <th>Código INE</th>
              </tr>
            </thead>
            <tbody>
              {distritos.map((item) => (
                <tr key={JSON.stringify(item.distrito)}>
                  <td>{item.distrito}</td>
                  <td>
                    <ul>
                      <li>
                        População: {item.censos2011.N_INDIVIDUOS_RESIDENT}
                      </li>
                      <li>Alojamentos: {item.censos2011.N_ALOJAMENTOS}</li>
                    </ul>
                  </td>
                  <td>
                    <ul>
                      <li>População: {item.censos2021.N_INDIVIDUOS}</li>
                      <li>
                        Alojamentos: {item.censos2021.N_ALOJAMENTOS_TOTAL}
                      </li>
                    </ul>
                  </td>
                  <td>
                    <ul>
                      <li>
                        Pop diff:{' '}
                        {item.censos2011.N_INDIVIDUOS_RESIDENT <
                        item.censos2021.N_INDIVIDUOS
                          ? '+' +
                            Math.abs(
                              item.censos2021.N_INDIVIDUOS -
                                item.censos2011.N_INDIVIDUOS_RESIDENT
                            )
                          : '-' +
                            Math.abs(
                              item.censos2011.N_INDIVIDUOS_RESIDENT -
                                item.censos2021.N_INDIVIDUOS
                            )}
                      </li>
                    </ul>
                  </td>
                  <td>
                    {item.distrito === 'R. A. Açores'
                      ? codigosIneAcores
                      : item.distrito === 'R. A. Madeira'
                      ? codigosIneMadeira
                      : item.codigoine}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    </div>
  )
}

export default Distritos
