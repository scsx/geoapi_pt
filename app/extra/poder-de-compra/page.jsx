import PoderDeCompra from './PoderDeCompra'

const page = () => {
  return (
    <div className='sitepage sitepage--poder'>
      <div className='container'>
        <h1>Poder de compra per capita</h1>
        <h5>
          Onde há, em média, por pessoa, maior e menor bem estar material?
        </h5>
        <p>Portugal = 100</p>
        <PoderDeCompra />
      </div>
    </div>
  )
}

export default page
