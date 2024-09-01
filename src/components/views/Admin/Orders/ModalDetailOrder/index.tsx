import Modal from "@/components/ui/Modal";
import { Product } from "@/types/product.type";
import { convertIDR } from "@/utils/currency";
import Image from "next/image";
import { Dispatch, Fragment, SetStateAction } from "react";

type PropTypes = {
  products: Product[];
  detailOrder: any;
  setDetailOrder: Dispatch<SetStateAction<{}>>;
};

const ModalDetailOrder = (props: PropTypes) => {
  const { products, detailOrder, setDetailOrder } = props;

  const getProduct = (id: string) => {
    const product = products.find((product: Product) => product.id === id);
    return product;
  };

  return (
    <Modal onClose={() => setDetailOrder({})}>
      <h1 className="font-bold text-xl">Detail Order</h1>
      <h4 className="font-semibold">Data Order</h4>
      <div className="flex justify-between gap-3">
        <div>
          <p>Order Id</p>
          <p>{detailOrder.order_id}</p>
        </div>
        <div>
          <p>Total</p>
          <p>{convertIDR(detailOrder.total)}</p>
        </div>
        <div>
          <p>Status</p>
          <p>{detailOrder.status}</p>
        </div>
      </div>
      <h4 className="font-semibold">Data Recipient</h4>
      <div className="flex justify-between gap-3">
        <div>
          <p>Nama</p>
          <p>{detailOrder.address.recipient}</p>
        </div>
        <div>
          <p>Phone</p>
          <p>{detailOrder.address.phone}</p>
        </div>
        <div>
          <p>notes</p>
          <p>{detailOrder.address.note}</p>
        </div>
      </div>
      <div>
        <p className="font-semibold">AddressLine</p>
        <p>{detailOrder.address.addressLine}</p>
      </div>
      <h2 className="font-semibold">Product</h2>
      <div className="w-full mt-6">
        {detailOrder?.items?.map(
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
    </Modal>
  );
};

export default ModalDetailOrder;
