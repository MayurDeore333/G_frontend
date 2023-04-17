import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useRedirectLoggedOutUser from "../../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../../redux/features/auth/authSlice";
import { getProduct } from "../../../redux/features/product/productSlice";
 
import { SpinnerImg } from "../../loader/Loader";
import "./ProductDetail.scss";
import DOMPurify from "dompurify";


  

const ProductDetail = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const { id } = useParams();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { product, isLoading, isError, message } = useSelector(
    (state) => state.product
  );

  const stockStatus = (quantity) => {
    if (quantity > 0) {
      return <span className="text-success">In Stock</span>;
    }
    return <span className="text-danger">Out Of Stock</span>;
  };
  
  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getProduct(id));
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);


  return (

    <div className="product-detail container mt-3 border">
      
      
        {isLoading && <SpinnerImg />}
        {product && (
          <div className="detail">
           
              {product?.image ? (
                <img
                  src={product.image.filePath}
                  alt={product.image.fileName}
                />
              ) : (
                <p>No image set for this item</p>
              )}
            
            <h4>Product Availability: {stockStatus(product.quantity)}</h4>
            <hr />
            <h4>
              <span className="badge">Name of an Item : </span> &nbsp; {product.name}
            </h4>
            <p>
              <b>&rarr; SKU : </b> {product.sku}
            </p>
            <p>
              <b>&rarr; Category of an Item : </b> {product.category}
            </p>
            <p>
              <b>&rarr; Sales Price : </b> {"₹"}
              {product.price}
            </p>
            <p>
              <b>&rarr; Purchase Price : </b> {"₹"}
              {product.price2}
            </p>
            <p>
              <b>&rarr; Quantity in stock : </b> {product.quantity}
            </p>
            <p>
              <b>&rarr; Low Stock : </b> {product.lowstock}
            </p>
            <p>
              <b>&rarr; Total Value in stock : </b> {"₹"}
              {product.price * product.quantity}
            </p>
            <hr />
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(product.description),
              }}
            ></div>
            <hr />
            <code className="--color-dark">
              Created on: {product.createdAt.toLocaleString("en-US")}
            </code>
            <br />
            <code className="--color-dark">
              Last Updated: {product.updatedAt.toLocaleString("en-US")}
            </code>
          </div>
        )}
    {/* <ul>
        {product.sale.map((sale, index) => (
          <li key={index}>
            <p>Date: {sale.date}</p>
            <p>Quantity Sold: {sale.quantitySold}</p>
            <p>Profit: {sale.profit}</p>
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default ProductDetail;


// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { getSales } from "../redux/features/product/productSlice";

// const ProductSale = () =>  {
//   const dispatch = useDispatch();
//   const sales = useSelector((state) => state.products.sales);
//   const { id } = useParams();
//   useEffect(() => {
//     dispatch(getSales(id));
//   }, [dispatch]);

//   return (
//     <div>
//       <h3>Sales for Product</h3>
//       <ul>
//         {sales.map((sale) => (
//           <li key={sale.id}>
//             {sale.date}: {sale.quantitySold} units sold
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };
// export default ProductSale;
// import React, { useEffect, useState } from 'react';
// import { selectIsLoggedIn } from '../redux/features/auth/authSlice';
// import useRedirectLoggedOutUser from '../customHook/useRedirectLoggedOutUser';
// import { useParams } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { SpinnerImg } from '../components/loader/Loader';
// import { getProduct } from '../redux/features/product/productSlice';

// const productSale = ()=> {

//     useRedirectLoggedOutUser("/login");
//   const dispatch = useDispatch();

//   const { id } = useParams();

//   const isLoggedIn = useSelector(selectIsLoggedIn);
//   const { product, isLoading, isError, message } = useSelector(
//     (state) => state.product
//   );

//   useEffect(() => {
//     if (isLoggedIn === true) {
//       dispatch(getProduct(id));
//     }

//     if (isError) {
//       console.log(message);
//     }
//   }, [isLoggedIn, isError, message, dispatch]);

// //   const [startDate, setStartDate] = useState('');
// //   const [endDate, setEndDate] = useState('');
// //   const [sales, setSales] = useState([]);

// //   const handleSubmit = async (event) => {
// //     event.preventDefault();

// //     try {
// //       const response = await axios.get(`/api/products/${props.productId}/sales`, {
// //         params: {
// //           startDate: startDate,
// //           endDate: endDate
// //         }
// //       });
// //       setSales(response.data);
// //     } catch (err) {
// //       console.log(err);
// //     }
// //   }

//   return (
//     <>
//     {isLoading && <SpinnerImg />}
//     {product && (
//     <div>
//       {/* <h1>{props.productName}</h1>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Start Date:
//           <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
//         </label>
//         <label>
//           End Date:
//           <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
//         </label>
//         <button type="submit">Get Sales Data</button>
//       </form> */}
//       <ul>
//         {sales.map((sale, index) => (
//           <li key={index}>
//             <p>Date: {sale.date}</p>
//             <p>Quantity Sold: {sale.quantitySold}</p>
//             <p>Profit: {sale.profit}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//     )}
//     </>
//   );
// }

// export default productSale;
// import React, { useEffect } from 'react'
// import useRedirectLoggedOutUser from '../customHook/useRedirectLoggedOutUser';
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import { getProduct } from '../redux/features/product/productSlice';
// import { SpinnerImg } from '../components/loader/Loader';

// const productSale = () => {
    
//     useRedirectLoggedOutUser("/login");
//   const dispatch = useDispatch();

//   const { id } = useParams();

//   const isLoggedIn = useSelector(selectIsLoggedIn);
//   const { product, isLoading, isError, message } = useSelector(
//     (state) => state.product
//   );

//   useEffect(() => {
//     if (isLoggedIn === true) {
//       dispatch(getProduct(id));
//     }

//     if (isError) {
//       console.log(message);
//     }
//   }, [isLoggedIn, isError, message, dispatch]);
//   return (
//     <div>
//           {isLoading && <SpinnerImg />}
//       {product && (
//     <div>
//       {/* <h1>{props.productName}</h1>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Start Date:
//           <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
//         </label>
//         <label>
//           End Date:
//           <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
//         </label>
//         <button type="submit">Get Sales Data</button>
//       </form> */}
//       <ul>
//         {sales.map((sale, index) => (
//           <li key={index}>
//             <p>Date: {sale.date}</p>
//             <p>Quantity Sold: {sale.quantitySold}</p>
//             <p>Profit: {sale.profit}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//     )}
//     </div>
//   );
// };

// export default productSale;