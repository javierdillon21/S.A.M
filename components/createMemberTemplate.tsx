import { type } from "os";
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "urql";
import {
  Academico,
  Civil,
  CreateMiembroInput,
  CreateMiembroMutation,
  CreateMiembroMutationVariables,
  Jornada,
  Nacionalidad,
  Parentesco,
  Sexo,
  Status,
} from "../src/API";
import { createMiembro } from "../src/graphql/mutations";
import UploadTakePhoto from "./uploadTakePhoto";
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
    <form
      className="grid grid-cols-3 grid-rows-2 gap-x-3"
      onSubmit={handleSubmitMiembro(SubmitMiembro)}
    >
      {/* INFORMACIÓN BÁSICA PERSONAL */}
      <div className="flex row-span-2 flex-col h-full justify-around">
        <UploadTakePhoto></UploadTakePhoto>
        <div className="grid grid-cols-2">
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
            label="Teléfono convencional"
            placeholder="99XXXX"
            register={registrarMiembro("telefono_convencional", {
              pattern: /^[\d]{6}$/,
              required: false,
            })}
            errorCondition={errors.telefono_convencional}
            errorText="Sólo dígitos (6)"
          ></Input>

          <Input
            label="Teléfono celular"
            placeholder="9999XXXXXX"
            register={registrarMiembro("telefono_celular", {
              pattern: /^[\d]{10}$/,
              required: false,
            })}
            errorCondition={errors.telefono_celular}
            errorText="Sólo dígitos (10)"
          ></Input>
          <Input
            label="Whatsapp"
            placeholder="9999XXXXXX"
            register={registrarMiembro("whatsapp", {
              pattern: /^[\d]{10}$/,
              required: false,
            })}
            errorCondition={errors.whatsapp}
            errorText="Sólo dígitos (10)"
          ></Input>
        </div>
      </div>

      {/* DATOS EXTRA */}
      <div>
        <Input
          type="number"
          defaultValue={0}
          label="Número de hermanos"
          register={registrarMiembro("numero_hermanos", {
            required: false,
            min: 0,
            pattern: /[0-9]+/,
          })}
          errorCondition={errors.numero_hermanos}
        ></Input>

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

        <Input
          label="Nombre del cónyuge"
          placeholder="Nombre y apellido"
          register={registrarMiembro("nombre_conyuge", {
            required: false,
            pattern: /^[\s\S]+$/,
          })}
          errorCondition={errors.nombre_conyuge}
        ></Input>
        {/* SI ES MENOR DE EDAD --- ZONA DE CAMPEONES */}

        <Input
          label="Nombre del padre"
          placeholder="Nombre y apellido"
          register={registrarMiembro("nombre_padre", {
            required: false,
            pattern: /^[\s\S]+$/,
          })}
          errorCondition={errors.nombre_padre}
        ></Input>
        <Input
          label="Nombre de la madre"
          placeholder="Nombre y apellido"
          register={registrarMiembro("nombre_madre", {
            required: false,
            pattern: /^[\s\S]+$/,
          })}
          errorCondition={errors.nombre_madre}
        ></Input>
      </div>

      {/* INFORMACIÓN LABORAL Y/O ACADÉMICA */}
      <div>
        <Input
          label="Ocupación laboral"
          placeholder="Oficio o profesión"
          register={registrarMiembro("ocupacion_laboral", {
            required: false,
            pattern: /^[\s\S]+$/,
          })}
          errorCondition={errors.ocupacion_laboral}
        ></Input>

        <Input
          label="Lugar de trabajo"
          placeholder="Nombre y ubicación"
          register={registrarMiembro("lugar_trabajo", {
            required: false,
            pattern: /^[\s\S]+$/,
          })}
          errorCondition={errors.lugar_trabajo}
        ></Input>

        <Input
          label="Cargo"
          placeholder="Labor que desempeña"
          register={registrarMiembro("cargo_trabajo", {
            required: false,
            pattern: /^[\s\S]+$/,
          })}
          errorCondition={errors.cargo_trabajo}
        ></Input>

        <Input
          label="Tiempo libre"
          placeholder="Días y horarios disponibles"
          register={registrarMiembro("tiempo_libre", {
            required: false,
            pattern: /^[\s\S]+$/,
          })}
          errorCondition={errors.tiempo_libre}
        ></Input>

        <Input
          label="Lugar de estudios"
          placeholder="Nombre de la institución"
          register={registrarMiembro("lugar_estudio", {
            required: false,
            pattern: /^[\s\S]+$/,
          })}
          errorCondition={errors.lugar_estudio}
        ></Input>

        <Input
          type="select"
          label="Jornada académica"
          register={registrarMiembro("jornada_academica", {
            required: false,
          })}
          errorCondition={errors.jornada_academica}
        >
          {Object.keys(Jornada).map((op, i) => {
            return <option key={`${op}-${i}-jornada_academica`}>{op}</option>;
          })}
        </Input>

        <Input
          type="select"
          label="Nivel académico"
          register={registrarMiembro("nivel_academico_actual", {
            required: false,
          })}
          errorCondition={errors.nivel_academico_actual}
        >
          {Object.keys(Academico).map((op, i) => {
            return (
              <option key={`${op}-${i}-nivel_academico_actual`}>{op}</option>
            );
          })}
        </Input>
      </div>

      {/* INFORMACIÓN REFERENCIAL */}

      {/* REACT SELECT OOOJO o NOMBRE COMÚN*/}
      <div>
        <Input
          label="Representante en la congregación"
          placeholder=""
          register={registrarMiembro("representanteID", {
            required: false,
            pattern: /^[\s\S]+$/,
          })}
          errorCondition={errors.representanteID}
        ></Input>
        <Input
          type="select"
          label="Parentesco del representante"
          register={registrarMiembro("parentesco_representante", {
            required: false,
          })}
          errorCondition={errors.parentesco_representante}
        >
          {Object.keys(Parentesco).map((op, i) => {
            return (
              <option key={`${op}-${i}-parentesco_representante`}>{op}</option>
            );
          })}
        </Input>

        <Input
          label="Invitado por"
          placeholder=""
          register={registrarMiembro("invitadorID", {
            required: false,
            pattern: /^[\s\S]+$/,
          })}
          errorCondition={errors.invitadorID}
        ></Input>

        <Input
          type="select"
          label="Parentesco del invitador"
          register={registrarMiembro("parentesco_invitador", {
            required: false,
          })}
          errorCondition={errors.parentesco_invitador}
        >
          {Object.keys(Parentesco).map((op, i) => {
            return (
              <option key={`${op}-${i}-parentesco_invitador`}>{op}</option>
            );
          })}
        </Input>

        <Input
          type="date"
          label="Fecha de membresía"
          defaultValue={Date.now()}
          register={registrarMiembro("createdAt", {
            required: true,
          })}
          errorCondition={errors.createdAt}
        ></Input>
        <Input
          label="Registrado por"
          placeholder="Persona que llenó la ficha"
          register={registrarMiembro("registrado_por", {
            required: false,
            pattern: /^[\s\S]+$/,
          })}
          errorCondition={errors.registrado_por}
        ></Input>
      </div>

      {/* INFORMACIÓN MINISTERIAL */}
      {/* REACT SELECT */}
      <div>
        <Input
          type="select"
          label="Status"
          register={registrarMiembro("status", {
            required: false,
          })}
          errorCondition={errors.status}
        >
          {Object.keys(Status).map((op, i) => {
            return <option key={`${op}-${i}-status`}>{op}</option>;
          })}
        </Input>

        <Input
          type="select"
          label="Semillero"
          register={registrarMiembro("semilleroID", {
            required: false,
          })}
          errorCondition={errors.semilleroID}
        >
          {Object.keys(Status).map((op, i) => {
            return <option key={`${op}-${i}-semilleroID`}>{op}</option>;
          })}
        </Input>

        <Input
          type="select"
          label="Equipo"
          register={registrarMiembro("equipoID", {
            required: false,
          })}
          errorCondition={errors.equipoID}
        >
          {Object.keys(Status).map((op, i) => {
            return <option key={`${op}-${i}-equipoID`}>{op}</option>;
          })}
        </Input>

        <Input
          type="select"
          label="Ministerio"
          register={registrarMiembro("ministerioID", {
            required: false,
          })}
          errorCondition={errors.ministerioID}
        >
          {Object.keys(Status).map((op, i) => {
            return <option key={`${op}-${i}-ministerioID`}>{op}</option>;
          })}
        </Input>
      </div>
    </form>
  );
}

{
  /* <canvas
        id="tutorial"
        width="118"
        height="139"
        className="border"
      ></canvas> */
}
