import React, { useState } from "react";
import Header from "../../components/header";
import {
  MemberContextMedia,
  MemberContextMediaChanger,
  MemberInitialMediaState,
  MemberStateMedia,
} from "../../src/context/members";
import MemberDataTemplate from "../../components/memberDataTemplate";

export default function Miembro() {
  const [memberMedia, setMemberMedia] = useState<MemberStateMedia>(
    MemberInitialMediaState
  );
  function memberMediaUpdater(data: MemberStateMedia) {
    setMemberMedia(data);
  }
  return (
    <MemberContextMedia.Provider value={memberMedia}>
      <MemberContextMediaChanger.Provider value={memberMediaUpdater}>
        <div className="flex flex-col flex-1 w-auto h-auto items-center gap-6">
          <Header title_page="Miembros"></Header>
          <MemberDataTemplate mode={"reading"}></MemberDataTemplate>
        </div>
      </MemberContextMediaChanger.Provider>
    </MemberContextMedia.Provider>
  );
}
