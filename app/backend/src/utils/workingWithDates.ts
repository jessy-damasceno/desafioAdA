export const DAYS_OF_WEEK = {
  domingo: 0,
  segunda: 1,
  terca: 2,
  quarta: 3,
  quinta: 4,
  sexta: 5,
  sabado: 6,
};

export function getDateFromString(arg: string): Date {
  const formated = arg.split('-').reverse().join('-');
  const str = `${formated}T00:00:00`;
  return new Date(Date.parse(str));
}

export function getNextDayOfWeek(arg: string, dayOfWeek: number) {
  const date = getDateFromString(arg);
  const resultDate = new Date(date.getTime());

  resultDate.setDate((date.getDate() + (7 + dayOfWeek - date.getDay())) % 7);

  if (date.getTime() - resultDate.getTime() === 0) { resultDate.setDate(date.getDate() + 7); }

  return resultDate;
}

export function addDaysTo(arg: string, daysOf: number): Date {
  const resultDate = getDateFromString(arg);
  resultDate.setDate(resultDate.getDate() + daysOf);

  return resultDate;
}
