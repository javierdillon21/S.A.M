import React, { createContext, useContext } from "react";

export type MemberStateMedia = {
  fotografia: string;
};

export const MemberInitialMediaState: MemberStateMedia = {
  fotografia: "/../../public/image_profile.png",
};

export const MemberContextMedia = createContext(MemberInitialMediaState);
export const MemberContextMediaChanger = createContext<Function | null>(null);
