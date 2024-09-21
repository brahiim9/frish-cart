import { useFormik } from 'formik'
import React, { useContext } from 'react'
import axios from 'axios'
import { CartContext } from '../../Context/cartContext'


export default function Checkout() {

    let { checkout, cartId } = useContext(CartContext)

    let Formik = useFormik({
        initialValues: {
            details: "",
            phone: "",
            city: "",
        },
        onSubmit: () => handelCheckout(cartId, 'http://localhost:5173/')
    })


    async function handelCheckout(cartId, url) {
        let response = await checkout(cartId, url, Formik.values)

        window.location.href = response.data.session.url

    }


    return <>
        <div className='py-8 w-1/2 mx-auto'>
            <h1 className='text-4xl font-semibold pt-5 pb-3 text-center'>checkout now</h1>
            <form onSubmit={Formik.handleSubmit} action="">
                <input
                    onBlur={Formik.handleBlur}
                    onChange={Formik.handleChange}
                    value={Formik.values.details}
                    type="text"
                    className='border-b w-full p-3 focus:outline-none mb-3'
                    placeholder='details'
                    name='details' />
                <input
                    onBlur={Formik.handleBlur}
                    onChange={Formik.handleChange}
                    value={Formik.values.phone}
                    type="tel"
                    className='border-b w-full p-3 focus:outline-none mb-3'
                    placeholder='phone'
                    name='phone' />
                <input
                    onBlur={Formik.handleBlur}
                    onChange={Formik.handleChange}
                    value={Formik.values.city}
                    type="text"
                    className='border-b w-full p-3 focus:outline-none mb-3'
                    placeholder='city'
                    name='city' />

                <div className='flex justify-between items-center'>
                    <button type='submit' className='bg-green-600 text-white py-3 text-2xl px-5 rounded-lg block mt-3'>
                        checkout
                    </button>
                </div>
            </form>
        </div >


    </>

}
