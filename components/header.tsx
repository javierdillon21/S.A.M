import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function Header(props: { title_page?: string }) {
  return (
    <div className="flex sticky top-0 flex-row h-16 w-full items-center justify-between bg-white border-b border px-6 rounded-b-md">
      <span className="flex text-lg font-medium text-primary-100 sm:w-1/6 sm:border-r">
        {props.title_page}
      </span>
      <span></span>
      <span>
        <FontAwesomeIcon
          icon="sign-out-alt"
          size="lg"
          className="text-current text-primary-100"
        />
      </span>
    </div>
  );
}
