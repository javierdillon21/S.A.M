import React, { ChangeEvent, EventHandler, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "urql";
import {
  CreateReunionInput,
  CreateReunionMutation,
  CreateReunionMutationVariables,
} from "../src/API";
import { createReunion } from "../src/graphql/mutations";
import { listReunions } from "../src/graphql/queries";
import { Caracter, Dia } from "../src/utils/customTypesSAM";
import Input from "./input";

export default function MeetPlanner() {
  const [resultListReuniones, reexecuteListReuniones] = useQuery({
    query: listReunions,
  });

  const [hasta, setHasta] = useState<string>("");
  const [dia, setdia] = useState<string>();
  // Object.values;

  var reuniones: CreateReunionInput[] = [];

  console.log(resultListReuniones);
  const [createMiembroResult, crearMiembro] = useMutation<
    CreateReunionMutation,
    CreateReunionMutationVariables
  >(createReunion);
  const {
    register: registrarReunion,
    handleSubmit: handleSubmitReunion,
    watch: watchReunion,
    setValue: setValueReunion,
    formState: { errors },
  } = useForm<CreateReunionInput>({});

  function anadirhorarios(hasta: string, diaref: string) {
    const hoy = Date.parse(new Date().toString());
    const limite = Date.parse(hasta);
    console.log(`${hoy} ---- ${limite}`);
    for (var i = hoy; i <= limite; i += 86400000) {
      console.log(i);
      if (new Date(i).getDay() === 0) {
        console.log(new Date(i));
        // reuniones.push();
      }
    }
  }

  function SubmitReunion(input: CreateReunionInput) {
    crearMiembro({
      input: {
        fecha: input.fecha,
        horario: input.horario,
        caracter: input.caracter,
      },
    }).then((res) => {
      if (!res.error) {
        console.log("sucess");
      } else {
        console.log("failed");
      }
    });
  }

  return (
    <div className="flex flex-col w-full gap-4">
      <form
        className="grid grid-cols-2 border-b-2 pb-2 px-4 gap-x-2"
        // onSubmit={handleSubmitReunion(SubmitReunion)}
      >
        <Input
          type="date"
          label="Fecha"
          register={registrarReunion("fecha")}
        ></Input>
        <Input
          type="time"
          label="Horario"
          register={registrarReunion("horario")}
        ></Input>
        <Input
          type="select"
          label="Caracter"
          register={registrarReunion("caracter")}
        >
          {Object.keys(Caracter).map((op, i) => {
            return <option key={`${op}-${i}-Caracter`}>{op}</option>;
          })}
        </Input>

        <Input
          type="select"
          label="Día"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            // console.log(e.target.value);
            setdia(e.target.value);
          }}
        >
          {Object.keys(Dia).map((op, i) => {
            return <option key={`${op}-${i}-Dia`}>{op}</option>;
          })}
        </Input>

        <Input type="date" label="desde:"></Input>
        <Input
          type="date"
          label="hasta:"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            // console.log(e.target.value);
            setHasta(e.target.value);
          }}
        ></Input>

        <button
          onClick={(e) => {
            e.preventDefault();
            anadirhorarios(hasta, "0");
          }}
          className="flex h-15 self-end border rounded-md py-1 px-2 justify-center items-center text-lg text-tertiary-100 bg-secondary-50"
        >
          Añadir reunión
        </button>
      </form>
      <div>
        {reuniones.map((r) => {
          <span key={`reunion-${r}`}> reunion:{r.fecha}</span>;
        })}
      </div>
    </div>
  );
}
