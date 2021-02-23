// https://docs.google.com/spreadsheets/d/1zSqASppyuRqORSJSe24vLB0m9WUAfTefJKiqrHjrkXg/edit#gid=0
export function valueToDegree(value: number, minValue: number, maxValue: number, startDegree: number, maxRotation: number) {
  const calculatedDegree = (((value * maxRotation) / (maxValue - minValue)) + startDegree);
  return calculatedDegree;
}
