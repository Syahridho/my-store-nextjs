import Button from "@/components/ui/Button";
import { ToasterContext } from "@/context/ToasterContext";
import userServices from "@/services/user";
import { Product } from "@/types/product.type";
import { ToasterType } from "@/types/toaster.type";
import { convertIDR } from "@/utils/currency";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useState } from "react";

type PropTypes = {
  product: Product | any;
  cart: any | [];
  productId: string | any;
};

const DetailProductView = (props: PropTypes) => {
  const { setToaster }: ToasterType = useContext(ToasterContext);
  const { product, cart, productId } = props;

  const { status }: any = useSession();
  const router = useRouter();

  const [selectedSize, setSelectedSize] = useState("");

  const handleAddToCart = async () => {
    if (selectedSize !== "") {
      let newCart = [];
      if (
        cart?.filter(
          (item: any) => item.id === productId && item.size === selectedSize
        ).length > 0
      ) {
        newCart = cart.map((item: any) => {
          if (item.id === productId && item.size === selectedSize) {
            item.qty += 1;
          }
          return item;
        });
      } else {
        newCart = [
          ...cart,
          {
            id: productId,
            qty: 1,
            size: selectedSize,
          },
        ];
      }
      try {
        const result = await userServices.addToCart({
          carts: newCart,
        });
        if (result.status === 200) {
          setSelectedSize("");
          setToaster({
            variant: "success",
            message: "Success Add To Cart",
          });
        }
      } catch (error) {
        setToaster({
          variant: "danger",
          message: "Failed Add To Cart",
        });
      }
    }
  };

  return (
    <div className="px-[20vw] py-[10vh]">
      <div className="flex gap-4">
        <div className="w-1/2">
          <Image
            src={product?.image}
            alt={product?.name}
            width={400}
            height={400}
            className="w-full scale-100 h-auto rounded shadow"
          />
        </div>
        <div className="w-1/2">
          <h1>{product?.name}</h1>
          <h3 className="text-slate-500 mt-1">{product?.category}</h3>
          <h3 className="mt-3">{convertIDR(product?.price)}</h3>
          <p className="text-slate-500 mt-5 leading-6 text-sm text-justify">
            {product?.description}
          </p>
          <p className="mt-5 mb-2 text-slate-600 text-sm">Select Size</p>
          <div className="grid grid-cols-5 gap-4">
            {product?.stock?.map((item: { size: string; qty: number }) => (
              <div className="relative" key={item.size}>
                <input
                  type="radio"
                  name="size"
                  id={`size-${item.size}`}
                  className={`appearance-none absolute inset-0 w-full h-full cursor-pointer rounded checked:border-slate-400 checked:ring-2 checked:ring-slate-400`}
                  disabled={item.qty === 0}
                  onClick={() => setSelectedSize(item.size)}
                  checked={selectedSize === item.size}
                />
                <label
                  htmlFor={`size-${item.size}`}
                  className={`w-full h-full border border-slate-300 rounded flex items-center justify-center py-1 ${
                    item.qty === 0
                      ? "opacity-50 cursor-default"
                      : "hover:cursor-pointer"
                  }`}
                >
                  {item.size}
                </label>
              </div>
            ))}
          </div>
          <Button
            type={`${status === "authenticated" ? "submit" : "button"}`}
            className="w-full mt-5 py-3 rounded-full"
            onClick={() =>
              status === "unauthenticated"
                ? router.push(`/auth/login?callbackUrl=${router.asPath}`)
                : handleAddToCart()
            }
          >
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DetailProductView;
