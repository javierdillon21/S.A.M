import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { SelectedSubTab, SelectedTabChanger } from "../src/context/tabs";

export type Tab = {
  name: string;
  path: string;
};
export default function Header(props: {
  title_page: string;
  tabs?: Tab[];
  currentRoute?: string;
}) {
  // const [selectedTab, setSelectedTab] = useState<number>(0);
  // console.log(selectedTab);
  const TabChanger = useContext(SelectedTabChanger);
  const selectedTab = useContext(SelectedSubTab);

  return (
    <div className="flex sticky top-0 z-10 flex-col h-24 w-full items-center ">
      <div className="flex h-16 w-full bg-white border-b rounded-b-md">
        <span className="flex text-lg font-medium text-primary-100 sm:w-1/6 sm:border-r items-center px-6">
          {props.title_page}
        </span>
      </div>

      <div
        className={`flex h-8 w-full ${
          !props.tabs ? "bg-gray-100" : "bg-gray-100"
        } shadow-sm `}
      >
        <span className="flex flex-row overflow-auto text-xs capitalize font-medium text-gray-500 sm:w-1/2 px-3">
          {props.tabs?.map((tab, i) => {
            return (
              <Link
                href={props.currentRoute + tab.path}
                key={`pestaña-${tab}-n.${i}`}
              >
                <p
                  onClick={() => {
                    if (TabChanger)
                      TabChanger({
                        title_page: props.title_page,
                        current_route: props.currentRoute,
                        selectedTab: i,
                      });
                  }}
                  className={`flex sm:w-28 justify-center text-center ${
                    selectedTab.indexTab === i
                      ? "border-b-2 border-b-secondary-50 text-secondary-100"
                      : ""
                  } hover:border-b-2 hover:border-b-secondary-50 font-bold hover:text-secondary-100 items-center px-3`}
                >
                  {tab.name}
                </p>
              </Link>
            );
          })}
        </span>
      </div>
    </div>
  );
}
