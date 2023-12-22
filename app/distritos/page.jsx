'use client'

import { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table'
import Link from 'next/link'

import Loading from '@/components/Loading'

const Distritos = () => {
  const [distritos, setDistritos] = useState([])
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://json.geoapi.pt/distritos')
      .then((res) => res.json())
      .then((data) => {
        setDistritos(data)
        // console.log(data)

        // item.codigoine.toString().replace(/.{2}/g, ', ')
        data.map((item) => console.log(item.codigoine))

        setLoading(false)
      })
      .catch((error) => {
        throw error
      })
  }, [])

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
                <th>Código INE</th>
              </tr>
            </thead>
            <tbody>
              {distritos.map((item) => (
                <tr key={JSON.stringify(item.distrito)}>
                  <td>{item.distrito}</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>
                    {Array.isArray(item.codigoine)
                      ? item.codigoine.map((codigo, i, item.codigoine.length) =>
                          i - 1 === item.codigoine.length ? codigo : codigo + ', '
                        )
                      : item.codigoine}
                  </td>

                  {/* {this.state.value == 'news'? <Text>data</Text>: null } */}
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
