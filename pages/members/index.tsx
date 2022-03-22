import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "urql";
import CreateMemberTemplate from "../../components/memberDataTemplate";
import Header from "../../components/header";
import ListTable from "../../components/listTable";
import { listMinisterios } from "../../src/graphql/queries";
import { listPreviewMiembros } from "../../src/utils/customTypesSAM";
import { useRouter } from "next/router";

export default function Miembros() {
  const [resultPreviewMiembros, reexPreviewMiembros] = useQuery({
    query: listPreviewMiembros,
  });
  const route = useRouter();
  console.log(route);

  if (resultPreviewMiembros.data == undefined) return <div>loading...</div>;
  console.log(resultPreviewMiembros);
  return (
    <div className="flex flex-col flex-1 w-auto h-auto items-center gap-6">
      <Header title_page="Miembros" />

      <ListTable
        data={resultPreviewMiembros.data.listMiembros.items}
      ></ListTable>
    </div>
  );
}
