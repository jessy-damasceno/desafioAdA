const getDateFromString = (arg: string): Date => {
  const str = arg.split('-').reverse().join('-');
  return new Date(Date.parse(str));
};

export default getDateFromString;
