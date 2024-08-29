import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { Dispatch, SetStateAction } from "react";

type PropTypes = {
  address: any;
  selectedAddress: number;
  setChangeAddress: Dispatch<SetStateAction<boolean>>;
  setSelectedAddress: Dispatch<SetStateAction<number>>;
};

const ModalChangeAddress = (props: PropTypes) => {
  const { address, selectedAddress, setChangeAddress, setSelectedAddress } =
    props;
  return (
    <Modal onClose={() => setChangeAddress(false)}>
      <h1 className="text-center font-semibold text-xl mb-4">
        Change Shipping Address
      </h1>
      <div className="flex flex-col gap-2">
        {address.map((item: any, id: number) => (
          <div
            key={item.addressLine}
            className={`text-sm text-slate-600 flex flex-col gap-0.5 border p-2 rounded cursor-pointer ${
              id === selectedAddress && "border-2 border-slate-500"
            }`}
            onClick={() => {
              setSelectedAddress(id);
              setChangeAddress(false);
            }}
          >
            <h4>
              {item.recipient} - {item.phone}
            </h4>
            <p>{item.addressLine}</p>
            <p>Note : {item.note}</p>
          </div>
        ))}
      </div>
      <Button
        type="button"
        variant="bg-red-500 border-red-500 text-white shadow"
        className="w-52 text-center mx-auto mt-6"
        // onClick={() => handleDelete()}
      >
        Delete
      </Button>
    </Modal>
  );
};

export default ModalChangeAddress;
