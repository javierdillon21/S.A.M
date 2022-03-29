import awsExports from "../src/aws-exports";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import {
  createEquipo,
  createMiembro,
  createMinisterio,
  createSemillero,
} from "../src/graphql/mutations";
import { useEffect, useState } from "react";
// import { readExcelFile, saveToExcel } from "../utils/excel";
import React from "react";
import { workbookToJSON } from "../utils/excel";
import XLSX from "xlsx";
import {
  listEquipos,
  listMiembros,
  listMinisterios,
  listSemilleros,
} from "../src/graphql/queries";
import Header from "../components/header";
import Summary from "../components/summary";
import { useMutation, useQuery } from "urql";
import { RegistroExcelMiembro } from "../src/data";
import {
  CreateEquipoInput,
  CreateEquipoMutation,
  CreateEquipoMutationVariables,
  CreateMinisterioInput,
  CreateMinisterioMutation,
  CreateMinisterioMutationVariables,
  CreateSemilleroInput,
  CreateSemilleroMutation,
  CreateSemilleroMutationVariables,
  Sexo,
} from "../src/API";
import { useForm } from "react-hook-form";
import Input from "../components/input";
import {
  Dia,
  listEquiposByNombre,
  listMinisteriosByNombre,
  MinisteriosByNombre,
} from "../src/utils/customTypesSAM";

Amplify.configure(awsExports);

