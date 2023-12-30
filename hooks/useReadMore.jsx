'use client'

import { useState } from 'react'

const useReadMore = (text, buttonText, classname) => {
  const [visible, setVisible] = useState(false)

  const handleToggle = () => {
    setVisible((current) => !current)
  }

  const readMoreText = () => (
    <div className={`readmore ${classname}`}>
      <div className={`readmore__inner readmore__inner--${visible}`}>
        {text}
      </div>
      <button className='btn btn-link' onClick={handleToggle}>
        {buttonText}
      </button>
    </div>
  )
  return [readMoreText]
}

export default useReadMore
