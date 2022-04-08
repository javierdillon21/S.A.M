import { AppProps } from "next/app";
import React, {
  createContext,
  JSXElementConstructor,
  PropsWithChildren,
  useReducer,
} from "react";
import { Props } from "react-select";
import { createBrotliDecompress } from "zlib";

export type TabState = {
  indexTab: number;
  nameTab: string;
};

// enum TabActionType {
//   UPDATE = "UPDATE",
//   CLEAN = "CLEAN",
// }
// export type TabAction = {
//   payload: TabState;
//   type: TabActionType;
// };
export const tabInitialState = {
  indexTab: 0,
  nameTab: "",
};

export const SelectedSubTab = createContext<TabState>(tabInitialState);
export const SelectedTabChanger = createContext<Function | null>(null);
