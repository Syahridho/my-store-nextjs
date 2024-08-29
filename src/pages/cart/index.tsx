import CartView from "@/components/views/Carts";
import Head from "next/head";

const CartPage = () => {
  return (
    <>
      <Head>
        <title>Cart</title>
      </Head>
      <CartView />
    </>
  );
};

export default CartPage;
