

  

interface Equipo{
    nombre: string
    administradorID?: string
    semilleros?: Semillero[]
    administrador?: Miembro
    miembros?: Miembro[]
}

interface Ministerio{
    nombre:string
    administradorID?: string
    administrador?: Miembro
    servidores?: Miembro[]
}

interface Semillero{
    id:string
    equipoID?: string
    administradorID?: string
    dia: string
    horario: string
    lugar:string
    miembros?: Miembro[]
    equipo?: Equipo
    administrador: Miembro
}

interface Miembro{
    id: string
  nombres: string
  apellidos: string
  seudonimo?: string
  sexo?: Sexo
  fecha_nacimiento?: string
  nacionalidad?: string
  ciudad_residencia?: string
  direccion?: string
  correo?: string
  estado_civil?: Civil
  numero_hijos?: number
  nombre_conyuge?: string
  ocupacion_laboral?: string
  lugar_trabajo?: string
  cargo_trabajo?: string
  tiempo_libre?: string
  numero_hermanos?: number
  //Para niños <8 años
  representanteID?: string
  parentesco_representante?: Parentesco //relación con el representante en la iglesia 
  representante?: Miembro //miembro de la iglesia que lo representa
  ////////////////////////
  lugar_estudio?: string
  jornada_academica?: Jornada
  nivel_academico_actual?: Academico //nivel académico en curso
  telefono_convencional?: string
  telefono_celular?: string
  whatsapp?: string
  nombre_padre?: string
  nombre_madre?: string
  vive_con?: string
  invitadorID?: string
  invitado_por?: Miembro
  parentesco_invitador?: Parentesco
  createdAt?: AWSDate //Fecha de membresía
  registrado_por?: string
  status?: Status!
  asistencias?: Asistencia[]
  servicios?: Servicio[] 
  semilleroID?: ID
  semillero?: Semillero
}

interface Asistencia{
    miembroID: string
    reunionID: string
    miembro?: Miembro
    reunion?: Reunion
}

interface Servicio{
    ministerioID: string
    miembroID: string
    reunionID: string
    ministerio: Ministerio
    miembro: Miembro
    reunion: Reunion
}

interface Reunion{
    id: string
    horario: string
    fecha: string
    lugar: string
    asistencia?: Asistencia[]
    servidores?: Servicio[]
}

interface RegistroExcelMiembro{
    NOMBRES: string
    APELLIDOS: string
    F_NACIMIENTO?: number
    EST_CIVIL:  Civil
    SIT_SENTIM: Sentimental
    SEXO: Sexo
    NACIONALIDAD:Nacionalidad
    TIPO_DOCUMENTO: Identificacion
    IDENTIFICACION?: string
    DIRECCION?: string
    TIEMPO_LIBRE: string
    INVITADO_POR_CEDULA?: string
    PARENTESCO: Parentesco
    WHATSAPP?: string
    CORREO?: string
    LUGAR_TRABAJO?: string
    CARGO_TRABAJO?: string
    LUGAR_ESTUDIO?: string
    ANO_CURSA: Academico
    N_HIJOS?: number
    CONYUGE?: string
    REPRESENT_LEGAL?: string
    N_HERM?: number
    FICHA_LLENADA_POR?: string
    FECHA_DE_INGRESO: string
    MINISTERIO?: string
    POSICION: Jerarquia
    EQUIPO?: string
    SEMILLERO?: string
    STATUS: Status
    SEUDONIMO?: string
    F_ACTUALIZACION?: number
    OBSERVACION?: string
}

export interface CognitoUserCustom {
    Session: string
    challengeName: LoginState
    username: string
  }