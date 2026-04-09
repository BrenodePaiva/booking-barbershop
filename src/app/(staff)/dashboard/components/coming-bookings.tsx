import { getBadgeVariant } from "@/app/helpers/get-badge-variant";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { barberShopServiceTable, bookingTable, userTable } from "@/db/schema";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarDays, Clock, Scissors } from "lucide-react";

type Booking = typeof bookingTable.$inferSelect & {
  service: typeof barberShopServiceTable.$inferSelect;
  user: typeof userTable.$inferSelect;
};

interface ComingBookingProps {
  bookings: Booking[];
}

const ComingBookings = ({ bookings }: ComingBookingProps) => {
  return (
    <Card className="w-[350px] p-4">
      <CardHeader className="px-0">
        <CardTitle>Próximos Agendamentos</CardTitle>
      </CardHeader>
      <ul className="space-y-3">
        {bookings.map((b, i) => (
          <div key={i} className="border-b last:border-0">
            <div className="mb-2 flex items-center gap-2 text-sm text-gray-500">
              <CalendarDays className="h-4 w-4 text-gray-400" />
              <span>
                {format(b.date, "dd", { locale: ptBR })} de{" "}
                <span className="capitalize">
                  {format(b.date, "MMMM", { locale: ptBR })}
                </span>
              </span>
            </div>
            <li className="flex items-center justify-between pb-2">
              <div className="flex items-center gap-3">
                {b.user.image && (
                  <Avatar>
                    <AvatarImage src={b.user.image} />
                  </Avatar>
                )}
                <div>
                  <p className="font-medium">{b.user.name}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Scissors className="h-4 w-4 text-gray-400" />
                    <span className="max-w-[107px] truncate">
                      {b.service.name}
                    </span>
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span>{format(b.date, "HH:mm", { locale: ptBR })}</span>
                  </div>
                </div>
              </div>
              <Badge className="ml-1.5" variant={getBadgeVariant(b.status)}>
                {b.status}
              </Badge>
            </li>
          </div>
        ))}
      </ul>
    </Card>
  );
};

export default ComingBookings;
