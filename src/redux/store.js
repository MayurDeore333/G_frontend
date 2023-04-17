import  {configureStore} from "@reduxjs/toolkit"
import authReducer from "../redux/features/auth/authSlice"
import  productReducer from "../redux/features/product/productSlice"
import filterReducer from "../redux/features/product/filterSlice"
 
export const store = configureStore({
    reducer : {
          auth: authReducer,
          product : productReducer,
          filter: filterReducer,
    }
})

// import  {configureStore} from "@reduxjs/toolkit"
// import authReducer from "../redux/features/auth/authSlice"
// import  productReducer from "../redux/features/product/productSlice"
// import filterReducer from "../redux/features/product/filterSlice"
// import { combineReducers,applyMiddleware } from "@reduxjs/toolkit"
// import thunk from "redux-thunk"
// import { rootReducer } from "./rootReducer"
// import { composeWithDevTools } from "redux-devtools-extension"

// const finalReducer = combineReducers({
//      rootReducer,
//   });

//   const intialState = {
//     rootReducer : {
//         cartItems: localStorage.getItem("cartItems")
//         ? JSON.parse(localStorage.getItem("cartItems"))
//         :[],
//     },
// };
// const middleware = [thunk]
 
// export const store = configureStore({
//     reducer : {
//           auth: authReducer,
//           product : productReducer,
//           filter: filterReducer,
//     },
// }, finalReducer,
// intialState,
// composeWithDevTools(applyMiddleware(...middleware)))

// import { configureStore, combineReducers, applyMiddleware } from "@reduxjs/toolkit";
// import authReducer from "../redux/features/auth/authSlice";
// import productReducer from "../redux/features/product/productSlice";
// import filterReducer from "../redux/features/product/filterSlice";
// import thunk from "redux-thunk";
// import { rootReducer } from "./rootReducer";
// import { composeWithDevTools } from "redux-devtools-extension";

// const initialState = {
//   rootReducer: {
//     // cartItems: localStorage.getItem("cartItems")
//     cartItems: JSON.parse(localStorage.getItem("cartItems"))
//     //   : [],
//   },
// };

// const middleware = [thunk];

// const store = configureStore({
//   reducer: combineReducers({
//     auth: authReducer,
//     product: productReducer,
//     filter: filterReducer,
//     rootReducer,
//   }),
//   middleware,
//   devTools: composeWithDevTools(),
//   preloadedState: initialState,
// });

// export default store;



// import { configureStore, combineReducers, applyMiddleware } from "@reduxjs/toolkit";
// import thunk from "redux-thunk";
// import { composeWithDevTools } from "redux-devtools-extension";
// import authReducer from "../redux/features/auth/authSlice";
// import productReducer from "../redux/features/product/productSlice";
// import filterReducer from "../redux/features/product/filterSlice";

// const rootReducer = combineReducers({
//   auth: authReducer,
//   product: productReducer,
//   filter: filterReducer,
// });

// const initialState = {
//   rootReducer: {
//     cartItems: localStorage.getItem("cartItems")
//       ? JSON.parse(localStorage.getItem("cartItems"))
//       : [],
//   },
// };

// const middleware = [thunk];

// export const store = configureStore({
//   reducer: rootReducer,
//   middleware,
//   devTools: composeWithDevTools(),
//   preloadedState: initialState,
// });

// export default store;

// import { combineReducers,applyMiddleware } from "@reduxjs/toolkit"
// import thunk from "redux-thunk"
// import { rootReducer } from "./rootReducer"
// import { composeWithDevTools } from "redux-devtools-extension"

// const finalReducer = combineReducers({
//      rootReducer,
//   });

//   const intialState = {
//     rootReducer : {
//         cartItems: localStorage.getItem("cartItems")
//         ? JSON.parse(localStorage.getItem("cartItems"))
//         :[],
//     },
// };
// const middleware = [thunk]
 
// const store = configureStore({
//     reducer : {
//           auth: authReducer,
//           product : productReducer,
//           filter: filterReducer,
//         //   finalReducer,
//         //   intialState,
//         //  composeWithDevTools(applyMiddleware(...middleware))
//     },
//     finalReducer,
//           intialState,
//          composeWithDevTools(applyMiddleware(...middleware))
   
//     //  intialState, 
//     //  composeWithDevTools(applyMiddleware(...middleware))
// })

// import  {configureStore} from "@reduxjs/toolkit"
// import authReducer from "../redux/features/auth/authSlice"
// import  productReducer from "../redux/features/product/productSlice"
// import filterReducer from "../redux/features/product/filterSlice"
// import { createStore, combineReducers, applyMiddleware} from "redux";
// import { createStore,combineReducers,applyMiddleware } from "@reduxjs/toolkit"
// import thunk from "redux-thunk";
// import { composeWithDevTools } from "@reduxjs/toolkit/dist/devtoolsExtension";
// import { rootReducer } from "./rootReducer";


// const finalReducer = combineReducers({
//     rootReducer,
// });

// const intialState = {
//     rootReducer : {
//         cartItems: localStorage.getItem("cartItems")
//         ? JSON.parse(localStorage.getItem("cartItems"))
//         :[],
//     },
// };
// const middleWare = [thunk]



 
// export const store = (configureStore({
//     reducer : {
//           auth: authReducer,
//           product : productReducer,
//           filter: filterReducer,
//     }
// }), 
// createStore(
//     rootReducer, intialState, composeWithDevTools(applyMiddleware(...middleWare))))





// import

// { composewithDevTools from "redus-deptools-extension": import f root Reducer from /rootReducer;

// Project Setup

// const fanalleducer - combineReducers

// root Reducer,

// 3:17

// myles

// Extensions

// 19:47

// M

// 13

// 16

// 15

// const intialState - [

// rootReducers i

// cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems"))

// : 0.

// Appras

// Aupa

// M

// Node Server

// 17

// 24:00

// const middleware = [thank];

// 21

// Mongodb Connection

// 22

// const store = createStore(

// rostReducer,

// composewithdevtools applyMiddleware...middleware))


 