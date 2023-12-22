'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const Distritos = () => {
  const [distritos, setDistritos] = useState([])

  useEffect(() => {
    fetch('https://json.geoapi.pt/distritos')
      .then((res) => res.json())
      .then((data) => {
        setDistritos(data)
        //setLoading(false)

        console.log(distritos)
      })
      .catch((error) => {
        throw error
      })
  }, [])

  return (
    <div className='sitepage sitepage--distritos'>
      <div className='container'>
        <h1>Distritos</h1>
        <ul>
          {distritos &&
            distritos.map((item) => (
              <li key={JSON.stringify(item)} data-key={JSON.stringify(item)}>
                {/* <Link href={`/distritos/${item}`}>{item}</Link> */}
                {item.distrito}
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}

export default Distritos
