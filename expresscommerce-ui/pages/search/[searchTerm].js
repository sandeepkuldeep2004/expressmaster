import { useRouter } from "next/router";
import { getSearchPage } from "../api/searchPage";
import { useState, useEffect, Fragment } from "react";
import Head from "next/head";
import ProductGrid from "../../components/ProductListing/ProductGrid";
import Footer from "../../components/Footer";

export default function SearchPage() {
  const router = useRouter();
  const [pageData, setPageData] = useState([]);
  const searchText = router.query.searchTerm;
  useEffect(() => {
    const apiCalls = async () => {
      const response = await getSearchPage(searchText);
      setPageData(response.data);
    };
    apiCalls();
  }, [searchText]);

  return (
    <Fragment>
      <Head>
        <title>Express Commerce - {searchText}</title>
      </Head>

      <div className="bg-white">
        <div className="mx-auto lg:max-w-7xl categories-item px-8 container">
          <h2 className="main-title">
            Search result for '{searchText}'
          </h2>

          <ProductGrid listdata={pageData} />
        </div>
      </div>

      <Footer/>
    </Fragment>
  );
}
