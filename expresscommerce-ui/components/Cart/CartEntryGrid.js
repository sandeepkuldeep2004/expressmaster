import classes from "./Cart.module.css";
import CartEntry from "./CartEntry";

export default function CartEntryGrid(props) {
  return (
    <ul
    role="list"
    className="-my-6 divide-y divide-gray-200"
  >
      {props.cartEntries &&
        props.cartEntries.map((cartEntry) => (
         
          <CartEntry key={cartEntry._id} cartEntryData={cartEntry} cartId={props.cartId} />
          
        ))}
    </ul>
  );
}
