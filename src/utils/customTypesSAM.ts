


export const listPreviewMiembros = /* GraphQL */ `
query ListPreviewMiembros(
  $filter: ModelMiembroFilterInput
  $limit: Int
  $nextToken: String
) {
  listMiembros(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      nombres
      apellidos
      seudonimo
      telefono_celular
      whatsapp
      status
      }
  }
}
`;

export const listMiembrosID = /* GraphQL */ `
query ListMiembrosID(
  $filter: ModelMiembroFilterInput
  $limit: Int
  $nextToken: String
) {
  listMiembros(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      }
  }
}
`;
export const listMinisteriosByNombre = /* GraphQL */ `
query listMinisteriosByNombre(
  $filter: ModelMinisterioFilterInput
  $limit: Int
  $nextToken: String
) {
  listMinisterios(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      nombre
      }
  }
}
`;

export const listEquiposByNombre = /* GraphQL */ `
query listEquiposByNombre(
  $filter: ModelEquipoFilterInput
  $limit: Int
  $nextToken: String
) {
  listEquipos(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      nombre
      }
  }
}
`;

export const listSemillerosEssencial = /* GraphQL */ `
query listSemillerosEssencial(
  $filter: ModelSemilleroFilterInput
  $limit: Int
  $nextToken: String
) {
  listSemilleros(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      equipoID
      id
      administradorID
      }
  }
}
`;

export type MinisteriosByNombre= {
  nombre:string 
}

export enum Dia{
  LUNES= "LUNES",
  MARTES ="MARTES",
  MIERCOLES= "MIÉRCOLES",
  JUEVES= "JUEVES",
  VIERNES= "VIERNES",
  SABADO= "SÁBADO",
  DOMINGO= "DOMINGO"

}
export enum Sexo {
  MASCULINO ="MASCULINO",
  FEMENINO = "FEMENINO"
}

//Naturaleza de una Reunión
export enum Caracter {
  ADMINISTRATIVO= "ADMINISTRATIVO", //Reuniones de planificación de Equipos/Clubes bíblicos
  CORPORATIVO= "CORPORATIVO", //Reuniones de planificación general / planificacion eclesial
  GENERAL="GENERAL", //Cultos generales
  PARTICULAR ="PARTICULAR"//#Semilleros
}
export enum Civil {
  SOLTERO = "SOLTERO",
  CASADO= "CASADO",
  DIVORCIADO= "DIVORCIADO",
  VIUDO= "VIUDO",
  UNION_LIBRE= "UNIÓN LIBRE"
}
export enum Sentimental {
  SOLTERO = "SOLTERO",
  CASADO= "CASADO",
  DIVORCIADO= "DIVORCIADO",
  VIUDO= "VIUDO",
  UNION_LIBRE= "UNIÓN LIBRE",
  M_SOLTERA= "MADRE SOLTERA",
  SEPARADO= "SEPARADO"
}
export enum Parentesco {
  PADRE = "PADRE",
  MADRE= "MADRE",
  HIJO_A= "HIJO",
  HERMANO_A= "HERMANO",
  ABUELO_A= "ABUELO",
  TIO_A= "TIO",
  PRIMO_A= "PRIMO",
  AMIGO_A= "AMIGO",
  CONOCIDO_A="CONOCIDO",
  PAREJA="PAREJA"
}

export enum Jornada {
  ESTUDIANTIL_MATUTINA= "ESTUDIANTIL MATUTINA",
  ESTUDIANTIL_VESPERTINA = "ESTUDIANTIL VESPERTINA",
  ESTUDIANTIL_NOCTURNA ="ESTUDIANTIL NOCTURNA",
  LABORAL_TRADICIONAL= "ESTUDIANTIL TRADICIONAL"
}

