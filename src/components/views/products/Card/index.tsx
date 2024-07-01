import { Product } from "@/types/product.type";
import { convertIDR } from "@/utils/currency";
import Image from "next/image";

type PropTypes = {
  product: Product;
  key: string;
};

const Card = (props: PropTypes) => {
  const { product, key } = props;
  return (
    <div className="cursor-pointer" key={key}>
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
