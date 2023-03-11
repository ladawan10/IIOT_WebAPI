export const formatDatetime = (dateTime) => {
  const dt = new Date(dateTime);
  const setLenght = (number) => (number < 10 ? "0" + number : number);
  const years = dt.getFullYear();
  const month = setLenght(dt.getMonth() + 1);
  //const months = dt.getMonth() + 1
  // months = months<10 ? '0'+months :months;
  const date = setLenght(dt.getDate());
  // date = date< 10?"0"+date: date;

  const hours = setLenght(dt.getHours());
  //hours = hours < 10? "0" +hours : hours;
  const minutes = setLenght(dt.getMinutes());
  const seconds = setLenght(dt.getSeconds());

  const getDate2 = `${date}-${month}-${years}`;
  const getDate = `${years}-${month}-${date}`;
  const getDates = `${years}${month}${date}`;
  const getTime = `${hours}:${minutes}:${seconds}`;
  const getTimeHours = `${hours}:00`;
  const getDatetime = `${getDate} ${getTime}`;
  const getDatetimeLocal = `${years}-${month}-${date}T${hours}:${minutes}`;
  const getDatetimeLocal2 = `${date}/${month}/${years} ${hours}:${minutes}:${seconds} น.`;
  const getDatetimeLocal3 = `${date}/${month}/${years}`;

  const hours2 = setLenght(dt.getHours()+23);
  const minutes2 = setLenght(dt.getMinutes()+59);
  const seconds2 = setLenght(dt.getSeconds()+59);
  const getTime2 = `${hours2}:${minutes2}:${seconds2}`;
  const getTime3 = `00:00:00`;
  const getDatetime2 = `${getDate} ${getTime2}`;
  const getDatetime3 = `${getDate} ${getTime3}`;

  const getDateMonth = `${date}/${month}`;

  //! set time STD run
  const getDatetimeLocalEND = `${years}-${month}-${date}T${hours}:${minutes}`;

   
  return {
    getDate,
    getDates,
    getDate2,
    getTime,
    getTimeHours,
    getDatetime,
    getDatetimeLocal,
    getDatetimeLocal2,
    getDatetimeLocal3,
    getDateMonth,
    getDatetime2,
    getDatetime3
  };
};
