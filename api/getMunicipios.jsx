const getMunicipios = () => {
  // Exemplos para:
  // Lajes Das Flores
  // https://json.geoapi.pt/municipio/Lajes%20Das%20Flores
  // Lagoa (açores)
  // https://json.geoapi.pt/municipio/Lagoa%20(açores)

  return fetch('https://json.geoapi.pt/municipios')
    .then((res) => res.json())
    .catch((error) => {
      throw error
    })
}

export default getMunicipios
