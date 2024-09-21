import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { WishlistContext } from '../../Context/wishlistContext';
import { CartContext } from '../../Context/cartContext';


export default function Wishlist() {

  const [wishlistDetailes, setwishlistDetailes] = useState(null)

  let { getAllProductWishlist, removeProductWishlist } = useContext(WishlistContext)
  let { addProductToCart, cartItems, setcartItems } = useContext(CartContext)

  async function getWishlistItems() {

    let response = await getAllProductWishlist();

    if (response.data.status == 'success') {
      setwishlistDetailes(response.data.data);
    }
  }

  async function deleteItem(id) {

    let response = await removeProductWishlist(id);

    console.log(response);
    if (response.data.status == 'success') {
      toast.success(response.data.message)
    }
  }

  async function addToCart(id) {
    let response = await addProductToCart(id)

    if (response.data.status == 'success') {
      setcartItems(cartItems + 1)
      toast.success(response.data.message)

    }
    else {
      toast.error(response.data.message)

    }

  }

  useEffect(() => {
    getWishlistItems()
  }, [wishlistDetailes])

  return <>

    <h1 className='text-4xl font-medium py-32 mx-14 text-slate-800'>My wish List</h1>

    {wishlistDetailes?.map((product) =>
      <div key={product?.id} className="row border-b-2 items-center mx-10">
        <div className='w-1/4'>
          <img src={product?.imageCover} className='w-10/12' alt="" />
        </div>
        <div className='w-3/4 flex items-center justify-between'>
          <div>
            <h4 className='font-semibold text-xl'>{product?.title}</h4>
            <h5 className='font-semibold text-green-500 text-lg my-3'>{product?.price} EGP</h5>
            <span onClick={() => deleteItem(product?._id)} className='text-red-600 cursor-pointer'><i class="fa-solid fa-trash"></i> Remove</span>
          </div>
          <div>
            <button onClick={() => (addToCart(product?._id))} className='mx-auto block my-10 border border-green-400 py-2 px-3 text-2xl rounded-xl'>Add To Cart</button>
          </div>
        </div>
      </div>
    )}
  </>
}
