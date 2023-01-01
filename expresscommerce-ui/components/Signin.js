import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { signInCustomer } from "../pages/api/authentication";
import {useAppContext} from "./util/contextState";
import Link from "next/link";
import { setCookie } from 'cookies-next';

function Signin() {

  const context = useAppContext();
  const router = new useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await signInCustomer(
      event.target.email.value,
      event.target.password.value
    );
    if (response.status == 200) {
      const resolvedUrl = context.user.resolvedUrl;
      setCookie('auth-login', {...response.data}, { maxAge: 60 * 60 * 6 });
      context.updateUser({...response.data})
      if(resolvedUrl!=undefined)
        router.push(resolvedUrl);
      else
        router.push("/");
    }
  };

  return (
    <Fragment>
      <Head>
        <title>Express Commerce - Sign In</title>
      </Head>
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
     <div className="w-full login shadow">
       <div>
         <h2 className="text-center mt-5 mb-5 text-3xl font-bold">Sign in to your account</h2>
         <p className="mt-2 text-center text-sm text-gray-600"></p>
        </div>
        <form className="mt-8" onSubmit={handleSubmit} method="POST">
         <input type="hidden" name="remember" value="true"></input>
         <div className="">
          <div className="mb-4">
              <label htmlFor="email-address" className="block text-sm font-medium text-gray-700 pb-1">Email</label>
              <input id="email-address" name="email" type="email" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address"></input>
          </div>

          <div className="mt-4">
            <label htmlFor="email-address" className="block text-sm font-medium text-gray-700 pb-1">Password</label>
            <input id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password"></input>
          </div>
         </div>

         <div className="flex items-center justify-between">
         <div className="flex items-center">
          {/* <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"></input>
          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900"> Remember me </label> */}
         </div>

         <div className="flex items-center justify-between mt-2 mb-5">
          {/* <a href="#" className="link"> Forgot your password? </a> */}
         </div>
         </div>

         <div>
         <button type="submit" className="btn-default rounded-full group relative w-full flex justify-center text-white">
         
          Sign in
         </button>
         <div className="max-w-md w-full space-y-8">
        
         <div className="text-sm  mt-4 text-center">
          <Link href="/registration"><a className="link"> Don&#39;t already have an account? Sign up </a></Link>
         </div>
         
         </div>
       </div>
     </form>
   </div>
 </div>
 </Fragment>

 )
}

export default Signin