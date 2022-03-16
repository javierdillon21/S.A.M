import React, { useEffect, useState } from "react";
import Header from "../components/header";
import { workbookToJSON } from "../utils/excel";
import awsExports from "../src/aws-exports";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import {
  createEquipo,
  createMiembro,
  createMinisterio,
} from "../src/graphql/mutations";
// import { readExcelFile, saveToExcel } from "../utils/excel";

import XLSX from "xlsx";
import {
  listEquipos,
  listMiembros,
  listMinisterios,
} from "../src/graphql/queries";
Amplify.configure(awsExports);

export default function Settings() {
  async function SubirMiembros(baseExcel: RegistroExcelMiembro[]) {
    baseExcel.map(async (r) => {
      await API.graphql(
        graphqlOperation(createMiembro, {
          input: {
            id: r.ID === undefined ? r.ID : String(r.ID),
            nombres: r.NOMBRES,
            apellidos: r.APELLIDOS,
            seudonimo: r.SEUDONIMO,
            //sexo: r.SEXO,
            fecha_nacimiento: r.FECHA_DE_NACIMIENTO,
            nacionalidad: r.NACIONALIDAD,
            direccion: r.DIRECCION,
            correo: r.CORREO,
            //estado_civil: r.EST_CIVIL, //revisar
            numero_hijos: r.HIJOS,
            nombre_conyuge: r.CONYUGE,
            ocupacion_laboral: r.OCUPACION,
            lugar_trabajo: r.LUGAR_DE_TRABAJO,
            cargo_trabajo: r.CARGO_QUE_DESEMPEÑA,
            numero_hermanos: r.HERM,
            //representanteID: ID, //revisar
            //parentesco_representante: //revisar
            lugar_estudio: r.LUGAR_DE_ESTUDIO,
            //nivel_academico_actual: r.ANO_QUE_CURSA,
            telefono_convencional: String(r.CASA),
            whatsapp: String(r.WHATSAPP),
            //invitadorID: ID//revisar
            //parentesco_invitador: Parentesco //revisar
            registrado_por: r.FICHA_LLENADA_POR,
            //status: Status //revisar
            semilleroID: r.SEMILLERO,
            equipoID: r.EQUIPO,
            ministerioID: r.MINISTERIO,
          },
        })
      );
    });
  }

  async function SubirEquipos() {
    await API.graphql(
      graphqlOperation(createMinisterio, {
        input: { nombre: "SERVICIOS VARIOS", administradorID: "939996225" },
      })
    );
  }
  const [archivo, setArchivo] = useState<
    null | XLSX.WorkBook | undefined | RegistroExcelMiembro[]
  >();

  useEffect(() => {
    async function ff() {
      const equipos = await API.graphql(graphqlOperation(listEquipos));
      const ministerios = await API.graphql(graphqlOperation(listMinisterios));
      const miembros = await API.graphql(
        graphqlOperation(listMiembros, { limit: 100 })
      );
      console.log(equipos);
      console.log(ministerios);
      console.log(miembros);
    }

    ff();
  }, []);

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
  console.log(archivo);
  return (
    <div className="flex flex-col flex-1 w-auto h-auto items-center gap-6">
      <Header title_page="Configuraciones"></Header>
      <div>
        <input type="file" onChange={(e) => handleFile(e)} />
        <div>
          <button
            onClick={() => SubirMiembros(archivo as RegistroExcelMiembro[])}
            className="p-1 border rounded-sm bg-gray-100 border-gray-500"
          >
            <span>Subir miembro</span>
          </button>
          {/* <button onClick={() => SubirEquipos()}>
              Crear equipos/ministerios
          </button> */}
        </div>
      </div>
    </div>
  );
}
