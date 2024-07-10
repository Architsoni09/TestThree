import React, { useEffect, useState } from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addToCart} from "../Redux/CartSlice";

function ProductDetail(props) {
    const { productId } = useParams();
    const { productData } = useSelector(state => state.products);
    const [product, setProduct] = useState({});
    const navigate=useNavigate();
    const dispatch=useDispatch();
    useEffect(() => {
        const index = productData.findIndex(item => item.id.toString() === productId);
        if (index !== -1) {
            setProduct(productData[index]);
        } else {
            setProduct({});
        }
    }, [productId, productData]);

    return (
        <div>
            {/* Display product details here */}
            {product && (
                <div style={{minHeight: '92vh', minWidth: '100%'}}
                     className="d-flex justify-content-center flex-column text-primary  flex-wrap  align-items-center h-75 bg-dark">
                    <img alt="Product" className="img-fluid mb-5"
                         src={product.image} style={{height: '400px', objectFit: 'cover'}}/>

                    <h2>Product:- {product.name}</h2>
                    <p>Description:- {product.description}</p>
                    <p>Price: ${product.price}</p>
                    <button type="button" onClick={()=>{
                        dispatch(addToCart(product));
                        navigate("/");
                    }
                    } className="btn btn-primary">Add To Cart</button>

                    {/* Add more fields as necessary */}
                </div>
            )}
        </div>
    );
}

export default ProductDetail;
