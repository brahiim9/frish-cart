import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/cartContext';
import toast from 'react-hot-toast';
import { WishlistContext } from '../../Context/wishlistContext';

export default function Products() {

  let searchInput = document.getElementById('searchInput')

  const [Products, setProducts] = useState([])
  const [loading, setloading] = useState(false)
  const [currentId, setcurrentId] = useState(null)

  let { addProductToCart, setcartItems, cartItems } = useContext(CartContext);
  let { addProductToWishlist } = useContext(WishlistContext)

  function getProducts() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then((res) => {
        setProducts(res.data.data);
      })
      .catch((res) => { })

  }

  
  let searchProductarr = []

  function searchProduct(arr) {

   searchProductarr = arr.filter((index)=>index.title.toLowerCase().includes(searchInput.value.toLowerCase()))
   console.log(searchProductarr);
   setProducts(searchProductarr)
   

 
    // for (let i = 0; i < arr.length; i++) {
      
    //   if (arr[i].title.toLowerCase().includes(searchInput.value.toLowerCase())) {
    //     searchProductarr.push(arr[i]);
    //     setProducts(searchProductarr)
    //   }
    // }

  }

  async function addToWishlist(id) {
    let response = await addProductToWishlist(id)
    if (response.data.status == 'success') {
      toast.success(response.data.message)
      setloading(false)
    }
    else {
      toast.error(response.data.message)
      setloading(false)
    }
  }

  async function addToCart(id) {
    setcurrentId(id)
    setloading(true)

    let response = await addProductToCart(id)

    if (response.data.status == 'success') {
      setcartItems(cartItems + 1)
      toast.success(response.data.message)
      setloading(false)
    }
    else {
      toast.error(response.data.message)
      setloading(false)
    }

  }

  useEffect(() => {
    getProducts()

  }, [searchProductarr])

  return <>

    <input id='searchInput' onInput={() => searchProduct(Products)} type="text" placeholder='search.....' className='searchInput w-2/3 mt-12 mb-8 p-2 border border-slate-300 rounded-lg mx-auto block' />
    <div className="row">
      {Products.length > 0 ? Products.map((product) =>
        <div key={product.id} className='w-1/4'>
          <div className="product text-left m-3 p-2">

            <Link to={`/productdetails/${product.id}`}>
              <img src={product.imageCover} className='w-full' alt="" />
              <h4 className='text-emerald-600 font-bold'>{product?.category?.name}</h4>
              <h4 className='font-semibold mb-1'>{product?.title ?  product?.title.split(" ").slice(0, 2).join(" ") : ""}</h4>
              <div className='flex justify-between'>
                <span>{product.price} EGB</span>
                <span><i className='fas fa-star text-yellow-400'></i>{product.ratingsAverage}</span>
              </div>
            </Link>
            <span onClick={() => addToWishlist(product.id)} className='block text-right py-4 text-4xl cursor-pointer'><i class="fa-solid fa-heart"></i></span>
            <button onClick={() => addToCart(product.id)} className='btn rounded-lg my-2 bg-emerald-600 w-full px-3 py-2 text-white'>{loading && currentId == product.id ? (
              <i className='fas fa-spinner fa-spin'></i>
            ) : ("Add To Cart")
            }
            </button>
          </div>

        </div>
      ) : <span class="loader my-32 mx-auto"></span>}
    </div>
  </>
}