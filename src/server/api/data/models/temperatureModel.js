export async function convertToTemperature(input) {
  return {
    sensorId: input.id,
    tempInFarenheit: input.t,
    humidity: input.h, // optional
    utc_timestamp: input.utc_timestamp
  };
}
