import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import InputFile from "@/components/ui/InputFile";
import Modal from "@/components/ui/Modal";
import Select from "@/components/ui/Select";
import { uploadFile } from "@/lib/firebase/service";
import productServices from "@/services/product";
import { Product } from "@/types/product.type";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";

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
  const session: any = useSession();

  const handleStock = (e: any, i: number, type: string) => {
    const newStockCount: any = [...stockCount];
    newStockCount[i][type] = e.target.value;
    setStockCount(newStockCount);
  };

  const uploadImage = async (id: string, form: any) => {
    const file = form.image.files[0];
    const newName = "main." + file.name.split(".")[1];
    if (file) {
      await uploadFile(
        id,
        file,
        newName,
        "products",
        async (status: boolean, newImageURL: string) => {
          if (status) {
            const data = {
              image: newImageURL,
            };

            const result = await productServices.updateProduct(
              id,
              data,
              session.data?.accessToken
            );

            if (result.status === 200) {
              setIsLoading(false);
              setUploadedImage(null);
              form.reset();
              setModalAddProduct(false);
              const { data } = await productServices.getAllProducts();
              setProductsData(data.data);
              setToaster({
                variant: "success",
                message: "Success Add Product",
              });
            } else {
              setIsLoading(false);
              setToaster({
                variant: "danger",
                message: "Failed Add Product",
              });
            }
          } else {
            setIsLoading(false);
            setToaster({
              variant: "danger",
              message: "Failed Add Product",
            });
          }
        }
      );
    } else {
      setIsLoading(false);
      setToaster({
        variant: "danger",
        message: "No file selected",
      });
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const form: any = event.target as HTMLFormElement;
    const stock = stockCount.map((stock) => {
      return {
        size: stock.size,
        qty: parseInt(`${stock.qty}`),
      };
    });
    const data = {
      name: form.name.value,
      price: parseInt(form.price.value),
      category: form.category.value,
      status: form.status.value,
      stock: stock,
      image: "",
    };

    const result = await productServices.addProduct(
      data,
      session.data?.accessToken
    );

    if (result.status === 200) {
      uploadImage(result.data.data.id, form);
    } else {
      setIsLoading(false);
      setToaster({
        variant: "danger",
        message: "Failed to add product",
      });
    }
  };

  return (
    <Modal onClose={() => setModalAddProduct(false)}>
      <h1 className="text-center font-bold text-xl mb-2">Add Product</h1>
      <form onSubmit={handleSubmit}>
        <Input
          label="Name"
          name="name"
          type="text"
          placeholder="Insert Product Name"
        />
        <Input
          label="Price"
          name="price"
          type="number"
          placeholder="Insert Product Price"
        />
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
                name={`size_${i}`}
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
                name={`qty_${i}`}
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
        {uploadedImage && (
          <Image
            width={200}
            height={200}
            src={URL.createObjectURL(uploadedImage)}
            alt="image"
          ></Image>
        )}
        <InputFile
          name="image"
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
