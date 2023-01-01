import "react-responsive-carousel/lib/styles/carousel.min.css";
//import { Carousel } from "react-responsive-carousel";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const responsive = {
  superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1
  },
  desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1
  },
  tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
  },
  mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
  }
};

function BannerCarousel() {
  return (
    <Carousel className="main-banner-slider" autoPlay responsive={responsive}>
      <div>
        <img src="/carousal_1.jpg" alt="image1" />
      </div>
      <div>
        <img src="/carousal_2.jpg" alt="image2" />
      </div>
      <div>
        <img src="/carousal_3.jpg" alt="image3" />
      </div>
      <div>
        <img src="/carousal_4.jpg" alt="image4" />
      </div>
    </Carousel>
  );
}

export default BannerCarousel;
