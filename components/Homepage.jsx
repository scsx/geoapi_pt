'use client'

import { useState } from 'react'
import PortugalSVG from './PortugalSVG'
import { useRouter } from 'next/navigation'
import { nomeDistrito } from '@/utils/utils'
import './Homepage.scss'

const Homepage = () => {
  const [distrito, setDistrito] = useState('')
  const router = useRouter()

  const handleMouseEnter = (e) => {
    setDistrito(e.target.parentElement.querySelector('title').innerHTML)
  }

  const handleMouseLeave = () => {
    setDistrito('')
  }

  const handleMouseClick = (e) => {
    let distritoName = e.target.parentElement.querySelector('title').innerHTML
    router.push(`/distritos/${distritoName}`)
  }

  return (
    <div className='sitepage sitepage--hp'>
      <PortugalSVG
        distritoIn={handleMouseEnter}
        distritoOut={handleMouseLeave}
        distritoVisit={handleMouseClick}
      />
      {distrito && <h1>{distrito}</h1>}
    </div>
  )
}

export default Homepage
