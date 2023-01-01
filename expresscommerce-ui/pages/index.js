import { Fragment } from "react";
import Head from "next/head";
import BannerCarousel from "../components/Banner/BannerCarousel";
import Footer from "../components/Footer";
import FeatureProduct from "../components/FeatureProducts/FeatureProduct";
import CategoriesCarousel from "../components/CategoriesCarousel/CategoriesCarousel";
import SellingProduct from "../components/SellingProducts/SellingProduct";
import BrandCarousel from "../components/BrandProducts/BrandProducts";
export default function HomePage() {
  return (
    <Fragment>
      <Head>
        <title>Express Commerce</title>
      </Head>
     <div className="main-content">
      <div>
        <BannerCarousel />
      </div>
      <div className="categoriesProducts">
      <CategoriesCarousel/>
      </div>
     
      <FeatureProduct/>
     <SellingProduct/>
     <BrandCarousel />
      <Footer/>
      </div>
    </Fragment>
  );
}
