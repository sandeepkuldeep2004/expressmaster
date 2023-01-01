import { React, Fragment, useState, useEffect } from 'react'
import { Dialog, Popover, Tab, Transition } from '@headlessui/react'
import { MenuIcon, SearchIcon, ShoppingBagIcon, XIcon } from '@heroicons/react/outline'
import Link from "next/link";
import { useRouter } from "next/router";
import SearchBox from "./SearchBox";
import {useAppContext} from "../util/contextState";
import Logo from './Logo';
import Cart from './Cart';

// var navigation_menu = {"categories":[{"code":"200","title":"ELECTRONICS","sections":[{"code":"4000","title":"Kitchen Appliances","items":[{"code":"4008","title":"CHIMNEYS"},{"code":"4006","title":"TOASTER"},{"code":"4005","title":"GRILLKING"},{"code":"4003","title":"GAS STOVES"},{"code":"4007","title":"KETTLE"},{"code":"4002","title":"INDUCTION COOKTOPS"},{"code":"4004","title":"RICE COOKERS"},{"code":"4001","title":"MIXER GRINDERS"},{"code":"4009","title":"SANDWICH MAKER"}]},{"code":"5000","title":"DIGITAL CAMERAS","items":[{"code":"5001","title":"COMPACT CAMERAS"},{"code":"5002","title":"SLR CAMERAS"}]},{"code":"2000","title":"Women","items":[{"code":"2004","title":"Jeans"},{"code":"2002","title":"Trouser"},{"code":"2003","title":"T-Shirt"},{"code":"2001","title":"Shirt"}]},{"code":"3000","title":"Pumps","items":[{"code":"3003","title":"ELECTRIC MOTORS"},{"code":"3001","title":"DOMESTIC PUMPS"},{"code":"3002","title":"AGRICULTURE PUMPS"}]},{"code":"6000","title":"FANS","items":[{"code":"6003","title":"PEDESTAL FANS"},{"code":"6002","title":"TABLE FANS"},{"code":"6005","title":"VENTILATING & EXHAUST FANS"},{"code":"6001","title":"CEILING FANS"},{"code":"6006","title":"OTHERS"},{"code":"6004","title":"WALL FANS"}]}]},{"code":"100","title":"STREETWEAR","sections":[{"code":"2000","title":"Women","items":[{"code":"2004","title":"Jeans"},{"code":"2002","title":"Trouser"},{"code":"2003","title":"T-Shirt"},{"code":"2001","title":"Shirt"}]},{"code":"1000","title":"Men","items":[{"code":"1004","title":"Jeans"},{"code":"1001","title":"Shirt"},{"code":"1003","title":"T-Shirt"},{"code":"1002","title":"Trouser"}]}]}]}

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function NavigationMenu(props) {
    const [open, setOpen] = useState(false);
    const context = useAppContext();
    const router = new useRouter();
    var navigation = props.menus;
    
    function navClick(url){
        // console.log(url)
        setOpen(false)
        router.push(url)
    }

// for sticky header
const [sticky, setSticky] = useState("");
useEffect(() => {
    window.addEventListener("scroll", isSticky);
    return () => {
      window.removeEventListener("scroll", isSticky);
    };
  }, []);

  const isSticky = () => {
    /* Method that will fix header after a specific scrollable */
    const scrollTop = window.scrollY;
    const stickyClass = scrollTop >= 0 ? "is-sticky" : "";
    setSticky(stickyClass);
  };

  const classes = `header-section relative ${sticky}`;
    
    return (
        <div>
        {(navigation && Object.keys(navigation).length != 0) &&
        <div>        {/* Mobile menu */}
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
            <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 flex z-40 mobileNavigation">
                <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
                >
                <Dialog.Panel className="relative max-w-xs w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto">
                    <div className="px-4 pt-5 pb-2 flex">
                    <button
                        type="button"
                        className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400"
                        onClick={() => setOpen(false)}
                    >
                        <span className="sr-only">Close menu</span>
                        <XIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                    </div>

                    {/* Links */}
                    <Tab.Group as="div" className="mt-2">
                    <div className="border-b border-gray-200">
                        <Tab.List className="-mb-px flex px-4 space-x-8 mobile-tab">
                        {navigation.categories.map((category) => (
                            <Tab
                            key={category.id}
                            className={({ selected }) =>
                                classNames(
                                selected ? 'text-indigo-600 border-indigo-600' : 'text-gray-900 border-transparent',
                                'flex-1 whitespace-nowrap py-4 px-1 border-b-2 text-base font-medium'
                                )
                            }
                            >
                            {category.title}
                            </Tab>
                        ))}
                        </Tab.List>
                    </div>
                    <Tab.Panels as={Fragment}>
                        {navigation.categories.map((category) => (
                        <Tab.Panel key={category.id} className="pt-10 mobile-nav-list pb-8 px-4 space-y-10">
                            <div className="grid grid-cols-2 gap-x-4">
                            {/* {category.featured.map((item) => (
                                <div key={item.title} className="group relative text-sm">
                                <div className="aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden group-hover:opacity-75">
                                    <img src={item.imageSrc} alt={item.imageAlt} className="object-center object-cover" />
                                </div>
                                <a href={item.href} className="mt-6 block font-medium text-gray-900">
                                    <span className="absolute z-10 inset-0" aria-hidden="true" />
                                    {item.title}
                                </a>
                                <p aria-hidden="true" className="mt-1">
                                    Shop now
                                </p>
                                </div>
                            ))} */}
                            </div>
                            {category.sections.map((section) => (
                            <div key={section.id}>
                                <p id={`${category.code}-${section.code}-heading-mobile`} className="font-medium text-gray-900">
                                {section.title}
                                </p>
                                <ul
                                role="list"
                                aria-labelledby={`${category.code}-${section.code}-heading-mobile`}
                                className="mt-6 flex flex-col space-y-6"
                                >
                                {section.items.map((item) => (
                                    <li key={item.id} className="flow-root">
                                    <a href={`/category/${item.code}/${item.title}`} className="-m-2 p-2 block text-gray-500">
                                        {item.title}
                                    </a>
                                    </li>
                                ))}
                                </ul>
                            </div>
                            ))}
                        </Tab.Panel>
                        ))}
                    </Tab.Panels>
                    </Tab.Group>

                <div className="border-t border-gray-200 py-6 px-4 space-y-6">
                    {context && context.user.name? 
                    <div className="account-name">
                        <div className="lg:flex lg:flex-1 lg:items-center lg:justify-end">
                        <Link href="/myAccount">
                        <a  className="nav-link">
                        <svg className="h-8 w-8 text-gray-500"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
</svg>
                       {context.user.name}
                        </a>
                        </Link>
                        {/* <span className="h-6 w-px bg-gray-200" aria-hidden="true" /> */}
                        {/* <Link href="/myAccount">
                        <a className="text-sm font-medium text-gray-700 hover:text-gray-800">
                            <i className='ti-settings'></i>
                        My Account
                        </a>
                        </Link> */}
                    </div>

                    </div>:
                    
                    <div className="right-account lg:flex lg:flex-1 lg:items-center lg:justify-end">
                    {/* <Link href="/signin" ><a className="acc-item text-sm font-medium text-gray-700 hover:text-gray-800">
                    <i className="ti-user"></i>  Sign in
                    </a></Link> */}
                   
                    <Link href="/registration"><a className="acc-item text-sm font-medium text-gray-700 hover:text-gray-800">
                    <i className="ti-lock"></i> Create account
                    </a></Link>
                   
                    </div> }



                    </div>

                     {/* <div className="border-t border-gray-200 py-6 px-4 space-y-6">
                    <div className="flow-root">
                        <a href="http://localhost:4000/signin" className="-m-2 p-2 block font-medium text-gray-900">
                        Sign in
                        </a>
                    </div>
                    <div className="flow-root">
                        <a href="http://localhost:4000/registration" className="-m-2 p-2 block font-medium text-gray-900">
                        Create account
                        </a>
                    </div>
                    </div> */}

                    <div className="border-t border-gray-200 py-6 px-4">
                   
                    </div>
                </Dialog.Panel>
                </Transition.Child>
            </div>
            </Dialog>
        </Transition.Root>

        <header className={classes}>
            {/* <p className="bg-indigo-600 h-10 flex items-center justify-center text-sm font-medium text-white px-4 sm:px-6 lg:px-8">
            Get free delivery on orders over $100
            </p> */}

            <nav aria-label="Top" className="mx-auto px-4 pt-2 pb-2 md:px-8">
            <div>
                <div className="h-18 flex items-center">
                <button
                    type="button"
                    className="bg-white p-2 rounded-md text-gray-400 lg:hidden"
                    onClick={() => setOpen(true)}
                >
                    <span className="sr-only">Open menu</span>
                    <MenuIcon className="h-10 w-10" aria-hidden="true" />
                </button>

                <div className="flex lg:ml-0">
                   <Logo/>
                </div>
               

                {/* Flyout menus */}
                <Popover.Group className="hidden header-nav lg:ml-8 lg:block lg:self-stretch">
                    <div className="h-full flex space-x-8">
                    {navigation.categories.map((category) => (
                        <Popover key={category.id} className="flex">
                        {({ open }) => (
                            <>
                            <div className="relative flex nav-item">
                                <Popover.Button
                                className={classNames(
                                    open
                                    ? 'active'
                                    : 'default',
                                    'relative'
                                )}
                                >
                                {category.title}
                                </Popover.Button>
                            </div>

                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-200"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="transition ease-in duration-150"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Popover.Panel className="absolute top-full inset-x-0 nav-dropdown shadow text-sm text-gray-500 z-10">
                                {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                                <div className="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />

                                <div className="relative bg-black">
                                    <div className="max-w-7xl mx-auto px-8">
                                    <div className="grid grid-cols-1 gap-y-10 gap-x-8 py-8">
                                        <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                        {/* {category.featured.map((item) => (
                                            <div key={item.title} className="group relative text-base sm:text-sm">
                                            <div className="aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden group-hover:opacity-75">
                                                <img
                                                src={item.imageSrc}
                                                alt={item.imageAlt}
                                                className="object-center object-cover"
                                                />
                                            </div>
                                            <a href={item.href} className="mt-6 block font-medium text-gray-900">
                                                <span className="absolute z-10 inset-0" aria-hidden="true" />
                                                {item.title}
                                            </a>
                                            <p aria-hidden="true" className="mt-1">
                                                Shop now
                                            </p>
                                            </div>
                                        ))} */}
                                        </div>
                                        <div className="row-start-1 grid grid-cols-5 gap-y-10 gap-x-8 text-sm">
                                        {category.sections.map((section) => (
                                            <div key={section.id}>
                                            <p id={`${section.title}-heading`} className="font-bold text-white text-lg">
                                                {section.title}
                                            </p>
                                            <ul
                                                role="list"
                                                aria-labelledby={`${section.title}-heading`}
                                                className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                            >
                                                {section.items.map((item) => (
                                                <li key={item.id} className="flex">
                                                    <Popover.Button className="text-white" onClick={() => navClick(`/category/${item.code}/${item.title}`)}>{item.title}</Popover.Button>
                                                    {/* <a href={`/category/${item.code}/${item.title}`} className="hover:text-gray-800">
                                                    {item.title}
                                                    </a> */}
                                                </li>
                                                ))}
                                            </ul>
                                            </div>
                                        ))}
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </Popover.Panel>
                            </Transition>
                            </>
                        )}
                        </Popover>
                    ))}
                    </div>
                </Popover.Group>
                <div className="flex lg:ml-8 header-search-field">
                        <SearchBox/>
                    </div>
                <div className="ml-auto flex items-center header-nav">
                    {context && context.user.name? 
                    <div className="account-name">
                        <div className="hidden dropdown inline-block relative lg:flex lg:flex-1 lg:items-center lg:justify-end">
                        <Link href="/myAccount">
                        <a  className="nav-link">
                        <svg className="h-8 w-8 text-gray-500"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />  <circle cx="8.5" cy="7" r="4" />  <polyline points="17 11 19 13 23 9" /></svg>
                        {context.user.name}

                        </a>
                        
                        </Link>
                        <ul className="dropdown-menu absolute hidden shadow bg-white py-2">
      <li><Link href="/myAccount"><a className="drop-item" ><svg className="h-8 w-8 text-gray-500"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />  <circle cx="12" cy="12" r="3" /></svg> My Account</a></Link></li>
      <li><Link href="/logout"><a className="drop-item"><svg className="h-8 w-8 text-gray-500"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />  <path d="M7 12h14l-3 -3m0 6l3 -3" /></svg> LogOut</a></Link></li>
      
    </ul>
                        {/* <span className="h-6 w-px bg-gray-200" aria-hidden="true" /> */}
                        {/* <Link href="/myAccount">
                        <a className="nav-link">
                        <svg className="h-8 w-8 text-gray-500"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />  <circle cx="12" cy="12" r="3" /></svg>
                        My Account
                        </a>
                        </Link> */}
                    </div>

                    </div>:
                    
                    <div className="right-account lg:flex lg:flex-1 lg:items-center lg:justify-end">
                    <Link href="/signin" ><a className="nav-link">
                    <svg className="h-8 w-8 text-gray-500"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
</svg>
  <span className='m-hide'>Sign In</span>
                    </a></Link>
                   
                    <Link href="/registration"><a className="nav-link">
                    <svg className="h-8 w-8 text-gray-500"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
</svg> <span className='m-hide'>Create Account</span>
                    </a></Link>
                   
                    </div> }
                    
                   <div className='lg:items-center cart-item lg:flex'>
                   <Link href="#"><a className="nav-link">
                   <svg className="h-8 w-8 text-gray-500"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
</svg>

                         <span className='m-hide'>Store Locator</span>
                    </a></Link>
                   </div>

                    <div className="lg:items-center cart-item lg:flex">
                        <Cart/>
                    </div>
                </div>
                </div>
            </div>
            </nav>
        </header>
        </div>
}
        </div>
                 
    )
}
