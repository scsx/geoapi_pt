import { useState } from 'react'

const useReadMore = (buttonText, text) => {
  const [visible, setVisible] = useState(false)

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

export default useReadMore
