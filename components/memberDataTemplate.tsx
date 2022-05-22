import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "urql";
import {
  CreateMiembroInput,
  CreateMiembroMutation,
  CreateMiembroMutationVariables,
  DeleteMiembroMutation,
  DeleteMiembroMutationVariables,
  GetMiembroQuery,
  GetMiembroQueryVariables,
  ListMiembrosQuery,
  ListMiembrosQueryVariables,
} from "../src/API";
import {
  createMiembro,
  deleteMiembro,
  updateMiembro,
} from "../src/graphql/mutations";
import UploadTakePhoto from "./uploadTakePhoto";
import Input from "./input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getMiembro, listMiembros } from "../src/graphql/queries";
import { GetFormatedDate, IsAMinor } from "../src/utils/date";
import { useRouter } from "next/router";
import { listSemillerosEssencial } from "../src/utils/customTypesSAM";

import { Storage } from "aws-amplify";
import { sendImage } from "../src/utils/storage";
import { MemberContextMedia } from "./layout";
import {
  Academico,
  Civil,
  Identificacion,
  Jerarquia,
  Jornada,
  Nacionalidad,
  Parentesco,
  Sexo,
  Status,
} from "../src/utils/customTypesSAM";

export default function MemberDataTemplate(props: {
  mode:
    | "reading"
    | "creating" /* mode is "reading" for cases in only reading the member's data.
  In this case, it's possible reading, updating or deleting member's data; Is "creating" to create a new member.*/;
}) {
  const router = useRouter();
  const miembroID = router.query.id as string;
  const memberfoto = useContext(MemberContextMedia).fotografia;
  const setFotoinContext = useContext(MemberContextMedia).setFotografia;
  const [readMode, setReadMode] = useState<boolean>(props.mode === "reading"); //readMode == true if reading mode; false if updating mode

  const [resultRetrieveMiembro, reexecuteRetrieveMiembro] = useQuery<
    GetMiembroQuery,
    GetMiembroQueryVariables
  >({
    query: getMiembro,
    variables: { id: miembroID },
  });
  // console.log(resultRetrieveMiembro);
  const [resultListMiembros, reexecuteQueryListMiembros] = useQuery<
    ListMiembrosQuery,
    ListMiembrosQueryVariables
  >({
    query: listMiembros,
  });
  const [resultRetrieveSemilleros, reexecuteRetrieveSemilleros] = useQuery({
    query: listSemillerosEssencial,
  });
  // console.log(resultRetrieveSemilleros);
  useEffect(() => {
    if (props.mode === "reading") {
      let miembro = resultRetrieveMiembro.data?.getMiembro;
      let semilleros = resultRetrieveSemilleros.data?.listSemilleros.items;

      if (miembro && semilleros) {
        if (setFotoinContext) {
          //Sea que el miembro tenga o no foto, seteamos el contexto para leerlo en componente TAKEPHOTO
          setFotoinContext(miembro.foto);
        }
        console.log(`la foto es: ${miembro.foto}`);
        setValueMiembro("id", miembro.id);
        setValueMiembro("titulo_profesional", miembro.titulo_profesional);
        setValueMiembro("nombres", miembro.nombres);
        setValueMiembro("apellidos", miembro.apellidos);
        setValueMiembro("seudonimo", miembro.seudonimo);
        setValueMiembro("sexo", miembro.sexo);
        setValueMiembro("fecha_nacimiento", miembro.fecha_nacimiento);
        setValueMiembro("nacionalidad", miembro.nacionalidad);
        setValueMiembro("ciudad_residencia", miembro.ciudad_residencia);
        setValueMiembro("direccion", miembro.direccion);
        setValueMiembro("correo", miembro.correo);
        setValueMiembro("estado_civil", miembro.estado_civil);
        setValueMiembro("numero_hijos", miembro.numero_hijos);
        setValueMiembro("nombre_conyuge", miembro.nombre_conyuge);
        setValueMiembro("ocupacion_laboral", miembro.ocupacion_laboral);
        setValueMiembro("lugar_trabajo", miembro.lugar_trabajo);
        setValueMiembro("lugar_estudio", miembro.lugar_estudio);
        setValueMiembro("cargo_trabajo", miembro.cargo_trabajo);
        setValueMiembro("tiempo_libre", miembro.tiempo_libre);
        setValueMiembro("numero_hermanos", miembro.numero_hermanos);
        setValueMiembro("representanteID", miembro.representanteID);
        setValueMiembro(
          "parentesco_representante",
          miembro.parentesco_representante
        );
        setValueMiembro("jornada_academica", miembro.jornada_academica);
        setValueMiembro(
          "nivel_academico_actual",
          miembro.nivel_academico_actual
        );
        setValueMiembro("telefono_celular", miembro.telefono_celular);
        setValueMiembro("telefono_convencional", miembro.telefono_convencional);
        setValueMiembro("whatsapp", miembro.whatsapp);
        setValueMiembro("nombre_padre", miembro.nombre_padre);
        setValueMiembro("nombre_madre", miembro.nombre_madre);
        setValueMiembro("vive_con", miembro.vive_con);
        setValueMiembro("parentesco_invitador", miembro.parentesco_invitador);
        setValueMiembro("invitadorID", miembro.invitadorID);
        setValueMiembro("createdAt", miembro.createdAt);
        setValueMiembro("registrado_por", miembro.registrado_por);
        setValueMiembro("status", miembro.status);
        setValueMiembro("semilleroID", miembro.semilleroID);
        setValueMiembro("equipoID", miembro.equipoID);
        setValueMiembro("ministerioID", miembro.equipoID);
      }
    }
  }, [resultRetrieveMiembro, resultRetrieveSemilleros]);

  const [createMiembroResult, crearMiembro] = useMutation<
    CreateMiembroMutation,
    CreateMiembroMutationVariables
  >(createMiembro);

  const [updateMiembroResult, actualizarMiembro] = useMutation<
    CreateMiembroMutation,
    CreateMiembroMutationVariables
  >(updateMiembro);

  const [deleteMiembroResult, eliminarMiembro] = useMutation<
    DeleteMiembroMutation,
    DeleteMiembroMutationVariables
  >(deleteMiembro);

  const {
    register: registrarMiembro,
    handleSubmit: handleSubmitMiembro,
    watch: watchMiembro,
    setValue: setValueMiembro,
    formState: { errors },
  } = useForm<CreateMiembroInput>({
    defaultValues: {
      foto: "",
      tipo_documento_identidad: Identificacion.CI,
      sexo: undefined,
      parentesco_invitador: null,
      parentesco_representante: null,
      jornada_academica: null,
      nivel_academico_actual: null,
      estado_civil: null,
      status: Status.ASIGNADO,
      jerarquia: Jerarquia.ASISTENTE,
      equipoID: null,
      ministerioID: null,
      semilleroID: null,
      nacionalidad: Nacionalidad.ECUATORIANA,
      createdAt: GetFormatedDate(), //año-mes-dia
    },
  });

  function SubmitMiembro(miembroInput: CreateMiembroInput) {
    let miembroExistente = resultListMiembros.data?.listMiembros?.items?.filter(
      (c) => c?.id === miembroInput.id
    );

    if (props.mode === "creating") {
      console.log(miembroExistente);
      if (miembroExistente && miembroExistente.length !== 0) {
        alert("Ya existe un miembro con ese número de cédula");
        console.log("Ya existe un miembro con ese número de cédula");
      } else {
        crearMiembro({
          input: {
            foto: memberfoto,
            id: miembroInput.id,
            nombres: miembroInput.nombres,
            apellidos: miembroInput.apellidos,
            seudonimo: miembroInput.seudonimo,
            tipo_documento_identidad: miembroInput.tipo_documento_identidad,
            titulo_profesional: miembroInput.titulo_profesional,
            jerarquia: miembroInput.jerarquia,
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
            // semilleroID: miembroInput.semilleroID,
            // equipoID: miembroInput.equipoID,
            // ministerioID: miembroInput.ministerioID,
            fecha_bautizo: miembroInput.fecha_bautizo,
            //telefono: miembroInput.telefonosPersona.map((t) => t.telefono),
          },
        })
          .then((res) => {
            if (!res.error) {
              if (memberfoto !== "") {
                sendImage(memberfoto, `_foto_${miembroInput.id}`);
              }
              console.log("Member created succesfully");
              alert("Miembro creado con éxito");
              router.push("/members");
            } else {
              console.error("Error creating the member:", res.error);
              alert(
                "Error al crear el miembro. Es posible que ya exista ese número de cédula"
              );
            }
          })
          .catch((err) => {
            alert(
              "Error al crear el miembro. Es posible que ya exista ese número de cédula"
            );
            console.error("Error creating the member:", err);
          });
      }
      // setErrorGeneral("Ya existe una persona con este número de cedula");
    } else if (props.mode === "reading") {
      actualizarMiembro({
        input: {
          foto: memberfoto,
          id: miembroInput.id,
          nombres: miembroInput.nombres,
          apellidos: miembroInput.apellidos,
          seudonimo: miembroInput.seudonimo,
          tipo_documento_identidad: miembroInput.tipo_documento_identidad,
          titulo_profesional: miembroInput.titulo_profesional,
          jerarquia: miembroInput.jerarquia,
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
          fecha_bautizo: miembroInput.fecha_bautizo,
        },
      })
        .then(async (res) => {
          if (!res.error) {
            console.log("Member updated succesfully");
            if (memberfoto !== "") {
              await Storage.remove(`_foto_${miembroID}`);
              sendImage(memberfoto, `_foto_${miembroInput.id}`);
            }
            alert("Datos actualizados con éxito");

            router.push("/members");
          } else {
            console.error("Error updating the member:", res.error);
          }
        })
        .catch((err) => {
          console.error("Error updating the member:", err);
        });
    }
  }
  function deleteMiembroHandler() {
    eliminarMiembro({ input: { id: miembroID } }).then((res) => {
      if (!res.error) {
        router.push("/members");
      } else {
        console.error("Error deleting member: ", res.error);
      }
    });
  }
  return (
    <div className="flex flex-col w-full items-center gap-6 mb-7">
      <form
        className="grid grid-cols-1 mx-4 gap-y-5 sm:grid-cols-2 sm:gap-x-10 sm:w-3/4"
        onSubmit={handleSubmitMiembro(SubmitMiembro)}
      >
        {/* INFORMACIÓN BÁSICA PERSONAL */}
        <div className="flex sm:row-span-3 flex-col h-full justify-around gap-y-5">
          <UploadTakePhoto mode={props.mode}></UploadTakePhoto>

          <span className="flex border-b font-bold text-2xl text-primary-100 justify-between">
            Datos personales
            {/* Only if we are in "reading" mode we'll can edit or delete the member's data  */}
            {props.mode === "reading" && (
              <span id="controls" className="flex gap-x-2 sm:gap-x-1">
                <button
                  className="border rounded-md py-1 sm:py-1 px-1 w-14 font-bold text-lg text-tertiary-100 bg-create-100"
                  onClick={(e) => {
                    e.preventDefault();
                    setReadMode(!readMode);
                  }}
                >
                  <FontAwesomeIcon
                    icon={readMode ? "edit" : "eye"}
                    size="sm"
                    className="text-current text-base"
                  />
                </button>
                <button
                  className="border rounded-md py-1 sm:py-1 px-1 w-14 font-bold text-lg text-tertiary-100 bg-delete-100"
                  onClick={(e) => {
                    e.preventDefault();
                    deleteMiembroHandler();
                  }}
                >
                  <FontAwesomeIcon
                    icon="user-minus"
                    size="sm"
                    className="text-current text-base"
                  />
                </button>
              </span>
            )}
          </span>
          <div className="grid grid-cols-2 gap-x-3 gap-y-1">
            <Input
              label="Nombres"
              placeholder="Nombres completos"
              register={registrarMiembro("nombres", {
                pattern: /^[\s\S]+$/,
                required: true,
              })}
              errorCondition={errors.nombres}
              readOnly={readMode}
            ></Input>
            <Input
              label="Apellidos"
              placeholder="Apellidos completos"
              register={registrarMiembro("apellidos", {
                pattern: /^[\s\S]+$/,
                required: true,
              })}
              errorCondition={errors.apellidos}
              readOnly={readMode}
            ></Input>
            <Input
              type="select"
              label="Tipo de documento"
              register={registrarMiembro("tipo_documento_identidad", {
                required: true,
              })}
              errorCondition={errors.tipo_documento_identidad}
              disabled={readMode}
            >
              {Object.keys(Identificacion).map((op, i) => {
                return (
                  <option key={`${op}-${i}-documento_identidad`}>{op}</option>
                );
              })}
            </Input>
            <Input
              label="Identificación"
              placeholder="999999XXXX"
              register={registrarMiembro("id", {
                // pattern: /^[\d]{10}$/,
                required: true,
              })}
              errorCondition={errors.id}
              // errorText="Sólo dígitos (10)"
              readOnly={readMode}
            ></Input>
            <Input
              label="Seudónimo"
              placeholder="Nombre y Apellido de preferencia"
              register={registrarMiembro("seudonimo", {
                pattern: /^[\s\S]+$/,
                required: false,
              })}
              errorCondition={errors.seudonimo}
              readOnly={readMode}
            ></Input>
            <Input
              type="select"
              label="Sexo"
              register={registrarMiembro("sexo", {
                required: true,
              })}
              errorCondition={errors.sexo}
              disabled={readMode}
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
              readOnly={readMode}
            ></Input>
            <Input
              type="select"
              label="Nacionalidad"
              defaultValue={Nacionalidad.ECUATORIANA}
              register={registrarMiembro("nacionalidad", {
                required: true,
              })}
              errorCondition={errors.nacionalidad}
              disabled={readMode}
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
              readOnly={readMode}
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
              readOnly={readMode}
            ></Input>
            <Input
              label="Email"
              placeholder="ejemplo@correo.com"
              register={registrarMiembro("correo", {
                pattern: /^[\s\S]+$/,
                required: false,
              })}
              errorCondition={errors.correo}
              readOnly={readMode}
            ></Input>
            <Input
              type="select"
              label="Estado civil"
              defaultValue={Civil.SOLTERO}
              register={registrarMiembro("estado_civil", {
                required: false,
              })}
              errorCondition={errors.estado_civil}
              disabled={readMode}
            >
              {Object.keys(Civil).map((op, i) => {
                return <option key={`${op}-${i}-estado_civil`}>{op}</option>;
              })}
            </Input>

            <Input
              label="Teléfono convencional"
              placeholder="99XXXX"
              register={registrarMiembro("telefono_convencional", {
                // pattern: /^[\d]{6}$/,
                required: false,
              })}
              errorCondition={errors.telefono_convencional}
              // errorText="Sólo dígitos (6)"
              readOnly={readMode}
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
              readOnly={readMode}
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
              readOnly={readMode}
            ></Input>
          </div>
        </div>
        {/* INFORMACIÓN LABORAL Y/O ACADÉMICA */}
        <div className="flex flex-col h-full justify-around gap-y-5">
          <span className="border-b font-bold text-2xl text-primary-100">
            Información laboral y/o académica
          </span>
          <div className="grid grid-cols-2 gap-x-3 gap-y-1">
            {!IsAMinor(watchMiembro().fecha_nacimiento) && (
              <>
                <Input
                  label="Título profesional"
                  placeholder="Título de tercer nivel"
                  register={registrarMiembro("titulo_profesional", {
                    required: false,
                    pattern: /^[\s\S]+$/,
                  })}
                  errorCondition={errors.titulo_profesional}
                  readOnly={readMode}
                ></Input>
                <Input
                  label="Ocupación laboral"
                  placeholder="Oficio o profesión"
                  register={registrarMiembro("ocupacion_laboral", {
                    required: false,
                    pattern: /^[\s\S]+$/,
                  })}
                  errorCondition={errors.ocupacion_laboral}
                  readOnly={readMode}
                ></Input>
                <Input
                  label="Lugar de trabajo"
                  placeholder="Nombre y ubicación"
                  register={registrarMiembro("lugar_trabajo", {
                    required: false,
                    pattern: /^[\s\S]+$/,
                  })}
                  errorCondition={errors.lugar_trabajo}
                  readOnly={readMode}
                ></Input>
                <Input
                  label="Cargo"
                  placeholder="Labor que desempeña"
                  register={registrarMiembro("cargo_trabajo", {
                    required: false,
                    pattern: /^[\s\S]+$/,
                  })}
                  errorCondition={errors.cargo_trabajo}
                  readOnly={readMode}
                ></Input>
              </>
            )}

            <Input
              label="Tiempo libre"
              placeholder="Días y horarios disponibles"
              register={registrarMiembro("tiempo_libre", {
                required: false,
                pattern: /^[\s\S]+$/,
              })}
              errorCondition={errors.tiempo_libre}
              readOnly={readMode}
            ></Input>

            <Input
              label="Lugar de estudios"
              placeholder="Nombre de la institución"
              register={registrarMiembro("lugar_estudio", {
                required: false,
                pattern: /^[\s\S]+$/,
              })}
              errorCondition={errors.lugar_estudio}
              readOnly={readMode}
            ></Input>

            <Input
              type="select"
              label="Jornada académica"
              register={registrarMiembro("jornada_academica", {
                required: false,
              })}
              errorCondition={errors.jornada_academica}
              disabled={readMode}
            >
              {Object.keys(Jornada).map((op, i) => {
                return (
                  <option key={`${op}-${i}-jornada_academica`}>{op}</option>
                );
              })}
            </Input>

            <Input
              type="select"
              label="Nivel académico"
              register={registrarMiembro("nivel_academico_actual", {
                required: false,
              })}
              errorCondition={errors.nivel_academico_actual}
              disabled={readMode}
            >
              {Object.keys(Academico).map((op, i) => {
                return (
                  <option key={`${op}-${i}-nivel_academico_actual`}>
                    {op}
                  </option>
                );
              })}
            </Input>
          </div>
        </div>

        {/* DATOS EXTRA */}
        <div className="flex flex-col h-full justify-around gap-y-5">
          <span className="border-b font-bold text-2xl text-primary-100">
            Información extra
          </span>
          <div className="grid grid-cols-2 gap-x-3 gap-y-1">
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
              readOnly={readMode}
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
              readOnly={readMode}
            ></Input>

            {(watchMiembro().estado_civil === "CASADO" ||
              watchMiembro().estado_civil === "UNION_LIBRE") && (
              <Input
                label="Nombre del cónyuge"
                placeholder="Nombre y apellido"
                register={registrarMiembro("nombre_conyuge", {
                  required: false,
                  pattern: /^[\s\S]+$/,
                })}
                errorCondition={errors.nombre_conyuge}
                readOnly={readMode}
              ></Input>
            )}
            {/* SI ES MENOR DE EDAD --- ZONA DE CAMPEONES */}

            {IsAMinor(watchMiembro().fecha_nacimiento) && (
              <>
                <Input
                  label="Nombre del padre"
                  placeholder="Nombre y apellido"
                  register={registrarMiembro("nombre_padre", {
                    required: false,
                    pattern: /^[\s\S]+$/,
                  })}
                  errorCondition={errors.nombre_padre}
                  readOnly={readMode}
                ></Input>
                <Input
                  label="Nombre de la madre"
                  placeholder="Nombre y apellido"
                  register={registrarMiembro("nombre_madre", {
                    required: false,
                    pattern: /^[\s\S]+$/,
                  })}
                  errorCondition={errors.nombre_madre}
                  readOnly={readMode}
                ></Input>
              </>
            )}
            <Input
              type="date"
              label="Fecha de bautizo"
              register={registrarMiembro("fecha_bautizo", {
                required: false,
              })}
              errorCondition={errors.fecha_bautizo}
              readOnly={readMode}
            ></Input>
          </div>
        </div>

        {/* INFORMACIÓN REFERENCIAL */}

        {/* REACT SELECT OOOJO o NOMBRE COMÚN*/}
        <div className="flex flex-col h-full justify-around gap-y-5">
          <span className="border-b font-bold text-2xl text-primary-100">
            Información referencial
          </span>
          <div className="grid grid-cols-2 gap-x-3 gap-y-1">
            {IsAMinor(watchMiembro().fecha_nacimiento) && (
              <>
                <Input
                  label="Representante en la congregación"
                  placeholder=""
                  register={registrarMiembro("representanteID", {
                    required: false,
                    pattern: /^[\s\S]+$/,
                  })}
                  errorCondition={errors.representanteID}
                  readOnly={readMode}
                ></Input>
                <Input
                  type="select"
                  label="Parentesco del representante"
                  register={registrarMiembro("parentesco_representante", {
                    required: false,
                  })}
                  errorCondition={errors.parentesco_representante}
                  disabled={readMode}
                >
                  {Object.keys(Parentesco).map((op, i) => {
                    return (
                      <option key={`${op}-${i}-parentesco_representante`}>
                        {op}
                      </option>
                    );
                  })}
                </Input>
              </>
            )}

            <Input
              label="Invitado por"
              placeholder=""
              register={registrarMiembro("invitadorID", {
                required: false,
                pattern: /^[\s\S]+$/,
              })}
              errorCondition={errors.invitadorID}
              readOnly={readMode}
            ></Input>

            <Input
              type="select"
              label="Parentesco del invitador"
              register={registrarMiembro("parentesco_invitador", {
                required: false,
              })}
              errorCondition={errors.parentesco_invitador}
              disabled={readMode}
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
              register={registrarMiembro("createdAt", {
                required: true,
              })}
              errorCondition={errors.createdAt}
              readOnly={readMode}
            ></Input>
            <Input
              label="Registrado por"
              placeholder="Persona que llenó la ficha"
              register={registrarMiembro("registrado_por", {
                required: false,
                pattern: /^[\s\S]+$/,
              })}
              errorCondition={errors.registrado_por}
              readOnly={readMode}
            ></Input>
          </div>
        </div>

        {/* INFORMACIÓN MINISTERIAL */}
        {/* REACT SELECT */}
        {/* Esta sección sólo se muestra cuando se quiera leer o actualizar los datos. Escencialmente para asignación de nuevos miembros*/}
        {props.mode === "reading" && (
          <div className="flex flex-col h-full justify-around gap-y-5">
            <span className="border-b font-bold text-2xl text-primary-100">
              Información ministerial
            </span>
            <div className="grid grid-cols-2 gap-x-3 gap-y-1">
              <Input
                type="select"
                label="Status"
                register={registrarMiembro("status", {
                  required: false,
                })}
                errorCondition={errors.status}
                disabled={readMode}
              >
                {Object.keys(Status).map((op, i) => {
                  return <option key={`${op}-${i}-status`}>{op}</option>;
                })}
              </Input>
              <Input
                type="select"
                label="Jerarquía"
                register={registrarMiembro("jerarquia", {
                  required: true,
                })}
                errorCondition={errors.jerarquia}
                disabled={readMode}
              >
                {Object.keys(Jerarquia).map((op, i) => {
                  return <option key={`${op}-${i}-jerarquía`}>{op}</option>;
                })}
              </Input>
              <Input
                type="select"
                label="Semillero"
                register={registrarMiembro("semilleroID", {
                  required: false,
                })}
                errorCondition={errors.semilleroID}
                disabled={readMode}
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
                disabled={readMode}
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
                disabled={readMode}
              >
                {Object.keys(Status).map((op, i) => {
                  return <option key={`${op}-${i}-ministerioID`}>{op}</option>;
                })}
              </Input>
            </div>
          </div>
        )}
        <button
          className={`border rounded-md py-3 sm:py-1 px-2 sm:w-1/5 sm:col-span-2 sm:justify-self-end font-bold text-lg text-tertiary-100 ${
            readMode ? "bg-gray-400" : "bg-secondary-100"
          }`}
          disabled={readMode}
        >
          {props.mode === "creating" ? "Crear miembro" : "Guardar cambios"}
        </button>
      </form>
    </div>
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
