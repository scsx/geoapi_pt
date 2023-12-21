'use client'

const MunicipioDetalhe = ({ params }) => {

  console.log(params)

  const municipioId = decodeURIComponent(params.municipioId)
  
  return (
    <div className="container">
      <h1>Municipio: { municipioId }</h1>
    </div>
  )
}

export default MunicipioDetalhe
