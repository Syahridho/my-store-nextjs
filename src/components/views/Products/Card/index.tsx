import { Product } from "@/types/product.type";
import { convertIDR } from "@/utils/currency";
import Image from "next/image";

type PropTypes = {
  product: Product;
};

const Card = (props: PropTypes) => {
  const { product } = props;
  return (
    <div className="cursor-pointer">
      <Image
        src={product.image}
        alt="products"
        width="400"
        height="300"
        className="rounded aspect-square"
      />
      <p className="font-medium mt-4">{product.name}</p>
      <p className="text-sm">{product.category}</p>
      <p className="text-sm">{convertIDR(product.price)}</p>
    </div>
  );
};

export default Card;
