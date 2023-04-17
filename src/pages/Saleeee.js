// import React, { useEffect, useRef, useState } from "react";
// import { toast } from "react-toastify";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { getProducts, updateProduct } from "../redux/features/product/productSlice";
// import { ComponentToPrint } from "../components/ComponentToPrint";
// import useRedirectLoggedOutUser from "../customHook/useRedirectLoggedOutUser";
// import { selectIsLoggedIn } from "../redux/features/auth/authSlice";
// import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";
// import { SpinnerImg } from "../components/loader/Loader";
// import { useReactToPrint } from 'react-to-print';

// const Sales = () => {
//   useRedirectLoggedOutUser("/login");
//   const dispatch = useDispatch();
//   const [cart, setCart] = useState([]);
//   const [totalAmount, setTotalAmount] = useState(0);

//   const toastOptions = {
//     autoClose: 400,
//     pauseOnHover: true,
//   };

//   const isLoggedIn = useSelector(selectIsLoggedIn);

//   const addProductToCart = async(product) =>{

//       let addingProduct = {
//         ...product,
//         'quantity': 1,
//         'totalAmount': product.price,
//       }
//       setCart([...cart, addingProduct]);
//       toast(`Added ${product.name} to cart`, toastOptions)

//     const formData = new FormData();

//     formData.append("quantity", product.quantity-1);

//     const id = product._id;

//     await dispatch(updateProduct({id , formData }));
//     await dispatch(getProducts());

//   }

//   const removeProductFromCart = async(product) =>{
//     let newCart = cart.filter((item) => item._id !== product._id);
//     setCart(newCart);
//     toast(`Removed ${product.name} from cart`, toastOptions);

//     const formData = new FormData();
//     formData.append("quantity", product.quantity+1);

//     const id = product._id;

//     await dispatch(updateProduct({id , formData }));
//     await dispatch(getProducts());
//   }

//   const componentRef = useRef();

//   const handleReactToPrint = useReactToPrint({
//     content: () => componentRef.current,
//   });

//   const handlePrint = () => {
//     handleReactToPrint();
//   }

//   const { products, isLoading, isError, message } = useSelector(
//     (state) => state.product
//   );
//   useEffect(() => {
//     if (isLoggedIn === true) {
//       dispatch(getProducts());
//     }

//     if (isError) {
//       console.log(message);
//     }
//   }, [isLoggedIn, isError, message, dispatch]);

//   useEffect(() => {
//     let newTotalAmount = 0;
//     cart.forEach((icart) => {
//       newTotalAmount = newTotalAmount + parseInt(icart.totalAmount);
//     });
//     setTotalAmount(newTotalAmount);
//   }, [cart]);

//   return (
//     <>

//       {isLoading && <SpinnerImg />}
//       <div className='row'>
//         <div className='col-lg-8'>
//           {isLoading ? 'Loading' : <div className='row'>
//               {products.map((product, key) =>
//                 <div key={key} className='col-lg-4 mb-4'>
//                   <div className='pos-item px-3 text-center border' onClick={() => addProductToCart(product)}>
//                       <p>{product.name}</p>
//                       <img src={product.image.filePath} className="img-fluid" alt={product.name} />
//                       <p>₹{product.price}</p>
//                   </div>

//                 </div>
//               )}
//             </div>}

//             </div>
//         <div className='col-lg-4'>
//               <div style={{display: "none"}}>
//                 <ComponentToPrint cart={cart} totalAmount={totalAmount} ref={componentRef}/>
//               </div>
//               <div className='table-responsive bg-dark'>
//                 <table className='table table-responsive table-dark table-hover'>
//                   <thead>
//                     <tr>
//                       <td>#</td>
//                       <td>Name</td>
//                       <td>Price</td>
//                       <td>Qty</td>
//                       <td>Total</td>
//                       <td>Action</td>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     { cart ? cart.map((cartProduct, key) => <tr key={key}>
//                       <td>{cartProduct.id}</td>
//                       <td>{cartProduct.name}</td>
//                       <td>{cartProduct.price}</td>
//                       <td>{cartProduct.quantity}</td>
//                       <td>{cartProduct.totalAmount}</td>
//                       <td>
//                         <button className='btn btn-danger btn-sm' onClick={() => removeProductFromCart(cartProduct)}>Remove</button>
//                       </td>

//                     </tr>)

//                     : 'No Item in Cart'}
//                   </tbody>
//                 </table>
//                 <h2 className='px-2 text-white'>Total Amount:₹{totalAmount}</h2>
//               </div>

//               <div className='mt-3'>
//                 { totalAmount !== 0 ? <div>
//                   <button className='btn btn-primary' onClick={handlePrint}>
//                     Pay Now
//                   </button>

//                 </div> : 'Please add a product to the cart'

//                 }
//               </div>

//         </div>
//       </div>

//     </>
//   );
// };

