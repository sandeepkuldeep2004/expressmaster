import React, { Fragment } from 'react'
import Head from "next/head";

import Footer from '../../../components/Footer'
import Sidebar from '../../../components/MyAccount/Sidebar';
import Orders from '../../../components/MyAccount/Orders';


export default function orders() {
  return (
    <Fragment>
        <Head>
            <title>Express Commerce - My Account</title>
        </Head>
        <div className="container max-w-7xl pt-12 mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col w-full px-0 mx-auto md:flex-row">
                <div className="flex flex-col w-full ml-0 lg:w-2/6">
                    <Sidebar/>
                </div>
                <div className="flex flex-col md:w-full">
                    <Orders/>
                </div>
            </div>
        </div>
        <Footer/>
    </Fragment>
  )
}
