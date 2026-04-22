export const dateAndTime = (bookingDate: Date) => {
  const timeZone = "America/Sao_Paulo";

  const date = bookingDate.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone,
  });

  const time = bookingDate.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone,
  });

  return { date, time };
};
