import Link from "next/link";
import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { getBrandProduct } from "../../pages/api/homepage";
const responsive1 = {
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



export default function BrandCarousel() {
    const [brandProduct, setBrandProduct] = useState([]);

    useEffect(() => {
    const getBrandData = async () => {
      const response = await getBrandProduct();
      const brandProduct = response.data;
      setBrandProduct(brandProduct);
    };
    getBrandData();
    }, [brandProduct]);

    return (
        <>
        <div className='brand-item'>
         <h2 className="sectiontitle md:text-3xl"><span>BROWSE OUR BRANDS</span></h2> 
        <Carousel className='pb-5' responsive={responsive1}>
        {brandProduct ? brandProduct.map((brandItem, index) => {
    return (
      <div className="card" key={index}>
      <Link href={`/brand/${brandItem.name}`}>
       <a>
        <img className="card-img-top"
          src={brandItem.logo}
        />
         <span className="c-title">{brandItem.name}</span>
        </a>
        </Link>
      </div>
    );
  }) : <div />}

   
        </Carousel>
        </div>
        </>
    );

}
