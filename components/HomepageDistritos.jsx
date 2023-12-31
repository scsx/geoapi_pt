'use client'

import { useState, useEffect } from 'react'
import { nomeDistrito } from '@/utils/utils'
import getDistritos from '@/api/getDistritos'
import Loading from '@/components/Loading'
import useReadMore from '@/hooks/useReadMore'
import distritosInfo from '@/data/distritosinfo'
import useDistrictFlag from '@/hooks/useDistrictFlag'
import Link from 'next/link'

// Este component foi criado para poder usar o custom hook useReadMore, porque não pode ser chamado directamente dentro de um loop.
const DistritosCardHtml = (props) => {
  const [distritoName, setDistritoName] = useState('')

  useEffect(() => {
    setDistritoName(nomeDistrito(props.distrito))
  }, [])

  const [DistritoImage] = useDistrictFlag(distritoName, 'hpcard__cardImg')

  const [DistritoText] = useReadMore(
    distritosInfo[nomeDistrito(props.distrito)].desc,
    'Read more',
    'readmore--homepage'
  )
  return (
    <>
      <div className='icon-square flex-shrink-0 me-3'>
        <DistritoImage />
      </div>
      <div>
        <h3>{props.distrito}</h3>
        <DistritoText />
        <Link
          href={`/distritos/${props.distrito}`}
          className='btn btn-primary btn-sm'>
          Ver
        </Link>
      </div>
    </>
  )
}

const HomepageDistritos = () => {
  const [distritos, setDistritos] = useState([])
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

  return (
    <div className='sitepage sitepage--hp'>
      <div className='container px-4 py-5'>
        <h2 className='pb-2 border-bottom'>Distritos</h2>
        {isLoading && <Loading />}
        {distritos.length > 0 && (
          <div className='row g-4 py-5 row-cols-1 row-cols-lg-3'>
            {distritos.map((dis) => {
              return (
                <div
                  className='col d-flex align-items-start hpcard'
                  key={dis.distrito}>
                  <DistritosCardHtml {...dis} />
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default HomepageDistritos
