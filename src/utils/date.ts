import { getFontDefinitionFromManifest } from "next/dist/server/font-utils"


/* parámetro "date": milisegundos transcurridos desde las 00:00:00 UTC del 1 de 
enero de 1970 (Date.getTime) justo hasta ahora. Si es undefined, se retorna la fecha de hoy 'YYYY-MM-DD'*/
export function GetFormatedDate(date?: number | null|string, toGMTString?:boolean){
    if(!date){
        const today= new Date().toLocaleDateString('en-GB')
        const dateFormated= `${today.substring(6)}-${today.substring(3,5)}-${today.substring(0,2)}`
        return dateFormated
    }
    else{
        if(toGMTString==true && date.valueOf()=='string'){
            const input= new Date(date).toUTCString()
            const dateFormated= new Date(input).toJSON().substring(0,10)
            return dateFormated
        }
        const input= new Date(date).toLocaleDateString('en-GB')
        const dateFormated = `${input.substring(6)}-${input.substring(3,5)}-${input.substring(0,2)}`
        return dateFormated
    }
    }
    

/* parámetro "date".string: fecha de nacimiento en formato 'YYYY-MM-DD' 
    .number: milisegundos transcurridos desde las 00:00:00 UTC del 1 de 
    enero de 1970 justo hasta ahora. Se retorna true si es menor de edad (menor de 18 años), false si no.
*/
export function IsAMinor(date:string|null|undefined){
        
    if(date!= null && date){
        const today=  GetFormatedDate()
        const birthday= date as string
        const yeardiff= Number(today.substring(0,4)) - Number(birthday.substring(0,4))
        if(yeardiff>18){   
            return false
        }else if(yeardiff==18){
                if(Number(today.substring(5,7)) > Number(birthday.substring(5,7))){
                    return false
                }else if (Number(today.substring(5,7)) ==Number(birthday.substring(5,7))){
                    if(Number(today.substring(8,)) >= Number(birthday.substring(8,))) {
                        return false
                    }else {return true}
                        }else {return true}
                            }else{ return true}
                    }else return false
    }


    //     export function IsAMinor(date:string| number|null|undefined){
        
//         if(date!= null && date){
//             const today= new Date(Date.now())
        
//             const birthday= new Date(date)
//             console.log(today)
//             const yeardiff= today.getUTCFullYear()-birthday.getUTCFullYear()
//             console.log(`Año de hoy: ${today.getUTCFullYear()}  Año nacimiento: ${birthday.getUTCFullYear()}`)
//             console.log(`Diferencia de años: ${yeardiff}`)
//             console.log(`Día hoy: ${today.getUTCDate()} Día nacimiento: ${birthday.getUTCDate()}`)
//             console.log(`Mes hoy: ${today.getMonth()} Mes nacimiento: ${birthday.getUTCMonth()}`)

//             if(yeardiff>18){
//                 console.log("diferencia mayor")
//                 return false
//             }else if(yeardiff==18){
//                 if(today.getUTCMonth() > birthday.getUTCMonth()){
//                     return false
//                 }else if (today.getUTCMonth() == birthday.getUTCMonth()){
//                     if(today.getUTCDate() >= birthday.getUTCDate()) {
//                         return false
//                     }else {return true}
//                 }else {return true}
//             }else{ return true}
//         }else return false    
// }