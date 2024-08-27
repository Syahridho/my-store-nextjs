import instance from "@/lib/axios/instance";

const endPoint = "/api/product";

const productServices = {
  getAllProducts: () => instance.get(endPoint),
  getDetailProduct: (id: string) => instance.get(`${endPoint}/${id}`),
  addProduct: (data: any) => instance.post(endPoint, data),
  updateProduct: (id: string, data: any) =>
    instance.put(`${endPoint}/${id}`, { data }),
  deleteProduct: (id: string) => instance.delete(`${endPoint}/${id}`),
};

export default productServices;
