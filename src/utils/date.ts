

/* parámetro "date": milisegundos transcurridos desde las 00:00:00 UTC del 1 de 
enero de 1970 justo hasta ahora. Si es undefined, se retorna la fecha de hoy */
export function GetFormatedDate(date?: number | null){
    if(!date){
        const today= new Date(Date.now()).toISOString()
        const dateFormated= today.substring(0,10)
        return dateFormated
    }
    else if(typeof(date)==='number'){
        const dateFormated = (new Date(date).toISOString()).substring(0,10)
        return dateFormated
    }
    }
    