import React from 'react';
import {useSelector} from "react-redux";

function Cart(props) {
    const { cartItems } = useSelector((state)=>state.cart);

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 0; i < parseInt(rating); i++) {
            stars.push(<i key={i} className="bi bi-star-fill text-warning"></i>);
        }
        if (stars.length > 5) stars.length = 5;
        return stars;
    };

    return (
        <>
            <div style={{minHeight: '92vh', minWidth: '100%'}}
                 className="d-flex justify-content-center  flex-wrap  align-items-center h-75 bg-dark">
        {cartItems.length>0&& cartItems.map((productDetail,index)=>
        <div key={index} className="card w-75 mt-5 bg-primary text-white d-flex flex-column">
            <div className="card-body d-flex flex-wrap justify-content-between">
                <div className="image-container d-flex justify-content-center align-items-center"
                     style={{ flex: 1, minWidth: '30%' }}>
                    <img alt="Product" className="img-fluid"
                         src={productDetail.product.image} style={{ maxHeight: '200px', objectFit: 'cover' }} />
                </div>
                <div className="d-flex flex-column justify-content-center align-items-center"
                     style={{ flex: 1, minWidth: '30%' }}>
                    <h2 className="card-title">Category: {productDetail.product.category}</h2>
                    <h3 className="card-subtitle mb-2">Type: {productDetail.product.name}</h3>
                    <h4 className="card-text">Price: ${productDetail.product.price}</h4>
                    <div className="d-flex">
                        {renderStars(productDetail.product.rating)}
                    </div>
                </div>
                <div className="d-flex flex-column justify-content-center align-items-center"
                     style={{ flex: 1, minWidth: '30%' }}>
                    <h3 className="card-text ">Description:- {productDetail.product.description}</h3>
                    <h4 className="text-warning mt-2">Quantity: {productDetail.qty}</h4>
                </div>
            </div>
        </div>)}
            </div>
        </>
    );
}

export default Cart;
