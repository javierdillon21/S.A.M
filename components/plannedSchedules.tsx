import React from "react";
import { useMutation, useQuery } from "urql";
import {
  CreateReunionMutation,
  CreateReunionMutationVariables,
} from "../src/API";
import { createReunion } from "../src/graphql/mutations";
import { listReunions } from "../src/graphql/queries";

export default function PlannedSchedules() {
  const [resultListReuniones, reexecuteListReuniones] = useQuery({
    query: listReunions,
  });

  const [createMiembroResult, crearMiembro] = useMutation<
    CreateReunionMutation,
    CreateReunionMutationVariables
  >(createReunion);

  return (
    <div>
      {resultListReuniones.data?.listReunions?.items && (
        <div>
          {resultListReuniones.data.listReunions.items.map((r: any) => {
            return <span>reuniones: {r}</span>;
          })}
        </div>
      )}
    </div>
  );
}
