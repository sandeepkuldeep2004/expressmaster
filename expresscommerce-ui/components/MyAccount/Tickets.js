import React, { useState, useEffect } from 'react'
import Link from 'next/link';

import { getCustomerTickets } from '../../pages/api/ticketpage';
import { useAppContext } from '../util/contextState'

export default function Tickets() {

    const context = useAppContext();
    const userId = context.user.email;

    const [pageData, setPageData] = useState({ loading: true });

    useEffect(() => {
        const apiCalls = async () => {
            if (userId != undefined) {
                const response = await getCustomerTickets(userId);
                if (response.status == 200)
                    console.log(response.data)
                setPageData(response.data);
            }
        };
        apiCalls();
    }, [userId]);

    return (
        <div>
            <div className="flex justify-between">
                <div className="grid content-center">
                    <h2 className="text-base font-bold leading-7 text-gray-900 sm:text-xl sm:truncate">Ticket History</h2>
                </div>
                <Link href={'/myAccount/supportTicket/add'}>
                    <a className="btn-default rounded-full text-sm justify-center text-white px-6">
                        Create Ticket
                    </a>
                </Link>
            </div>
            {pageData.loading == true && <div><p className="mt-8 text-sm text-gray-500">Loading....</p></div>}
            {(pageData.length > 0) &&
                <div className="overflow-x-auto relative shadow-md sm:rounded-lg my-2">
                    <table className="w-full  text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr className="bg-primary">
                                <th scope="col" className="py-3 px-5"> Ticket Date </th>
                                <th scope="col" className="py-3 px-6"> Ticket No. </th>
                                <th scope="col" className="py-3 px-6"> Ticket Type </th>
                                <th scope="col" className="py-3 px-6"> Priority </th>
                                <th scope="col" className="py-3 px-2"> Expected Closure Date</th>
                                <th scope="col" className="py-3 px-6"> Status </th>
                                <th scope="col" className="py-3 px-6"> Headline </th>
                            </tr>
                        </thead>
                        <tbody>
                            {pageData.map((ticket) => (
                                <tr key={ticket.crmTicketId} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                    <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {ticket.creationdate.slice(0, 10)}
                                    </th>
                                    <td className="py-4 px-6 text-gray-900">
                                        <Link href="#"><a className="font-medium text-blue-600 dark:text-blue-500 hover:underline">{ticket.crmTicketId}</a></Link>
                                    </td>
                                    <td className="py-4 px-6 text-gray-900">
                                        {ticket.ticketType}
                                    </td>
                                    <td className="py-4 px-6 text-gray-900">
                                        {ticket.priority} 
                                    </td>
                                    <td className="py-4 px-4 text-gray-900">
                                        {ticket.expectedClosureDate != undefined && ticket.expectedClosureDate.slice(0, 10)}
                                    </td>
                                    <td className="py-4 px-6 text-gray-900">
                                        {ticket.status}
                                    </td>
                                    <td className="py-4 px-6 text-gray-900">
                                        {ticket.headline}
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
