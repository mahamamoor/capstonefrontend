import {useState} from 'react'

const Edit = (props) => {
  let emptyBrand = {name: '', product: '', warehouse: '', status: '', quantity: '' }
  const [brand, setBrand] = useState({...props.brand})

  const handleChange = (event) => {
      setBrand({...brand, [event.target.name]: event.target.value})
    }

  const handleSubmit = (event) => {
    event.preventDefault()
    props.handleUpdate(brand)
  }

  return(
    <>
      <details>
        <summary>Edit Raw Product</summary>
        <form onSubmit={handleSubmit}>
          <label>Name: </label>
          <input type="text" name="name" onChange={handleChange}/>
          <br />
          <br />
          <label>Product: </label>
          <input type="text" name="product" onChange={handleChange}/>
          <br />
          <br />
          <label>Warehouse: </label>
          <input type="text" name="warehouse" onChange={handleChange}/>
          <br />
          <br />
          <label>Status: </label>
          <input type="text" name="status" onChange={handleChange}/>
          <br />
          <br />
          <label>Quantity: </label>
          <input type="number" name="quantity" onChange={handleChange}/>
          <input type="submit"/>
        </form>
      </details>
    </>
  )
}

export default Edit
