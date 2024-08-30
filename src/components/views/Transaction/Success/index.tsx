import Button from "@/components/ui/Button";

const SuccessView = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-2 h-screen">
      <h1>Payment Success</h1>
      <Button type="button">Check Your Order here</Button>
    </div>
  );
};

export default SuccessView;
