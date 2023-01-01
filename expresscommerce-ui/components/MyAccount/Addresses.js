import Link from 'next/link';
import React, { useState, useEffect } from 'react'
import { getAddresses, deleteAddress } from '../../pages/api/accountpage';
import { useAppContext } from '../util/contextState'

export default function Addresses() {

const context = useAppContext();
const userId  = context.user.email;

const [pageData, setPageData] = useState([]);

useEffect(() => {
    const apiCalls = async () => {
        if(userId!=undefined){
            const response = await getAddresses(userId);
            setPageData(response.data);
        }
    };
    apiCalls();
},[userId]);

const onDeleteAddress = async (addressId) => {
    let text = "Delete Address.\nAre you sure you want to delete address?";
    if (confirm(text) == true) {
        const response = await deleteAddress(
            userId,
            addressId
        );
        var data = pageData.CustomerAddresses.filter(element=>{
            if(element._id != addressId) return element;
        })
        var newPageData = {'TotalAddresses': (pageData.TotalAddresses-1), 'CustomerAddresses':data}
        setPageData(newPageData)
    }
}

return (
    <div className='address-book'>
        <h2 className="text-base font-bold leading-7 text-gray-900 sm:text-xl sm:truncate">Address Book</h2>
        {pageData.TotalAddresses != undefined &&
         <div className="py-4 sm:py-6">
            <div>
            <div className="grid grid-cols-3 gap-3">
            {pageData.CustomerAddresses.map((address) => (            
                <div className="p-5 block address-box bg-white max-w-sm shadow rounded-lg mb-4" key={address._id}>
                    <p className="text-gray-700 text-base">{address.firstname}, {address.lastname}</p>
                    <p className="text-gray-700 text-base">{address.streetno}, {address.streetname}</p>
                    <p className="text-gray-700 text-base">{address.appartment}, {address.building}</p>
                    <p className="text-gray-700 text-base">{address.city}</p>
                    <p className="text-gray-700 text-base">{address.phone1}</p>
                    <p className="text-gray-700 text-base">{address.email}</p>
                    
                    <div className="flex flex-wrap mt-2 justify-end">
                    <button onClick={()=>onDeleteAddress(address._id)} className="inline-block mr-3">
                    <svg className="h-6 w-6 text-gray-500"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">  <polyline points="3 6 5 6 21 6" />  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />  <line x1="10" y1="11" x2="10" y2="17" />  <line x1="14" y1="11" x2="14" y2="17" /></svg>
                    </button>
                    <Link href={'/myAccount/address/edit/' + address._id}>
                        <a className="inline-block">
                        <svg className="h-6 w-6 text-gray-500"  viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />  <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />  <line x1="16" y1="5" x2="19" y2="8" /></svg>
                        </a>
                    </Link>
                    </div>
                </div>            
            ))}
            </div>
            </div>
            <Link href={'/myAccount/address/add/'}>
                <a className="btn-default rounded-full text-sm justify-center text-white px-6">
                Add New Address
                </a>
            </Link>
        </div>}
    </div>
)

}
