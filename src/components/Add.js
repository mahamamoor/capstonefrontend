import { useState, useEffect } from 'react'

const Add = (props) => {
  let emptyBrand = { name: '', product: '', warehouse: '', status: '', quantity: '' }
  const [brand, setBrand] = useState(emptyBrand)

  const handleChange = (event) => {
    setBrand({...brand, [event.target.name]: event.target.value})
    console.log(brand)
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    props.handleCreate(brand)
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name: </label>
        <input type="text" name="name" value={brand.name} onChange={handleChange}/>
        <br />
        <br />
        <label htmlFor="product">Product: </label>
        <input type="text" name="product" value={brand.product} onChange={handleChange}/>
        <br />
        <br />
        <label htmlFor="warehouse">Warehouse: </label>
        <input type="text" name="warehouse" value={brand.warehouse} onChange={handleChange}/>
        <br />
        <br />
        <label htmlFor="status">Status: </label>
        <input type="text" name="status" value={brand.status} onChange={handleChange}/>
        <br />
        <br />
        <label htmlFor="quantity">Quantity: </label>
        <input type="number" name="quantity" value={brand.quantity} onChange={handleChange}/>
        <input type="submit"/>
      </form>
    </>
  )
}

export default Add
