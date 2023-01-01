import style from "./SearchBox.module.css";
import { useState } from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Router from "next/router";

export default function SearchBox() {
  const [inputText, setInputText] = useState("");
  let inputHandler = (e) => {
    if(e.key=='Enter'){
      let url = "/search/" + inputText;
      Router.push(url);
    }
    setInputText(e.target.value);
  };

  let searchHandler = () => {
    let url = "/search/" + inputText;
    Router.push(url);
  };
  return (
    <div>   
      <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Search</label>
      <div className="relative">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3" onClick={searchHandler}>
              <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
          <input onChange={inputHandler} onKeyDown={inputHandler}  type="search" id="Workflow" className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Here..." required="" />
      </div>
    </div>
    // <div className={style.search}>
    //   <input
    //     placeholder="I'm looking for"
    //     className={style.searchbox}
    //     onChange={inputHandler}
    //   ></input>
    //   <FontAwesomeIcon
    //     icon={faSearch}
    //     color="blue"
    //     className={style.searchIcon}
    //     onClick={searchHandler}
    //   />
    // </div>
  );
}
