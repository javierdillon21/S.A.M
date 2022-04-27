import React, { createContext, useEffect, useState } from "react";
import Menu from "./menu";

export type MemberStateMedia = {
  fotografia: string;
  setFotografia: null | Function;
};

export const MemberInitialMediaState: MemberStateMedia = {
  fotografia: "/../../public/image_profile.png",
  setFotografia: null,
};
export const MemberContextMedia = createContext(MemberInitialMediaState);

export default function Layout(props: { children: React.ReactElement }) {
  const [fotografia, setFotografia] = useState<string>("");
  function setFoto(fotoKey: string) {
    setFotografia(fotoKey);
  }
  return (
    <MemberContextMedia.Provider
      value={{ fotografia: fotografia, setFotografia: setFoto }}
    >
      <div className="flex flex-col-reverse min-h-screen min-w-screen sm:flex-row bg-gray-100">
        <Menu />
        <div
          id="bodypage"
          className="flex flex-col flex-1 w-auto h-auto items-center gap-6"
        >
          <div className="flex flex-col flex-1 w-full h-full items-center gap-6">
            {props.children}
          </div>
        </div>
      </div>
    </MemberContextMedia.Provider>
  );
}
