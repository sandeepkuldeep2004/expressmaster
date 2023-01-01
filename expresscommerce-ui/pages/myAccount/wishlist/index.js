import { Fragment } from "react";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import toast, { Toaster } from "react-hot-toast";
import { useAppContext } from "../../../components/util/contextState";
import Footer from "../../../components/Footer";
import Sidebar from "../../../components/MyAccount/Sidebar";
import {
  getToWishListPage,
  deleteWishListPage,
} from "../../../pages/api/cartPage";
import { addToCartPage } from "../../api/cartPage";

import Link from "next/link";
export default function wishlist() {
  const context = useAppContext();
  const router = useRouter();
  const userId = context.user.email;
  const deleteNotify = () =>
    toast.success("Product deleted to Wishlist Successfully!");
  const addCartNotify = () =>
    toast.success("Product added to Cart Successfully!");
  const [wishListProduct, setwishListProduct] = useState([]);

  useEffect(() => {
    const onGetToWishList = async () => {
      const response = await getToWishListPage(userId);
      setwishListProduct(response.data);
    };
    onGetToWishList();
  }, [userId]);

  const wishlistDeleteClick = async (wishlistObj, code) => {
    const wishlistName = wishlistObj.name;
    const response = await deleteWishListPage(userId, wishlistName, code);
    deleteNotify();
    const wishListResponse = await getToWishListPage(userId);
    setwishListProduct(wishListResponse.data);
  };

  const removeWishListOnAddtoCart = async (wishlistObj, code) => {
    const wishlistName = wishlistObj.name;
    const response = await deleteWishListPage(userId, wishlistName, code);
    const wishListResponse = await getToWishListPage(userId);
    setwishListProduct(wishListResponse.data);
  };

  const onAddToBag = (wishlistObj, productCode, quantity, userId) => {
    const response = addToCartPage(productCode, quantity, userId);
    response.then(function (result) {
      if (result.status == 200 && result.data.error != 400) {
        addCartNotify();
        const cartUpdate = isNaN(context.cart.entries)
          ? 1
          : 1 + context.cart.entries;
        context.updateCart({ entries: cartUpdate });
        removeWishListOnAddtoCart(wishlistObj, productCode);
      }
    });
  };

  return (
    <Fragment>
      <Head>
        <title>Express Commerce - My Account</title>
      </Head>
      <div className="container max-w-7xl pt-12 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col w-full px-0 mx-auto md:flex-row">
          <div className="flex flex-col w-full ml-0 lg:w-2/6">
            <Sidebar />
          </div>
          <div className="flex flex-col md:w-full">
            <h2 className="text-base font-bold leading-7 mb-4 text-gray-900 sm:text-xl sm:truncate">
              Wish List Details
            </h2>
            {wishListProduct != null &&
              wishListProduct.map((wishlistItem) => {
                return (
                  <div key={wishlistItem.code}>
                    {wishlistItem.products != "" && (
                      <p className="wishlistName">
                        Wishlist Name<span>{wishlistItem.name}</span>
                      </p>
                    )}
                    {wishlistItem.products != "" &&
                      wishlistItem.products.map((item, index) => {
                        return (
                          <ul className="wishListItem" key={index}>
                            <li className="flex py-6">
                              <div className="h-32 w-32 flex-shrink-0 overflow-hidden">
                                <img src={item.media.main} alt={item.title} />
                              </div>

                              <div className="ml-4 flex flex-1 flex-col">
                                <div className="flex justify-between text-base font-bold">
                                  <h3>
                                    <Link href={`/product/${item.code}`}>
                                      <a> {item.title} </a>
                                    </Link>
                                  </h3>
                                </div>
                                <p className="mt-1 text-sm">
                                  {item.description}
                                </p>
                                <p className="mt-1 text-sm">
                                  {item.price.formattedValue}
                                </p>
                                <p className="mt-1 text-sm">
                                  Stock Available: {item.stock.stockLevel}
                                </p>
                                <div className="action-field flex mt-4">
                                  <div
                                    className="delete"
                                    onClick={() =>
                                      wishlistDeleteClick(
                                        wishlistItem,
                                        item.code
                                      )
                                    }
                                  >
                                    <svg
                                      className="h-8 w-8 text-gray-500"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    >
                                      {" "}
                                      <polyline points="3 6 5 6 21 6" />{" "}
                                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />{" "}
                                      <line x1="10" y1="11" x2="10" y2="17" />{" "}
                                      <line x1="14" y1="11" x2="14" y2="17" />
                                    </svg>
                                  </div>
                                  <div className="add-to-cart ml-4">
                                    <button
                                      onClick={() =>
                                        onAddToBag(
                                          wishlistItem,
                                          item.code,
                                          1,
                                          userId
                                        )
                                      }
                                      className="btn-default rounded-full text-sm justify-center text-white px-6"
                                    >
                                      Add to Cart
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </li>
                          </ul>
                        );
                      })}
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      <Toaster
        position="top-center"
        toastOptions={{ className: "success-toast", duration: 5000 }}
      />
      <Footer />
    </Fragment>
  );
}
