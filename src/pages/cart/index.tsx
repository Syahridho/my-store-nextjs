import CartView from "@/components/views/cart";
import productServices from "@/services/product";
import userServices from "@/services/user";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useEffect, useState } from "react";

const CartPage = () => {
  const session: any = useSession();

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  const getAllProducts = async () => {
    const { data } = await productServices.getAllProducts();
    setProducts(data.data);
  };

  const getCart = async () => {
    const { data } = await userServices.getCarts();
    setCart(data.data);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    if (session.data?.accessToken) {
      getCart();
    }
  }, [session]);

  return (
    <>
      <Head>
        <title>Cart</title>
      </Head>
      <CartView products={products} cart={cart} />
    </>
  );
};

export default CartPage;
