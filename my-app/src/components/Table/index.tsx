import axios from "axios"
import {useEffect} from 'react'
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
function Table() {
const [customer,setCustomers]=useState([]);
const [companyName,setCompanyName]=useState('')
const [contactTitle,setTitle]=useState('')
const [city,setCity]=useState('')
const [country,setCountry]=useState('')

const BASE_URL="https://northwind.vercel.app/api/customers"

useEffect(()=>{
axios.get(`${BASE_URL}`)
.then(response=>{
    setCustomers(response.data)
    
})
.catch(error=>{
    console.log(error);
    
})
})


const handleSubmit =(event:any)=>{
    event.preventDefault();

axios.post(`${BASE_URL}`,{companyName,contactTitle,city,country})
.then(response=>{
console.log(response);
location.reload()
})
.catch(error=>{
    console.log(error);
    
})
}

const handleDelete=(id:number)=>{
    if (window.confirm("Are you sure you want to delete it?")) {
        axios.delete(`${BASE_URL}/${id}`)
.then(response=>{
console.log(response);

})
.catch(error=>{
    console.log(error);
    
})
    }
}

  return (
      <div>
<form className='customers' onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Company Name:</label>
        <input type="text" id="name" value={companyName} onChange={e => setCompanyName(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="title">Contact Title:</label>
        <input type="text" id="title" value={contactTitle} onChange={e => setTitle(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="city">City:</label>
        <input type="text" id="city" value={city} onChange={e => setCity(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="country">Country:</label>
        <input type="text" id="country" value={country} onChange={e => setCountry(e.target.value)} required />
      </div>
      <button>Submit</button>
    </form>
        <br />
        <br />
  <h1>Customers  Table</h1>
    <table className="table table-striped table-bordered">
        <thead>
            <tr>
            <th>ID</th>
            <th>Company Name</th>
            <th>Contact Title</th>
            <th>City</th>
            <th>Country</th>
            <th></th>
            </tr>
        </thead>
        <tbody>
            {
                customer.map((i:any)=>{
return <tr key={i.id}>
<td>{i.id}</td>
<td>{i.companyName}</td>
<td>{i.contactTitle}</td>
<td>[i.address.city]</td>
<td>[i.address.country]</td>
<td>
    <button onClick={()=>handleDelete(i.id)}>Delete</button>
</td>
       </tr>
                })
            }
       
        </tbody>
    </table>
  </div>
  )
}

export default Table