export enum Academico {
  PRIMER_GRADO_EGB= "PRIMER GRADO EGB",
  SEGUNDO_GRADO_EGB= "SEGUNDO GRADO EGB",
  TERCER_GRADO_EGB= "TERCER GRADO EGB",
  CUARTO_GRADO_EGB= "CUARTO GRADO EGB",
  QUINTO_GRADO_EGB= "QUINTO GRADO EGB",
  SEXTO_GRADO_EGB= "SEXTO GRADO EGB",
  SEPTIMO_GRADO_EGB= "SEPTIMO GRADO EGB",
  OCTAVO_GRADO_EGB= "OCTAVO GRADO EGB",
  NOVENO_GRADO_EGB= "NOVENO GRADO EGB",
  DECIMO_GRADO_EGB= "DECIMO GRADO EGB",
  PRIMERO_BGU ="PRIMERO BGU",
  SEGUNDO_BGU="SEGUNDO BGU",
  TERCERO_BGU="TERCERO BGU",
  PRIMER_SEMESTRE= "PRIMER SEMESTRE",
  SEGUNDO_SEMESTRE= "SEGUNDO SEMESTRE",
  TERCER_SEMESTRE= "TERCER SEMESTRE",
  CUARTO_SEMESTRE= "CUARTO SEMESTRE",
  QUINTO_SEMESTRE= "QUINTO SEMESTRE",
  SEXTO_SEMESTRE= "SEXTO SEMESTRE",
  SEPTIMO_SEMESTRE= "SEPTIMO SEMESTRE",
  OCTAVO_SEMESTRE= "OCTAVO SEMESTRE",
  NOVENO_SEMESTRE= "NOVENO SEMESTRE",
  DECIMO_SEMESTRE= "DECIMO SEMESTRE",
  ONCEAVO_SEMESTRE= "ONCEAVO SEMESTRE",
  DOCEAVO_SEMESTRE= "DOCEAVO SEMESTRE",
  TRECEAVO_SEMESTRE= "TRECEAVO SEMESTRE",
  CATORCEAVO_SEMESTRE= "CATORCEAVO SEMESTRE",
}

export enum Status {
  ASIGNADO = "ASIGNADO",
  VISITANTE= "VISITANTE",
  GANADO= "GANADO",
  ACTIVO= "ACTIVO", //# ASISTENTE ACTIVO; SERVIDOR ACTIVO
  NO_CONSOLIDADO= "NO CONSOLIDADO",
  FUERA_DE_ALCANCE= "FUERA DE ALCANCE",
  TRANSFERIDO= "TRANSFERIDO", //#miembro que pasa asignado de uno a otro semillero. Status que aparece en la UI del nuevo sembrador
  SUSPENDIDO= "SUSPENDIDO"
}
export enum Jerarquia {
  PASTOR= "PASTOR", 
  ASPIRANTE= "ASPIRANTE", //#Asistente aspirante a OBRERO
  SEMBRADOR= "SEMBRADOR", //#Servidor encargado de un semillero
  OBRERO= "OBRERO",//#Servidor de la congregación que no es ADMINISTRADOR NI MAYORDOMO
  ADMINISTRADOR= "ADMINISTRADOR", //#Servidor encargado de un equipo de semilleros
  MAYORDOMO= "MAYORDOMO", //#Servidor encargado de un ministerio
  ASISTENTE = "ASISTENTE",//#Miembro de la congregación que no es servidor. Status(asignado, visitante, ganado, activo, no consolidado, fuera de alcance, transferido)
  MAYORDOMO_SEMBRADOR= "MAYORDOMO SEMBRADOR",
  SEMBRADOR_OBRERO= "SEMBRADOR OBRERO"
}

export enum Identificacion {//#tipo de documento de identidad
  CI="CI",
  VISA="VISA",
  PASAPORTE="PASAPORTE"
}





export enum Nacionalidad {
  ARGENTINA = "ARGENTINA",
  BOLIVIANA= "BOLIVIANA",
  CHILENA= "CHILENA",
  COLOMBIANA= "COLOMBIANA",
  COSTARRICENSE= "COSTARRICENSE",
  CUBANA= "CUBANA",
  DOMINICANA= "DOMINICANA",
  ECUATORIANA= "ECUATORIANA",
  ESTADOUNIDENSE= "ESTADOUNIDENSE",
  GUATEMALTECA="GUATEMALTECA",
  HONDURENA="HONDUREÑA",
  MEXICANA= "MEXICANA",
  NICARAGUENSE= "NICARAGUENSE",
  PANAMENA="PANAMEÑA",
  PARAGUAYA="PARAGUAYA",
  PUERTORRIQUENA="PUERTORRIQUEÑA",
  PERUANA= "PERUANA",
  SALVADORENA= "SALVADOREÑA",
  URUGUAYA= "URUGUAYA",
  VENEZOLANA= "VENEZOLANA"
}