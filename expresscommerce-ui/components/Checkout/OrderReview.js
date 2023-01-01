import React,{ useState, useEffect } from 'react';
import { useRouter } from "next/router";

// import OrderSummary from "./OrderSummary";
import { useAppContext } from "../util/contextState";
// import { getCartPage } from "../../pages/api/cartPage";
// import { getReviewSummary, postPlaceOrder } from "../../pages/api/checkout";
import Link from 'next/link';

export default function OrderReview() {
    const context = useAppContext();
    const userId = context.user.email;
    // const [pageData, setPageData] = useState([]);
    // const [addressData, setAddressData] = useState([]);
    // const [isChecked, setChecked] = useState(false);
    // const [orderDetails, setOrderDetails] = useState([]);
    const router = useRouter();
    const {oid} = router.query
    context.updateCart({entries: 0})

    // useEffect(() => {
    // const apiCalls = async () => {
    //     if(userId!=undefined){
    //         // const response = await getCartPage(userId);
    //         // setPageData(response.data);        
    //         // getAllAddress(userId, response.data.purchaseOrderNumber)
    //     }else{
    //       // router.push('/signin')
    //     }
    // };
    // apiCalls();
    // },[userId]);

    // const getAllAddress = async (sUserId, sCartId) => {
    //     if(sUserId!=undefined && sCartId !=undefined){
    //         const response = await getReviewSummary(sUserId, sCartId);
    //         setAddressData(response.data);
    //     }
    // }
    // const cartId  = pageData.purchaseOrderNumber;
  
    // const deliveryAddress  = addressData.DeliveryAddress;
    // const paymentAddress   = addressData.PaymentAddress;
    
    // const onProcessOrder = async () =>{
    //   if(isChecked){
    //     const response = await postPlaceOrder(userId);
    //     if (response.status == 200) {
    //       context.updateCart({entries: 0})
    //       setOrderDetails(response.data.orderDetails);
    //     }
    //   }
    //   else
    //     alert('Please Select Term Checkbox !')
    // }

    return (
        <div>
      <div className="container max-w-7xl pt-12 mx-auto px-4 sm:px-6 lg:px-8"> 
        {oid !=undefined &&
          <div className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-8 py-8 shadow-md mb-16" role="alert">
            <div className="flex justify-center">
              <div className="py-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="fill-current h-6 w-6 text-green-500 mr-4">
                  <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="font-bold">Thank You For Your Order!</p>
                <p className="text-sm py-2">Your order number is <span className='font-semibold'> #{oid} </span></p>
              </div>
            </div>
            <div className=' mt-8 flex justify-center'>
              <Link  href="/">
                <a className="btn-default rounded-full float-right w-48 flex justify-center text-white">Shop Again </a>
              </Link>
            </div>
          </div>}
      
        <div className="flex flex-col w-full px-0 mx-auto md:flex-row hidden">
          <div className="flex flex-col md:w-full  mb-12 lg:w-1/2">
          <h2 className="text-lg font-bold text-gray-900">Final Review Summary</h2>
            <div className="mt-4 bg-white shadow-sm">
              <div className="flex justify-center border border-gray-200 rounded-lg  md:justify-start xl:flex-row flex-col md:space-x-6 lg:p-6 xl:space-x-0 space-y-4  md:space-y-0 md:flex-row  items-center md:items-start ">
                {/* <div className="flex justify-center md:justify-start  items-center md:items-start flex-col lg:w-6/12 space-y-4">
                    <p className="text-base font-semibold leading-4 text-center md:text-left text-gray-800">Shipping Address</p>
                    {deliveryAddress!=undefined && 
                    <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                      {deliveryAddress.firstname} {deliveryAddress.lastname},
                      <br />
                      {deliveryAddress.building} {deliveryAddress.streetno},
                      <br />
                      {deliveryAddress.streetname} {deliveryAddress.appartment},
                      <br />
                      {deliveryAddress.city} 
                      <br />
                    </p>}
                </div> */}
                <div className="flex justify-center md:justify-start  items-center md:items-start flex-col space-y-4 ">
                    {/* <p className="text-base font-semibold leading-4 c md:text-left text-gray-800">Billing Address</p>
                    {paymentAddress!=undefined &&
                    <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                      {paymentAddress.firstname} {paymentAddress.lastname},
                      <br />
                      {paymentAddress.building} {paymentAddress.streetno},
                      <br />
                      {paymentAddress.streetname} {paymentAddress.appartment},
                      <br />
                      {paymentAddress.city} 
                      <br />
                    </p>} */}
                </div>
              </div>
              
              {/* {orderDetails.length == 0 && <div> 
                <div className="flex items-center justify-between my-6">
                  <div className="flex items-center">
                    <input id="saveaddress" onChange={()=>setChecked(!isChecked)} type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"></input>
                    <label htmlFor="saveaddress" className="ml-2 block text-sm text-gray-900" >
                      I am confirming that I have read and agreed with the <a href='#' className=" hover:bg-blue-500 text-blue font-bold ">Terms & Conditions</a>
                    </label>
                  </div>
                </div>             
                <button onClick={onProcessOrder} type="button" className="w-full btn-default rounded-full justify-center text-white">
                  Process Order
                </button>
                </div>} */}
            </div>
          </div>
          {/* <div className="flex flex-col w-full ml-0 lg:ml-12 lg:w-1/2">
            <OrderSummary orderSummaryData={pageData} displayCheckout={false}  />
          </div> */}
        </div>
      </div>
    </div>
    )
}
