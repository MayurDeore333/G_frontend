import React, { useCallback, useEffect, useMemo, useState } from "react";
import { SpinnerImg } from "../../loader/Loader";
// import "./productList.scss";
  import { FaEdit, FaTrashAlt } from "react-icons/fa";
  import { AiOutlineEye } from "react-icons/ai";
import Search from "../../search/Search";
  import { useDispatch, useSelector } from "react-redux";
// import { FILTER_PRODUCTS, selectFilteredPoducts } from "../../../redux/features/product/filterSlice";
  import ReactPaginate from "react-paginate";
  import { confirmAlert } from "react-confirm-alert";
  import "react-confirm-alert/src/react-confirm-alert.css";
import { deleteProduct, getProducts } from "../../../redux/features/product/productSlice";
import { Link } from "react-router-dom";
import { defaultSearchStyle, defaultTdActionStyle, defaultTdContent, defaultTdContentTitleStyle, defaultTdStyle, defaultTdWrapperStyle } from "../../constants/defaultStyles";
import ProductIcon from "../../Icons/ProductIcon";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";

const itemsPerPage = 10;
const emptySearchForm = {
  name: "",
  category: "",
};
const ProductList = ({ products, isLoading, showAdvanceSearch = true }) => {
//    const [search, setSearch] = useState("");
//  const filteredProducts = useSelector(selectFilteredPoducts);

   const dispatch = useDispatch();

  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };
  const lowstockStatus = (lowstock,quantity) => {
    if ( quantity == lowstock  ) {
      return <span className=" bg-danger text-white ml-1 p-2 mb-2"><b>lowstock  </b></span>;
    }
    return null;
   
  };

  const delProduct = async (id) => {
    console.log(id);
    await dispatch(deleteProduct(id));
    await dispatch(getProducts());
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete an Item",
      message: "Are you sure you want to delete this item.",
      buttons: [
        {
          label: "Delete",
          onClick: () => delProduct(id),
        },
        {
          label: "Cancel",
          onClick: () => alert('Click No')
        },
      ],
    });
  };

    // Begin Pagination
  const [currentItems, setCurrentItems] = useState([]);
  const [searchForm, setSearchForm] = useState(emptySearchForm);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  // const itemsPerPage = 5;

  const items = useMemo(() => {
    let filterData = products.length > 0 ? [...products].reverse() : [];
    if (searchForm.name?.trim()) {
      filterData = filterData.filter((product) =>
        product.name.includes(searchForm.name)
      );
    }

    if (searchForm.category?.trim()) {
      filterData = filterData.filter((product) =>
        product.category.includes(searchForm.category)
      );
    }

    return filterData;
  }, [products, searchForm]);

  // useEffect(() => {
  //   const endOffset = itemOffset + itemsPerPage;

  //   setCurrentItems(filteredProducts.slice(itemOffset, endOffset));
  //   setPageCount(Math.ceil(filteredProducts.length / itemsPerPage));
  // }, [itemOffset, itemsPerPage, filteredProducts]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };
  
  const handlerSearchValue = useCallback((event, keyName) => {
    const value = event.target.value;

    setSearchForm((prev) => {
      return { ...prev, [keyName]: value };
    });

    setItemOffset(0);
  }, []);


    // End Pagination
    useEffect(() => {
      // Fetch items from another resources.
      const endOffset = itemOffset + itemsPerPage;
      setCurrentItems(items.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(items.length / itemsPerPage));
    }, [items, itemOffset]);
  
  // useEffect(() => {
  //   dispatch(FILTER_PRODUCTS({ products, search }));
  // }, [products, search, dispatch]);

  return (
    // <div className="product-list">
    //   <hr />
    //   <div className="table">
        <>
            
          {/* <span>
            <Search
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </span>
        

        {isLoading && <SpinnerImg />} */}
  {showAdvanceSearch === true && (
        <div className="bg-white rounded-xl px-3 py-3 mb-3">
          <div className="font-title mb-2">Advanced Search</div>
          <div className="flex w-full flex-col sm:flex-row">
          <div className="mb-2 sm:mb-0 sm:text-left text-default-color flex flex-row font-title flex-1 px-2">
              <div className="h-12 w-12 rounded-2xl bg-gray-100 mr-2 flex justify-center items-center text-gray-400">
                <ProductIcon />
              </div>
              <input
                autoComplete="nope"
                value={searchForm.name}
                placeholder="Product Name"
                className={defaultSearchStyle}
                onChange={(e) => handlerSearchValue(e, "name")}
              />
            </div>
            <div className="mb-2 sm:mb-0 sm:text-left text-default-color flex flex-row  font-title flex-1 px-2">
              <div className="h-12 w-12 rounded-2xl bg-gray-100 mr-2 flex justify-center items-center text-gray-400">
                <ProductIcon />
              </div>
              <input
                autoComplete="nope"
                value={searchForm.category}
                placeholder="Product Category"
                className={defaultSearchStyle}
                onChange={(e) => handlerSearchValue(e, "category")}
              />
            </div>
            
          </div>
        </div>
      )}
         
          
           
            <div className="sm:bg-white rounded-xl sm:px-3 sm:py-3">
            <div className="hidden sm:flex  sm:visible w-full flex-col sm:flex-row">
              <div className="sm:text-left text-default-color font-title flex-1">
               Sl.No/IMG
              </div>
              <div className="sm:text-left ml-3 text-default-color font-title flex-1">
              Item Name
              </div>
              <div className="sm:text-left text-default-color font-title flex-1">
              Category
              </div>
              <div className="sm:text-left text-default-color font-title flex-1">
              Sales Price
              </div>
              <div className="sm:text-left text-default-color font-title flex-1">
              Purchase Price
              </div>
              <div className="sm:text-left text-default-color font-title flex-1">
              Stock Qty
              </div>
              <div className="sm:text-left text-default-color font-title flex-1">
              Stock Value
              </div>
              <div className="sm:text-left text-default-color font-title sm:w-14">
              Action
              </div>
    
            </div>
    
           <div>
              
                {currentItems.map((product,index) => {
                   const { _id, name, category, price, price2, quantity,image,lowstock } = product;
                   const icon =image.filePath;
                
                   
                   return(
                  <div className={defaultTdWrapperStyle} key={product.id}>
                    <div className={defaultTdStyle}>
                      <div className={defaultTdContentTitleStyle}> Sl.No</div>
                      <div className={defaultTdContent}>
                       
                        <span className="whitespace-nowrap text-ellipsis overflow-hidden pl-1">
                          {index + 1}{"."}
                        </span>
                        {icon ? (
                          <img
                            className="object-cover h-10 w-10 ml-2 rounded-2xl"
                            src={icon}
                            alt={name}
                          />
                        ) : (
                          <span className="h-10 w-10 rounded-2xl bg-gray-100 flex justify-center items-center">
                            <ProductIcon />
                          </span>
                        )}
                        
                      </div>
                    </div>
    
                    <div className={defaultTdStyle}>
                      <div className={defaultTdContentTitleStyle}>Name</div>
                      <div className={defaultTdContent}>
                        <span className="whitespace-nowrap text-ellipsis overflow-hidden">
                        {shortenText(name, 16)} {lowstockStatus(lowstock, quantity)}
                          {/* {name} */}
                        </span>
                      </div>
                    </div>
    
                    <div className={defaultTdStyle}>
                      <div className={defaultTdContentTitleStyle}>Category</div>
                      <div className={defaultTdContent}>
                        <span className="whitespace-nowrap text-ellipsis overflow-hidden">
                        {category}
                        </span>
                      </div>
                    </div>
    
                    <div className={defaultTdStyle}>
                      <div className={defaultTdContentTitleStyle}>Sales Price</div>
                      <div className={defaultTdContent}>
                        <span className="whitespace-nowrap text-ellipsis overflow-hidden">
                        {"₹"}{price}
                        </span>
                      </div>
                    </div>
    
                    <div className={defaultTdStyle}>
                      <div className={defaultTdContentTitleStyle}>Purchase Price</div>
                      <div className={defaultTdContent}>
                        <span className="whitespace-nowrap text-ellipsis overflow-hidden">
                        {"₹"}{price2}
                        </span>
                      </div>
                    </div>
    
                    <div className={defaultTdStyle}>
                      <div className={defaultTdContentTitleStyle}>Stock Qty</div>
                      <div className={defaultTdContent}>
                        <span className="whitespace-nowrap text-ellipsis overflow-hidden">
                        {quantity}
                        </span>
                      </div>
                    </div>
    
                    <div className={defaultTdStyle}>
                      <div className={defaultTdContentTitleStyle}>Stock Value</div>
                      <div className={defaultTdContent}>
                        <span className="whitespace-nowrap text-ellipsis overflow-hidden">
                        {"₹"}{price * quantity}
                        </span>
                      </div>
                    </div>
    
                    <div className={defaultTdActionStyle}>
                      <div className={defaultTdContentTitleStyle}>Action</div>
                      <div className={defaultTdContent}>
                        <Menu
                          menuButton={
                            <MenuButton>
                              <div className="bg-gray-50 px-2 rounded-xl">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-6 w-6 text-blue-400"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth={2}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                                  />
                                </svg>
                              </div>
                            </MenuButton>
                          }
                          transition
                        >
                          <MenuItem >
                          <Link to={`/product-detail/${_id}`}>
                              <small>Details,</small>
                            </Link>
                            <Link to={`/edit-product/${_id}`}>
                          <small>Edit,</small>
                            </Link>
                            <Link to={`/addSale-form/${_id}`}>
                          <small>+Sale,</small>
                            </Link>
                            <Link to={`/product-Sale/${_id}`}>
                          <small>Sales,</small> 
                            </Link>
                            <MenuItem onClick={() => confirmDelete(_id)}>
                          <small>Delete</small> 
                          </MenuItem>


                          </MenuItem>
                          {/* <MenuItem>
                          <Link to={`/edit-product/${_id}`}>
                          <small>Edit</small>
                            </Link>
                          </MenuItem>
                          <MenuItem>
                          <Link to={`/addSale-form/${_id}`}>
                          <small>Add Sale</small>
                            </Link>
                          </MenuItem>
                          <MenuItem>
                          <Link to={`/product-Sale/${_id}`}>
                          <small>Item Sales</small> 
                            </Link>
                          </MenuItem>
                          <MenuItem onClick={() => confirmDelete(_id)}>
                          <small>Delete</small> 
                          </MenuItem> */}
                        </Menu>
                      </div>
                    </div>
                  </div>
                  );
                        })}
           {/* {products.length <= 0 && !isLoading && <EmptyBar />} */}
          
               {products.length > 0 && (
                <ReactPaginate
                  className="inline-flex items-center -space-x-px mt-2"
                  previousLinkClassName="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  nextLinkClassName="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  pageLinkClassName="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  breakLinkClassName="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  activeLinkClassName="py-2 px-3 text-blue-600 bg-blue-50 border border-gray-300 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                  breakLabel="..."
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={1}
                  pageCount={pageCount}
                  previousLabel="<"
                  nextLabel={">"}
                  renderOnZeroPageCount={null}
                />
              )}
            </div>
           </div>
           
       
      
         
         
      {/* </div>
    </div> */}
    </>
  );
};

