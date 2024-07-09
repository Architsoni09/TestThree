import React, {useEffect, useRef, useState} from 'react';
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addProduct, editProduct, fetchProductsError, productsReducer} from "../Redux/ProductsSlice";

function AddEditForm(props) {
    const nameRef = useRef(null);
    const categoryRef = useRef(null);
    const priceRef = useRef(null);
    const descriptionRef = useRef(null);
    const imageRef = useRef(null);
    const ratingRef = useRef(null);
    const {productId,action}=useParams();
    const {productData}=useSelector((state)=>state.products);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        const product = {
            id: productId?productId:productData.length+1,
            name: nameRef.current.value,
            category: categoryRef.current.value,
            price: priceRef.current.value,
            description: descriptionRef.current.value,
            image: imageRef.current.value,
            rating: ratingRef.current.value,
        };
            handleAddPost(product);
        navigate("/");
    };

    const handleAddPost=async(data)=>{
        try {
            const response = await fetch(`https://my-json-server.typicode.com/Architsoni09/TestThree/products${productId?`/${productId}`:``}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            dispatch(addProduct(result));
        } catch (error) {
            console.error('Error fetching data:', error);
            dispatch(fetchProductsError);
        }
        }

    useEffect(()=>{
        let index=productData.findIndex((product)=>product.id==productId);
        setProduct(productData[index]);
    },[])

    return (
        <div style={{minHeight: '92vh', minWidth: '100%'}}
             className="d-flex justify-content-center  flex-wrap  align-items-center h-75 bg-dark">

            <div className="card  w-75 mt-5 bg-success text-white">
                <div className="card-body">
                    <h2 className="card-title text-center mb-4">Add Product </h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Product Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                ref={nameRef}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="category">Category</label>
                            <input
                                type="text"
                                className="form-control"
                                id="category"
                                name="category"
                                ref={categoryRef}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="price">Price</label>
                            <input
                                type="number"
                                className="form-control"
                                id="price"
                                name="price"
                                ref={priceRef}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea
                                className="form-control"
                                id="description"
                                name="description"
                                ref={descriptionRef}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="image">Image URL</label>
                            <input
                                type="url"
                                className="form-control"
                                id="image"
                                name="image"
                                ref={imageRef}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="image">Ratings</label>
                            <input
                                type="number"
                                className="form-control"
                                id="image"
                                name="image"
                                ref={ratingRef}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary mt-3">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddEditForm;
