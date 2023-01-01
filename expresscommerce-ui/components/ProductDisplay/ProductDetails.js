import { useState } from "react";

export default function ProductDetails() {
  const [openTab, setOpenTab] = useState(1);
  return (
    <div className="mt-6 mx-auto container product-single-tabs">
      <div className="flex flex-wrap  product-single-tabs">
        <div className="w-full specification-panel">
          <ul
            className="flex mb-0 list-none flex-wrap flex-row nav nav-tabs"
            role="tablist"
          >
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "spec-nav-link " + (openTab === 1 ? "active" : "default")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(1);
                }}
                data-toggle="tab"
                href="#link1"
                role="tablist"
              >
                PRODUCT DETAILS
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "spec-nav-link " + (openTab === 2 ? "active" : "default")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(2);
                }}
                data-toggle="tab"
                href="#link2"
                role="tablist"
              >
                REVIEWS
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "spec-nav-link " + (openTab === 3 ? "active" : "default")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(3);
                }}
                data-toggle="tab"
                href="#link3"
                role="tablist"
              >
                TECHNICAL INFORMATION
              </a>
            </li>
          </ul>
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full">
            <div className="px-4 py-5 flex-auto">
              <div className="tab-content tab-space">
                <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                  <div className="detail-panel">
                    <h5>Made for</h5>
                    <p>
                      The lightest SPEED boot in town is here. It's fast by
                      nature due to its lightweight, rigid sole and thin upper.
                    </p>
                  </div>

                  <h5>Advantages</h5>
                  <p>
                    Collaboratively administrate empowered markets via
                    plug-and-play networks. Dynamically procrastinate B2C users
                    after installed base benefits.
                    <br />
                    <br /> Dramatically visualize customer directed convergence
                    without revolutionary ROI.
                  </p>
                  <p>
                    Collaboratively administrate empowered markets via
                    plug-and-play networks. Dynamically procrastinate B2C users
                    after installed base benefits.
                    <br />
                    <br /> Dramatically visualize customer directed convergence
                    without revolutionary ROI.
                  </p>
                  <p>
                    Collaboratively administrate empowered markets via
                    plug-and-play networks. Dynamically procrastinate B2C users
                    after installed base benefits.
                    <br />
                    <br /> Dramatically visualize customer directed convergence
                    without revolutionary ROI.
                  </p>
                </div>
                <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                  <div className="review-panel">
                    <article>
                      <div className="flex items-center mb-4 space-x-4">
                        <svg
                          className="h-16 w-16 text-gray-600"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          {" "}
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />{" "}
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                        <div className="space-y-1 font-medium dark:text-white">
                          <p>
                            Jese Leos{" "}
                            <time
                              dateTime="2014-08-16 19:00"
                              className="block text-sm text-gray-500 dark:text-gray-400"
                            >
                              Joined on August 2014
                            </time>
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center mb-1">
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5 text-yellow-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <title>First star</title>
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5 text-yellow-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <title>Second star</title>
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5 text-yellow-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <title>Third star</title>
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5 text-yellow-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <title>Fourth star</title>
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5 text-yellow-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <title>Fifth star</title>
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <h3 className="ml-2 text-sm font-semibold text-gray-900 dark:text-white">
                          Thinking to buy another one!
                        </h3>
                      </div>
                      <footer className="mb-5 text-sm text-gray-500 dark:text-gray-400">
                        <p>
                          Reviewed in the United Kingdom on{" "}
                          <time dateTime="2017-03-03 19:00">March 3, 2022</time>
                        </p>
                      </footer>
                      <p className="mb-2 font-light text-gray-500 dark:text-gray-400">
                        This is my third Invicta Pro Diver. They are just
                        fantastic value for money. This one arrived yesterday
                        and the first thing I did was set the time, popped on an
                        identical strap from another Invicta and went in the
                        shower with it to test the waterproofing.... No
                        problems.
                      </p>
                      <p className="mb-3 font-light text-gray-500 dark:text-gray-400">
                        It is obviously not the same build quality as those very
                        expensive watches. But that is like comparing a Citroën
                        to a Ferrari. This watch was well under £100! An
                        absolute bargain.
                      </p>
                      <a
                        href="#"
                        className="block mb-5 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                      >
                        Read more
                      </a>
                      <aside>
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          19 people found this helpful
                        </p>
                        <div className="flex items-center mt-3 space-x-3 divide-x divide-gray-200 dark:divide-gray-600">
                          <a
                            href="#"
                            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-xs px-2 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                          >
                            Helpful
                          </a>
                          <a
                            href="#"
                            className="pl-4 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                          >
                            Report abuse
                          </a>
                        </div>
                      </aside>
                    </article>
                    <article>
                      <div className="flex items-center mb-4 space-x-4">
                        <svg
                          className="h-16 w-16 text-gray-600"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          {" "}
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />{" "}
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                        <div className="space-y-1 font-medium dark:text-white">
                          <p>
                            Jese Leos{" "}
                            <time
                              dateTime="2014-08-16 19:00"
                              className="block text-sm text-gray-500 dark:text-gray-400"
                            >
                              Joined on August 2014
                            </time>
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center mb-1">
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5 text-yellow-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <title>First star</title>
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5 text-yellow-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <title>Second star</title>
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5 text-yellow-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <title>Third star</title>
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5 text-yellow-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <title>Fourth star</title>
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5 text-yellow-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <title>Fifth star</title>
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <h3 className="ml-2 text-sm font-semibold text-gray-900 dark:text-white">
                          Thinking to buy another one!
                        </h3>
                      </div>
                      <footer className="mb-5 text-sm text-gray-500 dark:text-gray-400">
                        <p>
                          Reviewed in the United Kingdom on{" "}
                          <time dateTime="2017-03-03 19:00">March 3, 2022</time>
                        </p>
                      </footer>
                      <p className="mb-2 font-light text-gray-500 dark:text-gray-400">
                        This is my third Invicta Pro Diver. They are just
                        fantastic value for money. This one arrived yesterday
                        and the first thing I did was set the time, popped on an
                        identical strap from another Invicta and went in the
                        shower with it to test the waterproofing.... No
                        problems.
                      </p>
                      <p className="mb-3 font-light text-gray-500 dark:text-gray-400">
                        It is obviously not the same build quality as those very
                        expensive watches. But that is like comparing a Citroën
                        to a Ferrari. This watch was well under £100! An
                        absolute bargain.
                      </p>
                      <a
                        href="#"
                        className="block mb-5 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                      >
                        Read more
                      </a>
                      <aside>
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          19 people found this helpful
                        </p>
                        <div className="flex items-center mt-3 space-x-3 divide-x divide-gray-200 dark:divide-gray-600">
                          <a
                            href="#"
                            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-xs px-2 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                          >
                            Helpful
                          </a>
                          <a
                            href="#"
                            className="pl-4 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                          >
                            Report abuse
                          </a>
                        </div>
                      </aside>
                    </article>
                    <article>
                      <div className="flex items-center mb-4 space-x-4">
                        <svg
                          className="h-16 w-16 text-gray-600"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          {" "}
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />{" "}
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                        <div className="space-y-1 font-medium dark:text-white">
                          <p>
                            Jese Leos{" "}
                            <time
                              dateTime="2014-08-16 19:00"
                              className="block text-sm text-gray-500 dark:text-gray-400"
                            >
                              Joined on August 2014
                            </time>
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center mb-1">
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5 text-yellow-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <title>First star</title>
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5 text-yellow-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <title>Second star</title>
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5 text-yellow-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <title>Third star</title>
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5 text-yellow-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <title>Fourth star</title>
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5 text-yellow-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <title>Fifth star</title>
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <h3 className="ml-2 text-sm font-semibold text-gray-900 dark:text-white">
                          Thinking to buy another one!
                        </h3>
                      </div>
                      <footer className="mb-5 text-sm text-gray-500 dark:text-gray-400">
                        <p>
                          Reviewed in the United Kingdom on{" "}
                          <time dateTime="2017-03-03 19:00">March 3, 2022</time>
                        </p>
                      </footer>
                      <p className="mb-2 font-light text-gray-500 dark:text-gray-400">
                        This is my third Invicta Pro Diver. They are just
                        fantastic value for money. This one arrived yesterday
                        and the first thing I did was set the time, popped on an
                        identical strap from another Invicta and went in the
                        shower with it to test the waterproofing.... No
                        problems.
                      </p>
                      <p className="mb-3 font-light text-gray-500 dark:text-gray-400">
                        It is obviously not the same build quality as those very
                        expensive watches. But that is like comparing a Citroën
                        to a Ferrari. This watch was well under £100! An
                        absolute bargain.
                      </p>
                      <a
                        href="#"
                        className="block mb-5 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                      >
                        Read more
                      </a>
                      <aside>
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          19 people found this helpful
                        </p>
                        <div className="flex items-center mt-3 space-x-3 divide-x divide-gray-200 dark:divide-gray-600">
                          <a
                            href="#"
                            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-xs px-2 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                          >
                            Helpful
                          </a>
                          <a
                            href="#"
                            className="pl-4 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                          >
                            Report abuse
                          </a>
                        </div>
                      </aside>
                    </article>
                  </div>
                </div>
                <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                  <table className="tech-info">
                    <tbody>
                      <tr>
                        <td className="pro-info">Quantity</td>
                        <td className="pro-info">1 U</td>
                      </tr>
                      <tr>
                        <td className="pro-info">Size</td>
                        <td className="pro-info">
                          UK/India 5.5, UK/India 6.5, UK/India 7, UK/India 8,
                          UK/India 8.5, UK/India 9, UK/India 10, UK/India 11,
                          UK/India 12, UK/India 12.5
                        </td>
                      </tr>
                      <tr>
                        <td className="pro-info">Weight</td>
                        <td className="pro-info">180g in size 9.</td>
                      </tr>
                      <tr>
                        <td className="pro-info">Sizes</td>
                        <td className="pro-info">from 5.5 to 12.5.</td>
                      </tr>
                      <tr>
                        <td className="pro-info">DROP</td>
                        <td className="pro-info">
                          The height difference between the back and front of
                          the sole is 10mm.
                        </td>
                      </tr>
                      <tr>
                        <td className="pro-info">MRP</td>
                        <td className="pro-info">
                          <span>₹</span> 1,199 inclusive of all taxes
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
