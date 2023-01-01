import Link from 'next/link'
import React from 'react';


export default function Sidebar() {

    return (
        <div className='sidebar'>
            <aside className="w-64" aria-label="Sidebar">
                <div className="overflow-y-auto bg-gray-50 dark:bg-gray-800 account-left-panel">
                    <ul className="space-y-2">
                        <li >
                            <Link href="/myAccount">
                                <a className="flex items-center">
                                    <svg className="h-8 w-8 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />  <circle cx="12" cy="7" r="4" /></svg>
                                    <span className="flex-1 ml-3 whitespace-nowrap"> Personal Details</span>
                                </a>
                            </Link>
                        </li>
                        <li >
                            <Link href="/myAccount/wishlist">
                                <a className="flex items-center">
                                <svg className="h-8 w-8 text-gray-500"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
                                    <span className="flex-1 ml-3 whitespace-nowrap"> Wish List</span>
                                </a>
                            </Link>
                        </li>
                        <li >
                            <Link href="/myAccount/orders">
                                <a href="#" className="flex items-center">
                                    <svg className="h-8 w-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>

                                    <span className="flex-1 ml-3 whitespace-nowrap"> Order History</span>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/myAccount/address/">
                                <a className="flex items-center">
                                    <svg className="h-8 w-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>

                                    <span className="flex-1 ml-3 whitespace-nowrap"> Address Book</span>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/logout">
                                <a className="flex items-center">
                                    <svg className="h-8 w-8 text-gray-500" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />  <path d="M7 12h14l-3 -3m0 6l3 -3" /></svg>
                                    <span className="flex-1 ml-3 whitespace-nowrap">Log out</span>
                                </a>
                            </Link>
                        </li>
                    </ul>
                </div>
            </aside>
        </div>
    )
}
