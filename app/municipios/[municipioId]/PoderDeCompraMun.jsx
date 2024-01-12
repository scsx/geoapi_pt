import pcJson from '../../../data/Municipio-poder-compra.json'

const PoderDeCompraMun = ({ municipio }) => {
  const filteredByMunicipio = pcJson.data.filter((ano) => {
    return ano.sitio === municipio
  })

  // Só 1993 pode não ter dados (ex: Vizela).
  const finalObj = {
    ano2021: +filteredByMunicipio[0].valor2021.replace(/,/g, '.'),
    ano2011: +filteredByMunicipio[0].valor2011.replace(/,/g, '.'),
    ano1993: isNaN(filteredByMunicipio[0].valor1993.replace(/,/g, '.'))
      ? 'nodata'
      : +filteredByMunicipio[0].valor1993.replace(/,/g, '.')
  }

  return (
    <div className='compra'>
      {filteredByMunicipio.length == 1 && (
        <div className='compra__barras'>
          <div className='compra__ano'>
            2021
            <div
              className={`compra__bar ${
                finalObj.ano2021 > 100 ? 'pos' : 'neg'
              }`}
              style={{
                width: `${finalObj.ano2021}px`
              }}>
              {finalObj.ano2021}
            </div>
          </div>
          <div className='compra__ano'>
            2011
            <div
              className={`compra__bar ${
                finalObj.ano2011 > 100 ? 'pos' : 'neg'
              }`}
              style={{
                width: `${finalObj.ano2011}px`
              }}>
              {finalObj.ano2011}
            </div>
          </div>
          <div className='compra__ano'>
            1993
            <div
              className={`compra__bar ${
                finalObj.ano1993 > 100 ? 'pos' : 'neg'
              }`}
              style={{
                width: finalObj.ano1993 === 'nodata' ? '260px' : `${finalObj.ano1993}px`
              }}>
              {finalObj.ano1993 === 'nodata' ? 'Sem dados' : finalObj.ano1993}
            </div>
          </div>

          <div className='compra__linha'></div>
        </div>
      )}
      <div className='compra__media'>Média portugal = 100</div>
    </div>
  )
}

export default PoderDeCompraMun
