import instance from "@/lib/axios/instance";

const endPoint = {
  user: "/api/user",
  cart: "/api/user/cart",
  profile: "/api/user/profile",
};

const userServices = {
  getAllUser: () => instance.get(endPoint.user),
  updateUser: (id: string, data: any) =>
    instance.put(`${endPoint.user}/${id}`, { data }),
  deleteUser: (id: string) => instance.delete(`${endPoint.user}/${id}`),
  getProfile: () => instance.get(endPoint.profile),
  updateProfile: (data: any) => instance.put(endPoint.profile, { data }),
  getCarts: () => instance.get(endPoint.cart),
  addToCart: (data: any) => instance.put(endPoint.cart, { data }),
};

export default userServices;
