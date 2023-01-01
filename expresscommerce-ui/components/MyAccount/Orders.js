import React, { useState, useEffect } from 'react'
import Link from 'next/link';

import { getAllOrders } from '../../pages/api/accountpage';
import { useAppContext } from '../util/contextState'

export default function Orders() {

const context = useAppContext();
const userId  = context.user.email;

const [pageData, setPageData] = useState({loading:true});

useEffect(() => {
    const apiCalls = async () => {
        if(userId!=undefined){
            const response = await getAllOrders(userId);
            if(response.status == 200)
                setPageData(response.data);            
        }
    };
    apiCalls();
},[userId]);

return (
    <div>
        <h2 className="text-base font-bold leading-7 mb-4 text-gray-900 sm:text-xl sm:truncate">Order History</h2>
        { pageData.loading == true && <div><p className="mt-8 text-sm text-gray-500">Loading....</p></div>}
        {( pageData.length > 0 ) &&
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr className="bg-primary">
                        <th scope="col" className="py-3 px-6"> Order Date </th>
                        <th scope="col" className="py-3 px-6"> Order Number </th>
                        <th scope="col" className="py-3 px-6"> Amount </th>
                        <th scope="col" className="py-3 px-6">Payment Mode </th>
                        <th scope="col" className="py-3 px-6">Delivery Mode </th>
                        <th scope="col" className="py-3 px-6">Delivery Status </th>
                    </tr>
                </thead>
                <tbody>
                {pageData.map((order) => (
                    <tr key={order.id} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                        <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {order.creationdate.slice(0, 10)}
                        </th>
                        <td className="py-4 px-6 text-gray-900">
                            <Link href={'/myAccount/orders/' + order.id}><a className="font-medium text-blue-600 dark:text-blue-500 hover:underline">{order.id}</a></Link>
                        </td>
                        <td className="py-4 px-6 text-gray-900">
                        {order.currency.symbol}{order.totalPrice}
                        </td>
                        <td className="py-4 px-6 text-gray-900">
                        {order.paymentMethod}
                        </td>
                        <td className="py-4 px-6 text-gray-900">
                        {order.deliveryMode}
                        </td>
                        <td className="py-4 px-6 text-gray-900">
                        {order.omsStatus}
                        </td>
                      </tr>
                ))}
                </tbody>
            </table>
        </div>  
        }
    </div>
)

}
