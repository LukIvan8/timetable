export interface TimetableElement {
  subject: string;
  teacher: string;
  auditory: string;
  id: number;
  // 1: Числитель, 2: Знаменатель, 0: Любая
  variable: 1 | 2 | 0;
}
