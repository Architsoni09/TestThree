import React from 'react';

function ProductCard(props) {
    let {productDetail}=props;
    return (
        <div style={{ minHeight: '15vh', minWidth: '75vw' }} className="w-75 mt-5 bg-info d-flex h-75 flex-column">
            <div style={{maxHeight:'200px'}} className="d-flex text-white object-fit-contain overflow-hidden flex-wrap flex-row w-100 justify-content-between">
                <div className="d-flex justify-content-center align-items-center" style={{ flex: 1, minWidth: '30%', objectFit: 'contain' }}>
                    <img alt="F" style={{ width: '60%' }} src={productDetail.image} />
                </div>
                <div className="d-flex flex-column justify-content-center align-items-center"
                     style={{flex: 1, minWidth: '30%'}}>
                    <h2>Category:- {productDetail.category}</h2>
                    <h3>Type:- {productDetail.name}</h3>
                    <h4>Price:- {productDetail.price}</h4>
                </div>
                <div className="d-flex justify-content-center align-items-center" style={{ flex: 1, minWidth: '30%' }}>
                    <h3>{productDetail.description}</h3>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
