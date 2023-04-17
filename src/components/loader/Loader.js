import React from 'react';
import  ReactDOM  from 'react-dom';
const loader = () => {
  return ReactDOM.createPortal (
    <div className="wrapper">
   <div className="spinner-border text-light" style={{width: "3rem", height: "3rem"}} role="status">
  <span className="visually-hidden">Loading...</span>
</div>

</div>,
    document.getElementById("loader")
  )
}

export const SpinnerImg = () => {
    return (
        <div className="--center-all">
            <div className="spinner-border" style={{width: "3rem", height: "3rem"}} role="status">
  <span className="visually-hidden">Loading...</span>
</div>
        </div>
    );
};


export default loader
