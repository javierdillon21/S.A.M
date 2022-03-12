import React, {
  ChangeEvent,
  EventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import Input from "./input";
import Image from "next/image";

export default function UploadTakePhoto() {
  const [image, setImage] = useState<null | ArrayBuffer | string>(
    "/../public/image_profile.png"
  );
  const [loading, setLoading] = useState(false);

  async function imageHandler(e: ChangeEvent<HTMLInputElement>) {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
        reader.abort();
      }
    };
    if (e.target.files) reader.readAsDataURL(e.target.files[0]);
  }

  return (
    <div className="flex flex-col items-center">
      <Image src={image as string} width={141.6} height={166.8} />
      <input
        type="file"
        placeholder="Subir imagen"
        onChange={imageHandler}
        accept="image/*"
        className="flex text-sm text-slate-500
      file:mr-4 file:py-1 file:px-2
      file:rounded-md file:border
      file:text-sm file:font-semibold
      file:bg-secondary-50 file:text-white
      hover:file:bg-secondary-100 file:placeholder-shown:
    "
      ></input>
      <button onClick={() => setImage("/../public/image_profile.png")}>
        Eliminar foto
      </button>
    </div>
  );
}
