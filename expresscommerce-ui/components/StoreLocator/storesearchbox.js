import { useEffect, useState, Fragment } from "react";
import { getStoresByZipCode, getAllStores } from "../../pages/api/store";

export default function StoreSearch() {

    const [storeData, setStoreData] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [errorMsg, setErrorMsg] = useState({display:"none"})
 useEffect (()  => {
    const getAllStoresData = async () =>{
    const response = await getAllStores();
    const storeData = response.data;
    setStoreData(storeData);
    }
    getAllStoresData();

 }, [])
    const getStores = async (e) => {
    
        e.preventDefault();
        const zipCode = e.target.searchstore.value;
        console.log(zipCode)
        const response = await getStoresByZipCode(zipCode);
        const storeData = response.data;
        console.log(storeData.length)
        setStoreData(storeData);

        if(storeData.length==0)
        {
            console.log("enetered")
            setErrorMsg({display:"block"})
        }
    }

    const handleInputChange = async (e) => 
    {
        setInputValue(e.target.value)
    }

    return (

        <Fragment>
            <div>
                <div>
                    <form onSubmit={getStores} method="GET">
                    <div className="flex justify-center">
                        <div className="mb-3 xl:w-96">
                            <div className="input-group relative flex flex-wrap items-stretch w-full mb-4">
                                <input onChange={handleInputChange} name="searchstore" type="text" className="relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Search" />
                                <button disabled={!inputValue} type="submit" className="btn inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">Search</button>
                            </div>
                            <h5 style={errorMsg} className="text-gray-800 text-xl font-medium mb-2">No store available at this postal code</h5>
                        </div>
                    </div>
                    </form>
                </div>
                <div>
                    <div>
                        <ul>
                            {storeData != null && storeData.map((store,index) => {
                                return (
                                <li key={index}>
                                    <div className="flex justify-center" >
                                        <div className="rounded-lg shadow-lg bg-white max-w-sm">
                                            <a href="#!">
                                                <img className="rounded-t-lg" src="https://mdbootstrap.com/img/new/standard/nature/184.jpg" alt="" />
                                            </a>
                                            <div className="p-6">
                                                <h5 className="text-gray-900 text-xl font-medium mb-2">{store.name}</h5>
                                                <div className="flex">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                        <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                                                    </svg>

                                                    <h5 className="text-gray-900 text-xl font-medium mb-2">{store.address.streetname}</h5>
                                                </div>
                                                <div className="flex">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                        <path d="M10.5 18.75a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z" />
                                                        <path fillRule="evenodd" d="M8.625.75A3.375 3.375 0 005.25 4.125v15.75a3.375 3.375 0 003.375 3.375h6.75a3.375 3.375 0 003.375-3.375V4.125A3.375 3.375 0 0015.375.75h-6.75zM7.5 4.125C7.5 3.504 8.004 3 8.625 3H9.75v.375c0 .621.504 1.125 1.125 1.125h2.25c.621 0 1.125-.504 1.125-1.125V3h1.125c.621 0 1.125.504 1.125 1.125v15.75c0 .621-.504 1.125-1.125 1.125h-6.75A1.125 1.125 0 017.5 19.875V4.125z" clipRule="evenodd" />
                                                    </svg>

                                                    <h5 className="text-gray-900 text-xl font-medium mb-2">{store.address.cellphone}</h5>
                                                </div>
                                                <p className="text-gray-700 text-base mb-4">
                                                    {store.description}
                                                </p>
                                                <button type="button" className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Button</button>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                )
                            })
                            }

                        </ul>
                    </div>

                </div>

            </div>


        </Fragment>
    );
}
