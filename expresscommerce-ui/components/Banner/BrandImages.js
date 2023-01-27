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

function BrandImageCarousel(props) {
    console.log("This is props", props.brandData[0])
    return (
        <Carousel className="main-banner-slider" autoPlay responsive={responsive}>
            {props.brandData && props.brandData.map((brandDataItem, index1) => (
                <>
                    {brandDataItem.brandImages!=undefined && brandDataItem.brandImages.map((brandimage, index2)=>{
                       if(index1==index2){
                       return <div><img src={`http://localhost:5000${brandimage}`} alt={`image${index2}`} /> </div>   
                       }  
                    })}
                  
                </>
            ))}

        </Carousel>
    );
}

export default BrandImageCarousel;
