import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { RiImageAddLine } from "react-icons/ri";
import Card from "../../card/Card";

// import { AnimatePresence, motion } from "framer-motion";

const ProductForm = ({
  product,
  productImage,
  imagePreview,
  description,
  setDescription,
  handleInputChange,
  handleImageChange,
  saveProduct,
}) => {
  return (
    <>
       <section className="vh-100 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div
                className="card bg-dark text-white"
                style={{ borderradius: "1rem" }}
              >
                <div className="card-body p-5 text-center">
                  <div className="mb-md-5 mt-md-4 pb-5">
                   
                    <h2 className="fw-bold mb-2 text-uppercase">Add Product</h2>
                    <form onSubmit={saveProduct}>
          <div className="container border " style={{ height: "225px" }}>
          {/* <label>
            <small>
              {" "}
              <b>Item Image</b>{" "}
            </small>
          </label> */}
          <div>
                    <p className="mt-3 mb-0 text-white-50 fw-bold">
                    <small>(Item image) Supported Formats: jpg, jpeg, png</small>
                    </p>
                  </div>
          {/* <p
            className="container mt-0 border rounded"
            style={{ color: "dark", backgroundColor: "#F5F5F5" }}
          >
            <small>Supported Formats: jpg, jpeg, png</small>
          </p> */}
          <div className="container">
            <input
              type="file"
              name="image"
              onChange={(e) => handleImageChange(e)}
            />
          </div>
          {imagePreview != null ? (
            <div className="image-preview">
              <img
                style={{margin: "0 auto 16px", borderradius : "50%", background: "linear-gradient(-45deg, #c157a1, #c7a1ff)", padding: "2px",
                width: "120px",
                height: "120px", objectfit: "cover" , border: "4px solid #161616"}}
                src={imagePreview}
                alt="product"
              />
            </div>
          ) : (
            // <p className="container">No image set this poduct.</p>
            <span></span>
          )}
         </div>

         <div className="container">
          {/* <label>
            <small>
              {" "}
              <b>Item Name </b>
            </small>
          </label>{" "} */}
          <br />
          <div className="form-outline">
            <input
              type="text"
              id="form12"
              className="form-control"
              name="name"
              placeholder="Enter Item name here.."
              value={product?.name}
              onChange={handleInputChange}
            />
          </div>
          {/* <label>
            <small>
              {" "}
              <b>Item Category</b>
            </small>
          </label>{" "} */}
          <br />
          <div className="form-outline">
            <input
              type="text"
              id="form12"
              className="form-control"
              name="category"
              placeholder="Enter category of the item.."
              value={product?.category}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-row">
            <div className="form-group ml-3 col-md-5">
              {/* <label>
                <small>
                  {" "}
                  <b>Sale Price</b>
                </small>
              </label>{" "} */}
              <br />
              <input
                type="text"
                className="form-control"
                placeholder="₹ Enter Price"
                name="price"
                value={product?.price}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group ml-3 col-md-5">
              {/* <label>
                <small>
                  {" "}
                  <b>Purchase Price</b>
                </small>
              </label>{" "} */}
              <br />
              <input
                type="text"
                className="form-control"
                placeholder="₹ Enter Price"
                name="price2"
                value={product?.price2}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group ml-3 col-md-5">
              {/* <label>
                <small>
                  {" "}
                  <b>Opening Stock</b>
                </small>
              </label>{" "} */}
              <br />
              <div className="form-outline">
                <input
                  type="number"
                  id="typeNumber"
                  className="form-control"
                  name="quantity"
                  placeholder="Enter count"
                  value={product?.quantity}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="form-group ml-3 col-md-5">
              {/* <label>
                <small>
                  {" "}
                  <b>Low Stock</b>
                </small>
              </label>{" "} */}
              <br />
              <div className="form-outline">
                <input
                  type="number"
                  id="typeNumber"
                  className="form-control"
                  name="lowstock"
                  placeholder="Enter Low stock count"
                  value={product?.lowstock}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          {/* <label>
            <small>
              {" "}
              <b>Item Description</b>
            </small>
          </label>{" "} */}
          <br />
          <div   >
            <ReactQuill
              theme="snow"
              value={description}
              onChange={setDescription}
              modules={ProductForm.modules}
              formats={ProductForm.formats}
            />
          </div>
          </div>
          <div className="  mt-3 mb-2">
          <button
            type="submit"
            className="btn btn-primary"
            
          >
            ADD Item
          </button>
           </div>
           </form>
                  </div>

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

ProductForm.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["clean"],
  ],
};
ProductForm.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "color",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "video",
  "image",
  "code-block",
  "align",
];

export default ProductForm;
