export const convertToCents = (valor: number) => {
  return Math.round(valor * 100);
};

export const formatCentsToBRL = (cents: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(cents / 100);
};

export const convertToReal = (cents: number) => {
  return (cents / 100).toFixed(2).replace(".", ",");
};
