import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../Context/cartContext'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

export default function Cart() {
  const [cartDetailes, setcartDetailes] = useState(null)

  let { getAllProductCart, updateProductCount, removeProduct, setcartItems, cartItems} = useContext(CartContext)

  async function getCartItems() {

    let response = await getAllProductCart();

    if (response.data.status == 'success') {
    }
    setcartDetailes(response.data);
  }

  async function updateCount(id, count) {

    let response = await updateProductCount(id, count);
    console.log(response);
    if (response.data.status == 'success') {
      setcartDetailes(response.data);
      toast.success('product update successfully')
    }
    else {

    }
  }

  async function deleteProduct(id) {

    let response = await removeProduct(id);
    console.log(response);
    if (response.data.status == 'success') {
      setcartItems(cartItems - 1)
      setcartDetailes(response.data);
      toast.success('product removed successfully')
    }
    else {

    }
  }

  useEffect(() => {
    getCartItems()
  }, [])
  return <>

    <div className="flex justify-between items-center px-12 py-10">
      <h1 className='text-4xl font-medium'>Cart Shop</h1>
      <Link to={'/checkout'}>
      <button className='text-white bg-blue-500 text-xl px-4 py-3 rounded-xl hover:bg-blue-700'>Check Out</button>
      </Link>
    </div>

    <div className="flex justify-between items-center px-12 py-10">
      <h1 className='text-xl font-medium'>total price: <span className='text-green-400 text-xl font-semibold'>{cartDetailes?.data?.totalCartPrice}</span></h1>
      <h1 className='text-xl font-medium'>total number of items:  <span className='text-green-400 text-xl font-bold'>{cartDetailes?.numOfCartItems}</span></h1>
    </div>

    {cartDetailes?.data?.products?.map((product) =>
      <div key={product?.product?.id} className="row border-b-2 items-center mx-10">
        <div className='w-1/4'>
          <img src={product?.product?.imageCover} className='w-10/12' alt="" />
        </div>
        <div className='w-3/4 flex items-center justify-between'>
          <div>
            <h4 className='font-semibold text-2xl'>{product?.product?.title}</h4>
            <h5 className='font-semibold text-lg my-3'>{product?.price} EGP</h5>
            <span onClick={() => deleteProduct(product?.product?.id)} className='text-red-600 cursor-pointer'><i class="fa-solid fa-trash"></i> Remove</span>
          </div>
          <div>
            <span onClick={() => updateCount(product?.product?.id, product?.count + 1)} className='border border-emerald-500 px-4 py-2 rounded-lg text-lg cursor-pointer'>+</span>
            <span className='mx-4'>{product?.count}</span>
            <span onClick={() => updateCount(product?.product?.id, product?.count - 1)} className='border border-emerald-500 px-4 py-2 rounded-lg text-lg cursor-pointer'>-</span>
          </div>
        </div>
      </div>
    )}
    <button className='mx-auto block my-10 border border-green-400 py-2 px-3 text-2xl rounded-xl'>Clear Your Cart</button>
  </>
}
