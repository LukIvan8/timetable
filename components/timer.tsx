"use client";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";

export default function Timer({
  classNames,
  endTime,
}: {
  classNames?: string;
  endTime: string;
}) {
  const [untilEnd, setUntilEnd] = useState("");

  const endHoursMinutes = () => {
    const separated = endTime.split(":");
    return { endHour: +separated[0], endMinute: +separated[1] };
  };

  const clacUntilEnd = () => {
    const newTime = dayjs();
    let { endHour, endMinute } = endHoursMinutes();
    let minUnitl = endMinute - newTime.minute();
    if (minUnitl < 0) {
      endHour = endHour - 1;
      minUnitl = 60 + minUnitl;
    }
    let minUnitlStr = minUnitl.toString();
    if (minUnitlStr.length < 2) {
      minUnitlStr = "0" + minUnitlStr;
    }

    return `${endHour - newTime.hour()}:${minUnitlStr}`;
  };
  useEffect(() => {
    const updater = setInterval(() => {
      setUntilEnd(clacUntilEnd());
    }, 1000);

    return () => clearInterval(updater);
  }, []);

  return (
    <div
      className={`${classNames} flex flex-col gap-1 bg-gray-100 bg-opacity-50 rounded-full p-2 text-black`}
    >
      <p className="text-sm">{untilEnd}</p>
    </div>
  );
}