export default ProductList;


// import React, { useEffect, useState } from "react";
// import { SpinnerImg } from "../../loader/Loader";
// // import "./productList.scss";
//   import { FaEdit, FaTrashAlt } from "react-icons/fa";
//   import { AiOutlineEye } from "react-icons/ai";
// import Search from "../../search/Search";
//   import { useDispatch, useSelector } from "react-redux";
// import { FILTER_PRODUCTS, selectFilteredPoducts } from "../../../redux/features/product/filterSlice";
//   import ReactPaginate from "react-paginate";
//   import { confirmAlert } from "react-confirm-alert";
//   import "react-confirm-alert/src/react-confirm-alert.css";
// import { deleteProduct, getProducts } from "../../../redux/features/product/productSlice";
// import { Link } from "react-router-dom";

 
// const ProductList = ({ products, isLoading }) => {
//    const [search, setSearch] = useState("");
//  const filteredProducts = useSelector(selectFilteredPoducts);

//    const dispatch = useDispatch();

//   const shortenText = (text, n) => {
//     if (text.length > n) {
//       const shortenedText = text.substring(0, n).concat("...");
//       return shortenedText;
//     }
//     return text;
//   };
//   // const lowstockStatus = (quantity,lowstock) => {
//   //   if ( lowstock >= quantity ) {
//   //     return <span className=" bg-danger text-white ml-1 p-2 mb-2"><b>lowstock  </b></span>;
//   //   }
//   //   return <span> </span>
   
