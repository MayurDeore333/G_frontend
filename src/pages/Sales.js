
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getProducts, updateProduct } from "../redux/features/product/productSlice";
import { ComponentToPrint } from "../components/ComponentToPrint";
import useRedirectLoggedOutUser from "../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../redux/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { SpinnerImg } from "../components/loader/Loader";
import { useReactToPrint } from 'react-to-print';

const Sales = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const toastOptions = {
    autoClose: 400,
    pauseOnHover: true,
  };

  const isLoggedIn = useSelector(selectIsLoggedIn);

  const addProductToCart = async(product) =>{

      let addingProduct = {
        ...product,
        'quantity': 1,
        'totalAmount': product.price,
      }
      setCart([...cart, addingProduct]);
      toast(`Added ${product.name} to cart`, toastOptions)

    const formData = new FormData();

    formData.append("quantity", product.quantity-1);

    const id = product._id;

    await dispatch(updateProduct({id , formData }));
    await dispatch(getProducts());

  }

  const componentRef = useRef();

  const handleReactToPrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handlePrint = () => {
    handleReactToPrint();
  }

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

  useEffect(() => {
    let newTotalAmount = 0;
    cart.forEach((icart) => {
      newTotalAmount = newTotalAmount + parseInt(icart.totalAmount);
    });
    setTotalAmount(newTotalAmount);
  }, [cart]);

  return (
    <>

      {isLoading && <SpinnerImg />}
      <div ><b className='container py-1  d-flex justify-content-center bg-dark  mt-3 ' style={{ fontSize: "25px", color:"white"}}>Add Today's Sale</b></div>
      <div className='row mt-3 ml-3'>
        <div className='col-lg-8'>
          {isLoading ? 'Loading' : <div className='row'>
              {products.map((product, key) =>
                <div key={key} className='col-lg-4 mb-4'>
                  <div className='pos-item px-3 text-center border' onClick={() => addProductToCart(product)}>
                      <p><b style={{ fontSize: "20px" }}>{product.name}</b></p>
                      <img src={product.image.filePath} className="img-fluid" alt={product.name} style={{margin: "0 auto 16px", borderradius : "50%", padding: "2px",
                width: "120px",
                height: "120px", objectfit: "cover" , border: "4px solid #161616"}}/>
                      <p><b style={{ fontSize: "20px" }}>₹{product.price}</b></p>
                  </div>

                </div>
              )}
            </div>}

        </div>
        <div className='col-lg-4'>
              <div style={{display: "none"}}>
                <ComponentToPrint cart={cart} totalAmount={totalAmount} ref={componentRef}/>
              </div>
              <div className='table-responsive bg-dark mr-2 pb-4' >
                <table className='table table-responsive table-dark table-hover'>
                  <thead>
                    <tr>
                      {/* <td>#</td> */}
                      <td><b style={{ fontSize: "20px" }}>Item</b></td>
                      <td><b style={{ fontSize: "20px" }}>Price</b></td>
                      {/* <td>Qty</td>
                      <td>Total</td>
                      <td>Action</td> */}
                    </tr>
                  </thead>
                  <tbody>
                    { cart ? cart.map((cartProduct, key) => <tr key={key}>
                      {/* <td>{cartProduct.id}</td> */}
                      <td>{cartProduct.name}</td>
                      {/* <td>{cartProduct.price}</td> */}
                      {/* <td>{cartProduct.quantity}</td> */}
                      <td>{cartProduct.totalAmount}</td>

                    </tr>)

                    : 'No Item in Cart'}
                  </tbody>
                </table>
                <h2 className='px-2 text-white'><b style={{ fontSize: "20px" }}>Total Amount : ₹{totalAmount}</b></h2>
              </div>

              <div className='mt-3'>
                { totalAmount !== 0 ? <div>
                  <button className='btn btn-primary' onClick={handlePrint}>
                    Print
                  </button>

                </div> : 'Please add a product to the cart'

                }
              </div>

        </div>
      </div>

    </>
  );
};