// export default Sales;

// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { SET_LOGIN } from "../redux/features/auth/authSlice";
// import { logoutUser } from "../services/authService";
// import { ShowOnLogin, ShowOnLogout } from "../components/loader/protect/HiddenLink";

// export default function NavBar(props) {
//     const [navbar, setNavbar] = useState(false);
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const [isLoading, setIsLoading] = useState(false);
//     const logout = async () => {
//       setIsLoading(true);
//       await logoutUser();

//       await dispatch(SET_LOGIN(false));

//       // navigate("/login");
//       setIsLoading(false);
//     };

//     return (
//         <nav className="w-full shadow"
//         style={{
//           backgroundColor: props.mode === "dark" ? "#000000" : "#282a35",
//         }}>
//             <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
//                 <div>
//                     <div className="flex items-center justify-between py-3 md:py-5 md:block">
//                         <Link to="/">
//                             <h2 className="text-2xl font-bold text-white">GRAHAK_BHANDAR</h2>
//                         </Link>
//                         <div className="md:hidden">
//                             <button
//                                 className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
//                                 onClick={() => setNavbar(!navbar)}
//                             >
//                                 {navbar ? (
//                                     <svg
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         className="w-6 h-6 text-white"
//                                         viewBox="0 0 20 20"
//                                         fill="currentColor"
//                                     >
//                                         <path
//                                             fillRule="evenodd"
//                                             d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
//                                             clipRule="evenodd"
//                                         />
//                                     </svg>
//                                 ) : (
//                                     <svg
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         className="w-6 h-6 text-white"
//                                         fill="none"
//                                         viewBox="0 0 24 24"
//                                         stroke="currentColor"
//                                         strokeWidth={2}
//                                     >
//                                         <path
//                                             strokeLinecap="round"
//                                             strokeLinejoin="round"
//                                             d="M4 6h16M4 12h16M4 18h16"
//                                         />
//                                     </svg>
//                                 )}
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//                 <div>
//                     <div
//                         className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
//                             navbar ? "block" : "hidden"
//                         }`}
//                     >
//                         <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
//                             <li className="text-white hover:text-indigo-200">
//                                 <Link to="/">Home</Link>
//                             </li>
//                             <ShowOnLogin>
//                             <li className="text-white hover:text-indigo-200">
//                                 <Link to="/items">Dashboard</Link>
//                             </li>
//                             <li className="text-white hover:text-indigo-200">
//                                 <Link to="/sales">Add Sale</Link>
//                             </li>
//                             <li className="text-white hover:text-indigo-200">
//                                 <Link to="/Profile">Account</Link>
//                             </li>
//                             </ShowOnLogin>
//                         </ul>

//                         <div className="mt-3 space-y-2 lg:hidden md:inline-block">
//                         <ShowOnLogout>
//                           <Link
//                           to="/login"
//                            className="inline-block w-full px-4 py-2 text-center text-white bg-gray-600 rounded-md shadow hover:bg-gray-800"
//                          >
//                            Sign in
//                           </Link>
//                           </ShowOnLogout>
//                           <ShowOnLogin>
//                           <button
//                           onClick={logout}
//                           className="inline-block w-full px-4 py-2 text-center text-gray-800 bg-white rounded-md shadow hover:bg-gray-100"
//                            >
//                            Logout
//                              </button>
//                              </ShowOnLogin>
//                          </div>
//                          </div>
//                          </div>
//                           <div className="hidden space-x-2 md:inline-block">
//                           <ShowOnLogout>
//                           <Link
//                         className="px-4 py-2 text-white bg-gray-600 rounded-md shadow hover:bg-gray-800"
//                     >
//                         Sign in
//                     </Link>
//                     </ShowOnLogout>
//                     <ShowOnLogin>
//                     <button
//                        onClick={logout}
//                         className="px-4 py-2 text-gray-800 bg-white rounded-md shadow hover:bg-gray-100"
//                     >
//                         Sign up
//                         </button>
//                         </ShowOnLogin>
//                 </div>
//             </div>
//         </nav>
//     );
// }

// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { SET_LOGIN } from "../redux/features/auth/authSlice";
// import { logoutUser } from "../services/authService";
// import { ShowOnLogin, ShowOnLogout } from "../components/loader/protect/HiddenLink";

// export default function Navbar(props) {
//     const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [isLoading, setIsLoading] = useState(false);
//   const logout = async () => {
//     setIsLoading(true);
//     await logoutUser();

//     await dispatch(SET_LOGIN(false));

