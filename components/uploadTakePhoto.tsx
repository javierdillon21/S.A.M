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
import { resourceLimits } from "worker_threads";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function UploadTakePhoto(props: {
  mode: "reading" | "creating";
}) {
  const [image, setImage] = useState<null | ArrayBuffer | string>(
    "/../public/image_profile.png" //imagen guardada en el buffer para mostrar
  );
  const [exceeds, setExceeds] = useState<boolean>(false);
  const setFotoinContext = useContext(MemberContextMedia).setFotografia;
  const mediacontext = useContext(MemberContextMedia).fotografia;
  console.log(`el contexto: ${mediacontext}`);
  useEffect(() => {
    if (props.mode === "reading") {
      setImage(mediacontext);
      if (mediacontext !== "") {
      }
      // Storage.get(props.fotoKey) // buscamos la imagen (archivo) en el bucket de s3
      //   .then((result) => {
      //     console.log(`foto : ${result}`);
      //     setImage(result);
      //     if (setFotoinContext) {
      //       setFotoinContext(result);
      //     }
      //   })
      //   .catch((err) => console.log(`Error al obtener la foto: ${err}`));
    } else if (props.mode === "creating") {
      if (setFotoinContext) setFotoinContext("");
    }
  }, [mediacontext]);

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
      if (file.size > 400000) {
        setExceeds(true);
        console.log(`el tamaño del archivo es: ${file.size}`);
      } else setExceeds(false);
    } else {
      setExceeds(false);
      setImage("/../public/image_profile.png");
      if (setFotoinContext) setFotoinContext(""); //Si se cancela la carga de la foto, se actuliza el contexto
    }
  }

  return (
    <div className="flex flex-col items-center gap-y-5">
      <div className="w-44 h-52 shadow-lg border">
        {image !== "" && (
          <Image
            src={image as string}
            width={176}
            height={208}
            alt="fotografía_miembro"
            className="object-cover"
          />
        )}
        {image === "" && (
          <p className="flex w-full h-full items-center justify-center font-bold text-xl text-gray-400">
            SIN FOTO
          </p>
        )}
      </div>

      <div className="flex flex-col gap-y-2 justify-center items-center">
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
        {exceeds && (
          <span className="flex flex-row justify-center items-center text-sm font-medium text-delete-100 py-0.5 px-2 rounded-sm border-delete-100 gap-x-2">
            <FontAwesomeIcon icon={"exclamation"} />
            <p>El archivo excede el límite de 400Kb</p>
          </span>
        )}
      </div>
    </div>
  );
}
