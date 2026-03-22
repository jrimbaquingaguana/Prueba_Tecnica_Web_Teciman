export const formatDate = (value) => {
  if (!value) return "-";

  const date = new Date(value);

  return date.toLocaleString("es-ES", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};