import React from 'react'
import styles from "./featureProduct.module.css"
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

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

export default function FeatureProduct() {
    return (
        <div className={styles.featureProduct + ' featureProduct'}  >
        <div className="mx-auto">
        <h2 className="sectiontitle md:text-3xl"><span>FEATURED PRODUCTS</span></h2>
        <Carousel className='pb-5' responsive={responsive}>
       
        <div className="col">
            <div className="product-default relative shadow">
            <p className="onlyonline">Exclusive Online</p>
                <figure>
                    <img src="images/p1976158.jpg" />
                </figure>
                <div className="product-details p-4">
                    
                    <div className="p-name">Men's Hiking Shorts - NH550</div>
                    <div className="price-rating flex justify-between">
                        <div className="left"><span>₹ 259.00</span></div>
                        <div className="right">
                            <span className="star-rating">
                                <i className='ti-star active'></i>
                                <i className='ti-star active'></i>
                                <i className='ti-star'></i>
                                <i className='ti-star'></i>
                            </span>
                        </div>
                    </div>
                    <button type="button" className="add-to-cart-btn mr-2 mb-2 hidden"><i className='ti-shopping-cart mr-2'></i>ADD TO CART</button>

                </div>
            </div>
        </div>
        <div className="col">
            <div className="product-default relative shadow">
            <p className="limitedstock">Limited Stock </p>
                <figure>
                    <img src="images/p2142676.jpg" />
                </figure>
                <div className="product-details p-4">
                    <div className="p-name">Men's T-Shirt SG-100 Brown Deer</div>
                    <div className="price-rating flex justify-between">
                        <div className="left"><span>₹ 650.00</span></div>
                        <div className="right">
                            <span className="star-rating">
                                <i className='ti-star active'></i>
                                <i className='ti-star active'></i>
                                <i className='ti-star'></i>
                                <i className='ti-star'></i>
                            </span>
                        </div>
                    </div>
                    <button type="button" className="add-to-cart-btn mr-2 mb-2 hidden"><i className='ti-shopping-cart mr-2'></i>ADD TO CART</button>

                </div>
            </div>
        </div>
        <div className="col">
            <div className="product-default relative shadow">
            <p className="clearance">clearance </p>
                <figure>
                    <img src="images/p1242428.jpg" />
                </figure>
                <div className="product-details p-4">
                    
                    <div className="p-name">Swimming Goggles Lenses Black</div>
                    <div className="price-rating flex justify-between">
                        <div className="left"><span>₹ 999.00</span></div>
                        <div className="right">
                            <span className="star-rating">
                                <i className='ti-star active'></i>
                                <i className='ti-star active'></i>
                                <i className='ti-star'></i>
                                <i className='ti-star'></i>
                            </span>
                        </div>
                    </div>
                    <button type="button" className="add-to-cart-btn mr-2 mb-2 hidden"><i className='ti-shopping-cart mr-2'></i>ADD TO CART</button>

                </div>
            </div>
        </div>
        <div className="col">
            <div className="product-default relative shadow">
            <p className="limitedstock">Limited Stock </p>
                <figure>
                    <img src="images/p1257538.avif" />
                </figure>
                <div className="product-details p-4">
                    
                    <div className="p-name">RUN ACTIVE WOMEN'S JOGGING SHOES BURGUNDY PINK</div>
                    <div className="price-rating flex justify-between">
                        <div className="left"><span>₹ 1599.00</span></div>
                        <div className="right">
                            <span className="star-rating">
                                <i className='ti-star active'></i>
                                <i className='ti-star active'></i>
                                <i className='ti-star'></i>
                                <i className='ti-star'></i>
                            </span>
                        </div>
                    </div>
                    <button type="button" className="add-to-cart-btn mr-2 mb-2 hidden"><i className='ti-shopping-cart mr-2'></i>ADD TO CART</button>

                </div>
            </div>
        </div>
        <div className="col">
            <div className="product-default relative shadow">
                <figure>
                    <img src="images/p2193947.avif" />
                </figure>
                <div className="product-details p-4">
                    <span className='offer-discount'>-10%</span>
                    <div className="p-name">Cycle Bell Black</div>
                    <div className="price-rating flex justify-between">
                        <div className="left"><span>₹ 259.00</span></div>
                        <div className="right">
                            <span className="star-rating">
                                <i className='ti-star active'></i>
                                <i className='ti-star active'></i>
                                <i className='ti-star'></i>
                                <i className='ti-star'></i>
                            </span>
                        </div>
                    </div>
                    <button type="button" className="add-to-cart-btn mr-2 mb-2 hidden"><i className='ti-shopping-cart mr-2'></i>ADD TO CART</button>

                </div>
            </div>
        </div>
        <div className="col">
            <div className="product-default relative shadow">
                <figure>
                    <img src="images/p1931119.avif" />
                </figure>
                <div className="product-details p-4">
                    <span className='offer-discount'>-10%</span>
                    <div className="p-name">SHORTS 530 W NAVY</div>
                    <div className="price-rating flex justify-between">
                        <div className="left"><span>₹ 259.00</span></div>
                        <div className="right">
                            <span className="star-rating">
                                <i className='ti-star active'></i>
                                <i className='ti-star active'></i>
                                <i className='ti-star'></i>
                                <i className='ti-star'></i>
                            </span>
                        </div>
                    </div>
                    <button type="button" className="add-to-cart-btn mr-2 mb-2 hidden"><i className='ti-shopping-cart mr-2'></i>ADD TO CART</button>

                </div>
            </div>
        </div>
        <div className="col">
            <div className="product-default relative shadow">
                <figure>
                    <img src="images/p2351413.avif" />
                </figure>
                <div className="product-details p-4">
                    <span className='offer-discount'>-10%</span>
                    <div className="p-name">Kids' Basic Inline Skates Play 5 Red Black</div>
                    <div className="price-rating flex justify-between">
                        <div className="left"><span>₹ 2559.00</span></div>
                        <div className="right">
                            <span className="star-rating">
                                <i className='ti-star active'></i>
                                <i className='ti-star active'></i>
                                <i className='ti-star'></i>
                                <i className='ti-star'></i>
                            </span>
                        </div>
                    </div>
                    <button type="button" className="add-to-cart-btn mr-2 mb-2 hidden"><i className='ti-shopping-cart mr-2'></i>ADD TO CART</button>

                </div>
            </div>
        </div>
        <div className="col">
            <div className="product-default relative shadow">
            <p className="limitedstock">sale</p>
                <figure>
                    <img src="images/p1971150.avif" />
                </figure>
                <div className="product-details p-4">
                   
                    <div className="p-name">Football Backpack Bag 35L - Sky Blue</div>
                    <div className="price-rating flex justify-between">
                        <div className="left"><span>₹ 2499.00</span></div>
                        <div className="right">
                            <span className="star-rating">
                                <i className='ti-star active'></i>
                                <i className='ti-star active'></i>
                                <i className='ti-star'></i>
                                <i className='ti-star'></i>
                            </span>
                        </div>
                    </div>
                    <button type="button" className="add-to-cart-btn mr-2 mb-2 hidden"><i className='ti-shopping-cart mr-2'></i>ADD TO CART</button>

                </div>
            </div>
        </div>
      
       
        </Carousel>
      </div>
      </div>
    
    );
    
  }

