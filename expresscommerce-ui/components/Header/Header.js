import { useEffect, useState, Fragment } from "react";
import { getCookie } from 'cookies-next';

import {useAppContext} from "../util/contextState";
import NavigationMenu from "./NavigationMenu";
import { getHomePageMainMenu } from "../../pages/api/homepage";

export default function Header() {
  var login = getCookie('auth-login');

  const [value, setValue] = useState({categories:[]});
  const context = useAppContext();
  
  useEffect(() => {
    if(context && context.user.name){
    } else{
      if(login)
        context.updateUser(JSON.parse(login))
    }
    const apiCalls = async () => {
      const mainmenus = await getHomePageMainMenu();
      if(mainmenus!=null)
        setValue(mainmenus.data);
      // const data = mainmenus.data.splice(0, 9);
      // setValue(data);
    };
    apiCalls();
  }, []);

  return (
    <Fragment>
      <div className="bg-white min-h-20 main-header">
        <NavigationMenu menus={value} />
      </div>
    </Fragment>
  )
}