export default Sales;


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




// import { SpinnerImg } from "../components/loader/Loader";
// import { useEffect, useState } from "react";
// import useRedirectLoggedOutUser from "../customHook/useRedirectLoggedOutUser";
// import { selectIsLoggedIn } from "../redux/features/auth/authSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { getProducts } from "../redux/features/product/productSlice";

// function Sales() {
//   useRedirectLoggedOutUser("/login");
//   const [cart, setCart] = useState([]);
//   const dispatch = useDispatch();
//   const isLoggedIn = useSelector(selectIsLoggedIn);

//   useEffect(() => {
//     if (isLoggedIn === true) {
//       dispatch(getProducts());
//     }
//   }, [isLoggedIn, dispatch]);

//   const { products, isLoading, isError, message } = useSelector(
//     (state) => state.product
//   );

//   const addToCart = (product) => {
//     setCart((prevCart) => [...prevCart, product]);
//   };

//   const removeItem = (productId) => {
//     setCart((prevCart) =>
//       prevCart.filter((item) => item.id !== productId)
//     );
//   };

//   const ProductslList = ({ addToCart }) => {
//     return (
//       <>
//         {isLoading && <SpinnerImg />}
//         <div>
//           <h2>Items :</h2>
//           <ul>
//             {products.map((product) => (
//               <li key={product._id}>
//                 {product.name} - {product.price} $
//                 {/* <div
//                   className="pos-item px-3 text-center border"
//                   onClick={() => addToCart(product)}
//                 >
//                   <p>{product.name}</p>
//                   <img
//                     src={product.image.filePath}
//                     className="img-fluid"
//                     alt={product.name}
//                   />
//                   <p>₹{product.price}</p>
//                 </div> */}
//                 <button onClick={() => addToCart(product)}>Add</button> 
//               </li>
//             ))}
//           </ul>
//         </div>
//       </>
//     );
//   };

//   const Cart = ({ cart, removeItem }) => {
//     const countByProduct = cart.reduce((acc, product) => {
//       acc[product.id] = (acc[product.id] || 0) + 1;
//       return acc;
//     }, {});

//     const cartItems = Object.keys(countByProduct).map((productId) => {
//       const product = cart.find((p) => p.id === parseInt(productId));
//       return {
//         ...product,
//         count: countByProduct[productId],
//       };
//     });

//     const totalPrice = cart.reduce(
//       (acc, product) => acc + product.price * countByProduct[product.id],
//       0
//     );

//     return (
//       <div>
//         <h2>Cart</h2>
//         {cart.length === 0 ? (
//           <p>Your shopping cart is empty.</p>
//         ) : (
//           <ul>
//             {cartItems.map((item) => (
//               <li key={item.id}>
//                 {item.name} - {item.price} $ x {item.count}
//                 <button onClick={() => removeItem(item.id)}>Remove</button>
//               </li>
//             ))}
//             <li id="total">Total: {totalPrice} $</li>
//           </ul>
//         )}
//       </div>
//     );
//   };

//   return (
//     <div className="App">
//       <ProductslList addToCart={addToCart} />
//       <Cart cart={cart} removeItem={removeItem} />
//     </div>
//   );
// }

// export default Sales;


// import { SpinnerImg } from "../components/loader/Loader";

// import { useEffect, useState } from "react";
// import useRedirectLoggedOutUser from "../customHook/useRedirectLoggedOutUser";
// import { selectIsLoggedIn } from "../redux/features/auth/authSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { getProducts } from "../redux/features/product/productSlice";

// function Sales() {
//   useRedirectLoggedOutUser("/login");
//   const [cart, setCart] = useState([]);
//   useEffect(() => {
//     if (isLoggedIn === true) {
//       useDispatch(getProducts());
//     }

//     if (isError) {
//       console.log(message);
//     }
//   }, [isLoggedIn, isError, message, dispatch]);
//   const { products, isLoading, isError, message } = useSelector(
//     (state) => state.product
//   );


