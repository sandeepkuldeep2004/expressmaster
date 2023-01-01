import Link from "next/link";
import { updateCartEntry, deleteCartEntry } from "../../pages/api/cartPage";
import CartEntryQuantity from "./CartEntryQuantity";

export default function CartEntry(props) {
  return (
    <div>
      <li className="flex py-6">
        <div className="md:h-40 md:w-56 h-24 w-24 flex-shrink-0 overflow-hidden">
          <img
            src={props.cartEntryData.product.media.main}
            alt={props.cartEntryData.product.name} 
            className={props.cartEntryData.product.name} 
          />
        </div>

        <div className="ml-4 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between text-base font-bold text-gray-900">
              <h3>
                <Link href={`/product/${props.cartEntryData.productCode}`}>
                  <a> {props.cartEntryData.product.name} </a>
                </Link>
              </h3>
              <p className="ml-4">&#8377; {props.cartEntryData.totalPrice.$numberDecimal}</p>
            </div>
            <p className="mt-3 text-sm mb-2">
              {props.cartEntryData.product.description}
            </p>
          </div>
          <CartEntryQuantity
            cartId={props.cartId}
            entryNumber={props.cartEntryData.entryNumber}
            quantity={props.cartEntryData.quantity}
          />
        </div>
      </li>
    </div>
  );
}
