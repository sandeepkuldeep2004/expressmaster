//import React from 'react';
import React, { useState, useEffect } from 'react';
import styles from "./sellingProduct.module.css"
import Carousel from 'react-multi-carousel';
import Link from 'next/link';
import { getTopSellingProduct } from "../../pages/api/homepage";
import 'react-multi-carousel/lib/styles.css';
//import { getTopSellingProduct } from "../api/homepage";

const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 1500 },
        items: 5
    },
    desktop: {
        breakpoint: { max: 1499, min: 1024 },
        items: 4
    },
    tablet: {
        breakpoint: { max: 1023, min: 481 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 480, min: 0 },
        items: 1
    }
};

export default function SellingProduct() {
    const [topCellingProduct, setTopCellingProduct] = useState([]);
    const [topCellingTitle, setTopCellingTitle] = useState([]);
    
    useEffect(() => {
        const getTopSellingData = async () => {
          const response = await getTopSellingProduct();
          const topCellingProduct = response.data;
          setTopCellingTitle(topCellingProduct.title);
          setTopCellingProduct(topCellingProduct.products);
        };
        getTopSellingData();
    }, []);
      
    return (
        <div className={styles.featureProduct + ' featureProduct'}  >
            <div className="mx-auto">
                <h2 className="sectiontitle md:text-3xl"><span>{topCellingTitle}</span></h2>
                <Carousel className='pb-5' responsive={responsive}>
                    {topCellingProduct!=null &&
                        topCellingProduct.map((productItem) => (
                            <div className="col" key={productItem.code}>
                                <Link href={`/product/${productItem.code}`}>
                                <div className="product-default relative shadow">
                                    <p className="onlyonline">Exclusive Online</p>
                                    <figure>
                                        <img src={`${productItem.images}`} />
                                    </figure>
                                    <div className="product-details p-4">
                                        <div className="p-name">{productItem.title}</div>
                                        <div className="price-rating flex justify-between">
                                            <div className="left"><span>{productItem.price.formattedValue}</span></div>
                                            <div className="right">
                                                {
                                                    (() => {
                                                        if (productItem.productReviews.rate === 0) {
                                                            return (
                                                                <div className="star-rating">
                                                                    <i className='ti-star active'></i>
                                                                    <i className='ti-star'></i>
                                                                    <i className='ti-star'></i>
                                                                    <i className='ti-star'></i>
                                                                    <i className='ti-star'></i>
                                                                </div>
                                                            )
                                                        } else if (productItem.productReviews.rate === 1) {
                                                            return (
                                                                <div className="star-rating">
                                                                    <i className='ti-star active'></i>
                                                                    <i className='ti-star active'></i>
                                                                    <i className='ti-star'></i>
                                                                    <i className='ti-star'></i>
                                                                    <i className='ti-star'></i>
                                                                </div>
                                                            )
                                                        }else if (productItem.productReviews.rate === 2) {
                                                            return (
                                                                <div className="star-rating">
                                                                    <i className='ti-star active'></i>
                                                                    <i className='ti-star active'></i>
                                                                    <i className='ti-star active'></i>
                                                                    <i className='ti-star'></i>
                                                                    <i className='ti-star'></i>
                                                                </div>
                                                            )
                                                        } else {
                                                            return (
                                                                <div className="star-rating">
                                                                    <i className='ti-star active'></i>
                                                                    <i className='ti-star active'></i>
                                                                    <i className='ti-star active'></i>
                                                                    <i className='ti-star active'></i>
                                                                    <i className='ti-star active'></i>
                                                                </div>
                                                            )
                                                        }
                                                    })()
                                                }
                                            </div>
                                        </div>
                                        <button type="button" className="add-to-cart-btn mr-2 mb-2 hidden"><i className='ti-shopping-cart mr-2'></i>ADD TO CART</button>
                                    </div>
                                </div>
                                </Link>
                            </div>

                        ))
                    }

                </Carousel>
            </div>
        </div>

    );

}

