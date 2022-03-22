


export function GetTodayDate(){
    const date= new Date(Date.now()).toISOString()
    const dateFormated= date.substring(0,10)
    return dateFormated
}