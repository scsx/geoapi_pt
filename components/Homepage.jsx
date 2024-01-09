'use client'

import { useState } from 'react'
import PortugalSVG from './PortugalSVG'
import { nomeDistrito } from '@/utils/utils'
import './Homepage.scss'

const Homepage = () => {
  const [distrito, setDistrito] = useState('')

  const handleMouseEnter = (e) => {
    setDistrito(e.target.parentElement.querySelector('title').innerHTML)
  }

  const handleMouseLeave = () => {
    setDistrito('')
  }

  return (
    <div className='sitepage sitepage--hp'>
      <PortugalSVG distritoIn={handleMouseEnter} distritoOut={handleMouseLeave} />
      {distrito && <h1>{distrito}</h1>}
    </div>
  )
}

export default Homepage
