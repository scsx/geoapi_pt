const saldoJson = require('../../../data/Saldo-migratorio-INE-2022.json')

const MunicipioSaldo = ({ municipio, calcPercentage }) => {
  let saldoMunicipio = {}
  let saldoEstruturado = {}
  let notFound = true

  let filteredByMunicipio = saldoJson.anos.filter((ano) => {
    return ano.sitio === municipio
  })

  if (filteredByMunicipio.length > 0) {
    saldoMunicipio = filteredByMunicipio[0]
    saldoEstruturado = {
      nome: saldoMunicipio.sitio,
      nuts: saldoMunicipio.codigonuts,
      anos: {
        2011: saldoMunicipio['2011'],
        2012: saldoMunicipio['2012'],
        2013: saldoMunicipio['2013'],
        2014: saldoMunicipio['2014'],
        2015: saldoMunicipio['2015'],
        2016: saldoMunicipio['2016'],
        2017: saldoMunicipio['2017'],
        2018: saldoMunicipio['2018'],
        2019: saldoMunicipio['2019'],
        2020: saldoMunicipio['2020'],
        2021: saldoMunicipio['2021'],
        2022: saldoMunicipio['2022']
      }
    }

    notFound = false
  }

  // Calcular maior variação para desenhar o gráfico de barras.
  // Ajuda do ChatGPT para descobrir a variação, seja positiva ou negativa.
  let maxDistance = Number.MIN_SAFE_INTEGER
  let maxYear
  let largestChange

  // Iterate through the keys in the object
  if (filteredByMunicipio.length > 0) {
    for (const key in saldoEstruturado.anos) {
      // Check if the value is a number
      if (typeof saldoEstruturado.anos[key] === 'number') {
        // Calculate the distance from zero
        const distance = Math.abs(saldoEstruturado.anos[key])

        // Update maxDistance and maxYear if the current value is farther from zero
        if (distance > maxDistance) {
          maxDistance = distance
          maxYear = key
        }
      }
    }

    largestChange = Math.abs(saldoEstruturado.anos[maxYear])
  }

  return (
    <div className='saldo'>
      {saldoEstruturado.anos && (
        <div className='saldograph'>
          {Object.keys(saldoEstruturado.anos).map((ano, i) => (
            <div className='saldograph__info' key={i}>
              <div
                className={`saldograph__bar ${
                  saldoEstruturado.anos[ano] > 0 ? 'pos' : 'neg'
                }`}
                style={{
                  height: `${
                    Math.abs(saldoEstruturado.anos[ano]) === largestChange
                      ? '100'
                      : calcPercentage(
                          largestChange,
                          Math.abs(saldoMunicipio[ano])
                        )
                  }%`,
                  bottom: saldoEstruturado.anos[ano] > 0 ? '105%' : 'auto',
                  top: saldoEstruturado.anos[ano] > 0 ? 'auto' : '40%'
                }}></div>
              <b>{ano}</b>
              {saldoEstruturado.anos[ano]}
            </div>
          ))}
        </div>
      )}

      {notFound && <p>Nada. Será que quis dizer [por fazer]</p>}
    </div>
  )
}

export default MunicipioSaldo
