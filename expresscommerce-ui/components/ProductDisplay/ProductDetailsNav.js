export default function ProductDetailsNav(props) {
  return (
    <nav className="px-4" aria-label="Breadcrumb">
      <ol role="list" className="mx-auto flex items-center px-8">
        <li>
          <div className="flex items-center">
            <a href="#" className="mr-2 text-sm font-medium text-gray-900">
              {" "}
              Men{" "}
            </a>
            <svg
              width="16"
              height="20"
              viewBox="0 0 16 20"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className="w-4 h-5 text-gray-300"
            >
              <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
            </svg>
          </div>
        </li>

        <li className="text-sm">
          <a
            href="#"
            aria-current="page"
            className="font-medium text-gray-500 hover:text-gray-600"
          >
            {" "}
            {props.name}{" "}
          </a>
        </li>
      </ol>
    </nav>
  );
}
