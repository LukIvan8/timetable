import { idToTime } from "@/constant/convert";
import { TimetableElement } from "@/types/timetable";
import Timer from "./timer";
import dayjs from "dayjs";

export default function Class({
  auditory,
  subject,
  teacher,
  id,
}: TimetableElement & { id: number }) {
  const color = {
    1: "bg-red-500",
    2: "bg-orange-500",
    3: "bg-yellow-500",
    4: "bg-green-500",
  };
  const startTime = idToTime[id as keyof typeof idToTime].startTime;
  const endTime = idToTime[id as keyof typeof idToTime].endTime;
  if (id === 0) id = 1;

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

    if (
      currentHour > startHour &&
      currentMinute < endMinute &&
      currentHour <= endHour
    ) {
      return true;
    } else if (currentHour === startHour && currentMinute > startMinute) {
      return true;
    }
  };

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
      <div className="flex flex-col grow">
        <p className="font-bold">{subject}</p>
        <p className="text-gray-200">{auditory}</p>
      </div>
      {isNow() && <Timer endTime={endTime} />}
    </div>
  );
}
