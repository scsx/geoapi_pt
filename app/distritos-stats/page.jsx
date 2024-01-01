'use client'

import { useState, useEffect } from 'react'
import { calcPercentage } from '@/utils/utils'
import getDistritos from '@/api/getDistritos'
import './page.scss'

const DistritosStats = () => {
  const [distritos, setDistritos] = useState([])
  const [racioSexos, setRacioSexos] = useState([])

  const getSexesRatio = (data) => {
    const sexosArray = []
    data.map((dis) => {
      sexosArray.push({
        nome: dis.distrito,
        percentagemMulheres: calcPercentage(
          dis.censos2021.N_INDIVIDUOS,
          dis.censos2021.N_INDIVIDUOS_M
        )
      })
    })

    sexosArray.sort(function (a, b) {
      return (
        parseFloat(a.percentagemMulheres) - parseFloat(b.percentagemMulheres)
      )
    })

    setRacioSexos(sexosArray)
  }

  useEffect(() => {
    let mounted = true
    getDistritos().then((data) => {
      if (mounted) {
        console.log(data)
        setDistritos(data)
        getSexesRatio(data)
      }
    })
    return () => (mounted = false)
  }, [])

  return (
    <div className='sitepage sitepage--distats'>
      <div className='container'>
        <h1>Estatísticas</h1>
        <h3>Percentagem Mulheres vs Homens</h3>
        <table className='table table-sm'>
          <tbody>
            {racioSexos.map((dis) => {
              return (
                <tr key={dis.nome}>
                  <td className='nametd'>{dis.nome}</td>
                  <td className='default-men'>
                    <div
                      className='mulheres'
                      style={{
                        width: `${dis.percentagemMulheres}%`
                      }}>
                      {dis.percentagemMulheres}%
                    </div>
                    {100 - dis.percentagemMulheres}%
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DistritosStats
