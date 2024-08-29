import Button from "@/components/ui/Button";
import { ToasterContext } from "@/context/ToasterContext";
import productServices from "@/services/product";
import userServices from "@/services/user";
import { Product } from "@/types/product.type";
import { ToasterType } from "@/types/toaster.type";
import { convertIDR } from "@/utils/currency";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Fragment, useContext, useEffect, useState } from "react";
import ModalChangeAddress from "./ModalChangeAddress";

const CheckoutView = () => {
  const session: any = useSession();
  const { setToaster }: ToasterType = useContext(ToasterContext);

  const [profile, setProfile] = useState<any>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedAddress, setSelectedAddress] = useState(0);
  const [changeAddress, setChangeAddress] = useState(false);

  const getProfile = async () => {
    const { data } = await userServices.getProfile();
    setProfile(data.data);
    data.data.address.filter((address: { isMain: boolean }, id: number) => {
      if (address.isMain) {
        setSelectedAddress(id);
      }
    });
  };

  const getAllProducts = async () => {
    const { data } = await productServices.getAllProducts();
    setProducts(data.data);
  };

  const getProduct = (id: string) => {
    const product = products.find((product: Product) => product.id === id);
    return product;
  };

  const getTotalPrice = () => {
    const total = profile?.carts?.reduce(
      (acc: number, item: { id: string; size: string; qty: number }) => {
        const product: any = getProduct(item.id);
        return (acc += parseInt(product?.price) * item.qty);
      },
      0
    );
    return total;
  };

  // const handelDeleteCheckout = async (id: string, size: string) => {
  //   const newCheckout = Checkout.filter((item: any) => {
  //     return item.id !== id || item.size !== size;
  //   });
  //   try {
  //     const result = await userServices.addToCart({
  //       Checkouts: newCheckout,
  //     });

  //     if (result.status === 200) {
  //       setCheckout(newCheckout);
  //       setToaster({
  //         variant: "success",
  //         message: "Success Delete Item From Checkout",
  //       });
  //     }
  //   } catch (error) {
  //     setToaster({
  //       variant: "danger",
  //       message: "Failed Delete Item From Checkout",
  //     });
  //   }
  // };

  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    if (session.data?.accessToken) {
      getProfile();
    }
  }, [session]);

  return (
    <>
      <div className="py-12 px-[15vw] flex gap-5">
        <div className="w-2/3 ">
          <h1 className="font-bold text-xl">Checkout</h1>
          <div className="border rounded p-4 my-2">
            <h3 className="mb-1 font-semibold text-xl text-slate-700">
              Shipping Address
            </h3>

            {profile?.address?.length > 0 ? (
              <div className="text-sm text-slate-600 flex flex-col gap-0.5">
                <h4>
                  {profile?.address[selectedAddress]?.recipient} -{" "}
                  {profile?.address[selectedAddress]?.phone}
                </h4>
                <p>{profile?.address[selectedAddress]?.addressLine}</p>
                <p>Note : {profile?.address[selectedAddress]?.note}</p>
                <Button
                  type="button"
                  className="w-full"
                  onClick={() => setChangeAddress(true)}
                >
                  Change Address
                </Button>
              </div>
            ) : (
              " "
            )}
          </div>
          {profile?.carts?.length > 0 ? (
            <div className="w-full mt-6">
              {profile?.carts?.map(
                (item: { id: string; size: string; qty: number }) => (
                  <Fragment key={`${item.id}-${item.size}`}>
                    <div className="flex gap-5 my-4 border p-4 rounded shadow">
                      {getProduct(item.id)?.image && (
                        <Image
                          src={`${getProduct(item.id)?.image}`}
                          width={500}
                          height={500}
                          alt={`${item.id}-${item.size}`}
                          className="w-28 h-28 rounded"
                        />
                      )}
                      <div className="w-full">
                        <h4 className="text-lg">{getProduct(item.id)?.name}</h4>
                        <div className="mt-2">
                          <div className="flex items-center gap-2">
                            <label htmlFor="">Size {item.size}</label>
                          </div>
                          <div className="text-sm flex items-center">
                            <label htmlFor="">Qty {item.qty}</label>
                          </div>
                        </div>
                      </div>
                      <h4 className="text-lg">
                        {convertIDR(getProduct(item.id)?.price)}
                      </h4>
                    </div>
                    <hr />
                  </Fragment>
                )
              )}
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
            Proses Payment
          </Button>
        </div>
      </div>
      {changeAddress ? (
        <ModalChangeAddress
          address={profile.address}
          selectedAddress={selectedAddress}
          setChangeAddress={setChangeAddress}
          setSelectedAddress={setSelectedAddress}
        />
      ) : null}
    </>
  );
};

export default CheckoutView;
