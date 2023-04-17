// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import ProductList from "../components/product/productList/ProductList";
// import useRedirectLoggedOutUser from "../customHook/useRedirectLoggedOutUser";
// import { selectIsLoggedIn } from "../redux/features/auth/authSlice";
// import { getProducts } from "../redux/features/product/productSlice";
// import AddProduct from "./addProduct/AddProduct";
// import ProductSummary from "../components/product/productSummary/ProductSummary";
// import AdminOnly from "./AdminOnly";
// import { selectIsAdmin } from "../redux/features/auth/adminSlice";


// const Items = () => {
 


//   useRedirectLoggedOutUser("/login");
//   const dispatch = useDispatch();

//   const isLoggedIn = useSelector(selectIsLoggedIn);
//   const isAdmin = useSelector(selectIsAdmin);  
//   const { products, isLoading, isError, message } = useSelector(
//     (state) => state.product
//   );
//   useEffect(() => {
//     if (isAdmin===true && isLoggedIn ===true) {  
//       dispatch(getProducts());
//     }

//     if (isError) {
//       console.log(message);
//     }
//   }, [isLoggedIn, isAdmin, isError, message, dispatch]);
//   const [isOpen, setIsOpen] = useState(false);
//   const toggle = () => setIsOpen(!isOpen);
  
//   if (!isAdmin) {  
//     return <AdminOnly />;
//   }
 
//   return (
//     <>
//       <ProductSummary products={products} />
//       <div style={{ color: "#194185" }}>
//         <h4>Items</h4>
//       </div>
//       <ProductList products={products} isLoading={isLoading} />

   
//       <button
//         className="btn btn-primary"
//         type="button"
//         onClick={toggle}
//         style={{ color: "white" }}
//       >
//         <b>+ Add Item</b>
//       </button>
//       {isOpen && <AddProduct />}
//     </>
//   );
 
// // };
// const Items = () => {
//   // useRedirectLoggedOutUser("/login");
//   const dispatch = useDispatch();

//   const isLoggedIn = useSelector(selectIsLoggedIn);
//   const isAdmin = useSelector(selectIsAdmin);  
//   const { products, isLoading, isError, message } = useSelector(
//     (state) => state.product
//   );
//   useEffect(() => {
//     if (isAdmin && isLoggedIn) {  
//       dispatch(getProducts());
//     }

//     if (isError) {
//       console.log(message);
//     }
//   }, [isLoggedIn, isAdmin, isError, message, dispatch]);

//   const [isOpen, setIsOpen] = useState(false);
//   const toggle = () => setIsOpen(!isOpen);

//   console.log(isAdmin);

//   if (!isAdmin) {  
//     return <AdminOnly />;
//   }
  

//   return (
//     <>
//       <ProductSummary products={products} />
//       <div style={{ color: "#194185" }}>
//         <h4>Items</h4>
//       </div>
//       <ProductList products={products} isLoading={isLoading} />

//       <button
//         className="btn btn-primary"
//         type="button"
//         onClick={toggle}
//         style={{ color: "white" }}
//       >
//         <b>+ Add Item</b>
//       </button>
//       {isOpen && <AddProduct />}
//     </>
//   );
// };
// export default Items;



import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductList from "../components/product/productList/ProductList";
import useRedirectLoggedOutUser from "../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../redux/features/auth/authSlice";
import { getProducts } from "../redux/features/product/productSlice";
// import { Link } from "react-router-dom";
import AddProduct from "./addProduct/AddProduct";
import ProductSummary from "../components/product/productSummary/ProductSummary";

const Items = (props) => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { products, isLoading, isError, message } = useSelector(
    (state) => state.product
  );
  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getProducts());
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      <ProductSummary products={products} />
      <div style={{ color: "#194185" }}>
        {/* <h4>Items</h4> */}
      </div>
      <ProductList products={products} isLoading={isLoading} />

      {/* <button type="button" class="btn btn-primary">Primary</button> */}
      {/* <div
        className="justify-center  container mt-5 border rounded"
        style={{ color: props.mode === "dark" ? "white" : "#042743" }}
      >
      <button
        className="btn btn-primary"
        type="button"
        onClick={toggle}
        style={{ color: "white" }}
      >
        <b>+ Add Item</b>
      </button>
      </div>
      {isOpen && <AddProduct />} */}
      
    </>
  );
};

export default Items;
