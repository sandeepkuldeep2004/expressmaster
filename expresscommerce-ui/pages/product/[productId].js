import React, { useState, useEffect, Fragment } from "react";
import * as DOMPurify from 'dompurify';
import parse from 'html-react-parser';
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import { useAppContext } from "../../components/util/contextState";

import { getProductPage } from "../api/productPage";
import { addToCartPage  } from "../api/cartPage";

import Footer from "../../components/Footer";
import ProductDetails from "../../components/ProductDisplay/ProductDetails";
import ProductDetailsNav from "../../components/ProductDisplay/ProductDetailsNav";
import ProductDetailsWishlist from "../../components/ProductDisplay/ProductDetailsWishlist";
import ProductDetailsSize from "../../components/ProductDisplay/ProductDetailsSize";

function Product() {
  const context = useAppContext();
  const router = useRouter();
  const [pageData, setPageData] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const productCode = router.query.productId;
  const userID = context.user.email;

  useEffect(() => {
    const apiCalls = async () => {
      const response = await getProductPage(
        productCode,
        context.user.accessToken
      );
      setPageData(response.data);
    };
    apiCalls();
  }, [productCode]);

  const mainProduct =
    pageData &&
    Array.isArray(pageData) &&
    pageData.length > 0 &&
    pageData.find((pdt) => pdt.code === productCode);
  //const media = mainProduct.medias && Array.isArray(mainProduct.medias) && mainProduct.medias.length > 0 && mainProduct.medias.sort((a, b) => a.priority - b.priority).shift()
  const media =
    mainProduct.medias &&
    Array.isArray(mainProduct.medias) &&
    mainProduct.medias.length > 0 &&
    mainProduct.medias.find((media) => media.priority > 0);
  let mainImage;
  let thumbnail;

  if (media) {
    mainImage = media.main;
    thumbnail = media.thumbnail;
  }
  const onAddToBag = (event) => {
    event.preventDefault();
    const response = addToCartPage(productCode, quantity, userID);
    response.then(function (result) {
      if (userID == undefined && result.data.error == 400) {
        context.updateUser({ resolvedUrl: "/product/" + productCode });
        alert("Customer Not Found, Please Login");
        router.push("/signin");
      } else if (userID != undefined && result.data.error == 400) {
        alert(result.data.message);
      } else if (result.status == 200 && result.data.error != 400) {
        const cartUpdate = isNaN(context.cart.entries)
          ? 1
          : 1 + context.cart.entries;
        context.updateCart({ entries: cartUpdate });
        router.push("/cart");
      }
    });
  };

  let updateQuantity = (e) => {
    let quantity = Number(e.target.value) ? Number(e.target.value) : 1;
    setQuantity(quantity);
  };

  let variantLink = (link) => {
    router.push(link);
  };
  return mainProduct ? (
    <Fragment>
      <Head>
        <title>Express Commerce - {mainProduct.name}</title>
      </Head>
      <div className="bg-white">
        <div className="pt-6">
          <ProductDetailsNav name={mainProduct.name} />

          {/* <!-- Product info --> */}
          <div className="container mx-auto">
            <div className="mx-auto pdp-details grid grid-cols-5 gap-4">
              <div className="product-single-gallery col-span-2 pr-8">
                {/* <!-- Description and details -->onClick={onAddToWishList} */}
                <div className="aspect-w-3 aspect-h-4 overflow-hidden lg:block">
                  <ProductDetailsWishlist productCode={productCode} />
                  {/* <img src={mainProduct.mainImage} alt="Model wearing plain white basic tee." className="w-full h-full object-center object-cover"/> */}
                  <div className="flex flex-wrap justify-center product-slider-container">
                    <img
                      src={mainImage}
                      className="w-100 bg-white"
                      alt={mainProduct.name}
                    />
                  </div>
                  <div className="prod-thumbnail">
                    <img
                      src={thumbnail}
                      className="p-1 bg-white  max-w-sm"
                      alt={mainProduct.name}
                    />
                  </div>
                </div>
                {/* <div>
                  <h3 className="sr-only">Description</h3>


                  <div className="space-y-6">
                    <p className="text-base text-gray-900">
                      {mainProduct.description}
                    </p>
                  </div>
                </div> */}
              </div>
              {/* <!-- Options --> */}
              <div className="product-single-details col-span-3 pl-4">
                <h1 className="main-title m-0">{mainProduct.name}</h1>
                {/* <!-- Reviews --> */}
                <div className="review-section">
                  <h3 className="sr-only">Reviews</h3>
                  <div className="flex items-center">
                    <div className="flex items-center">
                      {Array.from(
                        Array(Math.ceil(mainProduct.productReviews.rate)),
                        (e, i) => {
                          return (
                            <svg
                              key={i}
                              className="text-gray-900 active h-5 w-5 flex-shrink-0"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          );
                        }
                      )}
                    </div>
                    <p className="sr-only">4 out of 5 stars</p>
                    <a href="#" className="review-text">
                      ({mainProduct.productReviews.total} reviews)
                    </a>
                  </div>
                </div>
                <hr className="short-divider" />
                <div className="price-list">
                  {mainProduct.price.formattedValue}
                </div>
                <h2 className="sr-only">Product information</h2>
                <p className="artile-number">
                  Article Number: {mainProduct.code}
                </p>
                <p className="base-product-ref">
                  Base Product Ref:{" "}
                  <Link
                    href={mainProduct.baseProduct}
                    aria-current="page"
                    className="font-light m-2 text-green-500 hover:text-blue-800"
                  >
                    {mainProduct.baseProduct}
                  </Link>
                </p>
                <div className="mt-2 highlights">
                  <h3 className="">Highlights </h3>

                  <div className="mt-2">
                    <ul role="list" className="list-disc list">
                      <li className="list-item">Hand cut and sewn locally</li>
                      <li className="list-item">
                        Dyed with our proprietary colors
                      </li>
                      <li className="list-item">Pre-washed &amp; pre-shrunk</li>
                      <li className="list-item">Ultra-soft 100% cotton</li>
                    </ul>
                  </div>
                </div>
                <div className="details">
                  <h2>Details</h2>
                  <p className="">{parse(mainProduct.description)}</p>
                </div>

                <div className="colors-details mt-5">
                  {/* <!-- Colors --> */}
                  <div>
                    <h3 className="color-title">Color</h3>

                    <fieldset>
                      <legend className="sr-only">Choose a color</legend>
                      <div className="flex items-center space-x-3">
                        {mainProduct.variantOptions &&
                        mainProduct.variantOptions.length > 0
                          ? mainProduct.variantOptions.map((variant, index) => (
                              <label
                                key={variant.code}
                                className="-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none ring-gray-400"
                              >
                                <input
                                  onClick={() => variantLink(variant.code)}
                                  type="radio"
                                  name="color-choice"
                                  value="White"
                                  className="sr-only"
                                  aria-labelledby={`color-choice-${index}-label`}
                                />
                                <span
                                  id={`color-choice-${index}-label`}
                                  className="sr-only"
                                >
                                  {" "}
                                  {variant.color.toLowerCase()}{" "}
                                </span>
                                <span
                                  aria-hidden="true"
                                  className={`h-8 w-8 bg-${variant.color.toLowerCase()}-500 border border-black border-opacity-10 rounded-full`}
                                ></span>
                              </label>
                            ))
                          : mainProduct.baseOptions &&
                            mainProduct.baseOptions.length > 0
                          ? mainProduct.baseOptions.map((variant) =>
                              variant.options.map((variantOption, index) => (
                                <label
                                  key={variantOption.code}
                                  className="-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none ring-gray-400"
                                >
                                  <input
                                    onClick={() =>
                                      variantLink(variantOption.code)
                                    }
                                    type="radio"
                                    name="color-choice"
                                    value="White"
                                    className="sr-only"
                                    aria-labelledby={`color-choice-${index}-label`}
                                  />
                                  <span
                                    id={`color-choice-${index}-label`}
                                    className="sr-only"
                                  >
                                    {" "}
                                    {variantOption.color}{" "}
                                  </span>
                                  <span
                                    aria-hidden="true"
                                    className={`h-8 w-8 bg-${variantOption.color.toLowerCase()}-500 border border-black border-opacity-10 rounded-full`}
                                  ></span>
                                </label>
                              ))
                            )
                          : null}
                        {/* <label className="-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none ring-gray-400">
                        <input type="radio" name="color-choice" value="White" className="sr-only" aria-labelledby="color-choice-0-label" />
                        <span id="color-choice-0-label" className="sr-only"> {" "} White{" "} </span>
                        <span aria-hidden="true" className="h-8 w-8 bg-white border border-black border-opacity-10 rounded-full" ></span>
                      </label> */}
                      </div>
                    </fieldset>
                    {/* <ul>

                    Product Variant Options: <p>{
                      mainProduct.variantOptions && mainProduct.variantOptions.length > 0 ?
                        mainProduct.variantOptions
                          .map(variant =>
                            <li><a
                              href={variant.code}
                              aria-current="page"
                              className="font-light m-2 text-gray-500 hover:text-gray-600"
                            >
                              {variant.color}-{variant.code}-{variant.size}
                            </a>
                            </li>
                          )
                        :
                        mainProduct.baseOptions && mainProduct.baseOptions.length > 0 ?
                          mainProduct.baseOptions.
                            map(variant =>
                              variant.options.map(variantOption =>
                                <li><a
                                  href={variantOption.code}
                                  aria-current="page"
                                  className="font-light m-2 text-gray-500 hover:text-gray-600"
                                >
                                  {variantOption.color}-{variantOption.code}-{variantOption.size}
                                </a>
                                </li>
                              )
                            )
                          : null
                    }
                    </p>
                  </ul> */}
                  </div>

                  {/* <!-- Sizes --> */}
                  <ProductDetailsSize />
                </div>
                <hr />
                {mainProduct.stock && mainProduct.stock.stockLevel > 0 ? (
                  <div>
                    <form onSubmit={onAddToBag} className="addtobag-form flex">
                      <input
                        type="number"
                        onChange={updateQuantity}
                        min="1"
                        max={mainProduct.stock.stockLevel}
                        className="addtobag-input"
                        placeholder="Quantity(Default 1)"
                      />
                      <button type="submit" className="rounded  btn-default">
                        Add to bag
                      </button>
                    </form>
                    <p className="stock">
                      Stock Available: {mainProduct.stock.stockLevel}
                    </p>
                  </div>
                ) : (
                  <button
                    type="button"
                    className="mt-10 btn-default opacity-50 cursor-not-allowed"
                  >
                    Out of Stock
                  </button>
                )}
                <hr />
              </div>
            </div>
          </div>

          <ProductDetails />
        </div>

        <Footer />
      </div>{" "}
    </Fragment>
  ) : (
    <div>{/*<h1>Product not found!!</h1>*/}</div>
  );
}

export default Product;
