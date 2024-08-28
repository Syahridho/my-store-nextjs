import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { ToasterContext } from "@/context/ToasterContext";
import { deleteFile } from "@/lib/firebase/service";
import productServices from "@/services/product";
import { Product } from "@/types/product.type";
import { ToasterType } from "@/types/toaster.type";
import { Dispatch, SetStateAction, useContext, useState } from "react";

type PropTypes = {
  setProductsData: Dispatch<SetStateAction<Product[]>>;
  deletedProduct: Product | any;
  setDeleteProduct: Dispatch<SetStateAction<{}>>;
};

const ModalDeleteProduct = (props: PropTypes) => {
  const { deletedProduct, setDeleteProduct, setProductsData } = props;

  const { setToaster }: ToasterType = useContext(ToasterContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    const result = await productServices.deleteProduct(deletedProduct.id);

    if (result.status === 200) {
      setIsLoading(false);
      deleteFile(
        `/images/products/${deletedProduct.id}/${
          deletedProduct.image.split("%2F")[3].split("?")[0]
        }`,
        async (status: boolean) => {
          setToaster({
            variant: "success",
            message: "Success Delete Product",
          });
          setDeleteProduct({});
          const { data } = await productServices.getAllProducts();
          setProductsData(data.data);
        }
      );
    } else {
      setIsLoading(false);
      setToaster({
        variant: "danger",
        message: "Failed Delete Product",
      });
    }
  };

  return (
    <Modal onClose={() => setDeleteProduct({})}>
      <h1 className="text-center font-semibold text-xl">Are you sure</h1>
      <Button
        type="button"
        variant="bg-red-500 border-red-500 text-white shadow"
        className="w-52 text-center mx-auto mt-6"
        onClick={() => handleDelete()}
      >
        Delete
      </Button>
    </Modal>
  );
};

export default ModalDeleteProduct;