//     // navigate("/login");
//     setIsLoading(false);
//   };
//   return (
//     <>
//     <div>
//       <nav
//        className="navbar mt-2 py-1 navbar-expand-lg"
//        style={{
//          backgroundColor: props.mode === "dark" ? "#000000" : "#282a35",
//        }}
//      >
//        <Link
//          className="navbar-brand"
//          style={{ color: "white", paddingLeft: "0" }}
//          to="/"
//        >
//          {" "}
//          {/* <img
//            src="GPN_Logo-GBH.png"
//            alt=""
//            height="10"
//            className="d-inline-block"
//          />
//          <h4 className="d-inline-block">
//            <b>GrahakBhandar</b>
//          </h4> */}
//        </Link>
//         <button
//           className="navbar-toggler"
//           style={{ color: "white",backgroundColor:"white" }}
//           type="button"
//           data-toggle="collapse"
//           data-target="#navbarSupportedContent"
//           aria-controls="navbarSupportedContent"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>

//         <div className="collapse navbar-collapse" id="navbarSupportedContent">
//           <ul className="navbar-nav mr-auto">
//             <li className="nav-item active">
//               <Link className="nav-link" style={{ color: "white" }} to="/">
//                 <b> Home </b>
//                 <span className="sr-only">(current)</span>
//               </Link>
//             </li>

//             <ShowOnLogout>
//             <li className="nav-item  ">
//               <Link className="nav-link" style={{ color: "white"}} to="/login">
//                 <b>Login</b>
//               </Link>
//             </li>
//             </ShowOnLogout>
//             <ShowOnLogin>

//             <Link className="nav-link" style={{ color: "white"}} to="/items">
//                 <b>Dashboard</b>
//               </Link>

//               <Link className="nav-link" style={{ color: "white"}} to="/sales">
//                 <b>Add Sale</b>
//               </Link>

//               <Link className="nav-link" style={{ color: "white"}} to="/Profile">
//                 <b>Profile</b>
//               </Link>

//               <Link className="nav-link" style={{ color: "white" }} to="/about">
//                 <b>About</b>
//               </Link>

//             <button onClick={logout} className="btn btn-danger">
//                 <b> Logout </b>
//                 </button>
//             </ShowOnLogin>

//           </ul>
//           <div className="custom-control custom-switch">
//             <input
//               className="custom-control-input"
//               onClick={props.toggleMode}
//               type="checkbox"
//               value=""
//               id="customSwitches"
//             />
//             <label className="custom-control-label" htmlFor="customSwitches">
//               Enable DarkMode
//             </label>
//           </div>
//         </div>
//       </nav>
//     </div>
//     </>
//   );
// }
// <div class="custom-control custom-switch">
//   <input type="checkbox" class="custom-control-input" id="customSwitches">
//   <label class="custom-control-label" for="customSwitches">Toggle this switch element</label>
// </div>

// import React from 'react'
// import { useDispatch } from 'react-redux';
// import { Link, useNavigate } from 'react-router-dom'
// import { useState } from 'react'
// import { toast } from 'react-toastify'
// import { loginUser, validateEmail } from '../../services/authService';
// import { SET_LOGIN, SET_NAME } from '../../redux/features/auth/authSlice';
//  import Loader from '../../components/loader/Loader';

// const initialState = {

//   email: "",
//   password: "",

// };

// const Login = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//     const [isLoading, setIsLoading] = useState(false);
//    const [formData, setformData] = useState(initialState);
//    const {  email, password } = formData;

//    const handleInputChange = (e) => {
//     const{name, value}=e.target;
//     setformData({...formData,[name]:value})
//        };

//        const login =  async (e) => {
//        e.preventDefault();
//        if ( !email || !password) {
//         return toast.error("All fields are required..")
//        }
//        if (!validateEmail(email)) {
//         return toast.error("Please enter a valid email..")
//        }
//        const userData = {
//         email, password
//       };
// setIsLoading(true);
// try {
//   const data = await loginUser(userData);
//   console.log(data);
//   await dispatch(SET_LOGIN(true));
//   await dispatch(SET_NAME(data.name));
//   navigate("/home");
//   setIsLoading(false);
// } catch (error) {
//   setIsLoading(false);
// }
//        };

//   return (
//     <>
//     <div>
//       <div className="h-100 gradient-form py-5" style={{backgroundColor: "#eee"}}>
//   <div className="container  h-100">
//     {isLoading&& <Loader/>}
//     <div className="row d-flex justify-content-center align-items-center h-100">

//         <div className="card rounded-3 text-black">

//               <div className="card-body p-md-5 mx-md-4">

//                 <div className="text-center">
//                   <img src="GPN_Logo-GBH.png"
//                     style={{width: "185px" }}  alt="logo"/>
//                   <h4 className="mt-1 mb-5 pb-1">GrahakBhandar</h4>
//                 </div>

//                 <form onSubmit={login}>
//                   <p>Please login to your account</p>

//                   <div className="form-outline mb-4">
//                     <input type="email" id="form2Example11" className="form-control"
//                       placeholder="email address" required name="email" value={email} onChange={handleInputChange}/>
//                     <label className="form-label" for="form2Example11">Username</label>
//                   </div>

