const getDistritos = () => {
  return fetch('https://json.geoapi.pt/distritos')
    .then((res) => res.json())
    .catch((error) => {
      throw error
    })
}

export default getDistritos
