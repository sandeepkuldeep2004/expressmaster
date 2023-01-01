import Link from "next/link";

export default function Product(props) {
  const product = props.productData;
  const currency=null !=product.currency && product.currency=='USD'?'$':'₹';
  return (
    <div className="group relative product-item product-default shadow" key={product.name}>
     <Link href={`/product/${product.code}`}>
     <a>
      <div className="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
        <img
          src={product.mainImage}
          alt={product.name}
          className="w-full"
        />
      </div>
      <div className="mt-4">
        <div>
          <h3 className="p-name text-center">
                <span aria-hidden="true" className=""></span>
                {product.name}
          </h3>
          <p className="mt-1 p-c-name text-sm text-gray-500">{product.categoryName}</p>

          <div className="price-rating flex justify-between">
            <div className="left"><span>{product.formatedPrice}</span></div>
            {/* <div className="right">
              <span className="star-rating">
                <i className="ti-star active"></i>
                <i className="ti-star active"></i>
                <i className="ti-star"></i>
                <i className="ti-star"></i>
                </span>
                </div> */}
                </div>
        
         
        </div>
        
      </div>
      </a>
      </Link>
    </div>
  );
}
