import { useRouter } from "next/router";
import { getBrandPage, getImageByBrand } from "../api/brandPage";
import { useState, useEffect, Fragment } from "react";
import Head from "next/head";
import BrandGrid from "../../components/ProductListing/BrandGrid";
import Footer from "../../components/Footer";
import BrandImageCarousel from "../../components/Banner/BrandImages"

export default function BrandProduct() {
  const router = useRouter();
  const [pageData, setPageData] = useState([]);
  const [brandData, setbrandData] = useState([]);
  const brandName = router.query.brandpage;
  
  useEffect(() => {
    if(brandName != undefined){
      const apiCalls = async () => {
        console.log("parameter : "+brandName)
        const response = await getBrandPage(brandName);
        setPageData(response.data);

        const response_brandimage= await getImageByBrand(brandName);
        console.log("this is the brand images",response_brandimage.data)
        setbrandData(response_brandimage.data);

      }
    apiCalls();};
  }, [brandName]);

  return (
    <Fragment>
      <Head>
        <title>Express Commerce - </title>
      </Head>
      
      <div className="bg-white">
        <div className="mx-auto px-8 lg:max-w-7xl container">
          <h2 className="main-title">
            {router.query.brandName}
          </h2>
          <BrandImageCarousel brandData={brandData}/>
          <BrandGrid listdata={pageData} />
        </div>
      </div>

      <Footer/>
    </Fragment>
  );
}
