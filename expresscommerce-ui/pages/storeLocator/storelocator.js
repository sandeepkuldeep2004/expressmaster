import Head from 'next/head'
import {Fragment} from 'react'
import StoreLocator from '../../components/StoreLocator/storelocator'
import Footer from '../../components/Footer'

function address() {
  return (
    <Fragment>
            <Head>
                <title>Express Commerce - Order Summary</title>
            </Head>
            <div className='grid grid-rows-2'>
                <StoreLocator/>
                <div>
                    <Footer/>
                </div>
            </div>
    </Fragment>
  )
}
export default address
