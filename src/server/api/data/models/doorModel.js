export async function convertToDoor(input) {
  return {
    sensorId: input.sensorId,
    isOpen: input.isOpen,
    utc_timestamp: input.utc_timestamp
  };
}
