export function getISODate(date) {
  return (date ? new Date(date) : new Date()).toISOString().slice(0, 10);
}