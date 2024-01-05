const saldoJson = require('../../../data/Saldo-migratorio-INE-2022.json')

const MunicipioSaldo = ({ municipio }) => {
  let saldoTotal = {}
  let notFound = true

  let filteredByMunicipio = saldoJson.anos.filter((ano) => {
    return ano.sitio === municipio
  })

  if (filteredByMunicipio.length > 0) {
    saldoTotal = filteredByMunicipio[0]
    notFound = false
  }

  // Calcular maior variação para desenhar o gráfico de barras.
  // Ajuda do ChatGPT para descobrir a variação, seja positiva ou negativa.
  let maxDistance = Number.MIN_SAFE_INTEGER
  let maxYear
  let largestChange

  // Iterate through the keys in the object
  for (const key in saldoTotal) {
    // Check if the value is a number
    if (typeof saldoTotal[key] === 'number') {
      // Calculate the distance from zero
      const distance = Math.abs(saldoTotal[key])

      // Update maxDistance and maxYear if the current value is farther from zero
      if (distance > maxDistance) {
        maxDistance = distance
        maxYear = key
      }
    }
  }

  largestChange = saldoTotal[maxYear]

  console.log(saldoTotal)

  return (
    <div className='saldo'>
      <div className='saldograph'>
        {Object.keys(saldoTotal).map((item, i) => (
          <p className='travelcompany-input' key={i}>
            {item + saldoTotal[item]}
          </p>
        ))}
      </div>

      <p>Será que quis dizer...</p>
    </div>
  )
}

export default MunicipioSaldo
