'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import Loading from '@/components/Loading'

const Municipios = () => {
  const [municipios, setMunicipios] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [existingLetters, setExistingLetters] = useState([])
  const [letter, setLetter] = useState('Todos')

  // Exemplos para:
  // Lajes Das Flores
  // https://json.geoapi.pt/municipio/Lajes%20Das%20Flores
  // Lagoa (açores)
  // https://json.geoapi.pt/municipio/Lagoa%20(açores)

  useEffect(() => {
    fetch('https://json.geoapi.pt/municipios')
      .then((res) => res.json())
      .then((data) => {
        // Sem localeCompare os nomes começados por special chars iam para o fim da array (ex: Vizela, Vouzela, Águeda, ...)
        const sortedAlph = data.sort(function (a, b) {
          return a.localeCompare(b)
        })
        setMunicipios(sortedAlph)
        setLoading(false)

        // Obter todas as primeiras letras de cada item, sem acentos
        let allLetters = sortedAlph.map((mun) => {
          return mun
            .charAt(0)
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
        })

        // Remover duplicados
        allLetters = allLetters.filter(
          (item, index) => allLetters.indexOf(item) === index
        )

        // Update state
        setExistingLetters(allLetters)
      })
      .catch((error) => {
        throw error
      })
  }, [])

  return (
    <div className='sitepage sitepage--municipios'>
      <div className='container'>
        <h1>Municípios</h1>
        {isLoading && <Loading />}

        {municipios && (
          <Tabs
            id='municipiosTabs'
            activeKey={letter}
            onSelect={(key) => setLetter(key)}
            className='mb-3'>
            <Tab eventKey='Todos' title='Todos'>
              {municipios.map((mun) => (
                <Link
                  className='mb-2 d-block'
                  href={`/municipios/${mun}`}
                  key={JSON.stringify(mun)}>
                  {mun}
                </Link>
              ))}
            </Tab>

            {existingLetters.length > 0 &&
              existingLetters.map((item) => (
                <Tab eventKey={item} title={item} key={item}>
                  {municipios.map((mun) =>
                    mun.charAt(0) == item ? (
                      <Link
                        className='mb-2 d-block'
                        href={`/municipios/${mun}`}
                        key={JSON.stringify(mun)}>
                        {mun}
                      </Link>
                    ) : (
                      ''
                    )
                  )}
                </Tab>
              ))}
          </Tabs>
        )}
      </div>
    </div>
  )
}

export default Municipios
