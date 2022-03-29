import React from "react";
import Header from "../../components/header";
import MemberDataTemplate from "../../components/memberDataTemplate";

export default function NewMember() {
  return (
    <div className="flex flex-col flex-1 w-full h-full overflow-auto items-center gap-6 ">
      <Header title_page="Nuevo Miembro"></Header>
      <MemberDataTemplate mode="creating"></MemberDataTemplate>
    </div>
  );
}
