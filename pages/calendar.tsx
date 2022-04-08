import { useRouter } from "next/router";
import React from "react";
import Header from "../components/header";

export default function Calendario() {
  const router = useRouter().asPath;
  console.log(router);
  return (
    <>
      <Header
        title_page="Calendario"
        tabs={[
          { name: "planificador", path: "" },
          { name: "reuniones planificadas", path: "" },
        ]}
        currentRoute={router}
      ></Header>
    </>
  );
}
