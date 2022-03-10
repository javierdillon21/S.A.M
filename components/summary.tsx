import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function Summary() {
  return (
    <div className="grid grid-cols-4 h-32 w-11/12 gap-3">
      <div className="flex flex-row h-auto items-center justify-start gap-3 bg-white shadow-md px-2 rounded-md">
        <span className="flex h-6 w-6 ">
          <FontAwesomeIcon
            icon="fire"
            size="lg"
            className="text-current text-primary-100"
          />
        </span>
        <span className="flex flex-col gap-2">
          <a>ACTIVOS</a>
          <a>123</a>
        </span>
      </div>
    </div>
  );
}
