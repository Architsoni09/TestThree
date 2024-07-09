import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchProductsError, fetchProductsStart, fetchProductsSuccess, productsSelector} from "../Redux/ProductsSlice";
import {createSelector} from "@reduxjs/toolkit";
import {store} from "../app/store";
import ProductCard from "../Components/ProductCard";

function Home(props) {
    const dispatch=useDispatch();
    const products =useSelector((state)=>{
        return state.products;
    });

    const getInitialProductsData=async ()=>{
        dispatch(fetchProductsStart());
        const response=await fetch("https://my-json-server.typicode.com/Architsoni09/TestThree/products");
        const data=await response.json();
        dispatch(fetchProductsSuccess(data));
    }

    useEffect(()=>{
        try{
            getInitialProductsData();
        }
        catch (err){
            console.log(err);
            dispatch(fetchProductsError(err));
        }
    },[]);

    if(products.isLoading){
        return (
            <div style={{minHeight:'92vh',minWidth:'100%'}} className="d-flex justify-content-center align-items-center h-75 min-vw-100 bg-dark">
            <h1>Still Loading...</h1>
            </div>
        );
    }

    if(products.error){
        return (
            <div style={{minHeight:'92vh',minWidth:'100%'}} className="d-flex justify-content-center align-items-center h-75 min-vw-100 bg-dark">
                <h1>Sorry Something went Wrong!!!</h1>
            </div>
        );
    }
    return (
        <div style={{minHeight:'92vh',minWidth:'100%'}} className="d-flex justify-content-center flex-wrap  align-items-center h-75 min-vw-100 bg-dark">
            {products.productData.map((product) =><ProductCard productDetail={product}/>)}
        </div>
    );
}

export default Home;