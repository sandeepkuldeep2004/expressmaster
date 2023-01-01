import { useRouter } from "next/router";
import { getCategoryPage } from "../../api/categoryPage";
import { useState, useEffect, Fragment } from "react";
import Head from "next/head";
import ProductGrid from "../../../components/ProductListing/ProductGrid";
import Footer from "../../../components/Footer";

export default function Category() {
  const router = useRouter();
  const [pageData, setPageData] = useState([]);
  const categoryCode = router.query.categoryId;
  
  useEffect(() => {
    if(categoryCode != undefined){
      const apiCalls = async () => {
        const response = await getCategoryPage(categoryCode);
        setPageData(response.data);
      }
    apiCalls();};
  }, [categoryCode]);

  return (
    <Fragment>
      <Head>
        <title>Express Commerce - {router.query.categoryName}</title>
      </Head>

      <div className="bg-white">
        <div className="mx-auto px-8 lg:max-w-7xl categories-item container">
          <h2 className="main-title">
            {router.query.categoryName}
          </h2>

          <ProductGrid listdata={pageData} />
        </div>
      </div>

      <Footer/>
    </Fragment>
  );
}
