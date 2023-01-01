import { useRouter } from "next/router";
import { useAppContext} from "./util/contextState";
import { deleteCookie } from 'cookies-next';
import { useEffect } from "react";

function Logout() {
  const context = useAppContext();
  const router = new useRouter();

  useEffect(()=>{
    deleteCookie ('auth-login')
    context.updateUser({})
    context.updateCart({})
    router.push("/");
  },[])

  return (
    <div>Logout</div>
 )
}

export default Logout