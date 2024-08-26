import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { Product } from "@/types/product.type";
import { convertIDR } from "@/utils/currency";
import Image from "next/image";
import { Dispatch, Fragment, SetStateAction } from "react";

type PropTypes = {
  setToaster: Dispatch<SetStateAction<{}>>;
  products: Product[];
  cart: any;
};

const CartView = (props: PropTypes) => {
  const { setToaster, products, cart } = props;

  const getProduct = (id: string) => {
    const product = products.find((product) => product.id === id);
    return product;
  };

  const getOptionsSize = (id: string, selected: string) => {
    const product = products.find((product) => product.id === id);
    const options = product?.stock.map(
      (stock: { size: string; qty: number }) => {
        if (stock.qty > 0) {
          return {
            label: stock.size,
            value: stock.size,
            selected: stock.size === selected,
          };
        }
      }
    );
    const data = options?.filter((option) => option !== undefined);
    return data;
  };

  const getTotalPrice = () => {
    const total = cart.reduce(
      (acc: number, item: { id: string; size: string; qty: number }) => {
        const product: any = getProduct(item.id);
        return (acc += parseInt(product?.price) * item.qty);
      },
      0
    );
    return total;
  };

  return (
    <div className="py-12 px-[15vw] flex gap-5">
      <div className="w-2/3 ">
        <h1 className="font-bold text-xl">Cart</h1>
        <div className="w-full mt-6">
          <div className="w-full ">
            {cart.map((item: { id: string; size: string; qty: number }) => (
              <Fragment key={`${item.id}-${item.size}`}>
                <div className="flex gap-5 my-4">
                  <Image
                    src={`${getProduct(item.id)?.image}`}
                    width={500}
                    height={500}
                    alt={`${item.id}-${item.size}`}
                    className="w-32 h-32 rounded"
                  />
                  <div className="w-full">
                    <h4 className="text-lg">{getProduct(item.id)?.name}</h4>
                    <p>{getProduct(item.id)?.category}</p>
                    <div className="flex items-center gap-5">
                      <div className="flex items-center gap-2">
                        <label htmlFor="">Size</label>
                        <Select
                          name="size"
                          options={getOptionsSize(item.id, item.size)}
                        ></Select>
                      </div>
                      <div className="text-sm flex items-center gap-2">
                        Qty
                        <Input
                          name="qty"
                          type="numbers"
                          className="w-12"
                          defaultValue={item.qty}
                        />
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="bg-red-500 text-white hover:bg-red-500 border-red-500"
                      className="text-xs"
                    >
                      <i className="bx bxs-trash" />
                    </Button>
                  </div>
                  <h4 className="text-lg">
                    {convertIDR(getProduct(item.id)?.price)}
                  </h4>
                </div>
                <hr />
              </Fragment>
            ))}
          </div>
        </div>
      </div>
      <div className="w-1/3">
        <h1 className="font-bold text-xl">Summer</h1>
        <div className="flex justify-between my-2">
          <h4>Subtotal</h4>
          <p>{convertIDR(getTotalPrice())}</p>
        </div>
        <div className="flex justify-between my-2">
          <h4>Devivery</h4>
          <p>{convertIDR(0)}</p>
        </div>
        <div className="flex justify-between my-2">
          <h4>Tax</h4>
          <p>{convertIDR(0)}</p>
        </div>
        <hr />
        <div className="flex justify-between my-2">
          <h4>Subtotal</h4>
          <p>{convertIDR(getTotalPrice())}</p>
        </div>
        <hr />
        <Button type="button" className="w-full mt-6">
          Check Out
        </Button>
      </div>
    </div>
  );
};

export default CartView;