//   // };

//   const delProduct = async (id) => {
//     console.log(id);
//     await dispatch(deleteProduct(id));
//     await dispatch(getProducts());
//   };

//   const confirmDelete = (id) => {
//     confirmAlert({
//       title: "Delete an Item",
//       message: "Are you sure you want to delete this item.",
//       buttons: [
//         {
//           label: "Delete",
//           onClick: () => delProduct(id),
//         },
//         {
//           label: "Cancel",
//           onClick: () => alert('Click No')
//         },
//       ],
//     });
//   };

//     // Begin Pagination
//   const [currentItems, setCurrentItems] = useState([]);
//   const [pageCount, setPageCount] = useState(0);
//   const [itemOffset, setItemOffset] = useState(0);
//   const itemsPerPage = 5;

//   useEffect(() => {
//     const endOffset = itemOffset + itemsPerPage;

//     setCurrentItems(filteredProducts.slice(itemOffset, endOffset));
//     setPageCount(Math.ceil(filteredProducts.length / itemsPerPage));
//   }, [itemOffset, itemsPerPage, filteredProducts]);

//   const handlePageClick = (event) => {
//     const newOffset = (event.selected * itemsPerPage) % filteredProducts.length;
//     setItemOffset(newOffset);
//   };
//     // End Pagination

