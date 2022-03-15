import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";

export default function Menu() {
  return (
    <div className="flex flex-row sticky bottom-0 inset-x-0 px-1 h-20 text-primary-100 bg-gray-100 sm:flex-col sm:sticky sm:left-0 sm:top-0 sm:bottom-0 sm:h-screen sm:w-16 sm:bg-primary-100 sm:py-5 sm:text-tertiary-100">
      <span className="hidden sm:flex sm:w-4/5 h-auto sm:items-center sm:justify-center sm:py-3 sm:mb-6">
        <Link href={"/"}>
          <FontAwesomeIcon icon="church" size="lg" className="text-current" />
        </Link>
      </span>
      <div
        className="grid grid-cols-5 w-full
        sm:grid-cols-1 sm:h-64 sm:w-4/5 items-center justify-items-center sm:gap-2"
      >
        <Link href={"/members"}>
          <FontAwesomeIcon
            icon="users"
            size="lg"
            className="text-current scale-110"
          />
        </Link>
        <FontAwesomeIcon
          icon="clipboard-list"
          size="lg"
          className="text-current scale-110"
        />
        <FontAwesomeIcon
          icon="calendar-alt"
          size="lg"
          className="text-current scale-110"
        />
        <FontAwesomeIcon
          icon="chart-pie"
          size="lg"
          className="text-current scale-110"
        />

        <Link href={"/settings"}>
          <FontAwesomeIcon
            icon="cogs"
            size="lg"
            className="text-current scale-110"
          />
        </Link>
      </div>
      <span className="hidden sm:flex sm:flex-1 sm:w-4/5 sm:items-center sm:justify-center sm:py-3">
        <FontAwesomeIcon
          icon="question-circle"
          size="lg"
          className="text-current self-end"
        />
      </span>
    </div>
  );
}
