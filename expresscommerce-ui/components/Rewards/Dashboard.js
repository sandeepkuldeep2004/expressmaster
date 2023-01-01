import { useRef, useState } from "react";
import style from "./Rewards.module.css";

export default function Dashboard(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [openTab, setOpenTab] = useState(1);

  const [openNav, setOpenNav] = useState(1);

  const [clicked, setClicked] = useState("0");
  const contentEl = useRef();

  const handleToggle = (index) => {
    if (clicked === index) {
      return setClicked("0");
    }
    setClicked(index);
  };

  const faqs = [
    {
      question: "Lorem ipsum dolor sit amet?",
      answer:
        "Tenetur ullam rerum ad iusto possimus sequi mollitia dolore sunt quam praesentium. Tenetur ullam rerum ad iusto possimus sequi mollitia dolore sunt quam praesentium.Tenetur ullam rerum ad iusto possimus sequi mollitia dolore sunt quam praesentium.",
    },
    {
      question: "Dignissimos sequi architecto?",
      answer:
        "Aperiam ab atque incidunt dolores ullam est, earum ipsa recusandae velit cumque. Aperiam ab atque incidunt dolores ullam est, earum ipsa recusandae velit cumque.",
    },
    {
      question: "Voluptas praesentium facere?",
      answer:
        "Blanditiis aliquid adipisci quisquam reiciendis voluptates itaque.",
    },
  ];

  return (
    <>
      <aside className="fixed z-50 flex items-center justify-center  text-white  bg-blue-800  bottom-4 right-1">
        {isOpen && (
          <div className=" z-40  overflow-y-auto w-40 left-0 top-0">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-white/10 text-sm p-1.5 absolute top-2.5  inline-flex items-center "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>

            <div className="py-4 overflow-y-auto text-white ">
              <ul className="space-y-2">
                <li
                  className="border-b-2 border-opacity-50"
                  onClick={() => setOpenNav(1)}
                >
                  <span className="flex items-center p-2  text-base font-normal hover:bg-gray-100 hover:text-gray-800">
                    REWARDS
                  </span>
                </li>
                <li
                  className="border-b-2 border-opacity-50"
                  onClick={() => setOpenNav(2)}
                >
                  <span className="flex items-center p-2 text-base font-normal hover:bg-gray-100 hover:text-gray-800">
                    MY ACTIVITY
                  </span>
                </li>
                <li
                  className="border-b-2 border-opacity-50"
                  onClick={() => setOpenNav(3)}
                >
                  <span className="flex items-center p-2 text-base font-normal hover:bg-gray-100 hover:text-gray-800">
                    BENEFITS
                  </span>
                </li>
                <li
                  className="border-b-2 border-opacity-50"
                  onClick={() => setOpenNav(4)}
                >
                  <span className="flex items-center p-2 text-base font-normal hover:bg-gray-100 hover:text-gray-800">
                    REFER A FRIEND
                  </span>
                </li>
              </ul>
            </div>
          </div>
        )}

        <div className="text-center w-96 h-120 ">
          <div id="head" className="flex justify-between bg-blue-800">
            <div className="px-4 py-3">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="text-gray-400 bg-transparent hover:bg-white/10  text-sm  inline-flex "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </button>
            </div>
            <div className="px-4 py-3">Bronze</div>
            <div className="px-4 py-3">
              <button
                className="p-1 ml-3 hover:bg-white/10"
                onClick={() => props.action("close")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  strokeWidth="1"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div id="headnav" className="bg-blue-800">
            <dl className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              <div className="px-2 py-3 text-white  overflow-hidden sm:p-2">
                <dt className="text-sm font-medium text-white truncate">
                  Expire soon
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-white-900">
                  0
                </dd>
              </div>

              <div className="px-2 py-3  overflow-hidden sm:p-2">
                <dt className="text-sm font-medium  truncate">
                  Points to spend
                </dt>
                <dd className="mt-1 text-3xl font-semibold ">50</dd>
              </div>

              <div className="px-2 py-3  overflow-hidden sm:p-2">
                <dt className="text-sm font-medium  truncate">Pending</dt>
                <dd className="mt-1 text-3xl font-semibold ">0</dd>
              </div>
            </dl>
          </div>

          {openNav == 1 && (
            <div
              id="rewards"
              className="flex container bg-white  justify-center items-center"
            >
              <div className="flex w-full">
                <div className="w-full specification-panel">
                  <ul
                    className="flex mb-0 list-none flex-wrap flex-row nav nav-tabs text-gray-800"
                    role="tablist"
                  >
                    <li
                      className={
                        "-mb-px last:mr-0 flex-auto text-center py-4 px-2  text-lg " +
                        (openTab === 1 ? "border-b-4  border-blue-600" : " ")
                      }
                    >
                      <a
                        className={openTab === 1 ? "active " : "default"}
                        onClick={(e) => {
                          e.preventDefault();
                          setOpenTab(1);
                        }}
                        data-toggle="tab"
                        href="#link1"
                        role="tablist"
                      >
                        EARN
                      </a>
                    </li>
                    <li
                      className={
                        "-mb-px last:mr-0 flex-auto text-center py-4 px-2 text-lg " +
                        (openTab === 2 ? "border-b-4  border-blue-600" : " ")
                      }
                    >
                      <a
                        className={openTab === 2 ? "active  " : "default"}
                        onClick={(e) => {
                          e.preventDefault();
                          setOpenTab(2);
                        }}
                        data-toggle="tab"
                        href="#link2"
                        role="tablist"
                      >
                        REDEEM
                      </a>
                    </li>
                  </ul>
                  <div className="relative flex flex-col min-w-0 break-words bg-white w-full ">
                    <div className="px-4 py-5 flex-auto">
                      <div className="tab-content tab-space  text-gray-600 text-sm  ">
                        <div
                          className={openTab === 1 ? "block" : "hidden"}
                          id="link1"
                        >
                          <div className="w-full h-64 overflow-y-auto">
                            <div className="flex">
                              <div className="mr-4 flex-shrink-0 self-end">
                                <svg
                                  className="h-16 w-16 border border-gray-300 bg-white text-gray-300"
                                  preserveAspectRatio="none"
                                  stroke="currentColor"
                                  fill="none"
                                  viewBox="0 0 200 200"
                                  aria-hidden="true"
                                >
                                  <path
                                    vectorEffect="non-scaling-stroke"
                                    strokeWidth={1}
                                    d="M0 0l200 200M0 200L200 0"
                                  />
                                </svg>
                              </div>
                              <div>
                                <h4 className="text-lg font-bold">
                                  Lorem ipsum
                                </h4>
                                <p className="mt-1">
                                  Repudiandae sint consequuntur vel. Amet ut
                                  nobis explicabo numquam expedita quia omnis
                                  voluptatem.
                                </p>
                              </div>
                            </div>
                            <div className="flex">
                              <div className="mr-4 flex-shrink-0 self-end">
                                <svg
                                  className="h-16 w-16 border border-gray-300 bg-white text-gray-300"
                                  preserveAspectRatio="none"
                                  stroke="currentColor"
                                  fill="none"
                                  viewBox="0 0 200 200"
                                  aria-hidden="true"
                                >
                                  <path
                                    vectorEffect="non-scaling-stroke"
                                    strokeWidth={1}
                                    d="M0 0l200 200M0 200L200 0"
                                  />
                                </svg>
                              </div>
                              <div>
                                <h4 className="text-lg font-bold">
                                  Lorem ipsum
                                </h4>
                                <p className="mt-1">
                                  Repudiandae sint consequuntur vel. Amet ut
                                  nobis explicabo numquam expedita quia omnis
                                  voluptatem.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className={openTab === 2 ? "block" : "hidden"}
                          id="link2"
                        >
                          <div className="w-full h-64 overflow-y-auto">
                            <ul className="style.accordion">
                              {faqs.map((faq, index) => (
                                <li
                                  key={index}
                                  className={`style.accordion_item ${
                                    clicked === index ? "style.active" : ""
                                  }`}
                                >
                                  <button
                                    className={style.button}
                                    onClick={() => handleToggle(index)}
                                  >
                                    {faq.question}
                                    <span className={style.control}>
                                      {clicked === index ? "—" : "+"}{" "}
                                    </span>
                                  </button>
                                  <div
                                    className={style.answer_wrapper}
                                    style={
                                      clicked === index
                                        ? { height: "50px" }
                                        : { height: "0px" }
                                    }
                                  >
                                    <div className={style.answer}>
                                      {faq.answer}
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {openNav == 2 && (
            <div
              id="activity"
              className="flex container bg-gray-200  justify-center items-center text-gray-600 "
            >
              <div className={`flow-root w-full overflow-y-auto ${style.rwheight}`} >
                <ul role="list" className="">
                  <li>
                    <div className="relative pb-8">
                      {/* <span
                        className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                        aria-hidden="true"
                      ></span> */}
                      <div className="relative flex space-x-3">
                        <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                          <div>
                            <p className="text-sm text-gray-500">
                              Applied to{" "}
                              <a href="#" className="font-medium text-gray-900">
                                Front End Developer
                              </a>
                            </p>
                          </div>
                          <div className="text-right text-sm whitespace-nowrap text-gray-500">
                            <time dateTime="2020-09-20">Sep 20</time>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="relative pb-8">
                      {/* <span
                        className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                        aria-hidden="true"
                      ></span> */}
                      <div className="relative flex space-x-3">
                        <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                          <div>
                            <p className="text-sm text-gray-500">
                              Advanced to phone screening by{" "}
                              <a href="#" className="font-medium text-gray-900">
                                Bethany Blake
                              </a>
                            </p>
                          </div>
                          <div className="text-right text-sm whitespace-nowrap text-gray-500">
                            <time dateTime="2020-09-22">Sep 22</time>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="relative pb-8">
                      {/* <span
                        className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                        aria-hidden="true"
                      ></span> */}
                      <div className="relative flex space-x-3">
                        <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                          <div>
                            <p className="text-sm text-gray-500">
                              Completed phone screening with{" "}
                              <a href="#" className="font-medium text-gray-900">
                                Martha Gardner
                              </a>
                            </p>
                          </div>
                          <div className="text-right text-sm whitespace-nowrap text-gray-500">
                            <time dateTime="2020-09-28">Sep 28</time>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {openNav == 3 && (
            <div
              id="benefits"
              className="flex  bg-gray-200  justify-center items-center text-gray-600  "
            >
              <div className={style.rwheight}>
                <h2 className="text-lg font-medium text-gray-900">Benifits</h2>
                <ul className="style.accordion">
                              {faqs.map((faq, index) => (
                                <li
                                  key={index}
                                  className={`style.accordion_item ${
                                    clicked === index ? "style.active" : ""
                                  }`}
                                >
                                  <button
                                    className={style.button}
                                    onClick={() => handleToggle(index)}
                                  >
                                    {faq.question}
                                    <span className={style.control}>
                                      {clicked === index ? "—" : "+"}{" "}
                                    </span>
                                  </button>
                                  <div
                                    className={style.answer_wrapper}
                                    style={
                                      clicked === index
                                        ? { height: "50px" }
                                        : { height: "0px" }
                                    }
                                  >
                                    <div className={style.answer}>
                                      {faq.answer}
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
              </div>
            </div>
          )}

          {openNav == 4 && (
            <div
              id="refer"
              className="flex flex-col container bg-gray-200 text-sm justify-center items-center text-gray-600  "
            >
              <div className={style.rwheight}>
              <p>Rewards your friends with</p>
              <p>REAL 5% OFF</p>
              <p>
                The Member Profiles page is where you can track the Loyalty{" "}
                <br /> status and activities of your members, <br />
                create and manage groups, and perform manual actions,
                <br /> such as adding and downloading points.
              </p>
              <p>Please share this link with your friends</p>
            </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
