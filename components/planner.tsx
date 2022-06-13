import React from "react";
import { useMutation, useQuery } from "urql";
import {
  CreateReunionMutation,
  CreateReunionMutationVariables,
} from "../src/API";
import { createReunion } from "../src/graphql/mutations";
import { listReunions } from "../src/graphql/queries";
import { Caracter } from "../src/utils/customTypesSAM";
import Input from "./input";

export default function MeetPlanner() {
  const [resultListReuniones, reexecuteListReuniones] = useQuery({
    query: listReunions,
  });

  const [createMiembroResult, crearMiembro] = useMutation<
    CreateReunionMutation,
    CreateReunionMutationVariables
  >(createReunion);

  function SubmitReunion() {}

  return (
    <div className="flex flex-col w-full gap-4">
      <form className="grid grid-cols-2 border-b-2 pb-2 px-4 gap-x-2">
        <Input type="date" label="Fecha"></Input>
        <Input type="time" label="Horario"></Input>
        <Input type="select" label="Caracter">
          {Object.keys(Caracter).map((op, i) => {
            return <option key={`${op}-${i}-Caracter`}>{op}</option>;
          })}
        </Input>

        <button
          onClick={(e) => {
            e.preventDefault();
          }}
          className="flex h-15 self-end border rounded-md py-1 px-2 justify-center items-center text-lg text-tertiary-100 bg-secondary-50"
        >
          Añadir reunión
        </button>
      </form>
    </div>
  );
}
