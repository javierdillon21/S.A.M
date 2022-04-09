import { Storage } from "aws-amplify";
import React, { ChangeEvent, useContext, useState } from "react";
import Input from "../components/input";
import UploadTakePhoto from "../components/uploadTakePhoto";
import { MemberContextMedia } from "../src/context/members";
import { GetFormatedDate } from "../src/utils/date";
import Image from "next/image";
import { sendImage } from "../src/utils/storage";
export default function Test() {
  const [image, setImage] = useState<null | ArrayBuffer | string>(
    "/../public/image_profile.png"
  );
  async function subir() {
    const result = await Storage.put(`0932530199.png`, image, {
      contentType: "image/png",
      // progressCallback(progress) {
      //   console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
      // },
    });
  }
  function PreviewFile(e: ChangeEvent<HTMLInputElement>) {
    const reader = new FileReader();
    const file = e.target.files ? e.target.files[0] : undefined;
    reader.addEventListener(
      "load",
      () => {
        setImage(reader.result);
      },
      false
    );
    if (file) {
      reader.readAsDataURL(file);
    } else {
      setImage("/../public/image_profile.png");
    }
  }
  console.log(image);
  return (
    <div>
      {/* <Input type="select">
        <optgroup label="JUDA">
          <option>Sembrador|Semillero</option>
        </optgroup>
      </Input>
      <span> {GetFormatedDate()}</span> */}
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
      <button onClick={() => sendImage(image as string, "_Foto_0932530199")}>
        SUBIR
      </button>
    </div>
  );
}
