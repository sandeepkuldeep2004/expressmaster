import React, { useState, useEffect } from 'react'
import { getPersonalDetails } from '../../pages/api/accountpage';
import Rewards from '../Rewards';
import { useAppContext } from '../util/contextState'

export default function PersonalDetails() {

const context = useAppContext();
const userId  = context.user.email;

const [pageData, setPageData] = useState([]);

useEffect(() => {
    const apiCalls = async () => {
        if(userId!=undefined){
            const response = await getPersonalDetails(userId);
            setPageData(response.data);
        }
    };
    apiCalls();
},[userId]);


const handleChange =() =>{};
return (
    <div>
        <h2 className="text-base font-bold leading-7 text-gray-900 sm:text-xl sm:truncate">Personal Details</h2>
        {pageData.Customer != undefined &&
        <div className="py-4">
        <div className="space-x-0 lg:flex lg:space-x-4">
            <div className="w-full lg:w-1/2">
                <label htmlFor="firstName" className="mb-3 text-sm font-semibold ">Name</label>
                <input name="firstName" type="text" value={pageData.Customer.name} onChange={handleChange} disabled="disabled" className="text-gray-900 w-full px-4 py-3 text-sm border border-gray-200 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"/>
            </div>
            <div className="w-full lg:w-1/2 ">
                <label htmlFor="email" className="mb-3 text-sm font-semibold">Last
                    Email</label>
                <input name="Last Name" type="text" value={pageData.Customer.email}  onChange={handleChange} disabled="disabled"
                    className="text-gray-900 w-full px-4 py-3 text-sm border border-gray-200 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"/>
            </div>
        </div>
        </div>}


        <Rewards />
    </div>
)

}
