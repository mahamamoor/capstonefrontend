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
    <div className="">
      <div className="header">
        <h1 className="text-3xl text-center font-bold hover:bg-black hover:text-white">Inventory App</h1>
        <h2 className="text-2xl text-center font-bold hover:bg-black hover:text-white">Raw Materials</h2>
      </div>
        <div className="max-w-lg mx-auto p-8">
          <details className="open:bg-white dark:open:bg-slate-900 open:ring-1 open:ring-black/5 dark:open:ring-white/10 open:shadow-lg p-6 rounded-lg" open>
          <summary className="text-sm leading-6 text-slate-900 dark:text-white font-semibold select-none">What function does this app serve?</summary>
          <div className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
            <p>The purpose of this app is to track your inventory in all of your warehouses.</p>
          </div>
          </details>
        </div>
      <div className="text-center">
        <p className="productSearch">Search for your product by Supplier</p>
        <input className="input-search" type="text" placeholder="Search..." onChange={event => {setSearch(event.target.value)}}/>
      </div>
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50 border-b-2 border-gray-200">
            <th className="p-3 text-sm font-semibold tracking-wide text-left">Name</th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">Product</th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">Warehouse</th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">Status</th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">Quantity</th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">Edit Product</th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">Delete Inventory</th>
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
            <tbody className="">
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
  )
}

export default App
