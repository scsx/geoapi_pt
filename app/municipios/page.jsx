const getData = async () => {
  const res = await fetch('https://json.geoapi.pt/municipios')

  if (!res.ok) {
    throw new Error('Failed to fetch data')
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
    <div>
      <div className='container'>
        <h1>Municípios</h1>
        {municipios && municipios.map((item) => <p>{item}</p>)}
      </div>
    </div>
  )
}

export default Municipios
