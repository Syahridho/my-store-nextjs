import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import InputFile from "@/components/ui/InputFile";
import Modal from "@/components/ui/Modal";
import Select from "@/components/ui/Select";
import { Product } from "@/types/product.type";
import { Dispatch, SetStateAction, useState } from "react";

type Proptypes = {
  setModalAddProduct: Dispatch<SetStateAction<boolean>>;
  setToaster: Dispatch<SetStateAction<{}>>;
  setProductsData: Dispatch<SetStateAction<Product[]>>;
};

const ModalAddProduct = (props: Proptypes) => {
  const { setModalAddProduct, setToaster, setProductsData } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [stockCount, setStockCount] = useState([{ size: "", qty: 0 }]);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);

  const handleStock = (e: any, i: number, type: string) => {
    const newStockCount: any = [...stockCount];
    newStockCount[i][type] = e.target.value;
    setStockCount(newStockCount);
  };
  return (
    <Modal onClose={() => {}}>
      <h1 className="text-center font-bold text-xl mb-2">Add Product</h1>
      <form onSubmit={() => {}}>
        <Input
          label="Name"
          name="name"
          type="text"
          placeholder="Insert Product Name"
        />
        <Input label="Price" name="price" type="number" />
        <Select
          label="Category"
          name="category"
          options={[
            { label: "Men", value: "men" },
            { label: "Women", value: "women" },
          ]}
        ></Select>
        <Select
          label="Status"
          name="status"
          options={[
            { label: "Released", value: "true" },
            { label: "Not Realeased", value: "false" },
          ]}
        ></Select>
        <label htmlFor="stock" className="font-bold mt-6 mb-2 block">
          Stock
        </label>
        {stockCount.map((item: { size: string; qty: number }, i: number) => (
          <div className="flex gap-4" key={i}>
            <div className="w-[50%]">
              <Input
                label="Size"
                name="size"
                type="text"
                placeholder="Insert Product Size"
                onChange={(e) => {
                  handleStock(e, i, "size");
                }}
              ></Input>
            </div>
            <div className="w-[50%]">
              <Input
                label="Qty"
                name="qty"
                type="number"
                placeholder="Insert Product Qty"
                onChange={(e) => {
                  handleStock(e, i, "qty");
                }}
              ></Input>
            </div>
          </div>
        ))}
        <Button
          type="button"
          className="text-xs rounded-full px-4"
          onClick={() => setStockCount([...stockCount, { size: "", qty: 0 }])}
        >
          Add New Stock
        </Button>
        <InputFile
          name="Image Product"
          uploadedImage={uploadedImage}
          setUploadedImage={setUploadedImage}
        />
        <Button
          type="submit"
          variant="bg-slate-800 text-white hover:bg-slate-900"
          className="w-full mt-10"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Add Product"}
        </Button>
      </form>
    </Modal>
  );
};

export default ModalAddProduct;
