import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CartContext = createContext()

export default function CartContextProvider(props) {

    const [cartItems, setcartItems] = useState(0)
    const [cartId, setcartId] = useState(0)

    let headers = {
        token: localStorage.getItem('userToken')
    }

    function addProductToCart(productId) {
        return axios
            .post('https://ecommerce.routemisr.com/api/v1/cart',
                {
                    productId: productId,
                },
                {
                    headers,
                }
            )
            .then((res) => res)
            .catch((err) => err)

    }

    function getAllProductCart() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/cart', { headers })
            .then((res) => {
                setcartItems(res.data.numOfCartItems)
                setcartId(res.data.data._id)
                return res
            })
            .catch((err) => err)
    }
    function updateProductCount(productId, newCount) {
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
            {
                count: newCount
            },
            {
                headers
            }
        )
            .then((res) => res)
            .catch((err) => err)
    }
    function removeProduct(productId) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
            {
                headers
            }
        )
        .then((res) => res)
        .catch((err) => err)
    }
    
    function checkout(cartId, url, formData) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?${url}`,
            {
                shippingAddress: formData
            },
            {
                headers
            }
        )
            .then((res) => res)
            .catch((err) =>{
                console.log(err);
                
                err
            } )
    }
    useEffect(() => {
        getAllProductCart()
    }, [])

    return <>
        <CartContext.Provider value={{
            addProductToCart,
            getAllProductCart,
            updateProductCount,
            removeProduct,
            cartItems,
            setcartItems,
            checkout,
            cartId,
        }}>
            {props.children}
        </CartContext.Provider>
    </>
}