import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function Header(props: { title_page?: string }) {
  return (
    <div className="flex sticky top-0 flex-row h-20 w-full items-center justify-between bg-white shadow-md border-b border px-6 rounded-b-md">
      <span className="flex text-lg font-medium text-gray-500">
        {props.title_page}
      </span>
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
