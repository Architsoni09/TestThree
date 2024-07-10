import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addProduct, deleteProduct, editProduct, fetchProductsError } from "../Redux/ProductsSlice";
import 'bootstrap-icons/font/bootstrap-icons.css';
import {Bounce, toast} from "react-toastify";

function ProductCard({ productDetail }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);

    const categoryRef = useRef(null);
    const nameRef = useRef(null);
    const priceRef = useRef(null);
    const descriptionRef = useRef(null);
    const ratingRef = useRef(null);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`https://my-json-server.typicode.com/Architsoni09/TestThree/products/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                dispatch(deleteProduct(id));
                toast.success('Product Deleted Successfully!', {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                });
            } else {
                console.error('Failed to delete');
                dispatch(fetchProductsError("Failed to delete"));
                toast.error('Something Went wrong!', {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                });
            }
        } catch (error) {
            console.error('Error deleting product:', error);
            dispatch(fetchProductsError("Error deleting product"));
            toast.error('Something Went Wrong!', {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
        }
    };

    const handleSavePost = async (data) => {
        try {
            const response = await fetch(`https://my-json-server.typicode.com/Architsoni09/TestThree/products/${productDetail.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            dispatch(editProduct(result));
            toast.success('Product Updated Successfully!', {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
        } catch (error) {
            console.error('Error fetching data:', error);
            dispatch(fetchProductsError(error));
            toast.error('Something went wrong!', {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
        }
    };

    const handleSave = () => {
        setIsEditing(false);
        const editedProduct = {
            id: productDetail.id,
            category: categoryRef.current.value,
            name: nameRef.current.value,
            price: parseFloat(priceRef.current.value),
            description: descriptionRef.current.value,
            image: productDetail.image,
            rating: parseInt(ratingRef.current.value), // Ensure rating is included in edited product
        };
        handleSavePost(editedProduct);
    };

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 0; i < parseInt(rating); i++) {
            stars.push(<span key={i} className="text-warning mt-3">&#9733;</span>);
        }
        if(stars.length > 5) {stars.length=5}
        return stars;
    };

    return (
        <div className={`card w-75 mt-5 bg-info text-white d-flex flex-column ${isEditing ? 'border border-warning' : ''}`}>
            <div className="card-body d-flex flex-wrap justify-content-between">
                <div className="image-container d-flex justify-content-center align-items-center" style={{ flex: 1, minWidth: '30%' }}>
                    <img onClick={()=>navigate(`/product/${productDetail.id}`)} alt="Product" className="img-fluid" src={productDetail.image} style={{ maxHeight: '200px', objectFit: 'cover' }} />
                </div>
                {isEditing ? (
                    <div className="d-flex flex-column justify-content-center align-items-center"
                         style={{flex: 1, minWidth: '30%'}}>
                        <input type="text" defaultValue={productDetail.category} className="form-control mb-2"
                               ref={categoryRef}/>
                        <input type="text" defaultValue={productDetail.name} className="form-control mb-2"
                               ref={nameRef}/>
                        <input type="number" defaultValue={productDetail.price} className="form-control mb-2"
                               ref={priceRef}/>
                        <input type="number" defaultValue={parseInt(productDetail.rating)} className="form-control mb-2"
                               ref={ratingRef}/>

                    </div>
                ) : (
                    <div className="d-flex flex-column justify-content-center align-items-center"
                         style={{ flex: 1, minWidth: '30%' }}>
                        <h2 className="card-title">Category: {productDetail.category}</h2>
                        <h3 className="card-subtitle mb-2">Type: {productDetail.name}</h3>
                        <h4 className="card-text">Price: ${productDetail.price}</h4>
                        <div className="d-flex">
                            {renderStars(productDetail.rating)}
                        </div>
                    </div>
                )}
                <div className="d-flex flex-column justify-content-center align-items-center" style={{ flex: 1, minWidth: '30%' }}>
                    {isEditing ? (
                        <textarea defaultValue={productDetail.description} className="form-control mb-2" ref={descriptionRef}></textarea>
                    ) : (
                        <p className="card-text">{productDetail.description}</p>
                    )}
                    <div className="d-flex">
                        {isEditing ? (
                            <button className="btn btn-success btn-sm me-2" onClick={handleSave}>Save</button>
                        ) : (
                            <button className="btn btn-primary btn-sm" onClick={() => setIsEditing(true)}><i
                                className="bi bi-pencil"></i></button>
                        )}
                        <button className="btn btn-danger btn-sm ms-3" onClick={() => handleDelete(productDetail.id)}><i
                            className="bi bi-trash"></i></button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
