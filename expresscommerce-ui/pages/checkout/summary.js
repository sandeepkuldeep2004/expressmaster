import Head from 'next/head';
import React, { Fragment } from 'react'
import OrderReview from '../../components/Checkout/OrderReview';
import Footer from '../../components/Footer';

export default function summary() {
    return (
        <Fragment>
            <Head>
                <title>Express Commerce - Order Summary</title>
            </Head>
            <div>
                <OrderReview/>
                <Footer/>
            </div>
        </Fragment>
    );
};