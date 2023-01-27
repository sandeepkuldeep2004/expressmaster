import React from "react";
import { useRouter } from "next/router";
import { Fragment } from "react";
import Head from "next/head";

import { registerCustomer } from "../pages/api/authentication";

function Registration() {
  const router = new useRouter();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const name =
      event.target.firstName.value + " " + event.target.lastName.value;

    const response = await registerCustomer(
      name,
      event.target.emailAddress.value,
      event.target.newPassword.value,
      event.target.phonenumber.value,
      event.target.gender.value
    );
    if (response.status == 200) {
      router.push("/signin");
    }
  };

  return (
    <Fragment>
      <Head>
        <title>Express Commerce - Registration</title>
      </Head>
      <div className="container registration max-w-7xl mx-auto">
        <div className="md:grid md:grid-cols-2 md:gap-6">
          
          <div className="mt-5 md:mt-0 md:col-span-2 px-4 sm:px-4 py-4">
          <h2 className="text-center mt-5 mb-5 text-3xl font-bold">
                Personal Information
              </h2>
              <p className="pt-2 pb-2 text-sm text-gray-600 font-bold">
                Enter your details to create your account
              </p>
            <form onSubmit={handleSubmit} method="POST">
              <div className="mt-1 block w-full shadow border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        First name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        id="first-name"
                        autoComplete="given-name"
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="last-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Last name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        id="last-name"
                        autoComplete="family-name"
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="phone-number"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Phone Number
                      </label>
                      <input
                        type="number"
                        name="phonenumber"
                        id="phone-number"
                        autoComplete="family-name"
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div className="pb-2 flex space-x-3 items-end col-span-6 sm:col-span-3">
                      <label
                        htmlFor="person-gender"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Gender
                      </label>
                      <div class="flex space-x-3 justify-center">
                        <div class="form-check form-check-inline">
                          <input class="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="gender" id="inlineRadio1" value="male" checked />
                          <label class="form-check-label inline-block text-gray-800" for="inlineRadio10">Male</label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input class="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="gender" id="inlineRadio2" value="female"/>
                          <label class="form-check-label inline-block text-gray-800" for="inlineRadio20">Female</label>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-6 sm:col-span-6">
                      <label
                        htmlFor="email-address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email address
                      </label>
                      <input
                        type="text"
                        name="emailAddress"
                        id="email-address"
                        autoComplete="email"
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                      <label
                        htmlFor="new-password"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Enter a new password
                      </label>
                      <input
                        type="password"
                        name="newPassword"
                        id="new-password"
                        autoComplete="new-password"
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label
                        htmlFor="confirm-password"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Re-Enter your password to confirm
                      </label>
                      <input
                        type="password"
                        name="confirm-password"
                        id="confirm-password"
                        autoComplete="confirm-password"
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 flex justify-center">
                  <button
                    type="submit"
                    className="btn-default rounded-full float-right w-64 flex justify-center text-white"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
   </Fragment>
  );
}
export default Registration;
