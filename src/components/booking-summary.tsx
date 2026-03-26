import { barberShopServiceTable } from "@/db/schema";
import { Card, CardContent } from "./ui/card";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

type Service = typeof barberShopServiceTable.$inferSelect;
interface BookingSummaryProps {
  service: Pick<Service, "name" | "priceCents">;
  barber: {
    name: string;
  };
  selectedDate: Date;
}

const BookingSummary = ({
  service,
  barber,
  selectedDate,
}: BookingSummaryProps) => {
  return (
    <Card className="py-3">
      <CardContent className="space-y-3 px-3">
        <div className="flex items-center justify-between">
          <h2 className="font-bold">{service.name}</h2>
          <p className="text-sm font-bold">
            {Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(Number(service.priceCents))}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="text-sm text-gray-400">Data</h2>
          <p className="text-sm">
            {format(selectedDate, "d 'de' MMMM", {
              locale: ptBR,
            })}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="text-sm text-gray-400">Horário</h2>
          <p className="text-sm">
            {format(selectedDate, "HH:mm", { locale: ptBR })}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="text-sm text-gray-400">Barbeiro</h2>
          <p className="text-sm">{barber.name}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingSummary;
