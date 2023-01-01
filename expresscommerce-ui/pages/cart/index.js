import { Fragment } from 'react'
import Head from "next/head";

import Footer from '../../components/Footer'
import CartInfo from "../../components/Cart/Cart";

export default function Cart() {
  return (
    <Fragment>
      <Head>
        <title>Express Commerce - Cart</title>
      </Head>
      <CartInfo />

      <Footer />
    </Fragment>
  );
}
