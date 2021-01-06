export function happyHoursTimeFormat(time){
  if(time && !isNaN(time) && time >= 0){
    const date = new Date(0);
    date.setSeconds(time);
    return date.toISOString().substr(11, 8);
  }
  else return null;
}
