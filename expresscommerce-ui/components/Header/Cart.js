// import { FaShoppingCart } from "react-icons/Fa";
// import classes from './Cart.module.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import {useAppContext} from "../util/contextState";
import { getCartPage } from '../../pages/api/cartPage';
import { ShoppingBagIcon } from '@heroicons/react/outline'

function Cart() {
  const context = useAppContext();
  const userId = context.user.email;
  // const [cartEntries, setCartEntries] = useState([]);
  //  cartEntries = context.cart.entries;
  
  useEffect(() => {
    if(userId){
    const apiCalls = async () => {    
      const cartDetails = await getCartPage(userId);
      if(cartDetails.data.cartEntries && cartDetails.data.cartEntries.length != context.cart.entries){
        context.updateCart({entries: cartDetails.data.cartEntries.length})
      }
        // setCartEntries(cartDetails.data.cartEntries.length)
    }
    apiCalls()}
  }, [userId])
  
  return <div>
    <Link href="/cart" >
    <a className="cart-link relative">
      <svg className="h-8 w-8 text-gray-500"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
</svg>
       {context.cart.entries > 0 &&
        <span className="text-sm font-medium count-item">
          { isNaN(context.cart.entries) ? 0 : context.cart.entries }</span>}
        <span className='m-hide'>Cart</span>
        <span className="sr-only">{ context.cart.entries } items in cart, view bag</span>

    </a>
    </Link>
  </div>
}

export default Cart;
