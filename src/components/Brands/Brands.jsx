import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function Brands() {
  const [brands, setbrands] = useState([])


  function getAllBrands() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
      .then((res) => {
        setbrands(res.data.data);
      })
      .catch((res) => {
        console.log(res);
      })

  }

  useEffect(() => {
    getAllBrands()
  }, [])

  return <>
    <h1 className='text-5xl text-center py-5 font-semibold text-emerald-500'>All Brands</h1>
    <div className="row items-center justify-center align-middle">
      {brands.length > 0 ? brands.map((brand) => (
        <div key={brand.id} className='parent w-1/4 p-3'>
          <div className="brand rounded-md shadow-lg">
            <img src={brand.image} className='w-full rounded-t-md' alt="" />
            <h1 className='p-5'>{brand.name}</h1>
          </div>
        </div>
      )) : <span class="loader my-32"></span>}
    </div>

  </>
}

