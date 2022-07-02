import { useState, useEffect } from 'react'
import axios from 'axios'
import Add from './components/Add.js'
import Edit from './components/Edit.js'

// localhost
// http://localhost:8000/api/brands
const App = () => {
  const [brands, setBrands] = useState([])
  const [search, setSearch] = useState("")
  const [noSearch, setNoSearch] = useState("No item on this list matches the product")

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
      <div className='brands'>
      <h1 className="text-3xl font-bold underline hover:bg-black hover:text-white">Inventory App</h1>
      <h2 className="text-2xl font-bold hover:bg-black hover:text-white">Raw Materials</h2>
      <div className="searchbar">
        <p className="productSearch">Search for your product by Supplier</p>
        <input className="input-search" type="text" placeholder="Search..." onChange={event => {setSearch(event.target.value)}}/>
      </div>
      <table className="table-fixed">
        <thead>
          <tr className="odd:bg-white even:bg-slate-50">
            <th>Name</th>
            <th>Product</th>
            <th>Warehouse</th>
            <th>Status</th>
            <th>Quantity</th>
            <th>Edit Product</th>
            <th>Delete Inventory</th>
          </tr>
        </thead>
        <div className="products-list">
        {brands.filter(brand => {
          if (search == "") {
            return brand
          } else if (brand.name.toLowerCase().includes(search.toLowerCase())) {
            return brand
          }
        }).map((brand) => {
        return(
          <>
            <tbody>
              <tr className="odd:bg-white even:bg-slate-50"  key={brand.id}>
                <td>{brand.name}</td>
                <td>{brand.product}</td>
                <td>{brand.warehouse}</td>
                <td>{brand.status}</td>
                <td>{brand.quantity}</td>
                <td><Edit handleUpdate={handleUpdate} brand={brand}/></td>
                <td><button onClick={(event) => {handleDelete(event, brand)}} value={brand.id}>
                X
                </button></td>
              </tr>
            </tbody>
          </>
        )
      })}
      </div>
      </table>
      <h5 className="text-2xl font-bold">Add Product to Inventory</h5>
        <Add handleCreate={handleCreate}/>
      </div>
    </div>
  )
}

export default App
