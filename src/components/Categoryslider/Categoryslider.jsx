import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Slider from "react-slick";

export default function Categoryslider() {

    const [Categories, setCategories] = useState([])

    function getCategories() {
        axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
            .then((res) => {
                setCategories(res.data.data);
                console.log(res.data.data);

            })
            .catch((res) => {
                console.log(res);

            })
    }

    useEffect(() => {
        getCategories()
    }, [])

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 2,
        autoplay: false,
    };
    return <>

        <div className="py-6">
            <Slider {...settings}>
                {Categories.map((category) =>
                    <div>
                        <img src={category.image} className='w-full h-[200px] object-cover' alt="" />
                        <h4>{category.name}</h4>
                    </div>)}
            </Slider>
        </div>

    </>
}