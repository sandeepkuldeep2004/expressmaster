import { useState, useEffect } from 'react'
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';
import { updateCartEntry, deleteCartEntry } from "../../pages/api/cartPage";
import OrderSummary from "../../components/Checkout/OrderSummary";
import { useAppContext } from "../../components/util/contextState";
import { getCartPage } from '../../pages/api/cartPage';
import { addToWishListPage } from "../../pages/api/cartPage";
export default function CartInfo() {
  const context = useAppContext();
  const userId = context.user.email;
  const [pageData, setPageData] = useState({});
  const SuccessNotify = () => toast.success('Product moved to Wishlist Successfully!');
  const wishlistName = "WishList";
  
  useEffect(() => {
    const apiCalls = async () => {
      if(userId!=undefined){
        const response = await getCartPage(userId);
        setPageData(response.data);
      }
    };
    apiCalls();
  },[userId]);

  const updateEntry = async ( updatedQuantity, cartId, entryNumber) => {
    var totalPrice  = 0.0;
    var updatedEntries = pageData.cartEntries.filter(element=>{
      if(element.entryNumber == entryNumber && updatedQuantity === 0) {
      }else if(element.entryNumber == entryNumber){
        element.quantity = updatedQuantity;
        return element
      } else {
        return element
      };
    })

    updatedEntries.filter(element=>{
      totalPrice = totalPrice + element.quantity * element.basePrice.$numberDecimal;
    })

    totalPrice = ( totalPrice + (1*pageData.deliveryCost.$numberDecimal) );

    const newPageData = JSON.parse(JSON.stringify(pageData));
    newPageData.cartEntries = updatedEntries;
    newPageData.totalPrice.$numberDecimal = totalPrice
    setPageData(newPageData)

    if (updatedQuantity === 0) {
      var response = await deleteCartEntry(userId, cartId, entryNumber);
      const cartUpdate = (context.cart.entries - 1 );
      context.updateCart({ entries: cartUpdate })
    } else {
      var response = await updateCartEntry(userId, cartId, entryNumber, updatedQuantity);
    }
    
    if(response.status == 200 ){
      const response = await getCartPage(userId);
      // setPageData(response.data);
    }
  };


  const moveToWishlist = (productCode, cartId, entryNumber) => {
    const response = addToWishListPage(productCode, wishlistName, userId);
    response.then(function (result) {
      if(result.status == 200) {
        SuccessNotify();
        updateEntry(0, cartId, entryNumber);
      }
    });
  };

  return (
    <div  className="container max-w-7xl mx-auto min-h-screen">
      <h2 className="main-title">  Shopping Cart </h2>
      {(pageData!=undefined && pageData.message=='Cart Not found') &&         
          <div className="flex justify-center mt-8 text-center">
            <div className="block p-6 justify-center bg-white max-w-sm text-center">
              <p className="inline-block  mb-2 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 fill-sky-800">
                  <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                </svg>
              </p>
              <p className="text-gray-700 text-base mb-4">
                Your Cart is Empty.
              </p>
              <Link href="/"><button type="button" className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xl leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Shop Now</button></Link>
            </div>          
      </div>}
      {pageData.cartEntries!=undefined &&      
        <div className="flex flex-col w-full px-0 mx-auto md:flex-row">
          <div className="flex flex-col md:w-full">            
            <div className="relative px-0 rounded-md pb-8">
              <div className="relative inset-0 overflow-hidden">
                  <div className=" relative inset-y-0 right-0 flex max-w-full ">
                    <div className="flex flex-col md:w-full">
                      <div className="flex h-full flex-col bg-white shadow-xl">
                        <div className="flex-1 cart-added-items">                          
                            <div className="flow-root">
                              <ul role="list" className="-my-6 divide-y divide-gray-200" >
                                {pageData.cartEntries && pageData.cartEntries.map((cartEntry) => (
                                    <li className="flex py-6" key={cartEntry._id}>
                                      <div  className="md:h-40 md:w-56 h-24 w-24 flex-shrink-0 overflow-hidden">
                                        <img src={cartEntry.product.media.main} alt={cartEntry.product.name}  className={cartEntry.product.name} />
                                      </div>

                                      <div className="ml-4 flex flex-1 flex-col">
                                        <div>
                                          <div className="flex justify-between text-base font-bold">
                                            <h3>
                                              <Link href={`/product/${cartEntry.productCode}`}>
                                                <a> {cartEntry.product.name} </a>
                                              </Link>
                                            </h3>
                                            <p className="ml-4">&#8377; {cartEntry.totalPrice.$numberDecimal}</p>
                                          </div>
                                          <p className="mt-1 text-sm">
                                            {cartEntry.product.description}
                                          </p>
                                        </div>
                                        <div className="flex flex-1 mt-4">
                                          <p className="text-sm mt-4">Qty </p>
                                          <div className="custom-number-input w-32 ml-4">
                                            <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                                              <button
                                                onClick={(e) => updateEntry(cartEntry.quantity - 1, pageData.purchaseOrderNumber, cartEntry.entryNumber)}
                                                className=" btn-default text-gray-600 h-full w-24 p-1 rounded-l-full cursor-pointer outline-none font-semibold"
                                              >
                                                <span className="m-auto text-2xl font-thin text-white">−</span>
                                              </button>
                                              <input
                                                type="number"
                                                className="outline-none text-sm text-center w-full bg-gray-300 text-md flex items-center"
                                                value={cartEntry.quantity} readOnly
                                              ></input>
                                              <button
                                                onClick={(e) => updateEntry(1+cartEntry.quantity, pageData.purchaseOrderNumber, cartEntry.entryNumber)}
                                                className="btn-default text-gray-600 p-1 h-full w-24 rounded-r-full cursor-pointer"
                                              >
                                                <span className="m-auto text-2xl font-thin text-white">+</span>
                                              </button>
                                            </div>
                                          </div>
                                          <div className='move-wishlist'><button onClick={(e) => moveToWishlist(cartEntry.productCode, pageData.purchaseOrderNumber, cartEntry.entryNumber)} type='button' className='outline-btn'>Move to Wishlist</button></div>
                                          <div className="flex-2 mt-2 pl-4">
                                            <button onClick={(e) => updateEntry(0, pageData.purchaseOrderNumber, cartEntry.entryNumber)}
                                            type="button" className="text-indigo-600 hover:text-indigo-500  text-sm" >
                                              <svg className="delete h-8 w-8 text-red-500"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">  <polyline points="3 6 5 6 21 6" />  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />  <line x1="10" y1="11" x2="10" y2="17" />  <line x1="14" y1="11" x2="14" y2="17" /></svg>
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </li>                                    
                                  ))}
                              </ul>
                            </div>                          
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Toaster position="top-center"
 toastOptions={{className: 'success-toast', duration: 5000}}
 />
          <div className="flex flex-col w-full ml-0 lg:ml-12 lg:w-2/4 mt-0">
            <OrderSummary orderSummaryData={pageData} displayCheckout={true} />
          </div>
        </div>
      }   
    </div>
  );
}
