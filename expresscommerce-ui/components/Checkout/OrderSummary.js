import React from 'react';
import Link from 'next/link';

export default function OrderSummary(props) {
  var pageData = props.orderSummaryData;
  var displayButton = props.displayCheckout;
  
  return (
    //  pageData && pageData!=null && pageData.length>0?
    (pageData != undefined && pageData != null && pageData.totalPrice != undefined && pageData.totalPrice.$numberDecimal != undefined) &&
    <div className="pt-12 md:pt-0 2xl:ps-4">
      <h2 className="text-lg font-bold text-gray-900">Order summary</h2>

      <div className="mt-4 bg-white border border-gray-200 rounded-lg shadow-sm">
        <h3 className="sr-only">Items in your cart</h3>
        <ul role="list" className="divide-y divide-gray-200">
          {pageData.cartEntries && pageData.cartEntries.map((cartEntry) => (
            <li className="flex py-4 px-4 sm:px-4" key={cartEntry._id}>
              <div className="flex-shrink-0">
                <img src={cartEntry.product.media.main}
                  alt={cartEntry.product.name} className="w-14 h-14 rounded-md " />
              </div>

              <div className="ml-6 flex-1 flex flex-col">
                <div className="flex">
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm">
                      <Link href={`/product/${cartEntry.productCode}`}>
                        <a className="font-medium text-gray-700 hover:text-gray-800"> {cartEntry.product.name} </a>
                      </Link>
                    </h4>
                    <p className="mt-0 text-xs">Qty: {cartEntry.quantity}</p>
                    <p className="mt-0 text-xs">Item Price: &#8377; {cartEntry.basePrice.$numberDecimal}</p>
                  </div>

                  <div className="mt-0 flex-shrink-0 flow-root">
                    <p className="text-sm font-medium text-gray-900">&#8377; {cartEntry.totalPrice.$numberDecimal}</p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <dl className="border-t border-gray-200 py-6 px-4 space-y-6 sm:px-4">
          <div className="flex items-center justify-between">
            <dt className="text-sm">Subtotal</dt>
            <dd className="text-sm font-medium text-gray-900">&#8377; {pageData.totalPrice.$numberDecimal}</dd>
          </div>
          <div className="flex items-center justify-between text-green-500">
            <dt className="text-sm">Order Discount</dt>
            <dd className="text-sm font-medium text-green-500">&#8377; {pageData.totalDiscountValue.$numberDecimal}</dd>
          </div>
          {pageData.deliveryMode != "" &&
            <div className="flex items-center justify-between">
              <dt className="text-sm">Delivery Cost</dt>
              <dd className="text-sm font-medium text-gray-900">&#8377; {pageData.deliveryCost.$numberDecimal}</dd>
            </div>}
          <div className="flex items-center justify-between">
            <dt className="text-sm">Taxes</dt>
            <dd className="text-sm font-medium text-gray-900">&#8377; {pageData.totalTaxValue.$numberDecimal ? pageData.totalTaxValue.$numberDecimal : 0.00}</dd>
          </div>
          <div className="flex items-center justify-between border-t border-gray-200 pt-6">

            <dt className="text-base font-medium uppercase">Order Total</dt>
            <dd className="text-base font-medium text-gray-900">&#8377; {(+pageData.totalPrice.$numberDecimal) + (+pageData.deliveryCost.$numberDecimal)}.00</dd>
          </div>
        </dl>

        {displayButton == true && <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
          <Link href="/checkout/address"><a className="flex items-center justify-center rounded-full btn-default px-6 py-3 text-base font-medium text-white">Checkout</a></Link> </div>
        }
      </div>
    </div>
  )
}