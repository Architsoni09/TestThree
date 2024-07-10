import React from 'react';
import { NavLink, Outlet } from "react-router-dom";
import {useSelector} from "react-redux";

function Navbar(props) {
 const {cartItems}=useSelector(state => state.cart);
    console.log(cartItems);
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-gradient bg-black ">
                <div className="container-fluid text-white">
                    <NavLink to={"/"} className="navbar-brand text-white" href="#">Ecommerce</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink to={"/cart"} className="text-white nav-link active" aria-current="page"
                                         href="#">Products <span className="badge text-bg-secondary">{cartItems.length}</span></NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to={"/addProduct"} className="text-white nav-link" href="#">Add a product</NavLink>
                            </li>
                        </ul>
                        <div className="d-flex align-items-center">
                            <span className="text-white me-3">John Doe</span>
                            <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2IYhSn8Y9S9_HF3tVaYOepJBcrYcd809pBA&s"} alt="User Logo" className="rounded-circle" style={{ width: '40px', height: '40px' }} />
                        </div>
                    </div>
                </div>
            </nav>
            <Outlet />
        </>
    );
}

export default Navbar;
