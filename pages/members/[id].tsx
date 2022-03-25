import React from "react";
import Header from "../../components/header";
import MemberDataTemplate from "../../components/memberDataTemplate";

export default function Miembro() {
  return (
    <div className="flex flex-col flex-1 w-auto h-auto items-center gap-6">
      <Header title_page="Miembros"></Header>
      <MemberDataTemplate mode={"reading"}></MemberDataTemplate>
    </div>
  );
}
