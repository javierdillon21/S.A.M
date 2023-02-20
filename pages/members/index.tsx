import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "urql";
import CreateMemberTemplate from "../../components/memberDataTemplate";
import Header from "../../components/header";
import ListTable from "../../components/listTable";
import { listMinisterios } from "../../src/graphql/queries";
import { listPreviewMiembros } from "../../src/utils/customTypesSAM";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Input from "../../components/input";

export default function Miembros() {
 
  const [miembrosCache, setMiembrosCache]= useState<any>();
  async function getFromCache(tipo:string) {
    const response = await fetch(`http://34.235.129.222:3000/${tipo}`, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json'
    },
  });
    setMiembrosCache(response)
  }
   async function postToCache(data:any) {
      const response = await fetch('http://34.235.129.222:3000', {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
   }

  getFromCache("usuario");
  const [resultPreviewMiembros, reexPreviewMiembros] = useQuery({
    query: listPreviewMiembros,
    variables: { limit: 700 },
  });
  
  if(!miembrosCache){
    console.log(resultPreviewMiembros)
    if (resultPreviewMiembros.data == undefined) return <div>loading...</div>;
    postToCache(resultPreviewMiembros)
  }
  const route = useRouter();

  const [searchText, setSearchText] = useState<string>("");

  return (
    <>
      <Header title_page="Miembros" />
      <section className="flex items-end justify-center gap-2">
        <button className="pb-1 focus:outline-none">
          <FontAwesomeIcon icon="search" />
        </button>
        <Input
          className={`w-32 sm:w-56`}
          label="Buscar"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchText(e.target?.value)
          }
        />
        <button
          id="new member"
          className="border rounded-md py-1 sm:py-1 px-1 w-14 font-bold text-lg text-tertiary-100 bg-create-100"
          onClick={(e) => {
            e.preventDefault();
            route.push("members/new_member");
          }}
        >
          <FontAwesomeIcon
            icon={"user-plus"}
            size="sm"
            className="text-current text-base"
          />
        </button>
      </section>
      {(!miembrosCache) && (<ListTable
        data={resultPreviewMiembros.data.listMiembros.items.filter(
          (entity: Object) =>
            entity &&
            Object.values(entity)
              .join()
              .toLowerCase()
              .includes((searchText && searchText.toLowerCase()) || "")
        )}
        tableHeaders={Object.keys(
          resultPreviewMiembros.data.listMiembros.items[0]
        )}
      ></ListTable>)}
      {(miembrosCache) && (<ListTable
        data={miembrosCache.filter(
          (entity: Object) =>
            entity &&
            Object.values(entity)
              .join()
              .toLowerCase()
              .includes((searchText && searchText.toLowerCase()) || "")
        )}
        tableHeaders={Object.keys(
          miembrosCache[0]
        )}
      ></ListTable>)}
    </>
  );
}
