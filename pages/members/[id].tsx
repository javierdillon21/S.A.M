import React, { useState } from "react";
import Header from "../../components/header";

import MemberDataTemplate from "../../components/memberDataTemplate";

export default function Miembro() {
  return (
    <>
      <Header title_page="Miembros"></Header>
      <MemberDataTemplate mode={"reading"}></MemberDataTemplate>
    </>
  );
}
