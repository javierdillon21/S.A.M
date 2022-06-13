import { useRouter } from "next/router";
import React from "react";
import Header from "../components/header";
import MeetPlanner from "../components/planner";

export default function Calendario() {
  const router = useRouter().asPath;
  console.log(router);
  return (
    <>
      <Header title_page="Calendario"></Header>
      <MeetPlanner />
    </>
  );
}
