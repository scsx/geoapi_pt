import { useState, useEffect } from 'react'
import { nomeDistrito } from '@/utils/utils'
import distritosInfo from '@/data/custom/distritosinfo'
import useDistrictFlag from '@/hooks/useDistrictFlag'

const useDistrictHero = (distrito) => {
  const [heroImage, setHeroImage] = useState('')
  const [heroInfo, setHeroInfo] = useState({})
  const [DistritoImage] = useDistrictFlag(distrito, 'hero__Img d-block mb-4')

  useEffect(() => {
    setHeroImage(nomeDistrito(distrito))
    setHeroInfo({
      desc: distritosInfo[nomeDistrito(distrito)].desc,
      hex: distritosInfo[nomeDistrito(distrito)].hex
    })
  }, [distrito])

  const Hero = () => (
    <div
      className='sitepage-hero mb-5'
      style={{
        backgroundImage: heroImage && `url(${`/distritos_bg/${heroImage}.jpg`})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      }}>
      <div className='container'>
        <DistritoImage />
        <h1
          className='display-5 fw-bold text-white'
          style={{
            backgroundColor: heroInfo && heroInfo.hex
          }}>
          {distrito}
        </h1>
        <p
          className='lead mb-4 hero__Desc'
          style={{
            color: heroInfo && heroInfo.hex
          }}>
          {heroInfo && heroInfo.desc}
        </p>
      </div>
    </div>
  )

  return [Hero]
}

export default useDistrictHero
