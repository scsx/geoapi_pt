'use client'

import { useState, useEffect } from 'react'
import { calcPercentage } from '@/utils/utils'
import getDistritos from '@/api/getDistritos'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import PerdasGanhos from './PerdasGanhos'
import Loading from '@/components/Loading'
import './page.scss'

const DistritosStats = () => {
  const [racioSexos, setRacioSexos] = useState([])
  const [racioIdades, setRacioIdades] = useState([])
  const [tab, setTab] = useState('mvh')

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

  const getAgesRatio = (data) => {
    const agesArray = []
    data.map((dis) => {
      agesArray.push({
        nome: dis.distrito,
        idades: {
          criancas: calcPercentage(
            dis.censos2021.N_INDIVIDUOS,
            dis.censos2021.N_INDIVIDUOS_0_14
          ),
          jovens: calcPercentage(
            dis.censos2021.N_INDIVIDUOS,
            dis.censos2021.N_INDIVIDUOS_15_24
          ),
          adultos: calcPercentage(
            dis.censos2021.N_INDIVIDUOS,
            dis.censos2021.N_INDIVIDUOS_25_64
          ),
          seniores: calcPercentage(
            dis.censos2021.N_INDIVIDUOS,
            dis.censos2021.N_INDIVIDUOS_65_OU_MAIS
          )
        }
      })
    })

    agesArray.sort(function (a, b) {
      return parseFloat(b.idades.criancas) - parseFloat(a.idades.criancas)
    })

    setRacioIdades(agesArray)
  }

  useEffect(() => {
    let mounted = true
    getDistritos().then((data) => {
      if (mounted) {
        getSexesRatio(data)
        getAgesRatio(data)
      }
    })
    return () => (mounted = false)
  }, [])

  return (
    <div className='sitepage sitepage--distats'>
      <div className='container'>
        <h1>Demografia</h1>

        <Tabs activeKey={tab} onSelect={(k) => setTab(k)} className='mb-3'>
          <Tab eventKey='mvh' title='Mulheres vs Homens'>
            <h3 className='mb-5'>Percentagem Mulheres vs Homens</h3>
            {racioSexos.length === 0 && <Loading />}
            {racioSexos.length > 0 && (
              <table className='table table-sm table-sexos'>
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
            )}
          </Tab>

          <Tab eventKey='idades' title='Idades'>
            <h3 className='mb-5'>Distribuição de Idades (+ jovens)</h3>
            {racioIdades.length === 0 && <Loading />}
            {racioIdades.length > 0 && (
              <table className='table table-sm table-idades'>
                <thead>
                  <tr>
                    <th>Distrito</th>
                    <th className='text-center'>0-14 / 15-24 / 25-64 / 65+</th>
                  </tr>
                </thead>
                <tbody>
                  {racioIdades.map((dis) => {
                    return (
                      <tr key={dis.nome}>
                        <td
                          className='nametd'
                          style={{
                            width: '25%'
                          }}>
                          {dis.nome}
                        </td>
                        <td
                          className='idades'
                          style={{
                            width: '75%'
                          }}>
                          <div className='d-flex w-100'>
                            <div
                              className='criancas'
                              style={{
                                width: `${dis.idades.criancas}%`
                              }}>
                              {dis.idades.criancas}%
                            </div>
                            <div
                              className='jovens'
                              style={{
                                width: `${dis.idades.jovens}%`
                              }}>
                              {dis.idades.jovens}%
                            </div>
                            <div
                              className='adultos'
                              style={{
                                width: `${dis.idades.adultos}%`
                              }}>
                              {dis.idades.adultos}%
                            </div>
                            <div
                              className='seniores'
                              style={{
                                width: `${dis.idades.seniores}%`
                              }}>
                              {dis.idades.seniores}%
                            </div>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            )}
          </Tab>

          <Tab eventKey='peg' title='Perdas e Ganhos'>
            <h3 className='mb-5'>Perdas e Ganhos de População</h3>
            <PerdasGanhos />
          </Tab>
        </Tabs>
      </div>
    </div>
  )
}

export default DistritosStats