//   const addToCart = (product) => {
//     setCart((prevCart) => [...prevCart, product]);
//   };

//   const removeItem = (productId) => {
//     setCart((prevCart) =>
//       prevCart.filter((item) => item.id !== productId)
//     );
//   };
  
//   const isLoggedIn = useSelector(selectIsLoggedIn);
//   const ProductslList = ({ addToCart }) => {
   
//     return (
//         <>
//           {isLoading && <SpinnerImg />}
//       <div>
//         <h2>Items :</h2>
//         <ul>
//           {products.map((product) => (
//             <li key={product._id}>
//               {product.name} - {product.price} $
//               <div className='pos-item px-3 text-center border' onClick={() => addToCart(product)}>
//                       <p>{product.name}</p>
//                       <img src={product.image.filePath} className="img-fluid" alt={product.name} />
//                       <p>₹{product.price}</p>
//                   </div>
           
//             </li>
//           ))}
//         </ul>
//       </div>
//       </>
//     );
//   };

//   const Cart = ({ cart, removeItem }) => {
//     const countByProduct = cart.reduce((acc, product) => {
//       acc[product.id] = (acc[product.id] || 0) + 1;
//       return acc;
//     }, {});

//     const cartItems = Object.keys(countByProduct).map((productId) => {
//       const product = cart.find((p) => p.id === parseInt(productId));
//       return {
//         ...product,
//         count: countByProduct[productId],
//       };
//     });

//     const totalPrice = cart.reduce((acc, product) => acc + product.price, 0);

//     return (
//       <div>
//         <h2>Cart</h2>
//         {cart.length === 0 ? (
//           <p>Your shopping cart is empty.</p>
//         ) : (
//           <ul>
//             {cartItems.map((item) => (
//               <li key={item.id}>
//                 {item.name} - {item.price} $ x {item.count}
//                 <button onClick={() => removeItem(item.id)}>Remove</button>
//               </li>
//             ))}
//             <li id="total">Total: {totalPrice} $</li>
//           </ul>
//         )}
//       </div>
//     );
//   };

//   return (
//     <div className="App">
//       <ProductslList addToCart={addToCart} />
//       <Cart cart={cart} removeItem={removeItem} />
//     </div>
//   );
// }

// export default Sales;

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

//         </div>
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

// import React, { useEffect, useRef, useState } from "react";
// import {
//   getProducts,
//   updateProduct,
// } from "../redux/features/product/productSlice";
// import useRedirectLoggedOutUser from "../customHook/useRedirectLoggedOutUser";
// import { selectIsLoggedIn } from "../redux/features/auth/authSlice";
// import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";
// import { SpinnerImg } from "../components/loader/Loader";


// const Sales = ({product}) => {
//   useRedirectLoggedOutUser("/login");

//   const    cartItems  = useSelector((state) => state.rootReducer);
//   const dispatch = useDispatch();
//   //update cart handler
//   const handleAddTOCart = () => {
//     dispatch({
//       type: "ADD_TO_CART",
//       payload: { ...product, quantity: 1 },
//     });
//   };

//   const isLoggedIn = useSelector(selectIsLoggedIn);

//   const componentRef = useRef();

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
//     localStorage.setItem("cartItems", JSON.stringify(cartItems));
//   }, [cartItems]);

//   return (
//     <>
//       {isLoading && <SpinnerImg />}

//       <div>
//        <p>{cartItems.length}</p>
//        <button type="button" className="btn btn-primary">cart</button></div>
//       <div className="row">
//         <div className="col-lg-8">
//           {isLoading ? (
//             "Loading"
//           ) : (
//             <div className="row">
//               {products.map((product, key) => (
//                 <div key={key} className="col-lg-4 mb-4">
//                   <div className="pos-item px-3 text-center border" onClick={() => handleAddTOCart()}>
//                     <p>{product.name}</p>
//                     <img
//                       src={product.image.filePath}
//                       className="img-fluid"
//                       alt={product.name}
//                     />
//                     <p>₹{product.price}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Sales;