//                   <div className="form-outline mb-4">
//                     <input type="password" id="form2Example22" className="form-control"  placeholder="password" required name="password" value={password} onChange={handleInputChange}/>

//                     <label className="form-label" for="form2Example22">Password</label>
//                   </div>

//                   <div className="text-center pt-1 mb-5 pb-1">
//                     <button className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" type="button" onClick={login}>Log
//                       in</button>
//                     <Link className="text-muted" to="/forgot">Forgot password?</Link>
//                   </div>

//                   <div className="d-flex align-items-center justify-content-center pb-4">
//                   <Link type="button" className="btn btn-outline-danger mr-2" to="/"> Home</Link>
//                     <p className="mb-0 me-2">Don't have an account?</p>
//                     <Link type="button" className="btn btn-outline-danger ml-2" to="/register"> Register</Link>
//                   </div>

//                 </form>

//               </div>

//           </div>
//         </div>
//       </div>

// </div>
//     </div>
//     </>
//   )
// }

// export default Login

// import React from 'react'
// // import "./Login.scss";
// import { useDispatch } from 'react-redux';
// import { Link, useNavigate } from 'react-router-dom'
// import { useState } from 'react'
// import { toast } from 'react-toastify'
// import { loginUser, validateEmail } from '../../services/authService';
// import { SET_LOGIN, SET_NAME } from '../../redux/features/auth/authSlice';
//  import Loader from '../../components/loader/Loader';

// const initialState = {

//  username: "",
//   password: "",

// };

// const Login = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//     const [isLoading, setIsLoading] = useState(false);
//    const [formData, setformData] = useState(initialState);
//    const {  username, password } = formData;

//    const handleInputChange = (e) => {
//     const{name, value}=e.target;
//     setformData({...formData,[name]:value})
//        };

//        const login =  async (e) => {
//        e.preventDefault();
//        if ( !username || !password) {
//         return toast.error("All fields are required..")
//        }
//        if (!validateEmail(username)) {
//         return toast.error("Please enter a valid email..")
//        }
//        const userData = {
//         username, password
//       };
// setIsLoading(true);
// try {
//   const data = await loginUser(userData);
//   console.log(data);
//   await dispatch(SET_LOGIN(true));
//   await dispatch(SET_NAME(data.name));
//   navigate("/home");
//   setIsLoading(false);
// } catch (error) {
//   setIsLoading(false);
// }
//        };

//   return (
//     <>
//      <div className="login">
//         <div className="avatar">
//           <img src="GPN_Logo-GBH.png" alt="logo" />
//         </div>
//         <h2>Login</h2>
//         <h3>Welcome back Kelly</h3>
//         <form className="login-form" >
//           <div className="textbox">
//             <input
//               type="email"
//               name="username"
//               value={username}
//               placeholder="Username"

//             />
//             <span className="material-symbols-outlined">account_circle</span>
//           </div>
//           <div className="textbox">
//             <input
//               type="password"
//               name="password"
//               value={password}
//               placeholder="Password"

//             />
//             <span className="material-symbols-outlined">Lock</span>
//           </div>
//           <button type="submit">LOGIN</button>
//           <Link to="https://website.com">Forgot your credentials?</Link>
//         </form>
//       </div>
//     </>
//   )
// }

// export default Login;
// import React, {  } from 'react';
// import "./LoginForm.css";

// const Login= () => {
//   state = {
//     username: '',
//     password: '',
//   };

//   handleInputChange = (event) => {
//     const { name, value } = event.target;
//     this.setState({ [name]: value });
//   };

//   handleSubmit = (event) => {
//     event.preventDefault();
//     // Handle form submission logic here
//   };

//     return (
//       <div className="login">
//         <div className="avatar">
//           <img src="GPN_Logo-GBH.png" alt="logo" />
//         </div>
//         <h2>Login</h2>
//         <h3>Welcome back Kelly</h3>
//         <form className="login-form" onSubmit={this.handleSubmit}>
//           <div className="textbox">
//             <input
//               type="email"
//               name="username"
//               value={username}
//               placeholder="Username"
//               onChange={this.handleInputChange}
//             />
//             <span className="material-symbols-outlined">account_circle</span>
//           </div>
//           <div className="textbox">
//             <input
//               type="password"
//               name="password"
//               value={password}
//               placeholder="Password"
//               onChange={this.handleInputChange}
//             />
//             <span className="material-symbols-outlined">Lock</span>
//           </div>
//           <button type="submit">LOGIN</button>
//           <a href="https://website.com">Forgot your credentials?</a>
//         </form>
//       </div>
//     );
//   }

// export default Login;

