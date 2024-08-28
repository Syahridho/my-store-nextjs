import { ToasterContext } from "@/context/ToasterContext";
import { ToasterType } from "@/types/toaster.type";
import { useContext, useEffect, useRef, useState } from "react";

const toasterVariant: any = {
  success: {
    title: "Success",
    icon: "bx-check-circle",
    color: "text-green-500",
    barColor: "bg-green-800",
  },
  danger: {
    title: "Error",
    icon: "bx-x-circle",
    color: "text-red-500",
    barColor: "bg-red-800",
  },
  warning: {
    title: "Warning",
    icon: "bx-error",
    color: "text-yellow-500",
    barColor: "bg-yellow-800",
  },
  info: {
    title: "Info",
    icon: "bx-info-circle",
    color: "text-blue-500",
    barColor: "bg-blue-800",
  },
};

const Toaster = () => {
  const { toaster, setToaster }: ToasterType = useContext(ToasterContext);
  const [lengthBar, setLengthBar] = useState(100);
  const timerRef = useRef<any>(null);

  const timerStart = () => {
    timerRef.current = setInterval(() => {
      setLengthBar((prevLength) => prevLength - 0.14);
    }, 1);
  };

  useEffect(() => {
    timerStart();
    return () => {
      clearInterval(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (lengthBar < 0) {
      setToaster({});
    }
  }, [lengthBar, setToaster]);

  return (
    <div
      className={`px-5 py-2 fixed bottom-5 left-1/2 -translate-x-2/4 z-50 flex bg-white shadow-2xl rounded overflow-hidden ring ring-gray-100`}
    >
      <div className="flex items-center justify-center gap-4 pb-2">
        <div className="text-4xl mt-2">
          <i
            className={`bx ${toasterVariant[`${toaster.variant}`].icon} ${
              toasterVariant[`${toaster.variant}`].color
            }`}
          />
        </div>
        <div className="">
          <h1 className="font-semibold">
            {toasterVariant[`${toaster.variant}`].title}
          </h1>
          <p className="text-sm">{toaster.message}</p>
        </div>
        <div
          className="absolute top-1 right-2 cursor-pointer text-xl rounded-full"
          onClick={() => setToaster({})}
        >
          <i className="bx bx-x"></i>
        </div>
      </div>
      <div
        className={`w-full bg-black h-1 absolute bottom-0 left-0 ${`${toaster.variant}`}`}
      >
        <div
          style={{ width: `${lengthBar}%` }}
          className={`h-full ${toasterVariant[`${toaster.variant}`].barColor}`}
        />
      </div>
    </div>
  );
};

export default Toaster;
