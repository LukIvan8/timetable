"use client";

import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";
import { useEffect, useState } from "react";
dayjs.extend(weekday);
dayjs.extend(weekOfYear);

interface TimetableElement {
  subject: string;
  teacher: string;
  auditory: string;
  id: number;
  // 1: Числитель, 2: Знаменатель, 0: Любая
  variable: 1 | 2 | 0;
}

const humanReadableWeekday = {
  1: "Понедельник",
  2: "Вторник",
  3: "Среда",
  4: "Четверг",
  5: "Пятница",
  6: "Суббота",
  7: "Воскресенье",
};

const idToTime = {
  0: { startTime: "9:55", endTime: "10:45" },
  1: { startTime: "9:00", endTime: "10:45" },
  2: { startTime: "10:55", endTime: "12:40" },
  3: { startTime: "13:10", endTime: "14:55" },
  4: { startTime: "15:05", endTime: "16:50" },
};

const data: TimetableElement[][] = [
  [
    {
      subject: "ИКТ",
      teacher: "Кан О. А.",
      auditory: "Гл.350",
      id: 1,
      variable: 1,
    },
    {
      subject: "Математика",
      teacher: "Журов В. В.",
      auditory: "1к314",
      id: 2,
      variable: 0,
    },
  ],
  [
    {
      subject: "Английский",
      teacher: "Питиримова Т. В.",
      auditory: "1к417",
      id: 1,
      variable: 2,
    },
    {
      subject: "Физ-ра",
      teacher: "Кужахметов С. Б.",
      auditory: "-",
      id: 2,
      variable: 0,
    },
    {
      subject: "История Казахстана",
      teacher: "Темиргалиев К. А.",
      auditory: "1к230",
      id: 3,
      variable: 0,
    },
  ],
  [
    {
      subject: "Кураторский Час",
      teacher: "Головачёва В.Н.",
      auditory: "Гл.300д",
      id: 0,
      variable: 0,
    },

    {
      subject: "Казахский",
      teacher: "Конурова Н. А.",
      auditory: "1к324",
      id: 2,
      variable: 0,
    },
    {
      subject: "ИКТ",
      teacher: "Дуганова Г. К.",
      auditory: "1к255",
      id: 3,
      variable: 0,
    },
  ],
  [
    {
      subject: "Математика",
      teacher: "Журов В. В.",
      auditory: "Гл.350",
      id: 1,
      variable: 1,
    },
    {
      subject: "Английский",
      teacher: "Питиримова Т. В.",
      auditory: "1к417",
      id: 2,
      variable: 0,
    },
  ],
  [
    {
      subject: "Казахский",
      teacher: "Конурова Н. А.",
      auditory: "1к324",
      id: 2,
      variable: 1,
    },
    {
      subject: "Физ-ра",
      teacher: "Кужахметов С. Б.",
      auditory: "-",
      id: 3,
      variable: 0,
    },
    {
      subject: "История Казахстана",
      teacher: "Амерханова Ж. Б.",
      auditory: "Гл.352",
      id: 4,
      variable: 2,
    },
  ],
];

function Class({
  auditory,
  subject,
  teacher,
  id,
  // Относительное айди говорит о том какая пара по счету
  relativeId,
}: TimetableElement & { id: number; relativeId: number }) {
  const color = {
    1: "bg-red-500",
    2: "bg-orange-500",
    3: "bg-yellow-500",
    4: "bg-green-500",
  };
  const startTime = idToTime[id as keyof typeof idToTime].startTime;
  const endTime = idToTime[id as keyof typeof idToTime].endTime;
  if (id === 0) id = 1;
  return (
    <div
      className={`${
        color[id as keyof typeof color]
      } flex items-center p-4 gap-4 rounded `}
    >
      <p>{id}</p>
      <div className="flex flex-col gap-1 text-sm">
        <p>{startTime}</p>
        <p>{endTime}</p>
      </div>
      <div className="flex flex-col">
        <p className="font-bold">{subject}</p>
        <p className="text-gray-200">{auditory}</p>
      </div>
    </div>
  );
}

export default function Home() {
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
        <div className="flex w-full  self-center justify-between items-center p-4 gap-5">
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
          <div className="flex flex-col gap-1 items-center pointer-events-none select-none ">
            <p className="font-semibold">
              {
                humanReadableWeekday[
                  currentWeekday as keyof typeof humanReadableWeekday
                ]
              }
            </p>
            <p className="text-sm">{day.toDate().toLocaleDateString()}</p>
          </div>
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
            data[currentWeekday - 1]
              .filter((item) => {
                if (!(item.variable === weekType())) return item;
              })
              .map((item, id) => {
                return (
                  <Class {...item} key={id} id={item.id} relativeId={id + 1} />
                );
              })
          ) : (
            <div className="self-center text-3xl font-bold">Выходной 🎊</div>
          )}
        </div>
      </div>
    </main>
  );
}
