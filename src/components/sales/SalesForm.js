import React from 'react'
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FaTrashAlt } from "react-icons/fa";

const SalesForm = ({sale,notes,setNotes,saveSale, handleInputChange}) => {
  let date = new Date();
   
	// let billNo = date.getFullYear()+""+(date.getMonth()+1)+""+date.getDate()+""+no;
  let billNo = date.getDate()+""+(date.getMonth()+1)+""+date.getFullYear();
  // const billNo = () => {
  //   const date = Date.now();
  //   const number = 1 ;
  //   const billno = date + number;
  //   return billno;
  // };
  return (
    <>
    <div>
      <form onSubmit={saveSale}>
        <div className="studentDetails">
            PARTY DETAILS
            <br/>
            <label>
            <small>
              {" "}
              <b>Student Roll No </b>
            </small>
          </label>{" "}
          <br />
          <div className="form-outline">
            <input
              type="text"
              id="form12"
              className="form-control"
              name="name"
              placeholder="Enter Student Roll No here.."
              value={sale?.roll}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <label>
            
              <b>Bill No </b>
            
          </label>
          <br />
        <input type="text" readonly className="form-control-plaintext" value={billNo}/>
     
        <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Sl. No.</th>
                  <th>Items</th>
                  <th>Quantity</th>
                  <th>Rate</th>
                  <th>Amount</th>
                  <th>{"      "}</th>
                </tr>
              </thead>

              <tbody>
                {/* {currentItems.map((index) => {
                  const {                           } = product;
                  return ( */}
                    <tr>
                      <td>        </td>
                      <td>         </td>
                      <td>          </td>
                      <td>
                        {"₹"}
                        
                      </td>
                      <td>
                        {"₹"}
                        
                      </td>
                      <td className="icons">
                        <span>
                          <FaTrashAlt
                            size={20}
                            color={"red"}
                            // onClick={() => confirmDelete(_id)}
                          />
                        </span>
                      </td>
                    </tr>
                  {/* );
                })} */}
              </tbody>
            </table>
      </form>
    </div>
    </>
  )
}

export default SalesForm