// import React, { useCallback, useEffect, useMemo, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   getAllProductSelector,
//   setDeleteId,
//   setEditedId,
// } from "../../store/productSlice";
// import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
// import {
//   defaultTdStyle,
//   defaultTdActionStyle,
//   defaultTdWrapperStyle,
//   defaultTdContent,
//   defaultTdContentTitleStyle,
//   defaultSearchStyle,
// } from "../../constants/defaultStyles";
// import ReactPaginate from "react-paginate";
// import ProductIcon from "../Icons/ProductIcon";
// import ProductIDIcon from "../Icons/ProductIDIcon";
// import EmptyBar from "../Common/EmptyBar";
// import { useAppContext } from "../../context/AppContext";

// // Example items, to simulate fetching from another resources.
// const itemsPerPage = 10;
// const emptySearchForm = {
//   name: "",
//   productID: "",
// };

// function ProductTable({ showAdvanceSearch = false }) {
//   const { initLoading } = useAppContext();
//   const dispatch = useDispatch();
//   const allProducts = useSelector(getAllProductSelector);

//   const [searchForm, setSearchForm] = useState(emptySearchForm);
//   const [currentItems, setCurrentItems] = useState(null);
//   const [pageCount, setPageCount] = useState(0);
//   const [itemOffset, setItemOffset] = useState(0);

//   const products = useMemo(() => {
//     let filterData = allProducts.length > 0 ? [...allProducts].reverse() : [];
//     if (searchForm.name?.trim()) {
//       filterData = filterData.filter((product) =>
//         product.name.includes(searchForm.name)
//       );
//     }

//     if (searchForm.productID?.trim()) {
//       filterData = filterData.filter((product) =>
//         product.productID.includes(searchForm.productID)
//       );
//     }

//     return filterData;
//   }, [allProducts, searchForm]);

//   // Invoke when user click to request another page.
//   const handlePageClick = (event) => {
//     const newOffset = (event.selected * itemsPerPage) % products.length;
//     setItemOffset(newOffset);
//   };

//   const handleDelete = useCallback(
//     (item) => {
//       dispatch(setDeleteId(item.id));
//     },
//     [dispatch]
//   );

//   const handleEdit = useCallback(
//     (item) => {
//       dispatch(setEditedId(item.id));
//     },
//     [dispatch]
//   );

//   const handlerSearchValue = useCallback((event, keyName) => {
//     const value = event.target.value;

//     setSearchForm((prev) => {
//       return { ...prev, [keyName]: value };
//     });

//     setItemOffset(0);
//   }, []);

//   useEffect(() => {
//     // Fetch items from another resources.
//     const endOffset = itemOffset + itemsPerPage;
//     setCurrentItems(products.slice(itemOffset, endOffset));
//     setPageCount(Math.ceil(products.length / itemsPerPage));
//   }, [products, itemOffset]);

//   return (
//     <>
//       {showAdvanceSearch === true && (
//         <div className="bg-white rounded-xl px-3 py-3 mb-3">
//           <div className="font-title mb-2">Advanced Search</div>
//           <div className="flex w-full flex-col sm:flex-row">
//             <div className="mb-2 sm:mb-0 sm:text-left text-default-color flex flex-row  font-title flex-1 px-2">
//               <div className="h-12 w-12 rounded-2xl bg-gray-100 mr-2 flex justify-center items-center text-gray-400">
//                 <ProductIDIcon />
//               </div>
//               <input
//                 autoComplete="nope"
//                 value={searchForm.productID}
//                 placeholder="Product ID"
//                 className={defaultSearchStyle}
//                 onChange={(e) => handlerSearchValue(e, "productID")}
//               />
//             </div>
//             <div className="mb-2 sm:mb-0 sm:text-left text-default-color flex flex-row font-title flex-1 px-2">
//               <div className="h-12 w-12 rounded-2xl bg-gray-100 mr-2 flex justify-center items-center text-gray-400">
//                 <ProductIcon />
//               </div>
//               <input
//                 autoComplete="nope"
//                 value={searchForm.name}
//                 placeholder="Product Name"
//                 className={defaultSearchStyle}
//                 onChange={(e) => handlerSearchValue(e, "name")}
//               />
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="sm:bg-white rounded-xl sm:px-3 sm:py-3">
//         <div className="hidden sm:flex invisible sm:visible w-full flex-col sm:flex-row">
//           <div className="sm:text-left text-default-color font-title flex-1">
//            Sl.No
//           </div>
//           <div className="sm:text-left text-default-color font-title flex-1">
//           Item Name
//           </div>
//           <div className="sm:text-left text-default-color font-title flex-1">
//           Category
//           </div>
//           <div className="sm:text-left text-default-color font-title sm:w-11">
//           Sales Price
//           </div>
//           <div className="sm:text-left text-default-color font-title flex-1">
//           Purchase Price
//           </div>
//           <div className="sm:text-left text-default-color font-title flex-1">
//           Stock Qty
//           </div>
//           <div className="sm:text-left text-default-color font-title flex-1">
//           Stock Value
//           </div>
//           <div className="sm:text-left text-default-color font-title sm:w-11">
//           Action
//           </div>

