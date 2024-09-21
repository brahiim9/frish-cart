import React from 'react'
import Slider from "react-slick"
import image1 from "../../assets/img1.jpg"
import image2 from "../../assets/img2.jpg"
import image3 from "../../assets/img3.jpg"
import image4 from "../../assets/img4.jpg"
import image5 from "../../assets/img5.jpg"

export default function Mainslider() {


  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  return <>
    <div className='w-2/3 mx-auto pt-12'>
      <div className="row">
        <div className='w-2/3'>
        <Slider {...settings}>
          <img src={image1} className='w-full h-[445px]' alt="" />
          <img src={image2} className='w-full h-[445px]' alt="" />
          <img src={image3} className='w-full h-[445px]' alt="" />
        </Slider>  
        </div>
        <div className='w-1/3'>
          <img src={image4} className='w-full' alt="" />
          <img src={image5} className='w-full' alt="" />
        </div>
      </div>
    </div>


  </>
}