//   useEffect(() => {
//     dispatch(FILTER_PRODUCTS({ products, search }));
//   }, [products, search, dispatch]);

//   return (
//     <div className="product-list">
//       <hr />
//       <div className="table">
        
            
//           <span>
//             <Search
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//             />
//           </span>
        

//         {isLoading && <SpinnerImg />}

//         <div className="table">
//           {!isLoading && products.length === 0 ? (
//             <p>-- No item found, please add an item...</p>
//           ) : (
//             <table>
//               <thead>
//                 <tr>
//                   <th>Sl. No.</th>
//                   <th>Item Name</th>
//                   <th>Category</th>
//                   <th>Sales Price</th>
//                   <th>Purchase Price</th>
//                   <th>Stock Qty</th>
//                   <th>Stock Value</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {currentItems.map((product, index) => {
//                   const { _id, name, category, price, price2, quantity } = product;
//                   return (
//                     <tr key={_id}>
//                       <td>{index + 1}</td>
//                       <td>{shortenText(name, 16)}</td>
//                       <td>{category}</td>
//                       <td>
//                         {"₹"}
//                         {price}
//                       </td>
//                       <td>
//                         {"₹"}
//                         {price2}
//                       </td>
//                       <td>{quantity}</td>
//                       <td>
//                         {"₹"}
//                         {price * quantity}
//                       </td>
//                       <td className="icons">
//                         <span>
//                           <Link to={`/product-detail/${_id}`}>
//                             <AiOutlineEye size={18} color={"purple"} />
//                           </Link>
//                         </span>
//                         <span>
//                           <Link to={`/edit-product/${_id}`}>
//                             <FaEdit size={18} color={"green"} />
//                           </Link>
//                         </span>
//                         <span>
//                           <FaTrashAlt
//                             size={18} 
//                             color={"red"}
//                             onClick={() => confirmDelete(_id)}
//                           />
//                         </span>
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           )}
//         </div>
//         <ReactPaginate
//           breakLabel="..."
//           nextLabel="Next"
//           onPageChange={handlePageClick}
//           pageRangeDisplayed={3}
//           pageCount={pageCount}
//           previousLabel="Prev"
//           renderOnZeroPageCount={null}
//           containerClassName="pagination"
//           pageLinkClassName="page-num"
//           previousLinkClassName="page-num"
//           nextLinkClassName="page-num"
//           activeLinkClassName="activePage"
//         />
//       </div>
//     </div>
//   );
// };

// export default ProductList;
