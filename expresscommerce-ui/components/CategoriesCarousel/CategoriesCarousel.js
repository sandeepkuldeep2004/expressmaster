import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import React from 'react'

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

export default function CategoriesCarousel() {
    return (
        <>
        <h2 className="sectiontitle md:text-3xl"><span>BROWSE OUR CATEGORIES</span></h2>
        <Carousel className='pb-5' partialVisible={true} responsive={responsive}>
            <div>
                <div className="card">
                    <img className="card-img-top" src="../images/bermudas mini both.jpg" alt="" />
                    <div className="card-body">
                        <p className="c-title">Outdoor Sports</p>

                    </div>
                   
                </div>
            </div>
            <div>
                <div className="card">
                    <img className="card-img-top" src="../images/men-mini-banner.jpg" alt="" />
                    <div className="card-body">
                        <p className="c-title">Running and Walking</p>

                    </div>
                  
                </div>
            </div>
            <div>
                <div className="card">
                    <img className="card-img-top" src="../images/gym-bags.jpg" alt="" />
                    <div className="card-body">
                        <p className="c-title">Fitness Sports</p>

                    </div>
                   
                </div>
            </div>
            <div>
                <div className="card">
                    <img className="card-img-top" src="../images/ARTENGO-TTS900-DRY-LIGHT-H-BLANC.jpg" alt="" />
                    <div className="card-body">
                        <p className="c-title">Racket Sports</p>

                    </div>
                   
                </div>
            </div>
            <div>
                <div className="card">
                    <img className="card-img-top" src="../images/kipsta-f950-fifa-pro-taille-5-color-effect.jpg" alt="" />
                    <div className="card-body">
                        <p className="c-title">Team Sports</p>

                    </div>
                    
                </div>
            </div>
            <div>
                <div className="card">
                    <img className="card-img-top" src="../images/NABAIJI-panoplie-AH19.jpg" alt="" />
                    <div className="card-body">
                        <p className="c-title">Water Sports</p>

                    </div>
                   
                </div>
            </div>
            <div>
                <div className="card">
                    <img className="card-img-top" src="../images/bow-four-banner.jpg" alt="" />
                    <div className="card-body">
                        <p className="c-title">Target Sports</p>

                    </div>
                   
                </div>
            </div>
                   
                    
        </Carousel>
        </>
    );

}