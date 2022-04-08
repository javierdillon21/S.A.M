import React, { createContext, useContext } from "react";

export type MemberStateMedia = {
  fotografia: string;
};

export const MemberState: MemberStateMedia = {
  fotografia: "/../../public/image_profile.png",
};

export const MemberContextMedia = createContext(MemberState);
