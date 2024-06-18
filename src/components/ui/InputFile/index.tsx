import { Dispatch, SetStateAction } from "react";

type PropTypes = {
  uploadedImage: File | null;
  name: string;
  setUploadedImage: Dispatch<SetStateAction<File | null>>;
};

const InputFile = (props: PropTypes) => {
  const { uploadedImage, setUploadedImage, name } = props;
  return (
    <div>
      <label
        htmlFor={name}
        className="block mb-2
      "
      >
        Upload Image
      </label>
      <input
        type="file"
        name={name}
        className="w-auto hover:cursor-pointer bg-slate-800 text-white"
        id={name}
        onChange={(e: any) => {
          e.preventDefault();
          setUploadedImage(e.currentTarget.files[0]);
        }}
      />
    </div>
  );
};

export default InputFile;
