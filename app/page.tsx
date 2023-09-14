"use client";

import Class from "@/components/classCard";
import { humanReadableWeekday } from "@/constant/convert";
import { timetable } from "@/constant/data";
import { TimetableElement } from "@/types/timetable";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";
import Link from "next/link";
import { redirect } from "next/navigation";
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
  const [openControlsId, setOpenControlsId] = useState<null | string>(null);
  const [timetablepls, setTimetablepls] = useState<TimetableElement[][] | null>(
    null
  );

  const weekType = (date: dayjs.Dayjs) => {
    const week = dayjs(
      dayjs(date.toDate().toDateString()).format("YYYY-MM-DD")
    ).week();
    if (week % 2 === 0) {
      return 2;
    }
    return 1;
  };

  const findNextClass = (currentDate: dayjs.Dayjs, subject: string) => {
    let counter = 0;
    let updatedDate = currentDate;
    let foundNext = false;
    while (counter <= 14) {
      updatedDate = updatedDate.add(1, "day");
      counter = counter + 1;
      let weekday = updatedDate.weekday();
      if (weekday === 0) weekday = 7;
      if (weekday > 5) continue;
      timetable[weekday - 1].forEach((item) => {
        if (
          item.subject === subject &&
          weekType(updatedDate) !== item.variable
        ) {
          setDay(updatedDate);
          foundNext = true;
          return;
        }
      });
      if (foundNext) break;
    }
  };
  const findPrevClass = (currentDate: dayjs.Dayjs, subject: string) => {
    let counter = 0;
    let updatedDate = currentDate;
    let foundNext = false;
    while (counter <= 14) {
      updatedDate = updatedDate.subtract(1, "day");
      counter = counter + 1;
      let weekday = updatedDate.weekday();
      if (weekday === 0) weekday = 7;
      if (weekday > 5) continue;
      timetable[weekday - 1].forEach((item) => {
        if (
          item.subject === subject &&
          weekType(updatedDate) !== item.variable
        ) {
          setDay(updatedDate);
          foundNext = true;
          return;
        }
      });
      if (foundNext) break;
    }
  };

  const toggleControls = (id: string) => {
    if (openControlsId === id) {
      setOpenControlsId(null);
    } else {
      setOpenControlsId(id);
    }
  };

  const parsedTimetable = () => {
    timetable.forEach((date) => {
      date.forEach((subj) => {
        if (subj.auditory.includes("/")) {
          const part = localStorage.getItem(
            subj.subject === "Английский"
              ? "english"
              : subj.subject === "Казахский"
              ? "kazakh"
              : "ikt"
          );
          if (part !== null) {
            subj.teacher = subj.teacher.split("/")[+part];
            subj.auditory = subj.auditory.split("/")[+part];
          } else {
            redirect("/config");
          }
        }
      });
    });
    setTimetablepls(timetable);
  };

  useEffect(() => {
    parsedTimetable();
    setWeekday(getWeekday());
    if (openControlsId) toggleControls(openControlsId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
              autoHide: false,
              datepickerClassNames:
                "top-18 left-1/2 -translate-x-1/2 border border-white rounded-b-md border-t-0 z-[100] absolute",
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
            timetablepls ? (
              timetablepls[currentWeekday - 1]
                .filter((item) => {
                  if (!(item.variable === weekType(day))) return item;
                })
                .map((item, id) => {
                  const uniqueKey = `${currentWeekday - 1}-${id}`;
                  return (
                    <Class
                      {...item}
                      key={uniqueKey}
                      id={item.id}
                      isOpen={openControlsId === uniqueKey}
                      toggleControls={() => toggleControls(uniqueKey)}
                      findNextClass={findNextClass}
                      findPrevClass={findPrevClass}
                      day={day}
                    />
                  );
                })
            ) : (
              <div className="animate-spin w-fit self-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-12 h-12"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>
              </div>
            )
          ) : (
            <div className="self-center text-3xl font-bold">Выходной 🎊</div>
          )}
        </div>
      </div>
      <Link className="fixed left-8 bottom-8 cursor-pointer" href="/config">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </Link>
    </main>
  );
}
