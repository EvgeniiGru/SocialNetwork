export let getCurrentDate = () => {
    let date = new Date();
    return String(date.getDate() + "."+ (date.getMonth()+1) + "." + date.getFullYear() + " " 
    + date.getHours() + ":" + date.getMinutes())
}