//         </div>

//        <div>

//             {currentItems.map((product,index) => {
//                const { _id, name, image, category, price, price2, quantity, lowstock } = product;
//                return(
//               <div className={defaultTdWrapperStyle} key={product.id}>
//                 <div className={defaultTdStyle}>
//                   <div className={defaultTdContentTitleStyle}>ProductID</div>
//                   <div className={defaultTdContent}>
//                     {image.filePath ? (
//                       <img
//                         className="object-cover h-10 w-10 rounded-2xl"
//                         src={image.filePath}
//                         alt={item}
//                       />
//                     ) : (
//                       <span className="h-10 w-10 rounded-2xl bg-gray-100 flex justify-center items-center">
//                         <ProductIcon />
//                       </span>
//                     )}
//                     <span className="whitespace-nowrap text-ellipsis overflow-hidden pl-1">
//                       {index + 1}
//                     </span>
//                   </div>
//                 </div>

//                 <div className={defaultTdStyle}>
//                   <div className={defaultTdContentTitleStyle}>Name</div>
//                   <div className={defaultTdContent}>
//                     <span className="whitespace-nowrap text-ellipsis overflow-hidden">
//                     {shortenText(name, 16)} {lowstockStatus(lowstock, quantity)}
//                       {name}
//                     </span>
//                   </div>
//                 </div>

//                 <div className={defaultTdStyle}>
//                   <div className={defaultTdContentTitleStyle}>Category</div>
//                   <div className={defaultTdContent}>
//                     <span className="whitespace-nowrap text-ellipsis overflow-hidden">
//                     {category}
//                     </span>
//                   </div>
//                 </div>

//                 <div className={defaultTdStyle}>
//                   <div className={defaultTdContentTitleStyle}>Sales Price</div>
//                   <div className={defaultTdContent}>
//                     <span className="whitespace-nowrap text-ellipsis overflow-hidden">
//                     {"₹"}{price}
//                     </span>
//                   </div>
//                 </div>

//                 <div className={defaultTdStyle}>
//                   <div className={defaultTdContentTitleStyle}>Purchase Price</div>
//                   <div className={defaultTdContent}>
//                     <span className="whitespace-nowrap text-ellipsis overflow-hidden">
//                     {"₹"}{price2}
//                     </span>
//                   </div>
//                 </div>

//                 <div className={defaultTdStyle}>
//                   <div className={defaultTdContentTitleStyle}>Stock Qty</div>
//                   <div className={defaultTdContent}>
//                     <span className="whitespace-nowrap text-ellipsis overflow-hidden">
//                     {quantity}
//                     </span>
//                   </div>
//                 </div>

//                 <div className={defaultTdStyle}>
//                   <div className={defaultTdContentTitleStyle}>Stock Value</div>
//                   <div className={defaultTdContent}>
//                     <span className="whitespace-nowrap text-ellipsis overflow-hidden">
//                     {"₹"}{price * quantity}
//                     </span>
//                   </div>
//                 </div>

//                 <div className={defaultTdActionStyle}>
//                   <div className={defaultTdContentTitleStyle}>Action</div>
//                   <div className={defaultTdContent}>
//                     <Menu
//                       menuButton={
//                         <MenuButton>
//                           <div className="bg-gray-50 px-2 rounded-xl">
//                             <svg
//                               xmlns="http://www.w3.org/2000/svg"
//                               className="h-6 w-6 text-blue-400"
//                               fill="none"
//                               viewBox="0 0 24 24"
//                               stroke="currentColor"
//                               strokeWidth={2}
//                             >
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
//                               />
//                             </svg>
//                           </div>
//                         </MenuButton>
//                       }
//                       transition
//                     >
//                       <MenuItem >
//                       <Link to={`/product-detail/${_id}`}>
//                         Item Details
//                         </Link>
//                       </MenuItem>
//                       <MenuItem>
//                       <Link to={`/edit-product/${_id}`}>
//                         Item Details
//                         </Link>
//                       </MenuItem>
//                       <MenuItem>
//                       <Link to={`/addSale-form/${_id}`}>
//                         Add today's sale
//                         </Link>
//                       </MenuItem>
//                       <MenuItem>
//                       <Link to={`/product-Sale/${_id}`}>
//                         Product Sales
//                         </Link>
//                       </MenuItem>
//                       <MenuItem onClick={() => confirmDelete(_id)}>
//                         Delete
//                       </MenuItem>
//                     </Menu>
//                   </div>
//                 </div>
//               </div>
//               );
//                     })}

