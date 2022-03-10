
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
    N?: number
    FECHA_DE_ACTUALIZACION?: number
    NOMBRES?: string
    APELLIDOS?: string
    FECHA_DE_NACIMIENTO?: number
    EDAD?: number
    EST_CIVIL?: string
    SEXO?: string
    NACIONALIDAD?: string
    ID?: number
    DIRECCION?: string
    INVITADO_POR?: string
    PARENTESCO?: string
    CASA?: number
    WHATSAPP?: number
    CORREO?: string
    LUGAR_DE_TRABAJO?: string
    CARGO_QUE_DESEMPEÑA?: string
    LUGAR_DE_ESTUDIO?: string
    ANO_QUE_CURSA?: string
    HIJOS?: number
    CONYUGE?: string
    HERM?: number
    FICHA_LLENADA_POR?: string
    FECHA_DE_INGRESO?: number
    MINISTERIO?: string
    OCUPACION?: string
    GRUPO?: string
    EQUIPO?: string
    SEMILLERO?: string
    PASADO_AL_DRIVE_POR?: string
    STATUS?: string
    SEUDONIMO?: string
    ESTADO?: string
    ACTUALIZ_DRIVE?: number
    OBSERVACION?: string
}