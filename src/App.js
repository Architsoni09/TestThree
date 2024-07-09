import './App.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import 'bootstrap/dist/css/bootstrap.min.css';
import {store} from "./app/store";
import {Provider} from "react-redux";

function App() {
  const routes=createBrowserRouter([
    {path:"/",element:<Navbar/>,children:[
        {index:true,element:<Home/>}
      ]}
  ])
  return (
    <div className="App">
        <Provider store={store}>
      <RouterProvider router={routes}/>
        </Provider>
    </div>
  );
}

export default App;
