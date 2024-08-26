import instance from "@/lib/axios/instance";

const userServices = {
  getAllUser: () => instance.get("/api/user"),
  updateUser: (id: string, data: any, token: string) =>
    instance.put(
      `/api/user/${id}`,
      { data },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ),
  deleteUser: (id: string, token: string) =>
    instance.delete(`/api/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  getProfile: (token: string) =>
    instance.get("/api/user/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  updateProfile: (data: any, token: string) =>
    instance.put(
      `/api/user/profile/`,
      { data },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ),
  getCarts: (token: string) =>
    instance.get("/api/user/cart", {
      headers: {
        Authorization: `bearer ${token}`,
      },
    }),
  addToCart: (data: any, token: string) =>
    instance.put(
      "/api/user/cart",
      { data },
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
      }
    ),
};

export default userServices;
