const getFreguesia = (freguesia) => {
  return fetch(`https://json.geoapi.pt/freguesia/${freguesia}`)
    .then((res) => res.json())
    .catch((error) => {
      throw error
    })
}

export default getFreguesia