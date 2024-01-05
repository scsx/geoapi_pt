'use client'

import { useState, useEffect } from 'react'
import { nomeDistrito } from '@/utils/utils'
import getDistritos from '@/api/getDistritos'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Loading from '@/components/Loading'
import VideoModal from '@/components/VideoModal'
import useReadMore from '@/hooks/useReadMore'
import distritosInfo from '@/data/custom/distritosinfo'
import useDistrictFlag from '@/hooks/useDistrictFlag'
import Link from 'next/link'
import './page.scss'

// Este component foi criado para poder usar o custom hook useReadMore, porque não pode ser chamado directamente dentro de um loop.
const DistritosCardHtml = ({distrito}) => {
  const [distritoName, setDistritoName] = useState('')
  const [distritoLink, setDistritoLink] = useState('')
  const [youtubeCode, setYoutubeCode] = useState('')

  useEffect(() => {
    setDistritoName(nomeDistrito(distrito))
    setDistritoLink(`/distritos/${distrito}`)
    setYoutubeCode(distritosInfo[nomeDistrito(distrito)].youtubeVideoCode)
  }, [])

  const [DistritoImage] = useDistrictFlag(distritoName, 'hpcard__cardImg')

  const [DistritoText] = useReadMore(
    distritosInfo[nomeDistrito(distrito)].desc,
    'Read more',
    'Hide',
    'readmore--homepage'
  )
  return (
    <>
      <div className='icon-square flex-shrink-0 me-3'>
        <DistritoImage />
      </div>
      <div>
        <h3>{distrito}</h3>
        <DistritoText />
        <ButtonGroup size="sm">
          <Link
            href={distritoLink}
            className='btn btn-primary'>
            Detalhes
          </Link>
          {/* {JSON.stringify(distritosInfo.acores.hex)} */}
          {/* <VideoModal youtubecode={distritosInfo[distritoName].youtubeVideoCode} /> */}
          <VideoModal youtubecode={youtubeCode} distrito={distrito} link={distritoLink} />
        </ButtonGroup>
      </div>
    </>
  )
}

// Main Component
const Distritos = () => {
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
      <div className='container px-4'>
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

export default Distritos