export default function Settings() {
  //Archivo .xlsx que contiene la base de datos de la congregación.
  const [archivo, setArchivo] = useState<
    null | XLSX.WorkBook | undefined | RegistroExcelMiembro[]
  >();

  const [resultMinisteriosByNombre, reexecuteMinisteriosByNombre] = useQuery({
    query: listMinisteriosByNombre,
  });
  const [resultEquiposByNombre, reexecuteEquiposByNombre] = useQuery({
    query: listEquiposByNombre,
  });
  const [resultSemilleros, ress] = useQuery({ query: listSemilleros });
  // console.log(resultSemilleros);
  //Forms para ministerios, equipos y semilleros
  const [createMinisterioResult, crearMinisterio] = useMutation<
    CreateMinisterioMutation,
    CreateMinisterioMutationVariables
  >(createMinisterio);
  const [createSemilleroResult, crearSemillero] = useMutation<
    CreateSemilleroMutation,
    CreateSemilleroMutationVariables
  >(createSemillero);
  const [createEquipoResult, crearEquipo] = useMutation<
    CreateEquipoMutation,
    CreateEquipoMutationVariables
  >(createEquipo);

  const {
    register: registrarMinisterio,
    handleSubmit: handleSubmitMinisterio,
    watch: watchMinisterio,
    formState: { errors: errorsMinisterio },
  } = useForm<CreateMinisterioInput>();
  const {
    register: registrarSemillero,
    handleSubmit: handleSubmitSemillero,
    watch: watchSemillero,
    formState: { errors: errorsSemillero },
  } = useForm<CreateSemilleroInput>();
  const {
    register: registrarEquipo,
    handleSubmit: handleSubmitEquipo,
    watch: watchEquipo,
    formState: { errors: errorsEquipo },
  } = useForm<CreateEquipoInput>();

  // console.log(watchSemillero());

  //Función que lee y transforma los registros del archivo .xlsx en objetos
  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    var files = e.target.files,
      f = files?.item(0);
    var reader = new FileReader();
    reader.onload = function (e: ProgressEvent<FileReader>) {
      var workbook = XLSX.read(e.target?.result);
      //setArchivo(workbook);
      workbookToJSON(workbook).then((res) => setArchivo(res));
    };
    reader.readAsArrayBuffer(f as File);
  }
  if (archivo) {
    console.log((archivo as RegistroExcelMiembro[])[0]);
  }

  function SubmitMinisterio(input: CreateMinisterioInput) {
    crearMinisterio({
      input: {
        nombre: input.nombre,
        administradorID: input.administradorID,
      },
    });
  }

  function SubmitSemillero(input: CreateSemilleroInput) {
    crearSemillero({
      input: {
        id: input.id,
        administradorID: input.administradorID,
        equipoID: input.equipoID,
        dia: input.dia,
        horario: input.horario,
        lugar: input.lugar,
      },
    });
  }
  function SubmitEquipo(input: CreateEquipoInput) {
    crearEquipo({
      input: {
        nombre: input.nombre,
        administradorID: input.administradorID,
      },
    });
  }

  if (!resultEquiposByNombre.data || !resultMinisteriosByNombre.data)
    return <div>loading...</div>;
  return (
    <div className="flex flex-col flex-1 w-auto h-auto items-center gap-6">
      <Header title_page="Configuraciones" />
      <div>
        <input type="file" onChange={(e) => handleFile(e)} />
        <div>
          <button
          // onClick={() => SubirMiembros(archivo as RegistroExcelMiembro[])}
          >
            Subir Miembros
          </button>
        </div>
      </div>
      <form onSubmit={handleSubmitEquipo(SubmitEquipo)}>
        <Input
          label="Nombre del equipo"
          placeholder="Escriba el nombre del equipo"
          register={registrarEquipo("nombre", {
            pattern: /^[\s\S]+$/,
            required: true,
          })}
          errorCondition={errorsEquipo.nombre}
        ></Input>
        <Input
          label="Identificación del Administrador"
          placeholder="999999XXXX"
          register={registrarEquipo("administradorID", {
            pattern: /^[\d]{10}$/,
            required: true,
          })}
          errorCondition={errorsEquipo.administradorID}
        ></Input>
        <button className="border py-1 px-2 ">Crear</button>
      </form>

      <form onSubmit={handleSubmitMinisterio(SubmitMinisterio)}>
        <Input
          label="Nombre del ministerio"
          placeholder="Escriba el nombre del ministerio"
          register={registrarMinisterio("nombre", {
            pattern: /^[\s\S]+$/,
            required: true,
          })}
          errorCondition={errorsMinisterio.nombre}
        ></Input>
        <Input
          label="Identificación del Administrador"
          placeholder="999999XXXX"
          register={registrarMinisterio("administradorID", {
            pattern: /^[\d]{10}$/,
            required: true,
          })}
          errorCondition={errorsMinisterio.administradorID}
        ></Input>
        <button className="border py-1 px-2 ">Crear</button>
      </form>

      <form onSubmit={handleSubmitSemillero(SubmitSemillero)}>
        <Input
          label="Nombre del semillero"
          placeholder="Escriba el nombre del semillero"
          register={registrarSemillero("id", {
            pattern: /^[\s\S]+$/,
            required: true,
          })}
          errorCondition={errorsSemillero.id}
        ></Input>
        <Input
          label="Identificación del administrador"
          placeholder="999999XXXX"
          register={registrarSemillero("administradorID", {
            pattern: /^[\d]{10}$/,
            required: true,
          })}
          errorCondition={errorsSemillero.administradorID}
        ></Input>

        <Input
          type="select"
          label="Nombre del equipo"
          placeholder="Escriba el nombre del equipo"
          register={registrarSemillero("equipoID", {
            required: true,
          })}
          errorCondition={errorsSemillero.equipoID}
        >
          {resultEquiposByNombre.data.listEquipos.items.map(
            (op: MinisteriosByNombre) => {
              return <option key={`${op.nombre}-Equipo`}>{op.nombre}</option>;
            }
          )}
        </Input>

        <Input
          type="select"
          label="Día de reunión"
          placeholder="Seleccione el día"
          register={registrarSemillero("dia", {
            required: false,
          })}
          errorCondition={errorsSemillero.dia}
        >
          {Object.keys(Dia).map((op, i) => {
            return <option key={`${op}-${i}-Día`}>{op}</option>;
          })}
        </Input>

        <Input
          type="time"
          label="Horario de reunión"
          register={registrarSemillero("horario", {
            required: false,
          })}
          errorCondition={errorsSemillero.horario}
        ></Input>

        <Input
          type="textarea"
          label="Dirección"
          placeholder="Sector. Mz. Sl. V. Referencias"
          register={registrarSemillero("lugar", {
            pattern: /^[\s\S]+$/,
            required: false,
          })}
          errorCondition={errorsSemillero.lugar}
        ></Input>

        <button className="border py-1 px-2 ">Crear</button>
      </form>
    </div>
  );
}

