/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Class from "@/components/classCard";
import { humanReadableWeekday } from "@/constant/convert";
import { timetable } from "@/constant/data";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";
import { useEffect, useState } from "react";
import DatePicker from "tailwind-datepicker-react";
dayjs.extend(weekday);
dayjs.extend(weekOfYear);

export default function Home() {
  const [show, setShow] = useState<boolean>(false);
  const [day, setDay] = useState(dayjs());
  const getWeekday = () => {
    let _weekday = day.weekday();
    if (_weekday === 0) _weekday = 7;
    return _weekday;
  };
  const [currentWeekday, setWeekday] = useState(getWeekday());

  const weekType = () => {
    const _week = dayjs(
      dayjs(day.toDate().toDateString()).format("YYYY-MM-DD")
    ).week();
    if (_week % 2 === 0) {
      return 2;
    }
    return 1;
  };

  useEffect(() => {
    setWeekday(getWeekday());
  }, [day]);

  return (
    <main className=" min-h-screen ">
      <div className="sm:w-[640px] sm:mx-auto flex flex-col">
        <div className="flex w-full  self-center justify-between items-center p-4 gap-5 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 cursor-pointer"
            onClick={() => {
              setDay(day.subtract(1, "day"));
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
          <DatePicker
            options={{
              minDate: new Date("2020-01-01"),
              maxDate: new Date("2029-01-01"),
              clearBtn: false,
              todayBtn: false,
              autoHide: true,
              datepickerClassNames:
                "top-18 left-1/2 -translate-x-1/2 border border-white rounded-b-md border-t-0",
              theme: {
                background: "bg-black dark:bg-black",
                todayBtn: "",
                clearBtn: "",
                icons: "",
                text: "",
                disabledText: "bg-gray-800 rounded-none pointer-events-none",
                input: "dark:bg-transparent",
                inputIcon: "",
                selected: "",
              },
              language: "ru",
              defaultDate: day.toDate(),
            }}
            show={show}
            onChange={(selected) => setDay(dayjs(selected))}
            setShow={() => setShow((prev) => !prev)}
          >
            <div
              className={`flex flex-col gap-1 h-14  items-center select-none cursor-pointer mx-auto sm:w-[298px] ${
                show &&
                "sm:border sm:border-white sm:rounded-t-md sm:border-b-0"
              } `}
              onClick={() => setShow((prev) => !prev)}
            >
              <p className="font-semibold">
                {
                  humanReadableWeekday[
                    currentWeekday as keyof typeof humanReadableWeekday
                  ]
                }
              </p>
              <p className="text-sm">{day.toDate().toLocaleDateString()}</p>
            </div>
          </DatePicker>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 cursor-pointer"
            onClick={() => {
              setDay(day.add(1, "day"));
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </div>
        <div className="flex flex-col gap-2">
          {currentWeekday < 6 ? (
            timetable[currentWeekday - 1]
              .filter((item) => {
                if (!(item.variable === weekType())) return item;
              })
              .map((item, id) => {
                return <Class {...item} key={id} id={item.id} />;
              })
          ) : (
            <div className="self-center text-3xl font-bold">Выходной 🎊</div>
          )}
        </div>
      </div>
    </main>
  );
}
