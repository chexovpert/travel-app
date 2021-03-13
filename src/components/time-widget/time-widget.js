import React, { useState, useEffect } from "react";

export default (props) => {
  let [time, setTime] = useState(null);
  let [date, setDate] = useState(null);

  const addZero = (n) => {
    return (parseInt(n, 10) < 10 ? "0" : "") + n;
  };
  const timeHandler = () => {
    function convertDateToUtc(date) {
      return new Date(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate(),
        date.getUTCHours(),
        date.getUTCMinutes(),
        date.getUTCSeconds()
      );
    }
    let utcDate = convertDateToUtc(new Date());
    let localDate = new Date(+utcDate + 60 * 60000); //вставить разницу относительно UTC
    //console.log(localDate);

    let localHours = localDate.getHours();
    let localMinutes = localDate.getMinutes();
    let localSeconds = localDate.getSeconds();

    let localDateGet = localDate.getDate();
    let localDay = new Intl.DateTimeFormat("en-Us", { weekday: "long" }).format(
      localDate
    );
    let localMonth = new Intl.DateTimeFormat("en-Us", { month: "long" }).format(
      localDate
    );

    let fullLocalDate = `${localDay}, ${localDateGet} ${localMonth}`;
    setDate(fullLocalDate);

    let localTime = `${addZero(localHours)}:${addZero(localMinutes)}:${addZero(
      localSeconds
    )}`;
    setTime(localTime);
    //console.log(time);
  };
  useEffect(() => {
    const timer = setInterval(() => {
      timeHandler();
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="timeWidget">
      <div className="timeWidget__date">{date}</div>
      <div className="timeWidget__time">{time}</div>
    </div>
  );
};
