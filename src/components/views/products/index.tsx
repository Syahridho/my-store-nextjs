import { Product } from "@/types/product.type";
import Card from "./Card";
import Link from "next/link";

type PropTypes = {
  products: Product[];
};

const ProductView = (props: PropTypes) => {
  const { products } = props;
  return (
    <div className="py-6 px-8">
      <h1 className="font-semibold text-xl">All Product ({products.length})</h1>
      <div className="flex gap-10">
        <div className="w-2/12">
          <div className="py-2 border-b-2">
            <h4 className="text-lg font-medium">Gender</h4>
            <div className="flex flex-col gap-1 mt-1">
              <div>
                <input type="checkbox" name="men" id="men" />
                <label htmlFor="men" className="ml-2">
                  Men
                </label>
              </div>
              <div>
                <input type="checkbox" name="women" id="women" />
                <label htmlFor="women" className="ml-2">
                  Women
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full grid grid-cols-3 gap-4 gap-y-10">
          {products.map((product) => (
            <Link href={`/products/${product.id}`} key={product.id}>
              <Card product={product} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductView;
