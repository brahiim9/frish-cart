import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { userContext } from '../../Context/userContext'

export default function Forgotpass() {
    let { userLogin, setuserLogin } = useContext(userContext)
    const navigate = useNavigate();
    const [ApiError, setApiError] = useState('');
    const [isLoding, setisLoding] = useState(false);
    const [coedMsg, setcodeMsg] = useState('')

    function handelPassword(value) {
        setisLoding(true)

        axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', value)
            .then((res) => {
                console.log(res);
                setisLoding(false)
                if (res.data.statusMsg == 'success') {
                    setcodeMsg(res.data.message);
                    localStorage.setItem("userToken", res.data.token);
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
            .required('email is required')
    })

    let Formik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema,
        onSubmit: handelPassword,
    })

    return <>

        {ApiError ? (<div className=' mx-auto w-1/2 bg-red-500 p-5 rounded-lg text-center text-white'>
            {ApiError}
        </div>) : null}


        {coedMsg ? <div>
            <div className=' mx-auto w-1/2 bg-green-500 p-5 rounded-lg text-center text-white'>
                {coedMsg}
            </div>
            <div className='py-8 w-full'>
                <h1 className='text-4xl font-semibold pt-5 pb-3 text-left'>{coedMsg}
                </h1>
                <form onSubmit={Formik.handleSubmit} action="">
                    <input
                        onBlur={Formik.handleBlur}
                        onChange={Formik.handleChange}
                        value={Formik.values.email}
                        type="text"
                        className='border-b w-full p-3 focus:outline-none mb-3'
                        placeholder='code'
                        name='code' />
                    {Formik.errors.email && Formik.touched.email ? (< div className='text-red-700 bg-red-300 py-3 my-3 w-full rounded-lg'>{Formik.errors.email}</div>) : null}
                    <button type='submit' className='bg-green-600 text-white py-3 text-2xl px-5 rounded-lg block mt-3'>
                        {isLoding ? <i className='fas fa-spinner fa-spin'></i> : 'Verify'}
                    </button>
                </form>
            </div >
        </div> : <div className='py-8 w-full'>
            <h1 className='text-4xl font-semibold pt-5 pb-3 text-left'>please enter your verification code
            </h1>
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
                <button type='submit' className='bg-green-600 text-white py-3 text-2xl px-5 rounded-lg block mt-3'>
                    {isLoding ? <i className='fas fa-spinner fa-spin'></i> : 'Verify'}
                </button>
            </form>
        </div >}



    </>

}