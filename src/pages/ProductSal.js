
import React, { useEffect, useRef, useState } from 'react';
import { selectIsLoggedIn } from '../redux/features/auth/authSlice';
import useRedirectLoggedOutUser from '../customHook/useRedirectLoggedOutUser';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SpinnerImg } from '../components/loader/Loader';
import { getProduct } from '../redux/features/product/productSlice';
import { CmptToPrint } from '../components/CmptToPrint';
import { useReactToPrint } from 'react-to-print';

const ProductSal = () => {
  useRedirectLoggedOutUser('/login');
  const dispatch = useDispatch();
  const { id } = useParams();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { product, isLoading, isError, message } = useSelector(
    (state) => state.product
  );

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getProduct(id));
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch, id]);

  const filteredSales = product?.sales?.filter((sale) => {
    if (!startDate && !endDate) return true;

    const saleDate = new Date(sale.date);
    if (startDate && !endDate) {
      return saleDate >= startDate;
    } else if (!startDate && endDate) {
      return saleDate <= endDate;
    } else {
      return saleDate >= startDate && saleDate <= endDate;
    }
  });
  const [totalProfit, setTotalProfit] = useState(0);
  const [totalQuantitySold, setTotalQuantitySold] = useState(0);

  useEffect(() => {
    // Calculate the total profit and quantity sold for the filtered sales
    const filteredSalesProfit = filteredSales.reduce((total, sale) => total + sale.profit, 0);
    const filteredSalesQuantitySold = filteredSales.reduce((total, sale) => total + sale.quantitySold, 0);

    setTotalProfit(filteredSalesProfit);
    setTotalQuantitySold(filteredSalesQuantitySold);
  }, [filteredSales]);
  const componentRef = useRef();
  const handleReactToPrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const handlePrint = () => {
    handleReactToPrint();
  }

  return (
    <>
    
      {isLoading && <SpinnerImg />}
      {product && (
         
        <div>
          <div style={{display: "none"}}> 
         <CmptToPrint filteredSales={filteredSales} totalQuantitySold={totalQuantitySold} totalProfit={totalProfit} ref={componentRef}/>
         </div>
          <div className="container border text-center mt-3 mb-3 fw-bold" style={{ fontSize: "20px" }}>
            <label htmlFor="start-date">Start Date: </label>
            <input
              type="date"
              id="start-date"
              onChange={(e) => setStartDate(new Date(e.target.value))}
            />
     
            <label htmlFor="end-date" className='ml-6'>End Date: </label>
            <input
              type="date"
              id="end-date"
              onChange={(e) => setEndDate(new Date(e.target.value))}
            />
          </div>
          
          
          {product.sales?.length > 0 ? (
            <>
              {filteredSales?.length > 0 ? (
                <div>
                  <table className=" table table-bordered">
                    <thead className="table-dark">
                      <tr>
                        <th>Date</th>
                        <th>Quantity Sold</th>
                        <th>Total Sales</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredSales.map((sale, index) => (
                        <tr key={index}>
                          <td>{sale.date}</td>
                          <td>{sale.quantitySold}</td>
                          <td>{"₹"}{sale.profit}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className='ml-20 container fw-bold'>
                    <p>Total Quantity Sold: {totalQuantitySold}</p>
                    <p>Total Sales: {"₹"}{totalProfit}</p>
                  </div>
                  { totalProfit !== 0 ? <div>
                  <button className='  mt-3 ml-20 pr-20 pl-20  btn btn-primary' onClick={handlePrint}>
                   Print
                  </button>

                </div> : 'Please add a product to the cart'

                }
                </div>
                
              ) : (
                <p>No sales found for the selected date range.</p>
              )}
            </>
          ) : (
            <p>No sales data available for this product.</p>
          )}
          
        </div>
        
      )}
    </>
  );
  
};

export default ProductSal;


