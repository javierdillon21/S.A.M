import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "urql";
import CreateMemberTemplate from "../components/createMemberTemplate";
import Header from "../components/header";

export default function Miembros() {
  return (
    <div className="flex flex-col flex-1 w-auto h-auto items-center gap-6">
      <Header title_page="Miembros" />
      <CreateMemberTemplate />
    </div>
  );
}
