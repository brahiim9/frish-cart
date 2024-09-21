import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function Categories() {

  const [categories, setcategories] = useState([])

  function getAllCategories() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then((res) => {
        setcategories(res.data.data);
      })
      .catch((res) => {
        console.log(res);
      })

  }

  useEffect(() => {
    getAllCategories()
  }, [])
  return <>
    <div className="row items-center align-middle">
      {categories.length > 0 ? categories.map((category) => (
        <div key={category.id} className='parent w-1/3 p-3'>
            <div className="category rounded-md shadow-lg h-[400px]">
              <img src={category.image} className='w-full h-[300px] object-cover rounded-t-md' alt="" />
              <h1 className='text-3xl font-semibold text-emerald-600 p-5'>{category.name}</h1>
            </div>
        </div>
      )) : <span class="loader my-32 mx-auto"></span>}
    </div>

  </>
}
