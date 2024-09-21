import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Slider from "react-slick"
import { CartContext } from '../../Context/cartContext'
import toast from 'react-hot-toast';

export default function ProductDetails() {
    const [loading, setloading] = useState(false)
    const [currentId, setcurrentId] = useState(null)
    const [Details, setDetails] = useState(null)

    let { id } = useParams()

    let { addProductToCart, setcartItems, cartItems  } = useContext(CartContext);

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
    };

    function productDetails(id) {
        axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
            .then((res) => {
                setDetails(res.data.data);
            })
            .catch((res) => {
            })
    }

    async function addToCart(id) {
        setcurrentId(id)
        setloading(true)

        let response = await addProductToCart(id)

        if (response.data.status == 'success') {
            toast.success(response.data.message)
            setcartItems(cartItems + 1)
            setloading(false)
        }
        else {
            toast.error(response.data.message)
            setloading(false)
        }

    }
    useEffect(() => {
        productDetails(id)
    }, [id])

    return <>

        <div className="row items-center">
            <div className="w-1/4">
                <Slider {...settings}>
                    {Details?.images.map((src) => <img src={src} className="w-full" />)}
                </Slider>
            </div>
            <div className="w-3/4 p-4 text-left">
                <h3 className='font-semibold capitalize text-4xl'>{Details?.title}</h3>
                <h3 className='text-gray-700 my-3 text-lg'>{Details?.description}</h3>
                <div className='flex justify-between py-4'>
                    <span>{Details?.price} EGB</span>
                    <span><i className='fas fa-star text-yellow-400'></i>{Details?.ratingsAverage}</span>
                </div>
                <span className='block text-right py-4 text-4xl'><i class="fa-solid fa-heart"></i></span>
                <button onClick={() => addToCart(Details.id)} className='btn rounded-lg my-2 bg-green-400 w-full px-3 py-2 text-white'>{loading && currentId == Details.id ? (
                    <i className='fas fa-spinner fa-spin'></i>
                ) : ("Add To Cart")
                }</button>
            </div>
        </div>
    </>
}
