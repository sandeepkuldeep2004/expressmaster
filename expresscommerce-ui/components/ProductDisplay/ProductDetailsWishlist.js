import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

import {
  addToCartPage,
  addToWishListPage,
  getAllWishlistName,
  getToWishListPage,
  deleteWishListPage,
} from "../../pages/api/cartPage";

import { getProductPage } from "../../pages/api/productPage";
import { useAppContext } from "../util/contextState";

export default function ProductDetailsWishlist(props) {
  const [showModal, setShowModal] = useState(false);
  const [value2, setValue2] = useState("New Wishlist");
  const [wishlistName, setwishlistName] = useState("");
  const [selected, setSelected] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [wishlistIcon, setWishlistIcon] = useState(false);
  const [wishlistText, setWishlistText] = useState('');

  const context = useAppContext();

  const productCode = props.productCode;
  const userID = context.user.email;

  const onAddToWishList = (event) => {
    event.preventDefault();
    const response = addToWishListPage(productCode, inputValue, userID);
    response.then(function (result) {
      if (result.status == 200) {
        SuccessNotify();
        setShowModal(false);
        setWishlistIcon(true);
      }
    });
  };

  const onRemoveWishList = async(event) => {
    setWishlistIcon(false);
    toast.success("Product removed from Wishlist.");
    const response = await deleteWishListPage(userID, wishlistText, productCode);
  };

  useEffect(() => {
    const allWishListName = async () => {
      const response = await getAllWishlistName(userID);
      setwishlistName(response.data);

      const responseW = await getToWishListPage(userID);
      if (responseW.status == 200) {
        if (responseW.data) {
          responseW.data.map((p) => {
            let wName  = p.name; 
            p.products.forEach((product) => checkProductCode(product.code, wName));
          });
        }
      }
    };
    allWishListName();
  }, [userID]);

  const checkProductCode = (code,name) => {
    if (code == productCode) {
      setWishlistIcon(true);
      setWishlistText(name)
    }
  };

  const handleChange = (event) => {
    setSelected(event.target.value);
    setInputValue(event.target.value);
  };

  const SuccessNotify = () =>
    toast.success("Product added to Wishlist Successfully!");
  useEffect(() => {
    const apiCalls = async () => {
      const response = await getProductPage(
        productCode,
        context.user.accessToken
      );
      // setPageData(response.data);
    };
    apiCalls();
  }, [productCode]);

  return (
    <>
      <span
        onClick={() => {
          if (wishlistIcon) onRemoveWishList();
          else setShowModal(true);
        }}
        className="added-wishlist"
        title="Add to Wishlist"
      >
        <svg
          className="h-8 w-8"
          viewBox="0 0 24 24"
          fill={wishlistIcon ? "red" : "none"}
          stroke={wishlistIcon ? "red" : "currentColor"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {" "}
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      </span>

      {showModal ? (
        <>
          <div className="wishListModal justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-full my-6 mx-auto max-w-sm">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between px-5 py-3 border-b">
                  <h3 className="text-3xl font-semibold">Add Wishlist</h3>
                  <button
                    className="p-1 ml-auto"
                    onClick={() => setShowModal(false)}
                  >
                    x
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <div className="grid grid-cols-2 gap-4 pb-4">
                    <div className="form-check flex justify-left">
                      <input
                        className="form-check-input"
                        type="radio"
                        onChange={(e) => setValue2(e.currentTarget.value)}
                        name="wishlist"
                        value="New Wishlist"
                        defaultChecked
                      />
                      <label className="form-check-label">New Wishlist</label>
                    </div>

                    <div className="form-check flex justify-left">
                      <input
                        className="form-check-input"
                        type="radio"
                        onChange={(e) => setValue2(e.currentTarget.value)}
                        value="Existing Wishlist"
                        name="wishlist"
                      />
                      <label className="form-check-label">
                        Existing Wishlist
                      </label>
                    </div>
                  </div>

                  <div>
                    {value2 === "New Wishlist" ? (
                      <div className="card">
                        <label className="block mb-2 text-sm font-bold">
                          Enter Wishlist Name
                        </label>
                        <input
                          type="text"
                          onChange={(e) => {
                            setInputValue(e.target.value);
                          }}
                          name="wislistname"
                        />
                      </div>
                    ) : null}

                    {value2 === "Existing Wishlist" ? (
                      <div className="card">
                        <label className="block mb-2 text-sm font-bold">
                          Select Wishlist Name
                        </label>
                        <div>
                          <select onChange={handleChange}>
                            <option>Select</option>
                            {wishlistName.map((item, index) => {
                              return (
                                <option key={item} value={item}>
                                  {item}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="bottom-btn flex items-center justify-end px-5 py-4 border-t">
                  <button
                    className="rounded btn-default mr-3"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="rounded btn-default"
                    type="button"
                    disabled={!inputValue}
                    onClick={onAddToWishList}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

      <Toaster
        position="top-center"
        toastOptions={{ className: "success-toast", duration: 5000 }}
      />
    </>
  );
}
