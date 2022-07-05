import { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from './components/Navbar.js'
import Add from './components/Add.js'
import Edit from './components/Edit.js'
import Order from './components/Orders.js'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from 'react-router-dom';
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
    <>
    <Routes>
    <Route exact path="/Orders" element={<Order/>}></Route>
    </Routes>
    <div className="">
      <Navbar/>
      <div className="max-w-lg mx-auto p-8">
        <h1 className="text-3xl text-center font-bold hover:bg-green-900 hover:bg-opacity-75 hover:text-white pt-4">Inventory Management System</h1>
        <h2 className="text-2xl text-center font-bold hover:bg-green-900 opacity-50 hover:text-white"></h2>
      </div>
        <div className="max-w-lg mx-auto p-8">
          <details className="open:bg-white dark:open:bg-slate-900 open:ring-1 open:ring-black/5 dark:open:ring-white/10 open:shadow-lg p-6 rounded-lg" open>
          <summary className="text-sm text-center leading-6 text-slate-900 dark:text-white font-semibold select-none">About this App</summary>
          <div className="mt-3 text-sm text-center leading-6 text-slate-600 dark:text-slate-400">
            <p>The purpose of this app is to track your inventory in your warehouses.</p>
          </div>
          </details>
        </div>
      <div className="text-center pb-16">
        <p className="productSearch pb-2">Search for your product by Supplier</p>
        <input className="" type="text" placeholder="Search" onChange={event => {setSearch(event.target.value)}}/>
      </div>
      <div className="p-8">
      <table className="w-full hidden md:block">
        <thead>
          <tr className="bg-gray-50 border-b-2 border-gray-200">
            <th className="p-3 text-sm font-semibold tracking-wide text-left">Supplier</th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">Product</th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">Warehouse</th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">Status</th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">Quantity</th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">Edit Product</th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">Delete Inventory</th>
          </tr>
        </thead>
        {brands.filter(brand => {
          if (search == "") {
            return brand
          } else if (brand.name.toLowerCase().includes(search.toLowerCase())) {
            return brand
          } else if (search == null) {
            return setNoSearch;
          }
        }).map((brand) => {
        return(
          <>
            <tbody className="odd:bg-white even:bg-slate-100">
              <tr className="" key={brand.id}>
                <td className="odd">{brand.name}</td>
                <td>{brand.product}</td>
                <td>{brand.warehouse}</td>
                <td className={(brand.status === 'available') ? 'bg-green-500 opacity-75 overflow-auto rounded-lg shadow' : 'bg-red-600 opacity-75 overflow-auto rounded-lg shadow'}>{brand.status}</td>
                <td className="lining-nums">{brand.quantity}</td>
                <td><Edit handleUpdate={handleUpdate} brand={brand}/></td>
                <td><button onClick={(event) => {handleDelete(event, brand)}} value={brand.id}>
                X
                </button></td>
              </tr>
            </tbody>
          </> )})}
      </table>
      </div>
      <thead>
        <tr className="bg-gray-50 border-b-2 border-gray-200 md:hidden">
          <th className="p-3 text-sm font-semibold tracking-wide text-left">Supplier</th>
          <th className="p-3 text-sm font-semibold tracking-wide text-left">Product</th>
          <th className="p-3 text-sm font-semibold tracking-wide text-left">Warehouse</th>
          <th className="p-3 text-sm font-semibold tracking-wide text-left">Status</th>
          <th className="p-3 text-sm font-semibold tracking-wide text-left">Quantity</th>
        </tr>
      </thead>
        {brands.map((brand) => {
          return(
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
              <div className="bg-white space-y-3 p-4 rounded-lg shadow">
                <div className="flex items-center space-x-2 text-sm">
                  <div>{brand.name}</div>
                  <div>{brand.product}</div>
                  <div>{brand.warehouse}</div>
                  <div className={(brand.status === 'available') ? 'bg-green-500 opacity-75 overflow-auto rounded-lg shadow' : 'bg-red-600 opacity-75 overflow-auto rounded-lg shadow'}>{brand.status}</div>
                  <div className="text-sm font-medium text-black">{brand.quantity}</div>
                </div>
              </div>
            </div>
          )
        })}
    <div className="content-center w-96 p-8 border-solid border-2 border-black text-sm">
        <h5 className="pb-8 font-semibold">Add Product:</h5>
        <Add handleCreate={handleCreate}/>
    </div>
    </div>
</>
)}
export default App
