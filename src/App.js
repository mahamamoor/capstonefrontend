import { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from './components/Navbar.js'
import Add from './components/Add.js'
import Edit from './components/Edit.js'
import Order from './components/Orders.js'
import Home from './components/Home.js'
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
    <div className="">
      <Navbar/>
      <Routes>
      <Route exact path="/Orders" element={<Order/>}></Route>
      <Route exact path="/" element={<Home search={search} setSearch={setSearch} brands={brands} setNoSearch={setNoSearch} handleUpdate={handleUpdate} handleDelete={handleDelete} handleCreate={handleCreate}/>}></Route>
      </Routes>
    </div>
</>
)}
export default App
