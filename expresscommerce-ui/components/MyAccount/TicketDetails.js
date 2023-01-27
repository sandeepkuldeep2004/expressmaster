import React, { useState, useEffect } from 'react'
import Link from 'next/link';
import Moment from 'moment';
import { getOrderDetails } from '../../pages/api/accountpage';
import { useAppContext } from '../util/contextState'

export default function OrderDetails(props) {

  const context = useAppContext();
  const userId = context.user.email;
  const orderId = props.orderId;

  const [pageData, setPageData] = useState([]);

  useEffect(() => {
    const apiCalls = async () => {
      if (orderId != undefined) {
        const response = await getOrderDetails(orderId);
        setPageData(response.data);
      }
    };
    apiCalls();
  }, [orderId]);

  const orderDetails = pageData.orderDetails;
  return (
    <div>
      <h2 className="text-base font-bold leading-7 text-gray-900 sm:text-xl sm:truncate">Order Details</h2>
      {orderDetails != undefined &&
        <div className="overflow-x-auto relative order-details">
          <div className="grid grid-cols-3 gap-2">
            <div className="border-r pr-4 col-span-2">
              <div className='product-item'>
              <h4>
                <a className="font-medium text-base orderNumber"> Order Number: <span>{orderDetails.id} </span></a>
              </h4>
              <ul role="list" className="shadow rounded mb-5">
                {orderDetails.entries.map((order) => (
                  <li className="flex py-4 px-4 sm:px-4" key={order.entryNumber}>
                    <div className="flex-shrink-0">
                      <img src={order.product.media ? order.product.media.main : null} alt={order.product.title} className="w-14 h-14 rounded-md " />
                    </div>
                    <div className="ml-6 flex-1 flex flex-col">
                      <div className="flex">
                        <div className="min-w-0 flex-1">
                          <h4>
                            <Link href={`/product/${order.product.code}`}>
                              <a className="font-medium text-base text-blue-900 hover:text-gray-900 hover:underline"> {order.product.title} </a>
                            </Link>
                          </h4>
                          <p className="mt-0 text-xs">Qty: {order.quantity}</p>
                          <p className="mt-0 text-xs">Item Price: {orderDetails.currency.symbol} {order.basePrice}</p>
                        </div>

                        <div className="mt-0 flex-shrink-0 flow-root">
                          <p className="text-sm font-bold">{orderDetails.currency.symbol}{order.totalPrice}</p>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              </div>
              <div className='order-detail-grid shadow rounded py-2 px-4 m-3'>
              <div className="flex justify-between">
              <div>Payment Mode</div>
              <div><span className="font-bold"> {orderDetails.paymentMethod} </span></div>
              </div>
              <div className="flex justify-between">
              <div>Delivery Mode</div>
              <div><span className="font-bold"> {orderDetails.deliveryMode} </span></div>
              </div>
              <div className="flex justify-between">
              <div>Delivery Status</div>
              <div><span className="font-bold"> {orderDetails.omsStatus} </span></div>
              </div>
              <div className="flex justify-between">
              <div>Shipping ID</div>
              <div><span className="font-bold"> {orderDetails.omsOrderId} </span></div>
              </div>
              <div className="flex justify-between">
              <div>Delivery Cost</div>
              <div><span className="font-bold"> {orderDetails.deliveryCost} </span></div>
              </div>
              <div className="flex justify-between">
              <div>Total Order Price</div>
              <div><span className="font-bold"> {orderDetails.currency.symbol}{orderDetails.totalPrice} </span></div>
              </div>
              </div>
             

            </div>
            <div className="">

              <div className="right-details pl-3 pr-1">
                <div className="flex flex-wrap">
                  <div className="grid grid-cols-1 gap-1">
                    {orderDetails.deliveryAddress != undefined &&
                      <div className="py-3 px-4 block max-w-sm shadow rounded mb-4">
                        <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">Delivery Address</h5>
                        <p className="text-gray-700 text-base">{orderDetails.deliveryAddress.firstname}, {orderDetails.deliveryAddress.lastname}</p>
                        <p className="text-gray-700 text-base">{orderDetails.deliveryAddress.streetno}, {orderDetails.deliveryAddress.streetname}</p>
                        <p className="text-gray-700 text-base">{orderDetails.deliveryAddress.appartment}, {orderDetails.deliveryAddress.building}</p>
                        <p className="text-gray-700 text-base">{orderDetails.deliveryAddress.city}</p>
                        <p className="text-gray-700 text-base">{orderDetails.deliveryAddress.phone1}</p>
                      </div>
                    }
                    {orderDetails.paymentAddress != undefined &&
                      <div className="py-3 px-4 block max-w-sm shadow rounded mb-4">
                        <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">Billing Address</h5>
                        <p className="text-gray-700 text-base">{orderDetails.paymentAddress.firstname}, {orderDetails.paymentAddress.lastname}</p>
                        <p className="text-gray-700 text-base">{orderDetails.paymentAddress.streetno}, {orderDetails.paymentAddress.streetname}</p>
                        <p className="text-gray-700 text-base">{orderDetails.paymentAddress.appartment}, {orderDetails.paymentAddress.building}</p>
                        <p className="text-gray-700 text-base">{orderDetails.paymentAddress.city}</p>
                        <p className="text-gray-700 text-base">{orderDetails.paymentAddress.phone1}</p>
                      </div>
                    }

                    {orderDetails.paymentDetails != undefined &&
                      <div className="py-3 px-4 block max-w-sm shadow rounded" >
                        <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">Payment Details</h5>
                        <p className="text-gray-700 text-base">Payment ID: {orderDetails.paymentDetails.paymentId}, </p>
                        <p className="text-gray-700 text-base">Payment Method: {orderDetails.paymentDetails.paymentMethod}, </p>
                        <p className="text-gray-700 text-base">Status: {orderDetails.paymentDetails.status},</p>
                        <p className="text-gray-700 text-base">Creation Time: {Moment(orderDetails.paymentDetails.creationdate).format("DD/MM/YYYY") }</p>
                      </div>
                    }
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

      }
    </div>
  )

}
