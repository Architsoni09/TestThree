// src/App.js
import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import 'bootstrap/dist/css/bootstrap.min.css';
import { store } from "./app/store";
import { Provider } from "react-redux";
import AddForm from "./Pages/AddForm";
import ProductDetail from "./Pages/ProductDetail";
import Cart from "./Pages/Cart";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import React from "react";

function App() {
    const routes = createBrowserRouter([
        {
            path: "/", element: <Navbar />, children: [
                { index: true, element: <Home /> },
                { path: 'addProduct', element: <AddForm /> },
                { path: 'product/:productId', element: <ProductDetail /> },
                { path: 'cart', element: <Cart /> }
            ]
        }
    ]);

    return (
        <Provider store={store}>
            <div className="App">
                <RouterProvider router={routes} />
                <ToastContainer
                    position="top-right"
                    autoClose={1600}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
            </div>
        </Provider>
    );
}

export default App;
