export default function SignUp(props) {
  return (
    <>
      <aside className="fixed z-50 flex items-center justify-center px-5 py-3 text-white bg-blue-400  bottom-4 right-1">
        <div>
          <div className="flex justify-end">
            <button
              className="p-1 ml-3 rounded bg-white/20 hover:bg-white/10"
              onClick={() => props.action('close')}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div className="flex container mx-auto justify-center items-center">
            <div className="bg-blue-400 flex flex-col justify-center items-center">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="white"
                  className="w-20 h-20"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0"
                  />
                </svg>
              </div>
              <h1 className="mt-2 md:mt-2 text-xl lg:text-xl font-semibold leading-10 text-center text-white-800 text-center md:w-9/12 lg:w-7/12">
                Become a member
              </h1>
              <p className="text-white-800 text-base">
                Start earing points and exclusive rewards.
              </p>

              <div className="mt-6 flex space-x-2">
                <p className="w-full  mt-8 text-base leading-normal text-center text-white-600 ">
                  To start earing, please agree our Terms and Conditions.
                </p>
              </div>
              <div className="mt-2 flex space-x-2">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    className="h-4 w-4 border-gray-300 rounded bg-blue-700 focus:ring-blue-500"
                  />
                </div>
                <label
                  htmlFor="terms"
                  className="text-sm font-medium text-white-900"
                >
                  To start earing, please agree our Terms and Conditions.
                </label>
              </div>

              <button
                onClick={() => props.action('join')}
                type="submit"
                className="w-full mt-6 bg-blue-800 border border-transparent py-5 px-12 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                JOIN NOW
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
