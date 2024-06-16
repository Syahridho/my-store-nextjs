import { Dispatch, SetStateAction, useEffect, useState } from "react";
import AdminLayout from "@/components/layouts/AdminLayout";
import Button from "@/components/ui/Button";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { convertIDR } from "@/utils/currency";
import { Product } from "@/types/product.type";

type PropTypes = {
  products: Product[];
  setToaster: Dispatch<SetStateAction<{}>>;
};

const ProductsAdminView = (props: PropTypes) => {
  const { products, setToaster } = props;
  const session: any = useSession();

  const [productsData, setProductsData] = useState<Product[]>([]);

  useEffect(() => {
    setProductsData(products);
  }, [products]);

  console.log(productsData);
  return (
    <>
      <AdminLayout>
        <div className="p-12">
          <h1 className="text-xl font-semibold">Products Management</h1>
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
                <>
                  <tr key={product.id}>
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
                      {product.categore}
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
                          // onClick={() => setUpdateUser(user)}
                        >
                          <i className="bx bxs-edit-alt" />
                        </Button>
                        <Button
                          type="button"
                          variant="bg-red-600 text-white hover:bg-red-700 border-red-600"
                          className="px-2"
                          // onClick={() => setDeleteUser(user)}
                        >
                          <i className="bx bxs-trash" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                  {product.stock.map(
                    (stock: { size: string; qty: number }, index: number) => (
                      <>
                        {index > 0 && (
                          <tr key={stock.size}>
                            <td className="text-center">{stock.size}</td>
                            <td className="text-center">{stock.qty}</td>
                          </tr>
                        )}
                      </>
                    )
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </AdminLayout>
    </>
  );
};

export default ProductsAdminView;
