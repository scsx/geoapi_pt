import { useState, useEffect } from 'react'
import { nomeDistrito } from '@/utils/utils'
import Image from 'next/image'

const useDistrictFlag = (distrito, className) => {
  const [distritoImage, setDistritoImage] = useState('/empty.png')

  useEffect(() => {
    setDistritoImage(`/distritos/${nomeDistrito(distrito)}.png`)
  }, [distrito])

  const Flag = () => (
    <Image
      src={distritoImage}
      className={className}
      alt={distrito}
      layout='fill'
    />
  )

  return [Flag]
}

export default useDistrictFlag
