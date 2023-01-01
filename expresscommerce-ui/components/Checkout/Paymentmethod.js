import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import OrderSummary from "./OrderSummary";
import { useAppContext } from "../util/contextState";
import { getCartPage } from "../../pages/api/cartPage";
import { getPaymentDetails, postPayment  } from "../../pages/api/checkout";

function Paymentmethod() {
  const context = useAppContext();
  const userId = context.user.email;
  const [pageData, setPageData] = useState([]);
  const [paymentData, setPaymentData] = useState([]);
  const [isChecked, setChecked] = useState(false);
  const [paymentCard, setpaymentCard] = useState(false);
  const [orderId, setOrderDetails] = useState();

  const router = useRouter();

  useEffect(() => {
    const apiCalls = async () => {
      if(userId!=undefined){
        const response = await getCartPage(userId);
        setPageData(response.data);        
        getPaymentData(userId, response.data.purchaseOrderNumber);
      }
    };
    apiCalls();
  },[userId]);

  const getPaymentData = async (sUserId, sCartId) => {
    if(sUserId!=undefined && sCartId !=undefined){
      const response = await getPaymentDetails(sUserId, sCartId);
      setPaymentData(response.data);
    }
  }

  const cartId       = pageData.purchaseOrderNumber;
  // const totalPrice   = pageData.totalPrice.$numberDecimal;
  // const deliveryCost = pageData.deliveryCost.$numberDecimal;
  const totalAmount  = 200;

  const handleSubmit = async (event) => {
    event.preventDefault();
    let formData = {};
    if(event.target.card.value == 'CASH'){
      formData = {
        termsCheck: 'Agreed',
        paymentMode: 'CASH',
        paymentDetails: {}
      }
      
      const response = await postPayment( userId, formData );
  
      if (response.status == 200) {
        // router.push({
        //     pathname: '/checkout/summary',
        //     query: { oid: response.data.orderDetails.purchaseOrderNumber },
        // })
        context.updateCart({entries: 0})
        // let resp =  response.data.orderDetails.id ;
        setOrderDetails( response.data.orderDetails.id );
      }
    }
  }

  const makePayment = async () => {
    const res = await initializeRazorpay();
  
    let formData = {};
    const totalPrice   = pageData.totalPrice.$numberDecimal;
    const deliveryCost = pageData.deliveryCost.$numberDecimal;
    const cartEmail    = paymentData.DeliveryAddress.email;
    const cartPhone    = paymentData.DeliveryAddress.phone1;
    const cartTotal = (parseFloat(totalPrice) + parseFloat(deliveryCost)).toFixed(2);;

    if (!res) {
      alert("Failed to load");
      return;
    }
    const payLoad = JSON.stringify({ amount: cartTotal })
  
    // Make API call to the serverless API
    const data = await fetch("/api/razorpay", { method: "POST", body: payLoad }).then((t) =>
      t.json()
    );
    
    var options = {
      key: process.env.RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
      name: "Xpress Commerce",
      currency: 'INR',
      amount: cartTotal,
      order_id: data.id,
      description: "Cart Payment",
      image: "",
      handler: function (response) {
        // console.log(response)
        let formData = {
          termsCheck: 'Agreed',
          paymentMode: 'RAZORPAY',
          paymentDetails: {
            razorpayPaymentID: response.razorpay_payment_id,
            razorpayOrderId : response.razorpay_order_id,
            razorpaySignature : response.razorpay_signature,
            isCanceledByUser: false,
          }
        }
        handleRazorPaySubmit(formData);
      },
      prefill: {
        name: "",
        email: cartEmail,
        contact: cartPhone
      },
    };
  
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }
  
  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      // document.body.appendChild(script);
  
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
  
      document.body.appendChild(script);
    });
  };
  
  const handleRazorPaySubmit = async (formData) => {
    const response = await postPayment( userId, formData );
    if (response.status == 200) {
      context.updateCart({entries: 0})
      // let resp =  response.data.orderDetails.id ;
      setOrderDetails( response.data.orderDetails.id );
      // router.push({
      //     pathname: '/checkout/summary',
      //     query: { oid: response.data.orderDetails.purchaseOrderNumber },
      // })
      // console.log(response)
    }
  }

  return (
    <div>
      <div className="container max-w-7xl pt-12 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col w-full px-0 mx-auto md:flex-row">
        {orderId != undefined &&
          <div className="flex flex-col md:w-full  mb-12">
          <div className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-8 py-8 shadow-md mb-16" role="alert">
            <div className="flex justify-center">
              <div className="py-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="fill-current h-6 w-6 text-green-500 mr-4">
                  <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="font-bold">Thank You For Your Order!</p>
                <p className="text-sm py-2">Your order number is <span className='font-semibold'> #{orderId} </span></p>
              </div>
            </div>
            <div className=' mt-8 flex justify-center'>
              <Link  href="/">
                <a className="btn-default rounded-full float-right w-48 flex justify-center text-white">Shop Again </a>
              </Link>
            </div>
          </div>
          </div>}
        {orderId  == undefined &&
          <div className="flex flex-col md:w-full  mb-12">
            <div className="border border-gray-300  py-2  mb-4">
              <Link href="/checkout/address">
              <h2 className="font-bold md:text-xl text-heading pl-6 cursor-pointer">
                1. Delivery Address
              </h2>
              </Link>
            </div>
            <div className="border border-gray-300  py-2  mb-4">
              <Link href="/checkout/shipmentmethod">
              <h2 className="font-bold md:text-xl text-heading pl-6 cursor-pointer">
                2. Shipping Method
              </h2>
              </Link>
            </div>
            <div className="border border-gray-300 bg-gray-100 py-2 border-b-0">
              <h2 className="font-bold md:text-xl text-heading pl-6 ">
                3. Payment 
              </h2>
            </div>
            <div className="border border-gray-300">
            <div className="relative inset-y-0  max-w-full ">
              <div className="flex flex-col md:w-full">
                <div className="flex h-full flex-col bg-white">
                  <div className="flex-1 overflow-y-auto px-4 sm:px-6">
                      <div className="flow-root">
                        <div className="mt-5 md:mt-0 md:col-span-2 ">
                        <form onSubmit={handleSubmit} method="POST">
                            <div className="mt-1 block w-full py-2 bg-white  shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ">
                            <div className="bg-white mt-4">
                                <div className="font-bold text-lg mb-3"> Payment Method </div>
                                <div className="flex items-center mb-4">
                                    <input id="default-radio-1" onChange={()=>setpaymentCard(false)}  type="radio" value="CASH" name="card" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label htmlFor="default-radio-1" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Cash On Delivery</label>
                                </div>
                                <div className="flex items-center">
                                    {/* <main className="font-Inter overflow-auto bg-gradient-to-tr from-[#252B30] to-[#191C22]">
                                      <PurchaseNow onClick={()=>makePayment(pageData.totalPrice.$numberDecimal, pageData.deliveryCost.$numberDecimal, paymentData.DeliveryAddress.email, paymentData.DeliveryAddress.phone1)} />
                                    </main> */}
                                    <input id="default-radio-2" onChange={()=>setpaymentCard(true)}  type="radio" value="RAZORPAY" name="card" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label htmlFor="default-radio-2" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">PayNow</label>
                                </div>
                            </div>
                              <div className="py-5 text-right mt-10">
                                <div className="flex items-center justify-between my-6">
                                  <div className="flex items-center">
                                    <input id="saveaddress" onChange={()=>setChecked(!isChecked)} type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"></input>
                                    <label htmlFor="saveaddress" className="ml-2 block text-xs text-gray-800" >
                                      I am confirming that I have read and agreed with the <a href='#' className=" hover:bg-blue-500 text-blue font-bold ">Terms & Conditions</a>
                                    </label>
                                  </div>
                                </div>

                                {!paymentCard && 
                                <button
                                  disabled={!isChecked}
                                  type="submit"
                                  className="w-full btn-default rounded-full justify-center text-white disabled:opacity-25"
                                >
                                  Place Order
                                </button>}

                                {paymentCard && 
                                <div>
                                  <main className="font-Inter h-screen overflow-auto bg-gradient-to-tr from-[#252B30] to-[#191C22]">
                                    {/* <PurchaseNow onClick={makePayment} disabled={!isChecked} /> */}
                                    <button  disabled={!isChecked} type="button" onClick={()=>makePayment()} className="w-full btn-default rounded-full justify-center text-white disabled:opacity-25" >
                                    Place Order
                                    </button>
                                  </main>
                                </div>}
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                  
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
}
          <div className="flex flex-col w-full ml-0 lg:ml-12 lg:w-2/4">
            <OrderSummary orderSummaryData={pageData} displayCheckout={false} />
          </div>
        </div>
      </div>
    </div>
  );
}


// const PurchaseNow = ({ onClick }) => {
//   return (
//     <div className="relative">
//         <button type="button" onClick={onClick} className="w-full btn-default rounded-full justify-center text-white disabled:opacity-25" >
//           Pay Now
//         </button>
//     </div>
//   );
// };

export default Paymentmethod;
