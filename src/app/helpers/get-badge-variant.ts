export const getBadgeVariant = (status: string) => {
  switch (status) {
    case "Confirmado":
      return "default";
    case "Cancelado":
      return "destructive";
    case "Concluído":
      return "secondary";
    default:
      return "outline";
  }
};
