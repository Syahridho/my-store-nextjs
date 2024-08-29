import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { ToasterContext } from "@/context/ToasterContext";
import productServices from "@/services/product";
import userServices from "@/services/user";
import { Product } from "@/types/product.type";
import { ToasterType } from "@/types/toaster.type";
import { convertIDR } from "@/utils/currency";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Fragment, useContext, useEffect, useState } from "react";

const CartView = () => {
  const session: any = useSession();
  const { setToaster }: ToasterType = useContext(ToasterContext);

  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState([]);

  const getAllProducts = async () => {
    const { data } = await productServices.getAllProducts();
    setProducts(data.data);
  };

  const getCart = async () => {
    const { data } = await userServices.getCarts();
    setCart(data.data);
  };

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
    const total = cart?.reduce(
      (acc: number, item: { id: string; size: string; qty: number }) => {
        const product: any = getProduct(item.id);
        return (acc += parseInt(product?.price) * item.qty);
      },
      0
    );
    return total;
  };

  const handelDeleteCart = async (id: string, size: string) => {
    const newCart = cart.filter((item: any) => {
      return item.id !== id || item.size !== size;
    });
    try {
      const result = await userServices.addToCart({
        carts: newCart,
      });

      if (result.status === 200) {
        setCart(newCart);
        setToaster({
          variant: "success",
          message: "Success Delete Item From Cart",
        });
      }
    } catch (error) {
      setToaster({
        variant: "danger",
        message: "Failed Delete Item From Cart",
      });
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    if (session.data?.accessToken) {
      getCart();
    }
  }, [session]);

  return (
    <div className="py-12 px-[15vw] flex gap-5">
      <div className="w-2/3 ">
        <h1 className="font-bold text-xl">Cart</h1>

        {cart.length > 0 ? (
          <div className="w-full mt-6">
            {cart?.map((item: { id: string; size: string; qty: number }) => (
              <Fragment key={`${item.id}-${item.size}`}>
                <div className="flex gap-5 my-4">
                  {getProduct(item.id)?.image && (
                    <Image
                      src={`${getProduct(item.id)?.image}`}
                      width={500}
                      height={500}
                      alt={`${item.id}-${item.size}`}
                      className="w-32 h-32 rounded"
                    />
                  )}
                  <div className="w-full">
                    <h4 className="text-lg">{getProduct(item.id)?.name}</h4>
                    <p>{getProduct(item.id)?.category}</p>
                    <div className="flex items-center gap-5">
                      <div className="flex items-center gap-2">
                        <label htmlFor="">Size</label>
                        <Select
                          name="size"
                          options={getOptionsSize(item.id, item.size)}
                          disabled
                        />
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
                      onClick={() => handelDeleteCart(item.id, item.size)}
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
        ) : (
          <div className="text-center text-slate-500 mt-12">
            <h1>Tidak ada data</h1>
          </div>
        )}
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