//            {products.length > 0 && (
//             <ReactPaginate
//               className="inline-flex items-center -space-x-px mt-2"
//               previousLinkClassName="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
//               nextLinkClassName="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
//               pageLinkClassName="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
//               breakLinkClassName="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
//               activeLinkClassName="py-2 px-3 text-blue-600 bg-blue-50 border border-gray-300 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
//               breakLabel="..."
//               onPageChange={handlePageClick}
//               pageRangeDisplayed={1}
//               pageCount={pageCount}
//               previousLabel="<"
//               nextLabel={">"}
//               renderOnZeroPageCount={null}
//             />
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

// export default ProductTable;
// import React, { useCallback, useEffect, useMemo, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   getAllProductSelector,
//   setDeleteId,
//   setEditedId,
// } from "../../store/productSlice";
// import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
// import {
//   defaultTdStyle,
//   defaultTdActionStyle,
//   defaultTdWrapperStyle,
//   defaultTdContent,
//   defaultTdContentTitleStyle,
//   defaultSearchStyle,
// } from "../../constants/defaultStyles";
// import ReactPaginate from "react-paginate";
// import ProductIcon from "../Icons/ProductIcon";
// import ProductIDIcon from "../Icons/ProductIDIcon";
// import EmptyBar from "../Common/EmptyBar";
// import { useAppContext } from "../../context/AppContext";

// // Example items, to simulate fetching from another resources.
// const itemsPerPage = 10;
// const emptySearchForm = {
//   name: "",
//   productID: "",
// };

// function ProductTable({ showAdvanceSearch = false }) {
//   const { initLoading } = useAppContext();
//   const dispatch = useDispatch();
//   const allProducts = useSelector(getAllProductSelector);

//   const [searchForm, setSearchForm] = useState(emptySearchForm);
//   const [currentItems, setCurrentItems] = useState(null);
//   const [pageCount, setPageCount] = useState(0);
//   const [itemOffset, setItemOffset] = useState(0);

//   const products = useMemo(() => {
//     let filterData = allProducts.length > 0 ? [...allProducts].reverse() : [];
//     if (searchForm.name?.trim()) {
//       filterData = filterData.filter((product) =>
//         product.name.includes(searchForm.name)
//       );
//     }

//     if (searchForm.productID?.trim()) {
//       filterData = filterData.filter((product) =>
//         product.productID.includes(searchForm.productID)
//       );
//     }

//     return filterData;
//   }, [allProducts, searchForm]);

//   // Invoke when user click to request another page.
//   const handlePageClick = (event) => {
//     const newOffset = (event.selected * itemsPerPage) % products.length;
//     setItemOffset(newOffset);
//   };

//   // const handleDelete = useCallback(
//   //   (item) => {
//   //     dispatch(setDeleteId(item.id));
//   //   },
//   //   [dispatch]
//   // );

//   // const handleEdit = useCallback(
//   //   (item) => {
//   //     dispatch(setEditedId(item.id));
//   //   },
//   //   [dispatch]
//   // );

//   const handlerSearchValue = useCallback((event, keyName) => {
//     const value = event.target.value;

//     setSearchForm((prev) => {
//       return { ...prev, [keyName]: value };
//     });

//     setItemOffset(0);
//   }, []);

//   useEffect(() => {
//     // Fetch items from another resources.
//     const endOffset = itemOffset + itemsPerPage;
//     setCurrentItems(products.slice(itemOffset, endOffset));
//     setPageCount(Math.ceil(products.length / itemsPerPage));
//   }, [products, itemOffset]);

//   return (
//     <>
//       {showAdvanceSearch === true && (
//         <div className="bg-white rounded-xl px-3 py-3 mb-3">
//           <div className="font-title mb-2">Advanced Search</div>
//           <div className="flex w-full flex-col sm:flex-row">
//             <div className="mb-2 sm:mb-0 sm:text-left text-default-color flex flex-row  font-title flex-1 px-2">
//               <div className="h-12 w-12 rounded-2xl bg-gray-100 mr-2 flex justify-center items-center text-gray-400">
//                 <ProductIDIcon />
//               </div>
//               <input
//                 autoComplete="nope"
//                 value={searchForm.productID}
//                 placeholder="Product ID"
//                 className={defaultSearchStyle}
//                 onChange={(e) => handlerSearchValue(e, "productID")}
//               />
//             </div>
//             <div className="mb-2 sm:mb-0 sm:text-left text-default-color flex flex-row font-title flex-1 px-2">
//               <div className="h-12 w-12 rounded-2xl bg-gray-100 mr-2 flex justify-center items-center text-gray-400">
//                 <ProductIcon />
//               </div>
//               <input
//                 autoComplete="nope"
//                 value={searchForm.name}
//                 placeholder="Product Name"
//                 className={defaultSearchStyle}
//                 onChange={(e) => handlerSearchValue(e, "name")}
//               />
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="sm:bg-white rounded-xl sm:px-3 sm:py-3">
//         <div className="hidden sm:flex invisible sm:visible w-full flex-col sm:flex-row">
//           <div className="sm:text-left text-default-color font-title flex-1">
//             ProductID
//           </div>
//           <div className="sm:text-left text-default-color font-title flex-1">
//             Name
//           </div>
//           <div className="sm:text-left text-default-color font-title flex-1">
//             Amount
//           </div>
//           <div className="sm:text-left text-default-color font-title sm:w-11">
//             Action
//           </div>
//         </div>

