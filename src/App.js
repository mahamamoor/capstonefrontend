import { useState, useEffect } from 'react'
import axios from 'axios'
import Add from './components/Add.js'
import Edit from './components/Edit.js'

// localhost
// http://localhost:8000/api/brands
const App = () => {
  const [brands, setBrands] = useState([])

  const getBrands = () => {
    axios.get('https://capstone-warehouse-inventory.herokuapp.com/api/brands')
    .then(response => setBrands(response.data),
    (err)=> console.log(err)
  )
    .catch((error) => console.error(error))
  }
  const handleCreate = (addBrand) => {
    axios.post('https://capstone-warehouse-inventory.herokuapp.com/api/brands', addBrand)
    .then((response) => {
      setBrands([...brands, addBrand])
    })
  }
  const handleUpdate = (editBrand) => {
    console.log(editBrand)
    axios.put('https://capstone-warehouse-inventory.herokuapp.com/api/brands/' + editBrand.id, editBrand)
    .then((response) => {
      setBrands(brands.map((brand) => {
        return brand.id !== response.data.id ? brand :
        response.data
      }))
    })
  }
  const handleDelete = (event, deletedBrand) => {
    axios.delete('https://capstone-warehouse-inventory.herokuapp.com/api/brands/' + event.target.value)
    .then((response) => {
      setBrands(brands.filter(brand => brand.id !== deletedBrand.id))
    })
}
  useEffect(() => {
    getBrands()
  }, [])

  return (
    <div className="bg-sky-700">
      <Add handleCreate={handleCreate}/>
      <div className='brands'>
      <h1 className="text-3xl font-bold underline hover:bg-black hover:text-white">Inventory App</h1>
      {brands.map((brand) => {
        return(
          <div className="md:flex text-center sm:text-left hover:bg-sky-600" key={brand.id}>
          <ul role="list" class="p-6 divide-y divide-slate-200">
            <h5>Name: {brand.name}</h5>
            <h5>Product: {brand.product}</h5>
            <h5>Warehouse: {brand.warehouse}</h5>
            <h5>Status: {brand.status}</h5>
            <h5>Quantity: {brand.quantity}</h5>
            <Edit handleUpdate={handleUpdate} brand={brand}/>
            <button onClick={(event) => {handleDelete(event, brand)}} value={brand.id}>
            X
            </button>
          </ul>
          </div>
        )
      })}
      </div>
    </div>
  )
}

export default App
