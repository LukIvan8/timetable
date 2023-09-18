"use client";
import { idToTime, typeToHuman } from "@/constant/convert";
import { TimetableElement } from "@/types/timetable";
import Timer from "./timer";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import { redirect } from "next/navigation";

export default function Class({
  auditory,
  subject,
  teacher,
  id,
  day,
  type,
  isOpen,
  findNextClass,
  findPrevClass,
  toggleControls,
}: TimetableElement & {
  id: number;
  findNextClass: (currentDate: dayjs.Dayjs, subject: string) => void;
  findPrevClass: (currentDate: dayjs.Dayjs, subject: string) => void;
  day: dayjs.Dayjs;
  isOpen: boolean;
  toggleControls: () => void;
}) {
  const [teacherRef, setTeacher] = useState<string>(teacher);
  const [auditoryRef, setAuditory] = useState<string>(auditory);
  const [now, setNow] = useState<boolean>(false);
  const color = {
    1: "red",
    2: "orange",
    3: "yellow",
    4: "green",
  };
  const typeToColor = {
    lection: "bg-gray-200 text-gray-900",
    seminar: "bg-stone-700",
    kurh: "bg-gray-200 text-black",
    lab: "bg-green-800",
  } as const;
  // Почему то tailwind не подхватывает наличие этих классов без этого
  const bgColor = {
    1: "bg-red-500",
    2: "bg-orange-500",
    3: "bg-yellow-500",
    4: "bg-green-500",
  };
  const borderColor = {
    1: "border-red-500",
    2: "border-orange-500",
    3: "border-yellow-500",
    4: "border-green-500",
  };
  const startTime = idToTime[id as keyof typeof idToTime].startTime;
  const endTime = idToTime[id as keyof typeof idToTime].endTime;
  if (id === 0) id = 1;

  const idToZCard = {
    1: "z-[8]",
    2: "z-[6]",
    3: "z-[4]",
    4: "z-[2]",
  };
  const idToZCtrl = {
    1: "z-[7]",
    2: "z-[5]",
    3: "z-[3]",
    4: "z-[1]",
  };

  const zCard = idToZCard[id as keyof typeof idToZCard];
  const zControls = idToZCtrl[id as keyof typeof idToZCtrl];

  const isNow = () => {
    let [startHour, startMinute] = [
      +startTime.split(":")[0],
      +startTime.split(":")[1],
    ];
    const [endHour, endMinute] = [
      +endTime.split(":")[0],
      +endTime.split(":")[1],
    ];
    const [currentHour, currentMinute] = [dayjs().hour(), dayjs().minute()];
    if (dayjs().date() === day.date()) {
      if (
        currentHour > startHour &&
        currentMinute < endMinute &&
        currentHour <= endHour
      ) {
        setNow(true);
      } else if (currentHour === startHour && currentMinute >= startMinute) {
        setNow(true);
      } else {
        setNow(false);
      }
    }
  };

  useEffect(() => {
    const updater = setInterval(() => {
      isNow();
    }, 1000);

    return () => clearInterval(updater);
  }, []);

  return (
    <div className="relative select-none">
      <div
        className={`${bgColor[id as keyof typeof color]} ${
          isOpen ? "rounded-t" : "rounded"
        } flex items-center p-4 gap-4 relative cursor-pointer ${zCard}`}
        onClick={() => toggleControls()}
      >
        <p>{id}</p>
        <div className="flex flex-col gap-1 text-sm">
          <p>{startTime}</p>
          <p>{endTime}</p>
        </div>
        <div className="flex flex-col grow">
          <p className="font-bold">{subject}</p>
          <p className="text-gray-200 text-sm">
            {auditoryRef} | {teacherRef}
          </p>
        </div>
        {now && <Timer endTime={endTime} />}
      </div>
      <div
        className={`${isOpen ? "top-full" : " top-1/3"} ${
          borderColor[id as keyof typeof color]
        } absolute   w-full left-0 bg-black border rounded-b border-t-0 transition-[top] ${zControls}`}
      >
        <div className="flex justify-between p-2">
          <p
            className="flex cursor-pointer flex-grow"
            onClick={() => findPrevClass(day, subject)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </p>
          <p className="font-bold">{typeToHuman[type]}</p>
          <p
            className="flex cursor-pointer flex-grow justify-end"
            onClick={() => findNextClass(day, subject)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </p>
        </div>
      </div>
    </div>
  );
}
