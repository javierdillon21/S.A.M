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

import { Storage } from "aws-amplify";
import { MemberContextMedia } from "./layout";
import { ConsoleLogger } from "@aws-amplify/core";

export default function UploadTakePhoto(props: {
  fotoKey: string;
  mode: "reading" | "creating";
}) {
  const [image, setImage] = useState<null | ArrayBuffer | string>(
    "/../public/image_profile.png" //imagen guardada en el buffer para mostrar
  );

  const setFotoinContext = useContext(MemberContextMedia).setFotografia;
  const mediacontext = useContext(MemberContextMedia).fotografia;
  console.log(mediacontext);
  useEffect(() => {
    if (props.mode === "reading") {
      Storage.get(props.fotoKey) // buscamos la imagen (archivo) en el bucket de s3
        .then((result) => {
          console.log(`foto : ${result}`);
          setImage(result);
          if (setFotoinContext) {
            setFotoinContext(result);
          }
        })
        .catch((err) => console.log(`Error al obtener la foto: ${err}`));
    }
  }, []);

  function PreviewFile(e: ChangeEvent<HTMLInputElement>) {
    const reader = new FileReader();
    const file = e.target.files ? e.target.files[0] : undefined;
    reader.addEventListener(
      "load",
      () => {
        setImage(reader.result);
        if (setFotoinContext) {
          console.log("estoyaqui");
          setFotoinContext(reader.result); //Si se selecciona una foto para el miembro, se actualiza el contexto
        }
      },
      false
    );
    if (file) {
      reader.readAsDataURL(file);
    } else {
      setImage("/../public/image_profile.png");
      if (setFotoinContext) setFotoinContext(""); //Si se cancela la carga de la foto, se actuliza el contexto
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
      </div>
    </div>
  );
}
