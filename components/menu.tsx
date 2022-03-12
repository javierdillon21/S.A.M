import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";

export default function Menu() {
  return (
    <div className="flex flex-col h-full w-16 items-center bg-primary-100 py-5 text-tertiary-100">
      <span className="flex w-4/5 h-auto items-center justify-center py-3 mb-6">
        <Link href={"/"}>
          <FontAwesomeIcon icon="church" size="lg" className="text-current" />
        </Link>
      </span>
      <div className="grid grid-cols-1 h-64 w-4/5 items-center justify-items-center gap-2">
        <Link href={"/members"}>
          <FontAwesomeIcon icon="users" size="lg" className="text-current" />
        </Link>
        <FontAwesomeIcon
          icon="clipboard-list"
          size="lg"
          className="text-current"
        />
        <FontAwesomeIcon
          icon="calendar-alt"
          size="lg"
          className="text-current"
        />
        <FontAwesomeIcon icon="chart-pie" size="lg" className="text-current" />

        <Link href={"/settings"}>
          <FontAwesomeIcon icon="cogs" size="lg" className="text-current" />
        </Link>
      </div>
      <span className="flex flex-1 w-4/5 items-center justify-center py-3">
        <FontAwesomeIcon
          icon="question-circle"
          size="lg"
          className="text-current self-end"
        />
      </span>
    </div>
  );
}
