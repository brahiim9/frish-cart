import axios from 'axios'
import React from 'react'
import Products from '../Products/Products'
import Mainslider from '../Mainslider/Mainslider'
import Categoryslider from '../Categoryslider/Categoryslider'

export default function Home() {

  return <>
    <Mainslider />
    <Categoryslider/>
    <Products />

  </>
}
