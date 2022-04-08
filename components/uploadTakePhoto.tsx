import React, {
  ChangeEvent,
  EventHandler,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Input from "./input";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MemberContextMedia, MemberState } from "./memberContext/memberState";

export default function UploadTakePhoto() {
  const [image, setImage] = useState<null | ArrayBuffer | string>(
    "/../public/image_profile.png"
  );

  const foto = useContext(MemberContextMedia);

  async function imageHandler(e: ChangeEvent<HTMLInputElement>) {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
      }
    };
    if (e.target.files) reader.readAsDataURL(e.target.files[0]);
  }

  return (
    <div className="flex flex-col items-center gap-y-5">
      <Image
        src={image as string}
        width={141.6}
        height={166.8}
        alt="fotografía_miembro"
      />
      <div className="flex flex-row gap-x-2 justify-center items-center">
        <input
          type="file"
          placeholder="Subir imagen"
          onChange={imageHandler}
          accept="image/*"
          className="flex text-sm text-slate-500
      file:mr-4 file:py-1 file:px-2
      file:rounded-md file:border-0
      file:text-sm file:font-semibold
      file:bg-secondary-50 file:text-tertiary-100
      hover:file:bg-secondary-100 file:placeholder-shown:
    "
        ></input>
        <button
          onSubmit={(e) => {}}
          onClick={(e) => {
            e.preventDefault();
            setImage("/../public/image_profile.png");
          }}
        >
          <FontAwesomeIcon
            icon="trash"
            size="1x"
            className="text-current text-slate-500"
          />
        </button>
      </div>
    </div>
  );
}
