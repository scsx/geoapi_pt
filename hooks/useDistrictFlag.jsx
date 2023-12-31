import { useState, useEffect } from 'react'
import { nomeDistrito } from '@/utils/utils'
import Image from 'next/image'

const useDistrictFlag = (distrito, className) => {
  const [distritoImage, setDistritoImage] = useState('')

  useEffect(() => {
    console.log(distritoImage)
    setDistritoImage(nomeDistrito(distrito))
  }, [distrito])

  const Flag = () => (
    <Image
      src={`/distritos/${distritoImage}.png`}
      className={className}
      alt={distritoImage}
      layout='fill'
    />
  )

  return [Flag]
}

export default useDistrictFlag
