// import React, { useState } from 'react';
// // import axios from 'axios';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate, useParams } from 'react-router-dom';
// import { addSale, getProduct, selectIsLoading } from '../redux/features/product/productSlice';
// import { useEffect } from 'react';
// // import loader from '../components/loader/Loader';

// const AddSaleForm = () => {
//   const [formData, setFormData] = useState({
//     date: '',
//     quantitySold: '',
//     profit: ''
//   });

//   const { id } = useParams();

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const isLoading = useSelector(selectIsLoading);
//   useEffect(() => {
//     dispatch(getProduct(id));
//   }, [dispatch, id]);

//   const { date, quantitySold, profit } = formData;

//   const onChange = e =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const onSubmit = async e => {
//     e.preventDefault();

//     // const newSale = {
//     //   date,
//     //   quantitySold,
//     //   profit
//     // };
//  console.log(...formData);
//  await dispatch(addSale({ id, formData }));
//  navigate("/dashboard");
//     // try {
//     //   await axios.patch(`/products/${id}/sales`, newSale);
//     //   // Redirect to the product detail page
//     // //   window.location.href = `/products/${productId}`;
//     // } catch (err) {
//     //   console.error(err);
//     // }
//   };

//   return (
//     <>
//     {isLoading && <p>Loading....</p>}
//     <form onSubmit={onSubmit}>
//       <div>
//         <label>Date</label>
//         <input
//           type="number"
//           name="date"
//           value={date}
//           onChange={onChange}
//           required
//         />
//       </div>
//       <div>
//         <label>Quantity Sold</label>
//         <input
//           type="number"
//           name="quantitySold"
//           value={quantitySold}
//           onChange={onChange}
//           required
//         />
//       </div>
//       <div>
//         <label>Profit</label>
//         <input
//           type="number"
//           name="profit"
//           value={profit}
//           onChange={onChange}
//           required
//         />
//       </div>
     
//       <button type="submit">Add Sale</button>
//     </form>
//     </>
//   );
// };

// export default AddSaleForm;

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addSale, getProduct, selectIsLoading } from '../redux/features/product/productSlice';
import { useEffect } from 'react';

const AddSaleForm = () => {
  const [formData, setFormData] = useState({
    date: '',
    quantitySold: '',
    profit: ''
  });
  const isLoading = useSelector(selectIsLoading);
  const { id } = useParams();
 
  const dispatch = useDispatch();
 const navigate = useNavigate();
 useEffect(() => {
      dispatch(getProduct(id));
    }, [dispatch, id]);
  const { date, quantitySold, profit } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();

    const newSale = {
      date,
      quantitySold,
      profit
    };
console.log(id,newSale);
    await dispatch(addSale({id,newSale }));
    navigate("/items");
    // try {
    //   await axios.post(`/products/${id}/sales`, newSale);
    //   navigate("/dashboard");
    //   // Redirect to the product detail page
    //   // window.location.href = `/products/${productId}`;
    // } catch (err) {
    //   console.error(err);
    // }
  };

  return (
    <>
     {isLoading && <p>Loading..</p>}
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
    </>
  );
};

export default AddSaleForm;