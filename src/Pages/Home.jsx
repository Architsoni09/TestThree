import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchProductsError, fetchProductsStart, fetchProductsSuccess,} from "../Redux/ProductsSlice";
import ProductCard from "../Components/ProductCard";
import {Bounce, toast} from "react-toastify";

function Home(props) {
    const dispatch = useDispatch();
    const [sortedMode,setSortedMode]=useState(false);
    const products = useSelector((state) => {
        return state.products;
    });
    const filteredProducts = [...products.productData].sort((a, b) => a.price - b.price);

    const getInitialProductsData = async () => {
        dispatch(fetchProductsStart());
        const response = await fetch("https://my-json-server.typicode.com/Architsoni09/TestThree/products");
        const data = await response.json();
        dispatch(fetchProductsSuccess(data));

    }

    useEffect(() => {
        try {
            if(products.productData.length ===0){
                getInitialProductsData();
                toast.success('Products Fetched Successfully!', {
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
        } catch (err) {
            console.log(err);
            dispatch(fetchProductsError(err));
            toast.error('Products Fetching Failed Please try again!', {
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
    }, []);

    if (products.isLoading) {
        return (
            <div style={{minHeight: '92vh', minWidth: '100%'}}
                 className="d-flex justify-content-center align-items-center h-75 bg-dark">
                <h1>Still Loading...</h1>
            </div>
        );
    }

    if (products.error) {
        return (
            <div style={{minHeight: '92vh', minWidth: '100%'}}
                 className="d-flex justify-content-center align-items-center h-75 bg-dark">
                <h1>Sorry Something went Wrong!!!</h1>
            </div>
        );
    }
    return (
        <>

            <div style={{minHeight: '92vh', minWidth: '100%'}}
                 className="d-flex justify-content-center  flex-wrap  align-items-center h-75 bg-dark">
                <div style={{height: '80px'}}
                     className="d-flex justify-content-end flex-wrap align-items-center w-75 bg-dark">
                    <button type="button" onClick={()=>setSortedMode(true)} className="btn btn-primary">Sort By Price</button>
                    {sortedMode&&<button type="button" onClick={()=>setSortedMode(false)} className="btn-close bg-white ms-2" aria-label="Close"></button>}
                </div>
                {sortedMode===false?products.productData.map((product) => <ProductCard key={product.id} productDetail={product}/>):
                   filteredProducts.map((product) => <ProductCard key={product.id} productDetail={product}/>)
                }
            </div>
        </>
    );
}

export default Home;