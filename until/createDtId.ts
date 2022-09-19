/**根据时间戳生成随机数*/
export function createDtId() {
    let d = new Date();
    let year:string|number = d.getFullYear();
    let month:string|number = d.getMonth() + 1;
    let date:string|number = d.getDate();
    let day = d.getDay();
    let hours:string|number = d.getHours();
    let minutes:string|number = d.getMinutes();
    let seconds:string|number = d.getSeconds();
    let ms = d.getMilliseconds();
    year = (year + "").substring(2);
    if (month <= 9)
      month = "0" + month;
    if (date <= 9)
      date = "0" + date;
    if (hours <= 9)
      hours = "0" + hours;
    if (minutes <= 9)
      minutes = "0" + minutes;
    if (seconds <= 9)
      seconds = "0" + seconds;
    let num = Math.ceil(Math.random()*100);
    let id = year + month + date + hours + minutes + seconds + num;
    return id;
}