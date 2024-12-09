import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

function Form() {
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/getAll") // Reduced limit for testing
      .then(res => {
        console.log("Getting from..", res.data);
        setData(res.data);}).catch(err => console.log(err))
  }, [])

  const arr = data.map((data, index) => {
    return(
    <div>
      <tr>
    <td>{data.firstName}</td>
    <td>{data.lastName}</td>
  </tr>
  </div>)
  })

  const postData = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3000/addemp", {
      firstName,
      lastName
    }).then(res => console.log('posting data', res)).catch(err => console.log(err));
  }
  return (
    <div >
      
{arr}
      <label>First Name</label>
      <input type="text" value={firstName} onChange={(e) => setfirstName(e.target.value)} />
      <label>Last Name</label>
      <input type="text" value={lastName} onChange={(e) => setlastName(e.target.value)} />
      <button onClick={postData}>Post</button>
    </div>
  )

}

export default Form;
