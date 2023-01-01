import React from "react";
import { postAddress } from "../../pages/api/accountpage";
import { useAppContext } from "../util/contextState";
import { useRouter } from "next/router";

export default function AddressAdd() {
  const router = useRouter();
  const context = useAppContext();
  const userId = context.user.email;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      firstName   : event.target.firstName.value,
      lastName    : event.target.lastName.value,
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
      regionIsoCode: 'IN-MH'
    }
    const response = await postAddress(
      userId,
      formData
    );

    if (response.status == 200) {
        alert('Address has been added !!');
        router.push("/myAccount/address");
    }
  }

  return (
    <div className="add-address">
      <h2 className="text-base font-bold leading-7 text-gray-900 sm:text-xl sm:truncate">
        Add Address
      </h2>
      <div className="py-5 bg-white ">
        <form onSubmit={handleSubmit} method="POST">
        <div className="mt-1 block w-full py-2 bg-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ">
        <div className="grid grid-cols-6 gap-4">
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
              autoComplete="firstName"
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
              autoComplete="lastName"
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
              autoComplete="email"
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
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
          </div>
          <div className="mt-4 py-5 ">
            <button
                type="submit"
                className="btn-default rounded-full group relative w-48 flex justify-center text-white">
                Add Address
            </button>
           </div>
        </div>
        </form>
      </div>
    </div>
  );
}
