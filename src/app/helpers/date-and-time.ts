export const dateAndTime = (bookingDate: Date) => {
  const date = bookingDate.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const time = bookingDate.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return { date, time };
};
