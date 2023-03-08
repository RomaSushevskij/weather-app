export const roundTempValue = (temp: number): number => {
  const absTemp = Math.abs(temp);
  const roundedAbsTemp = Math.round(absTemp);

  return temp === Math.abs(temp) ? roundedAbsTemp : -roundedAbsTemp;
};
