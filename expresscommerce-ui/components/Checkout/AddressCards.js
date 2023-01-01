import React from 'react'

// @desc Checkout AddressCards for the customer
export default function AddressCards(props) {
    const addressData = props.addressList;
    return (
        <div className="p-4 sm:px-6 deliveryAddress">
            <div className="grid grid-cols-3 gap-3">
            {addressData &&  addressData.map((address) => (            
                <div className="p-4 m-1 block shadow rounded-md bg-white max-w-sm" key={address._id}>
                    {/* <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">Address</h5> */}
                    <p className="text-gray-700 text-base">{address.streetno}, {address.streetname}</p>
                    <p className="text-gray-700 text-base">{address.appartment}, {address.building}</p>
                    <p className="text-gray-700 text-base">{address.city}</p>
                    <p className="text-gray-700 text-base">{address.phone1}</p>
                    {/* <p className="text-gray-700 text-base">{address.uid}</p> */}
                    {/* <p className="text-gray-700 text-base">{address.email}</p> */}
                    <button type="button" onClick={()=>props.onUseAddress(address.uid)} className="btn-default rounded-full w-full text-white">Use This Address</button>
                </div>            
            ))}
            </div>
        </div>
    )
}
