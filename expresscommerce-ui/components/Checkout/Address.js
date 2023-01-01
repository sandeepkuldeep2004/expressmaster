import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import OrderSummary from "./OrderSummary";
import { useAppContext } from "../util/contextState";
import { getCartPage } from "../../pages/api/cartPage";
import { getAllDeliveryAddress, postDeliveryAddress, postUseDeliveryAddress } from "../../pages/api/checkout";
import AddressCards from "./AddressCards";

// @desc Checkout Address for the customer
function Address() {

  const context = useAppContext();
  const userId = context.user.email;
  const [pageData, setPageData] = useState({});
  const [addressData, setAddressData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const apiCalls = async () => {
      if(userId!=undefined){
        const response = await getCartPage(userId);
        setPageData(response.data);        
        getAllAddress(userId, response.data.purchaseOrderNumber)
      }
    };
    apiCalls();
  },[userId]);

  const getAllAddress = async (sUserId, sCartId) => {
    if(sUserId!=undefined && sCartId !=undefined){
      const response = await getAllDeliveryAddress(sUserId, sCartId);
      // console.log(response.data)
      setAddressData(response.data);
    }
  }

  const cartId  = pageData ?pageData.purchaseOrderNumber:'';
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      firstName   : event.target.firstName.value,
      lastName    :  event.target.lastName.value,
      email       : event.target.email.value,
      dateOfBirth : '',
      gender      : '',
      phone1      : event.target.phone1.value,
      appartment  : event.target.appartment.value,
      building    : event.target.building.value,
      streetno    : event.target.streetno.value,
      streetname  : event.target.streetname.value,
      city        : event.target.city.value,
      postalCode  : event.target.postalCode.value,
      countryIsoCode : event.target.countryIsoCode.value,
      regionIsoCode: 'IN-CH'
    }

    const response = await postDeliveryAddress(
      userId,
      cartId,
      formData
    );

    if (response.status == 200) {
      router.push("/checkout/shipmentmethod");
    }
  };

  const onUseAddress = async (addressId) => {
    const uId = addressId;
    const response = await postUseDeliveryAddress(
      userId,
      cartId,
      uId
    );
    if (response.status == 200) {
      router.push("/checkout/shipmentmethod");
    }
  }

  return (
    <div>
      <div className="container max-w-7xl pt-12 mx-auto px-4 sm:px-6 lg:px-8"> 
        <div className="flex flex-col w-full px-0 mx-auto md:flex-row">
          <div className="flex flex-col md:w-full  mb-12">
            <div className="border border-gray-300 bg-gray-100 py-2 border-b-0">
              <h2 className="font-bold md:text-xl text-heading px-4">
                1. Delivery Address
              </h2>
            </div>
            <div className="border border-gray-300">
            <div className="border-b border-gray-300 py-2">
              <AddressCards addressList={addressData.AddressBook} onUseAddress={onUseAddress}/>
            </div>
            <div className="relative inset-y-0  max-w-full ">
              <div className="flex flex-col md:w-full">
                <div className="flex h-full flex-col bg-white">
                  <div className="flex-1 overflow-y-auto">
                    <div className="text-left bg-gray-50 text-gray-800 py-2 px-"> 
                    <h2 className="font-bold md:text-xl text-heading px-4">Add New Address</h2> </div>
                      <div className="flow-root">
                        <div className="mt-5 md:mt-0 md:col-span-2 ">
                          <form onSubmit={handleSubmit} method="POST">
                            <div className="mt-1 block w-full py-2 bg-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ">
                              <div className="px-4 py-5 bg-white ">
                                <div className="grid grid-cols-6 gap-6">
                                  <div className="col-span-6 sm:col-span-3">
                                    <label
                                      htmlFor="firstName"
                                      className="block text-sm font-medium text-gray-700"
                                    >
                                      First name
                                    </label>
                                    <input
                                      type="text"
                                      name="firstName"
                                      id="firstName"
                                      autoComplete="given-name"
                                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                  </div>
                                  <div className="col-span-6 sm:col-span-3">
                                    <label
                                      htmlFor="lastName"
                                      className="block text-sm font-medium text-gray-700"
                                    >
                                      Last name
                                    </label>
                                    <input
                                      type="text"
                                      name="lastName"
                                      id="lastName"
                                      autoComplete="family-name"
                                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                  </div>
                                  <div className="col-span-6 sm:col-span-3">
                                    <label
                                      htmlFor="email"
                                      className="block text-sm font-medium text-gray-700"
                                    >
                                      Email
                                    </label>
                                    <input
                                      type="text"
                                      name="email"
                                      id="email"
                                      autoComplete="phone1"
                                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                  </div>
                                  {/* <div className="col-span-6 sm:col-span-3">
                                    <label
                                      htmlFor="dateOfBirth"
                                      className="block text-sm font-medium text-gray-700"
                                    >
                                      Date Of Birth
                                    </label>
                                    <input
                                      type="date"
                                      name="dateOfBirth"
                                      id="dateOfBirth"
                                      autoComplete="dateOfBirth"
                                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                  </div> */}
                                  {/* <div className="col-span-6 sm:col-span-3">
                                    <label
                                      htmlFor="gender"
                                      className="block text-sm font-medium text-gray-700"
                                    >
                                      Gender
                                    </label>
                                    <select
                                      id="gender"
                                      name="gender"
                                      autoComplete="gender"
                                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    >
                                      <option value="Male">Male</option>
                                      <option value="Female">Female</option>
                                    </select>
                                  </div> */}
                                  <div className="col-span-6 sm:col-span-3">
                                    <label
                                      htmlFor="phone1"
                                      className="block text-sm font-medium text-gray-700"
                                    >
                                      Phone Number
                                    </label>
                                    <input
                                      type="tel"
                                      name="phone1"
                                      id="phone1"
                                      autoComplete="phone1"
                                      pattern="[0-9]{10}"
                                      maxLength="10"
                                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                  </div>
                                  <div className="col-span-6 sm:col-span-3">
                                    <label
                                      htmlFor="appartment"
                                      className="block text-sm font-medium text-gray-700"
                                    >
                                      Appartment
                                    </label>
                                    <input
                                      type="text"
                                      name="appartment"
                                      id="appartment"
                                      autoComplete="appartment"
                                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                  </div>
                                  <div className="col-span-6 sm:col-span-3">
                                    <label
                                      htmlFor="building"
                                      className="block text-sm font-medium text-gray-700"
                                    >
                                      Building
                                    </label>
                                    <input
                                      type="text"
                                      name="building"
                                      id="building"
                                      autoComplete="building"
                                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                  </div>
                                  <div className="col-span-6 sm:col-span-3">
                                    <label
                                      htmlFor="streetno"
                                      className="block text-sm font-medium text-gray-700"
                                    >
                                      Street Number
                                    </label>
                                    <input
                                      type="text"
                                      name="streetno"
                                      id="streetno"
                                      autoComplete="streetno"
                                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                  </div>
                                  <div className="col-span-6 sm:col-span-3">
                                    <label
                                      htmlFor="streetname"
                                      className="block text-sm font-medium text-gray-700"
                                    >
                                      Street Name
                                    </label>
                                    <input
                                      type="text"
                                      name="streetname"
                                      id="streetname"
                                      autoComplete="streetname"
                                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                  </div>

                                  <div className="col-span-6 sm:col-span-3">
                                    <label
                                      htmlFor="country"
                                      className="block text-sm font-medium text-gray-700"
                                    >
                                      Country
                                    </label>
                                    <select
                                      id="country"
                                      name="countryIsoCode"
                                      autoComplete="country-name"
                                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    >
                                      <option value="IN">India</option>
                                    </select>
                                  </div>
                                  
                                  
                                  <div className="col-span-6 sm:col-span-3">
                                    <label
                                      htmlFor="city"
                                      className="block text-sm font-medium text-gray-700"
                                    >
                                      City
                                    </label>
                                    <input
                                      type="text"
                                      name="city"
                                      id="city"
                                      autoComplete="address-level2"
                                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                  </div>
                                  <div className="col-span-6 sm:col-span-3">
                                    <label
                                      htmlFor="region"
                                      className="block text-sm font-medium text-gray-700"
                                    >
                                      State / Province
                                    </label>
                                    <input
                                      type="text"
                                      name="region"
                                      id="region"
                                      autoComplete="address-level1"
                                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                  </div>
                                  <div className="col-span-6 sm:col-span-3">
                                    <label
                                      htmlFor="postalCode"
                                      className="block text-sm font-medium text-gray-700"
                                    >
                                      ZIP / Postal code
                                    </label>
                                    <input
                                      type="text"
                                      name="postalCode"
                                      id="postalCode"
                                      maxLength="6"
                                      autoComplete="postalCode"
                                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                  </div>
                                  {/* <div className="col-span-6">
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center">
                                        <input
                                          id="saveaddress"
                                          name="saveaddress"
                                          type="checkbox"
                                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                        ></input>
                                        <label
                                          htmlFor="saveaddress"
                                          className="ml-2 block text-sm text-gray-900"
                                        >
                                          {" "}
                                          SAVE SHIPPING ADDRESS{" "}
                                        </label>
                                      </div>
                                    </div>
                                  </div> */}
                                </div>
                              </div>
                              <div className="px-4 py-5 text-right">
                                <button
                                  type="submit"
                                  className="btn-default rounded-full group relative w-full flex justify-center text-white"
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
export default Address;
