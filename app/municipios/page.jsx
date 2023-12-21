'use client'

import Link from 'next/link'

const getData = async () => {
  const res = await fetch('https://json.geoapi.pt/municipios')
  if (!res.ok) {
    throw new Error('Failed to fetch municipios')
  }
  return res.json()
}

const Municipios = async () => {
  const municipios = await getData()

  // Exemplos para:
  // Lajes Das Flores
  // https://json.geoapi.pt/municipio/Lajes%20Das%20Flores
  // Lagoa (açores)
  // https://json.geoapi.pt/municipio/Lagoa%20(açores)

  return (
    <div className='sitepage sitepage--municipios'>
      <div className='container'>

        <h1>Municípios</h1>
        <ul>
          {municipios &&
            municipios.map((item) => (
              <li key={JSON.stringify(item)} data-key={JSON.stringify(item)}>
                <Link href={`/municipios/${item}`}>{item}</Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}

export default Municipios
