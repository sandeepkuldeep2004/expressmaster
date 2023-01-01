import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import OrderSummary from "./OrderSummary";
import { useAppContext } from "../../components/util/contextState";
import { getCartPage } from "../../pages/api/cartPage";
import { getPaymentDetails, getDeliveryModes, postDeliveryModes  } from "../../pages/api/checkout";

// @desc Checkout Deliverymethod for the customer
function Deliverymethod() {
  const context = useAppContext();
  const userId = context.user.email;
  const [pageData, setPageData] = useState({});
  const [paymentData, setPaymentData] = useState([]);
  const [paymentModeData, setPaymentModeData] = useState([]);
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
      // console.log(response.data)
      setPaymentData(response.data);

      const responseMode = await getDeliveryModes(sUserId, sCartId);
      // console.log(responseMode.data)
      setPaymentModeData(responseMode.data);
    }
  }

  var deliveryAddress = paymentData.DeliveryAddress;
  var deliveryModes = paymentModeData.DeliveryModes;
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const deliveryCode = event.target.deliveryMode.value;
    const response= await postDeliveryModes(userId, pageData.purchaseOrderNumber, deliveryCode);
    if (response.status == 201) {
      router.push("/checkout/payment");
    }
  }

  return (
    <div>
      <div className="container max-w-7xl pt-12 mx-auto px-4 sm:px-6 lg:px-8"> 
        <div className="flex flex-col w-full px-0 mx-auto md:flex-row">
          <div className="flex flex-col md:w-full  mb-12">
            <div className="border border-gray-300  py-2  mb-4">
            <Link href="/checkout/address">
              <h2 className="font-bold md:text-xl text-heading pl-10 cursor-pointer">
                1. Delivery Address
              </h2>
              </Link>
            </div>

            <div className="border border-gray-300 bg-gray-100 py-2 border-b-0">
              <h2 className="font-bold md:text-xl text-heading pl-10 ">
                2. Shipping Method
              </h2>
            </div>
            <div className="border border-gray-300">
              <div className="p-4 sm:px-6">
                <div className="flex flex-wrap">
                {deliveryAddress &&  (            
                    <div className="p-4 block shadow rounded-md bg-white max-w-sm" key={deliveryAddress.uid}>
                        <h5 className="text-gray-900 leading-tight font-medium mb-2">Shipping Address</h5>
                        <p className="text-gray-700 text-base">{deliveryAddress.firstname} {deliveryAddress.lastname}</p>
                        <p className="text-gray-700 text-base">{deliveryAddress.building}, {deliveryAddress.appartment}, {deliveryAddress.streetname}</p>
                        <p className="text-gray-700 text-base">{deliveryAddress.city}</p>
                        <p className="text-gray-700 text-base">{deliveryAddress.phone1}</p>
                    </div>            
                )}
                </div>
              </div>
            <div className="relative inset-y-0  max-w-full ">
              <div className="flex flex-col md:w-full">
                <div className="flex h-full flex-col bg-white">
                  <div className="flex-1 overflow-y-auto px-4 sm:px-6">
                      <div className="flow-root">
                        <div className="mt-5 md:mt-0 md:col-span-2 ">
                          <form onSubmit={handleSubmit} method="POST">
                            <div className="mt-1 block w-full py-2 bg-white  shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ">
                              <div className="bg-white ">
                                <div className="grid grid-cols-1 gap-6">

                                  <div className="col-span-1 sm:col-span-3">
                                    <label
                                      htmlFor="deliveryMode"
                                      className="block text-md font-bold text-gray-700"
                                    >
                                      Shipment Method
                                    </label>
                                    <select
                                      id="deliveryMode"
                                      name="deliveryMode"
                                      autoComplete="deliveryMode"
                                      className="mt-1 h-10 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    >
                                      {deliveryModes &&  deliveryModes.map((modes) => ( 
                                          <option value={modes.code} key={modes.code}>{modes.name} ( Delivery Cost:  {modes.deliveryCost} )</option>
                                      ))}
                                    </select>
                                  </div>
                                  
                                </div>
                              </div>
                              <div className="py-5 text-right">
                                <button
                                  type="submit"
                                  className="btn-default rounded-full w-full justify-center text-white"
                                >
                                  Next
                                </button>
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
          <div className="flex flex-col w-full ml-0 lg:ml-12 lg:w-2/4">
            <OrderSummary orderSummaryData={pageData} displayCheckout={false} />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Deliverymethod;
