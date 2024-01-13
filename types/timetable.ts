export type TimetableElement = {
  subject: string;
  teacher: string;
  auditory: string;
  id: number | string;
  // 1: Числитель, 2: Знаменатель, 0: Любая
  variable: 1 | 2 | 0;
  type: "seminar" | "lection" | "lab";
};
