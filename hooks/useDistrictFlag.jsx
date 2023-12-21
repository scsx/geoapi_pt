import { useState, useEffect } from 'react'
import Image from 'next/image'

const useDistrictFlag = (district) => {
  const [distritoImage, setDistritoImage] = useState('')
  useEffect(() => {
    let districtLowerCase = district.toLowerCase()

    switch (districtLowerCase) {
      case 'bragança':
        setDistritoImage('braganca')
        break
      case 'évora':
        setDistritoImage('evora')
        break
      case 'r. a. açores':
        setDistritoImage('acores')
        break
      case 'r. a. madeira':
        setDistritoImage('madeira')
        break
      case 'santarém':
        setDistritoImage('santarem')
        break
      case 'viana do castelo':
        setDistritoImage('viana')
        break
      case 'vila real':
        setDistritoImage('vila-real')
        break
      default:
        setDistritoImage(districtLowerCase)
    }
  }, [district])

  const Flag = () => (
    <Image
      src={`/distritos/${distritoImage}.png`}
      width={200}
      height={200}
      alt={distritoImage}
    />
  )
  return [Flag]
}

export default useDistrictFlag
