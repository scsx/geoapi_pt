'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

import Loading from '@/components/Loading'
import './page.scss'

const freguesiasJson = require('../../data/geoapi_pt-Backups/freguesias.json')

const Freguesias = () => {
  const [freguesias, setFreguesias] = useState([])
  const [freguesiasVisible, setFreguesiasVisible] = useState([])
  const [searching, setSearching] = useState(false)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    // Check parishes with the same name like: Lamas (Braga / Macedo de Cavaleiros / Miranda do Corvo)
    const allFregRaw = []
    let allFreg = []
    let ultimaFreguesia = null

    freguesiasJson.map((f) => {
      // Com uma pequena ajuda do ChatGPT
      // Encontrar o último set de parentesis (há sempre 1 ou 2) e retirar de lá o nome do municipio.
      const matches = f.match(/\(([^)]+)\)/g)
      const nomeMunicipio = matches[matches.length - 1].replace(/^\(|\)$/g, '')

      // O contrário da operação anterior dá o nome da freguesia.
      const nomeFreguesia = f.replace(/\([^)]*\)$/, '').trim()
      let isDuplicate = false

      // Depois de o array populado encontrar a entrada anterior para detectar nomes iguais.
      // Quando há dois sets de parentesis não funciona bem mas os urls funcionam à mesma e os nomes não se confundem.
      if (allFregRaw.length > 0) {
        ultimaFreguesia = allFregRaw[allFregRaw.length - 1].nome
      }

      if (nomeFreguesia === ultimaFreguesia) {
        isDuplicate = true
        allFregRaw[allFregRaw.length - 1].duplicate = isDuplicate
      }

      // Criar um array temporario com os dados incluindo nomes sem acentos, para se poder ordenar, filtrar.
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
      setSearching(true)
      const filteredFreg = freguesias.filter((freg) => {
        return freg.nomeEscaped.includes(query)
      })
      setFreguesiasVisible(filteredFreg)
    } else {
      setFreguesiasVisible(freguesias)
      setSearching(false)
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
            {freguesiasVisible.length > 0 &&
              `${freguesiasVisible.length} freguesias`}
          </span>
        </div>

        {isLoading && <Loading />}

        {freguesiasVisible && freguesiasVisible.length > 0 && (
          <div className={`freglist${searching ? ' searching' : ''}`}>
            {freguesiasVisible.map((f) => (
              <Link
                href={`/municipios/${f.municipio}/freguesias/${f.nome}`}
                data-escapedname={f.nomeEscaped}
                data-duplicate={f.duplicate}
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
