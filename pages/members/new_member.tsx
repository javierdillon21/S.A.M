import React from "react";
import Header from "../../components/header";
import MemberDataTemplate from "../../components/memberDataTemplate";

export default function NewMember() {
  return (
    <>
      <Header title_page="Nuevo Miembro"></Header>
      <MemberDataTemplate mode="creating"></MemberDataTemplate>
    </>
  );
}
