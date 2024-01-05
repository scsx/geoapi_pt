'use client'

import { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table'
import Link from 'next/link'

import getDistritos from '@/api/getDistritos'
import Loading from '@/components/Loading'
import { toLocaleString } from '@/utils/utils'
import './page.scss'

const PerdasGanhos = () => {
  const [distritos, setDistritos] = useState([])
  // Açores e Madeira têm vários códigos INE num array; trabalha-se o texto à parte
  const [codigosIneAcores, setCodigosIneAcores] = useState('')
  const [codigosIneMadeira, setCodigosIneMadeira] = useState('')
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    getDistritos().then((data) => {
      if (mounted) {
        setDistritos(data)
        setLoading(false)
      }
    })
    return () => (mounted = false)
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
    <div className='popgain'>
      {isLoading && <Loading />}

      {distritos && distritos.length > 0 && (
        <>
          <Table striped bordered hover className='popgain__table'>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Dados 2011</th>
                <th>Dados 2022</th>
                <th>Diferença</th>
                <th className='popgain__tableIne'>Código INE</th>
              </tr>
            </thead>
            <tbody>
              {distritos.map((item) => (
                <tr key={JSON.stringify(item.distrito)}>
                  <td>
                    <Link
                      href={`/distritos/${item.distrito}`}
                      className='popgain__tableTitleLink'>
                      {item.distrito}
                    </Link>
                  </td>
                  <td>
                    <ul className='popgain__tableUl'>
                      <li>
                        População:{' '}
                        {toLocaleString(item.censos2011.N_INDIVIDUOS_RESIDENT)}
                      </li>
                      <li>
                        Alojamentos:{' '}
                        {toLocaleString(item.censos2011.N_ALOJAMENTOS)}
                      </li>
                    </ul>
                  </td>
                  <td>
                    <ul className='popgain__tableUl'>
                      <li>
                        População:{' '}
                        {toLocaleString(item.censos2021.N_INDIVIDUOS)}
                      </li>
                      <li>
                        Alojamentos:{' '}
                        {toLocaleString(item.censos2021.N_ALOJAMENTOS_TOTAL)}
                      </li>
                    </ul>
                  </td>
                  <td>
                    Pop diff:{' '}
                    {item.censos2011.N_INDIVIDUOS_RESIDENT <
                    item.censos2021.N_INDIVIDUOS ? (
                      <b className='popgain__bold popgain__bold--green'>
                        {'+' +
                          toLocaleString(
                            Math.abs(
                              item.censos2021.N_INDIVIDUOS -
                                item.censos2011.N_INDIVIDUOS_RESIDENT
                            )
                          )}
                      </b>
                    ) : (
                      <b className='popgain__bold popgain__bold--red'>
                        {'-' +
                          toLocaleString(
                            Math.abs(
                              item.censos2011.N_INDIVIDUOS_RESIDENT -
                                item.censos2021.N_INDIVIDUOS
                            )
                          )}
                      </b>
                    )}
                    <br />
                    {item.distrito === 'Viana do Castelo' ? '(1)' : ''}
                  </td>
                  <td className='popgain__tableIne'>
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

          <p className='mt-4'>
            (1){' '}
            <a
              href='https://www.rtp.pt/noticias/pais/distrito-de-viana-do-castelo-perdeu-mais-de-13-mil-habitantes-na-ultima-decada_n1338669'
              className='btn btn-link'
              target='_blank'>
              DB errada? Distrito de Viana do Castelo perdeu mais de 13 mil
              habitantes na última década <i>(RTP)</i>
            </a>
          </p>
        </>
      )}
    </div>
  )
}

export default PerdasGanhos
