import React, { useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { userContext } from '../../Context/userContext';
import { CartContext } from '../../Context/cartContext';

export default function Navbar() {

  const navigate = useNavigate()

  let { userLogin, setuserLogin } = useContext(userContext)
  let { cartItems, setcartItems } = useContext(CartContext)

  function logOut() {

    localStorage.removeItem("userToken");
    setuserLogin(null);
    navigate('/login');
  }
  return <>

    <div className='navbar bg-white flex justify-between items-center z-20 fixed top-0 left-0 right-0 py-5 px-10'>
      <div className='leftNav'>
        <span className='text-4xl font-medium cursor-pointer'><i class="fa-solid fa-cart-shopping text-green-600"></i>fresh cart</span>
      </div>
      {userLogin != null ? <div className='links'>
        <ul className='flex gap-4'>
          <li><NavLink to="">Home</NavLink></li>
          <li>  <NavLink to="cart">cart</NavLink></li>
          <li><NavLink to="wish list">wish list</NavLink></li>
          <li> <NavLink to="products">Products</NavLink></li>
          <li>  <NavLink to="categories">categories</NavLink></li>
          <li><NavLink to="brands">brands</NavLink></li>
        </ul>
      </div> : null}
      <div className='rightNav'>
        <div className='flex items-center'>
          <div className='flex gap-3'>
            {userLogin != null ? <>
              <div className='relative'>
                <span className=' count bg-green-500 px-2 text-white font-semibold absolute rounded-lg'>{cartItems}</span>
                <Link to="cart"><i class="fa-solid fa-cart-shopping fa-2xl text-gray-500 hover:text-black"></i></Link>
              </div>
              <span onClick={logOut} className='cursor-pointer'>Log Out</span>
            </>
              : <>
                <Link to="login">Log In</Link>
                <Link to="register">Register</Link>
              </>}



          </div>
        </div>
      </div>
    </div>

  </>
}

