'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

import Loading from '@/components/Loading'
import './page.scss'

const freguesiasJson = require('../../data/geoapi_pt-Backups/freguesias.json')

const Freguesias = () => {
  const [freguesias, setFreguesias] = useState([])
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    // Check parishes with the same name like: Lamas (Braga / Macedo de Cavaleiros / Miranda do Corvo)
    const freguesiasAllData = []
    let ultimaFreguesia = null

    freguesiasJson.map((f, i) => {
      const nomeMunicipio = f.match(/\(([^)]+)\)/)[1]
      const nomeFreguesia = f.replace(/ *\([^)]*\) */g, '')
      let isDuplicate = false

      if (freguesiasAllData.length > 0) {
        ultimaFreguesia = freguesiasAllData[freguesiasAllData.length - 1].nome
      }

      if (nomeFreguesia === ultimaFreguesia) {
        isDuplicate = true
        freguesiasAllData[freguesiasAllData.length - 1].duplicate = isDuplicate
      }

      freguesiasAllData.push({
        nome: nomeFreguesia,
        nomeMaisMunicipio: f,
        municipio: nomeMunicipio,
        duplicate: isDuplicate
      })
    })

    setFreguesias(freguesiasAllData)
    setLoading(false)
  }, [freguesiasJson])

  return (
    <div className='sitepage sitepage--freguesias'>
      <div className='container'>
        <h1>Freguesias</h1>

        {isLoading && <Loading />}

        {freguesias && freguesias.length > 0 && (
          <div className='freglist'>
            {freguesias.map((f) => (
              <Link
                href={`/municipios/${f.municipio}/freguesias/${f.nome}`}
                key={f.nomeMaisMunicipio}>
                {f.duplicate ? f.nomeMaisMunicipio : f.nome}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Freguesias
