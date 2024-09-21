import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { userContext } from '../../Context/userContext'

export default function Login() {
    let { userLogin, setuserLogin } = useContext(userContext)
    const navigate = useNavigate();
    const [ApiError, setApiError] = useState('');
    const [isLoding, setisLoding] = useState(false);

    function handelLogin(value) {
        setisLoding(true)

        axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', value)
            .then((res) => {
                setisLoding(false)
                if (res.data.message == 'success') {
                    localStorage.setItem("userToken", res.data.token);
                    setuserLogin(res.data.token)
                    navigate('/')
                }
            })

            .catch((res) => {
                setisLoding(false)
                setApiError(res.response.data.message)
            })

    }

    let validationSchema = Yup.object().shape({

        email: Yup.string()
            .email('email is invalid')
            .required('email is required'),
        password: Yup.string()
            .matches(/^[A-Za-z0-9]{6,10}$/, 'password should be between 6 to 10 char')
            .required('password is required')
    })

    let Formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema,
        onSubmit: handelLogin,
    })

    return <>

        {ApiError ? (<div className=' mx-auto w-1/2 bg-red-500 p-5 rounded-lg text-center text-white'>
            {ApiError}
        </div>) : null}
        <div className='py-8 w-full'>
            <h1 className='text-4xl font-semibold pt-5 pb-3 text-left'>login now</h1>
            <form onSubmit={Formik.handleSubmit} action="">
                <input
                    onBlur={Formik.handleBlur}
                    onChange={Formik.handleChange}
                    value={Formik.values.email}
                    type="email"
                    className='border-b w-full p-3 focus:outline-none mb-3'
                    placeholder='Email'
                    name='email' />
                {Formik.errors.email && Formik.touched.email ? (< div className='text-red-700 bg-red-300 py-3 my-3 w-full rounded-lg'>{Formik.errors.email}</div>) : null}
                <input
                    onBlur={Formik.handleBlur}
                    onChange={Formik.handleChange}
                    value={Formik.values.password}
                    type="text"
                    className='border-b w-full p-3 focus:outline-none mb-3'
                    placeholder='Password'
                    name='password' />
                {Formik.errors.password && Formik.touched.password ? (< div className='text-red-700 bg-red-300 w-full py-3 my-3 rounded-lg'>{Formik.errors.password}</div>) : null}

                <div className='flex justify-between items-center'>
                    <Link to="/forgotpass"><span className='text-xl hover:text-green-500'>forget your password ?</span></Link>
                    <button type='submit' className='bg-green-600 text-white py-3 text-2xl px-5 rounded-lg block mt-3'>
                        {isLoding ? <i className='fas fa-spinner fa-spin'></i> : 'Login now'}
                    </button>
                </div>
            </form>
        </div >


    </>

}

