import { type } from "os";
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "urql";
import {
  Civil,
  CreateMiembroInput,
  CreateMiembroMutation,
  CreateMiembroMutationVariables,
  Nacionalidad,
  Sexo,
} from "../src/API";
import { createMiembro } from "../src/graphql/mutations";
import Input from "./input";

export default function CreateMemberTemplate() {
  const [createMiembroResult, crearMiembro] = useMutation<
    CreateMiembroMutation,
    CreateMiembroMutationVariables
  >(createMiembro);

  const {
    register: registrarMiembro,
    handleSubmit: handleSubmitMiembro,
    watch: watchMiembro,
    setError,
    formState: { errors },
  } = useForm<CreateMiembroInput>();

  function SubmitMiembro(miembroInput: CreateMiembroInput) {
    crearMiembro({
      input: {
        id: miembroInput.id,
        nombres: miembroInput.nombres,
        apellidos: miembroInput.apellidos,
        seudonimo: miembroInput.seudonimo,
        sexo: miembroInput.sexo,
        fecha_nacimiento: miembroInput.fecha_nacimiento,
        nacionalidad: miembroInput.nacionalidad,
        ciudad_residencia: miembroInput.ciudad_residencia,
        direccion: miembroInput.direccion,
        correo: miembroInput.correo,
        estado_civil: miembroInput.estado_civil,
        numero_hijos: miembroInput.numero_hijos,
        nombre_conyuge: miembroInput.nombre_conyuge,
        ocupacion_laboral: miembroInput.ocupacion_laboral,
        lugar_trabajo: miembroInput.lugar_trabajo,
        cargo_trabajo: miembroInput.cargo_trabajo,
        tiempo_libre: miembroInput.tiempo_libre,
        numero_hermanos: miembroInput.numero_hermanos,
        representanteID: miembroInput.representanteID,
        parentesco_representante: miembroInput.parentesco_representante,
        lugar_estudio: miembroInput.lugar_estudio,
        jornada_academica: miembroInput.jornada_academica,
        nivel_academico_actual: miembroInput.nivel_academico_actual,
        telefono_celular: miembroInput.telefono_celular,
        telefono_convencional: miembroInput.telefono_convencional,
        whatsapp: miembroInput.whatsapp,
        nombre_padre: miembroInput.nombre_padre,
        nombre_madre: miembroInput.nombre_madre,
        vive_con: miembroInput.vive_con,
        invitadorID: miembroInput.invitadorID,
        parentesco_invitador: miembroInput.parentesco_invitador,
        createdAt: miembroInput.createdAt,
        registrado_por: miembroInput.registrado_por,
        status: miembroInput.status,
        semilleroID: miembroInput.semilleroID,
        equipoID: miembroInput.equipoID,
        ministerioID: miembroInput.ministerioID,
        //telefono: miembroInput.telefonosPersona.map((t) => t.telefono),
      },
    });
  }
  return (
    <form onSubmit={handleSubmitMiembro(SubmitMiembro)}>
      <Input
        label="Identificación"
        placeholder="999999XXXX"
        register={registrarMiembro("id", {
          pattern: /^[\d]{10}$/,
          required: true,
        })}
        errorCondition={errors.id}
        errorText="Sólo dígitos (10)"
      ></Input>
      <Input
        label="Nombres"
        placeholder="Nombres completos"
        register={registrarMiembro("nombres", {
          pattern: /^[\s\S]+$/,
          required: true,
        })}
        errorCondition={errors.nombres}
      ></Input>
      <Input
        label="Apellidos"
        placeholder="Apellidos completos"
        register={registrarMiembro("apellidos", {
          pattern: /^[\s\S]+$/,
          required: true,
        })}
        errorCondition={errors.apellidos}
      ></Input>
      <Input
        label="Seudónimo"
        placeholder="Nombre y Apellido de preferencia"
        register={registrarMiembro("seudonimo", {
          pattern: /^[\s\S]+$/,
          required: false,
        })}
        errorCondition={errors.seudonimo}
      ></Input>
      <Input
        type="select"
        label="Sexo"
        defaultValue=""
        register={registrarMiembro("sexo", {
          required: true,
        })}
        errorCondition={errors.sexo}
      >
        {Object.keys(Sexo).map((op, i) => {
          return <option key={`${op}-${i}-Sexo`}>{op}</option>;
        })}
      </Input>
      <Input
        type="date"
        label="Fecha de Nacimiento"
        register={registrarMiembro("fecha_nacimiento", {
          required: false,
        })}
        errorCondition={errors.fecha_nacimiento}
      ></Input>
      <Input
        type="select"
        label="Nacionalidad"
        defaultValue={Nacionalidad.ECUATORIANA}
        register={registrarMiembro("nacionalidad", {
          required: true,
        })}
        errorCondition={errors.nacionalidad}
      >
        {Object.keys(Nacionalidad).map((op, i) => {
          return <option key={`${op}-${i}-Nacionalidad`}>{op}</option>;
        })}
      </Input>
      <Input
        label="Ciudad de residencia"
        placeholder="Escriba una ciudad"
        register={registrarMiembro("ciudad_residencia", {
          pattern: /^[\s\S]+$/,
          required: false,
        })}
        errorCondition={errors.ciudad_residencia}
      ></Input>
      <Input
        type="textarea"
        label="Dirección"
        placeholder="Sector. Mz. Sl. V. Referencias"
        register={registrarMiembro("direccion", {
          pattern: /^[\s\S]+$/,
          required: false,
        })}
        errorCondition={errors.direccion}
      ></Input>
      <Input
        label="Email"
        placeholder="ejemplo@correo.com"
        register={registrarMiembro("correo", {
          pattern: /^[\s\S]+$/,
          required: false,
        })}
        errorCondition={errors.correo}
      ></Input>
      <Input
        type="select"
        label="Estado civil"
        defaultValue={Civil.SOLTERO}
        register={registrarMiembro("estado_civil", {
          required: false,
        })}
        errorCondition={errors.estado_civil}
      >
        {Object.keys(Civil).map((op, i) => {
          return <option key={`${op}-${i}-estado_civil`}>{op}</option>;
        })}
      </Input>
      <Input
        type="number"
        defaultValue={0}
        label="Número de hijos"
        register={registrarMiembro("numero_hijos", {
          required: false,
          min: 0,
          pattern: /[0-9]+/,
        })}
        errorCondition={errors.numero_hijos}
      ></Input>
    </form>
  );
}
