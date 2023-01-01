import { useAppContext } from "../../components/util/contextState";
import { useState, useEffect } from "react";
import { updateCartEntry, deleteCartEntry } from "../../pages/api/cartPage";

export default function CartEntryQuantity(props) {
  const [quantity, setQuantity] = useState(props.quantity);
  const [cartId, setCartId] = useState(props.cartId);
  const [entryNumber, setEntryNumber] = useState(props.entryNumber);

  const context = useAppContext();
  const userID = context.user.email;

  useEffect(() => {
    const apiCalls = async () => {
      let response = "";
      if (quantity === 0) {
        response = await deleteCartEntry(userID, cartId, entryNumber);
      } else {
        response = await updateCartEntry(userID, cartId, entryNumber, quantity);
      }
      
    };
    apiCalls();
  }, [quantity]);

  const updateEntry = ( updatedQuantity) => {
    setQuantity(updatedQuantity);
  };

  return (
    <div className="flex flex-1">
      <p className="text-gray-500 text-sm mt-4">Qty </p>
      <div className="custom-number-input w-32 ml-4">
        <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
          <button
            onClick={(e) => updateEntry(quantity - 1)}
            className=" btn-default text-gray-600 h-full w-24 p-1 rounded-l-full cursor-pointer outline-none font-semibold"
          >
            <span className="m-auto text-2xl font-thin text-white">−</span>
          </button>
          <input
            type="number"
            className="outline-none text-sm text-center w-full bg-gray-300 text-md flex items-center"
            value={quantity} readOnly
          ></input>
          <button
            onClick={(e) => updateEntry(quantity + 1)}
            className="btn-default text-gray-600 p-1 h-full w-24 rounded-r-full cursor-pointer"
          >
            <span className="m-auto text-2xl font-thin text-white">+</span>
          </button>
        </div>
      </div>
      <div className="flex">
        {/* <button
        type="button"
        className="font-medium text-indigo-600 hover:text-indigo-500"
      >
        Remove
      </button> */}
      </div>
    </div>
  );
}
