// https://docs.google.com/spreadsheets/d/1zSqASppyuRqORSJSe24vLB0m9WUAfTefJKiqrHjrkXg/edit#gid=0
export function degreeToValue(degree: number, minValue: number, maxValue: number, startDegree: number, maxRotation: number) {
    const calculatedValue = (((maxValue - minValue) * (degree - startDegree)) / maxRotation);
    return calculatedValue;
}
