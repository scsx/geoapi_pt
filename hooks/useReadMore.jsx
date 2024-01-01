'use client'

import { useState } from 'react'

const useReadMore = (text, buttonText, buttonTextHide, classname) => {
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
        {visible ? buttonTextHide : buttonText}
      </button>
    </div>
  )
  return [readMoreText]
}

export default useReadMore
