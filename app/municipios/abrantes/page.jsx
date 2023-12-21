'use client'


const Abrantes = () => {

  /* 
  useEffect(() => {
    const fetchMunicipio = async () => {
      const res = await fetch(`https://json.geoapi.pt/municipio/${municipioId}`)

      if (!res.ok) {
        throw new Error('Failed to fetch data')
      }

      return res.json()

      const response = await fetch(`/api/users/${session?.user.id}/posts`)
      const data = await response.json()

      setMyPosts(data)
    }

    if (session?.user.id) fetchMunicipio()
  }, [session?.user.id]) */

  //const municipioData = await getData()

  return (
    <div>
      <h1>Abrantes</h1>
      {/* {JSON.stringify(municipioData)} */}
    </div>
  )
}

export default Abrantes
