export default function ProductDetailsSize(props) {
  return (
    <div className="mt-0">
      <div className="flex items-center justify-between">
        {/* <h3 className="text-sm text-gray-900 font-medium">Size</h3> */}
        {/* <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">Size guide</a> */}
      </div>

      <fieldset className="mt-4">
        <legend className="sr-only">Choose a size</legend>
        <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
          <label className="group relative border rounded-md cursor-not-allowed">
            <input
              type="radio"
              name="size-choice"
              value="XXS"
              disabled
              className="sr-only"
              aria-labelledby="size-choice-0-label"
            />
            <span id="size-choice-0-label"> XXS </span>

            <span
              aria-hidden="true"
              className="absolute -inset-px rounded-md border-2 border-gray-200 pointer-events-none"
            >
              <svg
                className="absolute inset-0 w-full h-full text-gray-200 stroke-2"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                stroke="currentColor"
              >
                <line
                  x1="0"
                  y1="100"
                  x2="100"
                  y2="0"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </span>
          </label>

          <label className="group relative border rounded-md cursor-pointer">
            <input
              type="radio"
              name="size-choice"
              value="XS"
              className="sr-only"
              aria-labelledby="size-choice-1-label"
            />
            <span id="size-choice-1-label"> XS </span>

            <span
              className="absolute -inset-px rounded-md pointer-events-none"
              aria-hidden="true"
            ></span>
          </label>

          <label className="group relative border rounded-md cursor-pointer">
            <input
              type="radio"
              name="size-choice"
              value="S"
              className="sr-only"
              aria-labelledby="size-choice-2-label"
            />
            <span id="size-choice-2-label"> S </span>

            <span
              className="absolute -inset-px rounded-md pointer-events-none"
              aria-hidden="true"
            ></span>
          </label>

          <label className="group relative border rounded-md cursor-pointer">
            <input
              type="radio"
              name="size-choice"
              value="M"
              className="sr-only"
              aria-labelledby="size-choice-3-label"
            />
            <span id="size-choice-3-label"> M </span>

            <span
              className="absolute -inset-px rounded-md pointer-events-none"
              aria-hidden="true"
            ></span>
          </label>

          <label className="group relative border rounded-md cursor-pointer">
            <input
              type="radio"
              name="size-choice"
              value="L"
              className="sr-only"
              aria-labelledby="size-choice-4-label"
            />
            <span id="size-choice-4-label"> L </span>

            <span
              className="absolute -inset-px rounded-md pointer-events-none"
              aria-hidden="true"
            ></span>
          </label>

          <label className="group relative border rounded-md cursor-pointer">
            <input
              type="radio"
              name="size-choice"
              value="XL"
              className="sr-only"
              aria-labelledby="size-choice-5-label"
            />
            <span id="size-choice-5-label"> XL </span>

            <span
              className="absolute -inset-px rounded-md pointer-events-none"
              aria-hidden="true"
            ></span>
          </label>

          <label className="group relative border rounded-md cursor-pointer">
            <input
              type="radio"
              name="size-choice"
              value="2XL"
              className="sr-only"
              aria-labelledby="size-choice-6-label"
            />
            <span id="size-choice-6-label"> 2XL </span>

            <span
              className="absolute -inset-px rounded-md pointer-events-none"
              aria-hidden="true"
            ></span>
          </label>

          <label className="group relative border rounded-md cursor-pointer">
            <input
              type="radio"
              name="size-choice"
              value="3XL"
              className="sr-only"
              aria-labelledby="size-choice-7-label"
            />
            <span id="size-choice-7-label"> 3XL </span>

            <span
              className="absolute -inset-px rounded-md pointer-events-none"
              aria-hidden="true"
            ></span>
          </label>
        </div>
      </fieldset>
    </div>
  );
}
