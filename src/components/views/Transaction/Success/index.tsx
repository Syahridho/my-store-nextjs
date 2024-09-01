import Button from "@/components/ui/Button";
import { useRouter } from "next/router";

const SuccessView = () => {
  const { push } = useRouter();
  return (
    <div className="flex flex-col justify-center items-center gap-2 h-screen">
      <h1>Payment Success</h1>
      <Button type="button" onClick={() => push("/member/order")}>
        Check Your Order here
      </Button>
    </div>
  );
};

export default SuccessView;
