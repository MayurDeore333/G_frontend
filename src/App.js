
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import SideBar from "./Sidebar/SideBar";
import Items from "./pages/Items";
import Sales from "./pages/Sales";
import Purchase from "./pages/Purchase";
import Profile from "./pages/Profile";
import Cashbook from "./pages/Casbook";
import Customers from "./pages/Customers";
import Suppliers from "./pages/Suppliers";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Forgot from "./pages/auth/Forgot";
import Reset from "./pages/auth/Reset";
import AddProduct from "./pages/addProduct/AddProduct";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getLoginStatus } from "./services/authService";
import { useDispatch } from "react-redux";
import { SET_LOGIN } from "./redux/features/auth/authSlice";
import { useEffect, useState } from "react";
import ProductDetail from "./components/product/productDetail/ProductDetail";
// import Dashboard from "./Dashboard";
import EditProfile from "./pages/profile/EditProfile";
import EditProduct from "./pages/editProduct/EditProduct";
import AddSaleForm from "./pages/AddSaleForm";
import ProductSal from "./pages/ProductSal";
import Navbar from "./pages/Navbar";

axios.defaults.withCredentials = true;

function App() {
  const [mode, setMode] = useState("light");
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };
  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "#1d2a35";
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
    }
  };
  const dispatch = useDispatch();

  useEffect(() => {
    async function loginStatus() {
      const status = await getLoginStatus();
      dispatch(SET_LOGIN(status));
    }
    loginStatus();
  }, [dispatch]);
  return (
    <>
      <Router>
        <Navbar
          mode={mode}
          toggleMode={toggleMode}
          key={new Date()}
        />
         <Routes>
          <Route path="/login" element={<Login />} />
          </Routes>
        <ToastContainer />
        <Routes>
          <Route exact path="/" element={<Home showAlert={showAlert} mode={mode} />} ></Route>
          {/* <Route exact path="/about" element={<About mode={mode} />}></Route> */}
        
         
         <Route path="/register" element={<Register />} />
         <Route path="/forgot" element={<Forgot />} />
         <Route path="/resetpassword/:resetToken" element={<Reset />} />
         <Route path="/addProduct" element={<AddProduct />} />
         <Route path="/product-detail/:id" element={<ProductDetail />} />
         <Route path="/edit-product/:id" element={<EditProduct />} />
         <Route path="/edit-profile" element={<EditProfile />} />
         <Route path="/addSale-form/:id" element={<AddSaleForm/>} />
         <Route path="/product-Sale/:id" element={<ProductSal/>} />
         <Route path="/items" element={<Items />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/purchase" element={<Purchase />} />
            <Route path="/cashbook" element={<Cashbook />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/suppliers" element={<Suppliers />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="*" element={<> not found</>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

// import "./App.css";
// import Form from "./Form";
// import Navbar from "./Navbar";
// import Alert from "./Alert";
// import About from "./About";
// import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// function App() {
 
//   return (
    
//   );
// }

// export default App;
