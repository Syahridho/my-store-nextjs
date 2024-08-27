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
  setUpdateProduct: Dispatch<SetStateAction<boolean>>;
  updateProduct: Product | any;
  setToaster: Dispatch<SetStateAction<{}>>;
  setProductsData: Dispatch<SetStateAction<Product[]>>;
};

const ModalUpdateProduct = (props: Proptypes) => {
  const { setUpdateProduct, updateProduct, setToaster, setProductsData } =
    props;

  const [isLoading, setIsLoading] = useState(false);
  const [stockCount, setStockCount] = useState(updateProduct.stock);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);

  const handleStock = (e: any, i: number, type: string) => {
    const newStockCount: any = [...stockCount];
    newStockCount[i][type] = e.target.value;
    setStockCount(newStockCount);
  };

  const updateProducts = async (
    form: any,
    newImageURL: string = updateProduct.image
  ) => {
    const stock = stockCount.map((stock: any) => {
      return {
        size: stock.size,
        qty: parseInt(`${stock.qty}`),
      };
    });

    const data = {
      name: form.name.value,
      price: form.price.value,
      description: form.description.value,
      category: form.category.value,
      status: form.status.value,
      stock: stock,
      image: newImageURL,
    };

    const result = await productServices.updateProduct(updateProduct.id, data);

    if (result.status === 200) {
      setIsLoading(false);
      setUploadedImage(null);
      form.reset();
      setUpdateProduct(false);
      const { data } = await productServices.getAllProducts();
      setProductsData(data.data);
      setToaster({
        variant: "success",
        message: "Success Update Product",
      });
    } else {
      setIsLoading(false);
      setToaster({
        variant: "danger",
        message: "Failed Update Product",
      });
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const form: any = event.target as HTMLFormElement;

    const file = form.image.files[0];
    if (file) {
      const newName = "main." + file.name.split(".")[1];
      await uploadFile(
        updateProduct.id,
        file,
        newName,
        "products",
        async (status: boolean, newImageURL: string) => {
          if (status) {
            updateProducts(form, newImageURL);
          } else {
            setIsLoading(false);
            setToaster({
              variant: "danger",
              message: "Failed Update Product",
            });
          }
        }
      );
    } else {
      updateProducts(form);
    }
  };

  return (
    <Modal onClose={() => setUpdateProduct(false)}>
      <h1 className="text-center font-bold text-xl mb-2">Add Product</h1>
      <form onSubmit={handleSubmit}>
        <Input
          label="Name"
          name="name"
          type="text"
          placeholder="Insert Product Name"
          defaultValue={updateProduct.name}
        />
        <Input
          label="Price"
          name="price"
          type="number"
          placeholder="Insert Product Price"
          defaultValue={updateProduct.price}
        />
        <Input
          label="Description"
          name="description"
          type="text"
          placeholder="Insert Product Description"
          defaultValue={updateProduct.description}
        />
        <Select
          label="Category"
          name="category"
          options={[
            { label: "Men", value: "men" },
            { label: "Women", value: "women" },
          ]}
          defaultValue={updateProduct.category}
        ></Select>
        <Select
          label="Status"
          name="status"
          options={[
            { label: "Released", value: "true" },
            { label: "Not Realeased", value: "false" },
          ]}
          defaultValue={updateProduct.status}
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
                defaultValue={item.size}
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
                defaultValue={item.qty}
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
        <Image
          width={200}
          height={200}
          src={
            uploadedImage
              ? URL.createObjectURL(uploadedImage)
              : updateProduct.image
          }
          alt="image"
        ></Image>
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

export default ModalUpdateProduct;