// export default function Settings() {
//   async function SubirMiembros(baseExcel: RegistroExcelMiembro[]) {
//     baseExcel.map(async (r) => {
//       await API.graphql(
//         graphqlOperation(createMiembro, {
//           input: {
//             id: r.ID === undefined ? r.ID : String(r.ID),
//             nombres: r.NOMBRES,
//             apellidos: r.APELLIDOS,
//             seudonimo: r.SEUDONIMO,
//             sexo:
//               r.SEXO === "MASC."
//                 ? Sexo.MASCULINO
//                 : r.SEXO === "FEM."
//                 ? Sexo.FEMENINO
//                 : "",
//             fecha_nacimiento: r.FECHA_DE_NACIMIENTO,
//             nacionalidad: r.NACIONALIDAD,
//             direccion: r.DIRECCION,
//             correo: r.CORREO,
//             estado_civil: r.EST_CIVIL, //revisar
//             numero_hijos: r.HIJOS,
//             nombre_conyuge: r.CONYUGE,
//             ocupacion_laboral: r.OCUPACION,
//             lugar_trabajo: r.LUGAR_DE_TRABAJO,
//             cargo_trabajo: r.CARGO_QUE_DESEMPEÑA,
//             numero_hermanos: r.HERM,
//             //representanteID: ID, //revisar
//             //parentesco_representante: //revisar
//             lugar_estudio: r.LUGAR_DE_ESTUDIO,
//             //nivel_academico_actual: r.ANO_QUE_CURSA,
//             telefono_convencional: String(r.CASA),
//             whatsapp: String(r.WHATSAPP),
//             //invitadorID: ID//revisar
//             //parentesco_invitador: Parentesco //revisar
//             registrado_por: r.FICHA_LLENADA_POR,
//             //status: Status //revisar
//             semilleroID: r.SEMILLERO,
//             equipoID: r.EQUIPO,
//             ministerioID: r.MINISTERIO,
//           },
//         })
//       );
//     });
//   }

//   const [archivo, setArchivo] = useState<
//     null | XLSX.WorkBook | undefined | RegistroExcelMiembro[]
//   >();

//   // useEffect(() => {
//   //   async function ff() {
//   //     const equipos = await API.graphql(graphqlOperation(listEquipos));
//   //     const ministerios = await API.graphql(graphqlOperation(listMinisterios));
//   //     const miembros = await API.graphql(
//   //       graphqlOperation(listMiembros, { limit: 100 })
//   //     );
//   //     console.log(equipos);
//   //     console.log(ministerios);
//   //     console.log(miembros);
//   //   }

//   //   ff();
//   // }, []);

//   function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
//     var files = e.target.files,
//       f = files?.item(0);
//     var reader = new FileReader();
//     reader.onload = function (e: ProgressEvent<FileReader>) {
//       var workbook = XLSX.read(e.target?.result);
//       //setArchivo(workbook);
//       workbookToJSON(workbook).then((res) => setArchivo(res));
//     };
//     reader.readAsArrayBuffer(f as File);
//   }
//   console.log(archivo);

//   return (
//     <div>
//       <input type="file" onChange={(e) => handleFile(e)} />
//       <div>
//         <button
//           onClick={() => SubirMiembros(archivo as RegistroExcelMiembro[])}
//         >
//           Subir Miembros
//         </button>
//       </div>
//     </div>
//   );
// }

//POSIBLE SOLUCION
// async function showFile(e: React.ChangeEvent<HTMLInputElement>) {
//   e.preventDefault();
//   const reader = new FileReader();
//   reader.onload = async (e: ProgressEvent<FileReader>) => {
//     var workbook = XLSX.read(e.target?.result);
//     const text = e.target?.result;
//     console.log(workbook);
//     console.log(text);
//   };
//   reader.readAsText((e.target.files as FileList)[0]);
// }
