import React from "react";

export const CmptToPrint = React.forwardRef((props, ref) => {
    const {filteredSales, totalQuantitySold,totalProfit} = props;
    return (
      <div ref={ref} className="p-5">
          <table className='table'>
                  <thead>
                    <tr>
                      <td>Date</td>
                      <td>Quantity Sold</td>
                      <td>Profit</td>
                    </tr>
                  </thead>
                  <tbody>
                  {filteredSales.map((sale, index) => (
                        <tr key={index}>
                          <td>{sale.date}</td>
                          <td>{sale.quantitySold}</td>
                          <td>{sale.profit}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                <h2 className='px-2'>Total Quantity Sold: {totalQuantitySold}</h2>
                <h2 className='px-2'>Total Profit: {totalProfit}</h2>
      </div>
    );
});