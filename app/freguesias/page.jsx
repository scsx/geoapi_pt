'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

import Loading from '@/components/Loading'
import './page.scss'

const freguesiasJson = require('../../data/geoapi_pt-Backups/freguesias.json')

const Freguesias = () => {
  const [freguesias, setFreguesias] = useState([])
  const [freguesiasVisible, setFreguesiasVisible] = useState([])
  const [total, setTotal] = useState(0)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    // Check parishes with the same name like: Lamas (Braga / Macedo de Cavaleiros / Miranda do Corvo)
    const allFregRaw = []
    let allFreg = []
    let ultimaFreguesia = null

    freguesiasJson.map((f) => {
      const nomeMunicipio = f.match(/\(([^)]+)\)/)[1]
      const nomeFreguesia = f.replace(/ *\([^)]*\) */g, '')
      let isDuplicate = false

      if (allFregRaw.length > 0) {
        ultimaFreguesia = allFregRaw[allFregRaw.length - 1].nome
      }

      if (nomeFreguesia === ultimaFreguesia) {
        isDuplicate = true
        allFregRaw[allFregRaw.length - 1].duplicate = isDuplicate
      }

      allFregRaw.push({
        nome: nomeFreguesia,
        nomeEscaped: nomeFreguesia
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toLowerCase(),
        nomeMaisMunicipio: f,
        municipio: nomeMunicipio,
        duplicate: isDuplicate
      })

      // Reorder array ignoring accents
      allFreg = allFregRaw.sort((a, b) => {
        return a.nomeEscaped.localeCompare(b.nomeEscaped)
      })
    })

    setFreguesias(allFreg)
    setFreguesiasVisible(allFreg)
    setLoading(false)
  }, [freguesiasJson])

  const filterFreg = (event) => {
    const query = event.target.value.toLowerCase()

    if (query !== '') {
      const filteredFreg = freguesias.filter((freg) => {
        return freg.nomeEscaped.includes(query)
      })
      setFreguesiasVisible(filteredFreg)
    } else {
      setFreguesiasVisible(freguesias)
    }
  }

  return (
    <div className='sitepage sitepage--freguesias'>
      <div className='container'>
        <h1>Freguesias</h1>

        <div className='d-flex search'>
          <input
            type='text'
            className='form-control'
            placeholder='Pesquisar'
            onChange={filterFreg}
          />
          <span className='totalfreg'>
            {freguesiasVisible.length > 0 && `${freguesiasVisible.length} freguesias`}
          </span>
        </div>

        {isLoading && <Loading />}

        {freguesiasVisible && freguesiasVisible.length > 0 && (
          <div className='freglist'>
            {freguesiasVisible.map((f) => (
              <Link
                href={`/municipios/${f.municipio}/freguesias/${f.nome}`}
                data-escapedname={f.nomeEscaped}
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
