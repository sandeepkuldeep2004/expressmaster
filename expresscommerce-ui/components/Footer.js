import React from 'react'
import classes from "./footer.module.css"

export default function Footer() {
  return (
    <footer className={classes.footerPanel}>
        <div className="px-10 py-10 mx-auto">
          <div className="flex flex-wrap md:text-leftr order-first">
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-bold text-lg mb-3 text-white">
              SUPPORT
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <a className="text-white">Contact our Stores</a>
                </li>
                <li>
                  <a className="text-white">Delivery</a>
                </li>
               
              </nav>
            </div>
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-bold text-lg mb-3 text-white">
              OUR SERVICES
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <a className="text-white">Express Commerce for Schools</a>
                </li>
                <li>
                <a className="text-white">Express Commerce for Corporates</a>
                </li>
                <li>
                <a className="text-white">Express Commerce for  Sport Clubs</a>
                </li>
                <li>
                <a className="text-white">Express Commerce for Gift Cards</a>
                </li>
                <li>
                <a className="text-white">Installation & Assembly Services</a>
                </li>
              </nav>
            </div>
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-bold text-lg mb-3 text-white">
              ABOUT US
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <a className="text-white">Who we are</a>
                </li>
                <li>
                  <a className="text-white">Careers</a>
                </li>
                <li>
                  <a className="text-white">Newsroom</a>
                </li>
                <li>
                  <a className="text-white">Made In India</a>
                </li>
              </nav>
            </div>
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-bold text-lg mb-3 text-white">
              LEGAL
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <a className="text-white">Return Policy</a>
                </li>
                <li>
                  <a className="text-white">Terms and Conditions</a>
                </li>
                <li>
                  <a className="text-white">Privacy Policy</a>
                </li>
              </nav>
            </div>
          </div>
        </div>
        <div className={classes.footerBottom}>
          <div className="container-fluid px-8 py-6 mx-auto flex items-center sm:flex-row flex-col">
          
            <p className="text-sm text-white sm:mt-0 mt-4">
              &copy; 2022 Xpress Commerce. All rights reserved.
            </p>
            <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
         <a className='ml-5' href="#"><i className='ti-facebook text-white'></i></a>
         <a className='ml-5' href="#"><i className='ti-twitter text-white'></i></a>
         <a className='ml-5' href="#"><i className='ti-youtube text-white'></i></a>
         <a className='ml-5' href="#"><i className='ti-linkedin text-white'></i></a>
         <a className='ml-5' href="#"><i className='ti-instagram text-white'></i></a>
              </span>
          </div>
        </div>
      </footer>

  )
}
