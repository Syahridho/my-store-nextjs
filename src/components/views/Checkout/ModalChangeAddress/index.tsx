import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import TextArea from "@/components/ui/TextArea";
import { ToasterContext } from "@/context/ToasterContext";
import userServices from "@/services/user";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useContext,
  useState,
} from "react";

type PropTypes = {
  profile: any;
  selectedAddress: number;
  setProfile: Dispatch<SetStateAction<any>>;
  setChangeAddress: Dispatch<SetStateAction<boolean>>;
  setSelectedAddress: Dispatch<SetStateAction<number>>;
};

const ModalChangeAddress = (props: PropTypes) => {
  const {
    profile,
    selectedAddress,
    setProfile,
    setChangeAddress,
    setSelectedAddress,
  } = props;

  const { setToaster } = useContext(ToasterContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddNew, setIsAddNew] = useState(false);
  const [updateAddress, setUpdateAddress] = useState<number>();

  const handleAddAddress = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    const form = event.target as HTMLFormElement;
    let data;
    if (profile.address.length > 0) {
      data = {
        address: [
          ...profile.address,
          {
            recipient: form.recipient.value,
            phone: form.phone.value,
            addressLine: form.addressLine.value,
            note: form.note.value,
            isMain: false,
          },
        ],
      };
    } else {
      data = {
        address: [
          {
            recipient: form.recipient.value,
            phone: form.phone.value,
            addressLine: form.addressLine.value,
            note: form.note.value,
            isMain: true,
          },
        ],
      };
    }

    try {
      const result = await userServices.updateProfile(data);
      if (result.status === 200) {
        setIsLoading(false);
        form.reset();
        setIsAddNew(false);
        setProfile({
          ...profile.address,
          address: data.address,
        });
        setToaster({
          variant: "success",
          message: "Success Add Address",
        });
      }
    } catch (error) {
      setIsLoading(false);
      setToaster({
        variant: "danger",
        message: "Failed Add Address",
      });
    }
  };

  const handelDeleteAddress = async (id: number) => {
    const address = profile.address;
    address.splice(id, 1);
    const data = {
      address,
    };
    try {
      const result = await userServices.updateProfile(data);
      if (result.status === 200) {
        setIsLoading(false);
        setIsAddNew(false);
        setProfile({
          ...profile.address,
          address: data.address,
        });
        setToaster({
          variant: "success",
          message: "Success Delete Address",
        });
      }
    } catch (error) {
      setIsLoading(false);
      setToaster({
        variant: "danger",
        message: "Failed Delete Address",
      });
    }
  };

  const handelChangeMainAddress = async (id: number) => {
    const address = profile.address;
    address.forEach((item: { isMain: boolean }, index: number) => {
      if (index === id) {
        item.isMain = true;
      } else {
        item.isMain = false;
      }
    });
    const data = {
      address,
    };

    try {
      const result = await userServices.updateProfile(data);
      if (result.status === 200) {
        setIsLoading(false);
        setIsAddNew(false);
        setProfile({
          ...profile.address,
          address: data.address,
        });
        setToaster({
          variant: "success",
          message: "Success Change Main Address",
        });
      }
    } catch (error) {
      setIsLoading(false);
      setToaster({
        variant: "danger",
        message: "Failed Change Main Address",
      });
    }
  };

  const handleChangeAddress = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    const form = event.target as HTMLFormElement;
    const address = profile.address;
    const id = updateAddress || 0;
    address[id] = {
      recipient: form.recipient.value,
      phone: form.phone.value,
      addressLine: form.addressLine.value,
      note: form.note.value,
      isMain: address[id].isMain,
    };

    const data = {
      address,
    };

    try {
      const result = await userServices.updateProfile(data);
      if (result.status === 200) {
        setIsLoading(false);
        form.reset();
        setIsAddNew(false);
        setUpdateAddress(undefined);
        setProfile({
          ...profile.address,
          address: data.address,
        });
        setToaster({
          variant: "success",
          message: "Success Add Address",
        });
      }
    } catch (error) {
      setIsLoading(false);
      setUpdateAddress(undefined);
      setToaster({
        variant: "danger",
        message: "Failed Add Address",
      });
    }
  };

  return (
    <Modal onClose={() => setChangeAddress(false)}>
      <h1 className="text-center font-semibold text-xl mb-4">
        Select Shipping Address
      </h1>
      <div className="flex flex-col gap-2">
        {profile?.address?.map((item: any, id: number) => (
          <div key={item.addressLine}>
            <div
              className={`text-sm text-slate-600 flex flex-col gap-0.5 border p-2 rounded cursor-pointer relative ${
                id === selectedAddress && "border-2 border-slate-500"
              }`}
            >
              <div
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
              <div className="absolute right-2 top-2 rounded flex gap-3 z-50 ">
                <Button
                  type="button"
                  className={`text-xs`}
                  onClick={() =>
                    id === updateAddress
                      ? setUpdateAddress(undefined)
                      : setUpdateAddress(id)
                  }
                  disabled={isLoading}
                >
                  <i className="bx bxs-edit-alt" />
                </Button>
                <Button
                  type="button"
                  className={`text-xs`}
                  onClick={() => handelChangeMainAddress(id)}
                  disabled={isLoading || item.isMain}
                >
                  <i className="bx bx-purchase-tag-alt" />
                </Button>
                <Button
                  type="button"
                  className="text-xs"
                  onClick={() => handelDeleteAddress(id)}
                  disabled={isLoading || id === selectedAddress}
                >
                  <i className="bx bxs-trash" />
                </Button>
              </div>
            </div>
            {id === updateAddress && (
              <form onSubmit={(e) => handleChangeAddress(e)}>
                <Input
                  name="recipient"
                  type="text"
                  label="Recipient"
                  placeholder="Insert Recipient"
                  defaultValue={item.recipient}
                />
                <Input
                  name="phone"
                  type="text"
                  label="Phone"
                  placeholder="Insert Phone"
                  defaultValue={item.phone}
                />
                <TextArea
                  name="addressLine"
                  label="AddressLine"
                  placeholder="Insert AddressLine"
                  defaultValue={item.addressLine}
                />
                <TextArea
                  name="note"
                  label="Note"
                  placeholder="Insert Note"
                  defaultValue={item.note}
                />
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Loading..." : "Update Address"}
                </Button>
              </form>
            )}
          </div>
        ))}
      </div>
      <button
        type="button"
        className="bg-slate-800 text-white text-left p-2 rounded shadow mt-5"
        onClick={() => setIsAddNew(!isAddNew)}
      >
        {isAddNew ? "Cancel Add New" : "Add New Addreess"}
      </button>
      {isAddNew && (
        <form onSubmit={(e) => handleAddAddress(e)}>
          <Input
            name="recipient"
            type="text"
            label="Recipient"
            placeholder="Insert Recipient"
          />
          <Input
            name="phone"
            type="text"
            label="Phone"
            placeholder="Insert Phone"
          />
          <TextArea
            name="addressLine"
            label="AddressLine"
            placeholder="Insert AddressLine"
          />
          <TextArea name="note" label="Note" placeholder="Insert Note" />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : "Add Address"}
          </Button>
        </form>
      )}
    </Modal>
  );
};

export default ModalChangeAddress;
