import BrandProduct from "./BrandProduct";

export default function BrandGrid(props) {
  return (
    <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
      {props.listdata &&
        props.listdata.map((product,index) => (
         <BrandProduct productData={product}/>
        ))}
    </div>
    
  );
}