//         <div>
//           {currentItems &&
//             currentItems.map((product) => (
//               <div className={defaultTdWrapperStyle} key={product.id}>
//                 <div className={defaultTdStyle}>
//                   <div className={defaultTdContentTitleStyle}>ProductID</div>
//                   <div className={defaultTdContent}>
//                     {product.image ? (
//                       <img
//                         className="object-cover h-10 w-10 rounded-2xl"
//                         src={product.image}
//                         alt={product.name}
//                       />
//                     ) : (
//                       <span className="h-10 w-10 rounded-2xl bg-gray-100 flex justify-center items-center">
//                         <ProductIcon />
//                       </span>
//                     )}
//                     <span className="whitespace-nowrap text-ellipsis overflow-hidden pl-1">
//                       {product.productID || "#"}
//                     </span>
//                   </div>
//                 </div>

//                 <div className={defaultTdStyle}>
//                   <div className={defaultTdContentTitleStyle}>Name</div>
//                   <div className={defaultTdContent}>
//                     <span className="whitespace-nowrap text-ellipsis overflow-hidden">
//                       {product.name}
//                     </span>
//                   </div>
//                 </div>

//                 <div className={defaultTdStyle}>
//                   <div className={defaultTdContentTitleStyle}>Amount</div>
//                   <div className={defaultTdContent}>
//                     <span className="whitespace-nowrap text-ellipsis overflow-hidden">
//                       {product.amount}
//                     </span>
//                   </div>
//                 </div>

//                 <div className={defaultTdActionStyle}>
//                   <div className={defaultTdContentTitleStyle}>Action</div>
//                   <div className={defaultTdContent}>
//                     <Menu
//                       menuButton={
//                         <MenuButton>
//                           <div className="bg-gray-50 px-2 rounded-xl">
//                             <svg
//                               xmlns="http://www.w3.org/2000/svg"
//                               className="h-6 w-6 text-blue-400"
//                               fill="none"
//                               viewBox="0 0 24 24"
//                               stroke="currentColor"
//                               strokeWidth={2}
//                             >
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
//                               />
//                             </svg>
//                           </div>
//                         </MenuButton>
//                       }
//                       transition
//                     >
//                       <MenuItem onClick={() => handleEdit(product)}>
//                         Edit
//                       </MenuItem>
//                       <MenuItem onClick={() => handleDelete(product)}>
//                         Delete
//                       </MenuItem>
//                     </Menu>
//                   </div>
//                 </div>
//               </div>
//             ))}

//           {products.length <= 0 && !initLoading && <EmptyBar />}

//           {products.length > 0 && (
//             <ReactPaginate
//               className="inline-flex items-center -space-x-px mt-2"
//               previousLinkClassName="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
//               nextLinkClassName="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
//               pageLinkClassName="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
//               breakLinkClassName="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
//               activeLinkClassName="py-2 px-3 text-blue-600 bg-blue-50 border border-gray-300 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
//               breakLabel="..."
//               onPageChange={handlePageClick}
//               pageRangeDisplayed={1}
//               pageCount={pageCount}
//               previousLabel="<"
//               nextLabel={">"}
//               renderOnZeroPageCount={null}
//             />
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

// export default ProductTable;

<section className="vh-100 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div
                className="card bg-dark text-white"
                style={{ borderradius: "1rem" }}
              >
                <div className="card-body p-5 text-center">
                  <div className=" md-5 mt-md-4 pb-5">
                    <h2 className="fw-bold mb-0 text-uppercase">Add Today's Sale for this item</h2>
                   
                  </div>
                  <form onSubmit={onSubmit}>
                  <div className="form-outline form-white mb-4">
          <input
             type="date"
             name="date"
             placeholder="Date"
             value={date}
             onChange={onChange}
             required
            className="form-control form-control-lg"
            
          />
           </div>
           <div className="form-outline form-white mb-4">
          <input
              type="number"
              name="quantitySold"
              placeholder="Quantity Sold"
              value={quantitySold}
              onChange={onChange}
              required
            className="form-control form-control-lg"
          />
          </div>
          <div className="form-outline form-white mb-4">
          <input
              type="number"
              name="profit"
              placeholder="Total Sales"
              value={profit}
              onChange={onChange}
              required
            className="form-control form-control-lg"
          />
          </div>
          <button type="submit" className="btn btn-primary mb-3">
          Add Sale
          </button>
        </form>
                  <div>
                    <p className="mb-0 text-white-50 fw-bold">
                      GrahakBhandar, Government Polytechnic, Nashik.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>