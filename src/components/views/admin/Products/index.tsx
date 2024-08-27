import { Dispatch, Fragment, SetStateAction, useEffect, useState } from "react";
import AdminLayout from "@/components/layouts/AdminLayout";
import Button from "@/components/ui/Button";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { convertIDR } from "@/utils/currency";
import { Product } from "@/types/product.type";
import ModalAddProduct from "./ModalAddProduct";
import ModalUpdateProduct from "./ModalUpdateProduct";
import ModalDeleteProduct from "./ModalDeleteProduct";

type PropTypes = {
  products: Product[];
  setToaster: Dispatch<SetStateAction<{}>>;
};

const ProductsAdminView = (props: PropTypes) => {
  const { products, setToaster } = props;

  const [productsData, setProductsData] = useState<Product[]>([]);
  const [modalAddProduct, setModalAddProduct] = useState(false);
  const [updateProduct, setUpdateProduct] = useState<Product | {}>({});
  const [deletedProduct, setDeletedProduct] = useState<Product | {}>({});

  useEffect(() => {
    setProductsData(products);
  }, [products]);
  return (
    <>
      <AdminLayout>
        <div className="p-12">
          <h1 className="text-xl font-semibold">Products Management</h1>
          <Button
            type="button"
            className=""
            onClick={() => setModalAddProduct(true)}
          >
            <i className="bx bx-plus" /> Add Product
          </Button>
          <table className="border-collapse border border-slate-500 w-full mt-4">
            <thead className="bg-gray-300">
              <tr>
                <th
                  rowSpan={2}
                  className="border border-slate-200 py-1 px-2 text-sm"
                >
                  #
                </th>
                <th
                  rowSpan={2}
                  className="border border-slate-200 py-1 px-2 text-sm"
                >
                  Image
                </th>
                <th
                  rowSpan={2}
                  className="border border-slate-200 py-1 px-2 text-sm"
                >
                  Name
                </th>
                <th
                  rowSpan={2}
                  className="border border-slate-200 py-1 px-2 text-sm"
                >
                  Category
                </th>
                <th
                  rowSpan={2}
                  className="border border-slate-200 py-1 px-2 text-sm"
                >
                  Price
                </th>
                <th
                  colSpan={2}
                  className="border border-slate-200 py-1 px-2 text-sm"
                >
                  Stock
                </th>
                <th
                  rowSpan={2}
                  className="border border-slate-200 py-1 px-2 text-sm"
                >
                  Action
                </th>
              </tr>
              <tr>
                <th className="border border-slate-200 py-1 px-2 text-sm">
                  Size
                </th>
                <th className="border border-slate-200 py-1 px-2 text-sm">
                  Qty
                </th>
              </tr>
            </thead>
            <tbody>
              {productsData.map((product, index) => (
                <Fragment key={product.id}>
                  <tr>
                    <td
                      rowSpan={product.stock.length}
                      className="border border-slate-200 py-1 px-2 text-sm text-center"
                    >
                      {index + 1}
                    </td>
                    <td
                      rowSpan={product.stock.length}
                      className="border border-slate-200 py-1 px-2 text-sm text-center"
                    >
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={100}
                        height={100}
                      />
                    </td>
                    <td
                      rowSpan={product.stock.length}
                      className="border border-slate-200 py-1 px-2 text-sm text-center"
                    >
                      {product.name}
                    </td>
                    <td
                      rowSpan={product.stock.length}
                      className="border border-slate-200 py-1 px-2 text-sm text-center"
                    >
                      {product.category}
                    </td>
                    <td
                      rowSpan={product.stock.length}
                      className="border border-slate-200 py-1 px-2 text-sm text-center"
                    >
                      {convertIDR(product.price)}
                    </td>
                    <td className="text-center">{product.stock[0].size}</td>
                    <td className="text-center">{product.stock[0].qty}</td>
                    <td
                      rowSpan={product.stock.length}
                      className="border border-slate-200 py-1 px-2 text-sm"
                    >
                      <div className="flex gap-2 justify-center">
                        <Button
                          type="button"
                          variant="bg-slate-800 text-white hover:bg-slate-700"
                          className="px-2"
                          onClick={() => setUpdateProduct(product)}
                        >
                          <i className="bx bxs-edit-alt" />
                        </Button>
                        <Button
                          type="button"
                          variant="bg-red-600 text-white hover:bg-red-700 border-red-600"
                          className="px-2"
                          onClick={() => setDeletedProduct(product)}
                        >
                          <i className="bx bxs-trash" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                  {product.stock.map(
                    (stock: { size: string; qty: number }, index: number) => (
                      <Fragment key={stock.size}>
                        {index > 0 && (
                          <tr>
                            <td className="text-center">{stock.size}</td>
                            <td className="text-center">{stock.qty}</td>
                          </tr>
                        )}
                      </Fragment>
                    )
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </AdminLayout>
      {modalAddProduct && (
        <ModalAddProduct
          setModalAddProduct={setModalAddProduct}
          setToaster={setToaster}
          setProductsData={setProductsData}
        />
      )}
      {Object.keys(updateProduct).length > 0 ? (
        <ModalUpdateProduct
          setUpdateProduct={setUpdateProduct}
          updateProduct={updateProduct}
          setToaster={setToaster}
          setProductsData={setProductsData}
        />
      ) : null}
      {Object.keys(deletedProduct).length > 0 ? (
        <ModalDeleteProduct
          setDeleteProduct={setDeletedProduct}
          deletedProduct={deletedProduct}
          setToaster={setToaster}
          setProductsData={setProductsData}
        />
      ) : null}
    </>
  );
};

export default ProductsAdminView;
