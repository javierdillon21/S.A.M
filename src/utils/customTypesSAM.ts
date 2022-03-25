


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