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
    const freguesiasAllData = []
    let ultimaFreguesia = null

    freguesiasJson.map((f, i) => {
      const nomeMunicipio = f.match(/\(([^)]+)\)/)[1]
      const nomeFreguesia = f.replace(/ *\([^)]*\) */g, '')

      if (freguesiasAllData.length > 0) {
        ultimaFreguesia = freguesiasAllData[freguesiasAllData.length - 1].nome
      }

      freguesiasAllData.push({
        nome: nomeFreguesia,
        nomeMaisMunicipio: f,
        municipio: nomeMunicipio,
        duplicate: nomeFreguesia === ultimaFreguesia ? true : false
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
              <p key={f.nomeMaisMunicipio}>{f.duplicate ? f.nomeMaisMunicipio : f.nome}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Freguesias
