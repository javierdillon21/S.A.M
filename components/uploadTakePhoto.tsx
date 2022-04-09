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
import {
  MemberContextMedia,
  MemberContextMediaChanger,
  MemberInitialMediaState,
} from "../src/context/members";

export default function UploadTakePhoto() {
  const [image, setImage] = useState<null | ArrayBuffer | string>(
    "/../public/image_profile.png"
  );

  const memberMedia = useContext(MemberContextMedia);
  const memberMediaUpdater = useContext(MemberContextMediaChanger);
  console.log(memberMedia);
  /* VERSION ALTERNA EL HANDLER FILE*/
  // async function imageHandler(e: ChangeEvent<HTMLInputElement>) {
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     if (reader.readyState === 2) {
  //       setImage(reader.result);
  //       if (memberMediaUpdater)
  //         memberMediaUpdater({ fotografia: reader.result });
  //     }
  //   };
  //   if (e.target.files) reader.readAsDataURL(e.target.files[0]);
  // }

  function PreviewFile(e: ChangeEvent<HTMLInputElement>) {
    const reader = new FileReader();
    const file = e.target.files ? e.target.files[0] : undefined;
    reader.addEventListener(
      "load",
      () => {
        setImage(reader.result);
        if (memberMediaUpdater)
          memberMediaUpdater({ fotografia: reader.result });
      },
      false
    );
    if (file) {
      reader.readAsDataURL(file);
    } else {
      setImage("/../public/image_profile.png");
      if (memberMediaUpdater) memberMediaUpdater({ fotografia: "noimage" });
    }
  }

  return (
    <div className="flex flex-col items-center gap-y-5">
      <div className="w-44 h-52 shadow-lg">
        <Image
          src={image as string}
          width={176}
          height={208}
          alt="fotografía_miembro"
          className="object-cover"
        />
      </div>

      <div className="flex flex-row gap-x-2 justify-center items-center">
        <input
          type="file"
          placeholder="Subir imagen"
          onChange={PreviewFile}
          accept="image/*"
          className="flex text-sm text-slate-500
      file:mr-4 file:py-1 file:px-2
      file:rounded-md file:border-0
      file:text-sm file:font-semibold
      file:bg-secondary-50 file:text-tertiary-100
      hover:file:bg-secondary-100 file:placeholder-shown:
    "
        ></input>
        {/* <button
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
        </button> */}
      </div>
    </div>
  );
}
